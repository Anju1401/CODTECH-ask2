const questions = [
  {
    question: "What does the acronym RAM stand for?",
    answers: [
      { text: "Random Access Memory", correct: true },
      { text: "Read Access Memory", correct: false },
      { text: "Run Access Memory", correct: false },
      { text: "Read Only Memory", correct: false },
    ],
  },
  // Additional questions here...
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const confettiContainer = document.getElementById("confetti-container");
const messageContainer = document.getElementById("message-container");
const messageElement = document.getElementById("message");
const restartButton = document.getElementById("restart-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  questionElement.innerHTML = currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
  const celebration = document.querySelector(".celebration");
  if (celebration) {
    celebration.remove();
  }
  document.querySelectorAll(".confetti").forEach(confetti => confetti.remove());
  messageContainer.style.display = "none";
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
    showCelebration();
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showCelebration() {
  const celebration = document.createElement("div");
  celebration.classList.add("celebration");
  celebration.innerText = "Correct! 🎉 Great job!";
  document.body.appendChild(celebration);

  const numberOfConfetti = 50;
  for (let i = 0; i < numberOfConfetti; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");

    const size = Math.random() * 10 + 10;
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size}px`;

    confetti.style.backgroundColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.random()})`;
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.animationDelay = `${Math.random() * 2}s`;

    confettiContainer.appendChild(confetti);
  }
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  messageContainer.style.display = "block";
  messageElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", handleNextButton);

restartButton.addEventListener("click", startQuiz);

startQuiz();
