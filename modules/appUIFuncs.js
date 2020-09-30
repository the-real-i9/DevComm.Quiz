import DOMElems from './DOMElems.js';
import {
    setProp,
    selectAll,
    setStyle,
    classAction,
    insertHtml,
    select,
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
} from './htmlBoilerplates.js';
import {
    grabLangPartFromString,
    organizeQuestions,
} from './appEngineFuncs.js';

const {
    pagesContainer,
    langBoxContainer,
    langChoicesModal,
} = DOMElems;

const renderLanguageChoices = (currentLangChoices, previousLangChoices) => {
    if (!currentLangChoices.length) return;

    // if previousLangChoices is not empty:
    // if some lang choices in the PLC is not in the CLC, remove them from the UI
    if (previousLangChoices.length) {
        for (const langPrev of previousLangChoices) {
            if (!currentLangChoices.includes(langPrev)) {
                setProp(select(`#lang-box-${langPrev}`), 'outerHTML', '');
            }
        }
    }

    // render newly chosen languages
    // if each LC has common lang choices, don't skip rendering to save memory
    for (const langCurr of currentLangChoices) {
        if (!previousLangChoices.includes(langCurr)) {
            insertHtml(select('.langs-section'), 'afterbegin', langBoxHtml(langCurr));
        }
    }

    // after rendering, set the previous LC to currentLC
    setPreviousLangChoices(getCurrentLangChoices());
};

const renderHomePage = () => {
    // some implementation
    setProp(pagesContainer, 'innerHTML', homePageHtml(getUsername()));

    renderLanguageChoices(getCurrentLangChoices(), getPreviousLangChoices());
};

const langsChosenOnSave = () => {
    // call this function on save
    setStyle(langChoicesModal, 'display', 'none');
    const selectedLangs = [...selectAll('.lang-chosen')].map((el) => grabLangPartFromString(el.id));
    setCurrentLangChoices(selectedLangs);
    organizeQuestions(getCurrentLangChoices());
    renderLanguageChoices(getCurrentLangChoices(), getPreviousLangChoices());
};

const displayLangChoicesModal = () => setStyle(langChoicesModal, 'display', 'block');

const toggleSelectLangChoice = (ev) => classAction(ev.target, 'toggle', 'lang-chosen');

export {
    renderHomePage,
    langsChosenOnSave,
    displayLangChoicesModal,
    toggleSelectLangChoice,
};
