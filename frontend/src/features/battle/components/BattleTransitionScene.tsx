import { useBattleUIStore } from "@/features/battle/store/useBattleUIStore"
import { useBattleTransitionAnimation } from "../hooks/useBattleTransitionAnimation"

export function BattleTransitionScene() {
    const phase = useBattleUIStore(s => s.phase)
    const setPhase = useBattleUIStore(s => s.setPhase)
    
    const {rotateContainerRef} = useBattleTransitionAnimation(phase, setPhase)

    if (phase === "idle" || phase === "fighting") return null

    return (
        <div className="fixed inset-0 z-[9999]  bg-black w-[100vw] h-[100vh] overlay opacity-100">

            <div className="fixed inset-0 z-[50]  bg-black w-[100vw] h-[100vh] rotate-container" ref={rotateContainerRef}>
                <div className="triangulo t-upper"></div>
                
                <div className="triangulo t-lower"></div>
            </div>

            <div className="fixed top-1/2 left-1/2 -translate-1/2 z-[100] rounded-full h-40 w-40 flex justify-center items-center waiting-pokeball opacity-0 overflow-hidden">
                <div className="w-full h-full rounded-full flex flex-col waiting-pokeball-bg p-1">
                    <div className="bg-white w-full h-full relative t-half rounded-t-full border-b-1 border-[#b1332a]">
                        <div className="w-10 h-10 rounded-full absolute -bottom-11 left-1/2 -translate-1/2 border-2 border-[#b1332a] mid-circle z-40 bg-white flex items-center justify-center">
                            <span className="w-4 h-4 rounded-full flex pokeball-point shadow-black shadow"></span>
                        </div>
                    </div>
                    <div className="bg-white w-full h-full b-half relative -z-1 rounded-b-full border-t-1 border-[#b1332a]"></div>

                </div>
            </div>
        </div>
    )
}