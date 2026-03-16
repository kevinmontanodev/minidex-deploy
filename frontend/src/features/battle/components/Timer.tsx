import { useEffect } from "react";

export function Timer({time,updateTime}:{time:number, updateTime: (value:number) => void}){

    useEffect(() => {
        if (time <= 0) return

        const timer = setInterval(() => {
            const newTime = time - 1
            updateTime(newTime)
        }, 1000)

        return () => clearInterval(timer)
    }, [time])

    if (!time || time <= 0) return

    return (
        <div className="w-44 h-20 bg-amber-50/20 flex justify-center items-center rounded-md absolute -top-22 left-15 appear">
            <p>Switch in: <span>{time}</span></p>
        </div>
    )
}