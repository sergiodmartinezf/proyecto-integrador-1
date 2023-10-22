"""
URL configuration for twm_proyecto_1 project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

# VIDEO 3: Primero importo mi vista
from twm_proyecto_1.views import vistaTest

# VIDEO 4: Importo vistas nuevas
from twm_proyecto_1.views import vistaCodigoHtml, vistaFechaActual

urlpatterns = [
    path('admin/', admin.site.urls),
    path("vistaTestUrl/", vistaTest), # VIDEO 3: Aqui esta el url de la vistaTest
    path("vistaCodigoHtmlUrl/", vistaCodigoHtml), # VIDEO 4: Codigo html
    path("vistaFechaActualUrl/", vistaFechaActual), # VIDEO 4: Codigo html
]
