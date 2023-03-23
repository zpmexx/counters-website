from rest_framework import serializers
from passes.models import Pass

class PassSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Pass
        fields = "__all__"