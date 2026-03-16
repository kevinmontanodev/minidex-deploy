import type { Pokemon } from "@/interfaces/pokemon";
import { useAlertStore } from "@/stores/useAlertStore";
import { useMiniDexStore } from "@/stores/useMiniDexStore";
import { useEffect } from "react";
import { removePokemonFromTeam } from "../services/pokedex.service";
import type { UsePokemonTeamReturn } from "../types/pokedex.types";

export function usePokemonTeam(initialTeam: Pokemon[]) : UsePokemonTeamReturn {
    const pokemonTeam = useMiniDexStore(state => state.pokemonTeam)
    const setPokemonTeam = useMiniDexStore(state => state.setPokemonTeam)
    const MAX_POKEMONS_IN_TEAM = 6
    const {confirm} = useAlertStore()

    useEffect(() => {
        setPokemonTeam(initialTeam)
    }, [initialTeam, setPokemonTeam])

    const removeFromTeam = async (id: string) => {
        const accepted = await confirm("Remove from team", "Dou you want remove this pokemon from team?")

        if (!accepted) return false

        const {success} = await removePokemonFromTeam(id)

        if (success){
            setPokemonTeam(prev => prev.filter(p => p.uuid !== id))
            return true
        }

        return false
    }

    const spaceToFill = pokemonTeam ? (MAX_POKEMONS_IN_TEAM - pokemonTeam.length) : MAX_POKEMONS_IN_TEAM

    return {
        pokemonTeam,
        removeFromTeam,
        spaceToFill
    }
}