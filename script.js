const QUESTIONS = [
    {
        question:
            "Which of the following is used in React.js to increase performance?",
        options: [
            "Virtual DOM",
            "Original DOM",
            "Both A and B",
            "None of the above",
        ],
        correctOption: "Virtual DOM",
    },
    {
        question: "What is ReactJS?",
        options: [
            "Server-side framework",
            "user interface framework",
            "both a and b",
            "none of the above",
        ],
        correctOption: "user interface framework",
    },
    {
        question:
            "Identify the one which is used to pass data to components from outside",
        options: ["Render with arguments", "setState", "PropTypes", "props"],
        correctOption: "props",
    },
    {
        question: "Who created React.js?",
        options: ["Jordan Mike", "Jordan Walke", "Tim Lee", "Jordan Lee"],
        correctOption: "Jordan Walke",
    },
    {
        question: "In which language is React.js written?",
        options: ["Python", "JavaScript", "Java", "PHP"],
        correctOption: "JavaScript",
    },
    {
        question: "What is Babel?",
        options: [
            "JavaScript compiler",
            "JavaScript interpreter",
            "JavaScript transpiler",
            "None of the above",
        ],
        correctOption: "JavaScript compiler",
    },
    {
        question: "Identify the command used to create a react app.",
        options: [
            "npm install create-react-app",
            "npm install -g create-react-app",
            "install -g create-react-app",
            "None of the above",
        ],
        correctOption: "npm install -g create-react-app",
    },
    {
        question:
            "Which of the following port is the default where webpack-dev-server runs?",
        options: ["3000", "3306", "3030", "8080"],
        correctOption: "8080",
    },
    {
        question: "How many elements can a valid react component return?",
        options: ["1", "2", "3", "4"],
        correctOption: "1",
    },
    {
        question: "A state in React.js is also known as?",
        options: [
            "The internal storage of the component",
            "External storage of the component",
            "Permanent storage",
            "All of the above",
        ],
        correctOption: "The internal storage of the component",
    },
    {
        question:
            "Which of the following method is used to access the state of a component from inside of a member function?",
        options: [
            "this.prototype.stateValue",
            "this,getState()",
            "this.values",
            "this.state",
        ],
        correctOption: "this.values",
    },
    {
        question:
            "State whether true or false:  Props are methods into other components?",
        options: ["True", "False"],
        correctOption: "True",
    },
    {
        question:
            "What are arbitrary inputs of components in react also known as?",
        options: ["Elements", "Props", "Keys", "Ref"],
        correctOption: "Props",
    },
    {
        question: "In MVC, what does React.js act as?",
        options: ["Model", "Controller", "Router", "Middleware"],
        correctOption: "Controller",
    },
    {
        question:
            "State whether true or false: React.js covers only the view layer of the app.",
        options: ["True", "False"],
        correctOption: "True",
    },
];

// const USER_ANSWERS = [{
//     attempted: true,
//     correct: false,
//     questionNumber: 1
// },...];

const USER_ANSWERS = [];
let QUESTION_INDEX = 0;

const questionIndices = document.getElementById("question-indices");

// add circular buttons to the question indices with the question number and bootstrap classes
for (let i = 0; i < QUESTIONS.length; i++) {
    const button = document.createElement("button");
    button.id = "index-" + i;
    button.classList.add("btn", "btn-outline-primary", "btn-circle", "ms-2");
    button.innerText = i + 1;
    button.addEventListener("click", () => {
        // when a button is clicked, change the question
        showQuestionAndOptions(i);
    });
    questionIndices.appendChild(button);
}

const question = document.getElementById("question");
const firstOption = document.getElementById("first-option");
const secondOption = document.getElementById("second-option");
const thirdOption = document.getElementById("third-option");
const fourthOption = document.getElementById("fourth-option");

// add event listeners to the options
firstOption.addEventListener("click", () => {
    addAnswer(QUESTION_INDEX++, firstOption.innerText);
});

secondOption.addEventListener("click", () => {
    addAnswer(QUESTION_INDEX++, secondOption.innerText);
});

thirdOption.addEventListener("click", () => {
    addAnswer(QUESTION_INDEX++, thirdOption.innerText);
});

fourthOption.addEventListener("click", () => {
    addAnswer(QUESTION_INDEX++, fourthOption.innerText);
});

// add the question and options to the DOM
function showQuestionAndOptions(queIndex) {
    if (queIndex >= QUESTIONS.length || queIndex < 0) {
        console.log("Invalid question index", queIndex);
        return;
    }
    // check if user has already attempted the question
    const userAnswer = USER_ANSWERS.find(
        (answer) => answer.questionNumber === queIndex
    );
    if (userAnswer) {
        // if attempted, don't let user revisit the question
        return;
    }
    updateQuetionIndex(queIndex + 1);
    QUESTION_INDEX = queIndex;
    question.innerText = QUESTIONS[queIndex].question;
    firstOption.innerText = "A. " + QUESTIONS[queIndex].options[0];
    secondOption.innerText = "B. " + QUESTIONS[queIndex].options[1];
    thirdOption.innerText = "C. " + QUESTIONS[queIndex].options[2];
    fourthOption.innerText = "D. " + QUESTIONS[queIndex].options[3];
}

// add the first question and options to the DOM
showQuestionAndOptions(0);

function addAnswer(QUESTION_INDEX, option) {
    if (QUESTION_INDEX < 0) {
        console.log("Total attempted questions: " + USER_ANSWERS.length);
        return;
    }
    if (USER_ANSWERS.length === QUESTIONS.length) {
        showResult();
        return;
    }
    console.log("adding answer for question", QUESTION_INDEX);
    USER_ANSWERS.push({
        attempted: true,
        correct:
            QUESTIONS[QUESTION_INDEX].correctOption === option.substring(3),
        questionNumber: QUESTION_INDEX,
    });

    if (QUESTION_INDEX === QUESTIONS.length - 1) {
        // if all questions are attempted, show the result
        if (USER_ANSWERS.length === QUESTIONS.length) {
            showResult();
        } else {
            const smallestQuestionIndexWhichIsNotAttempted =
                QUESTIONS.findIndex((question, index) => {
                    return !USER_ANSWERS.find(
                        (answer) => answer.questionNumber === index
                    );
                });
            console.log(
                "smallestQuestionIndexWhichIsNotAttempted",
                smallestQuestionIndexWhichIsNotAttempted
            );
            if (smallestQuestionIndexWhichIsNotAttempted !== -1) {
                showQuestionAndOptions(
                    smallestQuestionIndexWhichIsNotAttempted
                );
            } else {
                showResult();
            }
        }
        return;
    }

    // console.log(USER_ANSWERS);
    // next question
    startTimerForNewQuestion();
    // disable the button for the question
    document.getElementById("index-" + QUESTION_INDEX).disabled = true;
    document.getElementById("index-" + QUESTION_INDEX).style.cursor =
        "not-allowed";
    // show the next question which is not attempted
    const smallestQuestionIndexWhichIsNotAttempted = QUESTIONS.findIndex(
        (question, index) => {
            return !USER_ANSWERS.find(
                (answer) => answer.questionNumber === index
            );
        }
    );
    console.log(
        "smallestQuestionIndexWhichIsNotAttempted",
        smallestQuestionIndexWhichIsNotAttempted
    );
    showQuestionAndOptions(smallestQuestionIndexWhichIsNotAttempted);
}

function showResult() {
    const correctAnswers = USER_ANSWERS.filter(
        (answer) => answer.correct
    ).length;
    const incorrectAnswers = USER_ANSWERS.filter(
        (answer) => !answer.correct
    ).length;
    const unattemptedAnswers = USER_ANSWERS.filter(
        (answer) => !answer.attempted
    ).length;
    const result = document.getElementById("result");
    result.style.display = "flex";
    const correct = document.getElementById("correct");
    const incorrect = document.getElementById("incorrect");
    const unattempted = document.getElementById("unattempted");
    correct.innerText = "✅Correct: " + correctAnswers;
    incorrect.innerText = "❌Incorrect: " + incorrectAnswers;
    unattempted.innerText = "❔Unattempted: " + unattemptedAnswers;
}

const timer = document.getElementById("timer");

let time = 30;
let interval;

function startTimerForNewQuestion() {
    // clear the previous interval
    clearInterval(interval);
    // start timer for new question
    console.log("starting timer for new question");
    time = 30;
    timer.innerText = `${time}s`;
    interval = setInterval(() => {
        time--;
        timer.innerText = `${time}s`;
        if (time === 0) {
            clearInterval(interval);
            // next question
            showQuestionAndOptions(++QUESTION_INDEX);
            USER_ANSWERS.push({
                attempted: false,
                correct: false,
                questionNumber: QUESTION_INDEX,
            });
            startTimerForNewQuestion();
        }
    }, 1000);
}

function updateQuetionIndex(queIndex) {
    const currQue = document.getElementById("currQue");
    currQue.innerText = `Question ${queIndex} of ${QUESTIONS.length}`;
}

updateQuetionIndex(1);

function startQuiz() {
    document.getElementById("cover").remove();

    startTimerForNewQuestion();
}

// add arrow key listener to navigate between questions and options with A, B, C, D
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
        // previous question
        showQuestionAndOptions(--QUESTION_INDEX);
        startTimerForNewQuestion();
    } else if (e.key === "ArrowRight") {
        // next question
        showQuestionAndOptions(++QUESTION_INDEX);
        startTimerForNewQuestion();
    } else if (e.key === "a" || e.key === "A") {
        // select option A
        addAnswer(QUESTION_INDEX++, firstOption.innerText);
    } else if (e.key === "b" || e.key === "B") {
        // select option B
        addAnswer(QUESTION_INDEX++, secondOption.innerText);
    } else if (e.key === "c" || e.key === "C") {
        // select option C
        addAnswer(QUESTION_INDEX++, thirdOption.innerText);
    } else if (e.key === "d" || e.key === "D") {
        // select option D
        addAnswer(QUESTION_INDEX++, fourthOption.innerText);
    }
});
