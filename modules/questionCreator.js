/* eslint-disable import/no-cycle */
import {
    setCurrentQuestionNumber,
    setQuestionStatement,
    setQuestionCodeBlock,
    setQuestionAction,
    implementOptions,
} from './questionUIFuncs.js';
import { shuffle } from './appEngineFuncs.js';

const createQuestion = ({
    language,
    code,
    questionNumber,
    questionType,
    questionStatement,
    options,
}) => {
    setQuestionStatement(code ? 'with-code' : 'without-code', questionStatement, questionNumber);

    if (code) {
        setQuestionCodeBlock(language, code, questionNumber);
    }

    setQuestionAction(questionType, questionNumber);

    implementOptions(questionType, shuffle(options), questionNumber);
};

export default createQuestion;
