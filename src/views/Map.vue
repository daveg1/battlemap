<template>
<div class="MapContainer">
<TheHeader
  class="MapContainer__header" />
<TheSidemenu
  class="MapContainer__sidemenu"/>
<TheMap
  class="MapContainer__map" />
</div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue'
import TheMap from '@/components/map/TheMap.vue'
import TheSidemenu from '@/components/sidemenu/TheSidemenu.vue'

export default {
  name: 'Map',
  components: {
    TheHeader,
    TheMap,
    TheSidemenu,
  }
}
</script>

<style>
.MapContainer {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 25% 1fr;
  grid-template-rows: auto 1fr;
}

.MapContainer__header  {
  grid-column-start: 1;
  grid-column-end: 3;
}
</style>