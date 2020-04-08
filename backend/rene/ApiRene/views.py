from django.shortcuts import render
from rest_framework import viewsets
from url_filter.integrations.drf import DjangoFilterBackend


from .models import Sail, Board, Accessoriess, Beginners

from .SerialsParsers import SailSerial, BoardSerial
from .serializers import (
    sail_serializer,
    board_serializer,
    beginner_serializer,
    accessorie_serializer,
)


class sail_view_set(viewsets.ModelViewSet):
    queryset = Sail.objects.all().order_by("sold", "repair", "serial")
    serializer_class = sail_serializer
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['type', 'category', 'model', 'size', 'year', 'whenCame', 'whenGone', 'whenSold', 'repair', 'sold']


    def perform_create(self, serializer):
        serial = self.request.data["id"]

        message = SailSerial.check_number(serial)
        if message == "":
            serializer.save(
                serial=serial.upper(),
                type=SailSerial.set_type(serial),
                category=SailSerial.set_category(serial),
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
    filter_fields = ['type', 'category', 'model', 'size', 'year', 'whenCame', 'whenGone', 'whenSold', 'repair', 'sold']

    def perform_create(self, serializer):
        serial = self.request.data["id"]
        message = BoardSerial.check_number(serial)
        if message == "":
            serializer.save(
                serial=serial.upper(),
                type=BoardSerial.set_type(serial),
                category=BoardSerial.set_category(serial),
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
    filter_fields = ['id', 'type', 'model', 'size', 'whenCame', 'whenGone', 'gone']


class accessories_view_set(viewsets.ModelViewSet):
    queryset = Accessoriess.objects.all().order_by("type", "model", "size")
    serializer_class = accessorie_serializer
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['id', 'type', 'model', 'size', 'whenCame', 'whenGone', 'gone']

# class recently_added_set(viewsets.ModelViewSet):
#     sails_set=Sail.objects.all().order_by('whenCame')
#     boards_set=Board.objects.all().order_by('whenCame')
#     beginners_set=Beginners.objects.all().order_by('whenCame')
#     accessories_set=Accessoriess.objects.all().order_by('whenCame')
#     sails_set.join(boards_set)
#     sails_set.update(accessories_set)
#     sails_set.update(beginners_set)
#     queryset = sails_set
#     # serializer_class = recently_added_serializer