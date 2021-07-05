import { PokemonGeneralInfo } from "./responses"

export type AvailableTabs = 'all' | 'favorites'

export type PokemonsMap = { [key: string]: PokemonGeneralInfo }