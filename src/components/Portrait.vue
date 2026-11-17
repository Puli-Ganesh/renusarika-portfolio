<script setup lang="ts">
import { photos, type PhotoRole } from '../content/portfolio';
withDefaults(defineProps<{ role: PhotoRole; eager?: boolean; sizes?: string }>(), { eager: false, sizes: '(max-width: 600px) 78vw, 400px' });
const base = import.meta.env.BASE_URL;
</script>
<template>
  <img
    :src="`${base}images/${role}-720.webp`"
    :srcset="`${base}images/${role}-360.webp 360w, ${base}images/${role}-720.webp 720w`"
    :sizes="sizes" :alt="photos[role].alt"
    :width="photos[role].width" :height="photos[role].height"
    :loading="eager ? 'eager' : 'lazy'" :fetchpriority="eager ? 'high' : 'auto'"
    decoding="async"
  />
</template>
