import { useRef } from "react";
import { gsap } from "gsap";
import type { PackPokemon } from "@/interfaces/pokemon";
import { CARD_RARITY } from "../const/cardRarityColors";
import { playSound } from "@/features/audio/utils/playSound";
import { useGSAP } from "@gsap/react";

export default function PackOpening({ pokemons }: {pokemons: PackPokemon[]}) {
    const containerRef = useRef(null);

    useGSAP(() => {
        if (!pokemons?.length) return;

        const ctx = gsap.context(() => {

            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.to(".pack-card", {
                scale: 1,
                
                opacity: 1,
                stagger: 0.7,
                y: 0,
                duration: 0.8
            })
            .to(".pokemon-name", {
                opacity: 1,
                y: 0,
                stagger: 0.7,
                fontSize: 12,
            }, "+=0.4")
            .to(".pokemon-img", {
                opacity: 1,
                scale: 1,
                stagger: 0.8
            }, "+=0.4")
            .call(() => {
                playSound("showPokemonPack")
            }, [], "<");

        }, containerRef);


        return () => ctx.revert();
    }, [pokemons]);

    return (
        <div ref={containerRef} className="pack-container flex gap-4">
            {pokemons.map((p, i) => (
                <div key={i} className="pack-card rounded shadow-md h-32 w-28"
                    style={{ 
                    "--rarity-main": CARD_RARITY[p.rarity].main,
                    "--rarity-dark" : CARD_RARITY[p.rarity].dark,
                    "--rarity-accent" : CARD_RARITY[p.rarity].accent
                    } as React.CSSProperties}
                >
                    <img className={`pokemon-img ${p.shiny ? "shiny" : "normal"} w-24 h-24 mx-auto`} src={p.image} />
                    <p className={`pokemon-name capitalize text-xs text-center ${p.shiny ? "text-amber-400" : "text-white"}`}>{p.name}</p>
                </div>
            ))}
        </div>
    );
}
