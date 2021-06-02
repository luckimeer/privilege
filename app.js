// DOM Objects
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn')
const resultsButton = document.getElementById('results-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const questionNumberElement = document.getElementById('question-number')
const answerButtonsElement = document.getElementById('answer-buttons')
const startScreenElement = document.getElementById('start-screen')
const privilegeBarElement = document.getElementById('privilegeBar')
const privilegeOutlineElement = document.getElementById('privilegeBarOutline')
const modalTextElement = document.getElementById('modal-body')
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')


// Constant and Variables
const numCorrect = 1;
let score = 0;

const questions = [
  {
    question: 'What is your sex?',
    answers: [
      { text: 'Male', correct: true },
      { text: 'Female', correct: false },
      { text: 'Intersex', correct: false }
    ],
    fact: 'Women make up almost half of the workforce, yet they make $0.82 to the dollar as their male counterparts. It won’t be until 2059, for women to reach pay equity. If you’re a Black women, 2130 and if you’re a Hispanic women, 2224. It\'s a privilege to not question whether your salary is comparable to your colleagures based on sex and race. - Institute for Women’s Policy Research',
  },
  {
    question: 'What is your race??',
    answers: [
      { text: 'White', correct: true },
      { text: 'Black or African American', correct: false },
      { text: 'Asian', correct: false },
      { text: 'Hispanic or Latino', correct: false },
      { text: 'American Indian or Alaska Native', correct: false },
      { text: 'Native Hawaiian or Other', correct: false },
    ],
    fact: 'In 2015, even though African Americans and Hispanics represent 32% of the United States population, they represent 56% of the incarnated population. If African Americans and Hispanics were incarcerated at the same rates as whites, the prison and jail population would DECLINE by ALMOST 40% - NAACP, Criminal Justice Fact Sheet',
  },
  {
    question: 'What is your household income?',
    answers: [
      { text: '<$15,000', correct: false },
      { text: '$15,000 - $24,999', correct: false },
      { text: '$25,000 - $34,999', correct: false },
      { text: '$35,001 - $49,999', correct: false },
      { text: '$50,000 - $74,999', correct: false },
      { text: '$75,000 - $99,999', correct: true },
      { text: '$100,000 - $149,999', correct: true },
      { text: '$150,000', correct: true },
    ],
    fact: 'While the median income for families in 2016 was $75,900, the median income for Black and Hispanic families are lowered, at $50,600 for Black families and $53,600 for Hispanics families. As the cost of college tuition continues the rise, it places a heavy burden on families to determine whether if college is a feasible option and further extend the wealth gap. It is a privilege to have the opportunities that money can afford. - Urban Institute, Pre-College Income', 
  },
  {
    question: 'Are you able?',
    answers: [
      { text: 'Able', correct: true },
      { text: 'Disable (physically, mentally, culturally)', correct: false }
    ],
    fact: 'Unemployment for individuals who are blinded and visually impaired is over 70%. For individuals with an intellectual or development disability, unemployment is greater than 80+% American Psychological Association Task Force on Socioeconomic Status, 2007 & Butterworth et al., 2015',
  },
  {
    question: 'What is your sexual orientation?',
    answers: [
      { text: 'Straight', correct: true },
      { text: 'Bi', correct: false },
      { text: 'Gay', correct: false },
      { text: 'Other', correct: false },
    ],
    fact: 'In 2018, the FBI reported that almost 1 in every 5 hate crimes is motivated by anti-LGBTQ prejudice. It\'s a privilege that you are not targeted or attacked for holding your partner\'s hand. - FBI, 2018 Hate Crime Statistics',
  },
  {
    question: 'What is your highest level of education?',
    answers: [
      { text: 'Some Education', correct: false },
      { text: 'HS Diploma / GED', correct: false },
      { text: 'Associates', correct: false },
      { text: 'Bachelors', correct: true },
      { text: 'Masters', correct: true },
      { text: 'Professional/PhD', correct: true }
    ],
    fact: 'In 2019, the median income for recent college graduates, between 22-27, was $44,000/yr compared to high school graduates of the same age, was $30,000/yr.  The earning gap continues to widen between college graduates and high school graduates. Compounded by the rising cost of education, it is a privilege to obtain higher education. - Pew Research Center, The Rising Cost of Not Going to College, 2014 & Zumbrun, Income for Recent Graduates the Highest in Over a Decade, WSJ',
  },
  {
    question: 'What is your religion?',
    answers: [
      { text: 'Christian', correct: true },
      { text: 'Judaism', correct: false },
      { text: 'Islam', correct: false },
      { text: 'Buddhism', correct: false },
      { text: 'Hinduism', correct: false },
      { text: 'Atheist', correct: false },
      { text: 'Other', correct: false },
    ],
    fact: 'Christians remain the largest religious group in the United States, representing 70% of the population. While Islam is 2nd largest religion in the world, Muslims are one of the most discriminated groups. Muslims have reported a variety of discrimination such as singling out during airport security, being called offensive names, or being treated with suspicion. It’s a privilege to practice your religion without fear of violence or threats - Pew Research Center',
  }
]

let shuffledQuestions, currentQuestionIndex


// Event Listeners
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget)
    openModal(modal)
  })
})

/* overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})

/* closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal')
    closeModal(modal)
  })
}) */

// Functions

function openModal(modal) {
  if(modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
}


function closeModal(modal) {
  if(modal == null) return
  modal.classList.remove('active')
  overlay.classList.remove('active')
}


// Start the Game Function
function startGame() {
    startScreenElement.classList.add('hide')
    startButton.classList.add('hide')
    shuffledQuestion = questions.sort(() => Math.random() - 0.5)
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

// Setting out Next Question, when click on Next Button
function setNextQuestion() {
    // Reset everything every time we set a new question
    resetState()
    showQuestion(shuffledQuestion[currentQuestionIndex])

}

// Takes a question and shows a question
function showQuestion(question) {
  // Number of Question
  questionNumberElement.innerHTML = (currentQuestionIndex + 1) + ". |";

  // Displays the question
  questionElement.innerText = question.question

  
  // Populating Answer
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }

    /* if (answer.correct == false) {
      button.disabled=true;
      console.log('works')
    } */

    
    // Adding Event Listener to answer button
    button.addEventListener('click', selectAnswer)
    button.setAttribute('data-modal-target', '#modal')
    
    // Add answer options to quiz
    answerButtonsElement.appendChild(button)
    
    // Adding ModalText
    modalTextElement.innerHTML = questions[currentQuestionIndex].fact

  })

}

function resetState() {
  nextButton.classList.add('hide')
  // Remove the HTML-created answer buttons
  while(answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  // Get the button selected by the user
  const selectedButton = e.target

  // Check correct
  const correct = selectedButton.dataset.correct


  if(correct) {
    incrementScore(numCorrect)
    openModal(modal)
  }

  setTimeout(function(){ 
    closeModal(modal)
    selectedButton.classList.add('focus');
  }, 10000)

  if (shuffledQuestion.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    resultsButton.classList.remove('hide')
  }

}

incrementScore = num => {
  score += num;
  privilegeBarElement.style.height = (score * 6) + "rem";
  privilegeOutlineElement.style.height = (score * 6) + "rem";
  localStorage.setItem("mostRecentScore", score);
}

