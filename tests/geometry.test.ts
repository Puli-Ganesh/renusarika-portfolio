import { describe, expect, it } from 'vitest';
import { Box3, Vector3 } from 'three';
import { createGpuPipeline, createTaskScheduler, disposeObject } from '../src/three/primitives';

describe('real procedural 3D objects', () => {
  it('moves six unique pipeline groups and restores their exact assembled positions', () => {
    const model=createGpuPipeline();
    const layers=Array.from({length:6},(_,i)=>model.group.getObjectByName(`pipeline-stage-${i}`)!);
    model.update(0,0,0);
    const compact=layers.map(layer=>layer.position.clone());
    model.update(0,.5,2);
    expect(layers[0].position.distanceTo(layers[5].position)).toBeGreaterThan(4);
    expect(layers.every((layer,i)=>layer.position.distanceTo(compact[i])>.1)).toBe(true);
    model.update(0,1,5);
    layers.forEach((layer,i)=>expect(layer.position.distanceTo(compact[i])).toBeLessThan(.00001));
    model.update(0,.5,2);
    expect(new Box3().setFromObject(model.group).getSize(new Vector3()).length()).toBeLessThan(12);
    disposeObject(model.group);
  });
  it('schedules safely for forward, reverse and direct progress jumps', () => {
    const model=createTaskScheduler();
    for(const progress of [0,.5,1,.15,.8,0])for(const resources of [2,3,4]){
      model.update(0,progress,0,resources);
      const box=new Box3().setFromObject(model.group);
      expect(Number.isFinite(box.min.x)&&Number.isFinite(box.max.y)).toBe(true);
      expect(box.getSize(new Vector3()).length()).toBeLessThan(12);
    }
    disposeObject(model.group);
  });
});
