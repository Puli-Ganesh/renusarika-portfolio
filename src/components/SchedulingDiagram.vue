<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue';
import { useCoordinator } from '../motion/coordinator';
import { sampleRoutes } from '../motion/math';
import IconArrow from './IconArrow.vue';

const motion = useCoordinator();
const selected = ref(0);
const tracing = ref(false);
const progress = ref(0);
let unsubscribe: (() => void) | undefined;
function routeTask(index: number) {
  unsubscribe?.();
  selected.value = index;
  if (motion.reduced.value) { progress.value = 1; tracing.value = false; return; }
  progress.value = 0; tracing.value = true;
  unsubscribe = motion.subscribe(({ delta, reduced }) => {
    progress.value = reduced ? 1 : Math.min(1, progress.value + delta / 1.15);
    if (progress.value === 1) { tracing.value = false; unsubscribe?.(); return false; }
    return true;
  });
  motion.invalidate();
}
onBeforeUnmount(() => unsubscribe?.());
</script>
<template>
  <figure class="scheduling-figure" aria-label="Task queue, scheduling policy, and available resources">
    <div class="scheduler-headers" aria-hidden="true"><span>Task queue</span><span>Scheduling policy</span><span>Available resources</span></div>
    <div class="scheduler-body" :class="{ tracing }" :style="{ '--route-progress': progress, '--selected': selected }">
      <div class="task-queue" role="group" aria-label="Choose a sample task">
        <button v-for="(route, index) in sampleRoutes" :key="route.task" :aria-pressed="selected === index" @click="routeTask(index)" :aria-label="`Route sample task ${route.task}`"><span>Task {{ route.task }}</span><span class="task-bars" aria-hidden="true"><i></i><i></i><i></i></span></button>
      </div>
      <div class="route-connector incoming" aria-hidden="true"><span></span><IconArrow direction="right" /></div>
      <div class="policy-block"><span class="policy-mark" aria-hidden="true"><i></i><i></i><i></i></span><strong>Policy</strong><span>Observe · Decide</span></div>
      <div class="route-connector outgoing" aria-hidden="true"><span></span><IconArrow direction="right" /></div>
      <div class="resource-bank">
        <div v-for="resource in [1,2,3]" :key="resource" :class="{ 'is-selected': resource === sampleRoutes[selected].resource }"><span>Resource {{ resource }}</span><div class="resource-slots" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div></div>
      </div>
    </div>
    <div class="scheduler-bottom"><p class="route-description" aria-live="polite">Task {{ sampleRoutes[selected].task }} <span aria-hidden="true">→</span> Resource {{ sampleRoutes[selected].resource }} <span class="route-reason">{{ sampleRoutes[selected].reason }}</span></p><button class="route-action" @click="routeTask((selected + 1) % sampleRoutes.length)">Route next task <IconArrow direction="right" /></button></div>
    <figcaption>Illustrative routing schematic; does not run the trained PPO model.</figcaption>
  </figure>
</template>
