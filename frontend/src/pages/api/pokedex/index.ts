import type { APIRoute } from "astro";
import { getMyPokedex } from "@/server/services/pokedex.service";
import { handleApiError } from "@/server/errors/handleApiError";

export const GET:APIRoute = async({request, locals}) => {
    try {
        if (!locals.token){
            return Response.json({message: "Unahutorize"}, {status: 403})
        }
        const url = new URL(request.url)

        const page = url.searchParams.get("page") ?? "0"
        const size = url.searchParams.get("size") ?? "12"
        const type = url.searchParams.get("type") || ""
        const shiny = url.searchParams.get("shiny") || ""
        const order = url.searchParams.get("orderByPokedex") || ""

        const res = await getMyPokedex(locals.token, page, size, type, shiny, order)

        return Response.json(res)
    } catch (error) {
        return handleApiError(error)
    }
}


