# Generated by Django 4.2.6 on 2023-11-15 01:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('aplicacion_1', '0003_usuario_cont'),
    ]

    operations = [
        migrations.AddField(
            model_name='equipo',
            name='cantIntegrantes',
            field=models.IntegerField(default=0),
        ),
    ]