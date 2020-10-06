import {
    setCurrentQuestionNumber,
    setQuestionStatement,
    setQuestionCodeBlock,
} from './questionUIFuncs.js';
import {
    getCurrentQuestion,
    getTotalQuestion,
} from './sessionStrorage.js';

const createQuestion = ({
    language,
    code,
    questionNumber,
    questionType,
    questionStatement,
    options,
    correctAnswer,
    explanation,
    reference,
    githubProfile,
    twitterProfile,
}) => {
    setCurrentQuestionNumber(getCurrentQuestion(), getTotalQuestion());
    setQuestionStatement(code ? 'with-code' : 'without-code', questionStatement);

    if (code) {
        setQuestionCodeBlock(language, code);
    }
};

export default createQuestion;
