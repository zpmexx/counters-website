# Generated by Django 4.0.1 on 2023-03-23 08:50

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Pass',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('salon', models.CharField(max_length=10, verbose_name='Salon')),
                ('date', models.DateField(verbose_name='Data przejścia')),
                ('time', models.TimeField(verbose_name='Czas przejścia')),
            ],
            options={
                'verbose_name': 'Przejście',
                'verbose_name_plural': 'Przejścia',
                'db_table': 'storage',
                'managed': False,
            },
        ),
    ]
