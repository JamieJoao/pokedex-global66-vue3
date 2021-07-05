<template>
  <div class="pokemon">
    <div class="pokemon-container" v-if="!loading">
      <div class="pokemon-scenery">
        <ScenerySVG />

        <img
          class="pokemon-figure"
          :src="pokemonFigure"
          alt="Figura de pokemon"
          v-if="pokemonFigure"
        />
      </div>

      <div class="pokemon-properties">
        <div class="pokemon-property">
          <span>Name:</span>
          <span>{{ pokemonInfo?.name }}</span>
        </div>
        <div class="pokemon-property">
          <span>Weight:</span>
          <span>{{ pokemonInfo?.weight }}</span>
        </div>
        <div class="pokemon-property">
          <span>Height:</span>
          <span>{{ pokemonInfo?.height }}</span>
        </div>
        <div class="pokemon-property">
          <span>Types:</span>
          <span>{{ pokemonTypes }}</span>
        </div>
      </div>

      <div class="pokemon-share">
        <Button
          :title="loadingCopy ? 'Copied!' : 'Share to my friends'"
          :onClick="handleClickShare"
        />
        <Fab v-model:model="model" />
      </div>
    </div>
    <div class="pokemon-loader" v-else>
      <Loader />
      <span>Cargando pokemon...</span>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, watch } from 'vue'
import { useStore } from 'vuex'

import { State } from '@/store'
import { Button, Fab, Loader } from '@/components/common'
import { useFetchPokemon } from '@/use'

import ScenerySVG from '@/assets/images/scenery.svg?component'
import { copyClipboard } from '@/utils'

export default defineComponent({
  name: 'Pokemon',
  components: {
    Button,
    Fab,
    Loader,
    ScenerySVG,
  },
  setup: () => {
    const { fetchSinglePokemon, pokemonInfo } = useFetchPokemon()
    const store = useStore<State>()
    const currentPokemon = computed(() => store.state.currentPokemon)
    const model = ref(false)
    const loading = ref(false)
    const loadingCopy = ref(false)

    const pokemonTypes = computed(() => pokemonInfo.value?.types.map((type) => type.type.name).join(", "))
    const pokemonFigure = computed(() => pokemonInfo.value?.sprites?.other?.["official-artwork"].front_default)

    onMounted(async () => {
      loading.value = true
      model.value = currentPokemon.value?.favorite || false

      await fetchSinglePokemon(currentPokemon?.value?.name)

      loading.value = false
    })

    const setFavorite = (data: { name: string, favorite: boolean }) => store.commit('setFavorite', data)

    watch(model, (val) => {
      setFavorite({ name: currentPokemon.value?.name!, favorite: val })
    })


    const handleClickShare = async () => {
      await copyClipboard(
        [
          `Name: ${currentPokemon.value?.name.toUpperCase()}`,
          `Weight: ${pokemonInfo.value?.weight}`,
          `Height: ${pokemonInfo.value?.height}`,
          `Types: ${pokemonTypes.value?.toUpperCase()}`,
        ].join(", ")
      );

      loadingCopy.value = true;
      setTimeout(() => (loadingCopy.value = false), 1000);
    }

    return {
      model,
      pokemonInfo,
      loading,
      loadingCopy,
      pokemonTypes,
      pokemonFigure,
      handleClickShare,
    }
  }
})
</script>

<style lang="sass" scoped>
@import styles
</style>
