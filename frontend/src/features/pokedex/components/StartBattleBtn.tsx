import gsap from "gsap";
import { Button } from "@/components/ui/Button";
import { navigate } from "astro:transitions/client";
import { useAudioStore } from "@/features/audio/store/useAudioStore";
import { useAlertStore } from "@/stores/useAlertStore";
import { useMiniDexStore } from "@/stores/useMiniDexStore";

export function StartBattleBtn (){
    const stopAudio = useAudioStore(s => s.stopBgm)
    const pokemonTeam = useMiniDexStore(s => s.pokemonTeam)
    const {alert} = useAlertStore()
    
    const launchBattle = async () => {

        if (pokemonTeam.length < 6) {
            alert("Not enouth Pokemons", "You don't have enought pokemons in your team")
            return
        }
        stopAudio()
        const tl = gsap.timeline()
   
        tl.to('.overlay-pokedex', {zIndex: 100, opacity: 1, duration: 0.8})
        .call(() => {
            navigate("/trainers/battle")
        })
    }

    return (
        <>
            <Button onClick={launchBattle} customStyle="m-auto bg-white/20 flex mt-1.5 text-white">
                Go to battle
            </Button>
        </>
    )
}