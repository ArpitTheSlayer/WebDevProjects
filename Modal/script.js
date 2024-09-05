const openModal = document.querySelector(".open-modal");
const closeModal = document.querySelector(".close-modal");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

overflow();
openModal.addEventListener("click", open);
closeModal.addEventListener("click", close);
overlay.addEventListener("click", close);

function open() {
  modal.classList.add("active");
  overlay.classList.add("active");
}

function close() {
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

function overflow() {
  if (modal.scrollHeight <= modal.clientHeight) {
    modal.style.overflowY = "auto";
  }
}
