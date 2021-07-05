<template>
  <div class="list">
    <ul v-if="pokemons.length">
      <li v-for="pokemonInfo in pokemons" :key="pokemonInfo.name">
        <Item :pokemonInfo="pokemonInfo" />
      </li>
    </ul>

    <div class="list-empty" v-else>
      <span>Uh-oh!</span>
      <span>You look lost on your journey!</span>

      <Button title="Go back home" :onClick="goBack" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

import { Button, Item } from '@/components/common'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'List',
  components: {
    Button,
    Item,
  },
  setup: () => {
    const store = useStore()
    const pokemons = computed(() => store.getters.getPokemons)
    const router = useRouter()

    const goBack = () => {
      router.back()
    }

    return {
      pokemons,
      goBack,
    }
  }
})
</script>

<style lang="sass" scoped>
@import styles
</style>
