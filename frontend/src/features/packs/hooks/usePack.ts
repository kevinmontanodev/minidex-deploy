import { useEffect, useRef, useState } from "react"
import { openEnvelope } from "../services/packs.service"
import type { PackPokemon } from "@/interfaces/pokemon"
import { useMiniDexStore } from "@/stores/useMiniDexStore"
import { useAlertStore } from "@/stores/useAlertStore"
import { buyEnvelope } from "@/features/shop/services/shop.service"
import type { PackState, UsePackProps, UsePackReturn } from "../types/pack.types"

export function usePack({initialAmount, packPrice}: UsePackProps) : UsePackReturn {
    const [pokemons, setPokemons] = useState<PackPokemon[]>([])
    const [packs, setPacks] = useState<PackState[]>(() =>
        Array.from({length: initialAmount}, (_, i) => ({
            id: crypto.randomUUID(),
            hidden: false
        }))
    )
    const [activePackId, setActivePackId] = useState<string | null>(null)
    const trainer = useMiniDexStore(state => state.trainer)
    const setTrainer = useMiniDexStore(state => state.setTrainer)
    const {confirm, alert} = useAlertStore(state => state)
    const isOpeningRef = useRef(false)
    const [isOpening, setIsOpening] = useState(false)

    useEffect(() => {
        if (packs.length === 0){
            isOpeningRef.current = false
        }
    }, [packs.length])

    const openPack = async (id:string) => {
        if (isOpeningRef.current) return

        if (packPrice){
            const buy = await confirm("Buy Pack", `Dou you want buy this pack for ${packPrice} coins?`)
        
            if (!buy) return
        }

        isOpeningRef.current = true
        setIsOpening(true)

        const success = packPrice ? await openBuyPack() : await openDailyPack()

        if (!success){
            isOpeningRef.current = false
            setIsOpening(false)
            return
        }
        
        hidePack(id)
        setActivePackId(id)
    }
    
    const openDailyPack = async () => {
        const res =  await openEnvelope()

        if (res.success && res.pokemons){
            setPokemons(res.pokemons)
            return true
        } 
        
        alert("Pack Error", res?.message || "Can't get pokemons")
        return false
    }

    const openBuyPack = async () => {
        if (!packPrice) return false
            
        if (!trainer?.coins || trainer?.coins < packPrice){
            alert("Not Enough coins", "You don't have enough coins")
            return false
        }

        const res = await buyEnvelope()

        if (res.success && res.data){
            const data = res.data
            setPokemons(data.pokemons)
            setTrainer({coins: data.coins, level: data.level, xp: data.xp})
            return true
        }
    
        alert("Pack Error", res?.message || "Can't get pokemons")
        return false
    }

    const hidePack = (id: string) => {
        setPacks(prev =>
            prev.map(e =>
                e.id === id ? { ...e, hidden: true } : e
            )
        )
    }

    const consumePack = () => {
        setPacks(prev => prev.filter(e => e.id !== activePackId))
        setActivePackId(null)

        isOpeningRef.current = false
        setIsOpening(false)
    }

    return {
        pokemons,
        packs,
        openPack,
        consumePack,
        activePackId,
        isOpening
    }
}