import { insertHtml, setProp, select } from './DOMFuncs.js';

const setCurrentQuestionNumber = (currentQuestionNumber, totalQuestion) => {
    const progress = 100 - ((currentQuestionNumber / totalQuestion) * 100);
    setProp(select('#qn'), 'textContent', currentQuestionNumber);
    select('.progress').style.setProperty('--progress', `${progress}%`);
};

const setQuestionStatement = () => {

};

export {
    setCurrentQuestionNumber,
    setQuestionStatement,
};
