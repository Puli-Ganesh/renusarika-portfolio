<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Portrait from './Portrait.vue';
import { useCoordinator } from '../motion/coordinator';
import { photoProgress } from '../motion/math';

const element = ref<HTMLElement>();
const motion = useCoordinator();
let unsubscribe: (() => void) | undefined;
onMounted(() => {
  unsubscribe = motion.subscribe(({ reduced, viewportHeight }) => {
    if (!element.value) return;
    const rect = element.value.getBoundingClientRect();
    const progress = reduced ? 0.65 : photoProgress(window.scrollY, rect.top + window.scrollY, rect.height, viewportHeight);
    element.value.style.setProperty('--separation', progress.toFixed(4));
    element.value.dataset.separation = progress.toFixed(3);
  });
});
onBeforeUnmount(() => unsubscribe?.());
</script>
<template>
  <div ref="element" class="photo-exhibit">
    <div class="photo-assembly">
      <div class="photo-backing" aria-hidden="true"></div>
      <div class="photo-inner-mat" aria-hidden="true"></div>
      <div class="photo-main"><Portrait role="hero" eager sizes="(max-width:600px) 74vw, (max-width:980px) 38vw, 400px" /></div>
      <div class="photo-front-frame" aria-hidden="true"></div>
    </div>
  </div>
</template>
