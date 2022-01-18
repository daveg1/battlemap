<template>
<div id="map" class="Map"></div>
</template>

<script>
import L from 'leaflet'

export default {
  name: 'The Map',

  data() {
    return {
      theme: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    }
  },

  methods: {
    initMap() {
      const map = L.map('map', { zoomControl: false })
        .setView([49.611, 24.741], 5)

      const tiles = L.tileLayer(this.theme, {
          attribution: `&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>,
                      &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a>
                      &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors`,
          maxZoom: 9,
          minZoom: 5,
          subdomains: ['a', 'b', 'c']
      });

      tiles.addTo(map);
    }
  },
  
  mounted() {
    this.initMap()
  }
}
</script>

<style>
</style>