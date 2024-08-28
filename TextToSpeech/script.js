const textInput = document.querySelector("#text");
const speed = document.querySelector("#speed");
const playButton = document.querySelector("#play-button");
const pauseButton = document.querySelector("#pause-button");
const stopButton = document.querySelector("#stop-button");
let currentIndex;

const utterance = new SpeechSynthesisUtterance();

utterance.addEventListener("boundary", (e) => {
  currentIndex = e.charIndex;
});

speed.addEventListener("input", () => {
  stopText();
  playText(utterance.text.substring(currentIndex));
});

playButton.addEventListener("click", () => {
  playText(textInput.value);
});

pauseButton.addEventListener("click", pauseText);

stopButton.addEventListener("click", stopText);

function playText(text) {
  if (speechSynthesis.paused) return speechSynthesis.resume();
  if (speechSynthesis.speaking) return;
  utterance.text = text;
  utterance.rate = speed.value || 1;
  speechSynthesis.speak(utterance);
}

function pauseText() {
  if (speechSynthesis.speaking) speechSynthesis.pause();
}

function stopText() {
  speechSynthesis.resume();
  speechSynthesis.cancel();
}
