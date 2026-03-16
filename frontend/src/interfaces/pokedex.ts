import type { Pokemon } from "./pokemon";

export interface Pokedex {
    pokemonTeam: Pokemon[],
    pokedex: Pokemon[]
}