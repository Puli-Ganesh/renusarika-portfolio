export const clamp = (value: number, min = 0, max = 1) => Math.max(min, Math.min(max, value));
export const mix = (a: number, b: number, t: number) => a + (b - a) * t;
export const smoothstep = (a: number, b: number, value: number) => {
  const t = clamp((value - a) / (b - a));
  return t * t * (3 - 2 * t);
};
// Reversible, stateless transforms: assembled → explode → hold → reassemble.
export function explosionAt(progress: number) {
  return smoothstep(0.08, 0.38, progress) * (1 - smoothstep(0.82, 1, progress));
}
export function pipelineStageAt(progress: number) {
  return Math.min(5, Math.floor(clamp((progress - 0.18) / 0.64) * 6));
}
export type DemoTask = { id: string; priority: number; workload: number };
export const demoTasks: DemoTask[] = [
  { id: 'A', priority: 3, workload: 2 }, { id: 'B', priority: 1, workload: 3 },
  { id: 'C', priority: 2, workload: 1 }, { id: 'D', priority: 3, workload: 1 },
  { id: 'E', priority: 1, workload: 2 }, { id: 'F', priority: 2, workload: 2 },
];
// Illustration ONLY: priority-first / least-loaded resource heuristic, not PPO.
export function demoHeuristicSchedule(tasks: DemoTask[], resources: number) {
  const count = Math.round(clamp(resources, 2, 4));
  const load = Array.from({ length: count }, () => 0);
  return [...tasks].sort((a, b) => b.priority - a.priority || a.id.localeCompare(b.id)).map(task => {
    const lane = load.indexOf(Math.min(...load));
    const start = load[lane];
    load[lane] += task.workload;
    return { ...task, lane, start };
  });
}
