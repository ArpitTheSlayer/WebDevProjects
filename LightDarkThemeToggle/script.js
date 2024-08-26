let themeToggle = document.querySelector(".theme-toggle");
let container = document.querySelector(".container");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const currentRotation = parseInt(
    getComputedStyle(container).getPropertyValue("--rotation")
  );
  container.style.setProperty("--rotation", currentRotation + 180);
});
