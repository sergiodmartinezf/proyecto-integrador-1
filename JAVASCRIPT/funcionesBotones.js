
// Función para agregar botones a la fila de la tabla "equipos-table"
function agregarBotonesFila(fila) {
    // Agregar celdas para los botones a la fila
    var celdaMasOpciones = fila.insertCell(3);
    var celdaActualizar = fila.insertCell(4);
    var celdaEliminar = fila.insertCell(5);
  
    // Crear y agregar el botón con tres puntos suspensivos
    var botonMasOpciones = document.createElement("button");
    botonMasOpciones.innerHTML = '<i class="material-icons">more_vert</i>';
    botonMasOpciones.className = "more-options-button";
  
    // Crear y agregar el botón de actualizar con un icono de actualización
    var botonActualizar = document.createElement("button");
    botonActualizar.innerHTML = '<i class="material-icons">update</i>';
    botonActualizar.className = "update-button";
    botonActualizar.addEventListener("click", () => {
      // Agregar aquí la lógica para actualizar los datos
      // Puedes abrir otro cuadro de diálogo con SweetAlert para la actualización
      Swal.fire(
        'Datos actualizados correctamente.',
        '',
        'success'
      );
    });
  
    // Crear y agregar el botón de eliminar
    var botonEliminar = document.createElement("button");
    botonEliminar.innerHTML = 'X';
    botonEliminar.className = "delete-button";
    botonEliminar.addEventListener("click", () => {
      Swal.fire({
        title: '¿Desea Eliminar el equipo?',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        onBeforeOpen: () => {
          // Puedes agregar lógica adicional aquí si es necesario
        },
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
      }).then((result) => {
        if (result.isConfirmed) {
          // Agregar aquí la lógica para confirmar la eliminación del equipo
          fila.remove(); // Elimina la fila de la tabla
          Swal.fire(
            'El equipo ha sido eliminado correctamente.',
            '',
            'success'
          );
        }
      });
    });
  
    // Agregar los botones a las celdas correspondientes
    celdaMasOpciones.appendChild(botonMasOpciones);
    celdaActualizar.appendChild(botonActualizar);
    celdaEliminar.appendChild(botonEliminar);
  }
  
  // Función para agregar botones a todas las filas de la tabla "equipos-table"
  function agregarBotonesAEquipos() {
    // Obtén todas las filas de la tabla
    var filasTabla = document.getElementById("equipos-table").getElementsByTagName('tbody')[0].rows;
  
    // Itera sobre cada fila y llama a la función para agregar botones
    for (var i = 0; i < filasTabla.length; i++) {
      var fila = filasTabla[i];
  
      // Llama a la función para agregar botones con la información de la fila
      agregarBotonesFila(fila);
    }
  }

// Función para agregar botones a la fila de la tabla "asignar-table"
function agregarBotonesFilaAsignar(fila) {
  // Agregar celdas para los botones a la fila
  var celdaMasOpciones = fila.insertCell(3);

  // Crear y agregar el botón con tres puntos suspensivos
  var botonMasOpciones = document.createElement("button");
  botonMasOpciones.innerHTML = '<i class="material-icons">more_vert</i>';
  botonMasOpciones.className = "more-options-button";

  // Agregar evento click al botón
  botonMasOpciones.addEventListener("click", () => {
    const contenidoIntegrantes = document.getElementById('Integrantes').innerHTML;
    const contenidoDesc=document.getElementById('desc').innerHTML;

    // Muestra SweetAlert con el contenido del div
    Swal.fire({
      title: 'Integrantes',
      html: contenidoIntegrantes+contenidoDesc,
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    });
  });

  // Agregar los botones a las celdas correspondientes
  celdaMasOpciones.appendChild(botonMasOpciones);
}

  
  // Función para agregar botones a todas las filas de la tabla "asignar-table"
  function agregarBotonesAAsignar() {
    // Obtén todas las filas de la tabla
    var filasTabla = document.getElementById("asignar-table").getElementsByTagName('tbody')[0].rows;
  
    // Itera sobre cada fila y llama a la función para agregar botones
    for (var i = 0; i < filasTabla.length; i++) {
      var fila = filasTabla[i];
  
      // Llama a la función para agregar botones con la información de la fila
      agregarBotonesFilaAsignar(fila);
    }
  }

  // Función para agregar botones a la fila de la tabla "pendientes-table"
function agregarBotonesFilaPendientes(fila) {
    // Agregar celdas para los botones a la fila
    var celdaMasOpciones = fila.insertCell(3);

    // Crear y agregar el botón con tres puntos suspensivos
    var botonMasOpciones = document.createElement("button");
    botonMasOpciones.innerHTML = 'Iniciar';
    botonMasOpciones.className = "iniciar-button";

    // Agregar los botones a las celdas correspondientes
    celdaMasOpciones.appendChild(botonMasOpciones);
}

// Función para agregar botones a todas las filas de la tabla "pendientes-table"
function agregarBotonesAPendientes() {
    // Obtén todas las filas de la tabla
    var filasTabla = document.getElementById("pendientes-table").getElementsByTagName('tbody')[0].rows;

    // Itera sobre cada fila y llama a la función para agregar botones
    for (var i = 0; i < filasTabla.length; i++) {
        var fila = filasTabla[i];

        // Llama a la función para agregar botones con la información de la fila
        agregarBotonesFilaPendientes(fila);
    }
}

// Función para agregar botones a la fila de la tabla "progreso-table"
function agregarBotonesFilaProgreso(fila) {
    // Agregar celdas para los botones a la fila
    var celdaMasOpciones = fila.insertCell(3);

    // Crear y agregar el botón con tres puntos suspensivos
    var botonMasOpciones = document.createElement("button");
    botonMasOpciones.innerHTML = 'Finalizar';
    botonMasOpciones.className = "finalizar-button";

    // Agregar los botones a las celdas correspondientes
    celdaMasOpciones.appendChild(botonMasOpciones);
}

// Función para agregar botones a todas las filas de la tabla "progreso-table"
function agregarBotonesAProgreso() {
    // Obtén todas las filas de la tabla
    var filasTabla = document.getElementById("progreso-table").getElementsByTagName('tbody')[0].rows;

    // Itera sobre cada fila y llama a la función para agregar botones
    for (var i = 0; i < filasTabla.length; i++) {
        var fila = filasTabla[i];

        // Llama a la función para agregar botones con la información de la fila
        agregarBotonesFilaProgreso(fila);
    }
}

// Función para agregar botones a la fila de la tabla "integrantes-table"
function agregarBotonesFilaIntegrantes(fila) {
    // Agregar celdas para los botones a la fila
    var celdaMasOpciones = fila.insertCell(2);

    // Crear y agregar el botón con tres puntos suspensivos
    var botonMasOpciones = document.createElement("button");
    botonMasOpciones.innerHTML = 'Asignar';
    botonMasOpciones.className = "Asignar-button";

    // Agregar los botones a las celdas correspondientes
    celdaMasOpciones.appendChild(botonMasOpciones);
}

// Función para agregar botones a todas las filas de la tabla "integrantes-table"
function agregarBotonesAIntegrantes() {
    // Obtén todas las filas de la tabla
    var filasTabla = document.getElementById("Integrantes-table").getElementsByTagName('tbody')[0].rows;

    // Itera sobre cada fila y llama a la función para agregar botones
    for (var i = 0; i < filasTabla.length; i++) {
        var fila = filasTabla[i];

        // Llama a la función para agregar botones con la información de la fila
        agregarBotonesFilaIntegrantes(fila);
    }
}
// Función para agregar botones a la fila de la tabla "tareas-table"
function agregarBotonesFilaTareas(fila, selectedDay, selectedMonth, selectedYear) {
  // Agregar celdas para los botones a la fila
  const fechaEntrega = selectedDay + '/' + selectedMonth + '/' + selectedYear;
  var celdaMasOpciones = fila.insertCell(3);
  // Crear y agregar el botón con tres puntos suspensivos
  var botonMasOpciones = document.createElement("button");
  botonMasOpciones.innerHTML = 'Iniciar';
  botonMasOpciones.className = "Iniciar-button";

  // Agregar los botones a las celdas correspondientes
  celdaMasOpciones.appendChild(botonMasOpciones);
}

// Función para agregar botones a todas las filas de la tabla "tareas-table"
function agregarBotonesATareas(selectedDay,selectedMonth,selectedYear) {
  // Obtén todas las filas de la tabla
  var filasTabla = document.getElementById("Tareas-table").getElementsByTagName('tbody')[0].rows;

  // Itera sobre cada fila y llama a la función para agregar botones
  for (var i = 0; i < filasTabla.length; i++) {
    var fila = filasTabla[i];

    // Llama a la función para agregar botones con la información de la fila
    agregarBotonesFilaTareas(fila,selectedDay,selectedMonth,selectedYear);
  }
}
