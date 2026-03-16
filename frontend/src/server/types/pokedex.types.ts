import type { PokemonResponse } from "./pokemon.types";

export interface PokedexResponse {
    pokemons: PokemonResponse[]
    page: number
    totalPages: number
    totalElements:number
}

export interface PokemonTeamResponse {
    team: PokemonResponse[]
}

export interface EvolPokemonResponse {
    coins: number
    xp: number
    level:number
    evolvedPokemon: PokemonResponse
}

export interface RemovePokemonFromPokedexResponse {
    level: number
    xp: number
    coins: number
    coinsReceived: number
}