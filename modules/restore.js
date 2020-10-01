import { setCurrentLangChoices, setUsername, getUsername } from './localStorage.js';

const restoreApp = () => {
    const langChoices = localStorage.getItem('lang-choices');
    const username = localStorage.getItem('dev-name');
    if (!langChoices) return;
    setCurrentLangChoices(JSON.parse(langChoices));
    setUsername(username || getUsername());
};

export default restoreApp;
