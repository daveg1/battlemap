<template>
<header class="SiteHeader">
  <div class="SiteHeader__wrap">
    <div class="SiteHeader__start">
      <TheBrand class="SiteHeader__Brand" />
      <nav class="SiteHeader__nav">
        <router-link class="SiteHeader__link" to="/">Home</router-link>
        <router-link class="SiteHeader__link" to="/map">Map</router-link>
        <router-link class="SiteHeader__link" to="/about">About</router-link>
      </nav>
    </div>
    <div class="SiteHeader__end">
      <nav class="SiteHeader__nav">
        <router-link class="SiteHeader__link" to="/login">login</router-link>
      </nav>
    </div>
  </div>
</header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TheBrand from './TheBrand.vue';

export default defineComponent({
  name: 'The Header',
  components: {
    TheBrand,
  },
});
</script>

<style>
.SiteHeader {
  align-content: center;
  background-color: var(--color-primary);
  display: flex;
  justify-content: center;
}

.SiteHeader__wrap {
  align-items: center;
  display: flex;
  justify-content: space-between;
  max-width: var(--val-wrap);
  flex-grow: 1;
}

.SiteHeader__start,
.SiteHeader__end {
  align-items: baseline;
  display: flex;
}

.SiteHeader__nav {
  align-items: center;
  display: flex;
}

.SiteHeader__link {
  align-items: center;
  color: var(--color-text-on-primary);
  display: flex;
  height: 60px;
}

.SiteHeader__start .SiteHeader__link { margin-inline-end: 1rem }
.SiteHeader__end   .SiteHeader__link { margin-inline-start: 1rem }

.SiteHeader__link:hover {
  text-decoration: underline;
}

.SiteHeader__Brand {
  margin-inline-end: 1rem;
}
</style>