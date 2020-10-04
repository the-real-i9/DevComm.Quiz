const organizedQuestionsMap = new Map();
let previousLangChoices = [];
const answersSelected = new Map();
let currentQuestion = null;
let totalQuestion = null;

const setPreviousLangChoices = (choices) => {
    previousLangChoices = choices;
};

const getPreviousLangChoices = () => previousLangChoices;

const saveAnswerSelected = (questionNumber, optionKey) => {
    answersSelected.set(`question-${questionNumber}-answer`, optionKey);
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

const deleteAnswersData = () => answersSelected.clear();

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
};
