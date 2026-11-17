import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { layerPosition } from '../motion/math';

/** Five independently authored groups. All geometry is local and unbranded. */
export function createTrainingModule(simple = false) {
  const group = new THREE.Group();
  const layers: THREE.Group[] = [];
  const geometries = new Map<string, THREE.BufferGeometry>();
  const materials = {
    ceramic: new THREE.MeshStandardMaterial({ color: '#cbc7b8', roughness: 0.78, metalness: 0.08 }),
    paper: new THREE.MeshStandardMaterial({ color: '#e0ddcf', roughness: 0.86 }),
    olive: new THREE.MeshStandardMaterial({ color: '#697d60', roughness: 0.7, metalness: 0.15 }),
    sage: new THREE.MeshStandardMaterial({ color: '#a7b098', roughness: 0.76, metalness: 0.08 }),
    graphite: new THREE.MeshStandardMaterial({ color: '#3d483a', roughness: 0.68, metalness: 0.12 }),
    metal: new THREE.MeshStandardMaterial({ color: '#9c9c7d', roughness: 0.58, metalness: 0.42 }),
  };
  function block(parent: THREE.Group, dimensions: [number, number, number], position: [number, number, number], material: THREE.Material, radius = 0.055) {
    const r = Math.min(radius, ...dimensions.map(n => n / 2 - 0.001));
    const key = [...dimensions, r].join(',');
    let geometry = geometries.get(key);
    if (!geometry) { geometry = new RoundedBoxGeometry(...dimensions, simple ? 1 : 2, r); geometries.set(key, geometry); }
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(...position); mesh.castShadow = true; mesh.receiveShadow = true;
    parent.add(mesh); return mesh;
  }
  function traces(parent: THREE.Group, paths: number[][], y: number) {
    const points: number[] = [];
    for (const path of paths) for (let i = 0; i < path.length - 2; i += 2) points.push(path[i], y, path[i + 1], path[i + 2], y, path[i + 3]);
    const geometry = new THREE.BufferGeometry(); geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
    const material = new THREE.LineBasicMaterial({ color: '#dedfca', transparent: true, opacity: 0.58 });
    parent.add(new THREE.LineSegments(geometry, material));
  }
  for (let i = 0; i < 5; i++) {
    const layer = new THREE.Group(); layer.name = ['Data prep', 'Mini-batches', 'GPU training', 'Monitoring', 'Checkpoints'][i];
    const surface = i === 2 ? materials.olive : i === 1 ? materials.sage : materials.ceramic;
    block(layer, [4.6, 0.16, 2.85], [0, 0, 0], surface, 0.07);
    block(layer, [4.4, 0.05, 2.66], [0, -0.09, 0], materials.graphite, 0.02);
    // Corner fasteners and a fine inlaid perimeter establish believable seams.
    for (const x of [-2.05, 2.05]) for (const z of [-1.18, 1.18]) block(layer, [0.085, 0.014, 0.085], [x, 0.086, z], materials.metal, 0.035);
    traces(layer, [[-2.1,-1.25,2.1,-1.25,2.1,1.25,-2.1,1.25,-2.1,-1.25]], 0.085);
    if (i === 0) {
      for (let row = 0; row < 3; row++) for (let col = 0; col < 4; col++) {
        block(layer, [0.67,0.095,0.57], [(col-1.5)*0.78,0.13,(row-1)*0.66], (row+col)%3===0 ? materials.sage : materials.paper, 0.035);
      }
    } else if (i === 1) {
      for (let col = 0; col < 3; col++) {
        for (let plate = 0; plate < 3; plate++) block(layer, [1.06,0.038,1.87], [(col-1)*1.23,0.11+plate*0.049,0], plate===2 ? materials.paper : materials.graphite, 0.018);
        traces(layer, [[(col-1)*1.23-.35,-.58,(col-1)*1.23+.35,-.58],[(col-1)*1.23-.35,-.3,(col-1)*1.23+.14,-.3]],.232);
      }
    } else if (i === 2) {
      block(layer,[2.05,.12,1.53],[0,.15,0],materials.graphite,.045);
      block(layer,[1.65,.085,1.2],[0,.25,0],materials.sage,.045);
      block(layer,[1.34,.016,.93],[0,.3,0],materials.metal,.035);
      for (let k=0;k<9;k++) for (const sign of [-1,1]) block(layer,[.1,.025,.24],[(k-4)*.18,.14,sign*.88],materials.metal,.008);
      for (let k=0;k<6;k++) for (const sign of [-1,1]) block(layer,[.24,.025,.08],[sign*1.16,.14,(k-2.5)*.18],materials.metal,.008);
      traces(layer,[[-1.34,-.4,-1.7,-.4,-1.7,-.9,-1.99,-.9],[-1.34,.3,-1.77,.3,-1.77,.9,-1.99,.9],[1.34,-.3,1.7,-.3,1.7,-1,1.99,-1],[1.34,.4,1.72,.4,1.72,.9,1.99,.9]],.088);
    } else if (i === 3) {
      block(layer,[3.7,.055,1.7],[0,.12,0],materials.graphite,.04);
      const zigzag:number[]=[];
      for(let k=0;k<10;k++) zigzag.push(-1.55+k*.34,(k%3-1)*.29);
      traces(layer,[zigzag,[-1.55,.58,1.55,.58]],.154);
      for(let k=0;k<5;k++) block(layer,[.22,.045,.1],[-1.5+k*.28,.16,-.57],materials.sage,.012);
    } else {
      for(let k=0;k<3;k++) {
        block(layer,[1.1,.16,1.55],[(k-1)*1.25,.17,0],materials.graphite,.045);
        block(layer,[1.03,.035,1.47],[(k-1)*1.25,.27,0],materials.paper,.025);
        block(layer,[.8,.012,.17],[(k-1)*1.25,.295,.3],materials.olive,.008);
      }
    }
    layers.push(layer); group.add(layer);
  }
  function setPose(separation: number, active = -1, compact = false) {
    for (let i=0;i<layers.length;i++) {
      const position=layerPosition(i,separation,compact);
      layers[i].position.set(position.x,position.y,position.z);
      // Only a tiny lateral inspection offset; the five groups keep a common axis.
      if(i===active && separation>.65) layers[i].position.x+=.12;
    }
    group.updateMatrixWorld(true);
  }
  function dispose() {
    const gs = new Set<THREE.BufferGeometry>(), ms = new Set<THREE.Material>();
    group.traverse(object=>{
      const mesh=object as THREE.Mesh;
      if(mesh.geometry)gs.add(mesh.geometry);
      if(mesh.material)(Array.isArray(mesh.material)?mesh.material:[mesh.material]).forEach(material=>ms.add(material));
    });
    gs.forEach(g=>g.dispose()); ms.forEach(m=>m.dispose());
  }
  setPose(0);
  return { group, layers, setPose, dispose };
}

/** Fit all eight bounds corners; avoids cropping at phone and landscape aspect ratios. */
export function frameCamera(camera: THREE.PerspectiveCamera, bounds: THREE.Box3, aspect: number) {
  const center=bounds.getCenter(new THREE.Vector3());
  // A lower, slightly more frontal view preserves readable seams in narrow figures.
  const direction=(aspect<1?new THREE.Vector3(7.5,4.6,10):new THREE.Vector3(7,5.8,9)).normalize();
  camera.aspect=Math.max(.1,aspect);
  camera.position.copy(center).add(direction); camera.lookAt(center); camera.updateMatrixWorld(true);
  const inverse=camera.quaternion.clone().invert();
  const tan=Math.tan(THREE.MathUtils.degToRad(camera.fov/2));
  let distance=1;
  for(const x of [bounds.min.x,bounds.max.x])for(const y of [bounds.min.y,bounds.max.y])for(const z of [bounds.min.z,bounds.max.z]){
    const corner=new THREE.Vector3(x,y,z).sub(center).applyQuaternion(inverse);
    distance=Math.max(distance,corner.z+Math.abs(corner.x)/(tan*camera.aspect*.82),corner.z+Math.abs(corner.y)/(tan*.82));
  }
  camera.position.copy(center).addScaledVector(direction,distance);
  camera.near=.1;camera.far=distance+50;camera.lookAt(center);
  camera.updateProjectionMatrix();camera.updateMatrixWorld(true);
}
