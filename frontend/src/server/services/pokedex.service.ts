import { fetchMyPokedex, fetchMyPokemonTeam, fetchEvolPokemon, fecthAddPokemonToTeam, fetchRemovePokemonFromPokedex, fetchRemovePokemonFromTeam } from "../clients/pokedex.client";

export async function getMyPokedex(token:string, page: string, size: string, type?: string, shiny?: string, order?: string) {
    return fetchMyPokedex(token, page, size, type, shiny, order)
}

export async function getPokemonTeam(token:string) {
    return fetchMyPokemonTeam(token)
}

export async function evolPokemon(token:string, pokemonId:string) {
    return fetchEvolPokemon(token, pokemonId)
}

export async function addPokemonToTeam(token:string, pokemonId: string) {
    return fecthAddPokemonToTeam(token, pokemonId)
}

export async function removePokemonFromPokedex(token:string, pokemonId:string) {
    return fetchRemovePokemonFromPokedex(token, pokemonId)
}

export async function removePokemonFromTeam(token:string, pokemonId:string) {
    return fetchRemovePokemonFromTeam(token, pokemonId)
}