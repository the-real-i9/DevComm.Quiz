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
} from './htmlBoilerplates.js';
import {
    grabLangPartFromString,
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
        const lang = grabLangPartFromString(elem.id);
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
        }
    }
    setPreviousLangChoices(getCurrentLangChoices());

    [...selectAll('div[id|="lang-box"]')].map((el) => event(el, 'click', (ev) => {
        getLangObject(grabLangPartFromString(el.id)).levelsPage();
    }));

    // after rendering, set the previous LC to currentLC
};

const renderHomePage = () => {
    setProp(pagesContainer, 'innerHTML', homePageHtml(getUsername()));
    renderLanguageChoices(getCurrentLangChoices(), getPreviousLangChoices());
    event(select('#add-lang-btn'), 'click', displayLangChoicesModal);
};

const langsChosenOnSave = () => {
    setStyle(langChoicesModal, 'display', 'none');
    const selectedLangs = [...selectAll('.lang-chosen')].map((el) => grabLangPartFromString(el.id));
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
    const { completion, levelTitle } = detailsObject;
    insertHtml(select('.levels-section'), 'beforeend', levelBoxHtml(detailsObject));
    await new Promise((resolve) => setTimeout(resolve, 0));
    setStyle(select(`#comp-div-${levelTitle} circle:last-child`), 'stroke-dashoffset', `calc(160 - (160 * ${completion}) / 100)`);
};

export {
    renderHomePage,
    langsChosenOnSave,
    displayLangChoicesModal,
    toggleSelectLangChoice,
    renderAvailableLangs,
    renderLevelsPage,
    renderLevelBoxes,
};
