import type { ReactNode } from "react";

export function DetailWrapper({children, customStyles}: {children:ReactNode, customStyles?:string}){
    return (
        <div className={`flex flex-col gap-1 bg-black/10 rounded-sm overflow-hidden ${customStyles}`}>
            {children}     
        </div>
    )
}