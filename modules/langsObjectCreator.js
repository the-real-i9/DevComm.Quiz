/* eslint-disable import/no-cycle */
import {
    getLevelCompletion,
    getModuleScore,
} from './localStorage.js';
import {
    renderLevelsPage,
    renderLevelBoxes,
    renderModulesPage,
    renderModuleBoxes,
    renderQuestionPage,
    timer,
} from './appUIFuncs.js';
import {
    organizedQuestionsMap,
    setTotalQuestion,
    setCurrentQuestion,
    getTotalQuestion,
} from './sessionStrorage.js';
import {
    grabEndPartFromText, shuffle,
} from './appEngineFuncs.js';
import createQuestion from './questionCreator.js';
import { navigateQuestion } from './questionUIFuncs.js';


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
                        moduleKey,
                    }),
                });
            }
        }
        timer('stop');
    }

    questionPage(moduleNumber, level) {
        const questions = organizedQuestionsMap.get(this.language).get(level).get(`module-${moduleNumber}`);
        setTotalQuestion(questions.length);
        renderQuestionPage({
            language: this.language,
            level,
            moduleNumber,
            totalQuestion: questions.length,
        });
        timer('start');
        this.level = level;
        this.moduleNumber = moduleNumber;
        // organizedQuestionsMap.get(this.language).get(level).set(`module-${moduleNumber}`, shuffle(questions));
        this.question(1);
        navigateQuestion(this.language);
    }

    question(questionNumber) {
        if (questionNumber < 1 || questionNumber > getTotalQuestion()) return;
        setCurrentQuestion(questionNumber);
        const questions = organizedQuestionsMap.get(this.language).get(this.level).get(`module-${this.moduleNumber}`);
        const currentQuestionObject = questions[questionNumber - 1];
        currentQuestionObject.questionNumber = questionNumber;
        createQuestion(currentQuestionObject);
    }
}


export default UserLangChoice;
