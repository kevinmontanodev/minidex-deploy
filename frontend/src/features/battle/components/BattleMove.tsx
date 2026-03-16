import { TYPES_ICONS_URL } from "@/features/pokedex/utils/typesIconsUrl";
import type { Move } from "@/interfaces/pokemon";

export function BattleMove({move, selectMove, isSelected}: {move:Move, selectMove: (moveName:string) => void, isSelected:boolean}){
    return (
        <button disabled={isSelected} className={`${isSelected ? 'bg-black/50 cursor-not-allowed' : 'bg-black/30 cursor-pointer'} rounded-sm p-1 show-up`} onClick={() => selectMove(move.moveName)}>
            <p >{move.moveName.toUpperCase()}</p>
            <picture>
                <img src={TYPES_ICONS_URL[move.type]} alt={`icons image of move ${move?.moveName} of ${move.type} type`} />
            </picture>
        </button>
    )
}