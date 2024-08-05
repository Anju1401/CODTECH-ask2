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
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
  
    currentQuestion.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.innerHTML = answer.text;
      button.classList.add("btn");
      answerButtons.appendChild(button);
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", (e) => selectAnswer(e));
    });
  
    resetTimer(); // Reset and start the timer for the current question
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
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    timerElement.style.display = "none"; // Hide the timer when showing the score
  }
  
  function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showScore();
    }
  }
    function restartQuiz() {
    messageContainer.style.display = "none";
    startQuiz();
  }
  
  nextButton.addEventListener("click", () => {
      console.log("Next button clicked");
      currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      handleNextButton();
    } else {
      startQuiz();
    }
  });
  
  restartButton.addEventListener("click", restartQuiz);
  
  startQuiz();
  
