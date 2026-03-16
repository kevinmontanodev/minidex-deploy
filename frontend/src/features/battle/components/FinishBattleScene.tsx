import { useBattleStore } from "../store/useBattleStore"
import { navigate } from "astro:transitions/client"
import { Button } from "@/components/ui/Button"
import { getLevelProgress } from "../utils/getLevelProgress"
import { useFinishBattleAnimation } from "../hooks/useFinishBattleAnimation"
import type { FinisBattleData } from "../types/battle.types"
import { useAudioStore } from "@/features/audio/store/useAudioStore"

export function FinishBattleScene({ rewards }: { rewards: FinisBattleData }) {
    
    const {containerRef, xpBarRef, coinsRef, messageRef, displayCoins, displayXp, showButton} = useFinishBattleAnimation(rewards)
    const stopAudio = useAudioStore(s => s.stopBgm)

    const isWin = rewards.playerWin
    const message = isWin ? 'You Win' : 'Enemy Win'
    const sticker = isWin ? '/victory.webp' : '/defeat.webp'
    const bg = isWin ? '/victory-bg.webp' : '/defeat-bg.webp'

    const clearBattle = useBattleStore(s => s.clearBattle)

    const handleResetBattle = async () => {
        clearBattle()
        stopAudio()
        await navigate("/trainers/pokedex")
    }

    const percent = getLevelProgress(displayXp)

    return (
        <section className="fixed inset-0 bg-black flex items-center justify-center z-100 appear" 
        style={{backgroundImage: `url(${bg})`}} ref={containerRef}>
            <div className="flex flex-col items-center gap-1 h-44 w-72 relative p-2 rounded-sm display-container">
                <img src={sticker} alt="" className="absolute -top-20 result-img opacity-0" />

                <p ref={messageRef} className="text-white text-4xl font-bold opacity-0">
                    {message}
                </p>
                <p className="text-yellow-400 text-2xl shiny coins-display opacity-0">
                    + <span ref={coinsRef}>{displayCoins}</span> Coins
                </p>
                <div className="w-full bg-white/20 h-3 rounded xp-bar opacity-0 relative">
                    <div
                        ref={xpBarRef}
                        className="h-3 bg-green-400 rounded"
                        style={{ width: `${Math.min(percent, 100)}%` }}
                    />
                </div>

                <p className="text-green-400 xp-display opacity-0">
                    XP: {displayXp}
                </p>

                {rewards.levelUp && (
                        <p className="text-blue-400 font-bold absolute top-40 scale-0 opacity-0 levelUp-display">
                            Level Up! Lv. {rewards.level}
                        </p>
                )}
                
                {showButton && (
                    <Button
                        onClick={handleResetBattle}
                        customStyle="bg-white/20 text-white"
                    >
                        Accept
                    </Button>
                )}
            </div>
        </section>
    )
}