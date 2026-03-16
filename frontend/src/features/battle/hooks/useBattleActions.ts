import { useAlertStore } from "@/stores/useAlertStore"
import { useState } from "react"
import { surrender, startBattle } from "../service/battle.service"
import { useBattleStore } from "@/features/battle/store/useBattleStore"
import { useBattleUIStore } from "@/features/battle/store/useBattleUIStore"
import { navigate } from "astro:transitions/client"
import type { UseBattleActionsReturn } from "../types/battle.types"

export const useBattleActions = () : UseBattleActionsReturn => {
    const [currentMoveName, setCurrentMoveName] = useState<string | null>('')
    const { alert } = useAlertStore()
    const setBattle = useBattleStore(s => s.startBattle)
    const battleInfo = useBattleStore(s => s.battleInfo)
    const clearBattle = useBattleStore(s => s.clearBattle)
    const setPhase = useBattleUIStore(s => s.setPhase)
   

    const initBattle = async () => {
        const res = await startBattle()

        if (!res.success || !res.battleInfo){
            alert("Error starting the batlle", res.message)
            return false
        }

        setBattle(res.battleInfo)
        return true
    }

    const playerSurrender = async () => {
        if (!battleInfo?.battleId){
            await navigate("/trainers/pokedex")
            return
        }

        const {success, message} = await surrender(battleInfo.battleId)

        alert("Finish Battle", "Don't worry try again later!")
        setPhase("idle")
        await navigate("/trainers/pokedex")
        clearBattle()
    }

    return {
        initBattle,
        playerSurrender,
        selectMove: setCurrentMoveName,
        currentMoveName,
    }
}