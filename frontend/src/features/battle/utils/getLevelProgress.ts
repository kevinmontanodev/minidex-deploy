export const getLevelProgress = (xp:number) => {
    const xpIntoLevel = xp % 1000
    return (xpIntoLevel / 1000) * 100 
}