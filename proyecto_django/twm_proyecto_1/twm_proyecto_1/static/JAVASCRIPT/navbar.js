// JavaScript en tu archivo FUNCION.JS
const menuToggle = document.getElementById("menu-toggle");
const menu = document.querySelector("#top-menu ul");

menuToggle.addEventListener("click", function() {
  menu.classList.toggle("show");
});
