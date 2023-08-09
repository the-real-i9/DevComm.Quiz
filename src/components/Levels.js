import React from 'react'
import { formatLangText } from '../utils/quick-funcs'
import LevelCard from './LevelCard';

function Levels({ setLocation, setSelectedLevel, language }) {
    const levels = ['beginner', 'intermediate', 'advance'];
    return (
        <div className="quiz-levels-page" id={`lang-${language}`}>
            <div className="top">
                <div className='back-page-btn' id="back-to-home" onClick={() => setLocation('home')}>Back</div>
                <div className="center-text">
                    <p id='quiz-title'>{formatLangText(language)} Quiz</p>
                    <p>Select Level</p>
                </div>
                <div></div>
            </div>
            <div className="levels-section">
                {levels.map((level) => <LevelCard language={language} level={level} key={level} setLocation={setLocation} setSelectedLevel={setSelectedLevel} />)}
            </div>
        </div>
    )
}

export default Levels
