import { useRef } from "react";
import gsap from "gsap";
import { playSound } from "@/features/audio/utils/playSound";
import { useGSAP } from "@gsap/react";

export function EnvelopeLoading() {
    const envelopeRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        playSound("openPack")

        const tl = gsap.timeline({ repeat: -1, yoyo: true });

        // Float
        tl.to(
            envelopeRef.current,
            {
                y: -12,
                duration: 1.2,
                ease: "power1.inOut",
            },
            0,
        );

        // slight vibration (energi)
        gsap.to(envelopeRef.current, {
            rotation: 1.5,
            duration: 0.08,
            repeat: -1,
            yoyo: true,
            ease: "none",
        });

        // Glow pulsing
        gsap.to(glowRef.current, {
            scale: 1.25,
            opacity: 1,
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });

        return () => {
            gsap.killTweensOf(envelopeRef.current);
            gsap.killTweensOf(glowRef.current);
        };
    }, []);

    return (
        <div className="absolute bg-black z-40  top-0 left-0 right-0 bottom-0 flex justify-center items-center">
            <div className="relative flex items-center justify-center w-40 h-56">
                <div
                ref={glowRef}
                className="absolute w-48 h-64 rounded-full bg-yellow-400/40 blur-3xl opacity-60"
                />

                <div
                    ref={envelopeRef}
                    className="relative z-10 w-36 h-52 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-xl shadow-2xl border-4 border-white/30 flex flex-col items-center justify-center px-4"
                >

                    <img src="/envelopeOpenImage.webp" alt="image of pikachu open a pokeball" />
                    <span className="text-white font-bold text-sm">Opening...</span>
                </div>
            </div>
        </div>
    );
}
