export function PokemonCardSkeleton({ heigth = "h-24", animate = true }: { heigth?: string, animate?:boolean }) {
    return (
        <div
            className={`pokemon-card w-24 ${heigth} rounded p-1 text-center shadow-md overflow-hidden`}
        >
            <figure className="bg-black/10 rounded flex w-full h-full items-center justify-center">
                <div className={`w-20 h-20 rounded ${animate ? 'skeleton-shimmer' : ''}`}></div>
            </figure>
        </div>
    )
}