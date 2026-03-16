import { handleApiError } from "@/server/errors/handleApiError";
import { battleTurn } from "@/server/services/battle.service";
import type { APIRoute } from "astro";

export const POST:APIRoute = async ({locals, request}) => {
    try {
        const token = locals.token
        
        if (!token) return Response.json({message: "Unahutorize"}, {status: 403})
        
        const body = await request.json()

        return Response.json(await battleTurn(body, token))
    } catch (error) {
        return handleApiError(error)
    }
}