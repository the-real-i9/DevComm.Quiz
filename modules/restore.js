import {
    setCurrentLangChoices,
    setUsername,
    getUsername,
    setModuleScore,
} from './localStorage.js';
import {
    grabEndPartFromText,
} from './appEngineFuncs.js';

const restoreApp = () => {
    const langChoices = localStorage.getItem('lang-choices');
    const username = localStorage.getItem('dev-name');
    const moduleScores = localStorage.getItem('module-scores');
    if (langChoices) {
        setCurrentLangChoices(JSON.parse(langChoices));
    }
    setUsername(username || getUsername());

    if (moduleScores) {
        for (const [language, levelMap] of JSON.parse(moduleScores)) {
            for (const [level, moduleMap] of levelMap) {
                for (const [module, moduleScoreValue] of moduleMap) {
                    setModuleScore({
                        language,
                        level,
                        moduleNumber: grabEndPartFromText(module),
                        moduleScoreValue,
                    });
                }
            }
        }
    }
};

export default restoreApp;
