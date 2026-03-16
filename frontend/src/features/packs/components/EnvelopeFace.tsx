export function EnvelopeFace({id,onOpen}: {id:string,onOpen : (id:string) => void}){
    return (
        <div className={`custom-pulse-animation bg-gradient-to-tl from-[#D2B560] via-[#96AFC8] to-[#FFFFFF] w-40 h-60 flex items-center justify-center rounded-sm cursor-pointer relative`}
            onClick={() => onOpen(id)}>
                <img src="/envelopeFaceImage.webp" alt="default envelope image, pikachu over a pokeball" className="relative -z-20" title="pikachu over a pokeball" />
        </div>
    )
}