<script setup lang="ts">
import { resume, resumeAvailable } from '../data/portfolio';
defineProps<{ compact?: boolean }>();
</script>
<template>
  <a v-if="resumeAvailable" :href="resume.expectedPath" class="resume-link" download aria-label="Download Resume (PDF)">{{ compact ? 'Resume' : 'Download resume' }} <span aria-hidden="true">↓</span></a>
  <button v-else type="button" class="resume-link unavailable" disabled title="A source resume PDF was not supplied. Add the real PDF to enable this download." aria-label="Resume unavailable — PDF not yet added">{{ compact ? 'Resume' : 'Resume · coming soon' }} <span aria-hidden="true">↓</span></button>
</template>
