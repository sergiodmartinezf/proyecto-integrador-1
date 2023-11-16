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
      Swal.fire({
        title: 'Lista de Tareas',
        html: '<div id="task-list"></div>' +
              '<input id="task" class="swal2-input" placeholder="Ingrese una tarea">' +
              '<input id="team" class="swal2-input" placeholder="Equipo al que pertenece">' +
              '<input id="desc" class="swal2-input" placeholder="Descripción">',
        showCancelButton: true,
        confirmButtonText: 'Asignar Nueva Tarea',
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
          // Recupera los valores de los atributos de datos del día
          const selectedDay = dayDiv.dataset.day;
          const selectedMonth = dayDiv.dataset.month;
          const selectedYear = dayDiv.dataset.year;

          // Pasa la información a la función agregarDato
          agregarDato(selectedDay, selectedMonth, selectedYear);
        }
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
});function agregarDato(selectedDay, selectedMonth, selectedYear) {
  const fechaEntrega = selectedDay + '/' + selectedMonth + '/' + selectedYear;

  // Verificar si los campos no están vacíos 
  const tarea = document.getElementById("task").value;
  const equipo = document.getElementById("team").value;
  const desc = document.getElementById("desc").value;

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
// FIN AJAX

  if (tarea.trim() !== "" && equipo.trim() !== "" && fechaEntrega.trim() !== "") {
    // Obtener la referencia del tbody de la tabla
    var tbody = document.getElementById("asignar-table").getElementsByTagName('tbody')[0];

    // Crear una nueva fila
    var fila = tbody.insertRow();

    // Agregar celdas a la fila
    var celdaTarea = fila.insertCell(0);
    var celdaEquipo = fila.insertCell(1);
    var celdaFechaEntrega = fila.insertCell(2);

    // Agregar los nuevos datos a las celdas
    celdaTarea.innerHTML = tarea;
    celdaEquipo.innerHTML = equipo;
    celdaFechaEntrega.innerHTML = fechaEntrega;

    // Mostrar un mensaje de confirmación con SweetAlert
    Swal.fire('Campo agregado correctamente', '', 'success');
  } else {
    // Mostrar un mensaje de alerta si algún campo está vacío
    Swal.fire('Ingrese datos válidos en todos los campos', '', 'error');
  }
}

function agregarBotones(fila) {
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


function agregarBotonesTablas(fila) {
  // Agregar celdas para los botones a la fila
  var celdaMasOpciones = fila.insertCell(3);

  // Crear y agregar el botón con tres puntos suspensivos
  var botonMasOpciones = document.createElement("button");
  botonMasOpciones.innerHTML = '<i class="material-icons">more_vert</i>';
  botonMasOpciones.className = "more-options-button";

  botonMasOpciones.addEventListener("click", () => {
    // Obtener la tabla de equipos
    var IntegrantesTable = document.getElementById("Integrantes-table");

    Swal.fire({
      title: 'Asignar Tarea',
      html: IntegrantesTable.outerHTML, // Insertar el HTML de la tabla de equipos en el contenido del cuadro de diálogo
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      onBeforeOpen: () => {
        // Puedes agregar lógica adicional aquí si es necesario
      },
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      customClass: {
        popup: 'mi-popup-clase', // Agregar tu clase personalizada aquí
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Agregar aquí la lógica para confirmar la asignación de tarea
        Swal.fire(
          'La tarea ha sido asignada correctamente.',
          '',
          'success'
        );
      }
    });
  });

  // Agregar los botones a las celdas correspondientes
  celdaMasOpciones.appendChild(botonMasOpciones);
}


function agregarBotonesTablaIntegrantes(fila) {
  // Agregar celdas para los botones a la fila
  var celdaMasOpciones = fila.insertCell(2);

  // Crear y agregar el botón con tres puntos suspensivos
  var botonMasOpciones = document.createElement("button");
  botonMasOpciones.innerHTML = 'Asignar';
  botonMasOpciones.className = "Asignar-button";

  botonMasOpciones.addEventListener("click", () => {
    // Obtener la tabla de equipos
    var IntegrantesTable = document.getElementById("Integrantes-table");

    Swal.fire({
      title: 'Asignar Tarea',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      onBeforeOpen: () => {
        // Puedes agregar lógica adicional aquí si es necesario
      },
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      customClass: {
        popup: 'mi-popup-clase', // Agregar tu clase personalizada aquí
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Agregar aquí la lógica para confirmar la asignación de tarea
        Swal.fire(
          'La tarea ha sido asignada correctamente.',
          '',
          'success'
        );
      }
    });
  });

  // Agregar los botones a las celdas correspondientes
  celdaMasOpciones.appendChild(botonMasOpciones);
}


// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
  // Llama a la función para agregar botones a la tabla "terminados"
  agregarBotonesAEquipos();
  agregarBotonesATablas();
  agregarBotonAIntegrantes();
  agregarBotonAsignar(); 
  
});
// Función para agregar botones a la tabla "Equipos"
function agregarBotonesAEquipos() {
  agregarBotonesPorTabla("equipos-table");
}

// Función para agregar botones a la tabla "Asignar"
function agregarBotonesAAsignar() {
  agregarBotonesPorTabla("asignar-table");
}

// Función para agregar botones a la tabla "Terminados"
function agregarBotonesATerminados() {
  agregarBotonesPorTabla("terminados-table");
}

// Función para agregar botones a la tabla "Pendientes"
function agregarBotonesAPendientes() {
  agregarBotonesPorTabla("pendientes-table");
}

// Función para agregar botones a la tabla "Progreso"
function agregarBotonesAProgreso() {
  agregarBotonesPorTabla("progreso-table");
}

// Función para agregar botones a la tabla "Integrantes"
function agregarBotonesAIntegrantes(){
  agregarBotonTablaIntegrantes("Integrantes-table");
}

// Función genérica para agregar botones a una tabla específica
function agregarBotonesPorTabla(tableId) {
  // Obtén todas las filas de la tabla
  var filasTabla = document.getElementById(tableId).getElementsByTagName('tbody')[0].rows;

  // Itera sobre cada fila y llama a la función para agregar botones
  for (var i = 0; i < filasTabla.length; i++) {
    var fila = filasTabla[i];

    // Llama a la función para agregar botones con la información de la fila
    agregarBotonesTablas(fila);
  }
}

function agregarBotonTablaIntegrantes(tableId) {
  // Obtén todas las filas de la tabla
  var filasTabla = document.getElementById(tableId).getElementsByTagName('tbody')[0].rows;

  // Itera sobre cada fila y llama a la función para agregar botones
  for (var i = 0; i < filasTabla.length; i++) {
    var fila = filasTabla[i];

    // Llama a la función para agregar botones con la información de la fila
    agregarBotonesTablaIntegrantes(fila);
  }
}

// Llamadas a las funciones específicas para cada tabla
agregarBotonesAEquipos();
agregarBotonesAAsignar();
agregarBotonesATerminados();
agregarBotonesAPendientes();
agregarBotonesAProgreso();
agregarBotonesAIntegrantes();


// Ocultar el div al cargar la página
document.addEventListener('DOMContentLoaded', function () {
  var miDiv = document.querySelector('.Integrantes');
  miDiv.style.display = "none";
});