# Halus biological visual identity

Updated the existing site in place. The routes, authentication, event catalog, chapter tools, and existing WebGL bloodstream remain in place. No changes were made to the Akoizo project.

## Visual direction

The Akoizo reference uses cobalt, continuous page grids, compact scientific notation, and rigid panel borders. Halus now uses warm white, carmine, softer cellular shapes, rounded display lettering, and deep burgundy specimen fields. Arial is used for body text, buttons, forms, and most workspace headings.

The existing SVG Halus wordmark matches the supplied logo direction and is retained. The screenshot is not a font file. Audiowide (locally hosted, SIL Open Font License) is used as a complementary rounded display typeface, not represented as the exact proprietary Halus font. Its source and license are in `dist/assets/fonts/`.

## Original animations and evidence

The new cellular viewer has cell architecture, cell division, and mitochondrial network modes, with rotation, depth cutaway, and play/pause controls. The chapter panel uses the same mitochondrial renderer. Deterministic point geometry is projected in 3D and animated in time. These are original artistic models, not reconstructed experimental volumes, measured scans, or calibrated biological timelines. The public interface makes this distinction.

References, retrieved October 19, 2026:

- Allen Integrated Cell: https://www.allencell.org/allen-integrated-cell.html — 3D whole-cell organisation and surrounding internal structures. Unmodified source illustration: `dist/assets/references/allen-3d-cell.png`.
- hiPS cells during mitosis: https://www.allencell.org/hips-cells-during-mitosis.html — confocal membrane/DNA/spindle morphology and time-series observations. Unmodified figure: `dist/assets/references/allen-mitosis.png`. The page also supplies a time-series movie, a maximum-intensity projection of seven slices collected every 3.5 minutes.
- Mitochondria visualized via Tom20: https://www.allencell.org/cell-observations/mitochondria-visualized-via-tom20 — z-stacks, interconnected tubules, and time-lapse acquired in 3D every 30 seconds for 30 minutes. The displayed reference video is a single-slice view from that acquisition.

The site contains an expandable source section with credit to Allen Institute for Cell Science and links to each original. Reference images keep their original colours; the original animations use Halus red and white. 4D refers to 3D plus time, not a separate spatial dimension.

## Implementation

- `dist/biology.css`: final visual theme and responsive overrides.
- `dist/cellular.js`: source markup, seeded specimen geometry, renderer, controls, and cleanup.
- `dist/landing.js`: lifecycle integration and explicit motion controls.
- `dist/app.js`: new biology section and updated existing homepage content.
- `dist/index.html`: locally hosted display font and theme stylesheet.
- `server.mjs`: TTF content type for the local server.

New specimen renderers stop when paused, outside the viewport, or in a hidden tab, cap pixel density, follow reduced-motion preferences, and clean up observers/listeners on navigation.

## Validation

Existing syntax checks and all 21 existing automated tests passed. API tests need localhost access outside the network-restricted sandbox. Browser verification covered desktop and 390px mobile layouts, light/dark themes, all three specimen choices, pause, keyboard rotation/depth controls, expandable source images, and existing student/teacher entry navigation. Authentication itself was not exercised with a real account.
