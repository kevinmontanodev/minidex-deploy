import { create } from "zustand"
import type { AudioState } from "../types/audio.types"

export const useAudioStore = create<AudioState>((set, get) => ({
    currentTrack: null,
    audio: null,

    playBgm: (track) => {
        const { audio, currentTrack } = get()

        if (currentTrack === track) return

        audio?.pause()

        const newAudio = new Audio(`/audio/bgm/${track}.mp3`)
        newAudio.loop = true
        newAudio.volume = 0.4
        newAudio.play()

        set({
            currentTrack: track,
            audio: newAudio
        })
    },

    stopBgm: () => {
        const { audio } = get()
        audio?.pause()

        set({
            audio: null,
            currentTrack: null
        })
    }
}))