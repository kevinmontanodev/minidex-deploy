import { DetailWrapper } from "./DetailWrapper";
import type { HeaderPokemonDetailProps } from "../types/pokedex.types";

export function HeaderPokemonDetails({pokemonName, numPokedex, types, isShiny}: HeaderPokemonDetailProps){
    return (
        <DetailWrapper customStyles="p-1.5">
            <div className="appear">
                <span className={`p-0.5 pr-5 rounded-l-sm  rounded-r-full bg-white text-black rounded font-medium mr-2`}>N. {numPokedex}</span>
                <span className={`${isShiny ? 'text-amber-400' : ''}`}>{pokemonName}</span>
            </div>
            <div className="flex gap-1 appear">
                {types.map((t) => {
                    return (
                        <picture key={t.name}>
                            <img src={t.iconUrl} alt="type icon image" className="w-28" />
                        </picture>
                    )
                })}
            </div>
        </DetailWrapper>
    )
}