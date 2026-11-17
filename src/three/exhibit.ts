import * as THREE from 'three';
import { createTrainingModule, frameCamera } from './model';

export type Exhibit = ReturnType<typeof createExhibit>;
export function createExhibit(canvas: HTMLCanvasElement, context: WebGL2RenderingContext, onStatus: (ready:boolean)=>void) {
  const nav=navigator as Navigator & {deviceMemory?:number;connection?:{saveData?:boolean}};
  const simple=innerWidth<600 || (nav.deviceMemory ?? 8)<=4 || navigator.hardwareConcurrency<=4 || nav.connection?.saveData;
  const renderer=new THREE.WebGLRenderer({canvas,context,antialias:!simple,alpha:false,powerPreference:'low-power'});
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.2;
  renderer.setClearColor('#202621');
  renderer.shadowMap.enabled=!simple;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(32,1,.1,80);
  const module=createTrainingModule(Boolean(simple));scene.add(module.group);
  scene.add(new THREE.HemisphereLight('#f0eddc','#3b4535',2.2));
  const key=new THREE.DirectionalLight('#fff5e2',4.2);key.position.set(-4,9,7);key.castShadow=!simple;
  key.shadow.mapSize.set(1024,1024);key.shadow.camera.left=-7;key.shadow.camera.right=7;key.shadow.camera.top=7;key.shadow.camera.bottom=-7;
  key.shadow.camera.near=.1;key.shadow.camera.far=30;key.shadow.bias=-.0008;key.shadow.normalBias=.035;key.shadow.radius=4;scene.add(key);
  const rim=new THREE.DirectionalLight('#c9d6bd',2.5);rim.position.set(4,4,-5);scene.add(rim);
  const shadow=new THREE.Mesh(new THREE.PlaneGeometry(20,20),new THREE.ShadowMaterial({opacity:.2}));
  shadow.rotation.x=-Math.PI/2;shadow.receiveShadow=true;scene.add(shadow);
  const bounds=new THREE.Box3();
  let width=1,height=1,lost=false,disposed=false;
  const lose=(event:Event)=>{event.preventDefault();lost=true;onStatus(false);};
  const restore=()=>{lost=false;onStatus(true);};
  canvas.addEventListener('webglcontextlost',lose);canvas.addEventListener('webglcontextrestored',restore);
  function resize(w:number,h:number){
    if(w<1||h<1||disposed)return;
    width=w;height=h;
    const ratio=Math.min(devicePixelRatio||1,simple?1.15:1.5,Math.sqrt(1_600_000/(w*h)));
    renderer.setPixelRatio(ratio);renderer.setSize(w,h,false);
  }
  function render(separation:number,active:number,compact:boolean){
    if(lost||disposed)return 0;
    module.setPose(separation,active,compact);bounds.setFromObject(module.group);
    frameCamera(camera,bounds,width/height);shadow.position.y=bounds.min.y-.28;
    const start=performance.now();renderer.render(scene,camera);
    canvas.dataset.drawCalls=String(renderer.info.render.calls);
    canvas.dataset.separation=separation.toFixed(3);
    return performance.now()-start;
  }
  function dispose(){
    if(disposed)return;disposed=true;
    canvas.removeEventListener('webglcontextlost',lose);canvas.removeEventListener('webglcontextrestored',restore);
    module.dispose();shadow.geometry.dispose();(shadow.material as THREE.Material).dispose();renderer.dispose();renderer.forceContextLoss();onStatus(false);
  }
  onStatus(true);
  return { resize,render,dispose };
}
