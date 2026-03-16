import { useEffect, useRef } from "react"
import type { PurchaseSpecialPokemonModalProps } from "../types/shop.types"
import gsap from "gsap"

export function PurchaseSpecialPokemonModal({snapshotPokemon, showAcquire, setShowAcquire}: PurchaseSpecialPokemonModalProps){
    const containerRef = useRef(null)

    useEffect(() => {
        if (!showAcquire) return

        const tl = gsap.timeline({
            onComplete: () => {
                setShowAcquire(false)
            }
        })

        gsap.set(".acquire-pokemon", {
            scale: 0.6,
            rotate: 0,
            filter: "drop-shadow(0 0 0px white)"
        })

        tl.fromTo(".acquire-backdrop",
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.6 }
        )

        tl.to(".acquire-pokemon", {
            scale: 1.4,
            duration: 1,
            ease: "power3.out"
        })

        tl.to(".acquire-pokemon", {
            rotate: 360,
            duration: 2,
            ease: "none"
        })

        tl.to(".acquire-pokemon", {
            filter: "drop-shadow(0 0 35px #00ffff)",
            duration: 1.5
        }, "-=1.5")

        tl.to(".acquire-text", {
            autoAlpha: 1,
            y: 10,
            duration: 1
        })

        tl.to(".acquire-pokemon", {
            autoAlpha: 0,
            duration: 1.3
        })

        tl.to(".acquire-text", {
            autoAlpha: 0,
            y: 20,
            duration: 0.6
        })

        tl.fromTo(".acquire-backdrop",
            { autoAlpha: 1 },
            { autoAlpha: 0, duration: 0.8 }
        )

    }, [showAcquire])

    return (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center acquire-backdrop">
            <div ref={containerRef} className="relative flex justify-center flex-col">
                <img
                    className="acquire-pokemon w-40 shiny mx-auto"
                    src={snapshotPokemon.image}
                />
                <p className="acquire-text opacity-0 text-center mt-4 text-white">
                    {snapshotPokemon.name} joined your collection!
                </p>
            </div>
        </div>
    )
}