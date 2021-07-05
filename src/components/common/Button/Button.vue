<template>
  <button
    class="button"
    @click="handleClick"
    :disabled="disabled"
    :class="{ 'button-block': expand }"
  >
    <i class="button-icon" :class="[`fa fa-${icon}`]" v-if="icon"></i>
    <span class="button-title" v-if="title">{{ title }}</span>

    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Button',
  props: {
    title: {
      type: String,
    },
    disabled: {
      type: Boolean,
    },
    expand: {
      type: Boolean,
    },
    icon: {
      type: String,
    },
    onClick: {
      type: Function,
    }
  },
  setup: (props) => {
    const handleClick = () => {
      props.onClick?.call(null)
    }

    return {
      handleClick,
    }
  },
})
</script>

<style lang="sass" scoped>
@import styles
</style>
