import type { BattlePokemon } from "@/interfaces/battlePokemon"

export const updateEnemyTeam = (team: BattlePokemon[], newPoke: BattlePokemon) => {
    if (team.some(p => p.pokemonId === newPoke.pokemonId)){
        return team
    }

    return [newPoke, ...team]
}

export const markFainted = (team: BattlePokemon[], pokemonId:string) => {
    return team.map(p =>
        p.pokemonId === pokemonId
        ? {...p, fainted: true}
        : p
    )
}