const organizedQuestionsMap = new Map();
let previousLangChoices = [];

const setPreviousLangChoices = (choices) => {
    previousLangChoices = choices;
};

const getPreviousLangChoices = () => previousLangChoices;


export {
    organizedQuestionsMap,
    setPreviousLangChoices,
    getPreviousLangChoices,
};
