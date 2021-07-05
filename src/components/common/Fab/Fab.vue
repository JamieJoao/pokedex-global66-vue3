<template>
  <label class="fab">
    <input type="checkbox" class="fab-input" :checked="model" @input="handleInput" />

    <StarEmptySVG class="fab-unchecked" alt="Estrella de favorito no seleccionado" v-if="!model" />
    <StarCheckSVG class="fab-checked" alt="Estrella de favorito seleccionado" v-else />
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import StarEmptySVG from '@/assets/icons/star-empty.svg?component'
import StarCheckSVG from '@/assets/icons/star-check.svg?component'

export default defineComponent({
  name: 'Fab',
  components: {
    StarEmptySVG,
    StarCheckSVG,
  },
  props: {
    model: {
      type: Boolean,
    }
  },
  setup: (_, context) => {
    const handleInput = (event: Event) => {
      const target = <HTMLInputElement>event.target
      context.emit('update:model', target.checked)
    }

    return {
      handleInput,
    }
  },
})
</script>

<style lang="sass" scoped>
@import styles
</style>
