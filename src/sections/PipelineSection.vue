<script setup lang="ts">
import { projects, pipelineStages } from '../data/portfolio';
import { sceneState, selectPipelineStage } from '../composables/experienceState';
import SectionLabel from '../components/SectionLabel.vue';
import SceneFrame from '../components/SceneFrame.vue';
import ArrowIcon from '../components/ArrowIcon.vue';
const project = projects[1];
</script>
<template>
  <section id="pipeline" class="project-section pipeline-section section-wrap" aria-labelledby="pipeline-title" tabindex="-1">
    <SectionLabel number="04" text="SELECTED WORK / COMPUTATIONAL EFFICIENCY" />
    <div class="project-heading"><div><p class="eyebrow">PROJECT 02</p><h2 id="pipeline-title">Inside the<br><em>training loop.</em></h2></div><span class="project-number" aria-hidden="true">02</span></div>
    <div class="project-grid pipeline-grid">
      <div class="project-copy content-plane"><ul class="stack"><li v-for="item in project.stack" :key="item">{{ item }}</li></ul><h3>{{ project.title }}</h3><p>{{ project.summary }}</p><div class="pipeline-stages" role="group" aria-label="Explore training pipeline stages"><button v-for="(stage,index) in pipelineStages" :key="stage.name" type="button" :aria-pressed="sceneState.pipelineStage === index" @click="selectPipelineStage(index)"><span>0{{ index+1 }}</span><span>{{ stage.name }}</span><ArrowIcon v-if="sceneState.pipelineStage === index" /><span v-else>+</span></button></div><div class="stage-description" aria-live="polite"><h4>{{ pipelineStages[sceneState.pipelineStage].name }}</h4><p>{{ pipelineStages[sceneState.pipelineStage].detail }}</p></div><button v-if="sceneState.pipelineManual" class="text-link" type="button" @click="sceneState.pipelineManual=false; sceneState.pipelinePose='scroll'">Follow scroll again <span>↓</span></button></div>
      <div class="pipeline-visual-wrap"><div class="project-visual sticky-visual"><div class="visual-top content-plane"><span><i class="status-dot violet"></i> THE COMPUTE INSTRUMENT</span><span>{{ sceneState.pipelineManual ? 'STAGE INSPECTION' : 'SCROLL TO DISASSEMBLE' }}</span></div><SceneFrame kind="pipeline"><span class="pipeline-object-label content-plane">0{{ sceneState.pipelineStage+1 }} / {{ pipelineStages[sceneState.pipelineStage].short }}</span><span class="model-orbit-label content-plane">INPUT → LEARNING → INSIGHT</span></SceneFrame><div class="pose-controls content-plane" role="group" aria-label="Pipeline assembly view"><button type="button" :aria-pressed="sceneState.pipelinePose === 'assembled'" @click="sceneState.pipelinePose='assembled'; sceneState.pipelineManual=true">Assembled</button><button type="button" :aria-pressed="sceneState.pipelinePose === 'exploded'" @click="sceneState.pipelinePose='exploded'; sceneState.pipelineManual=true">Exploded</button><button type="button" :aria-pressed="sceneState.pipelinePose === 'scroll'" @click="sceneState.pipelinePose='scroll'; sceneState.pipelineManual=false">Follow scroll</button></div><div class="pipeline-progress content-plane" aria-hidden="true"><span v-for="(stage,index) in pipelineStages" :key="stage.name" :class="{ active: sceneState.pipelineStage === index }"></span></div><p class="illustration-note content-plane">Conceptual training workflow. Select any stage to explore.</p></div></div>
    </div>
    <div class="pipeline-method content-plane"><div><h4>The approach</h4><p>{{ project.approach }}</p></div><div><h4>The systems perspective</h4><p>{{ project.problem }} No performance percentages or hardware benchmarks are claimed.</p></div></div>
  </section>
</template>
