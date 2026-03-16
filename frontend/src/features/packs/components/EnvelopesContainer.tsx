import { Envelope } from "./Envelope";
import { EnvelopeFace } from "./EnvelopeFace";
import type { EnvelopeContainerProps } from "../types/pack.types";
import { usePack } from "../hooks/usePack";
import { EnvelopeLoading } from "./EnvelopeLoading";
import { useBgm } from "@/features/audio/hooks/useBgm";


export function EnvelopesContainer({initialAmount, packPrice, emptyMessage = "No hay sobres disponibles"}: EnvelopeContainerProps){
    const {pokemons, packs, consumePack, activePackId, openPack, isOpening} = usePack({initialAmount, packPrice})
    useBgm("menu")

    return (
        <>
            <div className="flex gap-2 justify-center mt-2 items-center h-64 pt-2">
                {
                    isOpening && !activePackId && (
                        <EnvelopeLoading/>
                    )
                }
                {
                    packs.map(e => !e.hidden && (<EnvelopeFace key={e.id} id={e.id} onOpen={openPack} />))
                }

                {
                    activePackId && (
                        <Envelope id={activePackId} pokemons={pokemons} consumeEnvelope={consumePack} /> 
                    )
                }
      
                {
                    ((packs.length === 0) && (<p className="text-white">{emptyMessage}</p>))
                }
            </div>
        </>
    )
}