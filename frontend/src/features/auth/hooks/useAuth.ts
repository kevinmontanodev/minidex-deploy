import { useAlertStore } from "@/stores/useAlertStore"
import { authLogin, authRegister } from "../services/auth.service"
import { useMiniDexStore } from "@/stores/useMiniDexStore"
import { useState, type ChangeEvent } from "react"
import type { UseAuthReturns, UserData } from "../types/auth.types"

export function useAuth(): UseAuthReturns{
    const {alert} = useAlertStore()
    const setTrainer = useMiniDexStore((state) => state.setTrainer)
    const [isLogin, setIsLogin] = useState(false)
    const [userData, setUserData] = useState<UserData>({
        name: "",
        username: "",
        password: ""
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserData(prev => ({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }

    const checkCredentials = () => {
        if ((userData.name == "" && !isLogin) || userData.username == "" || userData.password == ""){
            alert("Emty Fields", "Please fill all fields")
            return false
        }

        return true
    }

    const changeLoginForm = () => {
        setIsLogin(!isLogin)
    }

    const login = async () => {
        if (!checkCredentials()) return {ok: false}

        const res = await authLogin(userData.username, userData.password)

        console.log(res)
        if (!res.success){
            alert("Validation Error", res.message || "")
            return {ok: false}
        }

        const trainer = res.trainer

        setTrainer(trainer!)
        
        alert("Session started successfully", "Welcome back " + trainer?.username)

        return {ok : true}
    }

    const register = async () => {
        if (!checkCredentials()) return {ok: false}

        const res = await authRegister(userData.name, userData.username, userData.password)

        if (!res.success){
            alert("Validation Error", res.message || "")
            return {ok: false}
        }

        const trainer = res.trainer
        setTrainer(trainer!)
        alert("Successful registration", "Welcome to MiniDex " + trainer?.username)

        return {ok:true}
    }

    const submitTrainer = async () => {
        return isLogin ? await login() : await register()
    }

    return {
        handleChange,
        changeLoginForm,
        isLogin,
        submitTrainer,
        userData
    }
}