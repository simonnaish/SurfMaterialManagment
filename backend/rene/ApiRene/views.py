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
        serializer.save(
            serial=serial.upper(),
            type=SailSerial.set_type(serial),
            category=SailSerial.set_category(serial),
            model=SailSerial.set_model(serial),
            size=SailSerial.set_volume(serial),
            year=SailSerial.set_year(serial),
        )
