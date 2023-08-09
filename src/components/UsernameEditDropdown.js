import React, { useState } from 'react'

function UsernameEditDropdown({ usernameEditDropdownVisible, setUsernameEditDropdownVisible, setUsername, username }) {
    const [nameInputValue, setNameInputValue] = useState(username)

    const handleInputChange = (ev) => {
        setNameInputValue(ev.currentTarget.value)
    }
    const handleOKBtnClick = (ev) => {
        setUsername(nameInputValue)
        setUsernameEditDropdownVisible(false)
    }
    return (
        <div id="username-edit-dropdown" className={usernameEditDropdownVisible ? 'visible' : 'hidden'}>
            <p>Name</p>
            <input type="text" id="name-input" value={nameInputValue} onChange={handleInputChange} />
            <button id='set-name' onClick={handleOKBtnClick}>OK</button>
            {usernameEditDropdownVisible ? <div onClick={() => setUsernameEditDropdownVisible(false)}></div> : ''}
        </div>
    )
}

export default UsernameEditDropdown
