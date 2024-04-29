import { useEffect, useRef } from "react"
import music from "../../../../assets/music.mp3"

export default function Music({play}) {

    const ref = useRef(new Audio(music))

    useEffect(() => {
        ref.current.volume = 0.1;
    })

    useEffect(() => {
        if (ref.current == null) return;
        if (play && ref.current.paused) {
            ref.current.play()
        } else {
            ref.current.pause()
            ref.current.currentTime = 0;
        }
    }, [play])

    return (
        <></>
    )
}