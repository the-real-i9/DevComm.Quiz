/* eslint-disable import/no-cycle */
import {
    setCurrentQuestionNumber,
    setQuestionStatement,
    setQuestionCodeBlock,
    setQuestionAction,
    implementOptions,
    setSocialHandles,
    retrieveAnswer,
    eraseQuestionBoard,
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
    eraseQuestionBoard();

    setCurrentQuestionNumber(getCurrentQuestion(), getTotalQuestion());
    setQuestionStatement(code ? 'with-code' : 'without-code', questionStatement);

    if (code) {
        setQuestionCodeBlock(language, code);
    }

    setQuestionAction(questionType);

    implementOptions(questionType, shuffle(options), questionNumber);

    setSocialHandles(githubProfile, twitterProfile);

    retrieveAnswer(questionType, questionNumber);
};

export default createQuestion;
