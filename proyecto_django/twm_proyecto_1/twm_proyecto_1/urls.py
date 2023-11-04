from django.contrib import admin
from django.urls import path
from twm_proyecto_1 import views


urlpatterns = [
    path('admin/', admin.site.urls),# VIDEO 3: Aqui esta el url de la vistaTest
    #path('pagina_de_inicio/', views.pagina_de_inicio,'pagina_de_inicio/') # VIDEO 4: Codigo html
]
