/* eslint-disable import/no-cycle */
// /* eslint-disable no-undef */
import Swipe from 'https://unpkg.com/swiper/swiper-bundle.esm.browser.min.js';
import {
    insertHtml,
    setProp,
    select,
    selectAll,
    event,
    classAction,
    setStyle,
} from './DOMFuncs.js';
import {
    questionStatementHtml,
    codeBlockHtml,
    actionHtml,
    optionHtml,
    socialHandlesHtml,
    questionSectionHtml,
} from './htmlBoilerplates.js';
import {
    saveAnswerSelected,
    getAnswersSize,
    deleteAnswerItem,
    getTotalQuestionInModule,
    fetchLinks,
} from './sessionStrorage.js';
import {
    formatCodeForHtml,
    formatTextForHtml,
    grabLinkAddress,
    grabLinkName,
} from './appEngineFuncs.js';

const setQuestionSection = (questionNumber) => {
    insertHtml(select('.question-section-container'), 'beforeend', questionSectionHtml(questionNumber));
};

const setCurrentQuestionNumber = (currentQuestionNumber, totalQuestion) => {
    const progress = 100 - ((currentQuestionNumber / totalQuestion) * 100);
    setProp(select('#qn'), 'textContent', currentQuestionNumber);
    select('.progress').style.setProperty('--progress', `${progress}%`);
};

const setQuestionStatement = (qId, questionStatement, questionNumber) => {
    const htmlText = formatTextForHtml(questionStatement);
    insertHtml(select(`#question-section-question-${questionNumber}`), 'beforeend', questionStatementHtml(qId, htmlText));
};

const setQuestionCodeBlock = (language, code, questionNumber) => {
    const codeText = formatCodeForHtml(code);
    insertHtml(select(`#question-section-question-${questionNumber}`), 'beforeend', codeBlockHtml(language, codeText));
    [...selectAll('.code-block code')].map((codeBlock) => hljs.highlightBlock(codeBlock));
};

const setQuestionAction = (questionType, questionNumber) => {
    if (questionType === 'single-answer') {
        insertHtml(select(`#question-section-question-${questionNumber}`), 'beforeend', actionHtml('Choose the correct answer', questionNumber));
        return;
    }

    if (questionType === 'multiple-answers') {
        insertHtml(select(`#question-section-question-${questionNumber}`), 'beforeend', actionHtml('Choose all correct answers', questionNumber));
        return;
    }
};

const implementOptions = (questionType, options, questionNumber) => {
    options.forEach((v, i) => {
        insertHtml(select(`#options-question-${questionNumber}`), 'beforeend', optionHtml(i + 1, v));
    });
    for (const option of selectAll(`#options-question-${questionNumber} .option`)) {
        const firstChild = option.firstElementChild;
        const lastChild = option.lastElementChild;
        event(option, 'click', () => {
            if (questionType === 'single-answer') {
                for (const check of selectAll(`#options-question-${questionNumber} .option div`)) {
                    classAction(check, 'remove', 'selected');
                }
                classAction(lastChild, 'add', 'selected');
                saveAnswerSelected(questionNumber, firstChild.textContent);
            } else if (questionType === 'multiple-answers') {
                classAction(lastChild, 'toggle', 'selected');
                const answersSelected = [...selectAll(`#options-question-${questionNumber} .selected`)].map((v) => v.previousElementSibling.textContent);
                if (answersSelected.length) {
                    saveAnswerSelected(questionNumber, answersSelected);
                } else {
                    deleteAnswerItem(questionNumber);
                }
            }
            setProp(select('#ans-count'), 'textContent', getAnswersSize());
            setProp(select('#rem-count'), 'textContent', getTotalQuestionInModule() - getAnswersSize());
        });
        const optionBoxWidth = option.getBoundingClientRect().width;
        const optionTextWidth = firstChild.getBoundingClientRect().width;

        if (optionTextWidth > (optionBoxWidth * (77 / 100))) {
            setStyle(firstChild, 'fontSize', `${16 / 1.1}px`);
        }
    }
};

const setSocialHandles = (github, twitter) => {
    const bottomSection = select('.bottom');
    if ([...bottomSection.children].length > 1) {
        setProp(bottomSection.firstElementChild, 'outerHTML', '');
        setProp(bottomSection.lastElementChild, 'outerHTML', '');
    }
    const linkAddress = [github, twitter].map((str) => (str ? grabLinkAddress(str) : ''));
    const linkName = [github, twitter].map((str) => (str ? grabLinkName(str) : ''));
    if (github) {
        insertHtml(select('.bottom'), 'afterbegin', socialHandlesHtml('github', linkAddress[0], linkName[0]));
    } else {
        insertHtml(select('.bottom'), 'afterbegin', '<p></p>');
    }

    if (twitter) {
        insertHtml(select('.bottom'), 'beforeend', socialHandlesHtml('twitter', linkAddress[1], linkName[1]));
    } else {
        insertHtml(select('.bottom'), 'beforeend', '<p></p>');
    }
};

const initSwipe = () => {
// change on-swipe
    const swiper = new Swipe('.swiper-container');
    swiper.on('slideChange', function updateCurrentQuestion() {
        setCurrentQuestionNumber(this.activeIndex + 1, getTotalQuestionInModule());
        setSocialHandles(fetchLinks(this.activeIndex + 1)[0], fetchLinks(this.activeIndex + 1)[1]);
    });
};


export {
    setCurrentQuestionNumber,
    setQuestionStatement,
    setQuestionCodeBlock,
    setQuestionAction,
    implementOptions,
    setSocialHandles,
    setQuestionSection,
    initSwipe,
};
