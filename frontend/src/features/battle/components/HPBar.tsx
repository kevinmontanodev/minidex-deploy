import { motion } from "framer-motion"

interface Props {
    currentHp: number
    maxHp: number
}

export function HPBar({ currentHp, maxHp }: Props) {
    const percentage = (currentHp / maxHp) * 100

    const getHpColor = (percentage: number) => {
        if (percentage > 50) return "bg-green-500"
        if (percentage > 20) return "bg-yellow-500"
        return "bg-red-500"
    }

    return (
        <div className="w-full h-3 bg-zinc-700 rounded-full overflow-hidden">
            <motion.div
                className={`h-full ${getHpColor(percentage)}`}
                animate={{ width: `${percentage}%` }}
                transition={{
                    duration: 0.6,
                    ease: "easeOut"
                }}
            />
        </div>
    )
}
