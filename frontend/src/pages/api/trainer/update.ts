import { handleApiError } from "@/server/errors/handleApiError";
import { updateTrainerData } from "@/server/services/trainer.service";
import type { UpdateNameAndTrainerUsernameRequest } from "@/server/types/trainer.types";
import type { APIRoute } from "astro";

export const PUT:APIRoute = async({locals, request, cookies}) => {
    try {
        const body = (await request.json() as UpdateNameAndTrainerUsernameRequest)

        const data = await updateTrainerData(locals.token!, body)

        // Guarda el nuevo token en la cookie
        cookies.set("token", data.token, {
            path: "/",
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production"
        })

        return Response.json(data.trainerDTO)
    } catch (error) {
        return handleApiError(error)
    }
}