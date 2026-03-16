import { useEffect, useRef, useState } from "react";
import { BattleTextBox } from "./BattleTextBox";
import {motion} from "framer-motion"
import { useBattleStore } from "@/features/battle/store/useBattleStore";
import type { BattleEvent } from "../types/battle.types";
import { generateMessage } from "@/features/battle/utils/generateMessage";
import { useBattleAnimations } from "@/features/battle/hooks/useBattleAnimations";

export function BattleCampScene({events}: {events : BattleEvent[] | null}){
    const {playerPokemon, enemyPokemon, setCurrentMessage } = useBattleStore(state => state)
    const {playerRef, playerCoverRef, enemyRef, enemyCoverRef, play} = useBattleAnimations()
    const playingRef = useRef(false)
    const containerRef = useRef(null)
    const [showEvents, setShowEvents] = useState(false)


    useEffect(() => {
        if (!events || playingRef.current) return

        playingRef.current = true

        setShowEvents(true)

        playEvents(events).finally(() => {
            playingRef.current = false
        })

    }, [events])


    const playEvents = async (events: BattleEvent[]) => {

        for (const e of events){
            const message = generateMessage(e)

            setCurrentMessage(message)

            await play(e)
        }

        setShowEvents(false)
    }
    

    return (
        <section className="w-2xl bg-black/40 backdrop-blur-xs h-92 scene relative" ref={containerRef}>
            <div className="absolute top-4 right-10 z-10">
                <picture className="flex w-32 h-32 justify-center items-center" >
                    <div className="absolute bg-amber-50 w-32 h-32 rounded-full normal scale-0 opacity-0 z-40 left-1/2 top-1/2 -translate-1/2" ref={enemyCoverRef}></div>
                    <motion.img
                    className="enemy-pokemon relative"
                    ref={enemyRef}
                    src={enemyPokemon?.sprites.smallFront}
                    />
                </picture>
            </div>

            <div className="battlefield bg-zinc-900 border-4 boder-animate">
                <div className="absolute top-1/2 right-1/2 translate-1/2 border-4 w-full rotate-2 bg-amber-50 boder-animate"></div>
                <div className="circle w-28 h-28 border-4 border-amber-50 rounded-full absolute right-40 top-164 -translate-1/2 flex justify-center items-center rotate-5 boder-animate">
                    <div className="border-[16px] bg-amber-50 rounded-[20px] boder-animate"></div>
                </div>
            </div>
            {showEvents && <BattleTextBox />}

            <div className="absolute bottom-2 left-10">
                <picture className="flex w-32 h-32 justify-center items-center scale-110 relative">
                    <div className="absolute bg-amber-50 w-36 h-36 rounded-full normal scale-0 opacity-0 z-40 left-1/2 top-1/2 -translate-1/2" ref={playerCoverRef}></div>
                    <motion.img
                    className="player-pokemon"
                    ref={playerRef}
                    src={playerPokemon?.sprites.smallBack}
                    />
                </picture>
            </div>

        </section>
    )
}



// minidex_user
// tFC440FGi91S7OOI