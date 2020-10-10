import questions from './questionsDatabase.js';
import {
    organizedQuestionsMap,
    setTotalQuestion,
    setCurrentQuestion,
    deleteAnswersData,
    deleteLinksData,
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
    deleteLinksData();
};

const formatTextForHtml = (text) => {
    const regexBold = /\*\*([^*]+)\*\*/gu;
    const regexItalic = /\*([^*]+)\*/gu;
    const regexUnderline = /__([^__]+)__/gu;
    const regexCode = /`([^`]+)`/gu;
    const formattedText = text
        .replace(regexBold, '<b>$1</b>')
        .replace(regexItalic, '<i>$1</i>')
        .replace(regexUnderline, '<u>$1</u>')
        .replace(regexCode, '<code>$1</code>');
    return formattedText;
};

const formatCodeForHtml = (code) => {
    // erase starting whitespaces caused by template string
    const indentLength = /(\s+)(.+)\n/gu.exec(code)[1].length;
    const regex = new RegExp(`(\\s{1,${indentLength}})(.+)\n`, 'gu');
    const formattedCode = code
        .replace(regex, '$2\n')
        .trim();
    return formattedCode;
};

const grabLinkAddress = (str) => {
    const address = /\[(.+)\]/gu.exec(str) ? /\[(.+)\]/gu.exec(str)[1] : null;
    return address;
};

const grabLinkName = (str) => {
    const name = /\((.+)\)/gu.exec(str) ? /\((.+)\)/gu.exec(str)[1] : null;
    return name;
};

export {
    organizeQuestions,
    formatLangTextDevFriendly,
    grabEndPartFromText,
    getAvailableLangs,
    shuffle,
    removeSessionData,
    formatCodeForHtml,
    formatTextForHtml,
    grabLinkAddress,
    grabLinkName,
};
