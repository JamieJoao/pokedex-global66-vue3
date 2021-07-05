<template>
  <div class="footer">
    <Container class="footer-container">
      <Button
        title="All"
        icon="list"
        :class="{ 'footer-button-disabled': tabActive === 'favorites' }"
        :expand="true"
        :onClick="() => setTab('all')"
      />
      <Button
        title="Favorites"
        icon="star"
        :class="{ 'footer-button-disabled': tabActive === 'all' }"
        :expand="true"
        :onClick="() => setTab('favorites')"
      />
    </Container>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

import { State } from '@/store'
import { AvailableTabs } from '@/types/types'
import { Button } from '../'
import { Container } from '../../layout'

export default defineComponent({
  name: 'Footer',
  components: {
    Button,
    Container,
  },
  setup: () => {
    const store = useStore<State>()
    const tabActive = computed(() => store.state.tabActive)

    const setTab = (tab: AvailableTabs) => store.commit('setTab', tab)

    return {
      tabActive,
      setTab,
    }
  },
})
</script>

<style lang="sass" scoped>
@import styles
</style>
