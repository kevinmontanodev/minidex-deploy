import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { BATTLE_RULES } from "../rules/battle-rules";

export function BattleRulesModal(){
    const [show, setShow] = useState(true)

    if (!show) return null

    return (
        <div className="fixed z-40 flex flex-col gap-2 justify-center items-center bg-black/50 rounded-md">
            <section className="grid grid-cols-2 gap-3">
                {BATTLE_RULES.map(r => (
                    <article key={r.id} className="flex gap-2.5 p-3 rounded-xl bg-white/5 border-[1px] border-[#fff2] transition-all duration-150 hover:-translate-y-0.5">
                        <span className="text-xl">{r.icon}</span>
                        <div>
                            <h5 className="text-sm m-0">{r.title}</h5>
                            <p className="text-xs opacity-80 mx-0 my-0.5">{r.description}</p>
                        </div>
                    </article>
                ))}
            </section>
            <Button customStyle="bg-white/10" onClick={() => setShow(false)}>Got it, start battle!</Button>
        </div>
    )
}