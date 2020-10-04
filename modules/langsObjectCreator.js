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
    startTimer,
} from './appUIFuncs.js';
import {
    organizedQuestionsMap,
    setTotalQuestion,
    setCurrentQuestion,
} from './sessionStrorage.js';
import {
    grabEndPartFromText,
} from './appEngineFuncs.js';


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
    }

    questionPage(moduleNumber, level) {
        const questionCount = organizedQuestionsMap.get(this.language).get(level).get(`module-${moduleNumber}`);
        setTotalQuestion(questionCount.length);
        renderQuestionPage({
            language: this.language,
            level,
            moduleNumber,
            totalQuestion: questionCount.length,
        });
        startTimer();
        this.level = level;
        this.moduleNumber = moduleNumber;
        this.question(1);
    }

    question(questionNumber) {
        setCurrentQuestion(questionNumber);
        const questions = organizedQuestionsMap.get(this.language).get(this.level).get(`module-${this.moduleNumber}`);
        const currentQuestionObject = questions[questionNumber - 1];
    }
}


export default UserLangChoice;
