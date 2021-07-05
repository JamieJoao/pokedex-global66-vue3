import { createStore, GetterTree, MutationTree } from 'vuex'

import { PokemonGeneralInfo } from '@/types/responses'
import { AvailableTabs } from '@/types/types'

export interface State {
  filter: string
  showModal: boolean
  currentPokemon: PokemonGeneralInfo | null
  pokemons: PokemonGeneralInfo[]
  pokemonsMap: { [key: string]: PokemonGeneralInfo }
  tabActive: AvailableTabs
  loading: boolean
}

const state: State = {
  filter: '',
  showModal: false,
  currentPokemon: null,
  pokemons: [],
  pokemonsMap: {},
  tabActive: 'all',
  loading: false,
}

const mutations: MutationTree<State> = {
  initPokemons: (state, payload: PokemonGeneralInfo[]) => {
    state.pokemons = payload.map(
      (pokemon: PokemonGeneralInfo) => ({ ...pokemon, favorite: false })
    )
  },
  createPokemonsMap: state => {
    state.pokemonsMap = state.pokemons.reduce((acc, pokemon: PokemonGeneralInfo) => {
      return { ...acc, [pokemon.name]: pokemon }
    }, {})
  },
  toggleLoading: state => {
    state.loading = !state.loading
  },
  toggleModal: state => {
    state.showModal = !state.showModal
  },
  setTab: (state, payload) => {
    state.tabActive = payload
  },
  setFavorite: (state, { name, favorite }: PokemonGeneralInfo) => {
    state.pokemonsMap[name].favorite = favorite
  },
  setCurrentPokemon: (state, payload) => {
    state.currentPokemon = payload
  },
}

const getters: GetterTree<State, State> = {
  getPokemons: ({ pokemons, filter, tabActive }) => {
    return pokemons.filter(
      (pokemon: PokemonGeneralInfo) => {
        return (
          pokemon.name.toLowerCase().includes(filter) && (tabActive === 'all' || pokemon.favorite)
        )
      }
    )
  }
}

const store = createStore({
  state,
  mutations,
  getters,
})

export default store