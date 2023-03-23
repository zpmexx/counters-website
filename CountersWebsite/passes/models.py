from django.db import models

# Create your models here.

class Pass(models.Model):
    salon = models.CharField(verbose_name='Salon', blank=False, null=False, max_length=10)
    date = models.DateField(verbose_name='Data przejścia',blank=False, null=False)
    time = models.TimeField(verbose_name='Czas przejścia',blank=False, null=False)
    
    
    class Meta:
        managed = False
        db_table = 'storage'
        verbose_name = "Przejście"
        verbose_name_plural = "Przejścia"


    def __str__(self) -> str:
        return f'{self.salon} - {self.date} - {self.time}'