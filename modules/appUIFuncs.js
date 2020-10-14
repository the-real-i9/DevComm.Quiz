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
    setUsername,
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
    solutionPageHtml,
} from './htmlBoilerplates.js';
import {
    grabEndPartFromText,
    organizeQuestions,
    removeSessionData,
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
    nameSetModal,
    nameInput,
    setNameBtn,
    a2hBtn,
} = DOMElems;

const hidePage = () => {
    setStyle(select('.container'), 'display', 'none');
    setStyle(select('#sound'), 'display', 'none');
    setStyle(select('.load-anim#outer'), 'display', 'flex');
};

const showPage = () => {
    setStyle(select('.container'), 'display', 'block');
    setStyle(select('#sound'), 'display', 'flex');
    setStyle(select('.load-anim#outer'), 'display', 'none');
};

const displayLangChoicesModal = () => setStyle(langChoicesModal, 'display', 'block');

const toggleSelectLangChoice = (ev) => classAction(ev.target, 'toggle', 'lang-chosen');

const emptyPagesContainer = () => setProp(pagesContainer, 'innerHTML', '');

const showA2HBtn = () => {
    setStyle(a2hBtn, 'display', 'flex');
    setTimeout(() => {
        classAction(a2hBtn, 'add', 'show');
    }, 2);
};

const hideA2HBtn = () => {
    classAction(a2hBtn, 'remove', 'show');
    setTimeout(() => {
        setStyle(a2hBtn, 'display', 'none');
    }, 150);
};


let min = 0;
let sec = 1;
let timeCount = null;
const timerFunc = () => {
    if (Math.trunc(sec / 60) === 1) {
        min++;
        if (sec > 59) {
            sec = 0;
        }
    }
    setProp(select('#time-elapsed'), 'textContent', `${min}m ${sec}s`);
    sec++;
};

const timer = (action) => {
    if (action === 'start') {
        timeCount = setInterval(timerFunc, 1000);
    } else if (action === 'stop') {
        if (timeCount) clearInterval(timeCount);
        min = 0;
        sec = 1;
    }
};

const getTimeSpent = () => `${min}m ${sec}s`;

const playMusic = (audio) => {
    event(select('#sound'), 'click', (ev) => {
        classAction(ev.target, 'toggle', 'music-on');
        if (ev.target.classList.contains('music-on')) {
            audio.play();
        } else {
            audio.pause();
        }
    });
};

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

const showNameChangeModal = async () => {
    nameInput.value = getUsername();
    await setStyle(nameSetModal, 'display', 'flex');
    setTimeout(() => {
        classAction(nameSetModal, 'add', 'drop');
    }, 2);
};

const adjustDevNameSize = () => {
    const devNameElem = select('#dev-name');
    const nameWidth = devNameElem.getBoundingClientRect().width;
    if (nameWidth > 160) {
        setStyle(devNameElem, 'fontSize', `${35 / 1.4}px`);
        devNameElem.style.setProperty('--stroke-width', '1px');
    } else {
        setStyle(devNameElem, 'fontSize', '35px');
        devNameElem.style.setProperty('--stroke-width', '1.5px');
    }
};

const setDevName = () => {
    const devName = nameInput.value;
    if (!devName) return;
    setUsername(devName);
    setProp(select('#dev-name'), 'textContent', devName);
    classAction(nameSetModal, 'remove', 'drop');
    adjustDevNameSize();
    setTimeout(() => {
        setStyle(nameSetModal, 'display', 'none');
    }, 150);
};

const renderHomePage = () => {
    setProp(pagesContainer, 'innerHTML', homePageHtml(getUsername()));
    renderLanguageChoices(getCurrentLangChoices(), getPreviousLangChoices());
    event(select('#add-lang-btn'), 'click', displayLangChoicesModal);
    event(select('#edit-nickname'), 'click', showNameChangeModal);
    event(setNameBtn, 'click', setDevName);
    adjustDevNameSize();
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
    const {
        completion,
        level,
        language,
    } = detailsObject;
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
    const {
        language,
        level,
        moduleNumber,
    } = detailsObject;
    insertHtml(select('.modules-section > div:empty'), 'beforebegin', moduleBoxHtml(detailsObject));
    event(select(`#module-${moduleNumber}-start`), 'click', () => {
        getLangObject(language).questionPage(moduleNumber, level);
    });
};


const renderQuestionPage = async (detailsObject) => {
    const {
        language,
        level,
    } = detailsObject;
    emptyPagesContainer();
    setProp(pagesContainer, 'innerHTML', questionPageHtml(detailsObject));
    event(select('#back-to-modules'), 'click', () => {
        getLangObject(language).modulesPage(level);
        removeSessionData();
    });
    event(select('#submit-button'), 'click', () => {
        getLangObject(language).solutionsPage();
    });
};

const renderSolutionPage = (detailsObject) => {
    const {
        language,
        level,
    } = detailsObject;
    emptyPagesContainer();
    setProp(pagesContainer, 'innerHTML', solutionPageHtml(detailsObject));
    classAction(select('.filter-options #all'), 'add', 'selected');
    event(select('#back-to-modules'), 'click', () => {
        getLangObject(language).modulesPage(level);
        removeSessionData();
    });
    for (const filterOption of selectAll('.filter-options span')) {
        event(filterOption, 'click', () => {
            [...selectAll('.filter-options span')].map((elem) => classAction(elem, 'remove', 'selected'));
            classAction(filterOption, 'add', 'selected');
            getLangObject(language).getSolution(filterOption.id);
        });
    }
};


export {
    showPage,
    hidePage,
    timer,
    playMusic,
    langsChosenOnSave,
    toggleSelectLangChoice,
    displayLangChoicesModal,
    renderAvailableLangs,
    renderHomePage,
    renderLevelsPage,
    renderLevelBoxes,
    renderModulesPage,
    renderModuleBoxes,
    renderQuestionPage,
    renderSolutionPage,
    getTimeSpent,
    showA2HBtn,
    hideA2HBtn,
};
