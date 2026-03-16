import type { Trainer } from "@/interfaces/trainer"
import type { ChangeEvent } from "react"
import type { TrainerProfile } from "../components/TrainerProfile"

// data helper
export interface UserData {
    name: string
    username: string
}

// hooks
export interface UseTrainerReturn {
    showModal:boolean
    caughtPokemons: number,
    userData: UserData
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void
    updateTrainer : () => Promise<void>
    openModal: () => void
    closeModal: () => void,
    trainer: Trainer | null
}

// components
export interface UpdateTrainerFormProps{
    userData:UserData
    updateTrainer: () => Promise<void>
    closeModal:() => void
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void 
}


// responses
export interface TrainerProfile {
    name: string
    username: string
    level: number
    xp: number
    coins: number,
    wins: number,
    loses: number,
    caughtPokemons: number
}