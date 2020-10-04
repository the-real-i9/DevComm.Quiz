import { setCurrentQuestionNumber } from './questionUIFuncs.js';
import { getCurrentQuestion, getTotalQuestion } from './sessionStrorage.js';

const createQuestion = ({
    language,
    questionNumber,
    questionType,
    options,
    correctAnswer,
    explanation,
    reference,
    githubProfile,
    twitterProfile,
}) => {
    setCurrentQuestionNumber(getCurrentQuestion(), getTotalQuestion());
};

export default createQuestion;
