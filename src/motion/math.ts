export const clamp = (value: number, min = 0, max = 1) => Math.max(min, Math.min(max, value));
export const ease = (value: number) => { const t = clamp(value); return t * t * (3 - 2 * t); };

/** A local, reversible figure timeline: assembled on entry, separated then held. */
export function figureProgress(top: number, viewportHeight: number) {
  return ease((viewportHeight * 0.84 - top) / Math.max(1, viewportHeight * 0.64));
}

export function photoProgress(scrollY: number, documentTop: number, height: number, viewportHeight: number) {
  const start = Math.max(0, documentTop - viewportHeight * 0.65);
  return ease((scrollY - start) / Math.max(130, Math.min(210, height * 0.45)));
}

/** Explicit positions, shared by the sculpture and its mathematical tests. */
export function layerPosition(index: number, separation: number, compact = false) {
  const p = clamp(separation);
  const order = 2 - index;
  return {
    x: order * p * (compact ? 0.10 : 0.18),
    y: order * (0.46 + p * (compact ? 1.12 : 1.37)),
    z: order * p * 0.11,
  };
}

/** Fixed sample routes for a schematic, deliberately not a trained model. */
export const sampleRoutes = [
  { task: 'A', resource: 1, reason: 'Available capacity' },
  { task: 'B', resource: 2, reason: 'Workload balance' },
  { task: 'C', resource: 3, reason: 'Task priority' },
] as const;
