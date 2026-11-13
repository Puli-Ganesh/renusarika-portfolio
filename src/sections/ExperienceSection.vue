<script setup lang="ts">
import { experience } from '../data/portfolio';
import SectionLabel from '../components/SectionLabel.vue';
</script>
<template>
  <section id="experience" class="experience-section section-wrap" aria-labelledby="experience-title" tabindex="-1"><SectionLabel number="05" text="THE LEARNING JOURNEY" /><div class="section-heading"><h2 id="experience-title">Where theory<br>meets <em>practice.</em></h2><p>Hands-on exposure.<br>A growing perspective.</p></div><div class="experience-rail"><article v-for="entry in experience" :key="entry.number" class="experience-entry"><span class="rail-node" aria-hidden="true"></span><div class="experience-context"><span class="eyebrow">{{ entry.number }} / {{ entry.duration }}</span><h3>{{ entry.organization }}</h3></div><div class="experience-description"><h4>{{ entry.role }}</h4><p>{{ entry.description }}</p><ul class="experience-topics"><li v-for="topic in entry.topics" :key="topic">{{ topic }}</li></ul></div></article></div></section>
</template>
