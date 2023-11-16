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
      Swal.fire({
        title: 'Lista de Tareas',
        html:'<input id="task" class="swal2-input" placeholder="Ingrese una tarea">' +
              '<input id="team" class="swal2-input" placeholder="Equipo al que pertenece">' +
              '<input id="desc" class="swal2-input" placeholder="Descripción">'+contenidoTarea,
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

  if (tarea.trim() !== "" && equipo.trim() !== "" && fechaEntrega.trim() !== "") {
    // Obtener la referencia del tbody de la tabla
    var tbodyAsignar = document.getElementById("asignar-table").getElementsByTagName('tbody')[0];
    var tbodyPendientes=document.getElementById("pendientes-table").getElementsByTagName('tbody')[0];
    var tbodyTareas=document.getElementById("Tareas-table").getElementsByTagName('tbody')[0];

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
    agregarBotonesATareas(filaTareas);
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


