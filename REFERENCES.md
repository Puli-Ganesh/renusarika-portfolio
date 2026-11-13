# Design and implementation references

Read during implementation; these are references, not bundled assets or endorsements.

- [WLT Design](https://wlt.design/) — quality and cinematic structure reference named in the brief. The portfolio uses original composition, copy, photographs and procedural geometry. Public text retrieval cannot establish a full interactive inspection of WLT's current WebGL experience.
- [WLT 2022 archive](https://2022.wlt.design/) — separate historical reference; not treated as the present homepage.
- [mesh3d WLT listing](https://mesh3d.gallery/website/wlt-design-web-design-studio) and [CSS Design Awards listing](https://www.cssdesignawards.com/sites/wlt-design/45101/) — design-reference context only. No implementation details are asserted solely from gallery descriptions.
- [Three.js responsive rendering](https://threejs.org/manual/pages/responsive.html) — drawing-buffer resolution, viewport aspect, and pixel-count limits.
- [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) — document-scroll progress, refresh, and trigger lifecycle.
- [Lenis](https://github.com/darkroomengineering/lenis) — GSAP ticker integration, seconds-to-milliseconds conversion, and smooth scrolling.
- [Vue introduction](https://vuejs.org/guide/introduction.html) — component and lifecycle architecture.
- [Vite](https://vite.dev/) and [Vercel Vite documentation](https://vercel.com/docs/frameworks/frontend/vite) — static build and hosting workflow.

Package versions were resolved from npm and then pinned in the lockfile. Local package APIs and actual type/build results governed compatibility. TypeScript 7 was incompatible with the supplied Vue checker, so the verified combination uses TypeScript 5.9.3.
