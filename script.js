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
const answerbuttons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

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
    answerbuttons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", (e) => selectAnswer(e));
  });
}

function resetState() {
  //Hide the "Next" button
  nextButton.style.display = "none";

  //Remove all child element from the 'asnwerbuttons' container
  while (answerbuttons.firstChild) {
    answerbuttons.removeChild(answerbuttons.firstChild);
  }
}

function selectAnswer(e) {
  // Get the button that was clicked
  const selectedBtn = e.target;

  // Check if the selected answer is correct based on the 'data-correct' attribute
  const isCorrect = selectedBtn.dataset.correct === "true";

  // Add a class to the selected button based on correctness
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++; // Increment the score only for correct answers
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerbuttons.children).forEach((button) => {
    // Check if the button is marked as correct
    if (button.dataset.correct === "true") {
      // Add the "correct" class to the button
      button.classList.add("correct");
    }
    // Disable the button
    button.disabled = true;
  });
  // Display the "Next" button
  nextButton.style.display = "block";
}

function showScore() {
  // Reset the state (clears buttons and hides "Next" button)
  resetState();
  // Display the final score
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
  // Change the "Next" button text to "Play Again"
  nextButton.innerHTML = "Play Again";
  // Display the "Next" button
  nextButton.style.display = "block";
}

function handleNextButton() {
  // Increment the current question index
  currentQuestionIndex++;
  // Check if there are more questions
  if (currentQuestionIndex < questions.length) {
    // If there are more questions, display the next question
    showQuestion();
  } else {
    // If there are no more questions, display the final score
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
