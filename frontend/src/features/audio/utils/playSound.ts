const sounds: Record<string, HTMLAudioElement> = {}

if (typeof window !== "undefined"){
    sounds.hit = new Audio("/audio/sfx/hit.mp3"),
    sounds.levelUp = new Audio("/audio/sfx/level-up.mp3"),
    sounds.battleAwait =  new Audio("/audio/sfx/pokemon-capture.mp3"),
    sounds.hover = new Audio("/audio/sfx/pokemon-click.mp3"),
    sounds.openPack = new Audio("/audio/sfx/charge.mp3"),
    sounds.showPokemonPack =  new Audio("/audio/sfx/pokemon-caught.mp3"),
    sounds.transferPokemon =  new Audio("/audio/sfx/pokemon-transfer.mp3"),
    sounds.evolution = new Audio("/audio/sfx/pokemon-evolve.mp3"),
    sounds.pokemonOut =  new Audio("/audio/sfx/pokemon-out.mp3"),
    sounds.shiny = new Audio("/audio/sfx/shiny-pokemon.mp3"),
    sounds.victory = new Audio("/audio/sfx/victory.mp3"),
    sounds.defeat = new Audio("/audio/sfx/lose.mp3"),
    sounds.faint =  new Audio("/audio/sfx/faint.mp3"),
    sounds.plink = new Audio("/audio/sfx/plink.mp3")
}

const volumes: Record<string, number> = {
    hit: 0.25,
    levelUp: 0.4,
    battleAwait: 0.4,
    hover: 0.1,
    openPack: 0.3,
    showPokemonPack: 0.4,
    transferPokemon: 0.4,
    evolution: 0.5,
    pokemonOut: 0.3,
    shiny: 0.4,
    victory: 0.5,
    defeat: 0.5,
    faint: 0.4,
    plink: 0.2
}


export function playSound(name: keyof typeof sounds){
    const sound = sounds[name]
    
    if (!sound) return

    sound.currentTime = 0
    sound.volume = volumes[name] ?? 0.3
    sound.play()
}