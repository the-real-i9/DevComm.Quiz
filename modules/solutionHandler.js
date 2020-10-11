import {
    renderSolutionBox,
} from './solutionUIFuncs.js';
import {
    formatTextForHtml,
    grabLinkAddress,
    grabLinkName,
} from './appEngineFuncs.js';

const handleSolution = ({
    language,
    userAnswer,
    correctAnswer,
    status,
    explanation,
    reference,
    questionNumber,
    questionStatement,
    code,
}) => {
    let referenceAddress = null;
    let referenceName = null;
    if (reference) {
        referenceAddress = grabLinkAddress(reference);
        referenceName = grabLinkName(reference);
        if (!referenceAddress) {
            referenceAddress = `https://www.google.com/search?q=${referenceName.split(' ').join('+')}`;
        }
    } else {
        referenceAddress = 'https://www.google.com/';
        referenceName = 'Google Search';
    }

    const authorAnswer = typeof correctAnswer === 'string' ? correctAnswer : correctAnswer.join(' | ');
    renderSolutionBox({
        language,
        userAnswer,
        authorAnswer,
        answerStatus: status,
        explanation: formatTextForHtml(explanation),
        referenceAddress,
        referenceName,
        questionNumber,
        code,
        questionStatement,
    });
};

export default handleSolution;
