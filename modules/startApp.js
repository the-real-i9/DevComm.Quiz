import {
    organizeQuestions,
    getAvailableLangs,
} from './appEngineFuncs.js';
import {
    renderHomePage,
    renderAvailableLangs,
} from './appUIFuncs.js';
import {
    getCurrentLangChoices,
} from './localStorage.js';
import restoreApp from './restore.js';

const startApp = () => {
    restoreApp();
    renderAvailableLangs(getAvailableLangs());
    organizeQuestions(getCurrentLangChoices());
    renderHomePage();
};

export default startApp;
