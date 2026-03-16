import type { EvolPokemonResponse, PokedexResponse, PokemonTeamResponse, RemovePokemonFromPokedexResponse } from "@/server/types/pokedex.types";
import { backendFetch } from "./backend.client";


export function fetchMyPokedex(token:string, page: string, size: string, type?: string, shiny?: string, order?: string){
    const params = new URLSearchParams()

    params.set("page", page)
    params.set("size", size)

    if (type) params.set("type", type)
    if (shiny) params.set("shiny", shiny)
    if (order) params.set("orderByPokedex", order)

    return backendFetch<PokedexResponse>(`/trainers/me/pokedex?${params}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export function fetchMyPokemonTeam(token:string){
    return backendFetch<PokemonTeamResponse>("/trainers/me/team", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export function fetchEvolPokemon(token:string, pokemonId:string){
    return backendFetch<EvolPokemonResponse>(`/trainers/me/pokemons/${pokemonId}/evolution`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        method: "POST"
    })
}

export function fecthAddPokemonToTeam(token:string, pokemonId:string){
    return backendFetch("/trainers/me/team", {
        headers: {
            Authorization: `Bearer ${token}`
        },
        method: "POST",
        body: JSON.stringify({pokemonId})
    })
}

export function fetchRemovePokemonFromPokedex(token:string, pokemonId:string){
    return backendFetch<RemovePokemonFromPokedexResponse>(`/trainers/me/pokedex/${pokemonId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        method: "DELETE"
    })
}

export function fetchRemovePokemonFromTeam(token:string, pokemonId:string){
    return backendFetch(`/trainers/me/team/${pokemonId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        method: "DELETE"
    })
}