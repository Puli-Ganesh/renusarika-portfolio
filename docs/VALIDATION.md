# Validation — 17 November 2026

## Completed checks

- `npm run build`: TypeScript checking and production compilation passed.
- `npm test`: 10 tests passed across two files. Tests check five independently authored mesh groups, no collisions between adjacent groups in both assembled and exploded states, exact reassembly, reversible local progress, shorter phone travel, early portrait separation, and camera projection bounds at five narrow/wide figure proportions through forward and reverse separation.
- `npm run check:assets`: all six portrait variants, PDF signature, local font and license, favicon, built HTML entry, and excluded decorative copy checked.
- Production output inspected in Chrome in 320×568, 390×844, 430×932, 768×1024, 640×360, and 1440×900 CSS viewport frames. No document-level horizontal overflow or failed loaded images was reported. These are responsive browser views, not physical phone tests.
- Hero composition reviewed at desktop and phone widths; portrait and actions stay inside the layout. At 390px, scrolling 120px produced a visibly separated frame; returning upward restored the aligned state (`data-separation` returned to `0.000`). The photo itself stays intact.
- The scheduling control routed sample B to Resource 2 and updated its explanation. The scene is labeled as a schematic and does not claim to execute a trained model.
- The fallback training module visibly separates into five layers and fits in its reserved figure. Its Checkpoints button updates the explanation. Assembled and Separated controls have visible keyboard focus and work through Enter.
- Native wheel scrolling reversed the fallback exhibit into a partially assembled state; scrolling down restored the stable `1.000` exploded state inside its figure.
- Reduce animations toggles via keyboard. The figure uses a static exploded state; explicit pose controls switch instantly between assembled and exploded states.
- Work/About/Contact links navigate to real sections with a header offset. Reload after navigating to About restored that section below the header.
- The actual résumé download was exercised in the browser. Downloaded bytes matched the bundled original PDF exactly by SHA-256: `23f5ebdd251658a62d4801f8a63d07cb41f2eb82ff0a0be4213010e097a34e04`.
- Contact is a real `mailto:renusarikarachamalli@gmail.com` link. No unverified social, source, or demo links are rendered.

## Limits and follow-up

The available preview browser did not expose a usable WebGL2 context. The SVG fallback was visually tested; live GPU rendering, physical-device frame rate, GPU context restoration, and real touch inertia were not verified on hardware. The Three.js module compiles, and its actual geometry, camera framing, separation, and collision checks pass in automated tests. Test the hardware-rendered exhibit in a WebGL-enabled browser before public release. The complete page remains usable without it.

The mailto URL was checked, but an external email application was not opened or configured. No email was sent. The footer reduced-motion control was tested; the browser's operating-system motion preference was not changed.

The build reports a chunk-size warning for the lazy Three.js enhancement (about 542 kB minified, 135 kB gzip). It is deferred until the figure approaches, and is not imported when the WebGL2 capability probe fails. The initial application bundle is about 86 kB minified / 33 kB gzip, plus locally hosted CSS/font/images. No Lighthouse score or measured performance claim is made.

Missing inputs: verified GitHub/LinkedIn profiles and direct project repository/demo URLs. These are intentionally absent from the rendered page. The available original résumé was retained without editing; its phone number remains in that PDF, although the website does not display it. A newer named résumé could not be retrieved and was not substituted with invented content.

## Review again locally

After `npm ci` and `npm run build`, run `npm run dev` and open `/qa.html` at the printed local address. The review page loads the compiled `/dist/index.html`, offers the viewport sizes above, section navigation, and a document-overflow/image check. It also has optional context-loss/restore controls for a browser with WebGL. This developer page is omitted from the production build.

The ZIP contains no `node_modules`, credentials, environment files, inspiration clips, browser screenshots, or temporary downloads. It has not been published.
