import questions from './questionsDatabase.js';
import organizedQuestions from './sessionStrorage.js';
import getLanguageChoices from './localStorage.js';

const organizeQuestions = () => {
    const languageChoices = getLanguageChoices();
    if (!languageChoices.length) return;
};

const formatLangTextDevFriendly = (langText) => {
    if (langText === 'javascript') return 'JavaScript';
    if (langText === 'cs') return 'C#';
    if (langText === 'cplusplus') return 'C++';
    if (langText.length === 1) return langText.toUpperCase();
    return langText[0].toUpperCase() + langText.slice(1);
};

export {
    organizeQuestions,
    formatLangTextDevFriendly,
};
