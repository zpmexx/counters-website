from rest_framework import serializers
from passes.models import Pass

class PassSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Pass
        fields = "__all__"

class GroupBySerializer(serializers.Serializer):
    salon = serializers.CharField()
    count = serializers.SerializerMethodField()

    def get_count(self, obj):
        return obj['count']

class GroupByHourSerializer(serializers.Serializer):
    hour = serializers.IntegerField()
    count = serializers.SerializerMethodField()

    def get_count(self, obj):
        return obj['count']

class GroupByDaySerializer(serializers.Serializer):
    date = serializers.CharField()
    count = serializers.SerializerMethodField()

    def get_count(self, obj):
        return obj['count']