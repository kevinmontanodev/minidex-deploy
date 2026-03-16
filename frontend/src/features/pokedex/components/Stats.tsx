import type { Stats } from "@/interfaces/pokemon";
import { DetailWrapper } from "./DetailWrapper";
import { AttackIcon } from "@/components/icons/AttackIcon";
import { HpIcon } from "@/components/icons/HpIcon";
import { ShieldIcon } from "@/components/icons/ShieldIcon";
import { SpeedIcon } from "@/components/icons/SpeedIcon";

export function Stats({stats} : {stats: Stats}) {
    return (
        <DetailWrapper customStyles="">
            <h4 className="bg-black/10 px-2 py-1">Stats</h4>
            <div className="px-2 pb-2 grid grid-cols-2 gap-2 ">
                <p className="text-red-600 flex gap-2 stat">
                    <AttackIcon /> 
                    <span>{stats.attack}</span>
                </p>
                <p className="text-green-600 flex gap-2 stat">
                    <HpIcon /> 
                    <span>{stats.hp}</span>
                </p>
                <p className="text-blue-600 flex gap-2 stat">
                    <ShieldIcon /> 
                    <span>{stats.defense}</span>
                </p>
                <p className="text-blue-400 flex gap-2 stat">
                    <SpeedIcon /> 
                    <span>{stats.speed}</span>
                </p>
            </div>
        </DetailWrapper>
    )
}