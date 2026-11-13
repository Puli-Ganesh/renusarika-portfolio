import { describe, expect, it } from 'vitest';
import { demoHeuristicSchedule, demoTasks, explosionAt, pipelineStageAt } from '../src/utils/math';

describe('deterministic scene logic', () => {
  it('assembles, opens and reassembles without retaining prior animation state', () => {
    expect(explosionAt(0)).toBe(0);
    expect(explosionAt(.5)).toBe(1);
    expect(explosionAt(1)).toBe(0);
    expect(explosionAt(.5)).toBe(1);
  });
  it('clamps jumps and stage selection to meaningful bounds', () => {
    expect(pipelineStageAt(-2)).toBe(0);
    expect(pipelineStageAt(8)).toBe(5);
    for(let i=-10;i<=110;i++){expect(explosionAt(i/100)).toBeGreaterThanOrEqual(0);expect(explosionAt(i/100)).toBeLessThanOrEqual(1);}
  });
  it('prioritizes sample tasks and does not mutate their source', () => {
    const original=JSON.stringify(demoTasks);
    const result=demoHeuristicSchedule(demoTasks,3);
    expect(result[0].priority).toBe(3);
    expect(result.map(t=>t.id)).toEqual(['A','D','C','F','B','E']);
    expect(JSON.stringify(demoTasks)).toBe(original);
  });
  it.each([2,3,4])('assigns each task exactly once across %i resources', resources => {
    const result=demoHeuristicSchedule(demoTasks,resources);
    expect(new Set(result.map(t=>t.id)).size).toBe(demoTasks.length);
    expect(result.every(t=>t.lane>=0&&t.lane<resources&&t.start>=0)).toBe(true);
    for(let lane=0;lane<resources;lane++){
      const assigned=result.filter(t=>t.lane===lane);
      for(let i=1;i<assigned.length;i++)expect(assigned[i].start).toBeGreaterThanOrEqual(assigned[i-1].start+assigned[i-1].workload);
    }
  });
});
