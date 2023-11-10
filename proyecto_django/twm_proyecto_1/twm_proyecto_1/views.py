from django.http import HttpResponse
from django.shortcuts import render
# VIDEO 4: Para vistaFechaActual
import datetime

# VIDEO 3: Esto se llama función vista. vistaTest es 
# la primera vista aqui y es para testear.
def vistaTest(request):
    #return HttpResponse("Hola")
    return render(request, 'HTML/inicio1.html')

def pagina_de_inicio(request):
    return render(request, 'HTML/inicio1.html')

