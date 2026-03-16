import type { BattlePokemon } from "@/interfaces/battlePokemon";
import { HPBar } from "./HPBar";

export function CurrentBattlePokemonCard({battlePokemon, currentHp, customStyles}:{battlePokemon:BattlePokemon | null, currentHp: number, customStyles?:string}){
    return (
        <div key={battlePokemon?.pokemonId + '-battle-card'} className={`flex items-center gap-2 ${customStyles}`}>
            <div className="bg-zinc-700/70 h-16 w-52 p-3 rounded-2xl flex flex-col justify-between">
                <div className="flex justify-between items-center ">
                    <p className="to-up">{battlePokemon?.name}</p>
                    <span className="text-zinc-300 to-up">Lv. {battlePokemon?.level || 1}</span>
                </div>
                <HPBar currentHp={currentHp || 0} maxHp={battlePokemon?.maxHp || 0} />
            </div>
            <div>
                <picture className="p-1 rounded-sm h-40 w-40 flex items-center justify-center bg-zinc-800/80">
                    <img src={battlePokemon?.sprites.mainImage} className="w-auto m-auto appear" alt="current battle pokemon image"/>
                </picture>
            </div>
        </div>
    )
}