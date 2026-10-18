# CodingRecord cinematic revision — design QA

final result: passed

Scope: local frontend revision, checked in the in-app browser on 18 October 2026. This is visual/interaction QA, not a production, clinical, coding or accessibility certification. Previous iteration evidence is retained in `design-qa-v1.md`.

## Target and comparison inputs

The user requested substantially more dramatic scroll motion, stronger supporting pages and properly aligned navigation. Visual truth remains the approved Evidence in Light image (`../codingrecord-storyboard/selected-direction.png`) and Register brand kit. Micro (https://micro.reformcollective.com/) was inspected live for scale changes, sticky stages, object travel, serif editorial type and continuity between scenes. No Micro assets or code were copied.

`hero-comparison-v2.png` combines a 1086×880 crop of the selected image and a 1440×1000 actual browser screenshot, at native 1:1 sizes with a 44px annotation band. The different widths are explicit; this is composition, typography and asset fidelity review, not a same-viewport pixel match. `evaluation-comparison-v2.png` places the previous and revised 1440×1000 page openings together at native sizes. Both combined images were visually inspected.

## Resolved findings

- **P1 — insufficient scene progression:** Replaced the minimal-reveal rhythm with an expanding glass hero, sticky word reveal, stronger convergence, workbench perspective, date drift, unfolding case fan, pinned horizontal module gallery and closing aperture. The background continuously transitions dark → paper → dark. Real scroll testing confirmed the hero remains pinned at 450px scroll with pane transforms changing; at 1,300px of module travel the gallery was pinned at 110px and the track translated approximately 1,855px.
- **P2 — supporting pages lacked identity:** Product/module pages now open with synthetic workflow illustrations; Evaluation/Pilot with a bounded-audit protocol sheet; Research with a source notebook; Solutions with role layers; Governance with a human-authority panel; About/Access with the Register symbol. The page entry, background and artwork move without moving critical controls away from the reader. Legal pages use simpler editorial openings.
- **P2 — navigation alignment:** Floating header now uses `1fr auto 1fr`. At 1440px, the logo, center navigation and action row all have a vertical center of 50px; the navigation is centered on x=720. Mobile has a separate compact menu and persistent disclosure row.
- **P2 — inherited light-theme CTA color:** Added a scoped pale-jade token to dark supporting-page openings. Verified computed CTA colors: background rgb(211,232,206), text rgb(20,35,39).
- **P2 — access-page full-bleed alignment:** Overrode the prior narrow centered intro margin. The new intro spans exactly x=0…1440 without overflow.
- Corrected newly referenced icons to existing licensed sprite symbols. All page image checks returned zero broken images.

No actionable P0/P1/P2 findings remain in the tested revision scope.

## Visual fidelity surfaces

- **Type:** Inter remains the large sans hero/UI face; Marcellus provides deliberate editorial contrast in the manifesto, checkpoint, closing and page artwork. IBM Plex Mono remains the data face. All are self-hosted from the approved kit.
- **Spacing:** Scene-scale opening, consistent full-bleed subpage introductions, clearly separated synthetic workflow panels, wider reading rhythm, refined footer and navigation. At 1280×720 the hero panes end at y=638 and the module caption fits at y=686.
- **Color:** Existing ink/paper/jade system retained; amber marks missing evidence and brick only rule conflict. The moving background is decorative; text and controls retain independent surfaces.
- **Assets:** Original architectural WebP, Register vector identity and HTML/SVG product illustrations. No copied product screenshots, fake endorsements or additional generated interface images.
- **Content:** Exact five offers/order retained. No business state changes on scroll. DEMO/SYNTHETIC DATA and CONCEPT PREVIEW remain visible. Human authority, uncertainty, source/version context, limitations, hypothetical pricing language and pilot gates remain intact. See `brief-coverage.md`.

## Browser checks

- Desktop: 1440×1000 and laptop 1280×720 visually inspected. Revised primary pages, legal/access pages and all five module routes checked for headings, broken images and horizontal overflow: no failures.
- Mobile: 390×844 visual inspection of the hero, expanded navigation and Evaluation. Product, Solutions, Research, About, Pilot, Privacy, Access and representative module detail routes checked for overflow: zero. At 320px, Evaluation/nav and the stacked gallery were checked; the page has no horizontal overflow.
- Native scrolling changed the glass perspective, type reveal and module translation. Previous/next gallery buttons, skip link and keyboard focus traversal worked. Keyboard traversal brought the evidence-map card into view with counter 02/05.
- Reduced motion removes gallery translation and pinning, retains all five cards and fully reveals copy; the full-motion control restores the presentation. Mobile uses the static stacked gallery regardless of motion setting.
- Desktop Product menu, mobile expansion, mobile Evaluation routing and automatic menu close verified. Research jump action reaches source content.
- Demo search narrowed to the requested fixture; clearing restored the list. Review-source dialog displayed the correct synthetic note and owner and closed normally. No disposition or code was changed during motion testing.
- Browser console: no warnings/errors observed during final route and interaction checks.
- Production build passed. All four Sites adapter tests passed (assets, app fallback, API/write boundary, packaging files).

## Screenshot evidence

Current captures: `home-desktop-v2.png`, `hero-motion-v2.png`, `manifesto-v2.png`, `modules-v2.png`, `module-page-v2.png`, `evaluation-v2.png`, `research-v2.png`, `home-mobile-v2.png`, `evaluation-mobile-v2.png`. These are actual browser screenshots. Earlier un-suffixed captures document v1, not the current revision.

## Boundaries

The preview remains local. Inquiry drafts remain explicitly unsent; there is no production auth/backend, live clinical integration, analytics deployment or public-site deployment. Synthetic-rule fixtures do not establish coding validity. Performance was assessed through bounded native-scroll behavior and browser interaction, not a formal cross-device benchmark.

## Navbar follow-up

Removed both disclosure labels from the navbar at the user's explicit request. Product and footer disclosures remain. Dropdown now matches the navbar's outer x=32…1408 edges at 1440px; its left content guide and logo both start at x=57. All module title columns start at x=681.5. At 390px, navbar and menu both span x=12…378 with no horizontal overflow. Screenshot: `screenshots/navbar-aligned.png`. Primary IA differences are recorded in `brief-coverage.md`; prior visual acceptance does not imply exact IA coverage.

## IA completion and medical-coding visual studies — final verification

final result: passed (frontend/content scope). Earlier captures and counts describe earlier iterations; the current fixture and scope are authoritative in `brief-coverage.md`.

The new supporting-page heroes retain the architectural backdrop, Inter/Marcellus/mono hierarchy, jade glass panels and original motion language, with actual HTML/SVG coding workflow studies. `screenshots/ia-completion-comparison.png` places the previous Research hero and the new source-ledger hero together at their native 1440×1000 size plus a 40px label band. Both were inspected. New sign-in uses the same identity and a clear paper form surface. No actionable P0/P1/P2 issue remains in the checked surfaces.

Verified: all IA alias routes resolve; desktop primary navigation and six chapter links are present; five footer module links; 21 unique sources. At 1024px, logo right=208, navigation x=350…674, action row starts at741, with no collision. Navbar still contains neither removed disclosure label.

Desktop page checks (1440px) and narrow checks (320/390px) found no horizontal overflow, missing images or undefined content across tested product, solutions, research, evaluation, governance, company, legal, access, sign-in and pilot pages. Animation pause sets the actual play state to paused; global reduced motion sets animation-name to none and hides the scanning accent. Offscreen pausing is controlled by an IntersectionObserver.

Sign-in: native email validation; a fictional example.invalid address produced the explicit authentication-not-connected state, not fake success. No password field or network action exists. Test email was cleared.

Demo: ten records reconcile to 4 Pending, 2 Abstained, 3 Reviewed, 1 Rejected. Provenance fields and chronological three-event fixture trails render correctly. Permission-blocked record009 disables Mark reviewed. A synthetic review reason appeared in the timestamped audit event; Undo restored Pending while preserving a compensating event. Missing context remains visible. Source modal and full metadata were checked. Source/export event metadata preserve old/new state and immutable version context.

Automated fixture assertions passed for count reconciliation, unique IDs, three-event chronology, later next-action timestamps, required metadata and 21 unique source URLs. Production build and all four Sites packaging tests passed. Browser console checks showed no warnings/errors.

Current evidence: `home-complete.png`, `product-motion-complete.png`, `research-complete.png`, `signin-desktop.png`, `signin-mobile.png`, `demo-complete-desktop.png`, `demo-complete-mobile.png`, `report-complete.png`, and `source-storyboard-16x9.png` (1440×810). The responsive demo captures are actual 1440px and 390px browser output, not generated UI images.

Operating constraints are intentional and remain visible: no licensed rule engine, PHI, real integration, live authentication, real inquiry transmission, analytics, external publication or validated business outcome.

## 18 October 2026 — all-page spacing and reversible-motion pass

Reviewed all 19 canonical routes: home; product overview; all five modules; solutions; evaluation; governance; research; about; pilot; privacy; terms; accessibility; access; sign-in; synthetic demo. Fresh desktop (1440×1000) and mobile (390×844) hero/reading captures were inspected, with complete reduced-motion page captures for long-form layout review. Additional DOM overflow checks covered every route at 320px and 1024px. No horizontal document overflow was found at these four widths.

Confirmed and fixed:
- Supporting workflow panels had perspective/rotation. They now sit straight with centered, responsive alignment.
- Legal heroes inherited display:block despite specifying columns; restored the desktop grid, retaining mobile stacking.
- One-shot section entrances did not replay. Replaced them with reversible, alternating directional reveals and short stagger delays; existing cinematic scene transforms stay intact.
- Row hover transitions overrode reveal transitions; raised the reveal selector specificity.
- Long paper sections were visually uniform. Added restrained page-specific continuous washes and alternating research bands, retaining white cards/forms and plain legal reading backgrounds.
- Module hero studies repeated the same heading. Added distinct workflow-specific titles.

Interaction checks: desktop Product dropdown aligns with the navbar; mobile menu opens/closes with matching edges; Escape closes it; navbar contains neither disclosure label. Product reveals showed 4 in-view nodes, reset to 0 at the footer, and returned to 4 after upward navigation. Reduced motion removes all reveal attributes and leaves content visible. Full motion restored after checks. Browser warning/error log was empty. Build and four Sites adapter tests pass. These are browser viewport checks, not device-lab or formal WCAG certification.

Final evidence: screenshots/polish-desktop.png, screenshots/polish-mobile.png, screenshots/polish-review.png. Raw audit captures and geometry results are retained in the task's work/scroll-audit folder.

## Human Checkpoint intro integration

Added a 315-frame / 30fps Remotion Player intro and editable desktop/mobile Studio compositions. Verified actual automatic completion into the hero, navbar hidden at opacity 0 during playback and visible at opacity 1 afterward, restored body scrolling, removed main inert state, and focus returned to main. Pause/resume, Skip and Escape were exercised. Reduced-motion toggle plus reload bypassed the intro and preserved the static hero. Desktop 1440×1000, native 775×804 and mobile 390×844 were inspected; corrected a title/panel overlap in tall tablet and 1920×1080 composition framing. Mobile geometry had no document overflow. Existing build and all four Sites tests pass.

The film is frame-driven, not a video-file export; no MP4 is claimed. Runtime source is code-split from the main app. Remotion emits its informational licensing notice; no application runtime error was observed in the inspected playback. Licensing for a future commercial operator is documented in README. New screenshots: intro-desktop.png and intro-mobile.png.


## Final QA — 18 October 2026
Fresh desktop/mobile route sweep, intro controls/handoff, keyboard isolation, reduced-motion bypass, mobile navigation, synthetic disposition/version/reset/blocked-review, local inquiry and disconnected sign-in checked. Fixed initial intro focus, source dialog on route changes, and stale notifications. Build and 4 Sites tests passed. See Final-QA.html for evidence and limits.
