import type { BattlePhase } from "../types/battle.types";
import { useGSAP } from "@gsap/react";
import gsap from "gsap"
import { useEffect, useRef } from "react";
import type { UseBattleTransitionAnimationReturn } from "../types/battle.types";
import { playSound } from "@/features/audio/utils/playSound";

export function useBattleTransitionAnimation(phase: string, setPhase: (phase: BattlePhase) => void) : UseBattleTransitionAnimationReturn {
    const rotateRef = useRef<gsap.core.Tween | null>(null)
    const hasOpenedRef = useRef(false)
    const rotateContainerRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        document.body.classList.toggle(
            "battle",
            phase !== "idle"
        )
    }, [phase])

    useEffect(() => {
        if (phase === "idle") {
            hasOpenedRef.current = false
        }
    }, [phase])

    const startRotating = () => {
        const rotateOnce = () => {
            console.log("rotate")
            rotateRef.current = gsap.to(rotateContainerRef.current, {
                rotate: "+=180",
                duration: 1.5,
                ease: "power2.inOut",
                onComplete: () => {
                    gsap.delayedCall(2, rotateOnce)
                }
            })
        }

        rotateOnce()
    }

    useGSAP(() => {
        if (phase !== "opening") return
        if (hasOpenedRef.current) return

        hasOpenedRef.current = true

        const tl = gsap.timeline()
        gsap.set(".overlay-battle-camp", {opacity: 0})

        tl.fromTo(".t-upper", 
            {xPercent: 100},
            {xPercent: 0, duration: 0.8}
        )
        .fromTo(".t-lower", 
            {xPercent: -100},
            {xPercent:0, duration: .8},
             "<"
        )
        .to(".waiting-pokeball", {
            opacity: 1,
            duration: .8
        })
        tl.call(() => {
            playSound("battleAwait")
        })
        .fromTo(".t-half",
            {yPercent: -140},
            {yPercent: 0, duration: 0.5}
        )
        .fromTo(".b-half",
            {yPercent: 110},
            {yPercent: 0, duration: 0.5},
            "<"
        )
        .to(".waiting-pokeball-bg", {
            "--p-opacity": 1,
            duration: 0.5,
        })
        .to(rotateContainerRef.current, {
            scale: 2.5
        })
        .call(startRotating)

    }, [phase])


    useGSAP(() => {
        if (phase !== "closing") return

        const tl = gsap.timeline()

        tl.to('.overlay-battle-camp', {opacity: 0, zIndex: -100})
        tl.to(".waiting-pokeball", {
            yoyo: true,
            repeat: 9,
            x: 10,
            y: 10,
            duration: .05,
            ease: "rough"
        })
        .to(".waiting-pokeball-bg", {
            "--p-opacity": 0,
            duration: 0.5,
        })
        .call(() => {
            playSound("pokemonOut")
        })
        .fromTo(".t-half",
            {yPercent: 0},
            {yPercent: -140, duration: 0.5}
        )
        .fromTo(".b-half",
            {yPercent: 0},
            {yPercent: 110, duration: 0.5},
            "<"
        )
        .to(".waiting-pokeball", {
            opacity: 0,
            duration: .3
        })

        .fromTo(".t-upper", 
            {xPercent: 0},
            {xPercent: 115, duration: 0.8}
        )
        .fromTo(".t-lower", 
            {xPercent: 0},
            {xPercent: -115, duration: .8},
             "<"
        )
        tl.to(".overlay", {
            opacity: 0,
            duration: 1.3
        })
        .to(rotateContainerRef.current, {
            scale: 1.5
        })
        .call(() => {
            setPhase("fighting")
            rotateRef.current?.kill()
        })

    }, [phase])

    return {
        rotateContainerRef
    }
}