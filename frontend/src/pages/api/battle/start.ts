import { handleApiError } from "@/server/errors/handleApiError";
import { startBattle } from "@/server/services/battle.service";
import type { APIRoute } from "astro";

export const POST:APIRoute = async ({locals}) => {
    try {
        const token = locals.token

        if (!token) return Response.json({"message": "Unahutorized"}, {status: 404})
            
        return Response.json(await startBattle(token))
    } catch (error) {
        return handleApiError(error)
    }
}