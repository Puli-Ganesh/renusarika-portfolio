# Verification record

Reviewed on 13 November 2026. These results distinguish observed behavior from implementation that still needs device testing.

## Automated checks that passed

- Dependency installation completed and the supplied package-lock.json pins the resolved versions.
- `npm run build`: Vue TypeScript checking and Vite production compilation completed successfully.
- `npm test`: 14 tests across three files passed. Coverage includes deterministic resource assignment, bounded stage selection, assembled/exploded/reassembled transforms, distinct procedural layer geometry, and factual content invariants.
- `npm run check:assets`: eight portrait variants, favicon, production entry references, and the real PDF were present.
- The source PDF, packaged PDF, and PDF downloaded through the actual browser button all had SHA-256 `23f5ebdd251658a62d4801f8a63d07cb41f2eb82ff0a0be4213010e097a34e04` (115,902 bytes).

## Interactive Chromium review

The review browser disabled WebGL. It exercised the complete SVG/HTML fallback, not the GPU-rendered scenes. Both modes share the factual text and controls.

| Check | Observed result |
| --- | --- |
| Hero and navigation | Full name, expected 2027 status, work CTA, portrait, navigation, and resume download present |
| About | Distinct warm-light portrait, academic facts, readable two-column and mobile composition |
| Skills | Category selection updates the visible skill heading and list |
| Scheduling | Stage controls and resource selector available; run control returns to its ready state; illustration label remains visible |
| Project explanations | Semantic expandable explanations and deterministic assignment output present |
| GPU pipeline | Stage selection updates descriptive text; assembled and exploded fallback states respond to controls |
| Experience | Salesforce CRM training and CHV Apps entries shown with accurate labels and no invented dates |
| Education | Expected academic status, institution, specialization, CGPA, and distinct outdoor portrait visible |
| Contact | Email and phone hrefs match the resume; fourth portrait visible; copy action reports its result |
| Resume | Actual download completed; downloaded bytes match the source PDF exactly |
| Mobile menu | Opens and closes with Escape; expanded state resets |
| Reduced motion | Control activates the designed static presentation |
| Responsive structure | Eight chapters present with no detected horizontal document overflow at all sizes below |

## CSS viewport matrix

The development QA page runs the actual app in a sized iframe. This tests responsive CSS dimensions, not physical devices, device pixel ratios, touch hardware, or the browsers those devices use.

| Width × height | Horizontal overflow | Failed loaded images |
| --- | --- | --- |
| 320 × 568 | None detected | 0 |
| 360 × 800 | None detected | 0 |
| 390 × 844 | None detected | 0 |
| 430 × 932 | None detected | 0 |
| 640 × 360 | None detected | 0 |
| 768 × 1024 | None detected | 0 |
| 1024 × 768 | None detected | 0 |
| 1280 × 900 | None detected | 0 |
| 1440 × 900 | None detected | 0 |
| 1920 × 1080 | None detected | 0 |
| 2560 × 1080 | None detected | 0 |

The image check counts loaded images with a failed decode; it does not claim every lazy image was fetched at every viewport. All four photographs were separately inspected on the page. Main sections were visually reviewed at desktop and representative mobile sizes. The entire 49-section prompt matrix was not individually executed on every browser.

## Fixes made during review

- Removed horizontal overflow caused by the decorative contact scene extending beyond the page.
- Kept portrait DOM elements above the shared external canvas stacking layer.
- Increased mobile paragraph text and adjusted the narrowest hero size.
- Added explicit assembled/exploded/follow-scroll controls with equivalent static artwork.
- Switched decorative project separator arrows to SVG to avoid missing font glyphs.
- Ensured small-view fallback illustrations appear after resizing an already enhanced desktop visit.
- Deferred Three.js until an eligible desktop visit with a successful WebGL2 context probe.
- Enabled resume links only after the actual PDF became available.

## Not yet verified

- Real WebGL shading, lighting, clipping, GPU draw-call totals, context-loss restoration, or sustained FPS. Mesh structure and reversible transforms were unit tested without a GPU; that is not a substitute for rendered visual review.
- Safari, Firefox, Android/iPhone hardware, screen readers, browser 200% zoom, offline behavior, and slow-network measurements.
- Lighthouse, LCP, INP, CLS, memory trends, GPU energy use, and live Vercel hosting. No measured scores or deployment success are claimed.
- The supplied Playwright CLI suite is available for subsequent use but was not run here.
- The clipboard UI reported success; the browser clipboard inspection tool did not return a copied value, so byte-level clipboard verification is not claimed. Blocked clipboard behavior is implemented but was not forced during review.

## Focused final device check

On a WebGL-capable desktop, run the project and scroll both directions through the scheduler and GPU chapter. Check every pipeline stage and all three pose controls, resize to phone width and back, toggle reduced motion, and use the development QA page's context controls to inspect fallback/recovery. Check native keyboard focus, mobile touch scrolling, and the resume on the final hosting URL. These are the remaining visual checks, not prerequisites for building the ZIP.
