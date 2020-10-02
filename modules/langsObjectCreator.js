/* eslint-disable import/no-cycle */
import { getLevelCompletion } from './localStorage.js';
import { renderLevelsPage, renderLevelBoxes } from './appUIFuncs.js';
import { organizedQuestionsMap } from './sessionStrorage.js';


class UserLangChoice {
    constructor(language) {
        this.language = language;
    }

    async levelsPage() {
        await renderLevelsPage(this.language);

        for (const [levelKey, levelValue] of organizedQuestionsMap.get(this.language)) {
            let questionsCount = 0;

            for (const [moduleKey, moduleValue] of levelValue) {
                questionsCount += moduleValue.length;
            }

            renderLevelBoxes({
                language: this.language,
                levelTitle: levelKey,
                completion: getLevelCompletion(this.language, levelKey),
                questionsCount,
            });
        }
    }
}


export default UserLangChoice;
