import type { BattleStore, StrategicSwitch, SwitchEvent } from "../../types/battle.types" 
import { updateEnemyTeam } from "../helpers/battle.helpers"

export function handleSwitch(state: BattleStore, event: SwitchEvent | StrategicSwitch) {

    if (event.side === "PLAYER") {
        return {
            ...state,
            playerPokemon: event.newPokemon,
            playerHp: event.newPokemon.currentHp
        }
    }

    return {
        ...state,
        enemyPokemon: event.newPokemon,
        enemyHp: event.newPokemon.currentHp,
        enemyTeam: updateEnemyTeam(state.enemyTeam, event.newPokemon)
    }
}