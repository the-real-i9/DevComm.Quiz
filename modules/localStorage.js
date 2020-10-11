let languageChoices = [];
let username = 'Dev';
const levelCompletion = new Map();
const moduleScore = new Map();

const setCurrentLangChoices = (langChoices) => {
	languageChoices = langChoices;
	// local Storage here
	localStorage.setItem('lang-choices', JSON.stringify(langChoices));
};

const setUsername = (name) => {
	username = name;
	localStorage.setItem('dev-name', name);
};

const setLevelCompletion = ({
	language,
	level,
	compValue,
}) => {
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

const getLevelCompletion = (language, level) => (levelCompletion.get(language) &&
		levelCompletion.get(language).get(level)) ||
	0;

const setModuleScore = ({
	language,
	level,
	moduleNumber,
	moduleScoreValue,
}) => {
	if (!moduleScore.has(language)) moduleScore.set(language, new Map());
	moduleScore.get(language).set(level, new Map());
	moduleScore.get(language).get(level).set(`module-${moduleNumber}`, moduleScoreValue);

	const serialized = JSON.stringify(
		[...moduleScore],
		(key, value) => {
			if ({}.toString.call(value) === '[object Map]') return [...value];
			return value;
		},
	);
	localStorage.setItem('module-scores', serialized);
};

const getModuleScore = ({
	language,
	level,
	module,
}) => {
	return moduleScore?.get(language)?.get(level)?.get(module) || 0;
};

const getCurrentLangChoices = () => languageChoices;

const getUsername = () => username;

export {
	setCurrentLangChoices,
	getCurrentLangChoices,
	setUsername,
	getUsername,
	setLevelCompletion,
	getLevelCompletion,
	setModuleScore,
	getModuleScore,
};