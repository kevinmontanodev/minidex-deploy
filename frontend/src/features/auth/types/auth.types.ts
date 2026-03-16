import type { Trainer } from "@/interfaces/trainer"
import type { ChangeEvent } from "react"

export interface UserData {
    name: string
    username: string
    password: string
}

export interface UseAuthReturns{
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void
    changeLoginForm : () => void
    isLogin: boolean,
    submitTrainer: () => Promise<{ok:boolean}>,
    userData: UserData
}

export interface AuthResponse {
    success: boolean
    message?: string
    trainer?: Trainer
}