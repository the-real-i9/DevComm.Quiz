const organizedQuestionsMap = new Map();
let previousLangChoices = [];
const answersSelected = new Map();
let currentQuestion = null;
let totalQuestion = null;
const quLinks = new Map();
const pushLinks = (github, twitter, questionNumber) => {
    quLinks.set(`question-${questionNumber}-links`, [github, twitter]);
};

const fetchLinks = (questionNumber) => quLinks.get(`question-${questionNumber}-links`);

const setPreviousLangChoices = (choices) => {
    previousLangChoices = choices;
};

const getPreviousLangChoices = () => previousLangChoices;

const saveAnswerSelected = (questionNumber, optionValue) => {
    answersSelected.set(`question-${questionNumber}-answer`, optionValue);
};

const getAnswerSelected = (questionNumber) => {
    if (!answersSelected.has(`question-${questionNumber}-answer`)) return false;
    return answersSelected.get(`question-${questionNumber}-answer`);
};

const setCurrentQuestion = (currentQuestionNumber) => {
    currentQuestion = currentQuestionNumber;
};

const getCurrentQuestion = () => currentQuestion;

const setTotalQuestion = (totalQuestionCount) => {
    totalQuestion = totalQuestionCount;
};

const getTotalQuestion = () => totalQuestion;

const getAnswersSize = () => answersSelected.size;

const deleteAnswerItem = (questionNumber) => answersSelected.has(`question-${questionNumber}-answer`) && answersSelected.delete(`question-${questionNumber}-answer`);

const deleteAnswersData = () => answersSelected.clear();
const deleteLinksData = () => quLinks.clear();

export {
    organizedQuestionsMap,
    setPreviousLangChoices,
    getPreviousLangChoices,
    saveAnswerSelected,
    getAnswerSelected,
    setCurrentQuestion,
    getCurrentQuestion,
    setTotalQuestion,
    getTotalQuestion,
    deleteAnswersData,
    getAnswersSize,
    deleteAnswerItem,
    fetchLinks,
    pushLinks,
    deleteLinksData,
};
