import { handleApiError } from "@/server/errors/handleApiError";
import { removePokemonFromPokedex } from "@/server/services/pokedex.service";
import type { APIRoute } from "astro";

export const DELETE : APIRoute = async ({ params, locals}) => {
    try {
        const pokemonId = params.pokemonId

        if (!pokemonId) {
            return Response.json(
                { message: "pokemon-id es requerido" },
                { status: 400 }
            );
        }
        
        return Response.json(await removePokemonFromPokedex(locals.token!, pokemonId))
    } catch (error) {
        return handleApiError(error)
    }
}