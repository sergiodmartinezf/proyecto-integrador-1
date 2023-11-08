const calendarDiv = document.getElementById("calendar");
const monthYearText = document.getElementById("month-year");
const prevMonthButton = document.getElementById("prev-month");
const nextMonthButton = document.getElementById("next-month");

function generateCalendar(year, month) {
  calendarDiv.innerHTML = "";

  const monthName = new Date(year, month, 1).toLocaleString('default', { month: 'long' });
  monthYearText.textContent = `${monthName} ${year}`;

  // Configuración regional en inglés para días de la semana
  const options = { weekday: 'short' };
  
  const firstDay = new Date(year, month, 1);
  const startingDay = new Intl.DateTimeFormat('en-US', options).format(firstDay);

  // Mapeo de días de la semana en inglés a números (0=lunes, 1=martes, ..., 6=domingo)
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

    const addTaskButton = document.createElement("span");
    addTaskButton.className = "add-task";
    addTaskButton.textContent = "+";
    const tasks = [];

addTaskButton.addEventListener("click", () => {
  Swal.fire({
    title: 'Lista de Tareas',
    html: '<div id="task-list"></div>' +
          '<input id="task" class="swal2-input" placeholder="Ingrese una tarea">' +
          '<input id="team" class="swal2-input" placeholder="Equipo al que pertenece">'+
          '<input id="desc" class="swal2-input" placeholder="Descripción">',
    showCancelButton: true,
    confirmButtonText: 'Asignar Nueva Tarea',
    cancelButtonText: 'Cancelar',
    onBeforeOpen: () => {
      const taskList = Swal.getPopup().querySelector('#task-list');
      const taskInput = Swal.getPopup().querySelector('#task');
      const teamInput = Swal.getPopup().querySelector('#team');
      const description = Swal.getPopup().querySelector('#desc');
      // Actualizar la lista de tareas en tiempo real
      function updateTaskList() {
        taskList.innerHTML = '';
        tasks.forEach((task) => {
          const taskDiv = document.createElement("div");
          taskDiv.className = "task-box";
          taskDiv.textContent = task;
          taskList.appendChild(taskDiv);
        });
      }

      // Al hacer clic en "Asignar Nueva Tarea"
      Swal.getConfirmButton().addEventListener('click', () => {
        const task = taskInput.value;
        const team = teamInput.value;

        if (task) {
          tasks.push(`Tarea: ${task}, Equipo: ${team}`);
          updateTaskList();
          taskInput.value = '';
          teamInput.value = '';
        }
      });
      //al añadirse nueva tarea debe tener un boton que diga leer descripcion
    },
    allowOutsideClick: false, 
    persistent: true
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