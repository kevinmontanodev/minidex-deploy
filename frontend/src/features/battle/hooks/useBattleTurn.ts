import { useAlertStore } from "@/stores/useAlertStore"
import { useBattleStore } from "@/features/battle/store/useBattleStore"
import { useBattleUIStore } from "@/features/battle/store/useBattleUIStore"
import { navigate } from "astro:transitions/client"
import { useState } from "react"
import { playTurn, type BattleTurnRequest } from "../service/battle.service"
import type { BattleEvent, BattleTurnResponse } from "../types/battle.types"
import type { UseBattleTurnReturn } from "../types/battle.types"
import { SWITCH_COOLDOWN } from "../const/switch_cooldown"

export function useBattleTurn(currentMoveName:string | null, setCurrentMoveName:(move: string) => void) : UseBattleTurnReturn {
    const battleInfo = useBattleStore(s => s.battleInfo)
    const {alert, confirm} = useAlertStore()
    const [events, setEvents] = useState<BattleEvent[]>([])
    const playerPokemon = useBattleStore(s => s.playerPokemon)
    const setCurrentMessage = useBattleStore(s => s.setCurrentMessage)
    const updateBattleStatus = useBattleStore(s => s.updateBattleStatus)
    const [isPlayingTurn, setIsPlayingTurn] = useState(false)
    const setShowFinal = useBattleUIStore(s => s.setShowFinish)
    const setPhase = useBattleUIStore(s => s.setPhase)
    const playerTimer = useBattleStore(s => s.playerSwitchTimer)
    const updatePlayerTimer = useBattleStore(s => s.updatePlayerSwitchTimer)
    const clearBattle = useBattleStore(s => s.clearBattle)

    const switchPokemon = async (id: string) => {
        if (!battleInfo?.battleId || battleInfo.status !== "IN_PROGRESS") {
            await battleAlreadyFinish()
            return
        }

        if (playerPokemon?.fainted){
            updatePlayerTimer(0)
        }
    
        if (playerTimer > 0) {
            alert("Can't Switch", "You can't already switch")
            return
        }
    
        const newCurrentPokemon = battleInfo.playerTeam.find(p => p.pokemonId === id);
    
        if (!newCurrentPokemon || newCurrentPokemon.fainted) return
    
        const ok = await confirm("Switch Pokemon", "Do you want switch this pokemon?")
    
        if (!ok) return

        setCurrentMessage(['waiting enemy move...'])

        const res = await playTurn(buildTurnRequest("SWITCH", battleInfo.battleId, newCurrentPokemon.pokemonId, ''))

        if (res.status === 404){
            await battleAlreadyFinish()
            return
        }
    
        if (!res.success || !res.turn){
            alert("Error switching", res.message)
            return
        }
    
            
        updatePlayerTimer(SWITCH_COOLDOWN)
        setEvents(res.turn.events)
        setCurrentMoveName('')
    }
    
    const attack = async () => {
        if (!battleInfo?.battleId || !playerPokemon || !currentMoveName || battleInfo.status !== "IN_PROGRESS") {
            await battleAlreadyFinish()
            return
        }

        if (!playerPokemon.moves.find(m => m.moveName.toLowerCase() === currentMoveName.toLowerCase())){
            alert("Incorrect move", "Your pokemon don't have this move")
            return
        }

        setCurrentMessage(['waiting enemy move...'])
        
        const res = await playTurn(buildTurnRequest("ATTACK", battleInfo.battleId, playerPokemon.pokemonId, currentMoveName))

        if (res.status === 404){
            await battleAlreadyFinish()
            return
        }

        if (!res.success || !res.turn){
            alert("Error play turn", res.message)
            return
        }

        const turnResults : BattleTurnResponse = res.turn
            
        setEvents(turnResults.events)
            
        if (turnResults.status !== "IN_PROGRESS"){
            updateBattleStatus(turnResults.status)
            setShowFinal(true)
        }
    }

    const battleAlreadyFinish = async () => {
        alert('Battle is Finish', "The battle alreadyFinish")
        setPhase("idle")
        clearBattle()
        await navigate("/trainers/pokedex")
    }

    const buildTurnRequest = (action : "SWITCH" | "ATTACK", battleId: string, pokemonUuid: string, moveName: string) => {
        const request : BattleTurnRequest = {
            battleId,
            pokemonUuid,
            moveName,
            action
        } 

        return request
    }

    const executeSwitch = async (id: string) => {
        if (isPlayingTurn) return
    
        setIsPlayingTurn(true)
    
        try {
                await switchPokemon(id)
        } catch (error) {
    
        } finally {
            setTimeout(() => {
                setIsPlayingTurn(false)
            }, 1500)
        }
    }

    const executeAttack = async () => {
        if (isPlayingTurn) return

        setIsPlayingTurn(true)
    
        try {
            await attack()
        } catch (error) {
    
        } finally {
            setTimeout(() => {
                setIsPlayingTurn(false)
            }, 1500)
        }
    }

    return {
        events,
        executeAttack,
        executeSwitch,
        playerTimer,
        updatePlayerTimer
    }
}