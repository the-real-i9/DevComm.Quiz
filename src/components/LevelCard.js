import React, { useEffect } from 'react'
import { formatLangText } from '../utils/quick-funcs'
import QuizEngine from '../utils/quizEngine'

function LevelCard({ language, level, setLocation, setSelectedLevel }) {
    const completion = QuizEngine.getLevelCompletion(language, level)
    const totalQuestionsInLevel = QuizEngine.getTotalQuestionsInLevel(language, level)

    useEffect(() => {
        document.querySelector('.levels-section').style.setProperty(`--${level}Comp`, `${completion}`)
    }, [level, completion])

    const handleCardClick = () => {
        if (!totalQuestionsInLevel) return;
        setSelectedLevel(level)
        setLocation('modules')
    }

    return (
        <div className="level-box" id={`${level}-level-${language}`} onClick={handleCardClick}>
            <div className='comp-div' id={`comp-div-${level}`}>
                <div id={`${level}-level-${language}-completion`}>{completion}%</div>
                <svg>
                    <circle cx='30' cy='30' r='25'></circle>
                    <circle cx='30' cy='30' r='25'></circle>
                </svg>
            </div>
            <div className="level-bottom-text">
                <p>{formatLangText(level)}</p>
                <p id='total-questions-count'>{totalQuestionsInLevel === 0 ? 'coming soon' : `${totalQuestionsInLevel.toLocaleString()} question${totalQuestionsInLevel > 1 ? 's' : ''}`}</p>
            </div>
        </div>
    )
}

export default LevelCard
