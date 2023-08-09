import React from 'react'
import { FaCheck } from 'react-icons/fa'

function Option({ questionNumber, optionNumber, optionValue, checkedOptions, setCheckedOptions }) {
    const checkedOption = checkedOptions[`question-${questionNumber}`];
    const handleOptionClick = () => {
        setCheckedOptions((prevCheckedOptions) => {
            const newCheckedOptions = {...prevCheckedOptions}
            const optionChecked = newCheckedOptions[`question-${questionNumber}`]
            if (Array.isArray(optionChecked)) {
                if (optionChecked.includes(optionValue)) newCheckedOptions[`question-${questionNumber}`].splice(optionChecked.indexOf(optionValue), 1)
                else newCheckedOptions[`question-${questionNumber}`].push(optionValue)
            } else {
                newCheckedOptions[`question-${questionNumber}`] = optionValue
            }

            return newCheckedOptions            
        })
    }

    return (
        <div onClick={handleOptionClick} className={`option question-${questionNumber}-option`} id={`question-${questionNumber}-option-${optionNumber}`}>
            <p className='option-text' id={`option-${optionNumber}-text`}>{optionValue}</p>
            <div className={`option-check-circle ${Array.isArray(checkedOption) ? (checkedOption.includes(optionValue) ? 'checked' : '') : (checkedOption === optionValue ? 'checked' : '')}`} id={`option-check-circle-opt${optionNumber}`}>
                <i><FaCheck /></i>
            </div>
        </div>
    )
}

export default Option
