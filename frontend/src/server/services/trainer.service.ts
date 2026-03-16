import { fetchDailyEnvelopeStatus, fetchOpenEnvelope, fetchTrainerData, fetchUpdateTrainerData } from "../clients/trainer.client";
import type { UpdateNameAndTrainerUsernameRequest } from "@/server/types/trainer.types";

export async function getTrainerData(token:string) {
    return fetchTrainerData(token)
}

export async function updateTrainerData(token:string, newData: UpdateNameAndTrainerUsernameRequest) {
    return fetchUpdateTrainerData(token, newData)
}

export async function getDailyEnvelpeStatus(token:string) {
    return fetchDailyEnvelopeStatus(token)
}

export async function openEnvelope(token:string) {
    return fetchOpenEnvelope(token)
}