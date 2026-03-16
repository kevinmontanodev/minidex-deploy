import type { EvolPokemonResponse, PokedexPageInfo, TransferPokemonResponse } from "../types/pokedex.types";

export const getPokedex = async ({page = 0, size = 12, type, shiny, orderByPokedex}:
    {page?:number, size?:number, type?:string, shiny?:boolean, orderByPokedex?:boolean}) : Promise<PokedexPageInfo> => {
    try  {
        const params = new URLSearchParams()

        params.set("page", page.toString())
        params.set("size", size.toString())

        if (type && type !== "ALL") {
            console.log("type in service front: ", type)
            params.set("type", type)
        }

        if (shiny) {
            params.set("shiny", "true")
        }

        if (orderByPokedex) {
            params.set("orderByPokedex", "true")
        }

        const res = await fetch(`/api/pokedex?${params}`)

        if (!res.ok) throw new Error(`Error ${res.status}`)

        return res.json()
    } catch (e) {
        return {
            pokemons: [],
            page: 0,
            totalPages: 0,
            totalElements: 0
        }
    }
}


export const removePokemonFromPokedex = async (id:string): Promise<TransferPokemonResponse> => {
    try {

        const res = await fetch(`/api/pokedex/${id}`, {method: "DELETE"});

        const data = await res.json()
    
        if (!res.ok){
            return {success: false, message: data.message || "Failed to transfer pokemon"}
        }
        
        return {success: true, data : data}
    } catch (error) {
        return {success: false, message: "Server connection error"}
    }
}

export async function addPokemonToTeam(id: string) {
    try {
        const res = await fetch("/api/pokedex/team", {
            method: "POST",
            body: JSON.stringify({pokemonId: id})
        })

        const data = await res.json().catch(() => {})

        if (!res.ok){
            return {success: false, message: data.message}
        }

        return {success: true}
    } catch (error) {
        return {success: false, message: "Server connection error"}
    }
}

export async function removePokemonFromTeam(id:string) {
    try {
        const res = await fetch(`/api/pokedex/team/${id}`, {
            method: "DELETE"
        })

        if (!res.ok){
            return {success: false}
        }

        return {success: true}
    } catch (error) {
        return {success: false, message: "Server connection error"}
    }
}


export async function evolvePokemon(id:string) : Promise<EvolPokemonResponse> {
    try {
        const res = await fetch(`/api/pokedex/evolve/${id}`, {
            method: "POST"
        })

        const data = await res.json()

        if (!res.ok){
            return {success: false, message: data.message || "Pokemon can't evolve"}
        }

        return {success: true, data: data}
    } catch (error) {
        return {success: false, message: "Server connection error"}
    }
}