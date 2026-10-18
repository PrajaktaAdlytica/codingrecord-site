# CodingRecord

A complete, responsive frontend for the CodingRecord concept, using the approved **Register** identity and **Evidence in Light** storyboard.

Local preview: http://127.0.0.1:8767/

## What is built

- **Cinematic revision:** expanding glass hero, word-by-word serif manifesto, converging evidence panes, perspective workbench entry, drifting rule date, amber checkpoint, unfolding case fan, a pinned five-module horizontal gallery and closing aperture.
- Continuous architectural backdrop; dark → paper → dark scroll story; bounded sticky evidence and rule stages; progressive evidence traces; perspective glass panels; fanned case selection; editorial reveals.
- Original Register vector identity, favicon family, self-hosted Inter, Marcellus and IBM Plex Mono, licensed icon set, and the approved semantic color system.
- The complete scroll story, all five module detail pages, product overview, use cases, evaluation/pricing, governance, research, about, inquiry, preview access, privacy, terms and accessibility.
- A ten-record isolated synthetic workbench: search, disposition filters, three featured cases, source dialogs, dated rule selection, attributed manual decisions, Undo, reset, JSON export and a count-based illustrative report.
- A validated inquiry form that prepares a downloadable **unsent** draft, including consent time and notice version. Nothing is submitted or stored remotely.
- Responsive navigation, keyboard-operated tabs and dialogs, reduced-motion control, native scrolling, chapter links, browser Back position restoration and a no-JavaScript text overview.

## Product boundary

This is a research-stage website and synthetic product demonstration. It has no clinical or coding engine, actual CPT/ICD content, real NCCI/MUE evaluation, live integrations, authentication backend, claim submission, patient data, payment or analytics. Rule replay switches clearly fictional fixtures. Reviewed never means approved, compliant or billable. All submission authority remains with a human coder.

The latest brief excludes dollar amounts. Pricing is presented as a hypothetical specialty/site-plus-setup model, with a volume alternative to test. No active price, customer, adoption, efficacy, certification, reimbursement or savings claim is made.

The form's local-draft behavior is deliberate and visible. A production inquiry endpoint, verified organizational contact/deletion channel, security and privacy review, approved analytics plan, final metadata/canonical domain and deployment must be configured before any public operating-service launch. No external services or accounts were changed.

## Run and build

The preview is already running for this handoff. For a later development session:

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 8767 --strictPort
npm run build
npm run test:sites
```

The production frontend is in `dist/client/`. The included Sites adapter and tests also emit `dist/server/index.js` and `dist/.openai/hosting.json`; no publishing has occurred. Navigation uses hash routes and works from a standard static root.

## Source map

| Location | Contents |
| --- | --- |
| `src/App.jsx` | Pages, story, routing and isolated demo interactions |
| `src/Cinematic.jsx` | Native-scroll presentation controller, module gallery and page illustrations |
| `src/cinematic.css` | Cinematic scenes, centered floating navigation and supporting-page redesign |
| `src/data.js` | Exact five offers, ten synthetic records, FAQs, sources and pilot gates |
| `src/styles.css` | Responsive theme, controls, motion and reduced-motion behavior |
| `public/brand/` | SVG logos, favicons, fonts, icons, tokens and licenses |
| `public/assets/` | Optimized original architectural background |
| `source-assets/` | Full-size generated background and art-direction prompt |
| `public/downloads/` | Audit worksheet, full overview and validation handoff |
| `screenshots/` | Real browser captures and reference comparisons |
| `design-qa.md` | Visual comparison, fixes, verification and remaining boundaries |
| `brief-coverage.md` | Requirement-to-page mapping |

## Art direction and motion

Micro is the interaction reference: one continuous environment, deliberate scroll pacing, transformations that carry elements between chapters, and transitions that join sections. The visual assets and interface are original CodingRecord work. The selected image and brand kit govern the Register mark, light wells, reflective floor, pale jade glass, amber uncertainty and quiet paper sections.

Scrolling reveals and repositions content only. It cannot select a rule, change a record, approve a disposition, or submit anything. Scrolling up reverses presentation; actual user decisions require clicks and remain attributable. The motion control and operating-system preference preserve readable content with static stages. Mobile trades perspective for stacked, legible evidence panels.

## Verification

The production build and four adapter tests pass. Browser checks cover desktop 1440px, tablet 768px, mobile 390px and narrow 320px; all primary views have no horizontal overflow or broken images. Route checks, keyboard version switching, search/filter empty states, source dialog dismissal, manual review/Undo/reset, report counts, inquiry validation/download/deletion, mobile navigation and reduced motion were exercised. No console warnings or errors were observed in the tested flows.

Font and icon licenses are bundled. The Register mark is the user's selected provisional identity, not a statement of trademark clearance. Official and vendor sources support context only, not product efficacy.

## Motion revision

The five-module gallery uses native vertical scrolling, with previous/next buttons, keyboard focus alignment and an explicit skip link. Below 1001px, or with reduced motion enabled, all five cards stack normally. Hero and manifesto pinning is bounded; mobile uses readable vertical panes. Scroll changes presentation only, never a rule selection, record state or reviewer decision.

The reference was inspected for composition and motion principles: scale changes, object travel, editorial type and scene continuity. The implementation uses original CodingRecord assets and code, not Micro screenshots or source. The navbar uses equal outer grid columns so its central links remain centered independently of the wordmark and CTA.

## IA completion and animated page heroes

Primary and chapter navigation, original IA route aliases, five footer module links, all 21 source references, full source/permission metadata, visible research handoff sections and the replay contract are implemented. `src/Completion.jsx` and `src/completion.css` contain the added IA sections, animated medical-coding hero studies and sign-in preview. Every scene pauses offscreen and supports local pause and global reduced motion. The animations are responsive HTML/SVG rather than video files or flattened UI images.

The initial queue matches the IA inventory: Pending 4, Abstained 2, Reviewed 3, Rejected 1. Each record has an immutable intake/source/assignment timeline. Source and permission blocks prevent Mark reviewed. Review reasons and compensating Undo events retain source/version context.

`/signin` is a polished frontend-only access preview. It does not collect passwords, send entered emails, authenticate users or create accounts. The prototype explicitly explains this boundary. All research/operating prerequisites remain visibly unfulfilled; frontend completeness is not pilot readiness.

## Human Checkpoint intro

The home page now opens with the selected option-3 Remotion composition: a source record, an unresolved evidence gap, a human reviewer, then a pullback into the existing architectural hero. There is no navbar in the composition. The website hides/inerts the navbar during playback and fades it in during the 520ms handoff.

- 315 frames, 30fps, 10.5 seconds; silent, responsive live Remotion Player.
- Plays on an initial home-page load. Internal navigation back home does not force a replay. Reload home to replay.
- Pause/resume, Skip intro, Escape and keyboard focus containment are provided.
- Reduced-motion preference bypasses playback and opens the static hero. Hidden-tab playback pauses.
- The Remotion chunk is lazy-loaded only when the intro is needed. A loading still and error/skip path keep the site accessible.
- This is an embedded Remotion composition, not an exported MP4. Editable desktop and mobile timelines are available through `npm run video:studio` at port 8768.
- Frame logic is in `src/intro/HumanCheckpoint.jsx`; website lifecycle and controls are in `IntroOverlay.jsx` and `IntroPlayer.jsx`.
- Remotion reference: https://www.remotion.dev/docs/player/player . Check Remotion's license terms for the eventual commercial operator: https://www.remotion.dev/license . No commercial license or deployment is asserted by this local prototype.


## Deploy to Vercel

Import `PrajaktaAdlytica/codingrecord-site` at https://vercel.com/new and use the repository root. `vercel.json` sets Vite, `npm ci`, `npm run build`, and `dist/client` as the output directory. No environment variables are required for this synthetic frontend preview. Deploy the `main` branch. Routes use URL hashes, so no SPA rewrite is needed. Subsequent pushes to the production branch trigger deployments when the Git integration is enabled. Add a custom domain from the project Settings → Domains and use the DNS records Vercel provides. Authentication and inquiry delivery remain intentionally disconnected.
