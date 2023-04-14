from rest_framework import generics
from .serializers import PassSerializer, GroupBySerializer
from passes.models import Pass
from datetime import datetime, timedelta
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from django.db.models import Count

class PassListView(generics.ListAPIView):
    # permission_classes = [IsAuthenticated]
    queryset = Pass.objects.all().order_by('-date','-time')
    serializer_class = PassSerializer
    filter_backends = [DjangoFilterBackend,filters.SearchFilter]
    filterset_fields = {'date': ['exact'],
                        'time': ['gte', 'lte'],}
    search_fields = ['salon']
    #next, previous, count hide
    def get_paginated_response(self, data):
       return Response(data)
    
class PassListDetailView(generics.ListAPIView):
    serializer_class = PassSerializer
    # permission_classes = [IsAuthenticated]
    def get_queryset(self):
        pk = self.kwargs['pk']
        return Pass.objects.filter(id = pk)
    
    #next, previous, count hide
    def get_paginated_response(self, data):
       return Response(data)
    
    
class Pass24GroupView(generics.ListAPIView):
    serializer_class = GroupBySerializer
    # permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter,DjangoFilterBackend]
    filterset_fields = {'date': ['gte', 'lte'],
                        'salon' : ['exact'],}
    search_fields = ['salon']
    
    def get_queryset(self):
        return Pass.objects.filter(date =  datetime.today().strftime('%Y-%m-%d')).values('salon').annotate(count=Count('*')).order_by('-count')

    #next, previous, count hide
    def get_paginated_response(self, data):
        return Response(data)  
    
    

class Pass24ListView(generics.ListAPIView):
    serializer_class = PassSerializer
    # permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter,DjangoFilterBackend]
    ilterset_fields = {'time': ['gte', 'lte'],}
    search_fields = ['salon']
    
    def get_queryset(self):
        return Pass.objects.filter(date = datetime.today().strftime('%Y-%m-%d')).order_by('-time')
    
    #next, previous, count hide
    def get_paginated_response(self, data):
       return Response(data)
    

class PassListSalonView(generics.ListAPIView):
    serializer_class = PassSerializer
    # permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {'date': ['exact'],
                        'time': ['gte', 'lte'],}
    
    def get_queryset(self):
        salon = self.kwargs['salon']
        return Pass.objects.filter(salon = salon)
        
    #next, previous, count hide
    def get_paginated_response(self, data):
       return Response(data)
    

class PassCurrentSeven(generics.ListAPIView):
    serializer_class = GroupBySerializer
    # permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter,DjangoFilterBackend]
    filterset_fields = {'date': ['gte', 'lte'],
                        'salon' : ['exact'],}
    search_fields = ['salon']
    
    def get_queryset(self):
        return Pass.objects.filter(date__gte=datetime.now()-timedelta(days=7)).values('salon').annotate(count=Count('*')).order_by('-count')

    #next, previous, count hide
    def get_paginated_response(self, data):
        return Response(data) 

class PassPreviousSeven(generics.ListAPIView):
    serializer_class = GroupBySerializer
    # permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter,DjangoFilterBackend]
    filterset_fields = {'date': ['gte', 'lte'],
                        'salon' : ['exact'],}
    search_fields = ['salon']
    
    def get_queryset(self):
        start_date = datetime.now() - timedelta(days=14)
        end_date = datetime.now() - timedelta(days=7)
        return Pass.objects.filter(date__gte=start_date, date__lt=end_date).values('salon').annotate(count=Count('*')).order_by('-count')

    #next, previous, count hide
    def get_paginated_response(self, data):
        return Response(data)  
    
class PassPreviousThirty(generics.ListAPIView):
    serializer_class = GroupBySerializer
    # permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter,DjangoFilterBackend]
    filterset_fields = {'date': ['gte', 'lte'],
                        'salon' : ['exact'],}
    search_fields = ['salon']
    
    def get_queryset(self):
        start_date = datetime.now() - timedelta(days=60)
        end_date = datetime.now() - timedelta(days=30)
        return Pass.objects.filter(date__gte=start_date, date__lt=end_date).values('salon').annotate(count=Count('*')).order_by('-count')
    
    def get_paginated_response(self, data):
        return Response(data) 
    
class PassCurrenThirty(generics.ListAPIView):
    serializer_class = GroupBySerializer
    # permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter,DjangoFilterBackend]
    filterset_fields = {'date': ['gte', 'lte'],
                        'salon' : ['exact'],}
    search_fields = ['salon']
    
    def get_queryset(self):
        return Pass.objects.filter(date__gte=datetime.now()-timedelta(days=30)).values('salon').annotate(count=Count('*')).order_by('-count')

    #next, previous, count hide
    def get_paginated_response(self, data):
        return Response(data) 
    
class PassGroupedByDay(generics.ListAPIView):
    pass
    
class PassGroupedByHour(generics.ListAPIView):
    pass

