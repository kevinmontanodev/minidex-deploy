import { handleApiError } from "@/server/errors/handleApiError";
import { removePokemonFromTeam } from "@/server/services/pokedex.service";
import type { APIRoute } from "astro";

export const DELETE:APIRoute = async ({locals, params}) => {
    try {
        const pokemonId = params.pokemonId
        
        return Response.json(await removePokemonFromTeam(locals.token!, pokemonId!))
    } catch (error) {
        return handleApiError(error)
    }
}