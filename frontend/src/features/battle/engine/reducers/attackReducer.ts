import type { AttackEvent, BattleStore } from "../../types/battle.types" 

export function handleAttack(state: BattleStore, event: AttackEvent) {

    if (event.side === "PLAYER") {
        return {
            ...state,
            enemyHp: event.hpAfter,
            enemyPokemon: state.enemyPokemon
                ? { ...state.enemyPokemon, currentHp: event.hpAfter }
                : null
        }
    }

    return {
        ...state,
        playerHp: event.hpAfter,
        playerPokemon: state.playerPokemon
            ? { ...state.playerPokemon, currentHp: event.hpAfter }
            : null
    }
}