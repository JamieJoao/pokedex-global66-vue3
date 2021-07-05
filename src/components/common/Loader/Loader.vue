<template>
  <LoaderSVG class="animate__animated animate__bounce animate__infinite" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import LoaderSVG from '@/assets/images/loader.svg?component'

export default defineComponent({
  name: 'Loader',
  components: {
    LoaderSVG,
  }
})
</script>