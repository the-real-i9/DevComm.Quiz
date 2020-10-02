/* eslint-disable import/no-cycle */
import UserLangChoice from './langsObjectCreator.js';

const userLanguageChoices = new Map();


const createLangObject = (language) => {
    userLanguageChoices.set(language, new UserLangChoice(language));
};

const deleteLangObject = (language) => {
    userLanguageChoices.delete(language);
};

const getLangObject = (language) => userLanguageChoices.get(language);

export {
    createLangObject,
    deleteLangObject,
    getLangObject,
};
