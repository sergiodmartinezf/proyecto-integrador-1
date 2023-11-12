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
        #sql3_='insert nombre,correo,contraseña from usuario where nombre=%s and correo=%s and contraseña=%s'
        #cursor = connection.cursor()
        #cursor.execute(sql3_, [nombre,correo,contraseña])

        return render(request,'HTML/signIn.html')
def iniciarsesion(request):

    return render(request, 'HTML/signIn.html')

def calendario(request):

    return render(request, 'HTML/calendario.html')

