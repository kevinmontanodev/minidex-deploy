import {create} from "zustand"
import { persist as persistMiddleware } from "zustand/middleware"
import type { PackPokemon, Pokemon } from "../interfaces/pokemon"
import type { Trainer } from "../interfaces/trainer"

interface Envelope {
    pokemons: Pokemon[]
}

interface AppState {
  trainer: Trainer | null;
  envelopes: Envelope[];
  envelopesOpened: boolean;
  featurePokemon: PackPokemon | null;
  currentPokemonDetails: Pokemon | null;
  pokemonTeam: Pokemon[];
  hasHydrated: boolean;

  // acciones
  setTrainer: (trainer: Partial<Trainer>) => void;
  setCurrentPokemonDetails: (pokemon: Pokemon | null) => void;
  setPokemonTeam: (pokemons: Pokemon[] | ((prev:Pokemon[]) => Pokemon[])) => void;


  setEnvelopes: (envelopes: Envelope[] | ((prev:Envelope[]) => Envelope[])) => void;
  addEnvelope: (envelope: Envelope) => void;
  removeEnvelope: (index: number) => void;

  setEnvelopesOpened: (opened: boolean) => void;

  setFeaturePokemon: (pokemon: PackPokemon | null) => void;
  setHydrated: (value: boolean) => void;
}

export const useMiniDexStore = create<AppState>()(
    persistMiddleware(
        (set, get) => ({
            trainer: null,
            envelopes: [],
            envelopesOpened: false,
            currentPokemonDetails: null,
            pokemonTeam: [],
            featurePokemon: null,
            hasHydrated: false,
            
            setTrainer: (partial) => set((state) => ({ 
                trainer : state.trainer ? {...state.trainer, ...partial} : (partial as Trainer)
            })),

            setPokemonTeam: (pokemonTeam) => set((state) => ({
                pokemonTeam: typeof pokemonTeam === "function" ? pokemonTeam(state.pokemonTeam) : pokemonTeam
            })),

            setEnvelopes: (envelopes) => set((state) => ({
                envelopes: typeof envelopes === "function" ? envelopes(state.envelopes) : envelopes
            })),

            addEnvelope: (envelope) => set((state) => {
                const newEnvelopes = [...state.envelopes, envelope]
                return {
                    envelopes: newEnvelopes,
                    envelopesOpened: newEnvelopes.length >= 3 ? true : state.envelopesOpened
                }
            }),

            removeEnvelope: (index) => set((state) => ({
                envelopes: state.envelopes.filter((_,i) => i !== index)
            })),

            setEnvelopesOpened: (opened) => set({envelopesOpened: opened}),

            setFeaturePokemon: (pokemon) => set({featurePokemon: pokemon}),

            setCurrentPokemonDetails: (pokemon) => set({currentPokemonDetails: pokemon}),

            setHydrated: (value: boolean) => set({hasHydrated: value}),

        }),
        {
            name: "minidex-storage",
            onRehydrateStorage: () => (state) => {
                if (state) state.setHydrated(true)
            }
        }
    )
)