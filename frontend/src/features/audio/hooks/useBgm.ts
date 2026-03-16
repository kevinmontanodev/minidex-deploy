import { useEffect } from "react";
import { useAudioStore } from "../store/useAudioStore";

export function useBgm(track: "menu" | "login" | "battle"){
    const playBgm = useAudioStore(s => s.playBgm)

    useEffect(() => {
        const startAudio = () => {
            playBgm(track)
            window.removeEventListener("click", startAudio)
        }

        window.addEventListener("click", startAudio)
    }, [track])
}