import { create } from "zustand"

export const usePokedexRefreshStore = create<{
    refresh: () => void
    setRefresh: (fn: () => void) => void
}>((set) => ({
    refresh: () => {},
    setRefresh: (fn) => set({ refresh: fn })
}))