const startButton = document.querySelector(".start");
const nextButton = document.querySelector(".next");
const questionElement = document.querySelector(".question");
const optionsElement = document.querySelector(".options");

let shuffledQuestionsArray,
  score = 0,
  currentQuestionIndex = 0;

const questionsArray = [
  {
    question: "_______ is the smallest unit of data in a computer ?",
    answers: [
      {
        text: "Bit",
        isCorrect: true,
      },
      {
        text: "Gigabyte",
        isCorrect: false,
      },
      {
        text: "Byte",
        isCorrect: false,
      },
      {
        text: "Terabyte",
        isCorrect: false,
      },
    ],
  },
  {
    question: "Which of the following is NOT an anti-virus software ?",
    answers: [
      {
        text: "Linux",
        isCorrect: true,
      },
      {
        text: "Avast",
        isCorrect: false,
      },
      {
        text: "Norton",
        isCorrect: false,
      },
      {
        text: "Kaspersky",
        isCorrect: false,
      },
    ],
  },
  {
    question:
      "In the context of digital computer, which of the following pairs of digits is referred to as binary code ?",
    answers: [
      {
        text: "0 and 1",
        isCorrect: true,
      },
      {
        text: "3 and 4",
        isCorrect: false,
      },
      {
        text: "2 and 3",
        isCorrect: false,
      },
      {
        text: "1 and 2",
        isCorrect: false,
      },
    ],
  },
  {
    question:
      "Which unit of the computer is considered as the brain of the computer ?",
    answers: [
      {
        text: "CPU",
        isCorrect: true,
      },
      {
        text: "Memory unit",
        isCorrect: false,
      },
      {
        text: "Input unit",
        isCorrect: false,
      },
      {
        text: "Output unit",
        isCorrect: false,
      },
    ],
  },
  {
    question: "What is the full form of PROM ?",
    answers: [
      {
        text: "Programmable read-only memory",
        isCorrect: true,
      },
      {
        text: "Primary read-only memory",
        isCorrect: false,
      },
      {
        text: "Program read-only memory",
        isCorrect: false,
      },
      {
        text: "Program read-output memory",
        isCorrect: false,
      },
    ],
  },
  {
    question: "In the context of computing, what is the full form of URL ?",
    answers: [
      {
        text: "Uniform Resource Locator",
        isCorrect: true,
      },
      {
        text: "Undistributed Resource Locator",
        isCorrect: false,
      },
      {
        text: "Unified Resource Locator",
        isCorrect: false,
      },
      {
        text: "Uniform Region Locator",
        isCorrect: false,
      },
    ],
  },
  {
    question:
      " 	Which of the following is an input device used to enter motion data in computers or other electronic devices ?",
    answers: [
      {
        text: "Trackball",
        isCorrect: true,
      },
      {
        text: "Monitor",
        isCorrect: false,
      },
      {
        text: "Plotter",
        isCorrect: false,
      },
      {
        text: "Joystick",
        isCorrect: false,
      },
    ],
  },
  {
    question: "In the context of computing, a byte is equal to _____ bits ?",
    answers: [
      {
        text: "8",
        isCorrect: true,
      },
      {
        text: "4",
        isCorrect: false,
      },
      {
        text: "16",
        isCorrect: false,
      },
      {
        text: "24",
        isCorrect: false,
      },
    ],
  },
  {
    question:
      " 	_____ is a small, portable flash memory card that plugs into a computer’s USB port and functions as a portable hard drive ?",
    answers: [
      {
        text: "Flash drive",
        isCorrect: true,
      },
      {
        text: "CD-RW",
        isCorrect: false,
      },
      {
        text: "DVD-ROM",
        isCorrect: false,
      },
      {
        text: "CD-ROM",
        isCorrect: false,
      },
    ],
  },
  {
    question:
      "Which of the following devices is NOT used to enter data into a computer ?",
    answers: [
      {
        text: "Monitor",
        isCorrect: true,
      },
      {
        text: "Keyboard",
        isCorrect: false,
      },
      {
        text: "Scanner",
        isCorrect: false,
      },
      {
        text: "Mouse",
        isCorrect: false,
      },
    ],
  },
];

startButton.addEventListener("click", () => {
  startButton.classList.add("hide");
  questionElement.classList.remove("hide");
  optionsElement.classList.remove("hide");
  shuffledQuestionsArray = shuffle(questionsArray);
  setQuestion(shuffledQuestionsArray[currentQuestionIndex]);
});

optionsElement.addEventListener("click", (e) => {
  const selectedButton = e.target;
  const allButtons = Array.from(optionsElement.children);

  if (selectedButton.classList.contains("options")) return;

  selectedButton.classList.add("selected");

  allButtons.forEach((button) => {
    button.disabled = true;
    if (button.dataset.isCorrect === "true") {
      button.classList.add("correct");
    } else {
      button.classList.add("incorrect");
    }
  });

  if (selectedButton.dataset.isCorrect === "true") {
    document.body.classList.add("correct");
    score++;
  } else {
    document.body.classList.add("incorrect");
  }

  nextButton.classList.remove("hide");
});

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex + 1 < shuffledQuestionsArray.length) {
    nextButton.classList.add("hide");
    document.body.classList.remove("correct");
    document.body.classList.remove("incorrect");
    currentQuestionIndex++;
    setQuestion(shuffledQuestionsArray[currentQuestionIndex]);
  } else {
    document.body.classList.remove("correct");
    document.body.classList.remove("incorrect");
    questionElement.textContent = `You scored ${score} out of ${shuffledQuestionsArray.length}.`;
    optionsElement.textContent = "";
    startButton.textContent = "Restart";
    startButton.classList.remove("hide");
    nextButton.classList.add("hide");
    currentQuestionIndex = 0;
    score = 0;
  }
});

function setQuestion(question) {
  const answers = shuffle(question.answers);
  questionElement.textContent = question.question;
  optionsElement.textContent = "";

  answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("btn");
    button.dataset.isCorrect = answer.isCorrect;
    optionsElement.append(button);
  });
}

function shuffle(questions) {
  return questions.sort(() => Math.random() - 0.5);
}
