from django.http import HttpResponse
from django.shortcuts import render
from django.db import connection
# VIDEO 4: Para vistaFechaActual
import datetime

# VIDEO 3: Esto se llama función vista. vistaTest es 
# la primera vista aqui y es para testear.
def Inicio_app(request):
    #return HttpResponse("Hola")
    return render(request, 'HTML/inicio2.html')

def crearcuenta(request):
    
    return render(request,'HTML/signUp.html')

def crearcuenta2(request):
    if request.method == 'POST':
        nombre = request.POST.get('nombre')
        correo = request.POST.get('correo')
        contraseña = request.POST.get('contraseña')
        print(nombre)
        print(correo)
        print(contraseña)

        sql = 'INSERT INTO aplicacion_1_usuario (nombre, correo, contra) VALUES (%s, %s, %s)'
        cursor = connection.cursor()
        cursor.execute(sql, [nombre, correo, contraseña])

        #connection.commit()

        return HttpResponse("Usuario creado exitosamente") 

    return HttpResponse("Método no permitido")
def iniciarsesion(request):
    # Recibir correo y contraseña y devolver respuesta
    return render(request, 'HTML/signIn.html')

def calendario(request):

    return render(request, 'HTML/calendario.html')

# SERGIO
#def iniciosesion2(request):
    if request.method == 'POST':
        correo = request.POST.get('correo')
        contraseña = request.POST.get('contraseña')
        print(correo)
        print(contraseña)

        sql = 'SELECT aplicacion_1_usuariO (correo, contra) VALUES (%s, %s, %s)'
        cursor = connection.cursor()
        cursor.execute(sql, [correo, contraseña])

        #connection.commit()

        return HttpResponse("Usuario creado exitosamente") 

    return HttpResponse("Método no permitido")


