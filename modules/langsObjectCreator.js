/* eslint-disable import/no-cycle */
import {
    getLevelCompletion,
    getModuleScore,
    setModuleScore,
} from './localStorage.js';
import {
    renderLevelsPage,
    renderLevelBoxes,
    renderModulesPage,
    renderModuleBoxes,
    renderQuestionPage,
    timer,
    renderSolutionPage,
    getTimeSpent,
} from './appUIFuncs.js';
import {
    organizedQuestionsMap,
    setTotalQuestion,
    getTotalQuestion,
    getAnswerSelected,
    fetchLinks,
    pushLinks,
} from './sessionStrorage.js';
import {
    grabEndPartFromText,
    shuffle,
} from './appEngineFuncs.js';
import createQuestion from './questionCreator.js';
import {
    setQuestionSection,
    setCurrentQuestionNumber,
    setSocialHandles,
    initSwipe,
} from './questionUIFuncs.js';
import quotes from './quotes.js';
import handleSolution from './solutionHandler.js';
import {
    setNoResult,
    emptySolutionsContainer,
} from './solutionUIFuncs.js';


class UserLangChoice {
    constructor(language) {
        this.language = language;
    }

    levelsPage() {
        renderLevelsPage(this.language);

        for (const [levelKey, levelValue] of organizedQuestionsMap.get(this.language)) {
            let questionsCount = 0;

            for (const [moduleKey, moduleValue] of levelValue) {
                questionsCount += moduleValue.length;
            }

            renderLevelBoxes({
                language: this.language,
                level: levelKey,
                completion: getLevelCompletion(this.language, levelKey),
                questionsCount,
            });
        }
    }

    modulesPage(level) {
        const modules = organizedQuestionsMap.get(this.language).get(level);
        if (modules.get('module-01').length) {
            renderModulesPage(this.language, level);

            for (const [moduleKey, moduleValue] of modules) {
                renderModuleBoxes({
                    language: this.language,
                    level,
                    moduleNumber: grabEndPartFromText(moduleKey),
                    moduleScore: getModuleScore({
                        language: this.language,
                        level,
                        module: moduleKey,
                    }),
                });
            }
        }
        timer('stop');
    }

    async questionPage(moduleNumber, level) {
        const questions = shuffle(organizedQuestionsMap.get(this.language).get(level).get(`module-${moduleNumber}`));
        setTotalQuestion(questions.length);
        renderQuestionPage({
            language: this.language,
            level,
            moduleNumber,
            totalQuestion: questions.length,
        });
        timer('start');
        this.questions = questions;
        this.level = level;
        this.moduleNumber = moduleNumber;
        await questions.forEach((v, i) => {
            setQuestionSection(i + 1);
            this.setQuestion(i + 1);
        });
        setCurrentQuestionNumber(1, getTotalQuestion());
        setSocialHandles(fetchLinks(1)[0], fetchLinks(1)[1]);
        initSwipe();
    }

    setQuestion(questionNumber) {
        if (questionNumber < 1 || questionNumber > getTotalQuestion()) return;
        // setCurrentQuestion(questionNumber);
        const {
            questions,
        } = this;
        const currentQuestionObject = questions[questionNumber - 1];
        currentQuestionObject.questionNumber = questionNumber;
        pushLinks(currentQuestionObject.githubProfile, currentQuestionObject.twitterProfile, questionNumber);
        createQuestion(currentQuestionObject);
    }

    solutionsPage() {
        const {
            questions,
        } = this;
        questions.forEach((q, i) => {
            const authorAnswer = q.correctAnswer;
            const userAnswer = getAnswerSelected(i + 1);

            if (!userAnswer) {
                q.status = 'skipped';
                q.userAnswer = '(Skipped)';
                q.questionNumber = q.questionNumber || i + 1;
            } else if (typeof authorAnswer === 'string') {
                if (authorAnswer === userAnswer) {
                    q.status = 'correct';
                } else {
                    q.status = 'incorrect';
                }
                q.userAnswer = userAnswer;
            } else if (Array.isArray(authorAnswer)) {
                if (authorAnswer.length === userAnswer.length) {
                    const checkEqual = authorAnswer.every((authorAns) => userAnswer.includes(authorAns));
                    if (checkEqual) {
                        q.status = 'correct';
                    } else {
                        q.status = 'incorrect';
                    }
                } else {
                    q.status = 'incorrect';
                }
                q.userAnswer = userAnswer.join(' | ');
            }
        });
        this.correctAnswers = questions.filter((q) => q.status === 'correct');
        this.incorrectAnswers = questions.filter((q) => q.status === 'incorrect');
        this.skippedQuestions = questions.filter((q) => q.status === 'skipped');

        const randomQuote = quotes()[Math.trunc(Math.random() * quotes().length)];

        renderSolutionPage({
            language: this.language,
            level: this.level,
            moduleNumber: this.moduleNumber,
            totalQuestion: getTotalQuestion(),
            timeSpent: getTimeSpent(),
            correctAnswersCount: this.correctAnswers.length,
            incorrectAnswersCount: this.incorrectAnswers.length,
            skippedQuestionsCount: this.skippedQuestions.length,
            ...randomQuote,
        });
        setModuleScore({
            language: this.language,
            level: this.level,
            moduleNumber: this.moduleNumber,
            moduleScoreValue: Math.round((this.correctAnswers.length / getTotalQuestion()) * 100),
        });
        this.getSolution('all');
    }

    getSolution(category) {
        emptySolutionsContainer();
        const {
            questions,
        } = this;
        switch (category) {
            case 'all':
                for (const question of questions) {
                    handleSolution(question);
                }
                break;
            case 'correct':
                if (!this.correctAnswers.length) setNoResult('You have answered no question correctly.');
                else {
                    for (const question of this.correctAnswers) {
                        handleSolution(question);
                    }
                }
                break;
            case 'incorrect':
                if (!this.incorrectAnswers.length) setNoResult('You have answered no question incorrectly.');
                else {
                    for (const question of this.incorrectAnswers) {
                        handleSolution(question);
                    }
                }
                break;
            case 'skipped':
                if (!this.skippedQuestions.length) setNoResult('You have skipped no question.');
                else {
                    for (const question of this.skippedQuestions) {
                        handleSolution(question);
                    }
                }
                break;
            default:
        }
    }
}


export default UserLangChoice;
