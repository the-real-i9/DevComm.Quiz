import { organizeQuestions } from './appEngineFuncs.js';
import { renderHomePage } from './appUIFuncs.js';
const startApp = () => {
    organizeQuestions();
    renderHomePage();
};
