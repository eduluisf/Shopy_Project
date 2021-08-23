const navToggle = document.querySelector(".hamb-menu");
const navMenu = document.querySelector(".menu_container");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("menu_visible");
});

const buttonCart = document.querySelector(".buttonCart");
const tableContainer = document.querySelector(".tableContainer");

buttonCart.addEventListener("click", () => {
  tableContainer.classList.toggle("table_visible");
});
