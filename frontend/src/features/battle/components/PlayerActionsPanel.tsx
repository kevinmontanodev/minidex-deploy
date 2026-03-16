import { Button } from "@/components/ui/Button";
import { BattleMove } from "./BattleMove";
import { Timer } from "./Timer";
import type { PlayerActionsPanelProps } from "../types/battle.types";

export function PlayerActionsPanel({playerTimer, updatePlayerTimer, executeTurn, playerPokemon, currentMoveName, selectMove, playerSurrender}:PlayerActionsPanelProps){
    return (
        <section className="w-72 h-auto min-h-44 bg-amber-50/20 absolute top-90 right-0 p-2 rounded-md text-center">
                {(playerTimer > 0) && <Timer time={playerTimer} updateTime={updatePlayerTimer} />}

                <h3>Actions</h3>
                <div className="grid grid-cols-2 gap-1.5">
                    <Button customStyle={`bg-red-400/80 ${!currentMoveName ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-red-500/80'}`} disabled={!currentMoveName} title={`${!currentMoveName ? 'Select a move first' : ''}`}
                    onClick={() => executeTurn()}>
                        Attack
                    </Button>
                    <Button customStyle="bg-black/40 hover:bg-black/80" onClick={playerSurrender}>Surrender</Button>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                    <h2 className="col-span-2">Moves</h2>
                    {playerPokemon?.moves.map(m => <BattleMove key={m.moveName} move={m} selectMove={selectMove} isSelected={currentMoveName === m.moveName} />)}
                </div>
        </section>
    )
}