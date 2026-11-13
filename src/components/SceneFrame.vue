<script setup lang="ts">
import type { SceneKind } from '../composables/experienceState';
import { sceneState } from '../composables/experienceState';
import { pipelineStages } from '../data/portfolio';
defineProps<{ kind: SceneKind }>();
</script>
<template>
  <div class="scene-frame" :class="`scene-${kind}`">
    <div class="scene-slot" :data-scene="kind" aria-hidden="true"></div>
    <div class="fallback-art" :class="`fallback-${kind}`" aria-hidden="true">
      <div v-if="kind === 'pipeline'" class="static-stack" :class="{ assembled: sceneState.pipelinePose === 'assembled' }"><div v-for="(stage,index) in pipelineStages" :key="stage.short" class="static-layer" :class="{ active: sceneState.pipelineStage === index }" :style="{ '--i': index, '--layer-color': stage.color }"><span>{{ stage.short }}</span><i></i><b></b></div></div>
      <div v-else-if="kind === 'scheduler'" class="static-scheduler"><div class="queue"><i v-for="n in 6" :key="n">{{ String.fromCharCode(64 + n) }}</i></div><span class="flow-arrow">→</span><div class="policy">POLICY<br><b>Decision</b></div><span class="flow-arrow">→</span><div class="lanes"><i v-for="n in sceneState.resourceCount" :key="n">RESOURCE {{ n }}<span></span></i></div></div>
      <svg v-else viewBox="0 0 600 600" fill="none"><ellipse cx="300" cy="300" rx="245" ry="180" transform="rotate(-30 300 300)" stroke="currentColor" opacity=".5"/><ellipse cx="300" cy="300" rx="240" ry="200" transform="rotate(35 300 300)" stroke="currentColor" opacity=".25"/><circle cx="300" cy="300" r="150" stroke="currentColor" stroke-dasharray="2 12"/><path d="m150 145 300 310M85 330l410-60M200 500 400 90M150 145l345 125-295 230L85 330 400 90l50 365Z" stroke="currentColor" opacity=".25"/><circle v-for="point in [[150,145],[450,455],[85,330],[495,270],[200,500],[400,90]]" :key="point[0]" :cx="point[0]" :cy="point[1]" r="8" fill="currentColor"/></svg>
    </div>
    <slot></slot>
  </div>
</template>
