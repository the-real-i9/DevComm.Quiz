import { organizeQuestions, getAvailableLangs } from './appEngineFuncs.js';
import { renderHomePage, renderAvailableLangs, playMusic } from './appUIFuncs.js';
import { getCurrentLangChoices } from './localStorage.js';
import restoreApp from './restore.js';

const audio = new Audio('../audio/MBB - Happy (Vlog No Copyright Music).mp3');
audio.loop = true;
audio.volume = 0.5;
const startApp = () => {
    restoreApp();
    organizeQuestions(getCurrentLangChoices());
    renderAvailableLangs(getAvailableLangs());
    audio.addEventListener('loadeddata', () => {
        renderHomePage();
        playMusic(audio);
    });
};

export default startApp;
