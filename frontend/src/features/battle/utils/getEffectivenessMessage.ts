export const getEffectivenessMessage = (multiplier?: number): string => {
    if (!multiplier || multiplier === 1) return ""

    if (multiplier === 0) return "It had no effect..."
    if (multiplier < 1) return "It's not very effective..."
    if (multiplier > 1) return "It's super effective!"

    return ""
}