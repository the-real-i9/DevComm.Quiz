import React from 'react'
import QuizEngine from '../utils/quizEngine';

function ModuleCard({ setLocation, setModule, language, level, moduleKey }) {
    const moduleNumber = moduleKey.slice(moduleKey.indexOf(' ') + 1);
    const moduleScore = QuizEngine.getModuleScore({ language, level, module: moduleKey })
    const handleQuizStartBtnClick = () => {
        setModule(moduleKey)
        setLocation('quiz')
    }
    return (
        <div className="module-box" id={`module-${moduleNumber}-box`}>
            <p className='module-num'>{moduleKey}</p>
            <p className={`module-score score-${moduleScore}`} id={`module-${moduleNumber}-score`}>Score: {moduleScore}%</p>
            <button onClick={handleQuizStartBtnClick} className='start-quiz-btn' id={`module-${moduleNumber}-start`}>Start</button>
        </div>
    )
}

export default ModuleCard
