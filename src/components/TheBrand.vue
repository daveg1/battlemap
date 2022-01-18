<template>
<video
  v-if="animated"
  class="Brand"
  src="@/assets/brand/brand-anim.mp4"
  autoplay
  muted
></video>
<img
  v-else
  class="Brand"
  src="@/assets/brand/brand-static.png">
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'TheBrand',
  props: {
    animated: {
      type: Boolean
    }
  }
})
</script>

<style>
.Brand {
  font-size: 1.25rem;
  font-weight: bold;
}
</style>