import type { FilterOptionProps } from "../types/pokedex.types";

export function FilterOption({type, iconUrl, selectFilter}: FilterOptionProps){
    
    return (
        <button onClick={() => selectFilter(type)} className="pb-1 flex cursor-pointer filter-option">
            <img src={iconUrl} alt={`icon of ${type} pokemon type`} className={`w-24`} />
        </button>
    )
}