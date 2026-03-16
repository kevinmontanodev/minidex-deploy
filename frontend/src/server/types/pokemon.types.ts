export interface PokemonResponse {
    uuid: string
    numPokedex: number
    name: string
    rarity: string
    sprites : Sprites
    shiny: boolean
    level: number
    nextEvolution: NextEvolution | null
    stats: Stats
    types: Type[]
    moves: Move[]
    canEvolve: boolean
}


export interface NextEvolution{
    name: string,
    numPokedex: number
}

export interface PackPokemonResponse {
    name: string,
    image: string,
    shiny: boolean,
    rarity: "COMMON" | "UNCOMMON" | "RARE" | "LEGENDARY";
}

export interface Sprites {
    mainImage: string
    smallFront: string
    smallBack: string
}

interface Stats {
    hp: number
    attack: number
    defense: number
    speed: number
}


interface Type {
    name: string
    iconUrl: string
}


export interface Move {
    moveName: string
    type: string
    power: number | null
    accuracy: number | null
}