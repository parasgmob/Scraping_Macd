from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
from drf_yasg.utils import swagger_auto_schema
from mtk_app.models import Macd_Scraping_Data
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework import status
from selenium import webdriver
from .serializers import *
import requests
import bs4

# Create your views here.


class Macd_Nutrition(viewsets.ViewSet):

    '''Getting all macd food details by scraping macd website '''

    @swagger_auto_schema(operation_description="Scrapping Macd food deatils",responses={200:"Ok",400:"Bad Request"})
    def create(self,request):

        options = webdriver.ChromeOptions()
        options.add_experimental_option("detach", True)
        options.add_argument("--headless")
        product_list=Macd_Scraping_Data.objects.all().values_list('product_name')
        product_list=list(map(lambda x:x[0],product_list))
        response_data={}
        data={}
        browser_driver=webdriver.Chrome(service=Service(ChromeDriverManager().install()))
        resp=requests.get(url='https://www.mcdonalds.com/us/en-us/about-our-food/nutrition-calculator.html')
        sope_value=bs4.BeautifulSoup(resp.text,'lxml')
        no_of_manu=sope_value.findAll('ul',attrs={'class':'menu-items clearfix'})
        count=1
        for manu in no_of_manu:
            
            for category in manu:

                if category != None:

                    ancher=category.find('a')
                    if ancher != -1 :

                        span=category.find('span',{'class':'menu-text'})
                        href_link='https://www.mcdonalds.com/'+ancher['href']
                        category_name=span.text
                        data.update({'category':category_name})
                        response_data.update({category_name:href_link})

        for key in response_data.keys():

            product_link=response_data[key]
            product_dict={}
            resp=requests.get(url=product_link)
            sope_value=bs4.BeautifulSoup(resp.text,'lxml')
            no_of_product=sope_value.findAll('li',attrs={'class':"cmp-category__item"})
            for product in no_of_product:

                product_name=product.find('div',{'class':"cmp-category__item-name"}).text

                product_url='https://www.mcdonalds.com'+product.find('a')['href']
                product_dict.update({product_name:product_url})
                product_resp=requests.get(url=product_url)
                browser_driver.get(product_url)
                content=browser_driver.page_source
                sope_value=bs4.BeautifulSoup(content,features="html.parser")
            
                nutrition_dict={}
                for property in sope_value.find_all('li',{"class":"cmp-nutrition-summary__heading-primary-item"}):

                    key1=property.find('span',{"class":"metric"})
                    key1=key1.find('span',{"class":"sr-only sr-only-pd"}).text.strip()
                    key_name_list=key1.split('\n')
                    key1=key_name_list[0]
                    value=property.find('span',{"class":"value"})
                    value=value.find('span',{"class":"sr-only sr-only-pd","aria-hidden":"true"}).text.strip()
                    nutrition_dict[key1]=value
                product_dict.update({product_name:nutrition_dict})
                data.update({'category':key})
                data.update({'product_name':product_name})
                data.update({"nutritions_details":nutrition_dict})

                if product_name not in product_list:
                    db_obj=Macd_Scraping_Data()
                    db_obj.product_name=product_name
                    db_obj.food_details=data
                    db_obj.save()
            response_data.update({key:product_dict})
        return Response(response_data,status=200)


    ''' Getting All details of data in response from database'''

    @swagger_auto_schema(operation_description="Getting Macd food deatils",responses={200:"Ok",400:"Bad Request"})
    def list(self,request):
        data=Macd_Scraping_Data.objects.all().values()
        serializer=Data_Serializer(data,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)



    