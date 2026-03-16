import { useMiniDexStore } from "@/stores/useMiniDexStore"
import { Move } from "./Move"
import { Stats } from "./Stats"
import { DetailWrapper } from "./DetailWrapper"
import { HeaderPokemonDetails } from "./HeaderPokemonDetails"
import { PokemonActions } from "./PokemonActions"


export function PokemonDetails() {
    const currentPokemon = useMiniDexStore((state) => state.currentPokemonDetails)
     
    if (!currentPokemon) return <section className="[grid-area:pokemonDetail] bg-black/20 rounded-sm overflow-hidden text-white">Select Pokemon</section>

    return (
        <>
            <section className="[grid-area:pokemonDetail] bg-black/20 rounded-sm overflow-hidden" key={currentPokemon.uuid + ' detailPokemon'}>
                <h2 className={`px-2 py-1 ${currentPokemon.shiny ? "bg-amber-400 shiny text-white" : "bg-white/80"}`}>{currentPokemon.name.toLocaleUpperCase()}</h2>
                <article className="px-2 text-white py-2 grid grid-cols-2 gap-2">
                    <div className="flex flex-col gap-1">
                        <HeaderPokemonDetails pokemonName={currentPokemon.name} numPokedex={currentPokemon.numPokedex} types={currentPokemon.types} isShiny={currentPokemon.shiny} />

                        <div className="grid grid-cols-2 gap-1">
                            <Stats stats={currentPokemon.stats} />
                            <DetailWrapper customStyles="">
                                <h4 className="bg-black/10 px-2 py-1">Details</h4>
                                <div className="px-2">
                                    <p className="stat">{currentPokemon.rarity}</p>
                                    <p className="stat">LEVEL {currentPokemon.level}</p>
                                </div>
                            </DetailWrapper>
                        </div>

                        

                        <DetailWrapper>
                            <h4 className="bg-black/10 px-2 py-1">Moves</h4>
                            <div className="px-2 pb-2 grid grid-cols-2 gap-2">
                                {
                                    currentPokemon.moves.map((m) => <Move key={m.moveName} move={m} />)
                                }
                            </div>
                        </DetailWrapper>

                    </div>
                    <div className="flex flex-col justify-between items-center">
                        <figure>
                            <img src={currentPokemon.sprites.mainImage} className="appear opacity-0 w-72" alt={`image of ${currentPokemon.name}`} />
                        </figure>
                        <PokemonActions pokemon={currentPokemon} />
                    </div>
                </article>
            </section>
        </>
    )
}