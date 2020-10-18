import {
    organizeQuestions,
    getAvailableLangs,
} from './appEngineFuncs.js';
import {
    renderHomePage,
    renderAvailableLangs,
    hidePage,
    showPage,
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
    hidePage();
<<<<<<< HEAD
    showPage();
=======
    audio.addEventListener('loadeddata', () => {
        showPage();
        playMusic(audio);
    });
>>>>>>> parent of 9d90109... bug fix
};

export default startApp;
