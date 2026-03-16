import { useBattleStore } from "@/features/battle/store/useBattleStore" 
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef } from "react"

export function BattleTextBox() {
    const messages = useBattleStore(state => state.currentMessage)
    const containerRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        if (!containerRef.current) return

        const items = containerRef.current.children

        gsap.fromTo(
            items,
            { opacity: 0, y: 10 },
            {
                opacity: 1,
                y: 0,
                duration: 0.35,
                ease: "power2.out",
                stagger: 0.14
            }
        )

    }, [messages])

    if (!messages || messages.length === 0) return null

    return (
        <div className="absolute flex flex-col gap-1 pointer-events-none top-1 left-1">
            <div ref={containerRef} className="flex flex-col gap-1">
                {messages.map((m, i) => (
                    <div
                        key={i}
                        className="bg-black/40 backdrop-blur-md px-6 py-3 rounded-sm text-white text-[15px]"
                    >
                        {m}
                    </div>
                ))}
            </div>
        </div>
    )
}
