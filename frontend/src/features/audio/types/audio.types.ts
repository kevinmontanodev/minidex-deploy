
// store
export type BgmTrack = "menu" | "battle" | "login"

export interface AudioState {
    currentTrack: BgmTrack | null
    audio: HTMLAudioElement | null

    playBgm: (track: BgmTrack) => void
    stopBgm: () => void
}
