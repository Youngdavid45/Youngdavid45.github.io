const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choices-given"));
const count = document.getElementById("count");
const scoring = document.getElementById("scoring");
const next = document.getElementById("next");
const highscore = document.getElementById("highscore");

let presentQuestion = {};
let acceptingAnswers = false;
let mark = 0;
let questionCount = 0;
let questionAvailable = [];
let questions = [
    {
        question:"what do you use in treating worm infection?",
        choice1: "Paracetamol",
        choice2: "Albendazole",
        choice3: "Amlodipine",
        choice4: "Propanolol",
        answer:  2 
    },
    {
        question:"which of the following is an anti-hypertensive drug",
        choice1: "Amlodipine",
        choice2: "Metronidazole",
        choice3: "Amitryptiline",
        choice4: "Cocodamol",
        answer:  1
    },
    {
        question:"which of the following investigation is needed in diagnosing TB",
        choice1: "High Vaginal Swab mcs",
        choice2: "CRP",
        choice3: "X-ray",
        choice4: "FBC",
        answer:  3 
    },
    {
        question:"The following are used in diagnosing Tb except",
        choice1: "X-ray",
        choice2: "Mantoux",
        choice3: "GeneXpert",
        choice4: "Obstetric Uss",
        answer:  4 
    },
    {
        question:"what is the full meaning of ERPC",
        choice1: "Evacuation of retention product of constipation",
        choice2: "Evacuation of retained product of conception",
        choice3: "Evaluation of rectal and penile conditions",
        choice4: "none of the above",
        answer:  2 
    }
];

const score = 10;
const maxQuestion = 5;

startQuiz = () => {
    questionCount = 0;
    mark = 0;
    questionAvailable = [...questions];
    newQuestion ();
};

newQuestion = () => {
    if (questionAvailable.length == 0 || questionCount >= maxQuestion){
        return window.location.assign("/end.html");
    }

    questionCount++;
    count.innerText = `${questionCount}/${maxQuestion}`;
    const questionSupplied = Math.floor(Math.random() * questionAvailable.length);
    presentQuestion = questionAvailable[questionSupplied];
    question.innerText = presentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset["number"];
        choice.innerHTML = presentQuestion["choice" + number];
    });

    questionAvailable.splice(questionSupplied + 1);
    acceptingAnswers = true;
};

choices.forEach( choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const choiceSelected = e.target;
        const answerSelected = choiceSelected.dataset["number"];
        
        const colorCorWrong = answerSelected == presentQuestion.answer ? "correct": "incorrect";

        if (colorCorWrong == "correct"){
            increaseScore(score);
        }


        choiceSelected.parentElement.classList.add(colorCorWrong);

        setTimeout ( ()=> {
            choiceSelected.parentElement.classList.remove(colorCorWrong);
            newQuestion();
        },1000);
    });
});

increaseScore = (num) => {
    mark += num;
    scoring.innerText = mark;
};

newQuestionNext = () => {
    next.addEventListener("click", e =>{
        newQuestion();
    });
};

newQuestionNext();

startQuiz();
