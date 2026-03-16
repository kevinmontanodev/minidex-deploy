import { playSound } from "@/features/audio/utils/playSound";
import type { ReactNode } from "react";

export function Button({children,customStyle,onClick, disabled, title}:{children:ReactNode, customStyle?:string, onClick?:() => void, disabled?:boolean, title?:string}){
    return (
        <button onMouseEnter={() => playSound("hover")} className={`px-4 py-1.5 rounded-sm cursor-pointer appear ${customStyle} transition-all`} onClick={onClick} disabled={disabled} title={title}>
            {children}
        </button>
    )
}