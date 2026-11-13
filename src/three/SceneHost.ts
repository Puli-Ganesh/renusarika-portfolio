import * as THREE from 'three';
import { createNeuralConstellation, createGpuPipeline, createTaskScheduler, disposeObject } from './primitives';
import type { Sculpture } from './primitives';
import type { SceneKind } from '../composables/experienceState';
import { sceneState, webglFailed, webglReady } from '../composables/experienceState';

type View = { element: HTMLElement; kind: SceneKind; scene: THREE.Scene; camera: THREE.PerspectiveCamera; sculpture: Sculpture; bounds: {left:number;top:number;width:number;height:number} };
export class SceneHost {
  private renderer: THREE.WebGLRenderer;
  private views: View[] = [];
  private width=0;
  private height=0;
  private scale=1;
  private lost=false;
  private lastRender=0;
  private pointer={x:0,y:0};
  private lowPower=false;
  private onLost=(event:Event)=>{event.preventDefault();this.lost=true;webglFailed.value=true;webglReady.value=false;this.renderer.domElement.style.visibility='hidden';};
  private onRestored=()=>{this.lost=false;webglFailed.value=false;webglReady.value=true;this.renderer.domElement.style.visibility='visible';this.resize();};
  constructor(canvasElement: HTMLCanvasElement, context: WebGL2RenderingContext) {
    const nav=navigator as Navigator & {deviceMemory?:number;connection?:{saveData?:boolean}};
    this.lowPower=(nav.deviceMemory!==undefined && nav.deviceMemory<=4)||navigator.hardwareConcurrency<=4||Boolean(nav.connection?.saveData);
    this.renderer=new THREE.WebGLRenderer({canvas:canvasElement,context,alpha:true,antialias:!this.lowPower,powerPreference:'default'});
    this.renderer.setClearColor(0x000000,0);
    this.renderer.outputColorSpace=THREE.SRGBColorSpace;
    this.renderer.toneMapping=THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure=1.3;
    this.renderer.autoClear=false;
    const canvas=this.renderer.domElement;canvas.className='webgl-surface';canvas.setAttribute('aria-hidden','true');canvas.setAttribute('role','presentation');document.body.append(canvas);
    canvas.addEventListener('webglcontextlost',this.onLost);canvas.addEventListener('webglcontextrestored',this.onRestored);
    document.querySelectorAll<HTMLElement>('.scene-slot').forEach(element=>{
      const kind=element.dataset.scene as SceneKind;
      const sculpture=kind==='pipeline'?createGpuPipeline():kind==='scheduler'?createTaskScheduler():createNeuralConstellation(kind==='skills');
      const scene=new THREE.Scene();scene.add(sculpture.group);
      scene.add(new THREE.HemisphereLight(0xddeee8,0x121b30,2.5));
      const key=new THREE.DirectionalLight(0xd6f6f0,4.5);key.position.set(2,7,5);scene.add(key);
      const fill=new THREE.DirectionalLight(0xb5a5ff,3);fill.position.set(-4,3,-2);scene.add(fill);
      const camera=new THREE.PerspectiveCamera(36,1,.1,50);
      this.views.push({element,kind,scene,camera,sculpture,bounds:{left:0,top:0,width:1,height:1}});
    });
    this.resize();this.measure();webglReady.value=true;
  }
  measure() {
    this.views.forEach(view=>{const r=view.element.getBoundingClientRect();view.bounds={left:r.left,top:r.top+window.scrollY,width:r.width,height:r.height};});
  }
  resize() {
    this.width=window.innerWidth;this.height=window.innerHeight;
    // Explicit drawing-buffer sizing: cap DPR and total pixel area.
    const dpr=Math.min(window.devicePixelRatio||1,this.lowPower?1:1.5);
    this.scale=Math.min(dpr,Math.sqrt(3_600_000/(this.width*this.height)));
    this.renderer.setSize(Math.round(this.width*this.scale),Math.round(this.height*this.scale),false);
    this.measure();
  }
  setPointer(x:number,y:number){this.pointer.x=x;this.pointer.y=y;}
  setVisible(visible:boolean){this.renderer.domElement.style.visibility=visible && !this.lost?'visible':'hidden';}
  render(time:number,force=false) {
    if(this.lost || (!force && time-this.lastRender<1/(this.lowPower?30:45)))return;
    this.lastRender=time;
    const renderer=this.renderer;renderer.setScissorTest(false);renderer.clear(true,true,true);renderer.setScissorTest(true);
    let totalCalls=0, totalTriangles=0;
    for(const view of this.views){
      // Read sticky views only: their viewport location changes during sticking.
      const r=view.kind==='scheduler'||view.kind==='pipeline'?view.element.getBoundingClientRect():{...view.bounds,top:view.bounds.top-window.scrollY};
      if(r.top+r.height<80||r.top>this.height||r.width<1||r.height<1)continue;
      const left=Math.max(0,r.left),bottom=this.height-(r.top+r.height);
      renderer.setViewport(r.left*this.scale,bottom*this.scale,r.width*this.scale,r.height*this.scale);
      renderer.setScissor(left*this.scale,Math.max(0,bottom)*this.scale,Math.min(this.width-left,r.width)*this.scale,Math.min(this.height,r.top+r.height)-Math.max(0,r.top)>0?(Math.min(this.height,r.top+r.height)-Math.max(0,r.top))*this.scale:0);
      const {camera,sculpture,kind}=view;camera.aspect=r.width/r.height;
      if(kind==='pipeline'){
        const p=sceneState.pipelinePose==='assembled'?0:sceneState.pipelinePose==='exploded'?-1:sceneState.pipelineProgress;
        sculpture.update(time,p,sceneState.pipelineStage);
        const narrow=camera.aspect<.8;
        camera.position.set(6.8+this.pointer.x*.15,5.3+this.pointer.y*.1,narrow?12.9:10.6);camera.lookAt(0,-.1,0);
      }else if(kind==='scheduler'){
        sculpture.update(time,sceneState.schedulerProgress,sceneState.schedulerBeat,sceneState.resourceCount);
        camera.position.set(7.6+this.pointer.x*.1,7.4-sceneState.schedulerProgress*.8,10);camera.lookAt(0,0,0);
      }else{
        sculpture.update(time,.2,sceneState.skill);camera.position.set(this.pointer.x*.28,this.pointer.y*.2,kind==='skills'?8.8:8.5);camera.lookAt(0,0,0);
      }
      camera.updateProjectionMatrix();renderer.render(view.scene,camera);totalCalls+=renderer.info.render.calls;totalTriangles+=renderer.info.render.triangles;
    }
    // Observable diagnostics for manual QA; no user data or fingerprint logging.
    renderer.domElement.dataset.drawCalls=String(totalCalls);renderer.domElement.dataset.triangles=String(totalTriangles);
  }
  dispose(){
    this.views.forEach(view=>disposeObject(view.scene));this.views=[];
    const canvas=this.renderer.domElement;canvas.removeEventListener('webglcontextlost',this.onLost);canvas.removeEventListener('webglcontextrestored',this.onRestored);
    this.renderer.dispose();this.renderer.forceContextLoss();canvas.remove();webglReady.value=false;
  }
}
