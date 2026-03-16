import { useMiniDexStore } from "@/stores/useMiniDexStore"
import { Coins } from "@/components/icons/Coins"
import { useEffect } from "react"
import type { TrainerProfile } from "../types/trainer.types"

export function TrainerInfo({trainerResponse}:{trainerResponse:TrainerProfile}){
    const setTrainer = useMiniDexStore(s => s.setTrainer)
    const trainer = useMiniDexStore(s => s.trainer)
    
    useEffect(() => {
        const {caughtPokemons, ...trainerData} = trainerResponse
        setTrainer({...trainerData})
    }, [])

    return (
        <article className="rounded-md p-2 bg-gradient-to-br from-[#1500F7] via-[#6D02C6] to-[#CB0492] min-w-[250px] w-full">
            <div className="flex gap-2 justify-center items-center pb-2">
                <h4 className="text-white text-center text-2xl">{trainer?.name.toLocaleUpperCase()}</h4>
                <img src="/pokemon-trainer.png" alt="default trainer img" className="w-9" />
            </div>
            <div className="grid grid-cols-2 gap-2 text-center items-center text-white">
                <div className="flex flex-col justify-center items-center bg-white/20 px-4 rounded-md">
                    <p>Tus Monedas</p>
                    <span className="text-xl flex gap-1.5"><Coins/> {trainer?.coins}</span>
                </div>
                <div className="flex flex-col justify-center items-center bg-white/20 px-4 rounded-md">
                    <p>Nivel</p>
                    <span className="flex text-xl bg-white/40 h-6 w-6 rounded-full justify-center items-center mb-1">{trainer?.level}</span>
                </div>
            </div>
        </article>
    )
}