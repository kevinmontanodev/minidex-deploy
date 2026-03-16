import { handleApiError } from "@/server/errors/handleApiError";
import { playerSwitchPokemon } from "@/server/services/battle.service";
import type { APIRoute } from "astro";

export const POST:APIRoute = async ({locals, request}) => {
    try {
        const token = locals.token
         
        if (!token) return Response.json({message: "Unahutorized"}, {status: 404})

        const body = await request.json()

        return Response.json(await playerSwitchPokemon(body, token))
    } catch (error) {
        return handleApiError(error)
    }
}