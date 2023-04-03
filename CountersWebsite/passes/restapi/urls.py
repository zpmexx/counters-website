from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PassListView,PassListDetailView, Pass24ListView, PassListSalonView, Pass24GroupView


urlpatterns = [
    #path('', include(router.urls)),
    path("",Pass24GroupView.as_view(),name='passes-group'),
    path("wszystkie/",PassListView.as_view(),name='passes-list'),
    path('<int:pk>/',PassListDetailView.as_view(),name='pass-detail'),
    path('salon/<str:salon>/', PassListSalonView.as_view(), name = 'pass-salon'),
    path("dzis/", Pass24ListView.as_view(), name = 'passes-24')
]