<template>
  <div class="input">
    <i v-if="icon" class="fa input-icon" :class="`fa-${icon}`"></i>
    <input
      type="text"
      class="input-element"
      :placeholder="placeholder"
      :value="model"
      @input="handleInput"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Input',
  props: ['icon', 'placeholder', 'model'],
  setup: (_, context) => {
    const handleInput = (event: Event) => {
      const target = <HTMLInputElement>event.target
      context.emit('update:model', target.value)
    }

    return {
      handleInput,
    }
  }
})
</script>

<style lang="sass" scoped>
@import styles
</style>
