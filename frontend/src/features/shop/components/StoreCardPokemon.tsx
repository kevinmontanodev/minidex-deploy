import { Coins } from "@/components/icons/Coins"
import { useShop } from "../hooks/useShop"
import type { StoreCardPokemonProps } from "../types/shop.types"
import { useState } from "react"
import { PurchaseSpecialPokemonModal } from "./PurchaseSpecialPokemonModal"
import { playSound } from "@/features/audio/utils/playSound"
import { useBgm } from "@/features/audio/hooks/useBgm"

export function StoreCardPokemon({specialPokemon, specialPokemonPrice, specialPokemonPurchased}: StoreCardPokemonProps) {
    const {isAlreadyPurchased, buyPokemon, confirmPurchased} = useShop(specialPokemon, specialPokemonPurchased, specialPokemonPrice)
    const [showAcquire, setShowAcquire] = useState(false)
    const [snapshotPokemon, setSnapshotPokemon] = useState(specialPokemon)
    useBgm("menu")

    const handleBuy = async () => {
        const success = await buyPokemon()
        if (!success) return
        playSound("shiny")
        setSnapshotPokemon(specialPokemon)
        setShowAcquire(true)
        confirmPurchased()
    }

    return (
        <>
            <article className="bg-gradient-to-tl from-[#43368F] via-[#C080E5] to-[#F5FEFA] rounded-md">
                {!isAlreadyPurchased && <h4 className="text-center text-lg font-semibold">Featured Pokemon!</h4>}
                {!isAlreadyPurchased 
                && (<div className="w-60 h-72 flex justify-center items-center flex-col p-2 gap-2">
                        <img className="appear opacity-0" src={specialPokemon.image} alt={`image of ${specialPokemon.name}`} />
                        <button 
                        onClick={handleBuy}
                        className="flex gap-2 bg-gradient-to-tl from-[#1500F7] via-[#6D02C6] to-[#CB0492] rounded-md py-1.5 px-4 cursor-pointer text-white"><Coins/> {specialPokemonPrice}
                        </button>
                    </div>)
                }

                {isAlreadyPurchased 
                    && <div className="w-60 h-full bg-black/50 rounded-md mx-auto flex items-center justify-center p-2">
                        <p className="text-sm text-zinc-200 text-center">There will be a new special Pokémon tomorrow.</p>
                    </div>
                }
            </article>

            {showAcquire && <PurchaseSpecialPokemonModal snapshotPokemon={snapshotPokemon} setShowAcquire={setShowAcquire} showAcquire />}
        </>
    )
}