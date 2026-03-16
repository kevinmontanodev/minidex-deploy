import type { BattlePokemon } from "@/interfaces/battlePokemon"
import type { RefObject } from "react"

// components props
export interface PlayerActionsPanelProps {
    playerTimer:number,
    updatePlayerTimer: (value:number) => void
    executeTurn: (id?: string | undefined) => Promise<void>
    playerPokemon: BattlePokemon | null,
    selectMove: (move:string) => void,
    currentMoveName: string | null,
    playerSurrender: () => Promise<void>
}


// Responses
export interface BattleInfo {
    battleId: string,
    currentPlayerPokemon: BattlePokemon
    currentEnemyPokemon: BattlePokemon
    playerTeam: BattlePokemon[]
    status: BattleStatus
    enemyName: string
}

export type BattleStatus = "IN_PROGRESS" | "ENEMY_WON" | "PLAYER_WON"

export interface BattlePokemonState {
    pokemonId: string;
    maxHp: number;
    currentHp: number
    fainted: boolean
}

export interface Reward {
    coins: number,
    experience: number
}

export interface BattleTurnResponse {
    battleId: string,
    status: BattleStatus
    player: BattlePokemonState
    enemy: BattlePokemonState
    events: BattleEvent[]
    reward: null | Reward
}

export type BattleEvent = AttackEvent | FaintEvent | SwitchEvent | StrategicSwitch | FinishBattleEvent
export type BattleSide = "PLAYER" | "ENEMY"
export type HitResult = "NORMAL" | "CRITICAL" | "CRITICAL_LUCKY" | "NO_EFFECT"

// Response events
export interface AttackEvent {
    type: "ATTACK"
    hit: boolean
    side: BattleSide
    hitResult: HitResult,
    moveName: string;
    moveType: string;
    damage: number
    hpBefore: number;
    hpAfter: number;
    effectiveness: number
}

export interface StrategicSwitch {
    type: "STRATEGIC_SWITCH",
    side: BattleSide,
    newPokemon: BattlePokemon
}

export interface FaintEvent {
    type: "FAINT"
    side: BattleSide;
    pokemonId:string;
}

export interface SwitchEvent {
    type: "SWITCH"
    side: BattleSide
    newPokemon: BattlePokemon
}

export interface FinishBattleEvent {
    type: "FINISH_BATTLE"
    coins: number,
    previousXp: number,
    xpEarned: number
    newXp: number
    level: number
    levelUp: boolean
    playerWin: boolean
}

// hooks
export interface UseBattleAnimationsReturn {
    playerRef: RefObject<null>
    enemyRef: RefObject<null>
    playerCoverRef: RefObject<null>
    enemyCoverRef: RefObject<null>
    play: (e: BattleEvent) => Promise<void>
}

export interface UseBattleActionsReturn {
    selectMove: (moveName: string) => void
    currentMoveName: string | null
    initBattle: () => Promise<boolean>
    playerSurrender: () => Promise<void>,
}

export interface UseFinishBattleAnimationReturn {
    containerRef: RefObject<HTMLDivElement | null>
    xpBarRef: RefObject<HTMLDivElement | null>
    coinsRef: RefObject<HTMLSpanElement | null>
    messageRef: RefObject<HTMLParagraphElement | null>
    displayCoins: number
    displayXp: number
    showButton: boolean
}

export interface UseBattleTransitionAnimationReturn {
    rotateContainerRef: RefObject<HTMLDivElement | null>
}

export interface UseBattleTurnReturn {
    events: BattleEvent[],
    executeAttack: () => Promise<void>,
    executeSwitch: (id:string) => Promise<void>
    playerTimer: number
    updatePlayerTimer: (value: number) => void
}

// store
export type BattlePhase = "idle" | "opening" | "loading" | "fighting" | "closing"

export interface UseBattleUIStore {
    phase: BattlePhase,
    showFinish: boolean
    

    setPhase: (phase: BattlePhase) => void
    setShowFinish: (show: boolean) => void
}

export interface FinisBattleData {
    coins: number,
    previousXp: number
    xpEarned: number
    newXp: number
    level: number
    levelUp: boolean
    playerWin: boolean
}

export interface BattleStore {
    battleInfo : BattleInfo | null;
    status: BattleStatus | null
    
    playerPokemon: BattlePokemon | null;
    enemyPokemon: BattlePokemon | null;

    enemyTeam: BattlePokemon[]
    playerTeam: BattlePokemon[]

    playerHp:number;
    enemyHp:number;

    playerSwitchTimer: number

    eventQueue: BattleEvent[];
    isProcessing: boolean;

    currentMessage: string[] | null

    rewards: FinisBattleData | null

    hasHydrated: boolean

    setCurrentMessage: (message: string[] | null) => void;
    startBattle: (data:BattleInfo) => void;
    applyTurn: (response: BattleTurnResponse) => void;
    processEvent: (event: BattleEvent) => void;
    clearBattle: () => void;

    setPlayerPokemon: (pokemon: BattlePokemon) => void;
    setEnemyPokemon: (pokemon: BattlePokemon) => void;
    setEnemyPokemonInTeam: (pokemon: BattlePokemon) => void
    updateBattleStatus: (state:BattleStatus) => void
    setHasHydrated: (value: boolean) => void,
    updatePlayerSwitchTimer: (value: number) => void
   
}