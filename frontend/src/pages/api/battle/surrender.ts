import { handleApiError } from "@/server/errors/handleApiError";
import { surrender } from "@/server/services/battle.service";
import type { APIRoute } from "astro";

export const POST:APIRoute = async ({request, locals}) => {
    try {
        const token = await locals.token

        if (!token){
            return Response.json({message: "Unhautorize"}, {status: 403})
        }

        const {battleId} = await request.json()

        return Response.json(surrender(battleId, token))
    } catch (error) {
        return handleApiError(error)
    }
}