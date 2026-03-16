import type { BattleInfo, BattleTurnResponse } from "../types/battle.types"

export const startBattle = async() => {
    try {
        const res = await fetch("/api/battle/start", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({})
        })

        const data = await res.json()

        if (!res.ok){
            return {success: false, message: data.error || "Error starting the battle camp"}
        }

        return {success: true, battleInfo: data as BattleInfo}
    } catch (error) {
        return {success: false, message: "Server connection error"}
    }
}

export interface BattleTurnRequest {
    battleId: string,
    pokemonUuid: string,
    moveName?:string,
    action: "ATTACK" | "SWITCH"
}

export const playTurn = async (turn: BattleTurnRequest) => {
    try {
        const res = await fetch("/api/battle/turn", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(turn)
        })

        const data = await res.json()

        if (!res.ok){
            return {success: false, message: data.error || "Can't play the turn", status: res.status}
        }

        return {success: true, turn: data as BattleTurnResponse, status: res.status}
    } catch (error) {
        return {success: false, message: "Server connection error", status: 500}
    }
}

export const surrender = async (battleId:string) => {
    try {
        const res = await fetch("/api/battle/surrender", {
            method: "POST",
            body: JSON.stringify({battleId}),
            headers: {"Content-Type": "application/json"},
        })

        const data = await res.json()

        if (!res.ok){
            return {success: false, message: data.error || "Cant clean the battle"}
        }

        return {success: true, message: "Don't worry, Try again later!"}
    } catch (error) {
        return {success: false, message: "Server connection error"}
    }
}