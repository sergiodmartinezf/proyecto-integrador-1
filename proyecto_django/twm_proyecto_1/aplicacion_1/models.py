from django.db import models

# Create your models here.

class Usuario(models.Model):
    ID=models.AutoField(primary_key=True)
    Nombre=models.CharField(max_length=100)
    fnac=models.DateField()
    correo=models.CharField(max_length=50)
    contra=models.CharField(max_length=30)

class Equipo(models.Model):
    ID=models.AutoField(primary_key=True)
    nombre=models.CharField(max_length=50)
    descripcion=models.CharField(max_length=200)

class Tareas(models.Model):
    ID=models.AutoField(primary_key=True)
    Nombre=models.CharField(max_length=100)
    descripcion=models.CharField(max_length=200)
    fecha_ini=models.DateField()
    fecha_fin=models.DateField()
    ID_equipo=models.ForeignKey(Equipo, to_field='ID', on_delete=models.CASCADE)

class Miembros(models.Model):
    ID=models.AutoField(primary_key=True)
    ID_equipo=models.ForeignKey(Equipo, to_field='ID', on_delete=models.CASCADE)
    ID_usuario=models.ForeignKey(Usuario, to_field='ID', on_delete=models.CASCADE)

class Comunicaciones(models.Model):
    tipo=models.CharField(max_length=15)
    contenido=models.CharField(max_length=100)
    fecha=models.DateField()
    ID_equipo=models.ForeignKey(Equipo, to_field='ID', on_delete=models.CASCADE)
    ID_usuario=models.ForeignKey(Usuario, to_field='ID', on_delete=models.CASCADE)

class Acciones(models.Model):
    tipo=models.CharField(max_length=15)
    fecha=models.DateField()
    ID_equipo=models.ForeignKey(Equipo, to_field='ID', on_delete=models.CASCADE)
    ID_usuario=models.ForeignKey(Usuario, to_field='ID', on_delete=models.CASCADE)
