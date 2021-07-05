<template>
  <teleport to="#root-extern">
    <div class="modal">
      <div class="modal-overlay">
        <Container>
          <div class="modal-content">
            <button class="button-close" @click="toggleModal">
              <i class="fa fa-times-circle"></i>
            </button>
            <slot></slot>
          </div>
        </Container>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'

import { State } from '@/store'
import { Container } from '@/components/layout'

export default defineComponent({
  name: 'Modal',
  components: {
    Container,
  },
  setup: () => {
    const store = useStore<State>()

    const toggleModal = () => store.commit('toggleModal')

    return {
      toggleModal,
    }
  }
})
</script>

<style lang="sass" scoped>
@import styles
</style>
