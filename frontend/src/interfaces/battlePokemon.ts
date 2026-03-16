import type { Move, Sprites } from "./pokemon";

export interface BattlePokemon {
    pokemonId:string
    name: string;
    maxHp:number
    currentHp: number
    sprites: Sprites
    attack: number;
    defense: number;
    speed: number;
    level:number;
    moves: Move[]
    types: string[]
    fainted: boolean
}
