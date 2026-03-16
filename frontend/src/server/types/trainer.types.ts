import type { PackPokemonResponse } from "./pokemon.types"

export interface TrainerProfileResponse {
    name: string
    username: string
    level: number
    xp: number
    coins: number,
    wins: number,
    loses: number,
    caughtPokemons: number
}

export interface UpdateNameAndTrainerUsernameRequest {
    name: string
    username: string
}

export interface DailyPackStatusResponse {
    numEnvelopes: number
    lastResetDate: string
}

export interface EnvelopeResponse {
    pokemons: PackPokemonResponse[]
}