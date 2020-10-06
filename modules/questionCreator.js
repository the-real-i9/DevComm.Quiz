import {
    setCurrentQuestionNumber,
    setQuestionStatement,
    setQuestionCodeBlock,
    setQuestionAction,
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
    githubProfile,
    twitterProfile,
}) => {
    setCurrentQuestionNumber(getCurrentQuestion(), getTotalQuestion());
    setQuestionStatement(code ? 'with-code' : 'without-code', questionStatement);

    if (code) {
        setQuestionCodeBlock(language, code);
    }

    setQuestionAction(questionType);
};

export default createQuestion;
