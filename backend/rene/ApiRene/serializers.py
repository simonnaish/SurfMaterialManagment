from rest_framework import serializers

from .models import Sail, Board, Accessoriess, Beginners


class sail_serializer(serializers.ModelSerializer):
    id = serializers.CharField(source="serial")

    class Meta:
        model = Sail
        # fields=['id']
        fields = [
            "id",
            "type",
            "category",
            'brand',
            "model",
            "size",
            "year",
            "whenCame",
            "whenGone",
            "whenSold",
            "repair",
            "sold",
        ]


class board_serializer(serializers.ModelSerializer):
    id = serializers.CharField(source="serial")

    class Meta:
        model = Board
        # fields=['id']
        fields = [
            "id",
            "type",
            "category",
            'brand',
            "model",
            "size",
            "year",
            "whenCame",
            "whenGone",
            "whenSold",
            "repair",
            "sold",
        ]


class beginner_serializer(serializers.ModelSerializer):
    class Meta:
        model = Beginners
        fields = ["id", "type", "model", "size", "whenCame", "whenGone", "gone"]


class accessorie_serializer(serializers.ModelSerializer):
    class Meta:
        model = Accessoriess
        fields = ["id", "type", "model", "size", "whenCame", "whenGone", "gone"]
