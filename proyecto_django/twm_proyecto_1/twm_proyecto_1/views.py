from django.http import HttpResponse
from django.shortcuts import render
from django.db import connection
from django.http import JsonResponse # SERGIO

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
def equipo(request):
    return render(request, 'HTML/equipo.html')

# SERGIO
def iniciosesion2(request):
    if request.method == 'POST':
        correo = request.POST.get('correo')
        contra = request.POST.get('contra')
        print(correo)
        print(contra)

        sql2 = 'SELECT t.Nombre AS nombre_tarea,t.descripcion AS descripcion_tarea,t.fecha_entr AS fecha_entrada_tarea,e.nombre AS nombre_equipo FROM Tareas t JOIN Equipo e ON t.ID_equipo_id = e.ID where correo=%s AND contra=%s ;'
        cursor = connection.cursor()
        cursor.execute(sql2, [correo, contra])

        tareas=cursor.fetchone()
        print(tareas) 

        # Comprueba si el usuario que inicia sesión está en la base de datos.
        sql2 = 'SELECT correo, contra, cont FROM aplicacion_1_usuario WHERE correo=%s AND contra=%s'
        cursor = connection.cursor()
        cursor.execute(sql, [correo, contra])

        usuario=cursor.fetchone()
        print(usuario) 

        if usuario == None:

            return HttpResponse("El usuario no fue encontrado", status=400)
        
        else:
            # Usuario encontrado exitosamente
            if usuario[2] == 0:
                # El usuario fue encontrado y es nuevo (se realiza cambio en cont porque dejarpa de ser nuevo)

                #sql = 'UPDATE aplicacion_1_usuario SET cont=cont+1 WHERE correo=%s AND contra=%s;'
                #cursor = connection.cursor()
                #cursor.execute(sql, [correo, contra])

                return JsonResponse({'cond': 0})
            else:
                # El usuario fue encontrado y no es nuevo
                return JsonResponse({'cond': 1})
        

    return HttpResponse("Método no permitido")


