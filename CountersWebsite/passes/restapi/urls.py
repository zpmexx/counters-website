from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PassListView,PassListDetailView, Pass24ListView, PassListSalonView, Pass24GroupView
from .views import PassPreviousSeven,PassCurrentSeven,PassPreviousThirty,PassCurrenThirty,PassGroupedByDay,PassGroupedByHour

urlpatterns = [
    #path('', include(router.urls)),
    path("today/",Pass24GroupView.as_view(),name='passes-group'),
    path("wszystkie/",PassListView.as_view(),name='passes-list'),
    path('<int:pk>/',PassListDetailView.as_view(),name='pass-detail'),
    path('salon/<str:salon>/', PassListSalonView.as_view(), name = 'pass-salon'),
    path("dzis/", Pass24ListView.as_view(), name = 'passes-24'),

    path("previous_seven/", PassPreviousSeven.as_view(), name = 'previous_seven'),
    path("current_seven/", PassCurrentSeven.as_view(), name = 'current_seven'),
    path("previous_thirty/", PassPreviousThirty.as_view(), name = 'previous_thirty'),
    path("current_thirty/", PassCurrenThirty.as_view(), name = 'current_thirty'),
    path("grouped_by_day/", PassGroupedByDay.as_view(), name = 'grouped_by_day'),
    path("grouped_by_hour/", PassGroupedByHour.as_view(), name = 'grouped_by_hour'),

]