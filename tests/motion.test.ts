import { describe, it, expect } from 'vitest';
import { figureProgress, photoProgress, layerPosition } from '../src/motion/math';

describe('native-scroll state reconstruction',()=>{
  it('is assembled on entry and holds the separated view above the trigger',()=>{
    expect(figureProgress(900,900)).toBe(0);
    expect(figureProgress(180,900)).toBe(1);
    expect(figureProgress(-900,900)).toBe(1);
    expect(figureProgress(450,900)).toBeGreaterThan(.4);
  });
  it('reconstructs the identical pose when scrolling back',()=>{
    const forward=[900,650,400,180].map(top=>figureProgress(top,900));
    expect([180,400,650,900].map(top=>figureProgress(top,900)).reverse()).toEqual(forward);
  });
  it('separates the portrait while the face can remain in view',()=>{
    expect(photoProgress(0,170,535,900)).toBe(0);
    expect(photoProgress(130,170,535,900)).toBeGreaterThan(.6);
    expect(photoProgress(150,480,375,844)).toBeGreaterThan(.9);
    expect(photoProgress(0,480,330,568)).toBe(0);
  });
  it('limits travel outside the defined interval and reduces phone travel',()=>{
    expect(layerPosition(0,-20)).toEqual(layerPosition(0,0));
    expect(layerPosition(4,20)).toEqual(layerPosition(4,1));
    expect(layerPosition(0,1,true).y).toBeLessThan(layerPosition(0,1,false).y);
  });
});
