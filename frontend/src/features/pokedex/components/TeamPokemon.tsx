import type { Pokemon } from "@/interfaces/pokemon"
import { PokemonCard } from "@/features/pokedex/components/PokemonCard"
import { PokemonCardSkeleton } from "@/components/skeletons/PokemonCardSkeleton"
import { usePokemonTeam } from "../hooks/usePokemonTeam"
import { AnimatePresence, motion } from "framer-motion"
import { useMiniDexStore } from "@/stores/useMiniDexStore"
import { useBgm } from "@/features/audio/hooks/useBgm"

export function TeamPokemon({pokemonTeamFromRequest} : {pokemonTeamFromRequest: Pokemon[]}){
    const { pokemonTeam, removeFromTeam, spaceToFill } = usePokemonTeam(pokemonTeamFromRequest)
    const setCurrentPokemonDetails = useMiniDexStore(s => s.setCurrentPokemonDetails)
    useBgm("menu")

    return (
        <section className="bg-black/20 rounded overflow-hidden">
            <h4 className="text-center text-white bg-white/40 py-1">Team</h4>
            <motion.article
                layout
                className="flex gap-1 py-2 px-4 justify-start"
            >
                <AnimatePresence>
                    {pokemonTeam?.map((p) => (
                        <motion.div
                            key={`${p.uuid}-team`}
                            layout
                            initial={{opacity: 0, scale: 0.9}}
                            animate={{opacity: 1, scale: 1}}
                            exit={{opacity: 0, scale: 0.8}}
                            transition={{type: "spring", stiffness: 300, damping: 25}}
                        >
                            <PokemonCard pokemon={p} handleClick={() => removeFromTeam(p.uuid)} onHover={() => setCurrentPokemonDetails(p)} isTeamCard={true} />
                        </motion.div>
                    ))}
                    {Array.from({length: spaceToFill}).map((_, i) => (
                        <motion.div 
                            key={`team-card-skeleton-${i}`}
                            layout
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                        >
                            <PokemonCardSkeleton heigth="h-28" animate={false} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            
            </motion.article>
        </section>
    )
}