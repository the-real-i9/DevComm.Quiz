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
    questionsCount,
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
            <p id='total-questions-count'>${questionsCount === 0 ? 'coming soon' : `${questionsCount.toLocaleString()} question${questionsCount > 1 ? 's' : ''}`}</p>
        </div>
    </div>
`;

const levelsPageHtml = (language) => `
    <div class="quiz-levels-page" id='lang-${language}'>
    <div class="top">
        <div id="back-to-home">Back</div>
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
        <div id="back-to-levels">Back</div>
        <div class="center-text">
            <p id='quiz-title'>${formatLangTextDevFriendly(language)} Quiz</p>
            <p id='level'>${formatLangTextDevFriendly(level)}</p>
        </div>
        <div></div>
    </div>
    <div class="modules-section">
        
    </div>
</div>
`;

const moduleBoxHtml = ({
    language,
    level,
    moduleNumber,
    moduleScore,
}) => `
<div class="module-box" id='module-${moduleNumber}-box'>
    <p class='module-num'>Module ${moduleNumber}</p>
    <p class='module-score' id='module-${moduleNumber}-score'>Score: ${moduleScore}%</p>
    <button class='start-module-btn' id='module-${moduleNumber}-start'>START</button>
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
};
