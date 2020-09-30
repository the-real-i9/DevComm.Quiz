import questions from './questionsDatabase.js';
import { organizedQuestionsMap } from './sessionStrorage.js';

const chunkToTens = (array) => {
    let i = 0;
    const chunksOfTen = [];
    chunksOfTen[i] = [];
    for (const elem of array) {
        chunksOfTen[i].push(elem);
        if (chunksOfTen[i].length === 10) {
            i++;
            chunksOfTen[i] = [];
        }
    }
    return chunksOfTen;
};

const organizeQuestions = (langChoices) => {
    if (!langChoices.length) return;
    for (const langChoice of langChoices) {
        organizedQuestionsMap.set(langChoice, new Map());


        for (const level of Object.keys(questions)) {
            organizedQuestionsMap
            .get(langChoice)
            .set(level, new Map());
            const questionsInTens = chunkToTens(questions[level]);

            for (let i = 0; i < questionsInTens.length; i++) {
                const module = organizedQuestionsMap
                .get(langChoice)
                .get(level);
                if (module
                    .has(`module-${i < 9 ? '0' : ''}${i + 1}`) && module
                    // eslint-disable-next-line no-continue
                    .get(`module-${i < 9 ? '0' : ''}${i + 1}`).length > 9) continue;

                module.set(`module-${i < 9 ? '0' : ''}${i + 1}`, questionsInTens[i]);
            }
        }
    }

    console.log([...organizedQuestionsMap]);
};

const formatLangTextDevFriendly = (langText) => {
    if (langText === 'javascript') return 'JavaScript';
    if (langText === 'cs') return 'C#';
    if (langText === 'cplusplus') return 'C++';
    if (langText.length === 1) return langText.toUpperCase();
    return langText[0].toUpperCase() + langText.slice(1);
};

const grabLangPartFromString = (string) => string.slice(string.lastIndexOf('-') + 1);


export {
    organizeQuestions,
    formatLangTextDevFriendly,
    grabLangPartFromString,
};
