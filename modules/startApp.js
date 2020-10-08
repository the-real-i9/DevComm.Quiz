import {
    organizeQuestions,
    getAvailableLangs,
} from './appEngineFuncs.js';
import {
    renderHomePage,
    renderAvailableLangs,
    playMusic,
    hidePage,
    showPage,
} from './appUIFuncs.js';
import {
    getCurrentLangChoices,
} from './localStorage.js';
import restoreApp from './restore.js';

const audio = new Audio('../audio/MBB - Happy (Vlog No Copyright Music).mp3');
audio.loop = true;
audio.volume = 0.2;
const startApp = () => {
    restoreApp();
    renderAvailableLangs(getAvailableLangs());
    organizeQuestions(getCurrentLangChoices());
    renderHomePage();
    hidePage();
    audio.addEventListener('loadeddata', () => {
        showPage();
        playMusic(audio);
    });
};

export default startApp;
