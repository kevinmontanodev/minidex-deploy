import { handleApiError } from "@/server/errors/handleApiError";
import { addPokemonToTeam, getPokemonTeam } from "@/server/services/pokedex.service";
import type { APIRoute } from "astro";

export const GET:APIRoute = async ({locals}) => {
    try {
        return Response.json(await getPokemonTeam(locals.token!))
    } catch (error) {
        return handleApiError(error)
    }
}


export const POST:APIRoute = async ({locals, request}) => {
    try {
        const {pokemonId} = await request.json()
        
        return Response.json(await addPokemonToTeam(locals.token!, pokemonId))
    } catch (error) {
        return handleApiError(error)
    }
}