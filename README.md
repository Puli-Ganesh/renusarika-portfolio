# Rachamalli Renusarika — Portfolio

Rebuilt from the supplied November 17 brief. A responsive Vue 3 + TypeScript portfolio with three original portraits, an interactive scheduling schematic, and a five-part Three.js training module. No account, API key, backend, or environment variables are required.

## Run locally

Use Node.js 24 LTS and npm. Extract the ZIP, open a terminal in this folder, then run:

```sh
npm ci
npm run dev
```

Open the local URL printed in the terminal. Do not open `index.html` by double-clicking it.

## Production build

```sh
npm run build
npm run preview
```

The included `dist/` is the successfully built static site. For Vercel, import this folder with framework **Vite**, build command `npm run build`, and output directory `dist`. No deployment has been performed. A static host can also serve the contents of `dist/` directly. Relative asset paths support hosting beneath a subdirectory.

## Change content

- All profile text, project summaries, experience, and optional public links: `src/content/portfolio.ts`.
- Photo files: `public/images/`. Original upload mapping is in `docs/PHOTO_SOURCES.json`. Update dimensions and alt text in the content file if replacing them.
- Original résumé: `public/resume/Rachamalli_Renusarika_Resume.pdf`. Rebuild after replacing any public asset.
- Colors, typography, and responsive layout: `src/style.css`.
- Three.js geometry and camera: `src/three/model.ts` and `src/three/exhibit.ts`.

GitHub, LinkedIn, source, and demo links are omitted until verified URLs are supplied. The scheduling visualization is explicitly an illustration, not the trained PPO model. No benchmark percentages, employment dates, or additional claims were invented.

## Motion and accessibility

Scrolling stays native; anchor links use CSS smooth scrolling. The portrait frame and backing separate without fragmenting the face. The GPU module expands as its figure enters view and reverses on upward scrolling. Stage buttons and assembled/separated controls also work with a keyboard. Manual views return to scroll control when scrolling resumes.

Three.js loads only near its figure and only if WebGL2 is available. Rendering is on demand and stops offscreen or in a hidden tab. Capable phones use reduced geometry/shadow cost and capped pixel density. An original layered SVG remains available if WebGL fails or is too slow. System reduced-motion preferences and the footer's **Reduce animations** control use static, readable views. The setting lasts for the current page visit.

## Validation

```sh
npm test
npm run check:assets
```

See `docs/VALIDATION.md` for the checks and their limits. `qa.html` is a local review page used with the development server after a build; it is not included in the production output.

## Résumé note

The bundled PDF is the available original `Rachamalli_Renusarika_Updated_ML_Projects_CHV_Apps(1).pdf`, copied without alteration. Its phone number remains in the downloadable PDF; no phone number is displayed on the website. Review the PDF before publishing if you want that contact detail removed. The newer named résumé could not be retrieved during this build.

## Included files

Source, pinned dependency lockfile, optimized local photographs, local font and license, original résumé, focused tests, and compiled `dist/`. Dependency folders and temporary build outputs are excluded.
