import { PokemonCard } from "./PokemonCard";
import { usePokedex } from "../hooks/usePokedex";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Filter } from "./Filter";
import { Pagination } from "./Pagination";
import type { PokedexPageInfo } from "../types/pokedex.types";
import { PokemonCardSkeleton } from "@/components/skeletons/PokemonCardSkeleton";

export function PokedexContainer({pokedexPage}:{pokedexPage: PokedexPageInfo }){
    const containerRef = useRef<HTMLDivElement>(null)
    const {pokemons, 
        hoverPokemon, 
        selectPokemon, 
        totalPages, 
        prevPage, 
        nextPage, 
        setPage, 
        loading,
        visiblePages,
        currentPage, filters, changeType, toggleShiny, toggleOrder} = usePokedex(pokedexPage)

    const animatedPageChange = (callback: () => void) => {
        const cards = containerRef.current?.querySelectorAll(".pokemon-card")

        if (!cards) return

        const tl = gsap.timeline()

        tl.to(cards, {
            opacity: 0,
            y: -30,
            duration: 0.25,
            stagger: 0.1,
            ease: "power2.in",
            onComplete: callback
        })
    }

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".pokemon-card", 
                { opacity: 0,y: 40, scale: 0.6 },
                { opacity: 1, y: 0, scale: 1, ease: "power3.out", duration: 0.6,stagger: 0.1}
            )
        }, containerRef)

        return () => ctx.revert()
    }, [pokemons])

    return (
        <div className="[grid-area:pokedex]">
            <Filter filters={filters} changeFilter={changeType} order={toggleOrder} toggleShiny={toggleShiny} />
            <div ref={containerRef} className="flex flex-wrap gap-1 max-w-2xl px-4 py-2 h-56">
                {loading ? 
                (Array.from({length: 12}).map((_, i) => <PokemonCardSkeleton key={`card-skeleton-${i}`}/>)) : 
                (
                    pokemons.map((p) => <PokemonCard key={p.uuid} pokemon={p} onHover={hoverPokemon} handleClick={selectPokemon} />)
                )}
            </div>
            <div>
                <Pagination visiblePages={visiblePages} currentPage={currentPage} totalPages={totalPages} nextPage={nextPage} prevPage={prevPage} setPage={setPage} animatedPageChange={animatedPageChange} />
            </div>
        </div>
    )
}