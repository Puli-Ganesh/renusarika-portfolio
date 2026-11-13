<script setup lang="ts">
import { ref } from 'vue';
import { photos } from '../data/photoAssets';
import type { PhotoRole } from '../data/photoAssets';
const props = defineProps<{ role: PhotoRole; eager?: boolean }>();
const photo = photos[props.role];
const failed = ref(false);
</script>
<template>
  <div class="smart-photo" :class="{ 'photo-failed': failed }">
    <img v-if="!failed" :src="`/portraits/renusarika-${role}-800.webp`" :srcset="`/portraits/renusarika-${role}-400.webp 400w, /portraits/renusarika-${role}-800.webp ${Math.min(photo.width,800)}w`" sizes="(max-width: 700px) 85vw, (max-width: 1100px) 45vw, 440px" :width="photo.width" :height="photo.height" :alt="photo.alt" :loading="eager ? 'eager' : 'lazy'" :fetchpriority="eager ? 'high' : 'auto'" decoding="async" :style="{ objectPosition: photo.position }" @error="failed = true" />
    <span v-else class="photo-placeholder">RR<span>Rachamalli Renusarika</span></span>
  </div>
</template>
