import React from 'react'
import { formatLangText } from '../utils/quick-funcs';
import QuizEngine from '../utils/quizEngine'

function QuizLanguagesPanel({ userQuizLanguageChoices, setPanelVisible, setUserQuizLanguageChoices }) {
    const allQuizLanguages = QuizEngine.getAllQuizLanguages();

    const handleLanguageChoicePillClick = (ev) => {
        ev.currentTarget.classList.toggle('lang-chosen');
    }
    const handleSaveBtnClick = () => {
        const updatedUserQuizLanguageChoices = [...document.querySelectorAll('span.lang-chosen')].map((elem) => elem.id.slice(elem.id.lastIndexOf('-') + 1))
        setUserQuizLanguageChoices(updatedUserQuizLanguageChoices)
        setPanelVisible(false)
    }
    return (
        <div className="quiz-languages-panel">
            <p>Select Language(s)</p>
            <div className="all-quiz-languages">
                {allQuizLanguages.map((language) => <span onClick={handleLanguageChoicePillClick} key={language} id={`lang-pill-${language}`} className={userQuizLanguageChoices.includes(language) ? 'lang-chosen' : ''}>{formatLangText(language)}</span>)}
            </div>
            <button className="langs-chosen-save" onClick={handleSaveBtnClick}>Save</button>
        </div>
    )
}

export default QuizLanguagesPanel
