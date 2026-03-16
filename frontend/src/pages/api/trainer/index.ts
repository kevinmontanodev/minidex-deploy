import { handleApiError } from "@/server/errors/handleApiError";
import { getTrainerData } from "@/server/services/trainer.service";
import type { APIRoute } from "astro";

export const GET:APIRoute = async ({locals}) => {
    try {
        return Response.json(await getTrainerData(locals.token!))
    } catch (error) {
        return handleApiError(error)
    }
}