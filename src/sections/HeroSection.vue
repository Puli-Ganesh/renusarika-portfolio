<script setup lang="ts">
import SmartPhoto from '../components/SmartPhoto.vue';
import SceneFrame from '../components/SceneFrame.vue';
import ResumeLink from '../components/ResumeLink.vue';
import ArrowIcon from '../components/ArrowIcon.vue';
</script>
<template>
  <section id="hero" class="hero section-wrap" aria-labelledby="hero-title" tabindex="-1">
    <div class="hero-topline"><p><i class="status-dot"></i> COMPUTER SCIENCE UNDERGRADUATE</p><span>PERSONAL PORTFOLIO / 2026</span></div>
    <div class="hero-grid">
      <div class="hero-copy content-plane">
        <h1 id="hero-title"><span class="hero-name">Rachamalli Renusarika</span><span class="hero-display">Systems<br>in <em>motion.</em></span></h1>
        <p class="hero-intro">I explore how intelligent systems<br class="desktop-break"> learn, decide, and perform.</p>
        <p class="hero-disciplines">AI / ML <span>·</span> REINFORCEMENT LEARNING<br>EFFICIENT TRAINING SYSTEMS</p>
        <div class="hero-ctas"><a class="button primary" href="#projects">Explore my work <ArrowIcon /></a><ResumeLink /></div>
      </div>
      <div class="hero-art">
        <SceneFrame kind="hero" />
        <div class="portrait-outline"></div>
        <div class="hero-portrait"><SmartPhoto role="hero" eager /><div class="portrait-caption"><span>THE HUMAN<br>BEHIND THE SYSTEM.</span><ArrowIcon /></div></div>
        <p class="orbit-caption">CURIOSITY, IN CONSTANT MOTION</p>
        <div class="portrait-note"><i></i><span>Learning.<br>Building.<br>Becoming.</span></div>
      </div>
    </div>
    <div class="hero-bottom content-plane"><span>B.Tech (CIC) <i>/</i> Expected 2027</span><a href="#about">SCROLL TO EXPLORE <ArrowIcon direction="down" /></a><span class="hero-coordinate">INPUT → DECISION → POSSIBILITY</span></div>
  </section>
</template>
