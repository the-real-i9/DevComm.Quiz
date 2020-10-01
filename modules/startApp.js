import { organizeQuestions, getAvailableLangs } from './appEngineFuncs.js';
import { renderHomePage, renderAvailableLangs } from './appUIFuncs.js';
import { getCurrentLangChoices } from './localStorage.js';

const startApp = () => {
    renderAvailableLangs(getAvailableLangs());
    organizeQuestions(getCurrentLangChoices());
    renderHomePage();
};

startApp();
