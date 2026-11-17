import { describe, expect, it } from 'vitest';
import * as THREE from 'three';
import { createTrainingModule, frameCamera } from '../src/three/model';

describe('training module geometry',()=>{
  it('builds five different mesh groups and separates them without intersections',()=>{
    const model=createTrainingModule(true);
    expect(model.layers).toHaveLength(5);
    expect(new Set(model.layers.map(layer=>layer.name)).size).toBe(5);
    const initial=model.layers.map(layer=>layer.position.clone());
    const assembled=model.layers.map(layer=>new THREE.Box3().setFromObject(layer));
    for(let i=0;i<assembled.length-1;i++)expect(assembled[i].intersectsBox(assembled[i+1])).toBe(false);
    model.setPose(1);
    const boxes=model.layers.map(layer=>new THREE.Box3().setFromObject(layer));
    for(let i=0;i<boxes.length-1;i++)expect(boxes[i].intersectsBox(boxes[i+1])).toBe(false);
    expect(boxes[0].min.y-boxes[4].max.y).toBeGreaterThan(5);
    model.setPose(0);
    model.layers.forEach((layer,i)=>expect(layer.position.distanceTo(initial[i])).toBeLessThan(1e-10));
    model.dispose();
  });
  for(const [width,height] of [[280,330],[346,380],[600,490],[640,250],[1280,720]]){
    it(`keeps every model bound inside the ${width}×${height} frame through separation`,()=>{
      const model=createTrainingModule(width<600),camera=new THREE.PerspectiveCamera(32,1,.1,80);
      for(const separation of [0,.2,.5,.8,1,.5,0]){
        model.setPose(separation,2,width<600);
        const box=new THREE.Box3().setFromObject(model.group);
        frameCamera(camera,box,width/height);
        for(const x of [box.min.x,box.max.x])for(const y of [box.min.y,box.max.y])for(const z of [box.min.z,box.max.z]){
          const projected=new THREE.Vector3(x,y,z).project(camera);
          expect(Math.abs(projected.x)).toBeLessThanOrEqual(.821);
          expect(Math.abs(projected.y)).toBeLessThanOrEqual(.821);
          expect(projected.z).toBeGreaterThan(-1);expect(projected.z).toBeLessThan(1);
        }
      }
      model.dispose();
    });
  }
});
