import {  useState, type FormEvent } from "react";
import { useAlertStore } from "@/stores/useAlertStore";
import { useAuth } from "../hooks/useAuth";
import { useBgm } from "@/features/audio/hooks/useBgm";

export function LoginForm(){
    const {handleChange, isLogin, submitTrainer, userData, changeLoginForm} = useAuth()
    const {alert} = useAlertStore()
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState("processing...")
    useBgm("login")

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true)

        try {
            const result = await submitTrainer()
            
            if (result.ok){
                setMessage("Successful registration...")
                setTimeout(() => {
                    window.location.href = "/"
                }, 300)
            }

        } catch (error) {
            return alert("Server Error", "Try it later")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            {isLoading && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-20 flex-col">
                    <img src="/pikachuLogin.gif" alt="Loading..." className="w-24 h-24" />
                    <span className="text-white text-center text-lg">{message}</span>
                </div>
            )}
    
            <form onSubmit={handleSubmit} className={`${!isLogin ? 'h-72' : 'h-60'} bg-white/20 backdrop-blur-xs p-4 rounded-md flex flex-col gap-2 transition-all duration-300 fade-in`}>
                <h2 className="text-center text-2xl font-bold text-white pb-2">{!isLogin ? 'Register' : 'Login'}</h2>
                <fieldset className={`overflow-hidden`}>
                    <input type="text" value={userData.name} name="name" placeholder="Enter your name" required={!isLogin} onChange={handleChange}
                    className={`${!isLogin ? '' : 'hidden'} bg-white/60 p-2 rounded-md outline-0 show`}
                    />
                </fieldset>

                <fieldset>
                    <input type="text" value={userData.username} name="username" placeholder="Enter your username" required onChange={handleChange}
                    className="bg-white/60 p-2 rounded-md outline-0 "
                    />
                </fieldset>

                <fieldset>
                    <input type="password" value={userData.password} name="password" placeholder="Enter your password" required onChange={handleChange}
                    className="bg-white/60 p-2 rounded-md outline-0"
                    />
                </fieldset>

                <fieldset className="flex justify-center">
                    <span className="text-sm text-zinc-700 underline cursor-pointer" onClick={changeLoginForm}>
                        {!isLogin ? 'Do you already have an account?' : 'Create account'}
                    </span>
                </fieldset>

                <fieldset className="flex justify-center">
                    <button type="submit" className="px-4 py-1 rounded-md text-zinc-100 bg-gradient-to-tl from-[#CB0492] via-[#6D02C6] to-[#1500F7] cursor-pointer hover:scale-105 transition-all">
                        {isLogin ? "Login" : "Register"}
                    </button>
                </fieldset>
            </form>    
        </>
    )
}
