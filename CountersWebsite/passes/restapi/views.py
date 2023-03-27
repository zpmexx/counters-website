
from rest_framework import generics
from .serializers import PassSerializer
from passes.models import Pass
from datetime import datetime
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

class PassListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Pass.objects.all().order_by('-date','-time')
    serializer_class = PassSerializer
    
    #next, previous, count hide
    def get_paginated_response(self, data):
       return Response(data)
    
class PassListDetailView(generics.ListAPIView):
    serializer_class = PassSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        pk = self.kwargs['pk']
        return Pass.objects.filter(id = pk)
    
    #next, previous, count hide
    def get_paginated_response(self, data):
       return Response(data)
    

class Pass24ListView(generics.ListAPIView):
    serializer_class = PassSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return Pass.objects.filter(date = datetime.today().strftime('%Y-%m-%d')).order_by('-time')
    #next, previous, count hide
    def get_paginated_response(self, data):
       return Response(data)
    

class PassListSalonView(generics.ListAPIView):
    serializer_class = PassSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        salon = self.kwargs['salon']
        return Pass.objects.filter(salon = salon)
        
    #next, previous, count hide
    def get_paginated_response(self, data):
       return Response(data)