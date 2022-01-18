<template>
<router-link class="RouterButton">
  <slot></slot>
</router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Router Button',
})
</script>

<style>
.RouterButton {
  background-color: var(--color-primary);
  border-radius: 0.25rem;
  color: var(--color-text-on-primary);
  cursor: pointer;
  display: inline-block;
  line-height: 2.5rem;
  padding-inline: 1rem;
  transition: background-color 200ms;
}

.RouterButton:hover {
  background-color: var(--color-primary-alt);
}
</style>