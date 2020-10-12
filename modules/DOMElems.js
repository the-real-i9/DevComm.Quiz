import { select } from './DOMFuncs.js';
const DOMElems = {
    pagesContainer: select('.main-pane'),
    langChoicesModal: select('.languages-modal'),
    availableLangsContainer: select('.avail-langs'),
    saveChoicesBtn: select('.langs-chosen-save'),
    nameSetModal: select('.name-set-modal'),
    nameInput: select('#name-input'),
    setNameBtn: select('#set-name'),
};

export default DOMElems;
