/* eslint-disable import/no-cycle */
import { getLevelCompletion } from './localStorage.js';
import { renderLevelsPage } from './appUIFuncs.js';


class UserLangChoice {
    constructor(language) {
        this.language = language;
    }

    async levelsPage() {
        await renderLevelsPage(this.language);
    }
}


export default UserLangChoice;
