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
    availLangsHtml,
} from './htmlBoilerplates.js';
import {
    grabLangPartFromString,
    organizeQuestions,
} from './appEngineFuncs.js';
import {
    userLanguageChoices,
    UserLangChoice,
} from './langsObject.js';

const {
    pagesContainer,
    langChoicesModal,
    availableLangsContainer,
} = DOMElems;

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
            userLanguageChoices.delete(langPrev);
            setProp(select(`#lang-box-${langPrev}`), 'outerHTML', '');
        }
    }

    // render newly chosen languages
    // if each LC has common lang choices, don't skip rendering to save memory
    for (const langCurr of currentLangChoices) {
        if (!previousLangChoices.includes(langCurr)) {
            userLanguageChoices.set(langCurr, new UserLangChoice(langCurr));
            insertHtml(select('.langs-section'), 'afterbegin', langBoxHtml(langCurr));
        }
    }
    console.log(userLanguageChoices);

    // after rendering, set the previous LC to currentLC
    setPreviousLangChoices(getCurrentLangChoices());
};

const renderHomePage = () => {
    setProp(pagesContainer, 'innerHTML', homePageHtml(getUsername()));
    renderLanguageChoices(getCurrentLangChoices(), getPreviousLangChoices());
};

const langsChosenOnSave = () => {
    setStyle(langChoicesModal, 'display', 'none');
    const selectedLangs = [...selectAll('.lang-chosen')].map((el) => grabLangPartFromString(el.id));
    setCurrentLangChoices(selectedLangs);
    organizeQuestions(getCurrentLangChoices());
    renderLanguageChoices(getCurrentLangChoices(), getPreviousLangChoices());
};

const displayLangChoicesModal = () => setStyle(langChoicesModal, 'display', 'block');

const toggleSelectLangChoice = (ev) => classAction(ev.target, 'toggle', 'lang-chosen');

const renderLevelsPage = (language) => {

};
// language, levelTitle, completion, questionsCount === details format
const renderLevelBoxes = (detailsObject) => {

};

export {
    renderHomePage,
    langsChosenOnSave,
    displayLangChoicesModal,
    toggleSelectLangChoice,
    renderAvailableLangs,
};
