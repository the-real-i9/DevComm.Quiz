import startApp from '../modules/startApp.js';
import { langsChosenOnSave, displayLangChoicesModal, toggleSelectLangChoice } from '../modules/appUIFuncs.js';
import { event, select, selectAll } from '../modules/DOMFuncs.js';
import DOMElems from '../modules/DOMElems.js';

const { saveChoicesBtn, addLangBtn } = DOMElems;

startApp();

event(select('#add-lang-btn'), 'click', displayLangChoicesModal);
[...selectAll('.lang-choice')].map((el) => event(el, 'click', (ev) => {
    toggleSelectLangChoice(ev);
}));

event(saveChoicesBtn, 'click', langsChosenOnSave);
