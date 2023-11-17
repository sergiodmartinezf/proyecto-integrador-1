const calendarDiv = document.getElementById("calendar");
const monthYearText = document.getElementById("month-year");
const prevMonthButton = document.getElementById("prev-month");
const nextMonthButton = document.getElementById("next-month");

function generateCalendar(year, month) {
  calendarDiv.innerHTML = "";

  const monthName = new Date(year, month, 1).toLocaleString('default', { month: 'long' });
  monthYearText.textContent = `${monthName} ${year}`;

  const options = { weekday: 'short' };
  const firstDay = new Date(year, month, 1);
  const startingDay = new Intl.DateTimeFormat('en-US', options).format(firstDay);

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const startingDayIndex = daysOfWeek.indexOf(startingDay);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < startingDayIndex; i++) {
    const emptyDiv = document.createElement("div");
    emptyDiv.className = "day empty-day";
    calendarDiv.appendChild(emptyDiv);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayDiv = document.createElement("div");
    dayDiv.className = "day";
    dayDiv.textContent = day;
    
    // Agrega información del día, mes y año como atributos de datos
    dayDiv.dataset.day = day;
    dayDiv.dataset.month = month + 1; // Suma 1 porque los meses en JavaScript van de 0 a 11
    dayDiv.dataset.year = year;

    const addTaskButton = document.createElement("span");
    addTaskButton.className = "add-task";
    addTaskButton.textContent = "";

    dayDiv.addEventListener("click", () => {
      const contenidoTarea=document.getElementById('Tareas').innerHTML;
      preConfirm: () => {
          // Recupera los valores de los atributos de datos del día
          const selectedDay = dayDiv.dataset.day;
          const selectedMonth = dayDiv.dataset.month;
          const selectedYear = dayDiv.dataset.year;
          // Muestra SweetAlert con los datos recuperados
          // Pasa la información a la función agregarDato
          agregarDato(selectedDay, selectedMonth, selectedYear);
        }
        Swal.fire({
        title: 'Lista de Tareas',
        html:'<input id="task" class="swal2-input" placeholder="Ingrese una tarea">' +
              '<input id="team" class="swal2-input" placeholder="Equipo al que pertenece">' +
              '<input id="descrip" class="swal2-input" placeholder="Descripción">'+contenidoTarea,
        showCancelButton: true,
        confirmButtonText: 'Asignar Nueva Tarea',
        cancelButtonText: 'Cancelar',
        
      });
    });

    dayDiv.appendChild(addTaskButton);
    calendarDiv.appendChild(dayDiv);
  }

  // Estilo para cuadros vacíos sin bordes ni fondo
  const emptyDayElements = document.querySelectorAll(".empty-day");
  emptyDayElements.forEach((element) => {
    element.style.border = "none";
    element.style.background = "none";
  });
}

function updateCalendar(year, month) {
  generateCalendar(year, month);
}

let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();

updateCalendar(currentYear, currentMonth);

prevMonthButton.addEventListener("click", () => {
  if (currentMonth > 0) {
    currentMonth--;
  } else {
    currentYear--;
    currentMonth = 11;
  }
  updateCalendar(currentYear, currentMonth);
});

nextMonthButton.addEventListener("click", () => {
  if (currentMonth < 11) {
    currentMonth++;
  } else {
    currentYear++;
    currentMonth = 0;
  }
  updateCalendar(currentYear, currentMonth);
});

document.addEventListener('DOMContentLoaded', function () {
  const userIcon = document.getElementById('user-icon');
  const menuLateral = document.getElementById('menu-lateral');

  userIcon.addEventListener('click', () => {
    menuLateral.classList.toggle('show');
  });

});
function agregarDato(selectedDay, selectedMonth, selectedYear) {
  const fechaEntrega = selectedDay + '/' + selectedMonth + '/' + selectedYear;
  const tarea = document.getElementById("task").value;
  const equipo = document.getElementById("team").value;
  const desc = document.getElementById("descrip").value;
  console.log(desc)
  // INICIO AJAX
  $.ajax({
    type: "POST",
    url: "/crearTarea/",
    data: {
            tarea,
            equipo,
            fechaEntrega,
            desc,
            'csrfmiddlewaretoken': $('[name="csrfmiddlewaretoken"]').val(),
    },
    success: function (response) {
      alert(response); // SERGIO
      console.log(response);
    },
    error: function (error) {
      alert(error); // SERGIO 
      console.log(error);
    }
  });
  if (tarea.trim() !== "" && equipo.trim() !== "" && fechaEntrega.trim() !== "") {
    // Obtener la referencia del tbody de la tabla
    var tbodyAsignar = document.getElementById("asignar-table").getElementsByTagName('tbody')[0];
    var tbodyPendientes=document.getElementById("pendientes-table").getElementsByTagName('tbody')[0];
    var tbodyTareas=document.getElementById("Tareas-table").getElementsByTagName('tbody')[0];
    var labelDesc=document.getElementById("descLabel");
    // Crear una nueva fila
    var filaAsignar = tbodyAsignar.insertRow();
    // Crear una nueva fila
    var filaPendientes = tbodyPendientes.insertRow();
    // Crear una nueva fila
    var filaTareas = tbodyTareas.insertRow();
    

    // Agregar celdas a la fila
    var celdaTareaAsignar = filaAsignar.insertCell(0);
    var celdaEquipoAsignar = filaAsignar.insertCell(1);
    var celdaFechaEntregaAsignar = filaAsignar.insertCell(2);
    var celdaTareaPendientes = filaPendientes.insertCell(0);
    var celdaEquipoPendientes = filaPendientes.insertCell(1);
    var celdaFechaEntregaPendientes = filaPendientes.insertCell(2);
    var celdaTareaTareas = filaTareas.insertCell(0);
    var celdaEquipoTareas = filaTareas.insertCell(1);
    var celdaFechaEntregaTareas = filaTareas.insertCell(2);

    // Agregar los nuevos datos a las celdas Asignar
    celdaTareaAsignar.innerHTML = tarea;
    celdaEquipoAsignar.innerHTML = equipo;
    celdaFechaEntregaAsignar.innerHTML = fechaEntrega;

    // Agregar los nuevos datos a las celdas Pendientes
    celdaTareaPendientes.innerHTML = tarea;
    celdaEquipoPendientes.innerHTML = equipo;
    celdaFechaEntregaPendientes.innerHTML = fechaEntrega;

    // Agregar los nuevos datos a las celdas Pendientes
    celdaTareaTareas.innerHTML = tarea;
    celdaEquipoTareas.innerHTML = equipo;
    celdaFechaEntregaTareas.innerHTML = fechaEntrega;

    // Mostrar un mensaje de confirmación con SweetAlert
    Swal.fire('Campo agregado correctamente', '', 'success');

    // Después de agregar la tarea, agregar los botones a la nueva fila
    agregarBotonesFilaAsignar(filaAsignar);
    agregarBotonesFilaPendientes(filaPendientes);

    
    // Llama a la función para agregar el botón "Iniciar" a la fila de la tabla "tareas-table"
    agregarBotonesFilaTareas(filaTareas, selectedDay, selectedMonth, selectedYear);
  } else {
    // Mostrar un mensaje de alerta si algún campo está vacío
    Swal.fire('Ingrese datos válidos en todos los campos', '', 'error');
  }
}

//llamado a botones cada vez que se carga la pagina
document.addEventListener('DOMContentLoaded', function () {
  // Ocultar el div Integrantes
  var IntegrantesDiv = document.querySelector('.Integrantes');
  IntegrantesDiv.style.display = "none";
  // Ocultar el div Descripcion
  var DescDiv = document.querySelector('.desc');
  DescDiv.style.display = "none";
  // Ocultar el div Tareas 
  var TareasDiv = document.querySelector('.Tareas');
  TareasDiv.style.display = "none";
  agregarBotonesAAsignar();
  agregarBotonesAEquipos();
  agregarBotonesAPendientes();
  agregarBotonesAProgreso();
  agregarBotonesAIntegrantes();
  agregarBotonesATareas();
});

function obtenerFechaActual() {
  var fechaActual = new Date();

  // Obtener día, mes y año
  var dia = fechaActual.getDate();
  var mes = fechaActual.getMonth() + 1; // Sumar 1 porque los meses van de 0 a 11
  var año = fechaActual.getFullYear();

  // Formatear la fecha como "dd/mm/yyyy"
  var fechaFormateada = dia + '/' + mes + '/' + año;

  return fechaFormateada;
}


// Función para insertar filas en la tabla "progreso"
function insertarFilasAProgreso(tarea, equipo, fechaEntrega) {
  // Obtener la referencia del tbody de la tabla
  var tbodyProgreso = document.getElementById("progreso-table").getElementsByTagName('tbody')[0];

  // Crear una nueva fila
  var filaProgreso = tbodyProgreso.insertRow();

  // Agregar celdas a la fila
  var celdaTareaProgreso = filaProgreso.insertCell(0);
  var celdaEquipoProgreso = filaProgreso.insertCell(1);
  var celdaFechaEntregaProgreso = filaProgreso.insertCell(2);

  // Agregar los nuevos datos a las celdas
  celdaTareaProgreso.innerHTML = tarea;
  celdaEquipoProgreso.innerHTML = equipo;
  celdaFechaEntregaProgreso.innerHTML = fechaEntrega;

  // Agregar botones a la fila de "progreso"
  agregarBotonesFilaProgreso(filaProgreso);
}


// Función para insertar filas en la tabla "Terminados"
function insertarFilasATerminado(tarea, equipo) {
  // Obtener la referencia del tbody de la tabla
  var tbodyTerminado = document.getElementById("terminados-table").getElementsByTagName('tbody')[0];

  // Crear una nueva fila
  var filaTerminado = tbodyTerminado.insertRow();

  // Agregar celdas a la fila
  var celdaTareaTerminado = filaTerminado.insertCell(0);
  var celdaEquipoTerminado= filaTerminado.insertCell(1);
  var celdaFechaFinalizadoTerminado = filaTerminado.insertCell(2);

  // Agregar los nuevos datos a las celdas
  celdaTareaTerminado.innerHTML = tarea;
  celdaEquipoTerminado.innerHTML = equipo;
  celdaFechaFinalizadoTerminado.innerHTML = obtenerFechaActual();

  // Agregar botones a la fila de "progreso"
  agregarBotonesFilaTerminados(filaProgreso);
}



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
// Función para agregar botones a la fila de la tabla "pendientes-table"
function agregarBotonesFilaPendientes(fila) {
// Agregar celdas para los botones a la fila
var celdaMasOpciones = fila.insertCell(3);

// Crear y agregar el botón con tres puntos suspensivos
var botonMasOpciones = document.createElement("button");
botonMasOpciones.innerHTML = 'Iniciar';
botonMasOpciones.className = "iniciar-button";

// Agregar evento click al botón
botonMasOpciones.addEventListener("click", () => {
    // Puedes agregar aquí cualquier lógica adicional antes de mostrar el mensaje
    Swal.fire({
        title: 'Tu tarea ha sido movida a En Progreso',
        icon: 'success',
        showCancelButton: false,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3085d6',
    });

    // Obtener datos de la tarea
      const tarea = fila.cells[0].innerText;
      const equipo = fila.cells[1].innerText;
      const fechaEntrega = fila.cells[2].innerText;
      
      fila.remove();
      insertarFilasAProgreso(tarea, equipo, fechaEntrega);

});

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
  
// Agregar evento click al botón
botonMasOpciones.addEventListener("click", () => {
  // Puedes agregar aquí cualquier lógica adicional antes de mostrar el mensaje
  Swal.fire({
      title: 'Has Terminado Tu tarea',
      icon: 'success',
      showCancelButton: false,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#3085d6',
  });

  // Obtener datos de la tarea
    const tarea = fila.cells[0].innerText;
    const equipo = fila.cells[1].innerText;
    
    fila.remove();
    insertarFilasATerminado(tarea, equipo);
    

});

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
}// Función para agregar botones a la fila de la tabla "tareas-table"
function agregarBotonesFilaTareas(fila, selectedDay, selectedMonth, selectedYear) {
  // Agregar celdas para los botones a la fila
  const fechaEntrega = selectedDay + '/' + selectedMonth + '/' + selectedYear;
  var celdaMasOpciones = fila.insertCell(3);

  // Crear y agregar el botón con tres puntos suspensivos
  var botonMasOpciones = document.createElement("button");
  botonMasOpciones.innerHTML = '<i class="material-icons">more_vert</i>';
  botonMasOpciones.className = "more-options-button";

  // Agregar evento click al botón
  botonMasOpciones.addEventListener("click", () => {
    // Obtener el contenido del elemento <p> con el ID descLabel
    const descLabel = document.getElementById('descLabel').innerHTML;

    // Muestra SweetAlert con el contenido del elemento
    Swal.fire({
      title: 'Descripción',
      html: descLabel,
      showCancelButton: false,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#3085d6',
    });
  });

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



