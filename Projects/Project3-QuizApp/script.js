const explanationElement = document.getElementById('explanation');
const startBtn = document.getElementById('start-btn');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextBtn = document.getElementById('next-btn');
const resultContainer = document.getElementById('result-container');
const scoreText = document.getElementById('score');
const totalText = document.getElementById('total');
const restartBtn = document.getElementById('restart-btn');
const startContainer = document.getElementById('start-container');
const categoryButtons = document.getElementById('category-buttons');
const feedback = document.getElementById('feedback');
const questionNumberElement = document.getElementById('question-number');

let selectedQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedCategoryName = "";

const categories = {
    geography: [],
    history: [],
    chemistry: [],
    sports: [],
    movies: [],
    "General Knowledge": []
  };

window.addEventListener('DOMContentLoaded', showCategorySelection);

function showCategorySelection() {
    startContainer.classList.remove('hide');
    questionContainer.classList.add('hide');
    resultContainer.classList.add('hide');
    nextBtn.classList.add('hide');
    categoryButtons.innerHTML = '';

    startBtn.classList.add('hide');

    Object.keys(categories).forEach(cat => {
        const btn = document.createElement('button');
        btn.classList.add('btn');
        btn.innerText = cat.charAt(0).toUpperCase() + cat.slice(1);
        btn.addEventListener('click', () => selectCategory(cat));
        categoryButtons.appendChild(btn);
    });
}

function selectCategory(categoryName) {
    selectedCategoryName = categoryName;
    startBtn.classList.add('hide');

    const existingScript = document.querySelector(`script[src="${categoryName}.js"]`);
    if (existingScript) {
        handleCategoryLoaded(categoryName);
        return;
    }

    const script = document.createElement('script');
    script.src = `${categoryName}.js`;
    script.onload = () => {
        handleCategoryLoaded(categoryName);
    };
    script.onerror = () => {
        alert("Failed to load questions for category: " + categoryName);
    };
    document.body.appendChild(script);
}

function handleCategoryLoaded(categoryName) {
    const allQuestions = window.categories[categoryName];

    if (!allQuestions || allQuestions.length === 0) {
        alert("No questions found for this category.");
        return;
    }

    selectedQuestions = getRandomQuestions(allQuestions, 10);

    startBtn.classList.remove('hide');
    startContainer.classList.add('hide');
}

function getRandomQuestions(questions, count) {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

startBtn.addEventListener('click', () => {
    startBtn.classList.add('hide');
    questionContainer.classList.remove('hide');
    nextBtn.classList.add('hide');
    resultContainer.classList.add('hide');
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
});

nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < selectedQuestions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

restartBtn.addEventListener('click', () => {
    resultContainer.classList.add('hide');
    showCategorySelection();
});

function showQuestion() {
    resetState();
    const currentQuestion = selectedQuestions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    questionNumberElement.innerText = `Question ${currentQuestionIndex + 1} / ${selectedQuestions.length}`;

    currentQuestion.answers.forEach(answer => {
        const btn = document.createElement('button');
        btn.innerText = answer.text;
        btn.classList.add('btn');
        if (answer.correct) {
            btn.dataset.correct = "true";
        }
        btn.addEventListener('click', selectAnswer);
        answerButtons.appendChild(btn);
    });
}

function resetState() {
    nextBtn.classList.add('hide');
    explanationElement.classList.add('hide');
    explanationElement.innerText = '';
    answerButtons.innerHTML = '';
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const correct = selectedBtn.dataset.correct === "true";
    if (correct) score++;

    Array.from(answerButtons.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === "true");
        button.disabled = true;
    });

    const currentQuestion = selectedQuestions[currentQuestionIndex];
    explanationElement.innerText = currentQuestion.explanation || '';
    explanationElement.classList.remove('hide');
    nextBtn.classList.remove('hide');
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    element.classList.add(correct ? 'correct' : 'wrong');
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function showResult() {
    questionContainer.classList.add('hide');
    nextBtn.classList.add('hide');
    resultContainer.classList.remove('hide');
    scoreText.innerText = score;
    totalText.innerText = selectedQuestions.length;
    const percentage = (score / selectedQuestions.length) * 100;

    if (percentage >= 90) {
        feedback.innerText = "🏆 Quiz Champion! You totally crushed it!";
    } else if (percentage >= 75) {
        feedback.innerText = "🎉 Great job! You're on fire!";
    } else if (percentage >= 50) {
        feedback.innerText = "👍 Not bad! Keep practicing!";
    } else if (percentage >= 30) {
        feedback.innerText = "😅 Oof! That was rough, but don’t give up!";
    } else {
        feedback.innerText = "🙈 Maybe trivia isn't your thing… yet!";
    }
}
