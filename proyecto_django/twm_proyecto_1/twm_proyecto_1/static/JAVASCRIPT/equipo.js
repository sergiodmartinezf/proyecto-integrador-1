function crearEquipo() {
    Swal.fire({
        title: 'Crear equipo',
        html:
            '<input id="nombreEquipo" class="swal2-input" placeholder="Nombre del equipo">' +
            '<input id="cantidadIntegrantes" class="swal2-input" placeholder="Cantidad de integrantes">' +
            '<select id="colorEquipo" class="swal2-select">' +
                    '<option value="#FF5733">Rojo</option>' +
                    '<option value="#FFC300">Amarillo</option>' +
                    '<option value="#00D68F">Verde</option>' +
                    '<option value="#0091FF">Azul</option>' +
                    '<option value="#FF5733">Rojo</option>'+
                    '<option value="#FFC300">Amarillo</option>'+
                    '<option value="#00D68F">Verde</option>'+
                    '<option value="#0091FF">Azul</option>'+
                    '<option value="#AD4CA3">Morado</option>'+
                    '<option value="#FF6B81">Rosa</option>'+
                    '<option value="#FF9940">Naranja</option>'+
                    '<option value="#8B572A">Marrón</option>'+
                    '<option value="#848C8A">Gris</option>'+
                    '<option value="#FFFFFF">Blanco</option>'+
                    '<option value="#000000">Negro</option>'+
                    '<option value="#00D8FF">Turquesa</option>'+
                    '<option value="#C0FF3E">Verde lima</option>'+
                    '<option value="#3EC0FF">Azul cielo</option>'+
                    '<option value="#A485FF">Lila</option>'+
                    '<option value="#FFB6D1">Rosa claro</option>'+
                    '<option value="#FFF3E2">Beige</option>'+
                    '<option value="#00553D">Verde oscuro</option>'+
                    '<option value="#000040">Azul marino</option>'+
                    '<option value="#800080">Púrpura</option>'+
                    '<option value="#FF00FF">Magenta</option>'+
                    '<option value="#808000">Verde oliva</option>'+
                    '<option value="#FFFFF0">Marfil</option>'+
                    '<option value="#ADD8E6">Azul pálido</option>'+
                    '<option value="#E6E6FA">Lavanda</option>'+
                    '<option value="#FA8072">Salmón</option>'+
                    '<option value="#FFFFE0">Amarillo claro</option>'+
                    '<option value="#90EE90">Verde claro</option>'+
                    '<option value="#D3D3D3">Gris claro</option>'+
                    '<option value="#C0C0C0">Plata</option>'+
                    '<option value="#ADD8E6">Azul claro</option>'+
                    '<option value="#7FFFD4">Aguamarina</option>'+
                    '<option value="#D2B48C">Tostado</option>'+
                    '<option value="#AFEEEE">Turquesa pálido</option>'+
                    '<option value="#2E8B57">Verde mar</option>'+
                    '<option value="#4169E1">Azul real</option>'+
                    '<option value="#FFC0CB">Rosado</option>'+
                    '<option value="#FFDAB9">Melocotón</option>'+
                    '<option value="#00FFFF">Cian</option>'+
                    '<option value="#FFD700">Oro</option>' +
            '</select>',
        focusConfirm: false,
        preConfirm: () => {
            const nombreEquipo = document.getElementById('nombreEquipo').value;
            const cantidadIntegrantes = document.getElementById('cantidadIntegrantes').value;
            const colorEquipo = document.getElementById('colorEquipo').value;
            alert(`Nombre del equipo: ${nombreEquipo}\nCantidad de integrantes: ${cantidadIntegrantes}\nColor: ${colorEquipo}`);
            
            // INICIO AJAX
            $.ajax({
                type: "POST",
                url: "/crearequipo/",
                data: {
                        nombreEquipo,
                        cantidadIntegrantes,
                        'csrfmiddlewaretoken': $('[name="csrfmiddlewaretoken"]').val(),
                },
                success: function (response) {
                  alert("FUNCA"); // SERGIO
                  console.log(response);
                },
                error: function (error) {
                  alert("NO FUNCA"); // SERGIO
                  console.log(error);
                }
              });
            // FIN AJAX
            
        }
    });
}

function unirmeAEquipo() {
    Swal.fire({
        title: 'Unirme a un equipo',
        html:
            '<input id="nombreEquipo" class="swal2-input" placeholder="Nombre del equipo">' +
            '<input id="identificador" class="swal2-input" placeholder="Identificador único">',
        focusConfirm: false,
        preConfirm: () => {
            const nombreEquipo = document.getElementById('nombreEquipo').value;
            const identificador = document.getElementById('identificador').value;
            alert(`Nombre del equipo: ${nombreEquipo}\nIdentificador único: ${identificador}`);
            // INICIO AJAX
            $.ajax({
                type: "POST",
                url: "/unirmeaequipo/",
                data: {
                        nombreEquipo,
                        identificador,
                        'csrfmiddlewaretoken': $('[name="csrfmiddlewaretoken"]').val(),
                },
                success: function (response) {
                  alert("FUNCA"); // SERGIO
                  console.log(response);
                },
                error: function (error) {
                  alert("NO FUNCA"); // SERGIO
                  console.log(error);
                }
              });
            // FIN AJAX
        }
    });
}

function preguntarMasTarde() {
    alert("Has seleccionado 'Preguntar más tarde'.");
}