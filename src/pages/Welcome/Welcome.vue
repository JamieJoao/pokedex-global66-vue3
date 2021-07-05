<template>
  <div class="welcome">
    <Container class="welcome-container">
      <PikachuSVG class="welcome-image animate__animated animate__bounceIn" />

      <span class="welcome-greeting animate__animated animate__fadeInDown">Welcome to Pokédex</span>
      <span class="welcome-description animate__animated animate__fadeInDown">
        The digital encyclopedia created by Professor Oak is an invaluable tool
        to Trainers in the Pokémon world.
      </span>

      <Button
        title="Get started"
        class="button-started animate__animated animate__fadeInDown"
        :onClick="goHome"
      />
    </Container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

import { Button } from '@/components/common'
import { Container } from '@/components/layout'

import PikachuSVG from '@/assets/images/pikachu.svg?component'

export default defineComponent({
  name: 'Welcome',
  components: {
    Container,
    Button,
    PikachuSVG,
  },
  setup: () => {
    const router = useRouter()

    const goHome = () => {
      router.push('home')
    }

    return {
      goHome,
    }
  }
})
</script>

<style lang="sass" scoped>
@import styles
</style>
