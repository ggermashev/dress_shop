from django.urls import path, include
from rest_framework import routers
from shop.views import *

router = routers.SimpleRouter()
router.register('users', UserViewSet)
router.register('users_id', UserIdViewSet)
router.register('login', LoginViewSet)
router.register('review', ReviewViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('', page),
    path('about/', page),
    path('login/', page),
    path('registration/', page),
    path('logout/', page),
    path('dress/<int:dress_id>/', dress),
    path('profile/', page),
]
