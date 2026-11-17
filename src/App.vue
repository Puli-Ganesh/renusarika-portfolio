<script setup lang="ts">
import { onMounted, onBeforeUnmount, provide, ref, watch } from 'vue';
import { profile, projects, experiences } from './content/portfolio';
import { createCoordinator, coordinatorKey } from './motion/coordinator';
import PhotoExhibit from './components/PhotoExhibit.vue';
import SchedulingDiagram from './components/SchedulingDiagram.vue';
import GpuExhibit from './components/GpuExhibit.vue';
import Portrait from './components/Portrait.vue';
import IconArrow from './components/IconArrow.vue';

const reduced = ref(matchMedia('(prefers-reduced-motion: reduce)').matches);
const coordinator=createCoordinator(reduced);
provide(coordinatorKey,coordinator);
const preference=matchMedia('(prefers-reduced-motion: reduce)');
const updatePreference=()=>{reduced.value=preference.matches;};
watch(reduced,()=>{document.documentElement.classList.toggle('reduce-animations',reduced.value);coordinator.invalidate();});
onMounted(()=>{
  document.documentElement.classList.toggle('reduce-animations',reduced.value);
  preference.addEventListener('change',updatePreference);
  coordinator.start();
});
onBeforeUnmount(()=>{preference.removeEventListener('change',updatePreference);coordinator.stop();});
</script>
<template>
  <a href="#main" class="skip-link">Skip to content</a>
  <header class="site-header">
    <div class="container header-inner"><a href="#home" class="wordmark" aria-label="Renusarika, home">{{ profile.wordmark }}</a><nav aria-label="Main navigation"><a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact</a></nav></div>
  </header>
  <main id="main" tabindex="-1">
    <section id="home" class="hero container" aria-labelledby="name" tabindex="-1">
      <div class="hero-copy"><h1 id="name">Rachamalli<br>Renusarika</h1><p class="study-status">{{ profile.status }}<span>{{ profile.graduation }}</span></p><p class="hero-intro">{{ profile.intro }}</p><div class="hero-actions"><a class="button" href="#work">View projects <IconArrow direction="right" /></a><a v-if="profile.resume" class="text-link resume-link" :href="profile.resume" download>Download résumé <IconArrow direction="down" /></a></div></div>
      <PhotoExhibit />
    </section>

    <section id="work" class="work-section container" aria-labelledby="work-title" tabindex="-1">
      <h2 id="work-title" class="section-title">Selected projects</h2>
      <article id="scheduling" class="scheduling-project" aria-labelledby="scheduling-title" tabindex="-1">
        <div class="project-intro"><div><h3 id="scheduling-title">{{ projects.scheduling.title }}</h3><p class="technology">{{ projects.scheduling.stack.join(' · ') }}</p></div><div class="project-description"><p>{{ projects.scheduling.description }}</p><div v-if="projects.scheduling.source || projects.scheduling.demo" class="project-links"><a v-if="projects.scheduling.source" :href="projects.scheduling.source" class="text-link" target="_blank" rel="noopener noreferrer">View source <IconArrow /></a><a v-if="projects.scheduling.demo" :href="projects.scheduling.demo" class="text-link" target="_blank" rel="noopener noreferrer">View demo <IconArrow /></a></div></div></div>
        <SchedulingDiagram />
      </article>
      <article id="training" class="training-project" aria-labelledby="training-title" tabindex="-1">
        <div class="training-copy"><h3 id="training-title">{{ projects.training.title }}</h3><p class="technology">{{ projects.training.stack.join(' · ') }}</p><p class="training-description">{{ projects.training.description }}</p><div v-if="projects.training.source || projects.training.demo" class="project-links"><a v-if="projects.training.source" :href="projects.training.source" class="text-link" target="_blank" rel="noopener noreferrer">View source <IconArrow /></a><a v-if="projects.training.demo" :href="projects.training.demo" class="text-link" target="_blank" rel="noopener noreferrer">View demo <IconArrow /></a></div></div>
        <GpuExhibit />
      </article>
    </section>

    <section id="about" class="about-section container" aria-labelledby="about-title" tabindex="-1">
      <div class="about-grid"><div class="about-portrait"><Portrait role="about" sizes="(max-width:600px) 76vw, 330px" /></div><div class="about-copy"><h2 id="about-title" class="section-title">About</h2><p class="about-bio">{{ profile.about }}</p><dl class="education"><div><dt>Education</dt><dd>{{ profile.education.degree }}</dd></div><div><dt>Batch</dt><dd>{{ profile.education.years }}</dd></div><div><dt>CGPA</dt><dd>{{ profile.education.cgpa }}</dd></div></dl><p class="specialization">{{ profile.education.specialization }}</p><div class="toolkit"><h3>Technical toolkit</h3><ul><li v-for="skill in profile.toolkit" :key="skill">{{ skill }}</li></ul></div></div></div>
      <div class="experience"><h2 class="section-title">Experience</h2><div class="experience-list"><article v-for="entry in experiences" :key="entry.role"><h3>{{ entry.role }}</h3><p class="experience-meta">{{ entry.organization }}<span v-if="entry.duration">{{ entry.duration }}</span></p><p>{{ entry.description }}</p></article></div></div>
    </section>

    <section id="contact" class="contact-section" aria-labelledby="contact-title" tabindex="-1"><div class="container contact-grid"><div class="contact-copy"><h2 id="contact-title">Contact</h2><a class="email-link" :href="`mailto:${profile.email}`">{{ profile.email }}<IconArrow /></a><div v-if="profile.github || profile.linkedin" class="profile-links"><a v-if="profile.github" :href="profile.github" target="_blank" rel="noopener noreferrer">GitHub <IconArrow /></a><a v-if="profile.linkedin" :href="profile.linkedin" target="_blank" rel="noopener noreferrer">LinkedIn <IconArrow /></a></div></div><div class="contact-portrait"><Portrait role="contact" sizes="(max-width:600px) 150px, 210px" /></div></div></section>
  </main>
  <footer class="site-footer container"><p>© 2026 {{ profile.name }}</p><button class="animation-preference" :aria-pressed="reduced" @click="reduced=!reduced"><span class="toggle-track" aria-hidden="true"><span></span></span>Reduce animations</button></footer>
</template>
