from django.contrib import admin
from django.urls import path
from twm_proyecto_1 import views
from . import views


urlpatterns = [
    path('', views.Inicio_app, name='pagina_de_inicio'),
    path('inicio1/', views.inicio1, name='inicio1/'),
    path('tarea_c/', views.tarea_c, name='tarea_c/'),
    path('crearcuenta/', views.crearcuenta, name='crearcuenta/'),
    path('crearcuenta2/', views.crearcuenta2, name='crearcuenta2/'),
    path('iniciarsesion/', views.iniciarsesion, name='iniciarsesion/'),
    path('calendario/', views.calendario, name='calendario/'),
    path('calendario2/', views.calendario2, name='calendario2/'),
    path('admin/', admin.site.urls),
    path('iniciosesion2/', views.iniciosesion2, name='iniciosesion2/'), # SERGIO 
    path('equipo/', views.equipo, name='equipo/'), # SERGIO
    path('crearequipo/', views.crearequipo, name='crearequipo/'), # SERGIO
    path('unirmeaequipo/', views.unirmeaequipo, name='unirmeaequipo/'), # SERGIO
    path('crearTarea/', views.crearTarea, name='crearTarea/'), # SERGIO
    #path('tablaEnCreacionTareas/', views.tablaEnCreacionTareas, name='tablaEnCreacionTareas/'), # SERGIO
]
