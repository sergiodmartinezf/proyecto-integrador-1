from django.http import HttpResponse

# VIDEO 4: Para vistaFechaActual
import datetime

# VIDEO 3: Esto se llama función vista. vistaTest es 
# la primera vista aqui y es para testear.
def vistaTest(request):
    return HttpResponse("Hola")

# VIDEO 4: Código html
def vistaCodigoHtml(request):
    cod_html="""<html>
    <body>
    <h1>
    buenas
    </h1>
    </body>
    </html>"""
    return HttpResponse(cod_html)

# VIDEO 4: Muestra fecha actual
def vistaFechaActual(request):
    fecha_actual=datetime.datetime.now()
    return HttpResponse(fecha_actual)

