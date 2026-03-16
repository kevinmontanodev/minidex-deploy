import type { PackPokemon } from "@/interfaces/pokemon"

export type EnvelopeContainerProps = {
    initialAmount: number,
    packPrice?: number,
    emptyMessage?: string
}

export interface openEnvelopeResponse {
    success: boolean
    message?: string
    pokemons?: PackPokemon[]
}

export interface PackState {
    id:string,
    hidden:boolean
}
export interface UsePackReturn {
    pokemons: PackPokemon[],
    packs: PackState[],
    openPack: (id:string) => Promise<void>,
    consumePack : () => void,
    activePackId : string | null,
    isOpening: boolean
}

export interface UsePackProps{
    initialAmount: number
    packPrice?: number
}