import React, { useState } from 'react'
import { formatLangText } from '../utils/quick-funcs'
import QuizEngine from '../utils/quizEngine'
import ModuleCard from './ModuleCard';

function Modules({ setLocation, setModule, language, level }) {
    const [reset, setReset] = useState(false)
     
    const handleResetBtnClick = () => {
        if (!reset) QuizEngine.resetLevel(language, level)
        setReset(true)
    }

    return (
        <div className='quiz-modules-page' id={`lang-${language}-${level}`}>
            <div className="top">
                <div className='back-page-btn' id="back-to-levels" onClick={() => setLocation('levels')}>Back</div>
                <div className="center-text">
                    <p id='quiz-title'>{formatLangText(language)} Quiz</p>
                    <p id='level'>{formatLangText(level)}</p>
                </div>
                <div></div>
            </div>
            <button id="reset-level-progress" onClick={handleResetBtnClick}>RESET MY PROGRESS</button>
            <div className="modules-section">
                {QuizEngine.getLevelModuleKeys(language, level)
                .map((moduleKey) => <ModuleCard language={language} level={level} moduleKey={moduleKey} setLocation={setLocation} setModule={setModule} key={moduleKey} />)}
                <div className='module-box'></div>
            </div>
        </div>
    )
}

export default Modules
