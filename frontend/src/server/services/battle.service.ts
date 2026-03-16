import { fecthSurrender, fecthTrainerSwitch, fetchBattleTurn, fetchStartBattle } from "../clients/battle.client";
import type { BattleTurnRequest, TrainerSwitchRequest } from "../types/battle.types";

export async function startBattle(token: string) {
    return fetchStartBattle(token)
}

export async function battleTurn(turnRequest: BattleTurnRequest, token:string) {
    return fetchBattleTurn(turnRequest, token)
}

export async function playerSwitchPokemon(switchRequest:TrainerSwitchRequest, token:string) {
    return fecthTrainerSwitch(switchRequest, token)
}

export async function surrender(battleId:string, token: string) {
    return fecthSurrender(battleId, token)
}