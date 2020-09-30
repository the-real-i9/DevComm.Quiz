import '../modules/startApp.js';
import { langsChosenOnSave, displayLangChoicesModal, toggleSelectLangChoice } from '../modules/appUIFuncs.js';
import { event, select } from '../modules/DOMFuncs.js';
import DOMElems from '../modules/DOMElems.js';

const { saveChoicesBtn, addLangBtn, langChoicesCheckBox } = DOMElems;

event(select('#add-lang-btn'), 'click', displayLangChoicesModal);
[...langChoicesCheckBox].map((el) => event(el, 'click', (ev) => {
    toggleSelectLangChoice(ev);
}));
event(saveChoicesBtn, 'click', langsChosenOnSave);
