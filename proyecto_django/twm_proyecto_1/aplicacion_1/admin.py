from django.contrib import admin

from aplicacion_1.models import Usuario, Equipo, Tareas, Miembros, Comunicaciones, Acciones

# Register your models here.

class UsuarioAdmin(admin.ModelAdmin):
    list_display=("ID","Nombre","correo","contra","cont")

class EquipoAdmin(admin.ModelAdmin):
    list_display=("ID","nombre","descripcion")

class TareasAdmin(admin.ModelAdmin):
    list_display=("ID","Nombre","descripcion","fecha_ini","fecha_fin","ID_equipo")

class MiembrosAdmin(admin.ModelAdmin):
    list_display=("ID","ID_equipo","ID_usuario")

class ComunicacionesAdmin(admin.ModelAdmin):
    list_display=("tipo","contenido","fecha","ID_equipo","ID_usuario")

class AccionesAdmin(admin.ModelAdmin):
    list_display=("tipo","fecha","ID_equipo","ID_usuario")

admin.site.register(Usuario, UsuarioAdmin)
admin.site.register(Equipo, EquipoAdmin)
admin.site.register(Tareas, TareasAdmin)
admin.site.register(Miembros, MiembrosAdmin)
admin.site.register(Comunicaciones, ComunicacionesAdmin)
admin.site.register(Acciones, AccionesAdmin)
