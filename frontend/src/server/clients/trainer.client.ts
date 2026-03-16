import type { LoginResponse } from "@/server/types/auth.types";
import type { DailyPackStatusResponse, EnvelopeResponse, TrainerProfileResponse, UpdateNameAndTrainerUsernameRequest } from "@/server/types/trainer.types";
import { backendFetch } from "./backend.client";

export function fetchTrainerData(token:string){
    return backendFetch<TrainerProfileResponse>("/trainers/me", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export function fetchUpdateTrainerData(token:string, newNameAndUsername: UpdateNameAndTrainerUsernameRequest){
    return backendFetch<LoginResponse>("/trainers/me", {
        headers: {
            Authorization: `Bearer ${token}`
        },
        method: "PUT",
        body: JSON.stringify(newNameAndUsername)
    })
}


export function fetchDailyEnvelopeStatus(token:string){
    return backendFetch<DailyPackStatusResponse>("/trainers/me/daily-packs", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export function fetchOpenEnvelope(token:string){
    return backendFetch<EnvelopeResponse>("/trainers/me/daily-packs/open", {
        headers: {
            Authorization: `Bearer ${token}`
        },
        method: "POST"
    })
}