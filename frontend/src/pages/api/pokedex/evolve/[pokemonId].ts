import { handleApiError } from "@/server/errors/handleApiError";
import { evolPokemon } from "@/server/services/pokedex.service";
import type { APIRoute } from "astro";

export const POST:APIRoute = async ({locals, params}) => {
    try {
        const pokemonId = params.pokemonId
        return Response.json(await evolPokemon(locals.token!, pokemonId!))
    } catch (error) {
        return handleApiError(error)
    }
}