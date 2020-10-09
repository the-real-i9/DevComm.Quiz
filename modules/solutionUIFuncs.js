import {
    setProp,
    select,
    insertHtml,
    classAction,
    selectAll,
} from './DOMFuncs.js';
import {
    solutionBoxHtml,
    solutionCodeBlockHtml,
    solutionQuestionStatementHtml,
} from './htmlBoilerplates.js';
import {
    formatCodeForHtml,
    formatTextForHtml,
} from './appEngineFuncs.js';

const emptySolutionsContainer = () => {
    const parentBox = select('.answer-solutions');
    setProp(parentBox, 'innerHTML', '');
    insertHtml(parentBox, 'afterbegin', '<p>Solutions</p>');
};

const setNoResult = (message) => {
    emptySolutionsContainer();
    const msgHtml = select('.answer-solutions > p');
    setProp(msgHtml, 'textContent', message);
    classAction(msgHtml, 'add', 'notification');
};


const renderSolutionBox = (detailsObject) => {
    const {
        code,
        questionNumber,
        language,
        questionStatement,
    } = detailsObject;
    const parentBox = select('.answer-solutions');
    insertHtml(parentBox, 'beforeend', solutionBoxHtml(detailsObject));
    const solutionBox = select(`#solution-box-q${questionNumber}`);
    if (code) {
        insertHtml(solutionBox, 'afterbegin', solutionCodeBlockHtml(language, formatCodeForHtml(code)));
        [...selectAll('.code-block code')].map((codeBlock) => hljs.highlightBlock(codeBlock));
        insertHtml(solutionBox, 'afterbegin', solutionQuestionStatementHtml({
            questionIdentity: 'with-code',
            questionNumber,
            questionStatement: formatTextForHtml(questionStatement),
        }));
    } else {
        insertHtml(solutionBox, 'afterbegin', solutionQuestionStatementHtml({
            questionIdentity: 'without-code',
            questionNumber,
            questionStatement: formatTextForHtml(questionStatement),
        }));
    }
};

export {
    setNoResult,
    renderSolutionBox,
    emptySolutionsContainer,
};
