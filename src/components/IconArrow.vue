<script setup lang="ts">
defineProps<{ direction?: 'up-right' | 'right' | 'down' }>();
</script>
<template>
  <svg class="icon-arrow" :class="direction || 'up-right'" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" stroke="currentColor" stroke-width="1.5" /></svg>
</template>
