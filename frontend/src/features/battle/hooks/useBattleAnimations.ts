import type { AttackEvent, BattleEvent, FaintEvent, FinishBattleEvent, StrategicSwitch, SwitchEvent } from "../types/battle.types"
import { useBattleStore } from "@/features/battle/store/useBattleStore"
import { useRef } from "react"
import { HIT_EFFECTS } from "../const/hitEffects"
import { getColorByMoveType } from "../utils/getColorByMoveType"
import type { UseBattleAnimationsReturn } from "../types/battle.types"
import gsap from "gsap";
import { playSound } from "@/features/audio/utils/playSound"
import { useAudioStore } from "@/features/audio/store/useAudioStore"


export const useBattleAnimations  = () : UseBattleAnimationsReturn => {
    const playerRef = useRef(null)
    const playerCoverRef = useRef(null)
    
    const enemyRef = useRef(null)
    const enemyCoverRef = useRef(null)
    
    const processEvent = useBattleStore(s => s.processEvent)
    const stopAudio = useAudioStore(s => s.stopBgm)
    

    const play = async (e : BattleEvent) => {
        const animation = animationMap[e.type]

        if (!animation) return

        await animation(e as any)
    }
    

    const finishBattleAnimation = (event: FinishBattleEvent) => {
        return new Promise<void>((resolve) => {
            const tl = gsap.timeline({defaults: {ease: "power3.out"}, onComplete:() => {
                resolve()
                processEvent(event)
            }})

            stopAudio()

            const winner = event.playerWin ? playerRef.current : enemyRef.current

            tl.to(winner, {
                scale: 1.2,
                webkitFilter: `drop-shadow(0px 0px 20px #EFB810)`,
                filter: `drop-shadow(2px 2px 12px #EFB810)`,
                duration: 1.2,
                ease: "back.inOut"
            })
        })
    }

    const animateAttack  = async (event : AttackEvent) =>  {
        return new Promise<void>((resolve) => {

            const tl = gsap.timeline({ defaults: { ease: "power3.out" }, onComplete: () => {
                resolve()
                processEvent(event)
            } });

            const filterStyle = HIT_EFFECTS[event.hitResult] || HIT_EFFECTS.NORMAL
            const isCritical = event.hit && event.hitResult === "CRITICAL" || event.hitResult === "CRITICAL_LUCKY"

            const isPlayer = event.side === "PLAYER"
            const attacker = isPlayer ? playerRef.current : enemyRef.current
            const defender = isPlayer ? enemyRef.current : playerRef.current
            const x = isPlayer ? 160 : -160
            const y = isPlayer ? -60 : 60
            const scale = isPlayer ? 1.1 : 1
            const scaleAttack = isPlayer ? 0.9 : 1.1 

            const shadow  = getColorByMoveType(event.moveType)

            tl.to(attacker, {
                scale: scaleAttack,
                webkitFilter: `drop-shadow(0px 0px 20px ${shadow})`,
                filter: `drop-shadow(2px 2px 12px ${shadow})`,
                x: x,
                y: y,
                duration: 0.5
            })

            tl.to(attacker, {
                scale: scale,
                x: 0,
                y: 0,
                filter: "drop-shadow(0px 0px 0px rgba(0,0,0,0))",
                duration: 0.5
            })

            if (event.hit){
                tl.to(defender, {
                    x: isCritical ? 10 : 5,
                    duration: 0.05,
                    yoyo: true,
                    filter: filterStyle,
                    repeat: 9,
                    ease: "rough",
                })
                .call(() => {
                    playSound("hit")
                }, [], "<0.05")

                tl.to(defender, { filter: "none", opacity: 1 })
                
            }
        })
    }

    const animateSwitch = async (event : SwitchEvent) => {
        return new Promise<void>((resolve) => {
            const { element, cover } = getSideElements(event.side)
            
            const tl = gsap.timeline({ defaults: { ease: "power3.out" }, onComplete: () => resolve()});
            
            tl.to(cover, {
                x: 300,
                y: 100,
                scale: 0.1,
                opacity: 0,
                duration: 0.5,
                ease: "power1.in"
            })
            .to(cover, {
                x: 40,
                y: -15,
                scale: 0.3,
                opacity: 1,
                duration: 0.4,
                ease: "power1.out"
            })
            

            tl.to(cover, {
                x:0,
                y: 50,
                scale: 0.2,
                duration: 0.6,
                ease: "elastic.in"
            })
            tl.call(() => {
                playSound("pokemonOut")    
                processEvent(event)
            })

            tl.to(cover, {
                scale: 1,
                opacity: 0,
                duration: 0.4,
                ease: "back.in(2)"
            })
            

            tl.to(element, {
                scale: 1,
                opacity: 1,
                duration: 0.6
            })
        })
    }

    const strategicSwitch = async (event : StrategicSwitch) => {
        return new Promise<void>((resolve) => {
            const { element, cover } = getSideElements(event.side)
            
            const tl = gsap.timeline({ defaults: { ease: "power3.out" }, onComplete: () => resolve() });

            tl.to(cover, {
                scale: 1,
                opacity: 1,
                y: -4,
                duration: 0.2
            })
            
            tl.to(element, {
                scale: 0,
                opacity: 0,
                duration: 1,
            }, "<")

            tl.to(cover, {
                scale: 0.2,
                y: 50,
                duration: 0.3,
                ease: "back.in(2)"
            })

            tl.to(cover, {
                x: 50,
                y: -15,
                scale: 0.3,
                duration: 0.4,
                ease: "power1.out"
            })
            .to(cover, {
                y: 300,
                x: 300,
                scale: 0,
                opacity: 0,
                duration: 0.6,
                ease: "power1.in"
            })
            

            .to(cover, {
                x: 40,
                y: -15,
                scale: 0.3,
                opacity: 1,
                duration: 0.4,
                ease: "power1.out"
            })

            tl.to(cover, {
                x:0,
                y: 50,
                scale: 0.2,
                duration: 0.5,
                ease: "elastic.in"
            })
            
            tl.call(() => {
                playSound("pokemonOut")    
                processEvent(event)
            })

            tl.to(cover, {
                scale: 1,
                opacity: 0,
                duration: 0.4,
                ease: "back.in(2)"
            })

            

            tl.to(element, {
                scale: 1,
                opacity: 1,
                duration: 0.3
            })
        })
    }

    const animateFate = async (event: FaintEvent) => {
        return new Promise<void>((resolve) => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" }, onComplete: () => {
                resolve()
                processEvent(event)
            } });

            const {element, cover} = getSideElements(event.side)

            tl.call(() => {
                playSound("faint")
            })
        
            tl.to(cover, {
                scale: 1,
                opacity: 1,
                duration: 0.3
            })
            
            tl.to(element, {
                scale: 0,
                opacity: 0,
                duration: 0.2,
            }, "<")

            tl.to(cover, {
                scale: 0.2,
                y: 50,
                duration: 0.4,
                ease: "back.in(2)"
            })

            tl.to(cover, {
                x: 50,
                y: -15,
                scale: 0.3,
                duration: 0.4,
                ease: "power1.out"
            })
            .to(cover, {
                y: 300,
                x: 300,
                scale: 0,
                opacity: 0,
                duration: 0.6,
                ease: "power1.in"
            })
        })
    }

    const animationMap = {
        ATTACK: animateAttack,
        FAINT: animateFate,
        SWITCH: animateSwitch,
        STRATEGIC_SWITCH: strategicSwitch,
        FINISH_BATTLE: finishBattleAnimation
    }

    const getSideElements = (side: "PLAYER" | "ENEMY") => ({
        element: side === "PLAYER" ? playerRef.current : enemyRef.current,
        cover: side === "PLAYER" ? playerCoverRef.current : enemyCoverRef.current
    })

    return {
        playerRef,
        playerCoverRef,
        enemyRef,
        enemyCoverRef,
        play
    }

}