import type { AuthResponse } from "../types/auth.types";

export const authRegister = async (name: string, username: string, password:string): Promise<AuthResponse> => {
    try {
        const res = await fetch('/api/auth/register', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({name, username, password})
        })

        const data = await res.json()

        if (!res.ok) {
            return { success: false, message: data.messages || 'Registration failed' };
        }

        return {success: true, trainer: data}
    } catch (error) {
        return {success: false, message: 'Server connection error'}
    }
}


export const authLogin = async (username: string, password:string) : Promise<AuthResponse> => {
    try {
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({username, password})
        })

        const data = await res.json()

        if (!res.ok){
            return {success:false, message: data.message || "Invalid credentials"};
        }

        return {success: true, trainer: data}

    } catch (error) {
        return {success: false, message: "Server connection error"}
    }
    
}
