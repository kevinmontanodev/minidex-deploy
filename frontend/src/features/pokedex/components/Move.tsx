import type { Move } from "@/interfaces/pokemon"
import { TYPES_ICONS_URL } from "../utils/typesIconsUrl"

export function Move({move}: {move: Move}){
    const iconUrl = TYPES_ICONS_URL[move.type]

    return (
        <div className="bg-black/5 rounded-md p-2 growth h-[85px]">
            <p className="text-center text-sm font-semibold">{move.moveName.toUpperCase()}</p>
            <img src={iconUrl} alt="type icon image" className="w-22 mx-auto" />
            <div className="grid grid-cols-2 text-xs text-center">
                <div>
                    <p>Power</p>
                    <p>{move.power}</p>
                </div>
                <div>
                    <p>Accuracy</p>
                    <p>{move.accuracy}</p>
                </div>
            </div>
        </div>
    )
}