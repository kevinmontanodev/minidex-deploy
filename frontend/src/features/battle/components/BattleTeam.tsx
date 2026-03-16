import type { BattlePokemon } from "@/interfaces/battlePokemon";
import { BattlePokeCard } from "./BattlePokeCard";

export function BattleTeam({team, isPlayer, currentPokemon, switchPokemon}: {team:BattlePokemon[], isPlayer:boolean, currentPokemon: BattlePokemon | null, switchPokemon: (id: string) => Promise<void>}){
    const position = isPlayer  ? 'bottom-10' : 'top-10'
    const label = isPlayer ? 'player' : 'enemy'

    const onSwitch = async (pokeId: string) => {
        if (!isPlayer) return

        await switchPokemon(pokeId)
    }

    return (
        <section className={`absolute flex items-center justify-center gap-1 ${position}`}>
            {Array.from({length: 6 - team.length}).map((_, i) => (
                <div key={`fake-card-${i}-${label}`} className="w-20 h-20 bg-black/50 rounded-sm text-6xl flex justify-center items-center">
                    ?
                </div>
            ))}
            {team.map(p => <BattlePokeCard key={p.pokemonId+`-${label}`} pokemon={p} switchPokemon={onSwitch} isCurrent={currentPokemon?.pokemonId === p.pokemonId} />)}
        </section>
    )
}