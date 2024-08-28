const choices = document.querySelectorAll("[data-choice-text]");
const finalColumn = document.querySelector("[data-final-column]");
const yourScore = document.querySelector("#your-score");
const computerScore = document.querySelector("#computer-score");
const ALL_CHOICES = [
  { name: "rock", emoji: "✊️️", beats: "scissors" },
  { name: "paper", emoji: "🖐️", beats: "rock" },
  { name: "scissors", emoji: "️✌️", beats: "paper" },
];

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const yourChoice = madeChoice(choice.dataset.choiceText);
    const computerChoice = randomChoice();
    const yourWinner = isWinner(yourChoice, computerChoice);
    const computerWinner = isWinner(computerChoice, yourChoice);
    addResult(computerChoice, computerWinner);
    addResult(yourChoice, yourWinner);
    if (yourWinner) incrementScore(yourScore);
    if (computerWinner) incrementScore(computerScore);
  });
});

function madeChoice(choiceText) {
  return ALL_CHOICES.find((choice) => choice.name === choiceText);
}

function randomChoice() {
  const randomIndex = Math.floor(Math.random() * ALL_CHOICES.length);
  return ALL_CHOICES[randomIndex];
}

function isWinner(choice, opponentChoice) {
  return choice.name === opponentChoice.beats;
}

function addResult(choice, isWinner) {
  const div = document.createElement("div");
  div.classList.add("result");
  div.innerText = choice.emoji;
  if (isWinner) div.classList.add("winner");
  finalColumn.after(div);
}

function incrementScore(score) {
  score.innerText = parseInt(score.innerText) + 1;
}
