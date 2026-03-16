import type { BattleStore, FaintEvent } from "../../types/battle.types" 
import { markFainted } from "../helpers/battle.helpers"

export function handleFaint(state: BattleStore, event: FaintEvent) {

    if (event.side === "PLAYER") {

        return {
            ...state,
            playerPokemon: state.playerPokemon
                ? { ...state.playerPokemon, fainted: true }
                : null,
            playerTeam: markFainted(state.playerTeam, event.pokemonId),
            playerSwitchTimer: 0
        }
    }

    return {
        ...state,
        enemyPokemon: state.enemyPokemon
            ? { ...state.enemyPokemon, fainted: true }
            : null,
        enemyTeam: markFainted(state.enemyTeam, event.pokemonId)
    }
}