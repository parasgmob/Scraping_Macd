from . import views
from rest_framework.routers import DefaultRouter

router=DefaultRouter()
router.register('about/food',views.Macd_Nutrition,basename='macd_food')

urlpatterns=router.urls