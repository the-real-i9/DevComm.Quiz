import {
    setCurrentQuestionNumber,
    setQuestionStatement,
    setQuestionCodeBlock,
    setQuestionAction,
    implementOptions,
} from './questionUIFuncs.js';
import {
    getCurrentQuestion,
    getTotalQuestion,
} from './sessionStrorage.js';
import { shuffle } from './appEngineFuncs.js';

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

    implementOptions(questionType, shuffle(options), questionNumber);
};

export default createQuestion;
