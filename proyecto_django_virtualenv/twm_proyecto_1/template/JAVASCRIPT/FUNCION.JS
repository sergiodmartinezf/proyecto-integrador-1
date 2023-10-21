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
