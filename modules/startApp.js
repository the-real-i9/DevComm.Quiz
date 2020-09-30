import { organizeQuestions } from './appEngineFuncs.js';
import { renderHomePage } from './appUIFuncs.js';
import { getCurrentLangChoices } from './localStorage.js';

const startApp = () => {
    organizeQuestions(getCurrentLangChoices());

    renderHomePage();
};

startApp();
