<template>
  <div class="home">
    <div class="home-container" v-if="!loading">
      <Container>
        <Input class="home-input" placeholder="Search" icon="search" v-model="store.state.filter" />

        <List class="home-list" />
      </Container>

      <Modal v-if="showModal">
        <Pokemon />
      </Modal>

      <Footer />
    </div>
    <div v-else class="home-loader">
      <Loader />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { useStore } from 'vuex'

import { State } from '@/store'
import { useFetchPokemon } from '@/use'
import { Input, Button, Footer, List, Modal, Loader, Pokemon } from '@/components/common'
import { Container } from '@/components/layout'


export default defineComponent({
  name: 'Home',
  components: {
    Container,
    Input,
    Button,
    Footer,
    List,
    Modal,
    Pokemon,
    Loader,
  },
  setup: () => {
    const store = useStore<State>()
    const loading = computed(() => store.state.loading)
    const showModal = computed(() => store.state.showModal)
    const { fetchAllPokemons } = useFetchPokemon()

    onMounted(() => {
      fetchAllPokemons()
    })

    return {
      store,
      loading,
      showModal,
    }
  }
})
</script>

<style lang="sass" scoped>
@import styles
</style>