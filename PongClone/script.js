import Ball from "./Ball.js";
import Paddle from "./Paddle.js";

let lastTime;
const ball = new Ball(document.querySelector(".ball"));
const playerScore = document.querySelector(".player.score");
const computerScore = document.querySelector(".computer.score");
const playerPaddle = new Paddle(document.querySelector(".player.paddle"));
const computerPaddle = new Paddle(document.querySelector(".computer.paddle"));

document.addEventListener("mousemove", (e) => {
  playerPaddle.position = (e.y / window.innerHeight) * 100;
});

document.addEventListener("touchmove", (e) => {
  playerPaddle.position = (e.touches[0].clientY / window.innerHeight) * 100;
});

window.requestAnimationFrame(update);

function update(time) {
  if (lastTime != null) {
    const delta = time - lastTime;
    changeColor(delta, document.documentElement);
    ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
    computerPaddle.update(delta, ball.y);
    if (hasLost()) handleLose();
  }

  lastTime = time;
  window.requestAnimationFrame(update);
}

function hasLost() {
  const rect = ball.rect();

  return rect.left <= 0 || rect.right >= window.innerWidth;
}

function handleLose() {
  const rect = ball.rect();

  if (rect.left <= 0) {
    computerScore.textContent = parseInt(computerScore.textContent) + 1;
  } else {
    playerScore.textContent = parseInt(playerScore.textContent) + 1;
  }
  ball.reset();
  computerPaddle.reset();
}

function changeColor(delta, root) {
  let hue = parseFloat(getComputedStyle(root).getPropertyValue("--hue"));
  hue += delta / 100;
  root.style.setProperty("--hue", hue % 360);
}
