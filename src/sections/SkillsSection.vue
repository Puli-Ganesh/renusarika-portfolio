<script setup lang="ts">
import { skills } from '../data/portfolio';
import { sceneState } from '../composables/experienceState';
import SectionLabel from '../components/SectionLabel.vue';
import SceneFrame from '../components/SceneFrame.vue';
</script>
<template>
  <section id="skills" class="skills-section section-wrap" aria-labelledby="skills-title" tabindex="-1">
    <SectionLabel number="02" text="TECHNICAL TOOLKIT" />
    <div class="section-heading"><h2 id="skills-title">A system is more<br>than its <em>model.</em></h2><p>From algorithms to infrastructure.<br>A toolkit shaped by experimentation.</p></div>
    <div class="skills-grid">
      <div class="skill-categories content-plane" role="group" aria-label="Skill categories"><button v-for="(skill,index) in skills" :key="skill.name" type="button" :aria-pressed="sceneState.skill === index" aria-controls="skill-detail" @click="sceneState.skill = index"><span>0{{ index+1 }}</span><strong>{{ skill.name }}</strong><span class="skill-plus">{{ sceneState.skill === index ? '−' : '+' }}</span></button></div>
      <div class="skill-visual"><SceneFrame kind="skills" /><span class="constellation-label top">CONNECTED KNOWLEDGE</span><div id="skill-detail" class="skill-detail content-plane" aria-live="polite"><p class="eyebrow">{{ skills[sceneState.skill].name }}</p><h3>{{ skills[sceneState.skill].note }}</h3><ul class="skill-tags"><li v-for="item in skills[sceneState.skill].items" :key="item">{{ item }}</li></ul></div></div>
    </div>
  </section>
</template>
