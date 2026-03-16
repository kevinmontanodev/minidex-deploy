export interface Pokemon {
    uuid: string;
    numPokedex: number,
    name: string;
    sprites: Sprites;
    shiny: boolean,
    level: number,
    nextEvolution: NextEvolution | null,
    stats: Stats
    types: Type[],
    moves: Move[],
    rarity: "COMMON" | "UNCOMMON" | "RARE" | "LEGENDARY";
    canEvolve: boolean
}

export interface NextEvolution {
    name: string
    numPokedex: string
}

export interface Type {
    name: string,
    iconUrl: string
}

export interface Sprites {
    mainImage : string
    smallFront : string
    smallBack : string
}

export interface Stats {
    hp: number,
    attack: number,
    defense: number,
    speed: number
}

export interface Move {
    moveName: string,
    type: string,
    power: number | null,
    accuracy: number | null
}

export interface PackPokemon{
    name: string,
    image: string,
    shiny: boolean,
    rarity: "COMMON" | "UNCOMMON" | "RARE" | "LEGENDARY";
}