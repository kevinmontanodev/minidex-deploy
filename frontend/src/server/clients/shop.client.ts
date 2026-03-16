import type { BuyEnvelopeResponse, BuySpecialPokemonResponse, DailyShopResponse } from "@/server/types/shop.types";
import { backendFetch } from "./backend.client";

export function fetchDailyShopData(token:string){
    return backendFetch<DailyShopResponse>("/shop", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export function fetchBuySpecialPokemon(token: string){
    return backendFetch<BuySpecialPokemonResponse>("/trainers/me/pokemon", {
        headers: {
            Authorization: `Bearer ${token}`
        },
        method: "POST"
    })
}

export function fetchBuyEnvelope(token:string){
    return backendFetch<BuyEnvelopeResponse>("/trainers/me/booster-packs", {
        headers: {
            Authorization: `Bearer ${token}`
        },
        method: "POST"
    })
}