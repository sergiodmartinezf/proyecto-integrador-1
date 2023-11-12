from django.contrib import admin
from django.urls import path
from twm_proyecto_1 import views
from . import views


urlpatterns = [
    path('', views.Inicio_app, name='pagina_de_inicio'),
    path('crearcuenta/', views.crearcuenta, name='crearcuenta/'),
    path('crearcuenta2/', views.crearcuenta2, name='crearcuenta2/'),
    path('iniciarsesion/', views.iniciarsesion, name='iniciarsesion/'),
    path('calendario/', views.calendario, name='calendario/'),
    path('admin/', admin.site.urls),# VIDEO 3: Aqui esta el url de la vistaTest
    #path('pagina_de_inicio/', views.pagina_de_inicio,'pagina_de_inicio/') # VIDEO 4: Codigo html
]
