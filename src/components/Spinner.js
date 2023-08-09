import React from 'react'
import '../styles/Spinner.scss'

function Spinner() {
    return (
        <div className="load-anim" id="outer">
            <div className="load-anim" id="middle">
                <div className="load-anim" id="inner"></div>
            </div>
        </div>
    )
}

export default Spinner
