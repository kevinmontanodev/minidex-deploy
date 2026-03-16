import type { Pokemon, Type } from "@/interfaces/pokemon"

// hooks types
export interface UsePokemonActionsReturn {
    isAlreadyInTeam: boolean
    canAddMore: boolean
    canEvolve: boolean
    handleAddToTeam: () => Promise<void>
    handleRemoveFromTeam: () => Promise<void>
    handleTransfer: () => Promise<void>
    evolPokemon: () => Promise<void>
    closeEvolvedModal: () => void
    openEvolvedModal: () => void
    isEvolved: boolean
}

export interface UsePokedexReturn{
    filters: Filter,
    changeType: (type: string) => void
    toggleShiny: () => void
    pokemons: Pokemon[]
    currentPage: number
    totalPages: number
    visiblePages: number[],
    nextPage: () => void
    prevPage: () => void
    setPage: (page: number) => void
    selectPokemon: (pokemon:Pokemon) => void
    hoverPokemon: (pokemon:Pokemon) => void
    toggleOrder: () => void,
    loading: boolean
}

export interface UsePokemonTeamReturn {
    pokemonTeam: Pokemon[]
    removeFromTeam: (id:string) => Promise<boolean>
    spaceToFill:number
}

// responses types
export interface TransferPokemon {
    coins: number
    xp: number
    level: number
    coinsReceived: number
}

export interface TransferPokemonResponse {
    success: boolean
    message? :string
    data?: TransferPokemon
}

interface EvolResponse {
    trainerCoins: number
    trainerXp: number
    trainerLevel:number
    evolvedPokemon: Pokemon
}

export interface EvolPokemonResponse {
    success:boolean,
    message?: string
    data?: EvolResponse
}


// components types
export interface PokedexPageInfo {
    pokemons: Pokemon[]
    page: number
    totalPages: number
    totalElements:number
}

export interface Filter {
    type: string,
    shiny: boolean,
    orderByPokedex: boolean
}

export interface PokemonCardProps {
    pokemon: Pokemon
    onHover : (pokemon : Pokemon) => void
    handleClick: (pokemon: Pokemon) => void
    isTeamCard?: boolean
}

export interface PaginationComponentProps {
    visiblePages:number[]
    currentPage: number
    totalPages: number
    nextPage: () => void
    prevPage: () => void
    setPage: (page:number) => void
    animatedPageChange: (callback: () => void) => void
}

export interface FilterProps {
    changeFilter: (filter:string) => void
    filters: Filter
    toggleShiny: () => void
    order: () => void
}

export interface FilterOptionProps {
    type:string
    iconUrl:string
    selectFilter:(type:string) => void
}

export interface EvolutionModalProps {
    currentPokemon: Pokemon
    closeModal: () => void
    evolvePokemon: () => Promise<void>
}

export interface HeaderPokemonDetailProps {
    pokemonName:string
    numPokedex:number
    types:Type[]
    isShiny: boolean
}