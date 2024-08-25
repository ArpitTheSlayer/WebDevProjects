let error = document.querySelector("#error");
let form = document.querySelector("#form");
let password = document.querySelector("#password");
let messages = [];

form.addEventListener("submit", (e) => {
  if (password.value.toLowerCase() === "password") {
    messages.push("Password cannot be password");
  } else if (password.value.length <= 6) {
    messages.push("Password must be longer than 6 characters");
  } else if (password.value.length >= 20) {
    messages.push("Password must be less than 20 characters");
  }
  if (messages.length > 0) {
    e.preventDefault();
    error.innerText = messages.join(", ");
    messages = [];
  }
});
