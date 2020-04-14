import json
from datetime import date

from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from url_filter.integrations.drf import DjangoFilterBackend

from .SerialsParsers import SailSerial, BoardSerial
from .models import Sail, Board, Accessoriess, Beginners
from .serializers import (
    sail_serializer,
    board_serializer,
    beginner_serializer,
    accessorie_serializer,
)
from . import emails


class sail_view_set(viewsets.ModelViewSet):
    queryset = Sail.objects.all().order_by("sold", "repair", "serial")
    serializer_class = sail_serializer
    filter_backends = [DjangoFilterBackend]
    filter_fields = [
        "type",
        "category",
        "brand",
        "model",
        "size",
        "year",
        "whenCame",
        "whenGone",
        "whenSold",
        "repair",
        "sold",
    ]

    def perform_create(self, serializer):
        serial = self.request.data["id"]

        message = SailSerial.check_number(serial)
        if message == "":
            serializer.save(
                serial=serial.upper(),
                type=SailSerial.set_type(serial),
                category=SailSerial.set_category(serial),
                brand=SailSerial.set_brand(serial),
                model=SailSerial.set_model(serial),
                size=SailSerial.set_size(serial),
                year=SailSerial.set_year(serial),
            )
        else:
            raise NameError(message)


class board_view_set(viewsets.ModelViewSet):
    queryset = Board.objects.all().order_by("sold", "repair", "serial")
    serializer_class = board_serializer
    filter_backends = [DjangoFilterBackend]
    filter_fields = [
        "type",
        "category",
        "brand",
        "model",
        "size",
        "year",
        "whenCame",
        "whenGone",
        "whenSold",
        "repair",
        "sold",
    ]

    def perform_create(self, serializer):
        serial = self.request.data["id"]
        message = BoardSerial.check_number(serial)
        if message == "":
            serializer.save(
                serial=serial.upper(),
                type=BoardSerial.set_type(serial),
                category=BoardSerial.set_category(serial),
                brand=BoardSerial.set_brand(serial),
                model=BoardSerial.set_model(serial),
                size=BoardSerial.set_volume(serial),
                year=BoardSerial.set_year(serial),
            )
        else:
            raise NameError(message)


class beginners_view_set(viewsets.ModelViewSet):
    queryset = Beginners.objects.all().order_by("type", "model", "size")

    serializer_class = beginner_serializer
    filter_backends = [DjangoFilterBackend]
    filter_fields = ["id", "type", "model", "size", "whenCame", "whenGone", "gone"]


class accessories_view_set(viewsets.ModelViewSet):
    queryset = Accessoriess.objects.all().order_by("type", "model", "size")
    serializer_class = accessorie_serializer
    filter_backends = [DjangoFilterBackend]
    filter_fields = ["id", "type", "model", "size", "whenCame", "whenGone", "gone"]


@api_view(["POST"])
def report_view(request):

    if emails.send_report_ssl(request):
        return Response("Email sent correctly.")
    else:
        return Response("Ups, something went wrong.")


@api_view(["GET"])
def recently_received(request):
    sails_set = (
        Sail.objects.filter(sold=False, repair=False).order_by("-whenCame")[:3].values()
    )
    boards_set = (
        Board.objects.filter(sold=False, repair=False)
        .order_by("-whenCame")[:3]
        .values()
    )
    beginners_set = (
        Beginners.objects.filter(gone=False).order_by("-whenCame")[:3].values()
    )
    accessories_set = (
        Accessoriess.objects.filter(gone=False).order_by("-whenCame")[:3].values()
    )
    total_sets = [sails_set, boards_set, beginners_set, accessories_set]
    response_list = [[], [], [], []]

    for counter, item in enumerate(total_sets, 0):
        for counter2, element in enumerate(item):
            if counter in [2, 3]:
                response_list[counter].append(
                    "%-7s %-16s%15s"
                    % (
                        element["type"],
                        (element["model"] + " " + str(element["size"])),
                        element["whenCame"].strftime("%d-%m-%Y"),
                    )
                )
            else:
                response_list[counter].append(
                    "%-16s%15s"
                    % (
                        (element["model"] + " " + str(element["size"])),
                        element["whenCame"].strftime("%d-%m-%Y"),
                    )
                )
    return Response(response_list)


@api_view(["GET"])
def recently_gone(request):
    sails_set = (
        Sail.objects.filter(repair=True).order_by("-whenGone")[:3]
        | Sail.objects.filter(sold=True).order_by("-whenSold")[:3]
    ).values()

    boards_set = (
        Board.objects.filter(repair=True).order_by("-whenGone")[:3]
        | Board.objects.filter(sold=True).order_by("-whenSold")[:3]
    ).values()
    beginners_set = (
        Beginners.objects.filter(gone=True).order_by("-whenGone")[:3].values()
    )
    accessories_set = (
        Accessoriess.objects.filter(gone=True).order_by("-whenGone")[:3].values()
    )
    total_sets = [sails_set, boards_set, beginners_set, accessories_set]
    response_list = [[], [], [], []]

    for counter, item in enumerate(total_sets, 0):
        for counter2, element in enumerate(item):
            if counter in [2, 3]:
                if element["whenGone"]:
                    response_list[counter].append(
                        "%-7s%-16s%-20s%15s"
                        % (
                            element["type"],
                            (element["model"] + " " + str(int(element["size"]))),
                            "REPAIR:",
                            element["whenGone"].strftime("%d-%m-%Y"),
                        )
                    )

            else:
                if element["whenGone"]:
                    response_list[counter].append(
                        "%-16s%-20s%15s"
                        % (
                            (element["model"] + " " + str(int(element["size"]))),
                            "REPAIR:",
                            element["whenGone"].strftime("%d-%m-%Y"),
                        )
                    )
                else:
                    response_list[counter].append(
                        "%-16s%-20s%15s"
                        % (
                            str(element["model"] + " " + str(int(element["size"]))),
                            "SOLD:",
                            element["whenSold"].strftime("%d-%m-%Y"),
                        )
                    )

    return Response(response_list)
