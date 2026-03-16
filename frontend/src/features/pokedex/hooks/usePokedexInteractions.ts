import type { Pokemon } from "@/interfaces/pokemon";
import { useMiniDexStore } from "@/stores/useMiniDexStore";
import { useEffect, useState } from "react";

export function usePokedexInteraction(){
    const setCurrentPokemonDetails = useMiniDexStore(s => s.setCurrentPokemonDetails)
    const [isLocked, setIsLocked] = useState(false)

    useEffect(() => {
        if (!isLocked) return
        const t = setTimeout(() => setIsLocked(false), 3000)
        return () => clearTimeout(t)
    }, [isLocked])

    const selectPokemon = (pokemon: Pokemon) => {
        setCurrentPokemonDetails(pokemon)
        setIsLocked(true)
    }

    const hoverPokemon = (pokemon: Pokemon) => {
        if (!isLocked) {
            setCurrentPokemonDetails(pokemon)
        }
    }

    return {selectPokemon, hoverPokemon}
}