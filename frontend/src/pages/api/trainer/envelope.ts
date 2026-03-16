import type {APIRoute} from "astro"
import { handleApiError } from "@/server/errors/handleApiError"
import { getDailyEnvelpeStatus, openEnvelope } from "@/server/services/trainer.service"

export const GET:APIRoute = async ({locals}) => {
    try {
		return Response.json(await getDailyEnvelpeStatus(locals.token!))
	} catch (error) {
		return handleApiError(error)
	}
}

export const POST: APIRoute = async ({locals}) => {
    try {
		return Response.json(await openEnvelope(locals.token!))
	} catch (error) {
		return handleApiError(error)
	}
}