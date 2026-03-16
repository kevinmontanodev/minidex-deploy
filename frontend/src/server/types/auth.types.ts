import type { TrainerResponse } from "./trainer.types"

export interface LoginRequest {
    username:string
    password: string
}

export interface LoginResponse {
    token: string
    trainerDTO: TrainerResponse
}


export interface RegisterRequest {
    name: string
    username: string
    password:string
}