import { handleApiError } from "@/server/errors/handleApiError";
import { buyEnvelope } from "@/server/services/shop.service";
import type { APIRoute } from "astro";

export const POST:APIRoute = async ({locals}) => {
    try {
        return Response.json(await buyEnvelope(locals.token!))
    } catch (error) {
        return handleApiError(error)
    }
}