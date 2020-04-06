from django.shortcuts import render
from rest_framework import viewsets
from .models import Sail, Board, Accessoriess, Beginners

from .SerialsParsers import SailSerial, BoardSerial
from .serializers import sail_serializer, board_serializer, beginner_serializer, accessorie_serializer

class sail_view_set(viewsets.ModelViewSet):
    queryset = Sail.objects.all().order_by('serial')
    serializer_class = sail_serializer

    def perform_create(self, serializer):
        serial = self.request.data["id"]
        if SailSerial.check_number(serial):
            serializer.save(
                serial=serial.upper(),
                type=SailSerial.set_type(serial),
                category=SailSerial.set_category(serial),
                model=SailSerial.set_model(serial),
                size=SailSerial.set_size(serial),
                year=SailSerial.set_year(serial),
            )
class board_view_set(viewsets.ModelViewSet):
    queryset = Board.objects.all().order_by('sold', 'repair',  'serial')
    serializer_class = board_serializer

    def perform_create(self, serializer):
        serial = self.request.data["id"]
        if BoardSerial.check_number(serial):
            serializer.save(
                serial=serial.upper(),
                type=BoardSerial.set_type(serial),
                category=BoardSerial.set_category(serial),
                model=BoardSerial.set_model(serial),
                size=BoardSerial.set_volume(serial),
                year=BoardSerial.set_year(serial),
            )

class beginners_view_set(viewsets.ModelViewSet):
    queryset = Beginners.objects.all().order_by('type', 'model', 'size')
    serializer_class = beginner_serializer

class accessories_view_set(viewsets.ModelViewSet):
    queryset = Accessoriess.objects.all().order_by('type', 'model', 'size')
    serializer_class = accessorie_serializer


