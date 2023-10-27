from django.db import models

# Create your models here.

class Macd_Scraping_Data(models.Model):
    product_name=models.CharField(max_length=100,null=True,blank=True)
    food_details = models.JSONField(blank=True,null=True)