<template>
  <div class="item" @click="handleClickItem">
    <span class="item-title">{{ pokemonInfo.name }}</span>
    <Fab v-model:model="model" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useStore } from 'vuex'

import { State } from '@/store'
import { Fab } from '@/components/common'
import { PokemonGeneralInfo } from '@/types/responses'

export default defineComponent({
  name: 'Item',
  components: {
    Fab,
  },
  props: ['pokemonInfo'],
  setup: ({ pokemonInfo }: { pokemonInfo: PokemonGeneralInfo }) => {
    const store = useStore<State>()
    const model = ref<boolean>(false)

    const setFavorite = (data: { name: string, favorite: boolean }) => store.commit('setFavorite', data)

    watch(model, (val) => {
      setFavorite({ name: pokemonInfo.name, favorite: val })
    })

    watch(pokemonInfo, (val) => {
      model.value = val.favorite
    })

    const handleClickItem = () => {
      store.commit('toggleModal')
      store.commit('setCurrentPokemon', pokemonInfo)
    }

    return {
      model,
      handleClickItem,
    }
  }
})
</script>

<style lang="sass" scoped>
@import styles
</style>
