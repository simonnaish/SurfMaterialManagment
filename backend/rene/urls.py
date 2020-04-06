from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from .ApiRene import views

router=routers.DefaultRouter()
router.register(r"sails", views.sail_view_set)
router.register(r"boards",views.board_view_set)
router.register(r"beginners", views.beginners_view_set)
router.register(r"accessories", views.accessories_view_set)

urlpatterns = [
    path('', include(router.urls)),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
    path('admin/', admin.site.urls),
]
