import { ref } from 'vue'
import { useStore } from "vuex"

import { PokemonData, PokemonGeneralInfo, PokemonResponse } from "@/types/responses"
import { pokemonDB } from "@/api/pokemonDB"
import { State } from '@/store'

export const useFetchPokemon = () => {

  const pokemonInfo = ref<PokemonData>()
  const store = useStore<State>()
  const initPokemons = (pokemons: PokemonGeneralInfo[]) => store.commit('initPokemons', pokemons)
  const createPokemonsMap = () => store.commit('createPokemonsMap')
  const toggleLoading = () => store.commit('toggleLoading')

  const fetchAllPokemons = async () => {
    try {
      toggleLoading()
      const res = await pokemonDB.get<PokemonResponse>('')

      /**
       * Timeout solo para dar la impresión de carga lenta y se vea el loader
       */
      setTimeout(() => {
        toggleLoading()

        if (res.status === 200) {
          const { data: { results } } = res
          initPokemons(results)
          createPokemonsMap()
        }
      }, 1500)

    } catch (error) {
      console.log('[fetching pokeapi error]')
    }
  }

  const fetchSinglePokemon = async (pokemonName = '') => {
    try {
      const res = await pokemonDB.get<PokemonData>(pokemonName)
      
      if (res.status === 200) {
        const { data } = res
        pokemonInfo.value = data
      }

    } catch (error) {
      console.log('[fetching pokeapi error]')
    }
  }

  return {
    fetchAllPokemons,
    fetchSinglePokemon,
    pokemonInfo,
  }

}