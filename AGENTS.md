# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## CodingRecord decisions

- Use the approved Register logo, Evidence in Light architecture, Inter UI and IBM Plex Mono data typography. The selected image and brand kit take precedence over the older Copper/Slate proposal.
- Keep every product screen visibly synthetic. No real clinical/code data, autonomous coding, fabricated results, dollars, customers, partnerships or compliance claims.
- Keep the five offers in the exact supplied order. Preserve human authority and abstention.
- Scroll changes presentation only. Rule/case selection and review require explicit controls.
- Keep inquiry submissions as visibly unsent local drafts until an actual approved endpoint and privacy operations exist. Never replace this with fake success.
- Preserve keyboard, reduced-motion, mobile and no-JS reading paths.

## Motion revision requested by user

The first implementation was too static and its supporting pages too plain. Increase the scale and range of scroll-driven movement, use staged composition and continuous transitions, and keep the navigation precisely aligned. Use the Micro reference's rhythm and environmental continuity with original CodingRecord visuals. Preserve every product boundary and all existing functional controls.

## Navbar refinement

Remove CONCEPT PREVIEW and DEMO / SYNTHETIC DATA from the navbar per explicit user request. Retain synthetic disclosures in the demo, product frames and footer. Dropdown edges and inner padding should align with the navbar; module numbers, titles and arrows use fixed grid columns.

## IA completion and supporting-page visuals

Keep all primary/chapter links and route aliases, all 21 references, full provenance and permission-blocked cases. Initial fixture counts are 4 Pending, 2 Abstained, 3 Reviewed, 1 Rejected. Add relevant animated medical-coding HTML/SVG visuals to supporting heroes while preserving the architectural design and existing scroll story. Local pause, offscreen pause and reduced motion are mandatory. Sign-in is an honest unconnected UI preview; never capture passwords or simulate authenticated access.

## Desktop/mobile polish preference

Supporting-page workflow panels must be straight, not tilted. Preserve the authored home cinematic scenes. Use staggered left/right/top/bottom reveals on previously static reading items, replaying on either scroll direction. Disable these reveals completely with reduced motion and keep focused content visible. Vary subtle continuous paper/sage background washes by page; keep white forms and quiet legal reading surfaces. Navbar disclosures remain removed.

## Selected intro film

User selected option 3, The Human Checkpoint. Preserve its unresolved evidence gap, human-review moment, slate architecture and jade glass. No navbar inside the intro; reveal the website navbar smoothly only during the swift handoff to the existing hero. The intro may not change a claim, code, rule or disposition. Keep skip/pause, Escape, reduced-motion bypass and mobile composition. The editable Remotion source is part of this site; do not substitute the storyboard image for an animated film.
