<template>
<video class="Home__background" src="@/assets/videos/globe.mp4" autoplay muted loop></video>
<main class="Home__panel">
  <TheBrand
    :animated="true"
    height="180" width="400"
    style="--order: 1" />
  <p class="Home__tagline" style="--order: 2">Mapping Europe's Greatest Battles</p>
  <div class="Home__button-holder" style="--order: 3">
    <RouterButton class="Home__link" to="/map">Start Mapping</RouterButton>
  </div>
</main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TheBrand from '@/components/TheBrand.vue';
import TheHeader from '@/components/TheHeader.vue';
import RouterButton from '@/components/controls/RouterButton.vue'

export default defineComponent({
  name: 'Home',
  components: {
    TheBrand,
    TheHeader,
    RouterButton
  },
});
</script>

<style>
#app {
  background-color: black;
  overflow: hidden;
}

.Home__background {
  animation: expand-circle 1s ease-in-out forwards;
  clip-path: circle(30% at -10% -10%);
  height: 100%;
  object-fit: cover;
  position: absolute;
  width: 100%;
}

@keyframes expand-circle {
  to {
    clip-path: circle(75% at 0% 25%);
  }
}

.Home__panel {
  align-items: center;
  background-color: black;
  display: inline-flex;
  flex-direction: column;
  height: 100%;
  padding: 7rem 10rem;
  position: absolute;
  right: 0;
}

.Home__panel > * {
  animation: fade-in 300ms ease-in forwards;
  animation-delay: calc(var(--order) * 300ms);
  opacity: 0;
}


@keyframes fade-in {
  to { opacity: 1 }
}

.Home__panel > * + * {
  margin-block-start: 2rem;
}
</style>
