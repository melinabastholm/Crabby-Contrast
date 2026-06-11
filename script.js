// Finder de elementer i HTML'en, som JavaScript skal bruge.
const levelForms = document.querySelectorAll("[data-level-form]");
const feedbackSide = document.querySelector("[data-feedback-side]");
const feedbackIcon = document.querySelector("[data-feedback-icon]");
const feedbackTitle = document.querySelector("[data-feedback-title]");
const feedbackSubtitle = document.querySelector("[data-feedback-subtitle]");
const feedbackNext = document.querySelector("[data-feedback-next]");
const feedbackCrab = document.querySelector("[data-feedback-crab]");
const openExplanation = document.querySelector("[data-open-explanation]");
const explanationSide = document.querySelector("[data-explanation-side]");
const closeExplanation = document.querySelector("[data-close-explanation]");
const goodExplanation = document.querySelector("[data-good-explanation-text]");
const badExplanation = document.querySelector("[data-bad-explanation-text]");
const tipButtons = document.querySelectorAll("[data-tip-button]");

function showFeedback(form, isCorrect) {
    feedbackSide.dataset.result = isCorrect ? "correct" : "wrong";
    feedbackIcon.textContent = isCorrect ? "✓" : "×";
    feedbackTitle.textContent = isCorrect ? (form.dataset.correctTitle || "Jubiii") : (form.dataset.wrongTitle || "Øv altså..");
    feedbackSubtitle.textContent = isCorrect ? (form.dataset.correctSubtitle || "Godt gået!!!") : (form.dataset.wrongSubtitle || "Bedre held næste gang");
    feedbackCrab.src = isCorrect ? "assets/happy-crab.png" : "assets/mad-crab.png";


    feedbackNext.href = form.dataset.next;
    feedbackNext.textContent = form.dataset.nextLabel || "NÆSTE";
    feedbackNext.hidden = false;

    explanationSide.dataset.type = form.dataset.explanationType || "hola";
    openExplanation.hidden = form.dataset.hasExplanation === "false";
    goodExplanation.textContent = form.dataset.goodExplanation;
    badExplanation.textContent = form.dataset.badExplanation;

    feedbackSide.hidden = false;
}

function showExplanation() {
    explanationSide.hidden = false;
}

function hideExplanation() {
    explanationSide.hidden = true;
}

levelForms.forEach((form) => {
    const colorAnswers = form.querySelectorAll("[data-color]");

    colorAnswers.forEach((answer) => {
        answer.addEventListener("change", () => {
            form.style.setProperty("--preview-color", answer.dataset.color);
        });
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const checkedAnswer = form.querySelector("input[type='radio']:checked");

        if (!checkedAnswer) {
            return;
        }

        showFeedback(form, checkedAnswer.dataset.correct === "true");
    });
});

tipButtons.forEach((button) => {
    const tipBox = button.parentElement.querySelector("[data-tip-box]");

    button.addEventListener("click", () => {
        const isOpen = button.getAttribute("aria-expanded") === "true";

        button.setAttribute("aria-expanded", String(!isOpen));
        tipBox.hidden = isOpen;
    });
});

openExplanation.addEventListener("click", showExplanation);
closeExplanation.addEventListener("click", hideExplanation);

feedbackNext.addEventListener("click", () => {
    feedbackSide.hidden = true;
    explanationSide.hidden = true;
});
