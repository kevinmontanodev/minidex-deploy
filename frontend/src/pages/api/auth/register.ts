import { handleApiError } from "@/server/errors/handleApiError";
import { register } from "@/server/services/auth.service";
import type { RegisterRequest } from "@/server/types/auth.types";
import type { APIRoute } from "astro";

export const POST:APIRoute = async ({request, cookies}) => {
    try {
        const body = (await request.json() as RegisterRequest)

        const data = await register(body)

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