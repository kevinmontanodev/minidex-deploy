import { fetchBuyEnvelope, fetchBuySpecialPokemon, fetchDailyShopData } from "../clients/shop.client";

export async function getDailyShopData(token:string) {
    return fetchDailyShopData(token)
}

export async function buySpecialPokemon(token:string) {
    return fetchBuySpecialPokemon(token)
}

export async function buyEnvelope(token:string) {
    return fetchBuyEnvelope(token)
}