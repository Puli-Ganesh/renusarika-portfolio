import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { clamp, mix, smoothstep, explosionAt, demoTasks, demoHeuristicSchedule } from '../utils/math';

export const palette = { mint: 0xa5ddcb, violet: 0xb8aff7, amber: 0xead4af, dark: 0x14252c, metal: 0x627b80 };
export type Sculpture = { group: THREE.Group; update: (time: number, progress: number, selected: number, resources?: number) => void };
const dummy = new THREE.Object3D();
function metal(color: number, emissive = 0x000000, intensity = 0) {
  return new THREE.MeshStandardMaterial({ color, metalness: .64, roughness: .34, emissive, emissiveIntensity: intensity });
}
function lightMaterial(color: number, opacity = 1) {
  return new THREE.MeshBasicMaterial({ color, transparent: opacity < 1, opacity, depthWrite: opacity === 1 });
}
function slab(w: number, h: number, d: number, material: THREE.Material, radius = .055) {
  return new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 2, radius), material);
}
function tube(points: number[][], color: number, radius = .012, opacity = 1) {
  const curve = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p as [number, number, number])));
  return new THREE.Mesh(new THREE.TubeGeometry(curve, 40, radius, 5, false), lightMaterial(color, opacity));
}
function ring(radius: number, thickness: number, color: number, opacity = 1) {
  return new THREE.Mesh(new THREE.TorusGeometry(radius, thickness, 6, 100), lightMaterial(color, opacity));
}
function instanceBoxes(positions: number[][], size: [number,number,number], material: THREE.Material) {
  const mesh = new THREE.InstancedMesh(new THREE.BoxGeometry(...size), material, positions.length);
  positions.forEach((p,i) => { dummy.position.set(p[0],p[1],p[2]); dummy.rotation.set(0,0,0); dummy.scale.set(1,1,1); dummy.updateMatrix(); mesh.setMatrixAt(i,dummy.matrix); });
  return mesh;
}

export function createNeuralConstellation(compact = false): Sculpture {
  const group = new THREE.Group();
  const shell = new THREE.Group(); group.add(shell);
  const positions: THREE.Vector3[] = [];
  const count = compact ? 54 : 84;
  for (let i=0;i<count;i++) {
    const t = i / count * Math.PI * 2;
    const r = 2.65 + Math.sin(t*3)*.24;
    positions.push(new THREE.Vector3(Math.cos(t)*r, Math.sin(t)*r*.82, Math.sin(t*2)*.5));
  }
  const nodes = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(.04,1), metal(palette.mint,palette.mint,.7), count);
  const lines: number[]=[];
  positions.forEach((p,i)=> {
    dummy.position.copy(p); dummy.scale.setScalar(i%7===0?2.5:1); dummy.rotation.set(0,0,0); dummy.updateMatrix(); nodes.setMatrixAt(i,dummy.matrix);
    for (const offset of [1,7,13]) { if(offset!==1 && i%4!==0) continue; const q=positions[(i+offset)%count]; lines.push(p.x,p.y,p.z,q.x,q.y,q.z); }
  });
  shell.add(nodes);
  shell.add(new THREE.LineSegments(new THREE.BufferGeometry().setAttribute('position',new THREE.Float32BufferAttribute(lines,3)), new THREE.LineBasicMaterial({color:palette.mint,transparent:true,opacity:.3})));
  const orbit = ring(2.9,.008,palette.violet,.42); orbit.rotation.set(.55,-.25,.3); shell.add(orbit);
  const orbit2 = ring(2.7,.013,palette.mint,.58); orbit2.rotation.set(-.35,.3,-.4); shell.add(orbit2);
  const signal = new THREE.Mesh(new THREE.SphereGeometry(.073,10,8),lightMaterial(palette.amber)); shell.add(signal);
  const satellites = new THREE.Group(); group.add(satellites);
  const hubs: THREE.Mesh[] = [];
  for(let i=0;i<6;i++) {
    const angle=i/6*Math.PI*2;
    const hub=new THREE.Mesh(new THREE.IcosahedronGeometry(.16,1),metal(palette.violet,palette.violet,.55));
    hub.position.set(Math.cos(angle)*2.25,Math.sin(angle)*1.75,.45); satellites.add(hub); hubs.push(hub);
    if (compact) satellites.add(tube([[0,0,0],[hub.position.x*.7,hub.position.y*.7,.5],hub.position.toArray()],palette.violet,.009,.45));
  }
  if(compact){ const core=new THREE.Mesh(new THREE.OctahedronGeometry(.48,0),metal(palette.mint,palette.mint,.25)); core.rotation.set(.3,.5,.2); group.add(core); }
  return { group, update(time,progress,selected) {
    shell.rotation.set(.06*Math.sin(time*.15), .16*Math.cos(time*.12)+progress*.14, .08);
    signal.position.set(Math.cos(time*.18)*2.9, Math.sin(time*.18)*2.9, .2);
    hubs.forEach((hub,i)=> { hub.scale.setScalar(i===selected?1.6:1); });
  }};
}

export function createTaskScheduler(): Sculpture {
  const group=new THREE.Group();
  const base=slab(8.5,.16,4.3,metal(0x102127)); base.position.y=-.65; group.add(base);
  const rim=new THREE.LineSegments(new THREE.EdgesGeometry(base.geometry),new THREE.LineBasicMaterial({color:palette.mint,transparent:true,opacity:.35})); rim.position.copy(base.position); group.add(rim);
  const underside=slab(8,.2,3.8,metal(0x070f17)); underside.position.y=-.84; group.add(underside);
  // A small input rack, a policy core, and reusable resource bays.
  const rack=slab(1.7,.09,3.2,metal(0x284349)); rack.position.set(-2.9,-.37,0); group.add(rack);
  const policy=new THREE.Group(); policy.position.set(-.65,.15,0); group.add(policy);
  const core=new THREE.Mesh(new THREE.OctahedronGeometry(.49,0),metal(palette.violet,palette.violet,.7)); policy.add(core);
  const halo1=ring(.77,.025,palette.violet,.9); halo1.rotation.x=Math.PI/2; policy.add(halo1);
  const halo2=ring(.95,.008,palette.violet,.4); halo2.rotation.x=Math.PI/2; halo2.position.y=-.15; policy.add(halo2);
  const policyBase=slab(1.6,.08,1.6,metal(0x242438)); policyBase.position.set(-.65,-.4,0); group.add(policyBase);
  const lanes: THREE.Group[]=[];
  const paths: THREE.Mesh[]=[];
  for(let i=0;i<4;i++) {
    const lane=new THREE.Group(); group.add(lane); lanes.push(lane);
    const floor=slab(3.1,.08,.68,metal(0x1b3337)); floor.position.set(2.05,-.32,0); lane.add(floor);
    const strip=slab(3,.018,.025,lightMaterial(palette.mint,.65),.008); strip.position.set(2.05,-.26,-.3); lane.add(strip);
    const posts=instanceBoxes([[.6,-.16,-.3],[3.5,-.16,-.3],[.6,-.16,.3],[3.5,-.16,.3]],[.045,.25,.045],metal(palette.metal)); lane.add(posts);
    const path=tube([[-.65,-.2,0],[.2,-.14,0],[.55,-.14,0]],palette.mint,.012,.5); group.add(path); paths.push(path);
  }
  const taskGeometry=new RoundedBoxGeometry(.45,.24,.35,2,.07);
  const tasks=new THREE.InstancedMesh(taskGeometry,metal(0xffffff,0x365e58,.8),6); group.add(tasks);
  const floorDots: number[][]=[];
  for(let x=0;x<20;x++) for(let z=0;z<8;z++) floorDots.push([-3.9+x*.4,-.56,-1.8+z*.5]);
  group.add(instanceBoxes(floorDots,[.018,.015,.018],lightMaterial(palette.mint,.3)));
  let lastResourceCount=0;
  let schedule=demoHeuristicSchedule(demoTasks,3);
  const color=new THREE.Color();
  return {group,update(time,progress,_selected,resources=3) {
    if(lastResourceCount!==resources) { schedule=demoHeuristicSchedule(demoTasks,resources); lastResourceCount=resources;
      lanes.forEach((lane,i)=> { lane.visible=i<resources; lane.position.z=(i-(resources-1)/2)*.95; paths[i].visible=i<resources; paths[i].rotation.y=-Math.atan2(lane.position.z,1.2); paths[i].scale.x=Math.sqrt(1.2*1.2+lane.position.z*lane.position.z)/1.2; });
    }
    core.rotation.set(.2,time*.11,.3); policy.position.y=.1+Math.sin(time*.35)*.04;
    schedule.forEach((task,i)=> {
      const t=clamp((progress-i*.045)/.72);
      const a=smoothstep(.12,.48,t),b=smoothstep(.5,1,t);
      const x0=-3.25+(i%2)*.65,z0=(Math.floor(i/2)-1)*.75;
      const x2=1.1+task.start*.4,z2=(task.lane-(resources-1)/2)*.95;
      dummy.position.set(mix(mix(x0,-.65,a),x2,b),mix(.05,.05+Math.sin(t*Math.PI)*.9,1),mix(mix(z0,0,a),z2,b));
      dummy.rotation.set(0,t>.5?0:.06*Math.sin(time*.3+i),0); dummy.scale.set(1,1,1); dummy.updateMatrix(); tasks.setMatrixAt(i,dummy.matrix);
      color.set(t>.68?palette.mint:t>.2?palette.violet:0xe6e5db); tasks.setColorAt(i,color);
    });
    tasks.instanceMatrix.needsUpdate=true;
    if(tasks.instanceColor) tasks.instanceColor.needsUpdate=true;
    group.rotation.y=.05+progress*.08;
  }};
}

export function createGpuPipeline(): Sculpture {
  const group=new THREE.Group();
  const layers: THREE.Group[]=[];
  const accents: THREE.MeshStandardMaterial[]=[];
  const plate=metal(0x2c424e); const silver=metal(0x91a9aa); const dark=metal(0x0e202b);
  const colors=[palette.mint,palette.violet,palette.mint,palette.amber,palette.violet,palette.mint];
  for(let i=0;i<6;i++) {
    const layer=new THREE.Group(); layer.name=`pipeline-stage-${i}`; layers.push(layer); group.add(layer);
    const accent=metal(colors[i],colors[i],.35); accents.push(accent);
    const w=i===2?3.7:3.25,d=i===2?2.7:2.3;
    layer.add(slab(w,.14,d,i===2?silver:plate));
    const border=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(w-.05,.15,d-.05)),new THREE.LineBasicMaterial({color:colors[i],transparent:true,opacity:.7}));layer.add(border);
    const screwPositions: number[][]=[];
    for(const x of [-1,1])for(const z of [-1,1])screwPositions.push([x*(w/2-.17),.1,z*(d/2-.17)]);
    layer.add(instanceBoxes(screwPositions,[.06,.04,.06],silver));
    // Original circuit patterns. Merged geometry keeps trace draw calls bounded.
    const traceParts: THREE.BufferGeometry[]=[];
    for(let n=0;n<6;n++){
      const x=-1.25+n*.5;
      const trace=new THREE.BoxGeometry(.015,.014,.62); trace.translate(x,.085,-.7);traceParts.push(trace);
      const h=new THREE.BoxGeometry(.27,.014,.015);h.translate(x+.13,.085,-.4);traceParts.push(h);
    }
    const merged=mergeGeometries(traceParts);if(merged)layer.add(new THREE.Mesh(merged,accent));traceParts.forEach(g=>g.dispose());
    if(i===0) {
      const pos:number[][]=[]; for(let x=0;x<3;x++)for(let z=0;z<2;z++)pos.push([-.85+x*.85,.18,-.05+z*.62]);
      layer.add(instanceBoxes(pos,[.56,.16,.4],accent));
    } else if(i===1) {
      const pos:number[][]=[];for(let x=0;x<5;x++)for(let z=0;z<3;z++)pos.push([-1+x*.5,.16,-.08+z*.38]);
      layer.add(instanceBoxes(pos,[.3,.1,.22],dark));
      const frame=slab(2.7,.022,.03,accent,.01);frame.position.set(0,.13,.98);layer.add(frame);
    } else if(i===2) {
      const chip=slab(1.45,.23,1.35,dark);chip.position.y=.16;layer.add(chip);
      const die=slab(.98,.05,.9,accent);die.position.y=.31;layer.add(die);
      const core=slab(.58,.025,.56,silver);core.position.y=.35;layer.add(core);
      const pinPositions:number[][]=[];
      for(let n=0;n<12;n++){pinPositions.push([-1.65+n*.3,.1,1.46]);pinPositions.push([-1.65+n*.3,.1,-1.46]);}
      layer.add(instanceBoxes(pinPositions,[.12,.07,.27],silver));
      const modules:number[][]=[];for(const x of [-1.35,1.35])for(const z of [-.65,0,.65])modules.push([x,.16,z]);
      layer.add(instanceBoxes(modules,[.36,.16,.44],dark));
    } else if(i===3) {
      const bars:number[][]=[];for(let n=0;n<8;n++)bars.push([-1.12+n*.32,.19+.04*Math.sin(n),.25]);
      const mesh=instanceBoxes(bars,[.16,.18,.66],accent);layer.add(mesh);
      const rail=slab(2.8,.04,.035,silver,.01);rail.position.set(0,.11,.85);layer.add(rail);
    } else if(i===4) {
      const pos:number[][]=[];for(let x=0;x<3;x++)for(let h=0;h<2;h++)pos.push([-.9+x*.9,.12+h*.13,.25]);
      layer.add(instanceBoxes(pos,[.62,.08,.75],dark));
      const lights:number[][]=[];for(let x=0;x<3;x++)lights.push([-.9+x*.9,.3,.65]);layer.add(instanceBoxes(lights,[.35,.045,.04],accent));
    } else {
      const output=ring(.65,.025,colors[i]);output.rotation.x=Math.PI/2;output.position.y=.13;layer.add(output);
      const orb=new THREE.Mesh(new THREE.IcosahedronGeometry(.2,0),accent);orb.position.y=.23;layer.add(orb);
      const marks:number[][]=[];for(let n=0;n<5;n++)marks.push([-1.15+n*.57,.12,.92]);layer.add(instanceBoxes(marks,[.13,.035,.07],silver));
    }
  }
  const base=slab(4.3,.18,3.3,dark);base.position.y=-1.0;group.add(base);
  const bottom=slab(3.6,.12,2.75,silver);bottom.position.y=-1.15;group.add(bottom);
  const spine=new THREE.Mesh(new THREE.CylinderGeometry(.012,.012,1,5),lightMaterial(palette.violet,.5));spine.position.set(-1.85,0,-1.25);group.add(spine);
  const platformRing=ring(2.8,.008,palette.violet,.25);platformRing.rotation.x=Math.PI/2;platformRing.position.y=-1.26;group.add(platformRing);
  const pulse=new THREE.Mesh(new THREE.SphereGeometry(.052,10,8),lightMaterial(palette.mint));group.add(pulse);
  return {group,update(time,progress,selected) {
    const exploded=progress<0 ? .96 : explosionAt(progress);
    layers.forEach((layer,i)=>{
      const yCompact=.66-i*.265;
      const yOpen=2.48-i*.91;
      layer.position.set((i%2===0?-.12:.14)*exploded,mix(yCompact,yOpen,exploded),.04*(i-2)*exploded);
      layer.rotation.y=(i%2===0?-.045:.045)*exploded;
      accents[i].emissiveIntensity=selected===i ? 1.2:.24;
    });
    base.position.y=mix(-1,-2.36,exploded);bottom.position.y=base.position.y-.15;platformRing.position.y=base.position.y-.22;
    spine.position.y=.1;spine.scale.y=mix(1.6,5.2,exploded);
    pulse.position.set(-1.85,mix(2.5,-2.3,(time*.12)%1)*exploded,-1.25);
    group.rotation.y=-.18+(progress<0?.2:progress*.32);
  }};
}

export function disposeObject(root: THREE.Object3D) {
  const geometries=new Set<THREE.BufferGeometry>(); const materials=new Set<THREE.Material>();
  root.traverse(object=>{const mesh=object as THREE.Mesh;if(mesh.geometry)geometries.add(mesh.geometry);if(mesh.material){if(Array.isArray(mesh.material))mesh.material.forEach(m=>materials.add(m));else materials.add(mesh.material);}});
  geometries.forEach(g=>g.dispose()); materials.forEach(m=>m.dispose());
}
