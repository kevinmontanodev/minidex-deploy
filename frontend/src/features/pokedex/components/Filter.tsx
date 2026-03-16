import { useEffect, useRef, useState } from "react"
import { TYPES_FILTERS } from "../utils/typesFilters"
import { FilterOption } from "./FilterOption"
import gsap from "gsap"
import type { Filter, FilterProps } from "../types/pokedex.types"

export function Filter({filters, changeFilter, toggleShiny, order}: FilterProps ){
    const [showOptions, setShowOptions] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    
    useEffect(() => {
        if (!showOptions) return

        const ctx = gsap.context(() => {
            gsap.fromTo(".filter-option", 
                { opacity: 0,y: 40, scale: 0.6 },
                { opacity: 1, y: 0, scale: 1, ease: "power3.out", duration: 0.4,stagger: 0.1}
            )
        }, containerRef)

        return () => ctx.revert()
    }, [showOptions])

    const closeOptions = () => {
        gsap.to('.filter-option', {
            opacity: 0,
            y:40,
            scale: 0.6,
            stagger: {each: 0.03, from: "end"},
            duration: 0.3,
            onComplete: () => setShowOptions(false)
        })
    }

    return (
        <div className="flex items-center justify-end">
            <div className="flex items-center gap-2 px-2 text-white">
                <div className="flex items-center gap-2 px-2">
                    <p>
                        Order
                    </p>
                    <div className={`flex items-center w-10 h-5 bg-white/20 p-1 rounded-full cursor-pointer`} onClick={order}>
                        <span className={`flex h-4 w-4 rounded-full transition-all duration-300 ${filters.orderByPokedex ? 'ml-4 bg-violet-700' : 'ml-0 bg-white'}`}></span>
                    </div>
                </div>
                <div className="flex items-center gap-2 px-2 relative">
                    <p>
                        Filter 
                    </p>
                    <picture className="cursor-pointer h-8 flex items-center" onClick={() => setShowOptions(!showOptions)}>
                        <img src={TYPES_FILTERS[filters.type]} alt="" className="w-24 flex" />
                    </picture>
                    {
                        showOptions &&
                        (<div className="select absolute top-8 right-0 h-64 overflow-hidden overflow-y-scroll z-50 option-container" ref={containerRef}>
                            {Object.keys(TYPES_FILTERS).map(key => <FilterOption key={`filter-${key}`} type={key} iconUrl={TYPES_FILTERS[key]} selectFilter={(type) => {
                                closeOptions()
                                changeFilter(type)
                            }} />)}
                        </div>)
                    }
                </div>
                <div className="flex items-center gap-2">
                    <p className={`${filters.shiny ? 'text-amber-300' : 'text-white'}`}>
                        Shiny
                    </p>
                    <div className={`flex items-center w-10 h-5 bg-white/20 p-1 rounded-full cursor-pointer`} onClick={toggleShiny}>
                        <span className={`flex h-4 w-4 rounded-full transition-all duration-300 ${filters.shiny ? 'ml-4 bg-amber-400' : 'ml-0 bg-white'}`}></span>
                    </div>
                </div>
            </div>
        </div>
    )
}