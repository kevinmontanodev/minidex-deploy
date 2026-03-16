import type { LoginRequest, LoginResponse, RegisterRequest } from "@/server/types/auth.types"
import { backendFetch } from "./backend.client"

export function fetchLogin(credentials: LoginRequest){
    return backendFetch<LoginResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials)
    })
}

export function fetchRegister(newUserData: RegisterRequest){
    return backendFetch<LoginResponse>("/auth/register", {
        method: "POST",
        body: JSON.stringify(newUserData)
    })
}