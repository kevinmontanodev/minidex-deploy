import type { APIRoute } from "astro";
import { handleApiError } from "@/server/errors/handleApiError";
import { getDailyShopData } from "@/server/services/shop.service";


export const GET:APIRoute = async({locals}) => {
    try {
        return Response.json(await getDailyShopData(locals.token!))
    } catch (error) {
        return handleApiError(error)
    }
}