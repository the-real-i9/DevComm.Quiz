let languageChoices = [];
let username = 'Dev';

const setCurrentLangChoices = (langChoices) => {
    languageChoices = langChoices;
    // local Storage here
    localStorage.setItem('lang-choices', JSON.stringify(langChoices));
};

const setUsername = (name) => {
    username = name;
    // local Storage here
    localStorage.setItem('dev-name', name);
};

const getCurrentLangChoices = () => languageChoices;

const getUsername = () => username;

export {
    setCurrentLangChoices,
    getCurrentLangChoices,
    setUsername,
    getUsername,
};
