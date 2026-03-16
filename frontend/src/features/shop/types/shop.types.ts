import type { PackPokemon } from "@/interfaces/pokemon"
import type { SetStateAction } from "react"

// hooks
export interface UseShopReturn {
    buyPokemon:() => Promise<true | undefined>
    isAlreadyPurchased: boolean
    confirmPurchased: () => void
}

// reponses
export interface TrainerDataAfterPurchase {
    coins: number
    xp: number
    level: number
}

// components
export interface StoreCardPokemonProps {
    specialPokemon: PackPokemon
    specialPokemonPrice: number
    specialPokemonPurchased:boolean
}

export interface PurchaseSpecialPokemonModalProps{
    showAcquire:boolean
    setShowAcquire: (value: SetStateAction<boolean>) => void
    snapshotPokemon:PackPokemon
}