let languageChoices = [];
let username = 'Dev';

const setCurrentLangChoices = (langChoices) => {
    languageChoices = langChoices;
    // local Storage here
};

const setUsername = (name) => {
    username = name;
    // local Storage here
};

const getCurrentLangChoices = () => languageChoices;

const getUsername = () => username;

export {
    setCurrentLangChoices,
    getCurrentLangChoices,
    setUsername,
    getUsername,
};
