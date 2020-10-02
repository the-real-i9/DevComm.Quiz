let languageChoices = [];
let username = 'Dev';
const levelCompletion = new Map();

const setCurrentLangChoices = (langChoices) => {
	languageChoices = langChoices;
	// local Storage here
	localStorage.setItem('lang-choices', JSON.stringify(langChoices));
};

const setUsername = (name) => {
	username = name;
	// local Storage here
	localStorage.setItem('dev-name', name);
};

const setLevelCompletion = (language, level, compValue) => {
	if (!levelCompletion.has(language)) levelCompletion.set(language, new Map());
	levelCompletion.get(language).set(level, compValue);

	const serialized = JSON.stringify(
		[...levelCompletion],
		(key, value) => {
			if ({}.toString.call(value) === '[object Map]') return [...value];
			return value;
		},
	);
	localStorage.setItem('level-completions', serialized);
};

const getLevelCompletion = (language, level) => (levelCompletion.get(language)
                                                && levelCompletion.get(language).get(level))
                                                || 0;

const getCurrentLangChoices = () => languageChoices;

const getUsername = () => username;

export {
	setCurrentLangChoices,
	getCurrentLangChoices,
	setUsername,
	getUsername,
	setLevelCompletion,
	getLevelCompletion,
};
