<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';
import SiteHeader from './components/SiteHeader.vue';
import HeroSection from './sections/HeroSection.vue';
import AboutSection from './sections/AboutSection.vue';
import SkillsSection from './sections/SkillsSection.vue';
import SchedulingSection from './sections/SchedulingSection.vue';
import PipelineSection from './sections/PipelineSection.vue';
import ExperienceSection from './sections/ExperienceSection.vue';
import EducationSection from './sections/EducationSection.vue';
import ContactSection from './sections/ContactSection.vue';
import { motionReduced, webglReady, webglFailed, readingProgress } from './composables/experienceState';
let dispose: (() => void) | undefined;
let alive = true;
onMounted(async () => {
  motionReduced.value = matchMedia('(prefers-reduced-motion: reduce)').matches;
  try {
    const { startExperience } = await import('./three/experience');
    if (alive) dispose = startExperience();
  } catch (error) { webglFailed.value = true; console.warn('Enhanced scene unavailable. The portfolio remains readable.', error); }
});
onBeforeUnmount(() => { alive = false; dispose?.(); });
</script>
<template>
  <div class="portfolio" :class="{ 'static-mode': motionReduced || !webglReady || webglFailed, 'motion-reduced': motionReduced }">
    <a class="skip-link" href="#main">Skip to content</a>
    <div class="reading-progress" :style="{ transform: `scaleX(${readingProgress})` }" aria-hidden="true"></div>
    <SiteHeader />
    <main id="main" tabindex="-1"><HeroSection /><AboutSection /><SkillsSection /><SchedulingSection /><PipelineSection /><ExperienceSection /><EducationSection /><ContactSection /></main>
    <footer class="site-footer section-wrap"><a class="footer-name" href="#hero">Rachamalli Renusarika <span>© 2026</span></a><p>Computer Science (CIC) Undergraduate</p><a href="#hero" class="back-top">BACK TO TOP <span>↑</span></a></footer>
    <button class="motion-toggle" type="button" :aria-pressed="motionReduced" @click="motionReduced = !motionReduced"><span aria-hidden="true">{{ motionReduced ? 'Ⅱ' : '≈' }}</span>{{ motionReduced ? 'Motion reduced' : 'Reduce motion' }}</button>
  </div>
</template>
