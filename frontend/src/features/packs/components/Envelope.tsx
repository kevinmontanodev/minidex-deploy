import {  useState } from "react";
import type { PackPokemon } from "@/interfaces/pokemon";
import PackOpening from "./PackOpening";
import { CloseIcon } from "@/components/icons/CloseIcon";

export function Envelope({id, pokemons, consumeEnvelope}:{id:string ,pokemons: PackPokemon[], consumeEnvelope: () => void}){
    const [status, setStatus] = useState({
        isOpen: false,
        isClosing: false
    })   

    const handleCloseModal = () => {
        setStatus(prev => ({
            ...prev,
            isClosing: true
        }))

        setTimeout(() => {
            consumeEnvelope()
        }, 450)
    }

    return (
        <article className={`flex justify-center items-center fixed inset-0 z-40 bg-black/70 ${status.isClosing ? 'on-closing' : 'show-up'}`}>
            <div className={`flex flex-col gap-2 bg-gradient-to-tl from-[#1500F7] via-[#6D02C6] to-[#CB0492] p-4 rounded-sm relative ${status.isClosing ? 'on-closing' : 'show-up'}`}>
                <button className="absolute right-2 top-2 cursor-pointer text-white hover:rotate-90 transition-all hover:scale-110" onClick={handleCloseModal}>
                    <CloseIcon/>
                </button>
                <h4 className="text-center text-white font-semibold text-xl">Felicidades!</h4>
                <p className="text-center text-white">Has conseguido</p>
                    <PackOpening pokemons={pokemons} />
                <div className="flex gap-4 overflow-hidden pack-card rarity-epic">
                </div>
            </div>
        </article>
    )
}