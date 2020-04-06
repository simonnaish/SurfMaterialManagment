from rest_framework import serializers

from .models import Sail, Board, Accessoriess, Beginners

class sail_serializer(serializers.ModelSerializer):
    id=serializers.CharField(source='serial')

    class Meta:
        model=Sail
        # fields=['id']
        fields=['id','type', 'category', 'model', 'size','year', 'whenCame', 'whenGone', 'whenSold', 'repair', 'sold']

class board_serializer(serializers.ModelSerializer):
    id=serializers.CharField(source='serial')

    class Meta:
        model=Board
        # fields=['id']
        fields=['id','type', 'category', 'model', 'size','year', 'whenCame', 'whenGone', 'whenSold', 'repair', 'sold']

class beginner_serializer(serializers.ModelSerializer):
    id=serializers.CharField(source='serial')

    class Meta:
        model=Beginners
        # fields=['id']
        fields=['id','type', 'category', 'model', 'size','year', 'whenCame', 'whenGone', 'whenSold', 'repair', 'sold']

class accessorie_serializer(serializers.ModelSerializer):
    id=serializers.CharField(source='serial')

    class Meta:
        model=Accessoriess
        # fields=['id']
        fields=['id','type', 'category', 'model', 'size','year', 'whenCame', 'whenGone', 'whenSold', 'repair', 'sold']
