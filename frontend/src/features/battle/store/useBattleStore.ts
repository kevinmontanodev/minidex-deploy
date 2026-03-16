import { battleEventReducer } from "@/features/battle/engine/battleEventReducer";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BattleStore } from "../types/battle.types";

export const useBattleStore = create<BattleStore>()(
    persist(
        (set, get) => ({
            battleInfo: null,
            status: null,
            enemyTeam: [],
            playerTeam: [],
            playerPokemon: null,
            enemyPokemon: null,
            playerSwitchTimer: 0,
            playerHp: 0,
            enemyHp: 0,
            eventQueue: [],
            isProcessing: false,
            currentMessage: null,
            hasHydrated: false,
            rewards: null,

            setHasHydrated: (value: boolean) => set({ hasHydrated: value }),

            startBattle(data) {
                set({
                    battleInfo: data,
                    playerTeam: data.playerTeam,
                    status: data.status,
                    playerPokemon: data.currentPlayerPokemon,
                    enemyPokemon: data.currentEnemyPokemon,
                    playerHp: data.currentPlayerPokemon.currentHp,
                    enemyHp: data.currentEnemyPokemon.currentHp,
                    eventQueue: [],
                    isProcessing: false,
                    enemyTeam: [data.currentEnemyPokemon]
                })
            },

            setCurrentMessage(message) {
                set({ currentMessage: message })
            },

            updateBattleStatus(status){
                set({ status })
            },

            updatePlayerSwitchTimer(value){
                set({playerSwitchTimer: value})
            },

            applyTurn(response) {
                set({
                    eventQueue: response.events,
                    status: response.status
                })
            },

            processEvent: (event) => {
                const { isProcessing } = get()
                if (isProcessing) return

                set({ isProcessing: true })

                set(state => battleEventReducer(state, event))

                set({ isProcessing: false })
            },

            setEnemyPokemon(pokemon) {
                set({ enemyPokemon: pokemon })
            },

            setPlayerPokemon(pokemon) {
                set({
                    playerPokemon: pokemon,
                    playerHp: pokemon.currentHp
                })
            },

            setEnemyPokemonInTeam(pokemon) {
                set(state => ({
                    enemyTeam: [...state.enemyTeam, pokemon]
                }))
            },

            clearBattle() {
                set({
                    battleInfo: null,
                    status: null,
                    playerPokemon: null,
                    enemyPokemon: null,
                    playerHp: 0,
                    enemyHp: 0,
                    eventQueue: [],
                    isProcessing: false,
                    currentMessage: null,
                    playerTeam : [],
                    enemyTeam: [],
                    playerSwitchTimer: 0,
                    rewards: null
                })
            }
        }),
        {
            name: "battle-storage",
            partialize: (state) => ({
                battleInfo: state.battleInfo,
                status: state.status,
                playerTeam: state.playerTeam,
                playerPokemon: state.playerPokemon,
                enemyPokemon: state.enemyPokemon,
                playerHp: state.playerHp,
                playerSwitchTimer: state.playerSwitchTimer,
                enemyHp: state.enemyHp,
                enemyTeam: state.enemyTeam,
                currentMessage: state.currentMessage
            }),
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated?.(true)
            }
        }
    )
)