/* eslint-disable no-undef */
import {
    insertHtml,
    setProp,
    select,
    selectAll,
    event,
    classAction,
} from './DOMFuncs.js';
import {
    questionStatementHtml,
    codeBlockHtml,
    actionHtml,
    optionHtml,
} from './htmlBoilerplates.js';
import { saveAnswerSelected } from './sessionStrorage.js';

const formatTextForHtml = (text) => {
    const regexBold = /\*\*([^*]+)\*\*/gu;
    const regexItalic = /\*([^*]+)\*/gu;
    const regexUnderline = /__([^__]+)__/gu;
    const regexCode = /`([^`]+)`/gu;
    const formattedText = text
        .replace(regexBold, '<b>$1</b>')
        .replace(regexItalic, '<i>$1</i>')
        .replace(regexUnderline, '<u>$1</u>')
        .replace(regexCode, '<code>$1</code>');
    return formattedText;
};

const formatCodeForHtml = (code) => {
    // erase starting whitespaces caused by template string
    const indentLength = /(\s+)(.+)\n/gu.exec(code)[1].length;
    const regex = new RegExp(`(\\s{1,${indentLength}})(.+)\n`, 'gu');
    const formattedCode = code
        .replace(regex, '$2\n')
        .trim();
    return formattedCode;
};

const setCurrentQuestionNumber = (currentQuestionNumber, totalQuestion) => {
    const progress = 100 - ((currentQuestionNumber / totalQuestion) * 100);
    setProp(select('#qn'), 'textContent', currentQuestionNumber);
    select('.progress').style.setProperty('--progress', `${progress}%`);
};

const setQuestionStatement = (qId, questionStatement) => {
    const htmlText = formatTextForHtml(questionStatement);
    insertHtml(select('#question-section'), 'beforeend', questionStatementHtml(qId, htmlText));
};

const setQuestionCodeBlock = (language, code) => {
    const codeText = formatCodeForHtml(code);
    insertHtml(select('#question-section'), 'beforeend', codeBlockHtml(language, codeText));
    hljs.highlightBlock(select('#code-block code'));
};

const setQuestionAction = (questionType) => {
    if (questionType === 'single-answer') {
        insertHtml(select('#question-section'), 'beforeend', actionHtml('Choose the correct answer'));
        return;
    }

    if (questionType === 'mulltiple-answers') {
        insertHtml(select('#question-section'), 'beforeend', actionHtml('Choose all correct answers'));
        return;
    }
};

const implementOptions = (questionType, options, questionNumber) => {
    options.forEach((v, i) => {
        insertHtml(select('.options'), 'beforeend', optionHtml(i + 1, v));
    });
    for (const option of selectAll('.option')) {
        event(option, 'click', () => {
            if (questionType === 'single-answer') {
                for (const check of selectAll('.option div')) {
                    classAction(check, 'remove', 'selected');
                }
                classAction(option.lastElementChild, 'add', 'selected');
                saveAnswerSelected(questionNumber, option.firstElementChild.textContent);
            } else if (questionType === 'mulltiple-answers') {
                classAction(option.lastElementChild, 'toggle', 'selected');
                saveAnswerSelected(questionNumber, [...selectAll('.selected')].map((v) => v.previousElementSibling.textContent));
            }
        });
    }
};

export {
    setCurrentQuestionNumber,
    setQuestionStatement,
    setQuestionCodeBlock,
    setQuestionAction,
    implementOptions,
};
