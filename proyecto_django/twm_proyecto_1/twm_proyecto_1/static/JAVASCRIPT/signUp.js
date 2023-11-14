$(document).ready(function () {
    $("#crearCuentaBtn").click(function () {
      // Obtener valores de los campos por su id
      var nombre = $("#Nombre").val();
      var correo = $("#Correo").val();
      var contrasena = $("#Contraseña").val();

      // Crear objeto con los datos
      var formData = {
        'nombre': nombre,
        'correo': correo,
        'contrasena': contrasena,
        'csrfmiddlewaretoken': $('[name="csrfmiddlewaretoken"]').val(),
      };

      console.log(formData);

      $.ajax({
        type: "POST",
        url: "crearcuenta/",
        data: formData,
        success: function (response) {
          console.log(response);
        },
        error: function (error) {
          console.log(error);
        }
      });
    });
  });