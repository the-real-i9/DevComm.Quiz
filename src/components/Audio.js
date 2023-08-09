import React from 'react'
import AudioFile from '../utils/cool_music.mp3'

function Audio() {
    return (
        <audio src={AudioFile} id="music" loop></audio>
    )
}

export default Audio
