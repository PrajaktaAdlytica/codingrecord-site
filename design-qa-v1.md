# CodingRecord design QA

final result: passed

## Comparison target and evidence

Source visual truth: `../codingrecord-storyboard/selected-direction.png` (1086 × 1448). The approved Register logo, typography, tokens and icon set in `../CodingRecord-Brand-Kit/` are the later identity source of truth. The storyboard and researched IA govern the extended pages and motion. The approved image is a two-scene concept board, not a complete responsive page; its lower scene and implemented workbench therefore have different framing.

Implementation: http://127.0.0.1:8767/ — real browser-rendered React frontend.

Full-view comparison: `screenshots/hero-comparison.png`, with source hero crop and implementation **together in one image**. Source crop: 1086 × 880 from the original. Implementation: `hero-reference-size.png`, 1086 × 880 at a 1086 × 880 CSS viewport. Both are 1:1 pixel comparison inputs; no browser chrome or device frame. Combined image is 2172 × 920 including a 40px label strip. State: home, scroll top, full motion, initial synthetic fixture.

Focused detail: `screenshots/evidence-comparison.png`. Source crop: 1000 × 252 from the lower scene. Actual live panel crop: `evidence-panels.png`, 948 × 386 at a 1086px CSS viewport. Both native 1:1 scale, displayed side by side without stretching. This is a content/anatomy comparison, not a same-height pixel match: the live UI deliberately adds source access, a full effective-date label, human-authority text and more vertical reading space. Its prominent amber evidence warning spans the entire workbench above the crop; `workbench-desktop.png` shows that context.

Final desktop captures: `home-desktop.png`, `workbench-desktop.png`, `checkpoint-desktop.png`, `modules-desktop.png`, `demo-report.png` at 1440 × 1000. `demo-desktop.png` is a full-page 1440 × 2048 capture.

Mobile: `home-mobile.png` at 390 × 844; `demo-mobile.png` is a full-page 390 × 4025 capture. These are actual browser screenshots, not generated UI pictures.

## Findings and comparison history

No actionable P0/P1/P2 findings remain in the tested scope.

### Iteration 1 — blocked, then corrected

- **P1, hero image crop:** The initial cover crop removed the architectural light wells, turning the scene into a mostly dark room. `hero-comparison-before.png` shows source and initial implementation together. The desktop image now keeps both light wells in frame; the background is original generated architectural photography-style art, not a CSS/SVG substitute. `hero-comparison.png` shows the corrected warm daylight, reflective floor and dark central reading area.
- **P2, hero typography and hierarchy:** Initial heading weight/scale were too light and the extra eyebrow displaced the composition. Removed the extra eyebrow, increased Inter to 590 weight and 6.1vw with an 82px cap, and adjusted hero/card spacing. The post-fix comparison retains the four-line headline, emphasized final line, central CTA and three linked panels. Later Register branding intentionally replaces the older sample logo.

### Iteration 2 — final visual refinement and recheck

- **P2, checkpoint label hierarchy:** A broad paragraph rule enlarged the chapter eyebrow. `checkpoint-before.png` records the issue. Narrowed the selector to `p:not(.eyebrow)` and restored the consistent 10px chapter label. Added explicit note date and selected rule/effective date to the condensed checkpoint record; data text is 12px. `checkpoint-desktop.png` is the post-fix capture.
- The focused panel comparison and final desktop/mobile captures were inspected after these changes. No further substantive mismatch was identified. The richer workbench layout, expanded navigation and stacked mobile cards are intentional adaptations for real readable controls and the complete brief.

### Earlier functional and responsive fixes, verified

- Placed disclosure pills in their own fixed header row so they cannot overlap reading content.
- Replaced tiny side-by-side mobile hero panels with readable vertical cards.
- Preserved the insufficient-evidence warning after “Mark reviewed”; a human event cannot fill a missing source.
- Removed apparent rule/date availability from blocked sources; their state explicitly says not evaluated / source unavailable.
- Kept initial audit-trail source versions immutable when the comparison version changes.
- Added Back-position restoration and same-route home-link scrolling.
- Kept OS reduced-motion defaults while allowing the visible site control to deliberately change the motion mode.

## Required fidelity surfaces

| Surface | Finding and acceptance |
| --- | --- |
| Fonts and typography | Self-hosted Inter matches the selected visual's sans hierarchy; the later Register wordmark uses the supplied outlined Marcellus-derived SVG. IBM Plex Mono separates IDs and dated evidence. Final browser inspection confirmed Inter and 590 hero weight. Four-line desktop headline wrapping is preserved; mobile has controlled, readable lines. Source and implementation differ slightly in weight/rendering because the reference is a generated raster. Accepted. |
| Spacing and layout rhythm | Centered hero, three linked perspective panes, spacious dark evidence chapters and continuous paper editorial rows. Desktop margins, 48px main actions, mobile stacking and dedicated disclosure row keep controls usable. Additional evidence text intentionally increases panel height. No horizontal overflow in checked 320/390/768/1440 layouts. |
| Colors and tokens | Approved ink, paper, jade, verdigris, amber and brick semantics. Amber communicates insufficient evidence; brick is reserved for rule conflict. Reviewed is a text status, not a compliance checkmark. Calculated solid token contrast: paper/ink 14.32:1, muted dark text/ink 8.74:1, ink/jade 12.32:1, amber/amber surface 7.48:1, light secondary text/paper 6.41:1. These are token checks, not a formal accessibility certification. |
| Image quality and assets | Original architectural WebP is 1672 × 941, approximately 117KB, with a smaller derivative and full source included. Both light wells remain visible on desktop; mobile uses a calmer central crop. Actual Register vector assets and licensed Tabler icons are used. Product controls and evidence panes are functional HTML, not a flattened screenshot. No broken images observed. |
| Copy and content | Exact hero, five preserved offers and order, human authority, uncertainty, synthetic disclaimers, source dates, limitations, hypothetical pricing, pilot gates, baseline metrics and kill rule are present. No fictional customer, revenue, efficacy, billability, integration or certification claim. `brief-coverage.md` maps the full brief. |

## Interaction and responsive verification

- Base pages and five module pages opened with correct headings and no broken images or horizontal overflow at desktop width.
- Home, demo and inquiry additionally checked at 320px and 768px; 390px and 1440px received visual inspection and screenshots.
- Product menu, mobile navigation, Escape dismissal, footer links, chapter links, same-route home link and browser Back checked.
- Rule tabs respond to arrow keys; selecting a version changes the fictional rule result while leaving the human disposition unchanged.
- Demo search and state filters, empty results/reset, record selection, unavailable-source edge case, source dialog and Escape dismissal checked.
- Review creates attributed timestamped events; Undo and reset restore fixture dispositions. Source versions in recorded events remain fixed.
- The report uses actual visible fixture counts: Pending 2, Reviewed 3, Unresolved 2, Abstained 2, Rejected 1; sum 10. All counts are labeled illustrative.
- Inquiry required fields and consent validation checked. A fictional example draft was downloaded and its JSON inspected, including unsent state, consent time and notice version. The draft was deleted/reset and the test download removed. No inquiry was transmitted.
- Reduced motion sets sticky stages to static and retains all sections. Explicit full-motion re-enable works. Scroll only changes presentation, never rule, case or disposition.
- Console warnings/errors checked: none observed in tested routes and flows.
- Final production build passed. Four Sites adapter tests passed: existing assets, app fallback, API/write boundary and required build files.

## Accepted limitations / follow-up polish

- This is an unpublished, isolated frontend concept. Inquiry backend, production authentication, real analytics and integrations are intentionally absent and honestly labeled.
- Current route delivery is a static hash-routed SPA. A public acquisition launch should add the final canonical domain, route-specific indexable metadata, verified business/legal contacts and an approved submission endpoint.
- Browser checks are from the available in-app browser. Real Safari/iOS/Android device testing, assistive-technology audit and measured performance profiling remain release checks; no frame-rate or formal WCAG certification is claimed.
- The reference is art direction, not a production interaction contract. The implementation keeps the selected mood and scene anatomy while providing real UI states and complete content. It is not a pixel copy of Micro.
- P3 optional: a future art pass could add an approved dedicated portrait background instead of the current central mobile crop. The current mobile view is readable and complete.

## Implementation checklist

- [x] Approved identity and favicon applied
- [x] Continuous environment and story motion implemented
- [x] All brief sections mapped and supporting pages complete
- [x] Synthetic demo and human-review boundary verified
- [x] Inquiry behavior truthful and validated
- [x] Desktop/mobile evidence captured
- [x] Source and implementation compared together, including focused detail
- [x] Visual fixes applied and recaptured
- [x] Build, adapter tests and browser console checks passed
- [x] Local preview left running
