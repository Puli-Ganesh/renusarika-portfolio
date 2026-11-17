<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { stages } from '../content/portfolio';
import { useCoordinator } from '../motion/coordinator';
import { figureProgress } from '../motion/math';
import PipelineFallback from './PipelineFallback.vue';
import type { Exhibit } from '../three/exhibit';

const motion=useCoordinator();
const figure=ref<HTMLElement>(),surface=ref<HTMLElement>();
const ready=ref(false),active=ref(2),separation=ref(0);
const manual=ref<number|null>(null);
let exhibit:Exhibit|undefined,canvas:HTMLCanvasElement|undefined;
let nearby=false,failed=false,loading=false,dead=false;
let observer:IntersectionObserver,resizeObserver:ResizeObserver;
let unsubscribe:(()=>void)|undefined;
let manualScroll=0,lastWidth=0,lastHeight=0,slowFrames=0;
function selectStage(index:number){active.value=index;manual.value=1;manualScroll=window.scrollY;motion.invalidate();}
function setPose(pose:number){manual.value=pose;manualScroll=window.scrollY;motion.invalidate();}
function fallback(){
  ready.value=false;failed=true;
  try{exhibit?.dispose();}catch{ /* The readable SVG remains available if the GPU context has failed. */ }
  exhibit=undefined;canvas?.remove();
}

async function enhance(){
  if(!nearby||motion.reduced.value||failed||loading||exhibit||dead||!surface.value)return;
  loading=true;
  try{
    canvas=document.createElement('canvas');
    const context=canvas.getContext('webgl2',{antialias:innerWidth>600,alpha:false,powerPreference:'low-power'});
    if(!context){failed=true;return;}
    const {createExhibit}=await import('../three/exhibit');
    if(dead||motion.reduced.value){context.getExtension('WEBGL_lose_context')?.loseContext();return;}
    canvas.setAttribute('aria-hidden','true');canvas.className='gpu-canvas';
    surface.value.append(canvas);
    exhibit=createExhibit(canvas,context,value=>{ready.value=value;motion.invalidate();});
    const rect=surface.value.getBoundingClientRect();lastWidth=rect.width;lastHeight=rect.height;
    exhibit.resize(lastWidth,lastHeight);motion.invalidate();
  }catch(error){fallback();console.warn('3D enhancement unavailable; the layered illustration remains active.',error);}
  finally{loading=false;}
}

const stopPreference=watch(motion.reduced,reduce=>{
  if(reduce){manual.value=null;separation.value=1;exhibit?.dispose();exhibit=undefined;canvas?.remove();ready.value=false;}
  else enhance();
  motion.invalidate();
});

onMounted(()=>{
  observer=new IntersectionObserver(entries=>{nearby=entries[0].isIntersecting;if(nearby){enhance();motion.invalidate();}},{rootMargin:'240px'});
  observer.observe(figure.value!);
  resizeObserver=new ResizeObserver(()=>motion.invalidate());resizeObserver.observe(surface.value!);
  unsubscribe=motion.subscribe(({delta,reduced,viewportHeight,viewportWidth})=>{
    if(!surface.value)return;
    const rect=surface.value.getBoundingClientRect();
    if(manual.value!==null&&Math.abs(window.scrollY-manualScroll)>28)manual.value=null;
    const target=reduced?(manual.value??1):manual.value??figureProgress(rect.top,viewportHeight);
    const visible=rect.bottom>0&&rect.top<viewportHeight;
    if(!visible){separation.value=target;return;}
    const difference=target-separation.value;
    separation.value=reduced||Math.abs(difference)<.0006?target:separation.value+difference*(1-Math.exp(-13*delta));
    if(exhibit&&!reduced&&ready.value){
      try{
        if(rect.width!==lastWidth||rect.height!==lastHeight){lastWidth=rect.width;lastHeight=rect.height;exhibit.resize(lastWidth,lastHeight);}
        const duration=exhibit.render(separation.value,active.value,viewportWidth<600);
        slowFrames=duration>55?slowFrames+1:0;
        if(slowFrames>=6)fallback();
      }catch{fallback();}
    }
    return Math.abs(target-separation.value)>.0006;
  });
});
onBeforeUnmount(()=>{dead=true;observer?.disconnect();resizeObserver?.disconnect();unsubscribe?.();stopPreference();exhibit?.dispose();canvas?.remove();});
</script>
<template>
  <figure ref="figure" class="gpu-figure" aria-label="Exploded illustration of the training workflow">
    <div class="gpu-controls" role="group" aria-label="Training module view"><button :aria-pressed="manual===0" @click="setPose(0)">Assembled</button><button :aria-pressed="manual===1" @click="setPose(1)">Separated</button></div>
    <div ref="surface" class="gpu-surface" :class="{ 'webgl-ready': ready }" :data-separation="separation.toFixed(3)"><PipelineFallback :separation="separation" :active="active" /></div>
    <div class="gpu-stage-select" role="group" aria-label="Training workflow stages"><button v-for="(stage,index) in stages" :key="stage.name" :aria-pressed="active===index" @click="selectStage(index)">{{ stage.name }}</button></div>
    <p class="gpu-stage-detail" aria-live="polite">{{ stages[active].detail }}</p>
    <figcaption>Illustration of the training workflow.</figcaption>
  </figure>
</template>
