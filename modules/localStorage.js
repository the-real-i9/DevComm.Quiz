let languageChoices = [];
let username = 'Dev';

const setLanguageChoices = (langChoices) => {
    languageChoices = langChoices;
    // local Storage here
};

const setUsername = (name) => {
    username = name;
    // local Storage here
};

const getLanguageChoices = () => languageChoices;

const getUsername = () => username;

export {
    setLanguageChoices,
    getLanguageChoices,
    setUsername,
    getUsername,
};
