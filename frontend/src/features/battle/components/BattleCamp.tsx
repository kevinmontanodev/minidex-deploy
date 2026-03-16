import { useBattleStore } from "@/features/battle/store/useBattleStore";
import { BattleCampScene } from "./BattleCampScene";
import { CurrentBattlePokemonCard } from "./CurrentBattlePokemonCard";
import { useBattleActions } from "@/features/battle/hooks/useBattleActions";
import { useEffect } from "react";
import { useBattleUIStore } from "@/features/battle/store/useBattleUIStore";
import { navigate } from "astro:transitions/client";
import { FinishBattleScene } from "./FinishBattleScene";
import { PlayerActionsPanel } from "./PlayerActionsPanel";
import { BattleTeam } from "./BattleTeam";
import { useBattleTurn } from "../hooks/useBattleTurn";
import { useBgm } from "@/features/audio/hooks/useBgm";
import { BattleRulesModal } from "./BattleRulesModal";

export function BattleCamp(){
    const {playerPokemon, enemyPokemon, playerHp, enemyHp,battleInfo, hasHydrated, enemyTeam, playerTeam, rewards } = useBattleStore()
    const {setPhase, phase, showFinish} = useBattleUIStore()
    const {currentMoveName, selectMove, playerSurrender, initBattle } = useBattleActions()
    const {events, playerTimer, updatePlayerTimer, executeAttack, executeSwitch} = useBattleTurn(currentMoveName, selectMove)
    useBgm("battle")

    useEffect(() => {
        if (!hasHydrated) return

        const load = async () => {

            if (battleInfo){
                setPhase("fighting")
                return
            }

            setPhase("opening")

            const ok = await initBattle()

            if (!ok) {
                navigate("/trainers/pokedex")
                return
            }

            setPhase("closing")
        }

        load()
    }, [hasHydrated])

    return (
        <>
            {(phase !== "fighting") && <div className="overlay-battle-camp fixed bg-black z-50 inset-0 opacity-100"/>}

            {showFinish && rewards && <FinishBattleScene rewards={rewards} />}

            <BattleRulesModal/>
            
            <CurrentBattlePokemonCard battlePokemon={enemyPokemon} currentHp={enemyHp} customStyles="absolute top-4 right-0 z-40"/>
            
            <BattleCampScene events={events} />
            
            <CurrentBattlePokemonCard battlePokemon={playerPokemon} currentHp={playerHp} customStyles="absolute bottom-4 left-0 z-40 flex-row-reverse" />

            <PlayerActionsPanel playerPokemon={playerPokemon} 
            currentMoveName={currentMoveName} playerTimer={playerTimer} 
            updatePlayerTimer={updatePlayerTimer}
            selectMove={selectMove}
            executeTurn={executeAttack} playerSurrender={playerSurrender}
            />

           

            <BattleTeam team={enemyTeam} switchPokemon={async () => {}} isPlayer={false} currentPokemon={enemyPokemon} />

            <BattleTeam team={playerTeam} switchPokemon={executeSwitch} isPlayer currentPokemon={playerPokemon} />

           
        </>
    )
}


