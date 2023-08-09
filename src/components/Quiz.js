import React, { useEffect, useRef, useState } from 'react'
import ReactHtmlParser from 'react-html-parser';
import { FaClock, FaGithub, FaTwitter } from 'react-icons/fa'
import { formatLangText, markdownFormat, unpackLink } from '../utils/quick-funcs'
import QuizEngine from '../utils/quizEngine'
import Timer from './Timer'
import hljs from 'highlight.js';
import 'highlight.js/scss/gradient-light.scss';
import Option from './Option';


function Quiz({ setLocation, setSolutionsData, language, level, module: moduleKey }) {
    const moduleNumber = moduleKey.slice(moduleKey.indexOf(' ') + 1)
    const totalQuestion = QuizEngine.getLevelModuleTotalQuestions({ language, level, module: moduleKey })
    const questions = QuizEngine.getLevelModuleQuestions({ language, level, module: moduleKey });

    const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0)
    const [questionsAnsweredCount, setQuestionsAnsweredCount] = useState(0)
    const [checkedOptions, setCheckedOptions] = 
    useState(questions.reduce((checkedOptions, { questionType }, questionIndex) => {
        const questionNumber = questionIndex + 1;
        checkedOptions[`question-${questionNumber}`] = questionType === 'multiple-answers' ? [] : ''
        return checkedOptions
    }, {}))

    const [staticTime] = useState(new Date())
    const qsRef = useRef(null)
    const pbRef = useRef(null)
    const timeSpent = useRef(null)

    useEffect(() => {
        pbRef.current.style.setProperty('--progress', `${100 - (questionsAnsweredCount / totalQuestion * 100)}%`)
    }, [questionsAnsweredCount, totalQuestion])

    useEffect(() => {
        setQuestionsAnsweredCount(Object.values(checkedOptions).filter((value) => value.length).length)
    }, [checkedOptions])

    useEffect(() => {
        for (const codeBlock of document.querySelectorAll('code')) {
            hljs.highlightElement(codeBlock)
        }
    }, [])

    useEffect(() => {
        qsRef.current.style.setProperty('--slide', `-${currentQuestionNumber}00%`)
    }, [currentQuestionNumber])

    const handlePrevBtnClick = () => {
        if (currentQuestionNumber < 1) return
        setCurrentQuestionNumber((prevNum) => prevNum - 1)
    }

    const handleNextBtnClick = () => {
        if (currentQuestionNumber === totalQuestion - 1) return
        setCurrentQuestionNumber((prevNum) => prevNum + 1)
    }

    const handleSubmitBtnClick = () => {
        const tsp = timeSpent.current.textContent;
        setSolutionsData({ checkedOptions, timeSpent:tsp, moduleNumber, totalQuestion, questions })
        setLocation('solutions')
    }

    return (
        <div className="quiz-question-page" id={`lang-${language}-${level}-module-${moduleNumber}`}>
            <i id='big-lang-icon' className={`devicon-${language}-plain`}></i>
            <div className="top">
                <div className='back-page-btn' id="back-to-modules" onClick={() => setLocation('modules')}>Back</div>
                <div className="center-text">
                    <p id='level'>{formatLangText(level)}</p>
                    <p id='module'>Module {moduleNumber}</p>
                </div>
                <div></div>
            </div>
            <div className="question-top">
                <div className="progress">
                    <div className="progress-bar" ref={pbRef}>
                        <div className="progress-tracker-bar"></div>
                    </div>
                    <div className="progress-details">
                        <div className="question-number-traker"><span>{currentQuestionNumber + 1}</span><span>|</span><span id="tqs">{totalQuestion}</span></div>
                        <div className="answered-questions-tracker">
                            <span id='ans-count' className='count'>{questionsAnsweredCount}</span>
                            <span>answered </span>
                            <span id="rem-count" className='count'>{totalQuestion - questionsAnsweredCount}</span>
                            <span>left</span>
                        </div>
                    </div>
                </div>
                <div className="timer">
                    <i><FaClock /></i>
                    <p id="time-elapsed" ref={timeSpent}><Timer staticTime={staticTime} /></p>
                </div>
            </div>
            <div className='question-section-container'>
                <div className="question-section" ref={qsRef}>
                    {questions.map(({ questionStatement, questionType, code, options }, questionIndex) => {
                    const questionNumber = questionIndex + 1
                    return <div className='question-components-container' id={`question-${questionNumber}-components-container`} key={questionNumber}>
                        <p className={`question-statement-${code ? 'with-code' : 'without-code'}`}>{ReactHtmlParser(markdownFormat(questionStatement, language))}</p>
                        <div className={`code-block-container ${code ? '' : 'hide'}`}>
                            <pre><code id={`question-${questionNumber}-code-block`} className={`${language} question-code-block`}>{code}</code></pre>
                        </div>
                        <p className='what-to-do'>{questionType === 'single-answer' ? 'Choose the correct answer' : 'Choose all correct answers'}</p>
                        <div className="options-container" id={`question-${questionNumber}-options-container`} data-question-type={questionType}>
                        {options.map((option, optionIndex) => {
                            const optionNumber = optionIndex + 1
                            return <Option key={`${questionNumber}-${optionNumber}`} questionNumber={questionNumber} optionNumber={optionNumber} optionValue={option} checkedOptions={checkedOptions} setCheckedOptions={setCheckedOptions} />
                        })}
                        </div>
                    </div>
                    })}
                </div>
            </div>
            <div className="nav-btns">
                <button id="prevq-btn" onClick={handlePrevBtnClick}>PREV</button>
                <button id="nextq-btn" onClick={handleNextBtnClick}>NEXT</button>
            </div>
            <div className="bottom">
                {unpackLink(questions[currentQuestionNumber].githubHandle).valid ?
                <a id="github-handle" href={unpackLink(questions[currentQuestionNumber].githubHandle).linkAddress} target='_blank' rel='noopener noreferrer'>
                    <i><FaGithub /></i>
                    <span>{unpackLink(questions[currentQuestionNumber].githubHandle).linkName}</span>
                </a> : <span></span> }

                <button id="submit-button" onClick={handleSubmitBtnClick}>Submit</button>

                {unpackLink(questions[currentQuestionNumber].twitterHandle).valid ?
                <a id="twitter-handle" href={unpackLink(questions[currentQuestionNumber].twitterHandle).linkAddress} target='_blank' rel='noopener noreferrer'>
                    <i><FaTwitter /></i>
                    <span>{unpackLink(questions[currentQuestionNumber].twitterHandle).linkName}</span>
                </a> : <span></span>}
            </div>
        </div>
    )
}

export default Quiz
