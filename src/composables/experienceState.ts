import { reactive, ref } from 'vue';

export type SceneKind = 'hero' | 'about' | 'skills' | 'scheduler' | 'pipeline' | 'contact';
export const motionReduced = ref(false);
export const webglReady = ref(false);
export const webglFailed = ref(false);
export const activeChapter = ref('hero');
export const readingProgress = ref(0);
export const sceneState = reactive({
  skill: 0,
  schedulerProgress: 0,
  schedulerBeat: 0,
  resourceCount: 3,
  demoRunning: false,
  pipelineProgress: 0,
  pipelineStage: 0,
  pipelineManual: false,
  pipelinePose: 'scroll' as 'scroll' | 'assembled' | 'exploded',
});

export function selectPipelineStage(index: number) {
  sceneState.pipelineStage = index;
  sceneState.pipelineManual = true;
  sceneState.pipelinePose = 'exploded';
}
