import { handleApiError } from "@/server/errors/handleApiError"
import { login } from "@/server/services/auth.service"
import type { LoginRequest } from "@/server/types/auth.types"
import type { APIRoute } from "astro"

export const POST:APIRoute = async({request, cookies}) => {
    try {
        const body = (await request.json() as LoginRequest)

        const data = await login(body)

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