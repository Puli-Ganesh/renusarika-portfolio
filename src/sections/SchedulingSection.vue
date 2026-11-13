<script setup lang="ts">
import { ref, computed } from 'vue';
import { projects, schedulerBeats } from '../data/portfolio';
import { sceneState, motionReduced } from '../composables/experienceState';
import { demoTasks, demoHeuristicSchedule } from '../utils/math';
import SectionLabel from '../components/SectionLabel.vue';
import SceneFrame from '../components/SceneFrame.vue';
import ArrowIcon from '../components/ArrowIcon.vue';
const project = projects[0];
const open = ref(false);
const assignments = computed(() => demoHeuristicSchedule(demoTasks, sceneState.resourceCount));
function runDemo() {
  if (motionReduced.value) { sceneState.schedulerProgress = 1; sceneState.schedulerBeat = 3; return; }
  sceneState.schedulerProgress = 0;
  sceneState.schedulerBeat = 0;
  sceneState.demoRunning = true;
}
function chooseBeat(i: number) { sceneState.demoRunning = false; sceneState.schedulerBeat = i; sceneState.schedulerProgress = i / 3; }
</script>
<template>
  <section id="projects" class="project-section scheduling-section section-wrap" aria-labelledby="scheduler-title" tabindex="-1">
    <SectionLabel number="03" text="SELECTED WORK / DECISION SYSTEMS" />
    <div class="project-heading"><div><p class="eyebrow">PROJECT 01</p><h2 id="scheduler-title">Every task.<br>A better <em>decision.</em></h2></div><span class="project-number" aria-hidden="true">01</span></div>
    <div class="project-grid">
      <div class="project-copy content-plane"><ul class="stack"><li v-for="item in project.stack" :key="item">{{ item }}</li></ul><h3>{{ project.title }}</h3><p>{{ project.summary }}</p><div class="project-text-block"><h4>The challenge</h4><p>{{ project.problem }}</p></div><div class="project-text-block"><h4>The approach</h4><p>{{ project.approach }}</p></div><button class="text-link disclosure-button" type="button" :aria-expanded="open" aria-controls="rl-logic" @click="open = !open">Explore the logic <span>{{ open ? '−' : '+' }}</span></button><div v-if="open" id="rl-logic" class="logic-panel" @keydown.esc="open=false"><h4>Typical design considerations</h4><p>A scheduling state can describe pending work, priorities, and available resources. An action chooses where or when to run a task.</p><p>PPO learns a decision policy from interaction with an environment. Reward design typically balances delay, resource use, and completion; the exact reward formula is not supplied here.</p><p>Baseline comparisons help assess whether a learned policy is useful. This site's illustration uses a priority-first, least-loaded-resource heuristic, not a trained PPO model.</p></div></div>
      <div class="scheduler-visual-wrap"><div class="project-visual sticky-visual"><div class="visual-top content-plane"><span><i class="status-dot"></i> DECISION ENGINE</span><span>INTERACTIVE STUDY</span></div><SceneFrame kind="scheduler"><div class="scene-axis content-plane"><span>QUEUE</span><span>POLICY</span><span>RESOURCES</span></div></SceneFrame><div class="beat-controls content-plane" role="group" aria-label="Scheduling illustration stages"><button v-for="(beat,index) in schedulerBeats" :key="beat" type="button" :aria-pressed="sceneState.schedulerBeat === index" @click="chooseBeat(index)"><span>0{{ index+1 }}</span><span>{{ beat }}</span></button></div><div class="demo-controls content-plane"><label>Resources <select v-model.number="sceneState.resourceCount" aria-label="Available demo resources"><option :value="2">2</option><option :value="3">3</option><option :value="4">4</option></select></label><button type="button" @click="runDemo" :disabled="sceneState.demoRunning">{{ sceneState.demoRunning ? 'Routing tasks…' : 'Run illustration' }} <ArrowIcon direction="right" /></button></div><p class="illustration-note content-plane">Illustrative simulation — not a trained PPO model or measured benchmark.</p><details class="assignment-details content-plane"><summary>Read the demonstration output</summary><p>Sample task assignments from the site's deterministic heuristic:</p><ul><li v-for="task in assignments" :key="task.id">Task {{ task.id }} → Resource {{ task.lane + 1 }} · demo priority {{ task.priority }}</li></ul></details></div></div>
    </div>
    <div class="measurement-strip content-plane"><span>WHAT GETS MEASURED</span><p>Completion time <i><ArrowIcon /></i> Resource utilization <i><ArrowIcon /></i> System throughput</p></div>
  </section>
</template>
