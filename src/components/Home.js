import React, { useEffect, useState } from 'react'
import { FaPaintBrush } from 'react-icons/fa'
import { formatLangText } from '../utils/quick-funcs'
import QuizLanguagesPanel from './QuizLanguagesPanel'
import UsernameEditDropdown from './UsernameEditDropdown'


function Home({ setSelectedQuiz, setLocation }) {
    const [username, setUsername] = useState(localStorage.getItem?.('username') || 'Dev')
    const [userQuizLanguageChoices, setUserQuizLanguageChoices] = useState(JSON.parse(localStorage.getItem?.('userQuizLanguageChoices')) || [])

    const [panelVisible, setPanelVisible] = useState(false)
    const [usernameEditDropdownVisible, setUsernameEditDropdownVisible] = useState(false)

    useEffect(() => {
        if (userQuizLanguageChoices.length) localStorage.setItem('userQuizLanguageChoices', JSON.stringify(userQuizLanguageChoices))
        localStorage.setItem('username', username)
    }, [userQuizLanguageChoices, username])

    const handleAddLanguageBtnClick = () => {
        setPanelVisible(true)
    }

    const handleBrushBtnClick = () => {
        setUsernameEditDropdownVisible(true)
    }

    const handleQuizBoxClick = (ev) => {
        const language = ev.currentTarget.id.slice(ev.currentTarget.id.lastIndexOf('-') + 1)
        setSelectedQuiz(language)
        setLocation('levels')
    }

    return (
        <div className="home">
            {/* LanguagesPanel */} 
            {panelVisible ? <QuizLanguagesPanel userQuizLanguageChoices={userQuizLanguageChoices} setPanelVisible={setPanelVisible} setUserQuizLanguageChoices={setUserQuizLanguageChoices} /> : ''}
            {/* Name Edit Modal */}        
            <UsernameEditDropdown usernameEditDropdownVisible={usernameEditDropdownVisible} setUsernameEditDropdownVisible={setUsernameEditDropdownVisible} setUsername={setUsername} username={username}/>

            <p id='greet'><span id="greeting">Hi,<span id='handwave'>&#x1f44b;</span></span><br/><span id="dev-name">{username}</span><i id='edit-nickname' onClick={handleBrushBtnClick}><FaPaintBrush /></i></p>
            <p>Choose a Language</p>
            <div className='langs-section'>
                {userQuizLanguageChoices.map((language) =>(
                    <div className="lang-box" key={language} id={`lang-box-${language}`} onClick={handleQuizBoxClick}>
                        <i className={`devicon-${language}-plain`}></i>
                        <p>{formatLangText(language)}</p>
                    </div>
                ))}
                <div title="Add New Language" className="lang-box add-lang-btn" id='add-lang-btn' onClick={handleAddLanguageBtnClick}>
                    <span>+</span>
                    <p>Add Language</p>
                </div>
            </div>
        </div>
    )
}

export default Home
