from django.contrib import admin
from .models import Pass


class PassAdmin(admin.ModelAdmin):
    list_display = ['salon','date','time_seconds']
    search_fields = ['salon',]
    ordering = ['-date','-time','salon']

    def time_seconds(self, obj):
        return obj.time.strftime("%H:%M:%S")
admin.site.register(Pass, PassAdmin)
admin.site.site_header = 'Lidżnigi'
# Register your models here.
