import { getLanguageChoices, getUsername } from './localStorage.js';

const renderLanguageChoices = (languageChoices) => {
    if (!languageChoices.length) return;
};

const renderHomePage = () => {
    // some implementation

    renderLanguageChoices(getLanguageChoices());
};

export {
    renderHomePage,
};
