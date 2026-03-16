import { useState, type FormEvent } from "react"
import { CloseIcon } from "@/components/icons/CloseIcon"
import type { UpdateTrainerFormProps } from "../types/trainer.types"

export function UpdateTrainerForm({userData, updateTrainer, closeModal, handleChange}: UpdateTrainerFormProps){
    const [isClosing, setIsClosing] = useState(false)

     const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        await updateTrainer()
    }

    const closing = () => {
        setIsClosing(true)
        setTimeout(() => {
            closeModal()
        }, 500)
    }

    return (
        <div className="fixed inset-0 bg-black/90 flex justify-center items-center">
            <form onSubmit={handleSubmit} className={`flex flex-col gap-2 h-60 bg-white/20 p-4 rounded-md relative opacity-0 ${isClosing ? 'on-closing' : 'fade-in'}`}>
                <button className="absolute right-2 top-2 cursor-pointer" type="button" onClick={closing}>
                    <CloseIcon customStyle="hover:rotate-90 hover:scale-105 transition-all duration-500" />
                </button>
                <h2 className="text-center text-2xl font-bold text-white/90 pb-2">Update Trainer Data</h2>
                <fieldset>
                    <input type="text" value={userData?.name} name="name" placeholder="Enter your name" required onChange={handleChange}
                    className={`bg-zinc-200/40 p-2 rounded-md outline-0`}
                    />
                </fieldset>

                <fieldset>
                    <input type="text" value={userData?.username} name="username" placeholder="Enter your new username" required onChange={handleChange}
                    className="bg-zinc-200/40 p-2 rounded-md outline-0 "
                    />
                </fieldset>

                <fieldset className="flex justify-center">
                    <button className="px-4 py-1 rounded-md text-zinc-100 bg-gradient-to-tl from-[#CB0492] via-[#6D02C6] to-[#1500F7] cursor-pointer hover:scale-105 transition-all">Update</button>
                </fieldset>
            </form>
        </div>
    )
}