import type { Move, Sprites } from "./pokemon.types";

export interface TrainerSwitchRequest {
    battleId: string,
    pokemonUuid: string
}

export interface BattleTurnRequest {
    battleId: string,
    pokemonUuid: string,
    moveName:string,
    action: "ATTACK" | "SWITCH"
}

export interface Reward {
    xp : number,
    coins: number,
    levelUp: boolean,
}

export interface BattlePokemon {
    pokemonId:string
    name: string;
    maxHp:number
    currentHp: number
    sprites: Sprites
    attack: number;
    defense: number;
    speed: number;
    level:number;
    moves: Move[]
    types: string[]
    fainted: boolean
}

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



export interface BattleTurnResponse {
    battleId: string,
    status: BattleStatus
    player: BattlePokemonState
    enemy: BattlePokemonState
    events: BattleEvent[]
    reward: null | Reward
}

export type BattleEvent = AttackEvent | FaintEvent | SwitchEvent | FinishBattleEvent | StrategicSwitch
export type BattleSide = "PLAYER" | "ENEMY"
export type HitResult = "NORMAL" | "CRITICAL" | "CRITICAL_LUCKY" | "NO_EFFECT"

export interface AttackEvent {
    type: "ATTACK"
    hit: boolean
    side: BattleSide
    hitResult: HitResult,
    moveName: string
    moveType: string;
    damage: number
    hpBefore: number;
    hpAfter: number;
    effectiveness: number
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

export interface StrategicSwitch {
    type: "STRATEGIC_SWITCH",
    side: BattleSide,
    newPokemon: BattlePokemon
}

export interface FinishBattleEvent {
    type: "FINISH_BATTLE"
    coins: number,
    previousXp: number
    xpEarned: number
    newXp: number
    level: number
    levelUp: boolean
    playerWin: boolean
}