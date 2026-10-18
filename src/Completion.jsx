import React, { useEffect, useRef, useState } from "react";
import { modules } from "./data";
import { ModuleIllustration } from "./Cinematic";

export const aliases = {
  "/use-cases": "/solutions",
  "/contact": "/pilot",
  "/sign-in": "/signin",
  "/product/pre-bill-prioritization": "/product/prioritization",
  "/product/versioned-edits": "/product/edit-checker",
  "/product/denial-analysis": "/product/denial-patterns",
  "/how-it-works": "/home/evidence",
};
export function Chapters() {
  return (
    <nav className="chapter-index" aria-label="Story chapters">
      <span className="mono">FOLLOW THE RECORD</span>
      {[
        ["evidence", "The gap"],
        ["workbench", "Evidence"],
        ["checkpoint", "Human decision"],
        ["modules", "Five modules"],
        ["evaluation", "Evaluation"],
        ["closing", "Pilot"],
      ].map(([id, label], i) => (
        <a href={"#/home/" + id} key={id}>
          <small>0{i + 1}</small>
          {label}
        </a>
      ))}
      <a href="#/product" className="chapter-skip">
        Read the overview ↗
      </a>
    </nav>
  );
}
export function Provenance({ record, version }) {
  const blocked = [
    "Missing source context",
    "Input permission unavailable",
  ].includes(record.issue);
  return (
    <details className="provenance-details">
      <summary>Full source & permission context</summary>
      <dl>
        {[
          [
            "Specialty / claim type",
            record.specialty + " · " + record.claimType,
          ],
          [
            "Note / snippet",
            record.note +
              " " +
              record.noteVersion +
              " · " +
              record.snippetLocation,
          ],
          ["Encounter / service date", "18 Oct 2026 · fictional"],
          ["Setting", "Synthetic outpatient encounter"],
          ["Program / payer", "DEMO-PROGRAM · no real payer"],
          [
            "Rule family",
            "Illustrative edit fixture · not NCCI/MUE evaluation",
          ],
          [
            "Rule version",
            blocked ? "Unavailable — abstain" : "DEMO-RULE v" + version,
          ],
          [
            "Effective period",
            blocked
              ? "Unverified"
              : version === "A"
                ? "01 Jul–30 Sep 2026"
                : "01 Oct–31 Dec 2026",
          ],
          [
            "Source reference",
            blocked
              ? "Unavailable — no substituted source"
              : "Local authored fixture / DEMO-RULE v" + version,
          ],
          ["Fixture recorded", "18 Oct 2026 · " + record.time],
          [
            "Source retrieval",
            blocked ? "Not retrieved" : "Local synthetic fixture · 18 Oct 2026",
          ],
          ["Documentation rights", "Authored synthetic text only"],
          [
            "License / coverage",
            "No licensed codes; public edits are not comprehensive",
          ],
          [
            "Permission",
            record.permission || "Local read-only preview; no external access",
          ],
          ["Reviewer / next action", record.owner + " · " + record.nextAction],
          [
            "Next-action timestamp",
            record.nextActionAt || "18 Oct 2026 · fictional",
          ],
        ].map(([k, v]) => (
          <React.Fragment key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </React.Fragment>
        ))}
      </dl>
      <p>
        Historical effective context and a current-version comparison are
        separate. Neither fixture establishes coding validity or billability.
      </p>
    </details>
  );
}

export function MedicalMotion({ kind, slug }) {
  const ref = useRef();
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      threshold: 0.1,
    });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  const index =
    kind === "product"
      ? Math.max(
          0,
          modules.findIndex((m) => m.slug === slug),
        )
      : kind === "evaluation"
        ? 4
        : ["governance", "privacy", "terms", "accessibility"].includes(kind)
          ? 2
          : 1;
  const moduleTitles = {
    prioritization: "Find the next review checkpoint.",
    "evidence-map": "A sentence. A code. A trace.",
    "edit-checker": "Same record. Different dated context.",
    "denial-patterns": "From a pattern to its source.",
    "coder-qa": "A review becomes a learning signal.",
  };
  const name = moduleTitles[slug] ||
    {
      evaluation: "Measure the review, not the promise.",
      research: "A source behind every question.",
      solutions: "One record. Clear ownership.",
      about: "The record connects the team.",
      pilot: "One specialty. A bounded cohort.",
      signin: "Your workspace. Your review.",
      access: "A human at the final checkpoint.",
      governance: "Context before disposition.",
      privacy: "The record stays in the demo.",
      terms: "A visible boundary at every step.",
      accessibility: "The same evidence, at your pace.",
    }[kind] || "Follow the evidence through the record.";
  return (
    <div ref={ref} className="medical-motion" data-study={slug || kind} data-running={!paused && visible}>
      <div className="film-top">
        <span className="mono">WORKFLOW STUDY / 25</span>
        <button
          onClick={() => setPaused(!paused)}
          aria-label={
            paused ? "Play workflow animation" : "Pause workflow animation"
          }
        >
          {paused ? "Play" : "Pause"}{" "}
          <span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span>
        </button>
      </div>
      <h3>{name}</h3>
      <div className="film-dashboard">
        {kind === "research" ? (
          <div className="source-film">
            <span className="mono">SOURCE REGISTER / 21 REFERENCES</span>
            {[
              ["01", "Rule & release", "CMS / source context"],
              ["02", "Code rights", "AMA / licensing context"],
              ["03", "Human labels", "Prospective review required"],
            ].map(([n, t, d], i) => (
              <div key={n} style={{ "--i": i }}>
                <small>{n}</small>
                <section>
                  <strong>{t}</strong>
                  <p>{d}</p>
                </section>
                <span>↗</span>
              </div>
            ))}
            <p>Evidence of a rule ≠ evidence of product value.</p>
          </div>
        ) : kind === "solutions" || kind === "about" ? (
          <div className="source-film">
            <span className="mono">DEMO-CR-002 / HUMAN HANDOFF</span>
            {[
              ["01", "Revenue integrity", "Define the bounded workflow"],
              ["02", "Compliance owner", "Confirm rights and review gates"],
              [
                "03",
                "Coder B · fictional",
                "Inspect the source; own the disposition",
              ],
            ].map(([n, t, d], i) => (
              <div key={n} style={{ "--i": i }}>
                <small>{n}</small>
                <section>
                  <strong>{t}</strong>
                  <p>{d}</p>
                </section>
                <span>↓</span>
              </div>
            ))}
            <p>Source → context → assigned reviewer.</p>
          </div>
        ) : (
          <ModuleIllustration
            index={
              kind === "product" && !slug ? 1 : kind === "pilot" ? 0 : index
            }
          />
        )}
        <div className="film-scan" aria-hidden="true" />
      </div>
      <svg
        className="film-route"
        viewBox="0 0 440 72"
        role="img"
        aria-label="Note, code and dated rule lead to human review. No automatic release."
      >
        <path className="film-track" d="M35 26H405" />
        <path className="film-pulse" d="M35 26H405" />
        {["Note", "Code", "Rule", "Reviewer"].map((x, i) => (
          <g key={x}>
            <circle cx={35 + i * 123} cy="26" r="5" />
            <text x={35 + i * 123} y="60" textAnchor="middle">
              {x}
            </text>
          </g>
        ))}
      </svg>
      <div className="film-bottom mono">
        DEMO / SYNTHETIC DATA · CONCEPT PREVIEW{" "}
        <span>NO AUTOMATIC RELEASE</span>
      </div>
      <p className="film-caption">
        Illustrative motion only. The record and decision stay unchanged.
      </p>
    </div>
  );
}
export function ResearchCompletion() {
  return (
    <div className="ia-completion">
      <section>
        <p className="eyebrow">RESEARCH METHOD / 18 OCT 2026</p>
        <h2>Separate a source from a result.</h2>
        <p>
          The research combines the supplied Concept 25 brief, primary
          rule-source references, vendor descriptions and direct observation of
          Micro’s visual storytelling. Official sources establish policy
          context. Vendor pages describe their own products. Neither
          demonstrates CodingRecord’s accuracy, buying intent or commercial
          value.
        </p>
        <div className="ia-grid">
          <article>
            <h3>Source maintenance</h3>
            <p>
              A future source owner must record program, setting, release,
              effective/deletion period, retrieval timestamp and licensing
              scope. Check scheduled releases and replacement files before each
              replay. Freeze the original source snapshot; log replacements and
              invalidate affected comparisons. Missing history or rights means
              abstain.
            </p>
          </article>
          <article>
            <h3>Research limits</h3>
            <p>
              The original healthcare.md and historical preview screenshot were
              unavailable. The supplied brief and saved IA govern this
              implementation. No first specialty, sponsor, baseline, threshold,
              licensed ingestion or differentiated demand has been established.
            </p>
          </article>
        </div>
      </section>
      <section>
        <p className="eyebrow">ACQUISITION / PROPOSED EXPERIMENT</p>
        <h2>Ask about the work.</h2>
        <p>
          Start with HIM and revenue-integrity associations, coding
          consultancies, RCM outsourcing partners and compliance leaders. Offer
          a one-specialty shadow-audit design session. These are proposed
          channels, not partners.
        </p>
        <div className="ia-grid">
          <article>
            <span className="mono">A / EXCEPTION CONTEXT</span>
            <h3>What should the reviewer see next?</h3>
            <p>
              “A documentation/code mismatch is only the start of the question.
              Explore a synthetic evidence-review workflow and help design a
              one-specialty shadow audit.”
            </p>
            <a href="/downloads/shadow-audit-worksheet.txt" download>
              View the sample audit worksheet ↗
            </a>
          </article>
          <article>
            <span className="mono">B / CURRENT AUDIT</span>
            <h3>How do you trace an exception today?</h3>
            <p>
              “Map the current review path before testing another tool. Join a
              one-specialty audit design session around your team’s existing
              process.”
            </p>
            <a href="/downloads/shadow-audit-worksheet.txt" download>
              View the sample audit worksheet ↗
            </a>
          </article>
        </div>
        <p className="help">
          Both creatives: Concept DEMO. Not an operating product. Pricing is
          hypothetical. Use the same buyer geography, comparable audiences and
          an agreed spend cap. No campaign has launched.
        </p>
        <details>
          <summary>Traffic test and LinkedIn plan</summary>
          <p>
            Share a concise workflow teardown with an official CMS source and
            invite a scoped process audit. Log role, institution type and reply
            reason. Compare impressions, qualified visits, role-confirmed
            inquiries and drop-offs. Do not build patient-derived audiences,
            promise recovered dollars or interpret ad clicks as validation.
            Pause if misleading interpretation is reported.
          </p>
        </details>
      </section>
      <section>
        <p className="eyebrow">MEASUREMENT / PLANNED, NOT INSTALLED</p>
        <h2>Measure commitments, not clicks.</h2>
        <p>
          Proposed funnel: qualified visit → role-confirmed inquiry → readiness
          conversation → paid shadow-audit sponsor. Record source/UTM, CTA,
          consent timestamp, notice version and qualified-lead state only after
          an approved live collection design.
        </p>
        <details>
          <summary>Event and privacy specification</summary>
          <p>
            Planned events: chapter viewed, case opened, source version
            inspected, module interest, CTA clicked, form started, successful
            real inquiry, qualified role and paid sponsor. Never log field
            content, PHI or uploaded records. No telemetry is installed. A real
            operator, retention schedule, contact/deletion channel, consent
            handling and security review are launch prerequisites.
          </p>
        </details>
      </section>
      <section>
        <p className="eyebrow">REVIEW HANDOFF</p>
        <h2>A complete record of the hypothesis.</h2>
        <details>
          <summary>Tracking fields and parent responsibilities</summary>
          <p className="tracking-fields">
            concept_number=25; working_title=Medical Coding Auditor;
            proposed_brand=CodingRecord; buyer_role; operator_role; sponsor;
            interview_date; incumbent; baseline_source; data_rights_status;
            safety/compliance_owner; offer_of_interest;
            hypothetical_test_price_response; demo_objection;
            retrospective_cohort_status; pilot_budget_owner; pilot_commitment;
            primary_metric; stop_rule; next_action; evidence_url;
            screenshot_verified_by_parent.
          </p>
          <p>
            Primary metric: coder-accepted true-positive exceptions per 100
            reviewed claims versus current audit. Guardrails: false-positive
            minutes and overcoding flags. The parent owns name/domain/IP checks,
            final screenshot verification and external publication. No Notion
            data has been changed.
          </p>
        </details>
        <details>
          <summary>Three-case storyboard and capture requirements</summary>
          <p>
            Clean handoff (DEMO-CR-001): read the linked note, code placeholder
            and dated fixture; “Reviewed” records a fictional human disposition
            only. Ambiguous exception (DEMO-CR-002): incomplete/conflicting
            references remain visible as insufficient evidence. Blocked case
            (DEMO-CR-003): missing source prevents evaluation and retains
            abstention.
          </p>
          <p>
            Capture the queue, an opened record, source pane, reviewer action
            and report at 1440px desktop and 390px mobile, including a 16:9
            desktop composition. Keep DEMO/SYNTHETIC DATA, CONCEPT PREVIEW,
            fictional owner and dated evidence in each product frame. Mobile
            stacks note, rule and reviewer in reading order. No portal logos,
            real identities or implied validation.
          </p>
        </details>
        <a href="/downloads/validation-handoff.txt" download>
          Download the complete validation handoff ↗
        </a>
      </section>
    </div>
  );
}
export function EvaluationCompletion() {
  return (
    <section className="ia-completion">
      <p className="eyebrow">REPLAY CONTRACT / BEFORE ANY REAL DATA</p>
      <h2>Define what would change your mind.</h2>
      <div className="ia-grid">
        <article>
          <h3>Freeze the comparison</h3>
          <p>
            Agree one specialty, claim type, site and baseline window. Sample
            both flagged and unflagged claims. Blind the replay against
            specialty-specific human gold labels; separate historical edits from
            current-version comparisons. Record missing context, reviewer
            disagreement, exclusions and selection bias.
          </p>
        </article>
        <article>
          <h3>Own the review gate</h3>
          <p>
            Name the sponsor, budget owner, coder reviewer, compliance owner and
            adjudicator. Specify input contracts, documentation rights,
            exception criteria, permitted exports and security approvals. Agree
            precision, acceptance and false-positive-minute thresholds before
            testing; none are invented here.
          </p>
        </article>
      </div>
      <p>
        Report results by specialty, setting and edit family with denominators
        and uncertainty. A synthetic demo proves neither clinical benefit,
        coding validity, billability nor regulatory compliance. Stop if
        licenses/documentation rights fail or false-positive review cost exceeds
        value.
      </p>
      <h3>Commercial hypothesis, not a TAM claim</h3>
      <p>
        Test a per-specialty/site model with setup and a volume-based
        alternative. No dollar amount or active offer is shown. Expansion across
        sites, payer-specific denials and CDI depends on prospective value,
        rules maintenance and repeatable onboarding. Contract potential depends
        on claim mix, incumbent stack and audit costs—not total US healthcare
        spending. Revenue is a hypothesis about tested account pricing and
        retained accounts; no forecast is established.
      </p>
    </section>
  );
}
export function SignIn() {
  const [message, setMessage] = useState("");
  return (
    <div className="signin-layout">
      <div className="signin-story">
        <p className="eyebrow">CODINGRECORD / WORKSPACE ACCESS</p>
        <h1>
          Return to
          <br />
          the record.
        </h1>
        <p>Evidence, context and the person who owns the decision.</p>
        <MedicalMotion kind="signin" />
      </div>
      <section className="signin-card">
        <img
          src="/brand/logos/register-symbol-jade.svg"
          alt="CodingRecord Register"
          width="52"
        />
        <h2>Sign in to CodingRecord</h2>
        <p>
          Production access is not open. This is a preview of the sign-in
          experience.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setMessage(
              "Authentication is not connected. No sign-in request was sent. You can explore the synthetic workspace below.",
            );
          }}
        >
          <label>
            Work email
            <input
              type="email"
              placeholder="you@organization.example"
              autoComplete="off"
              required
              aria-describedby="signin-note"
            />
          </label>
          <button className="btn" type="submit">
            Continue with email <span aria-hidden="true">→</span>
          </button>
        </form>
        <p id="signin-note" className="help">
          Preview only. Do not enter a password. This email is not sent or
          saved.
        </p>
        {message && (
          <p role="status" className="signin-status">
            {message}
          </p>
        )}
        <a className="btn secondary" href="#/demo">
          Explore the synthetic workspace ↗
        </a>
        <a className="text-link" href="#/pilot">
          Request a scoped pilot ↗
        </a>
        <p className="help">
          No SSO, account creation or password reset is connected.{" "}
          <a href="#/privacy">Privacy notice</a>
        </p>
      </section>
    </div>
  );
}
