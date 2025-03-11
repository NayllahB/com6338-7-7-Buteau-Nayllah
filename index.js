// Your code here

var questionsArr = [
    {
        question: 'Where is the city Kyoto located?',
        answer: 'Japan',
        options: [
            'South Korea',
            'Japan',
            'Thailand',
            'Vietnam',
        ]
    },
    {
        question: 'Where is the city Los Angeles located?',
        answer: 'United States',
        options: [
            'United States',
            'Mexico',
            'Spain',
            'Argentina',
        ]
    },
    {
        question: 'Where is the city Florence located?',
        answer: 'Italy',
        options: [
            'Italy',
            'France',
            'Spain',
            'Greece',
        ]
    },
    {
        question: 'Where is the city Athens located?',
        answer: 'Greece',
        options: [
            'Sweden',
            'Finland',
            'Greece',
            'Denmark',
        ]
    },
    {
        question: 'Where is the city Seoul located?',
        answer: 'South Korea',
        options: [
            'Iceland',
            'China',
            'India',
            'South Korea',
        ]
    }
]


var quiz = document.getElementById('quiz') 
var currentQuestionIndex = 0
intervalId = null
correctAnswer = 0


//When page is loaded, shows the previous score and start button
function startQuiz() {

    //if local storage is not empty show previous score
    var previousScore = localStorage.getItem('previous-score')
    if(previousScore !== null){
        var previousScoreEl = document.createElement('p')
        previousScoreEl.textContent = 'Previous Score ' + previousScore + '%'
        quiz.appendChild(previousScoreEl)
    }

    var quizButton = document.createElement('button') 
    quizButton.id = 'start-quiz' 
    quizButton.textContent = 'Start Quiz!' 
    quiz.appendChild(quizButton)  
    
    quizButton.onclick = function () {
        quiz.innerHTML = ''
        showQuestion()
    }
}

function showQuestion () {
    quiz.innerHTML = ''
        
    // creates p element (question)
    var currentQuestion = questionsArr[currentQuestionIndex]
    var pQuestionElement = document.createElement('p')
    pQuestionElement.textContent = currentQuestion.question
    quiz.appendChild(pQuestionElement)

    // creates div element (container)
    var divElement = document.createElement('div')
    quiz.appendChild(divElement)

    // creates button elements (options)
    currentQuestion.options.forEach(function(option){
        var optionButton = document.createElement('button')
        optionButton.textContent = option
        divElement.appendChild(optionButton)

        optionButton.onclick = function(){
            clearInterval(intervalId)
            if (option === currentQuestion.answer){
                correctAnswer++    
            }

            currentQuestionIndex++

            // if no more questions end, if not continue to next
            if(currentQuestionIndex>=questionsArr.length){
                endQuiz()
            }else{
                showQuestion()
            }
            
        }
    })
    startTimer()

}

function startTimer(){
    var timer = 30
    var pTimerElement = document.createElement('p')
    pTimerElement.textContent = timer
    quiz.appendChild(pTimerElement)

    //deincrements by 1 second 
    intervalId = setInterval(function(){
        timer-- 
        pTimerElement.textContent = timer

        //if times up move on to next question
        if (timer === 0) {
            clearInterval (intervalId)
            currentQuestionIndex++

            // if no more questions end quiz if not, continue to next
            if(currentQuestionIndex>=questionsArr.length){
                endQuiz()
            }else{
                showQuestion()
            }
            
        }
    }, 1000)
}

function endQuiz (){
    clearInterval(intervalId)
    var percentage = Math.round((correctAnswer/questionsArr.length) * 100);
    localStorage.setItem('previous-score', percentage)
    quiz.innerHTML = ''
    currentQuestionIndex = 0
    correctAnswer = 0
    startQuiz()
}

startQuiz()
