
from rest_framework import generics
from .serializers import PassSerializer
from passes.models import Pass
from datetime import datetime

class PassListView(generics.ListAPIView):
    queryset = Pass.objects.all()
    serializer_class = PassSerializer
    
class PassListDetailView(generics.ListAPIView):
    serializer_class = PassSerializer
    
    def get_queryset(self):
        pk = self.kwargs['pk']
        return Pass.objects.filter(id = pk)
    

class Pass24ListView(generics.ListAPIView):
    serializer_class = PassSerializer
    
    def get_queryset(self):
        return Pass.objects.filter(date = datetime.today().strftime('%Y-%m-%d')).order_by('-time')
    

class PassListSalonView(generics.ListAPIView):
    serializer_class = PassSerializer
    
    def get_queryset(self):
        salon = self.kwargs['salon']
        return Pass.objects.filter(salon = salon)