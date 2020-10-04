/* eslint-disable import/no-cycle */
import DOMElems from './DOMElems.js';
import {
    setProp,
    selectAll,
    setStyle,
    classAction,
    insertHtml,
    select,
    event,
} from './DOMFuncs.js';
import {
    getCurrentLangChoices,
    getUsername,
    setCurrentLangChoices,
} from './localStorage.js';
import {
    setPreviousLangChoices,
    getPreviousLangChoices,
} from './sessionStrorage.js';
import {
    homePageHtml,
    langBoxHtml,
    availLangsHtml,
    levelBoxHtml,
    levelsPageHtml,
    modulesPageHtml,
    moduleBoxHtml,
    questionPageHtml,
} from './htmlBoilerplates.js';
import {
    grabEndPartFromText,
    organizeQuestions,
} from './appEngineFuncs.js';
import {
    createLangObject,
    deleteLangObject,
    getLangObject,
} from './langsObjectManager.js';

const {
    pagesContainer,
    langChoicesModal,
    availableLangsContainer,
} = DOMElems;

const displayLangChoicesModal = () => setStyle(langChoicesModal, 'display', 'block');

const toggleSelectLangChoice = (ev) => classAction(ev.target, 'toggle', 'lang-chosen');

const emptyPagesContainer = () => setProp(pagesContainer, 'innerHTML', '');

const renderAvailableLangs = async (availLangsArray) => {
    let htmlString = '';
    for (const availLang of availLangsArray) {
        htmlString += availLangsHtml(availLang);
    }
    await setProp(availableLangsContainer, 'innerHTML', htmlString);

    for (const elem of selectAll('div[id|="lang-box"]')) {
        const lang = grabEndPartFromText(elem.id);
        classAction(select(`#lang-choice-${lang}`), 'add', 'lang-chosen');
    }
};

const renderLanguageChoices = (currentLangChoices, previousLangChoices) => {
    // if some lang choices in the PLC is not in the CLC, remove them from the UI
    for (const langPrev of previousLangChoices) {
        if (!currentLangChoices.includes(langPrev)) {
            deleteLangObject(langPrev);
            setProp(select(`#lang-box-${langPrev}`), 'outerHTML', '');
        }
    }

    // render newly chosen languages
    // if each LC has common lang choices, don't skip rendering to save memory
    for (const langCurr of currentLangChoices) {
        if (!previousLangChoices.includes(langCurr)) {
            createLangObject(langCurr);
            insertHtml(select('.langs-section'), 'afterbegin', langBoxHtml(langCurr));

            event(select(`#lang-box-${langCurr}`), 'click', () => {
                getLangObject(langCurr).levelsPage();
            });
        }
    }
    setPreviousLangChoices(getCurrentLangChoices());

    // after rendering, set the previous LC to currentLC
};

const renderHomePage = () => {
    setProp(pagesContainer, 'innerHTML', homePageHtml(getUsername()));
    renderLanguageChoices(getCurrentLangChoices(), getPreviousLangChoices());
    event(select('#add-lang-btn'), 'click', displayLangChoicesModal);
};

const langsChosenOnSave = () => {
    setStyle(langChoicesModal, 'display', 'none');
    const selectedLangs = [...selectAll('.lang-chosen')].map((el) => grabEndPartFromText(el.id));
    setCurrentLangChoices(selectedLangs);
    organizeQuestions(getCurrentLangChoices());
    renderLanguageChoices(getCurrentLangChoices(), getPreviousLangChoices());
};

const renderLevelsPage = (language) => {
    emptyPagesContainer();
    setProp(pagesContainer, 'innerHTML', levelsPageHtml(language));
    event(select('#back-to-home'), 'click', renderHomePage);
    setPreviousLangChoices([]);
};
// language, levelTitle, completion, questionsCount === details format
const renderLevelBoxes = async (detailsObject) => {
    const { completion, level, language } = detailsObject;
    insertHtml(select('.levels-section'), 'beforeend', levelBoxHtml(detailsObject));
    await new Promise((resolve) => setTimeout(resolve, 0));
    setStyle(select(`#comp-div-${level} circle:last-child`), 'stroke-dashoffset', `calc(160 - (160 * ${completion}) / 100)`);

    event(select(`#${level}-level-${language}`), 'click', () => {
        getLangObject(language).modulesPage(level);
    });
};

const renderModulesPage = (language, level) => {
    emptyPagesContainer();
    setProp(pagesContainer, 'innerHTML', modulesPageHtml(language, level));
    event(select('#back-to-levels'), 'click', () => {
        getLangObject(language).levelsPage();
    });
};

const renderModuleBoxes = (detailsObject) => {
    const { language, level, moduleNumber } = detailsObject;
    insertHtml(select('.modules-section'), 'beforeend', moduleBoxHtml(detailsObject));
    event(select(`#module-${moduleNumber}-start`), 'click', () => {
        getLangObject(language).questionPage(moduleNumber, level);
    });
};

const renderQuestionPage = (detailsObject) => {
    const { language, level } = detailsObject;
    emptyPagesContainer();
    setProp(pagesContainer, 'innerHTML', questionPageHtml(detailsObject));
    event(select('#back-to-modules'), 'click', () => {
        getLangObject(language).modulesPage(level);
    });
};

const startTimer = () => {
    let min = 0;
    let sec = 1;

    const timer = () => {
        if (Math.trunc(sec / 60) === 1) {
            min++;
            if (sec > 59) {
                sec = 0;
            }
        }
        setProp(select('#time-elapsed'), 'textContent', `${min}m ${sec}s`);
        sec++;
    };

    const timeCount = setInterval(timer, 1000);
};

export {
    renderHomePage,
    langsChosenOnSave,
    displayLangChoicesModal,
    toggleSelectLangChoice,
    renderAvailableLangs,
    renderLevelsPage,
    renderLevelBoxes,
    renderModulesPage,
    renderModuleBoxes,
    renderQuestionPage,
    startTimer,
};
