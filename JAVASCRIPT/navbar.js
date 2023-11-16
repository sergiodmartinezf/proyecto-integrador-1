// JavaScript en tu archivo FUNCION.JS
const menuToggle = document.getElementById("menu-toggle");
const menu = document.querySelector("#top-menu ul");

menuToggle.addEventListener("click", function() {
  menu.classList.toggle("show");
});


document.addEventListener('DOMContentLoaded', function () {
  const userIcon = document.getElementById('user-icon');
  const menuLateral = document.getElementById('menu-lateral');

  userIcon.addEventListener('click', () => {
    menuLateral.classList.toggle('show');
  });
});