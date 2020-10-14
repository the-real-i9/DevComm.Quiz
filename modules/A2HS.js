import DOMElems from './DOMElems.js';
import { showA2HBtn, hideA2HBtn } from './appUIFuncs.js';
const { a2hBtn } = DOMElems;

const askIntall = () => {
    let deferredPrompt = null;

    window.addEventListener('beforeinstallprompt', (ev) => {
        ev.preventDefault();
        deferredPrompt = ev;
        showA2HBtn();
    });

    a2hBtn.addEventListener('click', (ev) => {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choice) => {
            deferredPrompt = null;
            hideA2HBtn();
        });
    });
};

export default askIntall;
