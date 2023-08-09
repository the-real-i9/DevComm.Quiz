import { useEffect, useState } from 'react'

function Timer({ staticTime }) {
    const [time, setTime] = useState('0m 0s')
    useEffect(() => {
        const timeTick = setInterval(() => {
            const newTime = new Date(new Date() - staticTime).toLocaleTimeString([], { minute:'numeric', second:'numeric' })
            const [min, sec] = newTime.split(':')
            setTime(`${parseInt(min)}m ${parseInt(sec)}s`)
        }, 1000)
        return () => {
            clearInterval(timeTick)
        }
    }, [staticTime])
    return time
}

export default Timer
