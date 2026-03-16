import type { PackPokemon } from "./pokemon";

export interface PokemonStoreStatus {
    specialPokemon : PackPokemon;
    specialPokemonPrice : number;
    specialPokemonPurchased : boolean;

    boosterPrice : number;
    boostersRemaining : number;
}