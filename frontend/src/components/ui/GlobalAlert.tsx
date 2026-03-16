import { useState } from "react"
import { useAlertStore } from "@/stores/useAlertStore"
import { Button } from "./Button"

export function GlobalAlert(){
    const {state, close} = useAlertStore((state) => state)
    const [closing, setClosing] = useState(false)

    if (!state.show && !closing) return null

    const handleClose = (value?: boolean) => {
        setClosing(true)

        setTimeout(() => {
            state.resolve?.(value ?? false)
            close()
            setClosing(false)
        }, 300)
    }


    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center">
            <div 
            onClick={() => handleClose(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm  fade-backdrop" 
            />

            <div
                className={`w-72 rounded-md relative z-50 p-4 text-white shadow-2xl
                ${closing ? 'on-closing' : 'to-up'}
                bg-gradient-to-br from-[#bb05d3] via-[#4f0faf] to-[#06076d]`} 
            >
                <h5 className="text-center text-xl mb-2">
                    {state.title}
                </h5>

                <p className="mb-4 text-center">{state.message}</p>

                <div className="flex justify-center gap-2">
                    {state.mode === "confirm" ? (
                        <>
                            <button
                                onClick={() => handleClose(false)}
                                className="px-3 py-1 bg-black/10 rounded cursor-pointer hover:bg-white/10 transition-all text-sm"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={() => handleClose(true)}
                                className="px-3 py-1 bg-black/10 rounded cursor-pointer hover:bg-white/10 transition-all text-sm"
                            >
                                Confirm
                            </button>
                        </>
                    ): (
                        <Button customStyle="bg-black/10 hover:bg-white/10 text-sm" onClick={() => handleClose()}>OK</Button>
                    )}
                
                </div>
            </div>
        </div>
    )
}