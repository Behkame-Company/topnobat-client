<template>
  <div class="location-picker">
    <div class="map-container" style="height: 400px; width: 100%;">
      <l-map
        ref="map"
        v-model:zoom="zoom"
        :center="center"
        :use-global-leaflet="false"
        @click="handleMapClick"
      >
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
        />
        <l-marker
          v-if="markerPosition"
          :lat-lng="markerPosition"
          :draggable="true"
          @update:lat-lng="updateMarkerPosition"
        />
      </l-map>
    </div>
  </div>
</template>

<script setup lang="ts">
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
import { ref, onMounted } from 'vue';

const props = defineProps({
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['location-selected']);

const zoom = ref(13);
const center = ref([props.latitude, props.longitude]); // Default to rafsanjan
const markerPosition = ref<{ lat: number; lng: number }>({ lat: props.latitude, lng: props.longitude });

const handleMapClick = (event: any) => {
  const { lat, lng } = event.latlng;
  markerPosition.value = { lat, lng };
  emit('location-selected', { lat, lng });
};

const updateMarkerPosition = (newPosition: { lat: number; lng: number }) => {
  markerPosition.value = newPosition;
  emit('location-selected', newPosition);
};

onMounted(async () => {
  try {
    // Try to get user's current location
    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    
    center.value = [position.coords.latitude, position.coords.longitude];
    markerPosition.value = { 
      lat: position.coords.latitude, 
      lng: position.coords.longitude 
    };
    emit('location-selected', markerPosition.value);
  } catch (error) {
    console.warn('Could not get user location:', error);
    // Keep default center (Tehran)
  }
});
</script>

<style scoped>
.location-picker {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.map-container {
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
}
</style> 