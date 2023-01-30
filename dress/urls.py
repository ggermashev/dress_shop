from django.urls import path, include
from rest_framework import routers
from dress.views import *

router = routers.SimpleRouter()
router.register('dress', DressViewSet)
router.register('slots', SlotViewSet)

urlpatterns = [
    path('api/', include(router.urls))
]