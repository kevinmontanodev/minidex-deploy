import type { BattleInfo, BattleTurnRequest, BattleTurnResponse, TrainerSwitchRequest } from "../types/battle.types";
import { backendFetch } from "./backend.client";

export function fetchStartBattle(token: string){
    return backendFetch<BattleInfo>("/battle/start", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export function fetchBattleTurn(turnRequest: BattleTurnRequest, token: string){
    return backendFetch<BattleTurnResponse>("/battle/turn", {
        method: "POST",
        body: JSON.stringify(turnRequest),
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export function fecthTrainerSwitch(trainerSwitchRequest: TrainerSwitchRequest, token: string){
    return backendFetch("/battle/switch", {
        method: "POST",
        body: JSON.stringify(trainerSwitchRequest),
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export function fecthSurrender(battleId:string, token: string){
    return backendFetch(`/battle/${battleId}/surrender`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
