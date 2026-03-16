import { useMiniDexStore } from "@/stores/useMiniDexStore";
import type { PokemonCardProps } from "../types/pokedex.types";
import { playSound } from "@/features/audio/utils/playSound";

export function PokemonCard({pokemon, onHover, handleClick, isTeamCard}: PokemonCardProps) {
    const currentPokemon = useMiniDexStore((state) => state.currentPokemonDetails)
    const isCurrent = (currentPokemon?.uuid === pokemon.uuid) ? 'bg-white/10' : 'bg-white/20'

    const teamCardStyle = isTeamCard ? 'h-28' : 'h-24'

    return (
        <div onMouseEnter={() => {
            onHover(pokemon)
            playSound("plink")
        }}
            onClick={() => handleClick(pokemon)}
            className={`pokemon-card w-24 ${teamCardStyle} rounded p-1 ${isCurrent} text-center shadow-md overflow-hidden cursor-pointer hover:bg-white/10`}
        >
            <figure className="bg-black/10 rounded flex w-full h-full items-center justify-center overflow-hidden">
                <img src={pokemon.sprites.smallFront} alt={`main ${pokemon.shiny ? 'shiny' : 'normal'} image of ${pokemon.name} pokemon`} className="w-auto appear" />
            </figure>
            {isTeamCard && <p>{pokemon.name}</p>}
        </div>
    )
}