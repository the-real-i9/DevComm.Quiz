let languageChoices = [];
let username = 'Dev';
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
	totalQuestionInModule,
}) => {
	const value = moduleScore?.get(language)?.get(level)?.get(module);
	return value ? Math.round((value / totalQuestionInModule) * 100) : 0;
};

const getTotalLevelCorrectAnswers = (language, level) => {
	const moduleKey_correctAnswerLength = moduleScore?.get(language)?.get(level);
	if (moduleKey_correctAnswerLength) {
		const total = [...moduleKey_correctAnswerLength.values()].reduce((a, b) => a + b);
		return total;
	}
	return 0;
};

const getCurrentLangChoices = () => languageChoices;

const getUsername = () => username;

export {
	setCurrentLangChoices,
	getCurrentLangChoices,
	setUsername,
	getUsername,
	setModuleScore,
	getModuleScore,
	getTotalLevelCorrectAnswers,
};