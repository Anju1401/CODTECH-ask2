const questions = [
  {
    
    question: "What does the acronym RAM stands for?",
      answers: [
        { text: "Random Access Memory", correct: true },
        { text: "Read Access Memory", correct: false },
        { text: "Run Access Memory", correct: false },
        { text: "Read Only Memory", correct: false },
      ],
    },
    {
      question: "Who is known as father of computer?",
      answers: [
        { text: "Aln Turing", correct: false },
        { text: "Charles Babbage", correct: true },
        { text: "Tim Berners-Lee", correct: false },
        { text: "John von Neumann", correct: false },
      ],
    },
    {
      question: "What does CPU stands for?",
      answers: [
        { text: "Computer Personal Unit", correct: false },
        { text: "Central Primary Unit", correct: false },
        { text: "Control Processing Unit", correct: false },
        { text: "Central Processing Unit", correct: true },
      ],
    },
    {
      question: "Which of the following is not a programming language?.",
      answers: [
        { text: "Microsoft", correct: true },
        { text: "Python", correct: false },
        { text: "Java", correct: false },
        { text: "HTML", correct: false },
      ],
    },
    {
      question: "Who invented the World Wide Web (www)?",
      answers: [
        { text: "Stev Jobs", correct: false },
        { text: "Bill Gates", correct: false },
        { text: "Tim Berners-Lee", correct: true },
        { text: "Larry Page", correct: false },
      ],
    },
    {
      question: "Which of the following is an input device?",
      answers: [
        { text: "Monitor", correct: false },
        { text: "Keyboard", correct: true },
        { text: "Printer", correct: false },
        { text: "Speaker", correct: false },
      ],
    },
        {
      question: "What does URL stands for?",
      answers: [
        { text: "Universal Resource Locator", correct: false },
        { text: "United Resource Locator", correct: false },
        { text: "Unifrom Resource Locator", correct: true },
        { text: "Uniform Resource Link", correct: false },
      ],
    },
    {
      question: "What does HTTP stands for?",
      answers: [
        { text: "HyperText Transfer Protocol", correct: true },
        { text: "HyperTransfer Text Protocol ", correct: false },
        { text: "HyperText Transmission Protocol", correct: false },
        { text: "HyperTransfer Transmission Protocol", correct: false },
      ],
    },
    {
      question: "Which of the following is an example of Operating system?",
      answers: [
        { text: "Google Chrome", correct: false },
        { text: "Microsoft Word", correct: true },
        { text: "Windows", correct: false },
        { text: "Facebook", correct: false },
      ],
    },
    {
      question: "Which of the following is not a computer network?",
      answers: [
        { text: "LAN", correct: false },
        { text: "WAN", correct: false },
        { text: "MAN", correct: false },
        { text: "CAN", correct: true },
      ],
    },
  ];

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const messageContainer = document.getElementById('message-container');
const messageElement = document.getElementById('message');
const restartButton = document.getElementById('restart-btn');
const confettiContainer = document.getElementById('confetti-container');

let currentQuestionIndex = 0;
let score = 0;

function startGame() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.classList.add('hide');
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
  clearConfetti();
  messageContainer.style.display = 'none';
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === 'true';
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  });
  if (correct) {
    score++;
    triggerConfetti();
  }
  nextButton.classList.remove('hide');
  if (questions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    nextButton.innerText = 'Finish';
    nextButton.classList.remove('hide');
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('incorrect');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('incorrect');
}

nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    messageContainer.style.display = 'block';
    messageElement.innerText = `Quiz Finished! Your score is ${score}.`;
    nextButton.classList.add('hide');
    restartButton.style.display = 'block';
  }
});

restartButton.addEventListener('click', () => {
  startGame();
  restartButton.style.display = 'none';
});

function triggerConfetti() {
  for (let i = 0; i < 10; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.animationDelay = Math.random() * 2 + 's';
    confetti.style.backgroundColor = getRandomColor();
    confettiContainer.appendChild(confetti);
  }
}

function clearConfetti() {
  confettiContainer.innerHTML = '';
}

function getRandomColor() {
  const colors = ['#ff6347', '#32cd32', '#87ceeb', '#ff69b4', '#d3d3d3'];
  return colors[Math.floor(Math.random() * colors.length)];
}

startGame();
