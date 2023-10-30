const calendarDiv = document.getElementById("calendar");
        const monthYearText = document.getElementById("month-year");
        const prevMonthButton = document.getElementById("prev-month");
        const nextMonthButton = document.getElementById("next-month");

        function generateCalendar(year, month) {
            calendarDiv.innerHTML = "";

            const monthName = new Date(year, month, 1).toLocaleString('default', { month: 'long' });
            monthYearText.textContent = `${monthName} ${year}`;

            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);
            const daysInMonth = lastDay.getDate();

            for (let day = 1; day <= daysInMonth; day++) {
                const dayDiv = document.createElement("div");
                dayDiv.className = "day";
                dayDiv.textContent = day;

                const addTaskButton = document.createElement("span");
                addTaskButton.className = "add-task";
                addTaskButton.textContent = "+";
                addTaskButton.addEventListener("click", () => {
                    const task = prompt("Ingrese una tarea:");
                    if (task) {
                        const taskDisplay = document.createElement("div");
                        taskDisplay.className = "task-box";
                        taskDisplay.textContent = task;
                        dayDiv.appendChild(taskDisplay);
                    }
                });

                dayDiv.appendChild(addTaskButton);
                calendarDiv.appendChild(dayDiv);
            }
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

        const userIcon = document.getElementById("user-icon");

        // Agregar un evento para ocultar el menú cuando se hace clic en cualquier parte de la página
        document.addEventListener("click", function (event) {
            if (!event.target.matches("#user-icon")) {
              const menus = document.querySelectorAll(".menu-lateral");
              menus.forEach(function (menu) {
                menu.style.display = "none";
              });
            }
          });

          const menuLateral = document.getElementById("menu-lateral");

let menuVisible = false; // Variable para rastrear la visibilidad del menú

userIcon.addEventListener("click", function (event) {
  // Evita que el clic en el icono propague a otros elementos
  event.stopPropagation();

  if (menuVisible) {
    // Si el menú ya está visible, ocúltalo al hacer clic nuevamente en el icono
    menuLateral.style.display = "none";
  } else {
    // Si el menú no está visible, muéstralo
    menuLateral.style.display = "block";
  }

  menuVisible = !menuVisible; // Cambia el estado de visibilidad
});

// Agrega un evento para ocultar el menú cuando se hace clic en cualquier parte de la página
document.addEventListener("click", function () {
  if (menuVisible) {
    menuLateral.style.display = "none";
    menuVisible = false;
  }
});