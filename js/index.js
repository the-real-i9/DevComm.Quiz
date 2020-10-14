import startApp from '../modules/startApp.js';
import {
    langsChosenOnSave,
    displayLangChoicesModal,
    toggleSelectLangChoice,
} from '../modules/appUIFuncs.js';
import {
    event,
    select,
    selectAll,
} from '../modules/DOMFuncs.js';
import DOMElems from '../modules/DOMElems.js';
import askIntall from '../modules/A2HS.js';

const {
    saveChoicesBtn,
} = DOMElems;

startApp();

event(select('#add-lang-btn'), 'click', displayLangChoicesModal);
[...selectAll('.lang-choice')].map((el) => event(el, 'click', (ev) => {
    toggleSelectLangChoice(ev);
}));

event(saveChoicesBtn, 'click', langsChosenOnSave);

window.addEventListener('load', () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('../sw.js')
        .then((sw) => {
            console.log('SW Registration Success');
        })
        .catch((err) => {
            console.log('SW Registration Failed');
        });
    }
});

askIntall();
