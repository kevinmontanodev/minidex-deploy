import { fetchLogin, fetchRegister } from "../clients/auth.client";
import type { LoginRequest, RegisterRequest } from "../types/auth.types";

export async function login(credentials:LoginRequest) {
    return fetchLogin(credentials)
}

export async function register(newUserData:RegisterRequest) {
    return fetchRegister(newUserData)
}