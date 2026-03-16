import type { PackPokemon } from "@/interfaces/pokemon"
import { useAlertStore } from "@/stores/useAlertStore"
import { useMiniDexStore } from "@/stores/useMiniDexStore"
import { useState } from "react"
import { buySpecialPokemon } from "../services/shop.service"
import type { UseShopReturn } from "../types/shop.types"

export function useShop(specialPokemon : PackPokemon,specialPokemonPurchased:boolean, specialPokemonPrice:number): UseShopReturn {
    const [isAlreadyPurchased, setIsAlreadyPurchased] = useState(specialPokemonPurchased)
    const trainer = useMiniDexStore((s) => s.trainer)
    const setTrainer = useMiniDexStore((s) => s.setTrainer)
    const {confirm, alert} = useAlertStore()
    
    const buyPokemon = async () => {
        if (!isAlreadyPurchased && trainer != undefined){

            const buy = await confirm("Buy Pokemon",`Do you want to buy ${specialPokemon.name} for ${specialPokemonPrice} coins?`)
    
            if (!buy) return

            if (trainer?.coins < specialPokemonPrice) {
                alert("Not Enough coins", "You don't have enough coins")
                return 
            }
    
            const result = await buySpecialPokemon()
    
            if (!result.success){
                alert("Failed to buy", result.message || "The Pokémon has already been purchased or an error occurred")
                return 
            } 
    
            setTrainer({...result.data})
      
            return true
        }
    }

    const confirmPurchased = () => {
        setIsAlreadyPurchased(true)
    }

    return  {
        buyPokemon,
        isAlreadyPurchased,
        confirmPurchased
    }
}