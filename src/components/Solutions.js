import React, { useEffect, useState } from 'react'
import ReactHtmlParser from 'react-html-parser';
import { FaCheck, FaTimes, FaTwitter } from 'react-icons/fa'
import { formatLangText, markdownFormat, unpackLink } from '../utils/quick-funcs'
import QuizEngine from '../utils/quizEngine'
import getRandomQuote from '../utils/quotes'
import hljs from 'highlight.js'

function Solutions({ setLocation, language, level, module, solutionsData: { checkedOptions, timeSpent, moduleNumber, totalQuestion, questions } }) {
    const { skipped, correct, incorrect } = Object.values(checkedOptions)
    .reduce((remark, answer, index) => {
        if (!answer.length) remark.skipped++
        else if (answer.toString() === questions[index].correctAnswer.toString()) remark.correct++
        else remark.incorrect++
        return remark
    }, { skipped: 0, correct: 0, incorrect: 0 })
    QuizEngine.setModuleScore({ language, level, module, score: Math.round(correct / totalQuestion * 100) })

    const { quote, quoteAuthorFirstName, quoteAuthorLastName, quoteAuthorTwitterAddress, quoteAuthorTwitterUsername } = getRandomQuote()

    const [viewMode, setViewMode] = useState('all')

    useEffect(() => {
        for (const codeBlock of document.querySelectorAll('code')) {
            hljs.highlightElement(codeBlock)
        }
    }, [viewMode])
    
    // solutionBoxes
    const solutionBoxes = Object.values(checkedOptions).map((userAnswer, index) => {
        const questionNumber = index + 1;
        const { explanation, correctAnswer: authorAnswer, reference, code, questionStatement } = questions[index];
        const answerStatus = !userAnswer.length ? 'skipped' : userAnswer.toString() === authorAnswer.toString() ? 'correct' : 'incorrect'

        return (answerStatus !== viewMode && viewMode !== 'all') ? ''
        : <div className="solution-box" id={`solution-box-q${questionNumber}`} key={questionNumber}>
            <p className={`question-statement-${code ? 'with-code' : 'without-code'}`}><b>Q{questionNumber}: </b>{ReactHtmlParser(markdownFormat(questionStatement, language))}</p>
            <div className={`code-block ${code ? '' : 'hide'}`}>
                <pre><code className={language}>{code}</code></pre>
            </div>
            <p className='user-answer'><b>Answer:</b>&nbsp;<span>{userAnswer.length ? userAnswer.toString().split(',').join(' | ') : <em>(skipped)</em>}</span>&nbsp;{answerStatus !== 'skipped' ? answerStatus === 'incorrect' ? <i className='incorrect-mark'><FaTimes /></i> : <i className='correct-mark'><FaCheck /></i> : <i></i>}</p>
            <p className='correct-answer'><b>Correct Answer:</b>&nbsp;<span>{authorAnswer.toString().split(',').join(' | ')}</span></p>
            <div className='explanation'><b><em>Explanation</em>:</b> {ReactHtmlParser(markdownFormat(explanation, language))}</div>
            {unpackLink(reference).valid ? unpackLink(reference).linkAddress
            ? <p className='links'><em>See:</em> <a href={unpackLink(reference).linkAddress} target="_blank" rel='noreferrer noopener'>{unpackLink(reference).linkName}</a></p>
            : <p className='links'><em>See:</em> {unpackLink(reference).linkName}</p> : ''}
        </div>
    })

    return (
        <div className="quiz-solution-page" id={`lang-${language}-${level}-module-${moduleNumber}-solution`}>
            <div className="top">
                <div className='back-page-btn' id="back-to-modules" onClick={() => setLocation('modules')}>Back</div>
                <div className="center-text">
                    <p id='lang-solution-title'>Solution <span>{formatLangText(language)}</span></p>
                    <p id='level-module'>{formatLangText(level === 'intermediate' ? 'intermed' : level)}: Module {moduleNumber}</p>
                </div>
                <div></div>
            </div>
            <div className="solution-section">
                <div className="filter-div">
                    <div className="filter-options">
                        <span id='all' className={viewMode === 'all' ? 'selected' : ''} onClick={() => setViewMode('all')}>All</span>
                        <span id='correct' className={viewMode === 'correct' ? 'selected' : ''} onClick={() => setViewMode('correct')}>Correct</span>
                        <span id='incorrect' className={viewMode === 'incorrect' ? 'selected' : ''} onClick={() => setViewMode('incorrect')}>Incorrect</span>
                        <span id='skipped' className={viewMode === 'skipped' ? 'selected' : ''} onClick={() => setViewMode('skipped')}>Skipped</span>
                    </div>
                </div>
                <div className="overview">
                    <p>Overview</p>
                    <div className="overview-box">
                        <div>
                            <p>Total Question</p>
                            <p id="total-ques">{totalQuestion}</p>
                        </div>
                        <div>
                            <p>Time Spent</p>
                            <p id="time-spent">{timeSpent}</p>
                        </div>
                        <div>
                            <p>Correct</p>
                            <p id="correct-count">{correct}</p>
                        </div>
                        <div>
                            <p>Incorrect</p>
                            <p id="incorrect-count">{incorrect}</p>
                        </div>
                        <div>
                            <p>Skipped</p>
                            <p id="skipped-count">{skipped}</p>
                        </div>
                    </div>
                </div>
                <div className="answer-solutions">
                    {solutionBoxes.every((value) => !value) ? <p className="notification">No {viewMode} answers</p> : solutionBoxes}
                </div>
                <div className="quote-section">
                    <p>Quote for you</p>
                    <div className="quote-block">
                        <p className='quote'>{quote}</p>
                        <div className="owner-info">
                            <i><FaTwitter /></i>
                            <div className='info'>
                                <p className='name'>- <span>{quoteAuthorFirstName}</span> <span>{quoteAuthorLastName}</span></p>
                                <a className="twitter-handle" href={quoteAuthorTwitterAddress}>@{quoteAuthorTwitterUsername}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Solutions
