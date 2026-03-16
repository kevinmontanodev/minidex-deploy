import { POKEMONS_TYPES_COLORS } from "@/const/pokemonsTypesColors"

export const getColorByMoveType = (moveType: string) => {
    const color = POKEMONS_TYPES_COLORS[moveType?.toLowerCase()]

    if (!color) return POKEMONS_TYPES_COLORS['normal']

    return color
}