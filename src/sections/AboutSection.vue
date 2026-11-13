<script setup lang="ts">
import SectionLabel from '../components/SectionLabel.vue';
import SmartPhoto from '../components/SmartPhoto.vue';
import ArrowIcon from '../components/ArrowIcon.vue';
import { education } from '../data/portfolio';
</script>
<template>
  <section id="about" class="about-section section-wrap" aria-labelledby="about-title" tabindex="-1">
    <SectionLabel number="01" text="THE PERSON" />
    <div class="about-grid">
      <div class="about-image-wrap"><div class="image-index">HUMAN INTELLIGENCE / 01</div><SmartPhoto role="about" /><p class="image-footnote">An idea is a system<br>waiting to move.</p><span class="photo-corner" aria-hidden="true">+</span></div>
      <div class="about-copy content-plane"><p class="eyebrow">A LITTLE CONTEXT</p><h2 id="about-title">A curious mind.<br>A systems<br><em>perspective.</em></h2><p>I'm Renusarika, a Computer Science (CIC) undergraduate at Annamacharya Institute of Technology and Sciences, Tirupati.</p><p>I enjoy investigating how machine learning systems make decisions—and how to make the software behind them efficient, measurable, and dependable.</p><a class="text-link" href="#projects">Curiosity → Experimentation → Systems thinking <ArrowIcon /></a><div class="about-facts"><div><strong>{{ education.cgpa }}<small>/10</small></strong><span>CGPA</span></div><div><strong>{{ education.expectedYear }}</strong><span>EXPECTED GRADUATION</span></div></div></div>
    </div>
  </section>
</template>
