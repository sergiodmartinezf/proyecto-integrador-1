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
        sql = 'SELECT correo, contra, cont FROM aplicacion_1_usuario WHERE correo=%s AND contra=%s'
        cursor = connection.cursor()
        cursor.execute(sql, [correo, contra])

        usuario=cursor.fetchone()
        print(usuario) 

        if usuario == None:

            return HttpResponse("El usuario no fue encontrado", status=400)
        
        else:
            # Usuario encontrado exitosamente
            print("paso request")
            print(usuario[3])
            if usuario[3] == 0:
                # El usuario fue encontrado y es nuevo (se realiza cambio en cont porque dejarpa de ser nuevo)

                #sql = 'UPDATE aplicacion_1_usuario SET cont=cont+1 WHERE correo=%s AND contra=%s;'
                #cursor = connection.cursor()
                #cursor.execute(sql, [correo, contra])

                print("response cond 0")

                #return JsonResponse({'cond': 0})
                response = JsonResponse({'cond': 0})
                response.set_cookie('usuario_id', str(usuario[0]))
                return response
            else:
                # El usuario fue encontrado y no es nuevo
                return JsonResponse({'cond': 1})
        

    return HttpResponse("Método no permitido")


# SERGIO
def crearequipo(request):
    if request.method == 'POST':
        nombreEquipo = request.POST.get('nombreEquipo')
        cantidadIntegrantes = request.POST.get('cantidadIntegrantes')
        print(nombreEquipo,nombreEquipo,"TESSSSSST")
        #colorEquipo = request.POST.get('colorEquipo')
        print(nombreEquipo)
        print(cantidadIntegrantes)
        #print(colorEquipo)

        sql = 'INSERT INTO aplicacion_1_equipo (nombre, cantIntegrantes, descripcion) VALUES (%s, %s, %s)'
        cursor = connection.cursor()
        cursor.execute(sql, [nombreEquipo, cantidadIntegrantes, ""])

        #connection.commit()

        return HttpResponse("Equipo creado exitosamente") 

    return HttpResponse("Método no permitido")

# SERGIO
def unirmeaequipo(request):
    usuario_id = request.COOKIES.get('usuario_id')
    if request.method == 'POST':
        nombreEquipo = request.POST.get('nombreEquipo')
        identificador = request.POST.get('identificador')
        print(nombreEquipo)
        print(identificador)

        # Comprueba si el equipo que inicia sesión está en la base de datos.
        sql = 'SELECT * FROM aplicacion_1_equipo WHERE nombre=%s AND ID=%s'
        cursor = connection.cursor()
        cursor.execute(sql, [nombreEquipo, identificador])

        equipoBuscar=cursor.fetchone()
        print(equipoBuscar) 

        if equipoBuscar == None:

            return HttpResponse("El equipo no fue encontrado", status=400)
        
        else:
            # return HttpResponse("El equipo fue encontrado exitosamente")

            # Cuenta cantidad de miembros
            sql = 'SELECT ID_equipo_id, COUNT (*) AS totalMiembrosEquipo FROM aplicacion_1_miembros WHERE ID_equipo_id = %s;'
            cursor = connection.cursor()
            cursor.execute(sql, [identificador])

            cantMiembros = cursor.fetchone()
            print("cantMiembros[1]:",cantMiembros[1])

            # Cuenta cantidad de integrantes para el equipo
            sql = 'SELECT aplicacion_1_equipo.cantIntegrantes FROM aplicacion_1_equipo WHERE aplicacion_1_equipo.nombre = %s AND aplicacion_1_equipo.ID = %s'
            cursor = connection.cursor()
            cursor.execute(sql, [nombreEquipo, identificador])

            cantIntEquipo = cursor.fetchone()
            print("cantIntEquipo[0]:",cantIntEquipo[0])

            if cantMiembros[1] >= cantIntEquipo[0]:

                return HttpResponse("El equipo está lleno", status=400)
                
            else:
                # Busca si el usuario ya es miembro del equipo
                sql = 'SELECT * FROM aplicacion_1_miembros WHERE aplicacion_1_miembros.ID_equipo_id = %s AND aplicacion_1_miembros.ID_usuario_id = %s'
                cursor = connection.cursor()
                cursor.execute(sql, [identificador, usuario_id])

                buscarUsuarioEnEquipo = cursor.fetchone()

                if buscarUsuarioEnEquipo != None:
                    return HttpResponse("El usuario ya está en el equipo", status=400)
                    
                else:
                    sql = 'INSERT INTO aplicacion_1_miembros (ID_equipo_id, ID_usuario_id) VALUES (%s, %s)'
                    cursor = connection.cursor()
                    cursor.execute(sql, [identificador, usuario_id])

                    return HttpResponse("Usuario pudo unirse al equipo exitosamente")
        

    return HttpResponse("Método no permitido")