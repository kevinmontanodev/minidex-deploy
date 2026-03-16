import type { PackPokemonResponse } from "./pokemon.types";

export interface DailyShopResponse {
    specialPokemon: PackPokemonResponse
    specialPokemonPrice : number
    specialPokemonPurchased : boolean
    boosterPrice : number
    boostersRemaining : number
}


export interface BuyEnvelopeResponse {
    coins: number
    xp: number
    level: number
    pokemons: PackPokemonResponse
}

export interface BuySpecialPokemonResponse {
    coins: number
    xp: number
    level: number
}