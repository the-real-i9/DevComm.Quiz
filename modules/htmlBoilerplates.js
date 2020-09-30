import { formatLangTextDevFriendly } from './appEngineFuncs.js';

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

const langBoxHtml = (language) => `
<div class="lang-box" id='lang-box-${language}'>
    <i class='devicon-${language}-plain'></i>
    <p>${formatLangTextDevFriendly(language)}</p>
</div>
`;

const levelsPageHtml = () => `
    <div style="display: none;" class="quiz-levels-page" id='lang-python'>
    <div class="top">
        <div id="back-to-home">Back</div>
        <div class="center-text">
            <p id='quiz-title'>Python Quiz</p>
            <p>Select Level</p>
        </div>
        <div></div>
    </div>
    <div class="levels-section">
        <div class="level-box" id="beginner-level-python">
            <div class='comp-div'>
                <div id='beginner-level-python-completion'>50%</div>
                <svg>
                    <circle cx='30' cy='30' r='25'></circle>
                    <circle cx='30' cy='30' r='25'></circle>
                </svg>
            </div>
            <div class="level-bottom-text">
                <p>Beginner</p>
                <p id='total-questions-count'>1,000 questions</p>
            </div>
        </div>
        <div class="level-box" id="intermediate-level-python">
            <div class='comp-div'>
                <div id='intermediate-level-python-completion'>60%</div>
                <svg>
                    <circle cx='30' cy='30' r='25'></circle>
                    <circle cx='30' cy='30' r='25'></circle>
                </svg>
            </div>
            <div class="level-bottom-text">
                <p>Intermediate</p>
                <p id='total-questions-count'>100 questions</p>
            </div>
        </div>
        <div class="level-box" id="advanced-level-python">
            <div class='comp-div'>
                <div id='advanced-level-python-completion'>70%</div>
                <svg>
                    <circle cx='30' cy='30' r='25'></circle>
                    <circle cx='30' cy='30' r='25'></circle>
                </svg>
            </div>
            <div class="level-bottom-text">
                <p>Advanced</p>
                <p id='total-questions-count'>500 questions</p>
            </div>
        </div>
        <div class="level-box" id="ninja-level-python">
            <div class='comp-div'>
                <div id='ninja-level-python-completion'>80%</div>
                <svg>
                    <circle cx='30' cy='30' r='25'></circle>
                    <circle cx='30' cy='30' r='25'></circle>
                </svg>
            </div>
            <div class="level-bottom-text">
                <p>Ninja</p>
                <p id='total-questions-count'>800 questions</p>
            </div>
        </div>
    </div>
</div>
`;


export {
    homePageHtml,
    langBoxHtml,
};
