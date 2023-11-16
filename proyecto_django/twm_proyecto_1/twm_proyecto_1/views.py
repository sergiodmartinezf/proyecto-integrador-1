from django.http import HttpResponse
from django.shortcuts import render,redirect
from django.db import connection
from django.http import JsonResponse # SERGIO
from django.contrib.sessions.models import Session
from django.contrib.auth.models import User
from datetime import date

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

        sql = 'INSERT INTO aplicacion_1_usuario (nombre, correo, contra, cont) VALUES (%s, %s, %s, 0)' # HAY QUE DAR CONT (0 POR DEFECTO)
        cursor = connection.cursor()
        cursor.execute(sql, [nombre, correo, contraseña])

        #connection.commit()

        return HttpResponse("Usuario creado exitosamente") 

    return HttpResponse("Método no permitido")
def iniciarsesion(request):
    # Recibir correo y contraseña y devolver respuesta
    return render(request, 'HTML/signIn.html')

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

        # Comprueba si el usuario que inicia sesión está en la base de datos.
        sql = 'SELECT ID, correo, contra, cont FROM aplicacion_1_usuario WHERE correo=%s AND contra=%s'
        cursor = connection.cursor()
        cursor.execute(sql, [correo, contra])

        usuario=cursor.fetchone()
        print(usuario) 
        usuario_id=usuario[0]
        request.session['usuario_id'] = usuario_id
        print(usuario_id)
        if usuario == None:

            return HttpResponse("El usuario no fue encontrado", status=400)
        
        else:
            # Usuario encontrado exitosamente
            print("paso request")

            print(usuario[3])
            if usuario[3] == 0:
                # El usuario fue encontrado y es nuevo (se realiza cambio en cont porque dejará de ser nuevo)

                print("response cond 0")

                response = JsonResponse({'cond': 0, 'usuario_id': usuario_id})
                
                
                return response
                
            else:
                # El usuario fue encontrado y no es nuevo
                sql2="""SELECT e.id AS equipo_id, e.nombre AS nombre_equipo, e.descripcion AS descripcion_equipo, e.cantIntegrantes,
                        u.id AS usuario_id, u.nombre AS nombre_usuario, u.correo,
                        m.id AS miembro_id
                        FROM equipo e
                        JOIN miembro m ON e.id = m.id_equipo_id
                        JOIN usuario u ON m.id_usuario_id = u.id
                        WHERE u.nombre =%s AND u.contra = %s;
                        """
                cursor = connection.cursor()
                cursor.execute(sql2, [correo, contra])
                miequipo=cursor.fetchone()
                print(miequipo) 
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
    if request.method == 'POST':
        nombreEquipo = request.POST.get('nombreEquipo')
        identificador = request.POST.get('identificador')
        print(nombreEquipo)
        print(identificador)
        usuario_id = request.session.get('usuario_id')
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
                
                usuario_id = request.session.get('usuario_id')
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


def calendario(request):
   
    usuario_id = request.session.get('usuario_id')
        # Comprueba si el equipo que inicia sesión está en la base de datos.
    sql = 'SELECT T.Nombre, T.descripcion, T.fecha_ini, T.fecha_fin FROM aplicacion_1_Tareas T JOIN aplicacion_1_Miembros M ON T.ID_equipo_id = M.ID_equipo_id WHERE M.ID_usuario_id =%s'
    cursor = connection.cursor()
    cursor.execute(sql, [usuario_id])

    tareas=cursor.fetchone()
    print(tareas) 
    return render(request, 'HTML/calendario.html')

# SERGIO
def crearTarea(request):
    if request.method == 'POST':
        tarea = request.POST.get('tarea')
        equipo = request.POST.get('equipo')
        fechaEntrega = request.POST.get('fechaEntrega')
        desc = request.POST.get('desc')

        sql = 'SELECT * FROM aplicacion_1_equipo WHERE nombre=%s'
        cursor = connection.cursor()
        cursor.execute(sql, [equipo])

        equipoBuscar=cursor.fetchone()

        if equipoBuscar == None:

            return HttpResponse("El equipo no fue encontrado", status=400)
        
        else:

            equipoID=equipoBuscar[0]

            sql = 'INSERT INTO aplicacion_1_tareas (nombre, descripcion, fecha_ini, fecha_fin, ID_equipo_id, estado, fecha_entrega) VALUES (%s, %s, %s, %s, %s, %s, %s)'
            cursor = connection.cursor()
            cursor.execute(sql, [tarea, desc, date.today(), fechaEntrega, equipoID, 'Incompleta', fechaEntrega])

            return HttpResponse("Tarea creada exitosamente") 

    return HttpResponse("Método no permitido")
