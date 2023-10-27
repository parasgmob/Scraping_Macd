from .models import *
from rest_framework import serializers

class Data_Serializer(serializers.ModelSerializer):
    class Meta:
        model=Macd_Scraping_Data
        fields=['food_details']
