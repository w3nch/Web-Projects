import { questions } from './questions.js';

const quiz_options = document.querySelectorAll(".options-container .option");
const btn_next = document.querySelector("#btn-next");
const btn_submit = document.querySelector("#btn-submit");
const score = document.querySelector("#resultContainer #score");
const btn_reset = document.querySelector("#resultContainer #btn-restart");
const question_container = document.querySelector(".quiz-content #question");

const start_screen = document.querySelector(".start-screen");
const quiz_container = document.querySelector(".quiz-container");
const start_btn = document.getElementById("startQuizBtn");
const questionCountSelector = document.getElementById("questionCount");

let score_marks = 0;
let current_index = 0;
let max_index = 0;
let selected_questions = [];

// Load a new question into the UI
function load_Questions() {
    const current_question = selected_questions[current_index];
    question_container.textContent = current_question.question;

    quiz_options.forEach((button, index) => {
        button.textContent = current_question.options[index];
        button.classList.remove("correct", "incorrect");
        button.disabled = false;
    });
}

// Set up event listeners once (no duplication)
function option_value() {
    quiz_options.forEach(button => {
        button.addEventListener("click", () => {
            const selectedAnswer = button.textContent;
            const current_question = selected_questions[current_index];

            // Disable all options
            quiz_options.forEach(btn => btn.disabled = true);

            if (selectedAnswer === current_question.answer) {
                button.classList.add("correct");
                score_marks += 10;
            } else {
                button.classList.add("incorrect");

                // Show correct answer
                quiz_options.forEach(btn => {
                    if (btn.textContent === current_question.answer) {
                        btn.classList.add("correct");
                    }
                });
            }
        });
    });
}

// Next button: go to next question or show score
btn_next.addEventListener("click", () => {
    current_index++;

    if (current_index < max_index) {
        load_Questions();
    } else {
        // Show final result
        document.querySelector(".options-container").style.display = "none";
        document.querySelector("#resultContainer").style.display = "block";
        score.textContent = `Your score ${score_marks} / ${max_index * 10}`;
        btn_next.style.display = "none";
        btn_submit.style.display = "none";
    }
});

// Restart quiz
btn_reset.addEventListener("click", () => {
    // Reset variables
    current_index = 0;
    score_marks = 0;
    max_index = 0;
    selected_questions = [];

    // Hide result and quiz
    document.querySelector("#resultContainer").style.display = "none";
    document.querySelector(".options-container").style.removeProperty("display");
    btn_next.style.removeProperty("display");
    btn_submit.style.removeProperty("display");
    quiz_container.style.display = "none";

    // Show start screen again
    start_screen.style.display = "block";
});


// Start button: picks question count and starts game
start_btn.addEventListener("click", () => {
    max_index = parseInt(questionCountSelector.value);
    selected_questions = shuffleArray([...questions]).slice(0, max_index);
    console.log(`User chose ${max_index} questions.`);

    start_screen.style.display = "none";
    quiz_container.style.removeProperty("display");

    load_Questions();
});

// Shuffle utility
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Initial setup
option_value();
