import type { Pokemon } from "@/interfaces/pokemon";
import { usePokemonActions } from "../hooks/usePokemonActions";
import { Button } from "@/components/ui/Button";
import { Coins } from "@/components/icons/Coins";
import { EvolutionModal } from "./EvolutionModal";
import { AddIcon } from "@/components/icons/AddIcon";
import { RemoveIcon } from "@/components/icons/RemoveIcon";
import { EvolutionIcon } from "@/components/icons/EvolutionIcon";

export function PokemonActions({pokemon}:{pokemon:Pokemon}){
    const {isAlreadyInTeam, 
        handleAddToTeam, 
        handleRemoveFromTeam, 
        handleTransfer,
        canEvolve,
        evolPokemon,
        openEvolvedModal, isEvolved, closeEvolvedModal} = usePokemonActions(pokemon)
    
    return (
        <>
            <div className="flex justify-center flex-wrap items-end pb-3 gap-1 max-w-68 h-28">
                {canEvolve && (
                    <Button customStyle="flex gap-1 bg-white/10 text-sm" onClick={openEvolvedModal}>
                        Evolve <EvolutionIcon customStyle="size-5" />
                    </Button>
                )}
                {isAlreadyInTeam ? (
                    <Button customStyle="flex gap-1 bg-white/10 text-sm" onClick={handleRemoveFromTeam} title="remove from team">
                        Leave <RemoveIcon customStyle="size-5"  />
                    </Button>
                ) : (
                    <Button customStyle="flex gap-1 bg-white/10 text-sm" onClick={handleAddToTeam}  title="add to team">
                        Join <AddIcon customStyle="size-5" />
                    </Button>
                )}

                <Button customStyle="flex bg-white/10 gap-1 text-sm" onClick={handleTransfer}>
                    Transfer <Coins customStyle="size-5" />
                </Button>
            </div>
        
            {isEvolved && <EvolutionModal currentPokemon={pokemon} closeModal={closeEvolvedModal} evolvePokemon={evolPokemon} />}
        </>
    )
}