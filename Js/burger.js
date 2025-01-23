const burger = document.querySelector(".burger");
const navbar = document.querySelector(".navbar");

burger.addEventListener("click", () => {
  navbar.classList.toggle("active");
  burger.classList.toggle("active");
});
