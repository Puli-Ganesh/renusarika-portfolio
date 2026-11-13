<script setup lang="ts">
import { education } from '../data/portfolio';
import SectionLabel from '../components/SectionLabel.vue';
import SmartPhoto from '../components/SmartPhoto.vue';
</script>
<template>
  <section id="education" class="education-section" aria-labelledby="education-title" tabindex="-1"><div class="section-wrap"><SectionLabel number="06" text="STILL LEARNING. ALWAYS BUILDING." /><div class="education-grid"><div class="education-copy"><h2 id="education-title">Curiosity is a<br>long-term <em>project.</em></h2><div class="degree-block"><span class="eyebrow">{{ education.status }} / {{ education.startYear }}–{{ education.expectedYear }} (EXPECTED)</span><h3>{{ education.program }}</h3><p>{{ education.institution }}</p><p class="specialization">{{ education.specialization }}</p></div><div class="education-footer"><span><strong>{{ education.cgpa }}</strong> / 10 CGPA</span><p>What I care about now:<br>RL scheduling · Training workflows · Systems efficiency</p></div></div><div class="education-portrait"><SmartPhoto role="learning" /><span class="education-photo-label">A WORK IN PROGRESS.<br>AND PROUD OF IT.</span><span class="corner-bracket" aria-hidden="true"></span></div></div></div></section>
</template>
