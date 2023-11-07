from django.contrib import admin

from aplicacion_1.models import Usuario, Equipo, Tareas, Miembros, Comunicaciones, Acciones

# Register your models here.

admin.site.register(Usuario)
admin.site.register(Equipo)
admin.site.register(Tareas)
admin.site.register(Miembros)
admin.site.register(Comunicaciones)
admin.site.register(Acciones)
