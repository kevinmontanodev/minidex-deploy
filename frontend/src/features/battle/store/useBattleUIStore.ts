import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { UseBattleUIStore } from "../types/battle.types"

export const useBattleUIStore = create<UseBattleUIStore>()(
    persist(
        (set) => ({
            phase: "idle",
            showFinish: false,

            setPhase: (phase) => set({phase}),
            setShowFinish: (show) => set({showFinish: show}) ,
        }),
        {
            name: "battle-ui-storage",
        }
    )
)