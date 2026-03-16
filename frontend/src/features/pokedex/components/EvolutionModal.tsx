import { CloseIcon } from "@/components/icons/CloseIcon"
import { Coins } from "@/components/icons/Coins"
import { RowIcon } from "@/components/icons/RowIcon"
import { Button } from "@/components/ui/Button"
import { useAlertStore } from "@/stores/useAlertStore"
import gsap from "gsap"
import { useEffect, useRef, useState } from "react"
import { EVOLUTION_COST, MIN_LEVEL_TO_EVOLVE } from "../const/const.utils" 
import { useMiniDexStore } from "@/stores/useMiniDexStore"
import type { EvolutionModalProps } from "../types/pokedex.types"
import { playSound } from "@/features/audio/utils/playSound"

export function EvolutionModal({currentPokemon,closeModal, evolvePokemon} : EvolutionModalProps){
    const [animate, setAnimate] = useState(false)
    const trainer = useMiniDexStore(s => s.trainer)
    const [basePokemon] = useState(currentPokemon)
    const {confirm, alert} = useAlertStore()
    const containerRef = useRef(null)

    const evolve = async () => {
        const evol = await confirm("Evolution Pokemon", `Wish to evolve ${currentPokemon.name} to ${currentPokemon.nextEvolution?.name}`)
        
        if (!evol) return
        
        if (!currentPokemon.canEvolve){
            alert("Pokemon Can't Evolve", `Does the Pokémon need to reach the level ${MIN_LEVEL_TO_EVOLVE} to evolve, or has it already reached its final evolution`)
            return
        }
        
        if (!trainer || trainer?.coins < EVOLUTION_COST){
            alert("Not Enough coins", "You don't have enough coins")
            return
        }

        // change animate to true and feching pokemon in background then close modal
        setAnimate(true)
    }

    const closingModal = () => {
        const tl = gsap.timeline({
            onComplete: () => {
                closeModal()
            }
        })

        tl.to(".modal-backdrop", {
            autoAlpha: 0,
            duration: 0.3
        }, 0);


        tl.to(containerRef.current, {
            scale: 0.8,
            y: 40,
            autoAlpha: 0,
            duration: 0.35,
            ease: "power2.in"
        })
    }

    useEffect(() => {
        if (!animate) return 
        
        const ctx = gsap.context(() => {

            const tl = gsap.timeline({
                onComplete: () => {
                    void evolvePokemon()
                }
            });

            // init states
            gsap.set(".result-text", {autoAlpha: 0, y: 20})

            tl.call(() => {
                playSound("evolution")
            })
            // fadeout ui
            tl.to(".ui, .arrow, .next-poke", {
                autoAlpha: 0,
                y: -10,
                duration: 0.4,
                stagger: 0.05
            });

            tl.to(".current-poke", {
                scale: 2.5,
                duration: 0.6,
                ease: "power2.inOut",
                x: 75,
                y: -15
            });


            // glow power up
            tl.to(".current-poke img", {
                filter: "drop-shadow(0 0 35px white) brightness(6)",
                duration: 0.6
            });

            // shake
            tl.to(containerRef.current, {
                x: "+=8",
                yoyo: true,
                repeat: 5,
                duration: 0.1
            }, "-=0.3");

            tl.to(".flash-overlay", {
                opacity: 1,
                duration: 0.6
            });

            tl.to(".current-poke", {scale: 0})

            // change pokemon
            tl.set(".current-poke", { autoAlpha: 0 });
            tl.set(".next-poke", { autoAlpha: 1 , scale: 2, x: -75});

            // small "rebouns" of appearance
            tl.fromTo(".next-poke",
                { scale: 0.8 },
                { scale: 1.4, duration: 0.3, ease: "back.out(2)" }
            );

            // flash out
            tl.to(".flash-overlay", {
                opacity: 0,
                duration: 0.5
            });

            tl.to(".next-poke img", {
                filter: "drop-shadow(0 0 25px #00ffff)",
                duration: 0.4,
            });

            tl.to(".result-text", {
                autoAlpha: 1,
                y: -10,
                duration: 0.5
            });

            tl.to(".close-btn", {
                autoAlpha: 1,
                duration: 0.5
            });

            }, containerRef);

            return () => ctx.revert();
        
    }, [animate])

    const path = `${basePokemon.shiny ? 'shiny/': ''}${basePokemon.nextEvolution?.numPokedex}.png`
    const nextEvolutionImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${path}` 

    return (
        <div className="modal-backdrop absolute top-0 bottom-0 left-0 right-0 bg-black z-40 flex justify-center items-center" ref={containerRef}>
            <div className="bg-white/10 text-white px-3 pt-3 pb-1 rounded-md text-center relative overflow-hidden" >
                <div className="flash-overlay" />

                <Button customStyle="absolute top-1 right-0 p-1 close-btn opacity-0" onClick={closingModal}>
                    <CloseIcon customStyle="hover:rotate-90 transition-all duration-400"/>
                </Button>
                <div className="ui">
                    <h4 className="font-semibold text-xl">Evolve Pokemon</h4>
                    <p>Evolve {basePokemon.name} to {basePokemon.nextEvolution?.name}?</p>
                </div>
                    <div className="flex gap-2 items-center justify-center">
                        <picture className="h-20 flex current-poke w-20">
                            <img src={basePokemon.sprites.mainImage} alt="" className={`appear`} />
                        </picture>
                        <div className="">
                            <RowIcon customStyle="size-14 arrow"/>
                        </div>
                        <picture className="h-20 flex next-poke w-20">
                            <img src={nextEvolutionImage} alt="" className={`appear`}  />
                        </picture>
                    </div>
                    <div className="flex gap-2 justify-center pt-2 ui">
                        <Button onClick={evolve} customStyle="bg-white/10 text-sm flex items-center gap-1">
                            <Coins customStyle="size-4"/> 100
                        </Button>
                        <Button onClick={closingModal} customStyle="bg-white/10 text-sm">
                            Cancel
                        </Button>
                    </div>
                    <p className="result-text opacity-0">{basePokemon.name} a evolucionado a {basePokemon.nextEvolution?.name}</p>
            </div>
        </div>
    )
}