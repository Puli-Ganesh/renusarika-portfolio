# Rachamalli Renusarika — Systems in Motion

A complete, responsive personal portfolio built with Vue 3, Vite, TypeScript, Three.js, GSAP ScrollTrigger, and Lenis. The project contains eight chapters, all four supplied portraits, the original resume PDF, an interactive scheduling illustration, and a six-layer procedural training instrument.

## Start on Windows

Install Node.js 24 LTS, extract the ZIP, and open PowerShell in the extracted `Rachamalli_Renusarika_3D_Portfolio` folder (the folder containing `package.json`). Then run:

```powershell
node --version
npm --version
npm ci
npm run dev
```

Open the local URL printed by Vite. Stop the server with `Ctrl+C`.

If you want to extract through PowerShell:

```powershell
Expand-Archive -LiteralPath .\Rachamalli_Renusarika_3D_Portfolio_Vercel_Ready.zip -DestinationPath .\RenusarikaPortfolio
Set-Location .\RenusarikaPortfolio\Rachamalli_Renusarika_3D_Portfolio
npm ci
npm run dev
```

## macOS / Linux and production checks

```bash
cd Rachamalli_Renusarika_3D_Portfolio
npm ci
npm run dev
```

Use another terminal or stop the development server before running the following:

```bash
npm run typecheck
npm test
npm run build
npm run check:assets
npm run preview
```

`npm install` also works; `npm ci` reproduces the exact supplied lockfile. The tested runtime was Node 24.22.1 / npm 11.9.0. TypeScript 5.9.3 is intentionally pinned because the installed Vue type checker is not compatible with TypeScript 7's package exports. Do not upgrade TypeScript alone without verifying `npm run typecheck`.

The ZIP includes a generated `dist/` folder as well as the complete maintainable source. Rebuild after editing source or assets. Open the application through Vite or an HTTP server, not by double-clicking `index.html`.

## Deploy to Vercel

1. Create a GitHub repository and upload the contents of this project folder. Keep `package.json` at the repository root; omit `node_modules`, `.env`, and generated logs. No environment variables or credentials are required.
2. In Vercel choose **Add New → Project** and import the repository.
3. Use **Framework Preset: Vite**.
4. Set **Root Directory** to the folder containing `package.json` (leave it at the repository root if uploaded as above).
5. Use **Build Command: `npm run build`**, **Output Directory: `dist`**, **Install Command: `npm ci`**, and Node.js **24.x**.
6. Deploy. Check the hero, project controls, contact links, and `/resume/Rachamalli_Renusarika_Resume.pdf` on the resulting URL.
7. Set a custom domain if wanted. Add a canonical URL and absolute Open Graph image URL to `index.html` only after that final domain is known.

The site uses same-page anchors, not history-mode client routes. No catch-all rewrite or `vercel.json` is needed. This deliverable has not been published to a Vercel account.

## Content and assets

| Edit | Location |
| --- | --- |
| Identity, email, phone, academic facts, skills, experience, project descriptions | `src/data/portfolio.ts` |
| Portrait source mapping, alt text, focal points | `src/data/photoAssets.ts` |
| Photos in two responsive sizes | `public/portraits/` |
| Original resume PDF | `public/resume/Rachamalli_Renusarika_Resume.pdf` |
| Colors, typography, spacing, breakpoints | `src/styles/main.css` |
| Page sections and editorial headings | `src/sections/` |
| Metadata and no-JavaScript summary | `index.html` |

Replace the resume using the same filename, then rebuild. The build detects that file automatically. If it is removed, the resume links become clearly disabled instead of pointing at a broken PDF. The PDF supplied here is a byte-for-byte copy of `Rachamalli_Renusarika_Updated_ML_Projects_CHV_Apps(1).pdf`.

Four different user-supplied portraits are used: purple portrait in the hero, warm-light portrait in About, outdoor portrait in Education, and golden-hour portrait in Contact. The brief refers to three photos; four were actually supplied, so all four are included purposefully. The web copies are resized, metadata-stripped WebP images without facial or clothing alterations. See `ASSET_CREDITS.md`.

GitHub, LinkedIn, project repository URLs, and exact internship dates were not provided and are not guessed. Optional URL fields are `null`. Add verified links deliberately in the corresponding section when they are available.

## Architecture

The semantic Vue document is the source of all essential content. A single transparent WebGL renderer draws procedural scene groups into the visible HTML scene slots using scissor rectangles. Photography and controls remain real HTML elements above the canvas.

- `src/three/experience.ts`: one GSAP ticker coordinates Lenis, ScrollTrigger, demonstration timing, and renderer updates; handles anchors, browser history, visibility, preferences, resize, and cleanup.
- `src/three/SceneHost.ts`: one renderer/context, view framing, drawing resolution caps, visible-scene rendering, context loss/restoration, and disposal.
- `src/three/primitives.ts`: authored neural network, instanced scheduling tasks/resource bays, and six distinct GPU pipeline groups with real spatial transforms.
- `src/utils/math.ts`: deterministic scheduling illustration and reversible explosion curves.
- `src/composables/experienceState.ts`: small shared interaction state; no camera matrices are made reactive per frame.
- `src/components/SceneFrame.vue`: complete SVG/DOM fallback artwork for small viewports, reduced motion, and unavailable WebGL.

The RL visual is an educational priority-first/least-loaded-resource heuristic, not an actual trained PPO model. No fabricated benchmark scores are displayed. The GPU object separates real Three.js groups; its HTML alternative explains the same process without requiring a GPU.

## Controls

- Choose any of six skill groups.
- Select a scheduling stage, change 2–4 resources, or run the deterministic illustration.
- Expand **Explore the logic** for the PPO explanation and **Read the demonstration output** for text assignments.
- Scroll the GPU project, select a stage, or use **Assembled / Exploded / Follow scroll**.
- Use **Reduce motion** to remove ambient/camera animation and smooth scrolling for the current page session. OS reduced-motion preference is respected on entry.
- The mobile menu uses the native dialog mechanism and closes with Escape. Every essential interaction is available by keyboard.
- Contact uses real `mailto:` and `tel:` links. Copy email reports success only after the clipboard API resolves; a blocked clipboard produces an honest fallback message.

## Verification and browser review

Read `VISUAL_QA.md` for actual observations and limits. The production build, asset checks, and 14 unit tests passed. The available Chromium browser had WebGL disabled, so browser screenshots show the designed fallback. Real mesh separation, bounded geometry, reverse transforms, and scheduler logic were tested without a GPU. Full WebGL lighting, context recovery, frame rate, Safari/Firefox, and physical phone testing remain unverified.

A development-only `qa.html` page provides an iframe at 11 explicit CSS viewport sizes. While running `npm run dev`, visit `/qa.html`. Its **Check layout** button checks horizontal overflow and failed loaded images. The context controls are for inspecting loss/recovery on a WebGL-capable browser. This page is not emitted by the production build.

An optional Playwright suite is supplied for use on a machine with browser installation available:

```bash
npm run build
npx playwright install chromium
npm run test:e2e
```

The Playwright CLI suite was not executed in this environment; browser review used the available interactive Chromium instead. No separate ESLint configuration is included; TypeScript checking and the unit/asset checks are the supplied automated gates.

## Privacy and maintenance

All fonts, portraits, and the resume are served locally. No analytics, tracking pixels, remote 3D models, authentication, database, email service, or external asset CDN is required. There are no API keys. The professional phone number and email follow the provided resume; they can be removed in the content module before publication if desired.

Optional production CSP starting point (test with your host before adding): `default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'`. Do not apply this unchanged to Vite's development server, which needs a websocket connection.
