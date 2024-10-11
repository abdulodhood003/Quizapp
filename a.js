const questions = [{
  question: "which is largest animal in the world?", answers: [
    { text: "shark", correct: false },
    { text: "blue whale", correct: true },
    { text: "elephant", correct: false },
    { text: "girafee", correct: false }
  ]
}, {
  question: "which is smallest country in the world?", answers: [
    { text: "vatican city", correct: true },
    { text: "bhutan", correct: false },
    { text: "nepal", correct: false }, 
    { text: "srilanka", correct: false }
  ]
}, {
  question: "which is largest desert in the world?", answers: [
    { text: "kalahari", correct: false },
    { text: "Gobi", correct: false },
    { text: "sahara", correct: true },
    { text: "antartica", correct: false }
  ]
}, {
  question: "which is smallest continent in the world?", answers: [
    { text: "Asia", correct: false },
    { text: "Australia", correct: true },
    { text: "Arctic", correct: false },
    { text: "Africa", correct: false }
  ]
}];


const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answerbtn");
const nextButton = document.getElementById("nextbtn");
let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "next"; 
  showQuestion();
}

function showQuestion() {
  resetState();

  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + " . " + currentQuestion.question; 
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if(answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}

function selectAnswer(e){
  const selectedBtn = e.target;
  const iscorrect = selectedBtn.dataset.correct === "true";
  if(iscorrect){
    selectedBtn.classList.add("correct");
  } else {
    selectedBtn.classList.add("incorrect");
  }
  if(iscorrect) {
    score++;
  }
  Array.from(answerButton.children).forEach(button => {
    if(button.dataset.correct == "true"){
      button.classList.add("correct")
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `your score is ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "play again";
  nextButton.style.display = "block";
}

function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if(currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
})

startQuiz();