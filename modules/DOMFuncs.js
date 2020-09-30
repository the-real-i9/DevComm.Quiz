const [select, selectAll] = [(elem) => document.querySelector(elem), (elem) => document.querySelectorAll(elem)];
const setProp = (elem, prop, value) => {
    if (!elem) return;
    elem[prop] = value;
};

const setStyle = (elem, prop, value) => {
    if (!elem) return;
    elem.style[prop] = value;
};

const classAction = (elem, action, ...classes) => {
    if (!elem) return;
    elem.classList[action](...classes);
};

const insertHtml = (elem, where, html) => {
    if (!elem) return;
    elem.insertAdjacentHTML(where, html);
};

const event = (elem, type, callback) => {
    if (!elem) return;
    elem.addEventListener(type, callback);
};

export {
    select,
    selectAll,
    setProp,
    setStyle,
    classAction,
    insertHtml,
    event,
};
