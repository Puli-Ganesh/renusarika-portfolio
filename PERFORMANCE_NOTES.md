# Performance notes

The implementation prioritizes immediately readable HTML and uses 3D as progressive enhancement. No performance score, Core Web Vitals target, or FPS target is claimed as measured.

## Production output observed

The verified build produced approximately these minified sizes; content hashes and a few bytes can change when rebuilding.

| Output | Minified | Gzip estimate from Vite |
| --- | --- | --- |
| Main Vue/application JS | 98.7 kB | 37.6 kB |
| CSS | 38.0 kB | 8.5 kB |
| Motion libraries | 132.0 kB | 49.5 kB |
| Experience coordinator | 4.5 kB | 2.0 kB |
| Scene host and geometry | 11.5 kB | 4.7 kB |
| Three.js | 563.5 kB | 140.0 kB |

These are file sizes, not transferred-page totals or load-time measurements. The page also uses local fonts, appropriately sized photographs, the small entry HTML, and a PDF fetched on download. The public asset set is about 0.88 MB before HTTP compression. Both 400px and larger portrait variants are included; responsive srcset allows the browser to choose.

Vite reports a warning because the Three.js chunk exceeds 500 kB uncompressed. The warning is intentionally retained. The module is dynamically loaded after an eligible desktop visit successfully obtains a WebGL2 context. Fresh mobile, reduced-motion, and no-WebGL visits skip the Three.js chunk. Motion code is loaded after the initial Vue page mounts.

## Resource choices

- A single renderer and context, with scissor views, serves all scene slots.
- Geometry is authored locally; there are no remote model files, textures, environment maps, or postprocessing passes.
- Repeated nodes and tasks use instancing. Geometry/materials are shared where appropriate and disposed during teardown.
- Drawing-buffer resolution is capped at 1.5 DPR, at 1 DPR on detected low-power devices, and at 3.6 million pixels overall.
- Scene drawing is limited to 45 frames per second, or 30 in the low-power tier. These are configured caps, not observed performance.
- Offscreen views are skipped, and rendering returns early while the document is hidden.
- Photos use explicit framed dimensions, local WebP srcset assets, lazy loading below the hero, and normal undistorted image rendering.
- Fonts are local WOFF2 with font-display swap; ScrollTrigger refreshes after fonts settle.
- Small screens use the static artwork and native scrolling. Reduced motion disables smooth scrolling and decorative renderer animation.

## Further profiling

Use a representative laptop and a midrange phone on the final host. Record cold and warm loads, rendering around the exploded object, background-tab recovery, memory after repeat visits, and slow-network asset loading. Only then make quantitative performance claims. If the GPU budget is too high, reduce node counts or DPR before changing the factual content or removing the fallback.
