import { inject, type InjectionKey, type Ref } from 'vue';

type Frame = { time: number; delta: number; reduced: boolean; viewportHeight: number; viewportWidth: number };
type Subscriber = (frame: Frame) => boolean | void;

export function createCoordinator(reduced: Ref<boolean>) {
  const subscribers = new Set<Subscriber>();
  let request = 0;
  let lastTime = 0;
  let stopped = false;
  const tick = (time: number) => {
    request = 0;
    if (stopped || document.hidden) return;
    const delta = Math.min(0.05, Math.max(0.001, (time - lastTime) / 1000));
    lastTime = time;
    let again = false;
    const frame = { time, delta, reduced: reduced.value, viewportHeight: innerHeight, viewportWidth: innerWidth };
    for (const listener of subscribers) {
      try { again = Boolean(listener(frame)) || again; }
      catch (error) { console.warn('A visual enhancement stopped; document content is unaffected.', error); subscribers.delete(listener); }
    }
    if (again) invalidate();
  };
  function invalidate() { if (!request && !stopped && !document.hidden) request = requestAnimationFrame(tick); }
  function subscribe(listener: Subscriber) { subscribers.add(listener); invalidate(); return () => subscribers.delete(listener); }
  function start() {
    window.addEventListener('scroll', invalidate, { passive: true });
    window.addEventListener('resize', invalidate, { passive: true });
    window.visualViewport?.addEventListener('resize', invalidate, { passive: true });
    document.addEventListener('visibilitychange', invalidate);
    document.fonts.ready.then(invalidate);
    invalidate();
  }
  function stop() {
    stopped = true; cancelAnimationFrame(request); subscribers.clear();
    window.removeEventListener('scroll', invalidate); window.removeEventListener('resize', invalidate);
    window.visualViewport?.removeEventListener('resize', invalidate);
    document.removeEventListener('visibilitychange', invalidate);
  }
  return { subscribe, invalidate, start, stop, reduced };
}
export type Coordinator = ReturnType<typeof createCoordinator>;
export const coordinatorKey: InjectionKey<Coordinator> = Symbol('portfolio-motion');
export function useCoordinator() {
  const coordinator = inject(coordinatorKey);
  if (!coordinator) throw new Error('Motion coordinator is not provided');
  return coordinator;
}
