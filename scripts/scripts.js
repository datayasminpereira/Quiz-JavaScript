const startContainer = document.querySelector("#start-container")
const startQuiz = document.querySelector(".start-quiz")

const playingContainer = document.querySelector("#playing-container")
const barProgress = document.querySelector("#progress-fill")
const question = document.querySelector("#question h2")
const buttons = document.querySelectorAll("#answers-box button") /* querySelectorAll retorn um NodeList*/
const answers = document.querySelectorAll(".question-answers") /* querySelectorAll retorn um NodeList*/

let currentQuestion = 0
let points = 0
let typeOfAnswers = []
const letters = ["a", "b", "c", "d"]
const questions = [
    {
        "question": "Uma das formas de se declarar uma variável em JS?",
        "answers": [
            {
                "answer": "char a;",
                "correct": false
            },
            {
                "answer": "var a;",
                "correct": true
            },
            {
                "answer": "int idade;",
                "correct": false
            },
            {
                "answer": "variable a;",
                "correct": false
            },
        ]
    },

    {
        "question": "Qual item terá como resultado um  NaN (Not a Number)?",
        "answers": [
            {
                "answer": "console.log(7 / 0);",
                "correct": false
            },
            {
                "answer": "console.log('10' / 2);",
                "correct": false
            },
            {
                "answer": "console.log('Show' * 2);",
                "correct": true
            },
            {
                "answer": "console.log('Show');",
                "correct": false
            },
        ]
    },

    {
        "question": "Qual não pertence as estruturas de controle do JS",
        "answers": [
            {
                "answer": "switch",
                "correct": false
            },
            {
                "answer": "do while",
                "correct": false
            },
            {
                "answer": "else if",
                "correct": false
            },
            {
                "answer": "elif",
                "correct": true
            },
        ]
    },

    {
        "question": "Não é uma forma de declarar um objeto em JS:",
        "answers": [
            {
                "answer": "let obj = {numero: 24}",
                "correct": false
            },
            {
                "answer": "let obj = Object.create(null)",
                "correct": false
            },
            {
                "answer": "Factory function",
                "correct": false
            },
            {
                "answer": "let obj = [numero: 24] ",
                "correct": true
            },
        ]
    },

    {
        "question": "Qual dos itens exemplifica a factory function?",
        "answers": [
            {
                "answer": "function criarPessoa() {return {nome: 'Ana', sobrenome: 'Silva'}}",
                "correct": true
            },
            {
                "answer": "let ola = function(){return 'Olá'}",
                "correct": false
            },
            {
                "answer": "const parOuImpar = (n) => {return n % 2}",
                "correct": false
            },
            {
                "answer": "const soma = function(a,b) {return a + b}",
                "correct": false
            },
        ]
    },    

    {
        "question": "let array = [1, 2, 3]; array.splice(1, 2, 1, 1); console.log(array)",
        "answers": [
            {
                "answer": "[1, 1, 2, 1, 1, 2, 3]",
                "correct": false
            },
            {
                "answer": "[1, 2, 1, 1]",
                "correct": false
            },
            {
                "answer": "[1, 1, 1]",
                "correct": true
            },
            {
                "answer": "o array não será modificado",
                "correct": false
            },
        ]
    },

    {
        "question": "Usando regex para validar uma data de nascimento, temos como melhor opção:",
        "answers": [
            {
                "answer": "const validarDataNasc = [0-9]{2}[/][0-9]{2}[/][0-9]{4}",
                "correct": false
            },
            {
                "answer": "const validarDataNasc = /d+/",
                "correct": false
            },
            {
                "answer": "const validarDataNasc = /[0-9]{2}[/][0-9]{2}[/][0-9]{4}/",
                "correct": true
            },
            {
                "answer": "const validarDataNasc = /[^a-z]/",
                "correct": false
            },
        ]
    },

    {
        "question": "let a = [1, 2, 3]; let b = [4, 5, 6]; let c = [...a, ...b]; console.log(c);",
        "answers": [
            {
                "answer": "[1, 2, 3, 4, 5, 6]",
                "correct": true
            },
            {
                "answer": "[1, 4, 2, 5, 3, 6]",
                "correct": false
            },
            {
                "answer": "[... 123, ... 456]",
                "correct": false
            },
            {
                "answer": "[[1, 2, 3], [4, 5, 6]]",
                "correct": false
            },
        ]
    },

    {
        "question": "O que é promise no JS?",
        "answers": [
            {
                "answer": "Método para obter elementos do DOM.",
                "correct": false
            },
            {
                "answer": "Objeto para processamento assíncrono.",
                "correct": true
            },
            {
                "answer": "Operador lógico que veio com ES6.",
                "correct": false
            },
            {
                "answer": "É um dos atributos de eventos.",
                "correct": false
            },
        ]
    },
    
    {
        "question": "Qual item exemplifica uma arrow function?",
        "answers": [
            {
                "answer": "function soma() {return 1 + 2}",
                "correct": false
            },
            {
                "answer": "function soma(a, b) {return a + b}",
                "correct": false
            },
            {
                "answer": "const soma = (a, b) =>  a + b",
                "correct": true
            },
            {
                "answer": "const soma = function(a, b) {return a + b}",
                "correct": false
            },
        ]
    },

]
let totalQuestions = questions.length
let numberOfCurrentQuestion = currentQuestion + 1


const scoreContainer = document.querySelector("#score-container")
let messageScore = document.querySelector(".message-score")
const imgsFirst = document.querySelectorAll(".score-100") // retorna NodeList
const imgSecond = document.querySelector(".score-between-70-99")
const imgThird = document.querySelector(".score-between-30-69")
const keepStudying = document.querySelector(".score-below-30")
let percentageScore = document.querySelector("#percentage-score span")
let correctAnswers = document.querySelector("#correct-anwsers")
let totalQuestionsElement = document.querySelector("#total-questions")
const restartQuiz = document.querySelector(".restart-quiz")

startQuiz.addEventListener("click", () => {
    start()
})

function start(){
    console.log("currentQuestion em start", currentQuestion)
    console.log("---------------------------------------------")
    startContainer.classList.toggle("hide")
    playingContainer.classList.toggle("hide")

    showQuestionAndAnswers(currentQuestion)
    selectButton() 
    

}

function showQuestionAndAnswers(currentQuestion) {
    console.log("currentQuestion em showQuestionAndAnswers", currentQuestion)
    console.log("---------------------------------------------")
    let advancePercentage = (numberOfCurrentQuestion/totalQuestions) * 100

    barProgress.style.setProperty("width", `${advancePercentage}%`)

    question.textContent = questions[currentQuestion]["question"]

    answers.forEach((ans, index) => {
        ans.textContent =  questions[currentQuestion]["answers"][index]["answer"] 

        typeOfAnswers.push(questions[currentQuestion]["answers"][index]["correct"])
    })

}

function selectButton() {
    buttons.forEach(btn => {
        btn.addEventListener("click", function(){
            // DEBUGANDO
            console.log("currentQuestion em selectButton", currentQuestion)
            console.log("---------------------------------------------")
            setTimeout(() => {
                addCorrectAnswerClass(answers, typeOfAnswers) 
            }, 300)
            setTimeout(() => { 
                verifyAnswer(btn)
            }, 600)
            setTimeout(() => { /* possivel erro */
                verifyIsQuizEnded()
            }, 1000)
        })
    })
    
}
    


function addCorrectAnswerClass(elements, booleans) {
    let qt = booleans.length

    for(let i = 0; i < qt; i++){

        if(booleans[i]){

            elements[i].previousElementSibling.classList.add("correct")
            elements[i].parentNode.classList.add("correct")

        } else {
            elements[i].previousElementSibling.classList.add("wrong")
            elements[i].parentNode.classList.add("wrong")

        }
    }
}

function removeCorrectAnswerClass(elements, booleans) { 
    let qt = booleans.length

    for(let i = 0; i < qt; i++){

        if(booleans[i]){

            elements[i].previousElementSibling.classList.remove("correct")
            elements[i].parentNode.classList.remove("correct")

        } else {
            elements[i].previousElementSibling.classList.remove("wrong")
            elements[i].parentNode.classList.remove("wrong")

        }
    }
}

function verifyAnswer(btn) { 

    let classListOfSelectionButton = Array.from(btn.classList)[0]
    if (classListOfSelectionButton == "correct") {
        points += 1
    }
}

function verifyIsQuizEnded() { 

    console.log("currentQuestion em verifyIsQuizEnded", currentQuestion)
    console.log("---------------------------------------------")
    if (currentQuestion < (totalQuestions-1)) { // varia de 0 a 9, 9
        // jogo continua, carregue a proxima questao
        currentQuestion = currentQuestion + 1
        numberOfCurrentQuestion = currentQuestion + 1

        removeCorrectAnswerClass(answers, typeOfAnswers)
        typeOfAnswers = []
        showQuestionAndAnswers(currentQuestion)

    } else {
        console.log('terminou')
        showScoreContainer()

        // jogo acabou, aparecer score container
    }
}

function showScoreContainer() {

    let calcOfPercentageScore = ((points/totalQuestions) * 100).toFixed(2)
    percentageScore.textContent = parseFloat(calcOfPercentageScore)

    correctAnswers.textContent = points
    totalQuestionsElement.textContent = totalQuestions


    if (calcOfPercentageScore == 100){
        messageScore.textContent = "Parabéns!"
        imgsFirst.forEach(img => {
            img.classList.toggle("hide")
        })
    } else if ((calcOfPercentageScore < 100) && (calcOfPercentageScore >= 70)){
        messageScore.textContent = "Execelente!"
        imgSecond.classList.toggle("hide")
    } else if ((calcOfPercentageScore < 70) && (calcOfPercentageScore >= 30)){
        messageScore.textContent = "Muito bem!"
        imgThird.classList.toggle("hide")
    } else {
        messageScore.textContent = "Continue estudando!"
        keepStudying.classList.toggle("hide")
    }
    playingContainer.classList.toggle("hide")
    scoreContainer.classList.toggle("hide")

restartQuiz.addEventListener("click", function(){
    window.location.reload(true);
    // points = 0
    // currentQuestion = 0
    // numberOfCurrentQuestion = currentQuestion + 1
    // removeCorrectAnswerClass(answers, typeOfAnswers)
    // typeOfAnswers = []
    // buttons.forEach(btn => {
    //     btn.removeEventListener("click", function(){})
    // })
    // scoreContainer.classList.toggle("hide")
    // startContainer.classList.toggle("hide")
})
}