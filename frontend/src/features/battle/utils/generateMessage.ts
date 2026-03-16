import type { BattleEvent } from "../types/battle.types"
import { getEffectivenessMessage } from "./getEffectivenessMessage"

export const generateMessage = (event: BattleEvent): string[] => {
    switch (event.type) {
        case "ATTACK":{
            const messages : string[] = []
            const baseMessage = event.side === "PLAYER"
            ? `Your Pokémon used ${event.moveName}!`
            : `Enemy used ${event.moveName}!`

            messages.push(baseMessage)

            if (!event.hit){
                messages.push(`${baseMessage} But it failed!`)
                return messages
            }

            const hitMessage = `It was a ${event.hitResult}`
            const effectivenessMessage = getEffectivenessMessage(event.effectiveness)
            messages.push(hitMessage)
            messages.push(effectivenessMessage)

            return messages.filter(Boolean)
        }
        case "FAINT":
        return [event.side === "PLAYER"
            ? `Your Pokémon fainted!`
            : `Enemy Pokémon fainted!`]

        case "SWITCH":
        case "STRATEGIC_SWITCH":
            return [event.side === "PLAYER" ? `Go ${event.newPokemon.name}!` : `Enemy sent out ${event.newPokemon.name}`]
        case "FINISH_BATTLE":
            return event.playerWin ? [`All enemy team was fainted`, `You Win!`] : [`All your team was fainted`, `Try later again...`]
    }
}