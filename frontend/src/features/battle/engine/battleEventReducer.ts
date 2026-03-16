import type { BattleStore } from "../types/battle.types" 
import { handleAttack } from "./reducers/attackReducer"
import { handleFaint } from "./reducers/faintReducer"
import { handleSwitch } from "./reducers/switchReducer"
import type { BattleEvent } from "../types/battle.types" 

export function battleEventReducer(state: BattleStore, event: BattleEvent) {

    switch (event.type) {

        case "ATTACK":
            return handleAttack(state, event)

        case "FAINT":
            return handleFaint(state, event)

        case "SWITCH":
        case "STRATEGIC_SWITCH":
            return handleSwitch(state, event)

        case "FINISH_BATTLE":
            const {type, ...rewards} = event

            return {
                ...state,
                rewards
            }

        default:
            return state
    }
}



