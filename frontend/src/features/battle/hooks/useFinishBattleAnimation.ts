import type { FinisBattleData } from "../types/battle.types"
import { useMiniDexStore } from "@/stores/useMiniDexStore"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef, useState } from "react"
import type { UseFinishBattleAnimationReturn } from "../types/battle.types"
import { playSound } from "@/features/audio/utils/playSound"

export function useFinishBattleAnimation(rewards: FinisBattleData):UseFinishBattleAnimationReturn {
    const trainer = useMiniDexStore(s => s.trainer)
    const updaeTrainer = useMiniDexStore(s => s.setTrainer)

    const containerRef = useRef<HTMLDivElement | null>(null)
    
    const messageRef = useRef<HTMLParagraphElement | null>(null)
    const xpBarRef = useRef<HTMLDivElement | null>(null)
    const coinsRef = useRef<HTMLSpanElement | null>(null)

    const [displayCoins, setDisplayCoins] = useState(0)
    const [displayXp, setDisplayXp] = useState(0)
    const [showButton, setShowButton] = useState(false)

    const isWin = rewards.playerWin

    
    useGSAP(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                const wins = (trainer?.wins || 0) + (isWin ? 1 : 0)
                const loses = (trainer?.loses || 0) + (!isWin ? 1 : 0)
                
                updaeTrainer({
                    ...trainer,
                    xp: rewards.newXp,
                    level: rewards.level,
                    coins: (trainer?.coins || 0) + rewards.coins,
                    wins: wins,
                    loses: loses
                })
                
                setShowButton(true)
            }
        })

        tl.call(() => {
            isWin ? playSound("victory") : playSound("defeat")
        })

        tl.fromTo('.result-img', 
            {opacity: 0, scale: 0.5},
            {opacity: 1, scale: 1, duration: 1.3, ease: "bounce"}
        )

        tl.to('.result-img', {
            opacity: 0,
            scale: 0.6,
            duration: 0.8,
            ease: "power1.out"
        })

        tl.to('.display-container', {
            background: '#1114',
            backdropFilter: 'blur(5px)',
            duration: 0.8,
            ease: "power1.inOut"
        })

        tl.fromTo(messageRef.current,
            {opacity: 0, scale: 0.6, y:-30},
            {opacity: 1, scale:1, y: 0, duration: 0.8, ease: "back.out(1.7)"}
        )

        const coinCounter = {value: 0}

        tl.to('.coins-display', {
            opacity: 1,
            duration: 0.6
        })

        tl.to(coinCounter, {
            value: rewards.coins,
            duration: 1.8,
            ease: "power2.out",
            onUpdate: () => {
                setDisplayCoins(Math.floor(coinCounter.value))
            }
        }, "-=0.3")

        tl.to('.xp-bar, .xp-display', {
            opacity: 1,
            duration: 0.6,
            ease: "power2.in"
        })

        const xpCounter = {value: rewards.previousXp}


        tl.to(xpCounter, {
            value: rewards.newXp,
            duration: 1.5,
            ease: "power2.out",
            onUpdate: () => {
                setDisplayXp(Math.floor(xpCounter.value))
            }
        })

        // Level Up
        if (rewards.levelUp) {
            tl.to('.levelUp-display', {
                opacity: 1,
                scale: 2,
                duration: 1.1,
                top: -40,
                ease: "power2.inOut"
            })

            playSound("levelUp")

            tl.to('.levelUp-display', {
                scale: 2.2,
                duration: 0.3,
                yoyo: true,
                repeat: 3,
                ease: "power1.inOut"
            })

            tl.to('.levelUp-display', {
                scale:0,
                opacity: 0,
                duration: 0.4,
                ease: "power1.out"
            })
            
        }

    }, {scope: containerRef})

    return {
        containerRef,
        xpBarRef,
        coinsRef,
        messageRef,
        displayCoins,
        displayXp,
        showButton
    }
}