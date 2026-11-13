import { watch } from 'vue';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import type { SceneHost } from './SceneHost';
import { motionReduced, sceneState, activeChapter, readingProgress, webglFailed } from '../composables/experienceState';
import { clamp, pipelineStageAt } from '../utils/math';

gsap.registerPlugin(ScrollTrigger);
export function startExperience() {
  let host:SceneHost|undefined;
  let lenis:Lenis|undefined;
  let disposed=false;
  let resizeTimer=0;
  let lastTime=0;
  let demoTime=0;
  let wasRunning=false;
  let pointerActive=false;
  let loadingScene=false;
  const mobile=matchMedia('(max-width: 700px)');
  const preference=matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer=matchMedia('(pointer: fine)');
  const triggers:ScrollTrigger[]=[];

  async function setupModes(){
    lenis?.destroy();lenis=undefined;
    if(!motionReduced.value && !mobile.matches && finePointer.matches){
      lenis=new Lenis({duration:.8,smoothWheel:true,syncTouch:false,anchors:false});
      lenis.on('scroll',ScrollTrigger.update);
    }
    const enhance=!motionReduced.value && !mobile.matches;
    host?.setVisible(enhance);
    if(motionReduced.value){sceneState.demoRunning=false;sceneState.schedulerProgress=1;sceneState.schedulerBeat=3;}
    host?.resize();ScrollTrigger.refresh();
    if(enhance && !host && !webglFailed.value && !loadingScene){
      loadingScene=true;
      try {
        const canvas=document.createElement('canvas');
        const context=canvas.getContext('webgl2',{alpha:true,antialias:true});
        if(!context){webglFailed.value=true;return;}
        // Mobile and reduced-motion visits never fetch the Three.js chunk.
        const module=await import('./SceneHost');
        if(disposed || motionReduced.value || mobile.matches){context.getExtension('WEBGL_lose_context')?.loseContext();return;}
        host=new module.SceneHost(canvas,context);
        host.measure();ScrollTrigger.refresh();
      }catch(error){webglFailed.value=true;console.warn('WebGL unavailable; using the complete static illustration.',error);}
      finally{loadingScene=false;}
    }
  }
  const stopMotionWatch=watch(motionReduced,setupModes);
  const updatePreference=()=>{motionReduced.value=preference.matches;};
  preference.addEventListener('change',updatePreference);mobile.addEventListener('change',setupModes);
  setupModes();
  // One central ScrollTrigger driver. Native document scrolling remains authoritative.
  for(const section of document.querySelectorAll<HTMLElement>('main>section')){
    triggers.push(ScrollTrigger.create({trigger:section,start:'top 35%',end:'bottom 35%',onToggle:self=>{if(self.isActive)activeChapter.value=section.id;}}));
  }
  triggers.push(ScrollTrigger.create({trigger:'#projects',start:'top 40%',end:'bottom 55%',onUpdate:self=>{
    if(!sceneState.demoRunning){sceneState.schedulerProgress=self.progress;sceneState.schedulerBeat=Math.min(3,Math.floor(self.progress*4));}
  }}));
  triggers.push(ScrollTrigger.create({trigger:'#pipeline',start:'top 30%',end:'bottom 75%',onUpdate:self=>{
    sceneState.pipelineProgress=self.progress;
    if(!sceneState.pipelineManual)sceneState.pipelineStage=pipelineStageAt(self.progress);
  }}));
  triggers.push(ScrollTrigger.create({start:0,end:'max',onUpdate:self=>{readingProgress.value=self.progress;}}));
  // First paint stays readable; entrance motion affects position only, never visibility.
  const entrance=gsap.context(()=>{
    if(!motionReduced.value){gsap.from('.hero-copy',{y:14,duration:.8,ease:'power2.out'});gsap.from('.hero-portrait',{y:18,duration:1,ease:'power2.out'});}
  });

  function tick(time:number){
    const delta=Math.min(.05,Math.max(0,time-lastTime));lastTime=time;
    if(document.hidden)return;
    lenis?.raf(time*1000);
    if(sceneState.demoRunning){
      if(!wasRunning)demoTime=0;
      demoTime+=delta;sceneState.schedulerProgress=clamp(demoTime/5);
      sceneState.schedulerBeat=Math.min(3,Math.floor(sceneState.schedulerProgress*4));
      if(demoTime>=5)sceneState.demoRunning=false;
    }
    wasRunning=sceneState.demoRunning;
    if(!motionReduced.value&&!mobile.matches)host?.render(time);
  }
  gsap.ticker.lagSmoothing(0);gsap.ticker.add(tick);
  function resize(){window.clearTimeout(resizeTimer);resizeTimer=window.setTimeout(()=>{host?.resize();lenis?.resize();ScrollTrigger.refresh();},120);}
  const observer=new ResizeObserver(resize);observer.observe(document.querySelector('main')!);
  window.addEventListener('resize',resize);
  function pointer(event:PointerEvent){if(!finePointer.matches||motionReduced.value)return;pointerActive=true;host?.setPointer(clamp(event.clientX/window.innerWidth*2-1,-1,1),clamp(1-event.clientY/window.innerHeight*2,-1,1));}
  function pointerLeave(){if(pointerActive)host?.setPointer(0,0);pointerActive=false;}
  window.addEventListener('pointermove',pointer,{passive:true});document.addEventListener('pointerleave',pointerLeave);
  function scrollToTarget(hash:string,updateHistory:boolean){
    const target=hash==='#main'?document.querySelector<HTMLElement>('main'):document.getElementById(hash.slice(1));
    if(!target)return;
    if(updateHistory && location.hash!==hash)history.pushState(null,'',hash);
    const destination=Math.max(0,target.getBoundingClientRect().top+window.scrollY-100);
    const focus=()=>{target.focus({preventScroll:true});ScrollTrigger.update();};
    if(lenis)lenis.scrollTo(destination,{duration:.85,onComplete:focus});else{window.scrollTo({top:destination,behavior:'instant'});focus();}
  }
  function onAnchor(event:MouseEvent){
    if(event.defaultPrevented||event.metaKey||event.ctrlKey||event.altKey||event.shiftKey||event.button!==0)return;
    const anchor=(event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
    if(anchor && anchor.hash.length>1){event.preventDefault();scrollToTarget(anchor.hash,true);}
  }
  const onHistory=()=>{if(location.hash)scrollToTarget(location.hash,false);else window.scrollTo({top:0,behavior:'instant'});};
  document.addEventListener('click',onAnchor);window.addEventListener('popstate',onHistory);window.addEventListener('hashchange',onHistory);
  const onVisibility=()=>{if(!document.hidden){lastTime=gsap.ticker.time;host?.measure();ScrollTrigger.refresh();}};
  document.addEventListener('visibilitychange',onVisibility);
  document.fonts.ready.then(()=>{if(!disposed){host?.measure();ScrollTrigger.refresh();if(location.hash)scrollToTarget(location.hash,false);}});
  return ()=>{
    disposed=true;window.clearTimeout(resizeTimer);observer.disconnect();triggers.forEach(trigger=>trigger.kill());entrance.revert();gsap.ticker.remove(tick);lenis?.destroy();host?.dispose();stopMotionWatch();
    preference.removeEventListener('change',updatePreference);mobile.removeEventListener('change',setupModes);window.removeEventListener('resize',resize);window.removeEventListener('pointermove',pointer);document.removeEventListener('pointerleave',pointerLeave);document.removeEventListener('click',onAnchor);window.removeEventListener('popstate',onHistory);window.removeEventListener('hashchange',onHistory);document.removeEventListener('visibilitychange',onVisibility);
  };
}
