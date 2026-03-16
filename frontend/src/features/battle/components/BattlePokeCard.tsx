import type { BattlePokemon } from "@/interfaces/battlePokemon";

export function BattlePokeCard({pokemon, switchPokemon, isCurrent}: {pokemon:BattlePokemon, switchPokemon: (id: string) => Promise<void>, isCurrent: boolean}){
    
    return (
        <button disabled={pokemon.fainted || isCurrent} onClick={async () => await switchPokemon(pokemon.pokemonId)} >
            <picture className={`w-20 h-20 flex overflow-hidden p-1.5 ${isCurrent ? 'bg-black/70' : 'bg-black/50'} rounded-sm ${pokemon.fainted && 'grayscale-100 opacity-70'} ${pokemon.fainted || isCurrent ? 'cursor-not-allowed' :'cursor-pointer'}`}>
                <img src={pokemon.sprites.smallFront} alt={`gif of ${pokemon.name} pokemon`} />
            </picture>
        </button>
    )
}