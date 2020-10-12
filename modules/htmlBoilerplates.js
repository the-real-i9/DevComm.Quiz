import {
    formatLangTextDevFriendly,
} from './appEngineFuncs.js';

const homePageHtml = (name) => `
<div style="display: nne;" class="home">
    <p class="logo"><span><</span>?<span>></span></p>
    <p id='greet'><span id="greeting">Hi,</span><br><span id="firstname">${name}</span><i id='edit-nickname' class="fas fa-paint-brush fa-fw"></i></p>
    <p>Choose a Language</p>

    <div class='langs-section'>

        <div title="Add New Language" class="lang-box" id='add-lang-btn'>
            <span>+</span>
            <p>Add Language</p>
        </div>
    </div>
</div>
`;

const availLangsHtml = (language) => `
    <span class="lang-choice" id='lang-choice-${language}'>${formatLangTextDevFriendly(language)}</span>
`;

const langBoxHtml = (language) => `
<div class="lang-box" id='lang-box-${language}'>
    <i class='devicon-${language}-plain'></i>
    <p>${formatLangTextDevFriendly(language)}</p>
</div>
`;

const levelBoxHtml = ({
    language,
    level,
    completion,
    totalQuestionsInLevel,
}) => `
    <div class="level-box" id="${level}-level-${language}">
        <div class='comp-div' id='comp-div-${level}'>
            <div id='${level}-level-${language}-completion'>${completion}%</div>
            <svg>
                <circle cx='30' cy='30' r='25'></circle>
                <circle cx='30' cy='30' r='25'></circle>
            </svg>
        </div>
        <div class="level-bottom-text">
            <p>${formatLangTextDevFriendly(level)}</p>
            <p id='total-questions-count'>${totalQuestionsInLevel === 0 ? 'coming soon' : `${totalQuestionsInLevel.toLocaleString()} question${totalQuestionsInLevel > 1 ? 's' : ''}`}</p>
        </div>
    </div>
`;

const levelsPageHtml = (language) => `
    <div class="quiz-levels-page" id='lang-${language}'>
    <div class="top">
        <div class='back-page-btn' id="back-to-home">Back</div>
        <div class="center-text">
            <p id='quiz-title'>${formatLangTextDevFriendly(language)} Quiz</p>
            <p>Select Level</p>
        </div>
        <div></div>
    </div>
    <div class="levels-section">
        
    </div>
</div>
`;

const modulesPageHtml = (language, level) => `
<div class='quiz-modules-page' id='lang-${language}-${level}'>
    <div class="top">
        <div class='back-page-btn' id="back-to-levels">Back</div>
        <div class="center-text">
            <p id='quiz-title'>${formatLangTextDevFriendly(language)} Quiz</p>
            <p id='level'>${formatLangTextDevFriendly(level)}</p>
        </div>
        <div></div>
    </div>
    <div class="modules-section">
        
        <div class='module-box'></div>
    </div>
</div>
`;

const moduleBoxHtml = ({
    moduleNumber,
    moduleScore,
}) => `
<div class="module-box" id='module-${moduleNumber}-box'>
    <p class='module-num'>Module ${moduleNumber}</p>
    <p class='module-score' id='module-${moduleNumber}-score'>Score: ${moduleScore}%</p>
    <button class='start-module-btn' id='module-${moduleNumber}-start'>Start</button>
</div>
`;


const questionPageHtml = ({
    language,
    level,
    moduleNumber,
    totalQuestion,
    questionNumber,
}) => `
<div class="quiz-question-page" id='lang-${language}-${level}-module-${moduleNumber}'>
    <i id='big-lang-icon' class='devicon-${language}-plain'></i>
    <div class="top">
        <div class='back-page-btn' id="back-to-modules">Back</div>
        <div class="center-text">
            <p id='level'>${formatLangTextDevFriendly(level)}</p>
            <p id='module'>Module ${moduleNumber}</p>
        </div>
        <div></div>
    </div>
    <div class="question-top">
        <div class="progress">
            <div class="progress-bar">
                <div class="progress-tracker-bar"></div>
            </div>
            <div class="progress-details">
                <div class="question-number-traker"><span id=qn>1</span><span>|</span><span id="tqs">${totalQuestion}</span></div>
                <div class="answered-questions-tracker">
                    <span id='ans-count' class='count'>0</span>
                    <span>answered</span>
                    <span id="rem-count" class='count'>${totalQuestion}</span>
                    <span>left</span>
                </div>
            </div>
        </div>
        <div class="timer">
            <i class='fas fa-clock'></i>
            <p id='time-elapsed'>0m 0s</p>
        </div>
    </div>
    <div class='swiper-container'>
        <div class="question-section-container swiper-wrapper">
            
        </div>
    </div>
    <div class="bottom">
        <p></p>
        <p id="submit-button">Submit</p>
        <p></p>
    </div>
</div>
`;

const questionSectionHtml = (questionNumber) => `
<div class='swiper-slide' id="question-section-question-${questionNumber}">

</div>
`;

const questionStatementHtml = (questionIdentity, questionStatement) => `
<p class='question-statement-${questionIdentity}'>${questionStatement}</p>
`;

const codeBlockHtml = (language, code) => `
<div class="code-block">
    <pre><code class='${language}'>${code}</code></pre>
</div>
`;

const actionHtml = (questionAction, questionNumber) => `
<p class='what-to-do'>${questionAction}</p>
<div class="options" id="options-question-${questionNumber}">

</div>
`;

const optionHtml = (optionNumber, optionValue) => `
<div class='option' id="option-${optionNumber}">
    <p class='ans-text' id='ans-text-opt${optionNumber}'>${optionValue}</p>
    <div class='ans-check-circle' id="ans-check-circle-opt${optionNumber}"></div>
</div>
`;

const socialHandlesHtml = (smName, linkAddress, linkName) => `
    <p><a href="${linkAddress}" target='_blank'><i class="fab fa-${smName}"></i></a><a href="${linkAddress}" target='_blank'>by <span id="${smName}-link-nick">${linkName}</span></a></p>
`;

const solutionPageHtml = ({
    language,
    level,
    moduleNumber,
    totalQuestion,
    timeSpent,
    correctAnswersCount,
    incorrectAnswersCount,
    skippedQuestionsCount,
    quote,
    quoteAuthorFirstName,
    quoteAuthorLastName,
    quoteAuthorTwitterAddress,
    quoteAuthorTwitterUsername,
}) => `
<div class="quiz-solution-page" id='lang-${language}-${level}-module-${moduleNumber}-solution'>
    <div class="top">
        <div class='back-page-btn' id="back-to-modules">Back</div>
        <div class="center-text">
            <p id='lang-solution-title'>Solution <span>(${formatLangTextDevFriendly(language)})</span></p>
            <p id='level-module'>${formatLangTextDevFriendly(level)}: Module ${moduleNumber}</p>
        </div>
        <div></div>
    </div>
    <div class="solution-section">
        <div class="filter-div">
            <div class="filter-options">
                <span id='all'>All</span>
                <span id='correct'>Correct</span>
                <span id='incorrect'>Incorrect</span>
                <span id='skipped'>Skipped</span>
            </div>
        </div>
        <div class="overview">
            <p>Overview</p>
            <div class="overview-box">
                <div>
                    <p>Total Question</p>
                    <p id="total-ques">${totalQuestion}</p>
                </div>
                <div>
                    <p>Time Spent</p>
                    <p id="time-spent">${timeSpent}</p>
                </div>
                <div>
                    <p>Correct</p>
                    <p id="correct-count">${correctAnswersCount}</p>
                </div>
                <div>
                    <p>Incorrect</p>
                    <p id="incorrect-count">${incorrectAnswersCount}</p>
                </div>
                <div>
                    <p>Skipped</p>
                    <p id="skipped-count">${skippedQuestionsCount}</p>
                </div>
            </div>
        </div>
        <div class="answer-solutions">
            
        </div>
        <div class="quote-section">
            <p>Quote for you</p>
            <div class="quote-block">
                <p class='quote'>${quote}</p>
                <div class="owner-info">
                    <i class='devicon-twitter-plain'></i>
                    <div class='info'>
                        <p class='name'>- <span>${quoteAuthorFirstName}</span> <span>${quoteAuthorLastName}</span></p>
                        <a class="twitter-handle" href="${quoteAuthorTwitterAddress}">@${quoteAuthorTwitterUsername}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
`;

const solutionBoxHtml = ({
    userAnswer,
    authorAnswer,
    answerStatus,
    explanation,
    referenceAddress,
    referenceName,
    questionNumber,
}) => `
<div class="solution-box" id='solution-box-q${questionNumber}'>
    
    <p class='user-answer'><b>Answer:</b> <span>${userAnswer}</span>${answerStatus !== 'skipped' ? `${answerStatus === 'incorrect' ? "<i class='fas fa-times fa-fw incorrect-mark'></i>" : "<i class='fas fa-check fa-fw correct-mark'></i>"}` : '<i></i>'}</p>
    <p class='correct-answer'><b>Correct Answer:</b> <span>${authorAnswer}</span></p>
    <div class='explanation'><b><em>Explanation</em>:</b> ${explanation}</div>
    <p class='links'><em>See:</em> <a href="${referenceAddress}" target="_blank">${referenceName}</a></p>
</div>
`;

const solutionQuestionStatementHtml = ({ questionIdentity, questionNumber, questionStatement }) => `
<p class='question-statement-${questionIdentity}'><b>Q${questionNumber}: </b>${questionStatement}</p>
`;

const solutionCodeBlockHtml = (language, code) => `
<div class="code-block">
    <pre><code class='${language}'>${code}</code></pre>
</div>
`;

export {
    homePageHtml,
    langBoxHtml,
    availLangsHtml,
    levelsPageHtml,
    levelBoxHtml,
    modulesPageHtml,
    moduleBoxHtml,
    questionPageHtml,
    questionStatementHtml,
    codeBlockHtml,
    actionHtml,
    optionHtml,
    socialHandlesHtml,
    solutionPageHtml,
    solutionBoxHtml,
    solutionQuestionStatementHtml,
    solutionCodeBlockHtml,
    questionSectionHtml,
};
