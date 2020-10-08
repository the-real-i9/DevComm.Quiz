import questions from './questionsDatabase.js';
import {
    organizedQuestionsMap,
    setTotalQuestion,
    setCurrentQuestion,
    deleteAnswersData,
} from './sessionStrorage.js';

const chunkToTens = (array, langChoice) => {
    let i = 0;
    const chunksOfTen = array.reduce((acc, v) => {
        if (acc[i].length === 10) {
            i++;
            acc.push([]);
        }
        if (v.language === langChoice) {
            acc[i].push(v);
        }
        return acc;
    }, [
        [],
    ]);
    return chunksOfTen;
};

const organizeQuestions = (langChoices) => {
    if (!langChoices.length) return;
    organizedQuestionsMap.clear();
    for (const langChoice of langChoices) {
        organizedQuestionsMap.set(langChoice, new Map());

        for (const level of Object.keys(questions)) {
            organizedQuestionsMap
                .get(langChoice)
                .set(level, new Map());
            const questionsInTens = chunkToTens(questions[level], langChoice);

            for (let i = 0; i < questionsInTens.length; i++) {
                const modules = organizedQuestionsMap
                    .get(langChoice)
                    .get(level);
                if (modules
                    .has(`module-${i < 9 ? '0' : ''}${i + 1}`) && modules
                    // eslint-disable-next-line no-continue
                    .get(`module-${i < 9 ? '0' : ''}${i + 1}`).length > 9) continue;

                modules.set(`module-${i < 9 ? '0' : ''}${i + 1}`, questionsInTens[i]);
            }
        }
    }

    console.log(organizedQuestionsMap);
};

const getAvailableLangs = () => {
    const availLangs = [];
    for (const level of Object.keys(questions)) {
        for (const questionObj of questions[level]) {
            availLangs.push(questionObj.language);
        }
    }
    return [...new Set(availLangs)];
};

const formatLangTextDevFriendly = (langText) => {
    if (langText === 'javascript') return 'JavaScript';
    if (langText === 'cs') return 'C#';
    if (langText === 'cplusplus') return 'C++';
    if (langText.length === 1) return langText.toUpperCase();
    return langText[0].toUpperCase() + langText.slice(1);
};

const grabEndPartFromText = (text) => text.slice(text.lastIndexOf('-') + 1);

const shuffle = (array) => {
    if (!Array.isArray(array)) throw new TypeError('Argument type is not an Array');
    const arr = array.slice();
    const newArr = [];
    while (arr.length !== 0) {
        const randChoice = arr[Math.trunc(Math.random() * arr.length)];
        newArr.push(randChoice);
        arr.splice(arr.indexOf(randChoice), 1);
    }
    return newArr;
};

const removeSessionData = () => {
    setTotalQuestion(null);
    setCurrentQuestion(null);
    deleteAnswersData();
};

export {
    organizeQuestions,
    formatLangTextDevFriendly,
    grabEndPartFromText,
    getAvailableLangs,
    shuffle,
    removeSessionData,
};
