import React, { useState, useEffect, useRef, useLayoutEffect, useCallback } from "react";
import { modules, records as seedRecords, sources, gates, faqs } from "./data";
import {
  Manifesto,
  ModuleGallery,
  PageArtwork,
  useCinematicMotion,
} from "./Cinematic";
import {
  aliases,
  Chapters,
  Provenance,
  MedicalMotion,
  ResearchCompletion,
  EvaluationCompletion,
  SignIn,
} from "./Completion";
import { useScrollReveals } from "./ScrollReveals";
import { IntroOverlay } from "./intro/IntroOverlay";
const A = "/brand/";
const route = () => {
  const raw = location.hash.replace(/^#/, "") || "/";
  return aliases[raw] || raw;
};
const href = (p) => "#" + p;
function Icon({ name = "arrow-right", size = 20 }) {
  return (
    <svg className="icon" width={size} height={size} aria-hidden="true">
      <use href={`${A}icons/sprite.svg#${name}`} />
    </svg>
  );
}
function Link({ to, children, className = "", ...props }) {
  return (
    <a
      className={className}
      href={href(to)}
      aria-current={route() === to ? "page" : undefined}
      {...props}
    >
      {children}
    </a>
  );
}
function ButtonLink({
  to,
  children,
  secondary = false,
  arrow = "arrow-right",
  ...p
}) {
  return (
    <Link to={to} className={"btn " + (secondary ? "secondary" : "")} {...p}>
      {children}
      {arrow && <Icon name={arrow} />}
    </Link>
  );
}
function Eyebrow({ children }) {
  return <p className="eyebrow">{children}</p>;
}
function Badges() {
  return (
    <div className="badges">
      <span>DEMO / SYNTHETIC DATA</span>
      <span>CONCEPT PREVIEW</span>
    </div>
  );
}
function Status({ state }) {
  return (
    <span
      className={
        "status " +
        ({
          Reviewed: "reviewed",
          Unresolved: "warning",
          "Rule conflict in fixture": "conflict",
          Abstained: "neutral",
          Rejected: "neutral",
        }[state] || "neutral")
      }
    >
      {state}
    </span>
  );
}
function SectionTitle({ n, title, children }) {
  return (
    <div className="section-title">
      <div>
        <Eyebrow>{n}</Eyebrow>
        <h2>{title}</h2>
      </div>
      {children && <p>{children}</p>}
    </div>
  );
}
function download(name, data, type = "application/json") {
  const a = document.createElement("a"),
    u = URL.createObjectURL(
      new Blob(
        [typeof data === "string" ? data : JSON.stringify(data, null, 2)],
        { type },
      ),
    );
  a.href = u;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(u), 1000);
}
function Tabs({ items, value, onChange, label }) {
  return (
    <div className="tabs" role="tablist" aria-label={label}>
      {items.map((x, i) => (
        <button
          key={x.value}
          role="tab"
          aria-selected={value === x.value}
          tabIndex={value === x.value ? 0 : -1}
          onClick={() => onChange(x.value)}
          onKeyDown={(e) => {
            if (["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) {
              e.preventDefault();
              let n =
                e.key === "Home"
                  ? 0
                  : e.key === "End"
                    ? items.length - 1
                    : (i + (e.key === "ArrowRight" ? 1 : -1) + items.length) %
                      items.length;
              onChange(items[n].value);
              e.currentTarget.parentNode.children[n].focus();
            }
          }}
        >
          {x.label}
        </button>
      ))}
    </div>
  );
}
function AppHeader({ path, motion, setMotion, introPhase = "done" }) {
  const headerRef = useRef();
  const [menu, setMenu] = useState(false),
    [product, setProduct] = useState(false);
  useEffect(() => {
    setMenu(false);
    setProduct(false);
  }, [path]);
  useEffect(() => {
    const fn = (e) => {
      if (e.key === "Escape") {
        setMenu(false);
        setProduct(false);
      }
    };
    const outside = (event) => {
      if (!headerRef.current?.contains(event.target)) {
        setMenu(false);
        setProduct(false);
      }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", fn);
    return () => {
      document.removeEventListener("keydown", fn);
      document.removeEventListener("pointerdown", outside);
    };
  }, []);
  return (
    <header
      ref={headerRef}
      inert={introPhase === "playing"}
      className={"site-header " + (path !== "/" ? "solid " : "") + (introPhase === "playing" ? "intro-hidden" : "intro-arriving")}
    >
      <div className="nav-shell">
        <Link to="/" className="brand" aria-label="CodingRecord home">
          <img
            src={A + "logos/register-horizontal-paper.svg"}
            alt="CodingRecord"
            width="207"
            height="32"
          />
        </Link>
        <nav
          className={menu ? "navigation open" : "navigation"}
          aria-label="Main navigation"
          onClick={(event) => {
            if (event.target.closest("a")) {
              setMenu(false);
              setProduct(false);
            }
          }}
        >
          <div className="nav-group">
            <button
              className="nav-trigger"
              aria-expanded={product}
              aria-controls="product-menu"
              onClick={() => setProduct(!product)}
            >
              Product <Icon name="chevron-down" size={14} />
            </button>
            {product && (
              <div className="mega" id="product-menu">
                <div>
                  <Eyebrow>A route back to the record</Eyebrow>
                  <Link to="/product">
                    <h3>Evidence before a decision.</h3>
                    <p>Explore the proposed workflow.</p>
                  </Link>
                  <ButtonLink to="/demo">Open synthetic demo</ButtonLink>
                </div>
                <div>
                  {modules.map((m) => (
                    <Link to={"/product/" + m.slug} key={m.slug}>
                      <span className="mono">{m.n}</span>
                      <span>
                        {m.name}
                        <small>{m.tag}</small>
                      </span>
                      <Icon name="arrow-up-right" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Link to="/home/evidence">How it works</Link>
          <Link to="/evaluation">Evaluation</Link>
          <Link to="/research" className="nav-research">
            Research
          </Link>
          <Link to="/about">About</Link>
          <Link to="/signin" className="mobile-access">
            Sign in
          </Link>
          <Link to="/access" className="mobile-access">
            Preview access
          </Link>
          <Link to="/pilot" className="mobile-access">
            Request a scoped pilot
          </Link>
        </nav>
        <div className="nav-actions">
          <Link to="/signin" className="signin-link">
            Sign in
          </Link>
          <button
            className="motion-toggle"
            aria-label={motion ? "Reduce motion" : "Enable full motion"}
            aria-pressed={!motion}
            onClick={() => setMotion(!motion)}
            title={motion ? "Reduce motion" : "Enable full motion"}
          >
            <Icon name={motion ? "player-pause" : "player-play"} size={16} />
            <span>Motion {motion ? "on" : "off"}</span>
          </button>
          <ButtonLink to="/pilot" secondary arrow={false}>
            Request a scoped pilot
          </ButtonLink>
          <button
            className="menu-toggle"
            aria-label={menu ? "Close navigation" : "Open navigation"}
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            <Icon name={menu ? "x" : "menu-2"} />
          </button>
        </div>
      </div>
    </header>
  );
}
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <img
              src={A + "logos/register-horizontal-paper.svg"}
              alt="CodingRecord"
              width="260"
              height="40"
            />
            <p>
              A read-only audit concept.
              <br />
              The coder keeps the decision.
            </p>
            <address className="company-address">
              42/208C Hoang Hoa Tham<br />
              Ward 7, Binh Thanh District<br />
              Ho Chi Minh City 790762, Vietnam
            </address>
            <Badges />
          </div>
          <div>
            <Eyebrow>Explore</Eyebrow>
            <Link to="/product">Product overview</Link>
            <Link to="/demo">Synthetic demo</Link>
            <Link to="/solutions">Use cases</Link>
            <Link to="/evaluation">Evaluation & pricing</Link>
          </div>
          <div>
            <Eyebrow>Understand</Eyebrow>
            <Link to="/governance">Governance & limitations</Link>
            <Link to="/research">Research & sources</Link>
            <Link to="/about">About CodingRecord</Link>
            <Link to="/pilot">Contact / scoped pilot</Link>
          </div>
          <div>
            <Eyebrow>Details</Eyebrow>
            <Link to="/signin">Sign in</Link>
            <Link to="/access">Preview access</Link>
            <Link to="/privacy">Privacy notice</Link>
            <Link to="/terms">Terms of this preview</Link>
            <Link to="/accessibility">Accessibility</Link>
          </div>
        </div>
        <div className="footer-modules">
          {modules.map((m) => (
            <Link key={m.slug} to={"/product/" + m.slug}>
              <small>{m.n}</small>
              {m.name}
            </Link>
          ))}
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} CodingRecord · Provisional concept 25
          </span>
          <span>
            Synthetic examples. Not clinical guidance. Not an operating product.
          </span>
          <Link to="/">
            Back to the beginning <Icon name="arrow-up-right" size={16} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
function GlassPanels({ compact = false }) {
  return (
    <div className={"glass-stage " + (compact ? "compact" : "")}>
      <div className="trace" aria-hidden="true">
        <span />
      </div>
      {[
        [
          "SOURCE NOTE",
          "file-text",
          "DEMO-NOTE-002",
          "Supporting detail: unresolved.",
        ],
        [
          "PROPOSED CODE",
          "layout-columns",
          "CODE-A",
          "Fictional · non-billable",
        ],
        ["DATED RULE", "history", "DEMO-RULE vB", "Effective 01 Oct 2026"],
      ].map((x, i) => (
        <div className={"glass-pane pane-" + i} key={x[0]}>
          <Eyebrow>{x[0]}</Eyebrow>
          <Icon name={x[1]} size={34} />
          <div className="pane-lines" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <div className="pane-data">
            <strong>{x[2]}</strong>
            <p>{x[3]}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
function RouteRail() {
  return (
    <div className="route-rail">
      {["Note", "Code", "Rule", "Reviewer"].map((s, i) => (
        <div key={s}>
          <span className="route-dot">{String(i + 1).padStart(2, "0")}</span>
          <p>{s}</p>
        </div>
      ))}
      <div className="outside">
        <Icon name="player-pause" />
        <p>
          Submission
          <br />
          <small>Outside this demo</small>
        </p>
      </div>
    </div>
  );
}
function Replay({ version, setVersion }) {
  return (
    <div className="replay-box panel">
      <div className="panel-top">
        <Badges />
        <span className="mono">DEMO-CR-002 · Coder B</span>
      </div>
      <div className="replay-main">
        <div>
          <Eyebrow>Illustrative rule replay</Eyebrow>
          <p className="mono">
            Service date: 18 Oct 2026 · synthetic outpatient
          </p>
          <h3>
            One claim.
            <br />
            Two dated fixtures.
          </h3>
          <p>
            Historical context and a current comparison stay separate. Scroll
            never selects a rule.
          </p>
          <Tabs
            label="Rule version"
            value={version}
            onChange={setVersion}
            items={[
              { value: "A", label: "01 Jul 2026 · vA" },
              { value: "B", label: "01 Oct 2026 · vB" },
            ]}
          />
        </div>
        <div className="rule-fixture" key={version}>
          <Icon name="history" size={26} />
          <div className="mono">
            DEMO-RULE v{version}
            <br />
            Effective {version === "A" ? "01 Jul" : "01 Oct"} 2026
          </div>
          <Status
            state={
              version === "A"
                ? "No conflict in fixture"
                : "Rule conflict in fixture"
            }
          />
          <p>
            {version === "A"
              ? "This fictional relationship has no edit conflict in fixture A. That does not establish code validity."
              : "Fixture B introduces a fictional relationship conflict. A human must inspect the context."}
          </p>
          <span className="help">
            Illustrative sources only. Not real NCCI/MUE results.
          </span>
        </div>
      </div>
    </div>
  );
}
function Workbench({ record, version, openSource, onReview, compact = false }) {
  const sourceMissing = [
    "Missing source context",
    "Input permission unavailable",
  ].includes(record.issue);
  return (
    <div className={"workbench " + (compact ? "workbench-small" : "")}>
      <div className="panel-top">
        <Badges />
        <span className="mono">{record.id} · 18 Oct 2026</span>
      </div>
      {record.issue === "Insufficient evidence" && (
        <div className="warning-banner">
          <Icon name="alert-triangle" />
          <div>
            <strong>Insufficient evidence, coder review opens.</strong>
            <span>Missing context stays visible. No auto-correction.</span>
          </div>
        </div>
      )}
      {sourceMissing && (
        <div className="warning-banner">
          <Icon name="ban" />
          <div>
            <strong>
              {record.issue === "Input permission unavailable"
                ? "Input permission unavailable — evaluation blocked."
                : "Historical source unavailable — abstained."}
            </strong>
            <span>
              No source result is inferred. Restoring context requires a later
              fixture.
            </span>
          </div>
        </div>
      )}
      <div className="workbench-cols">
        <div className="work-cell">
          <h3>
            <Icon name="file-text" />
            Source note
          </h3>
          <span className="mono">{record.note} · 18 Oct 2026</span>
          <p className="highlight">{record.excerpt}</p>
          <p>{record.detail}</p>
          <button className="text-button" onClick={() => openSource(record)}>
            Read source <Icon name="arrow-up-right" size={16} />
          </button>
        </div>
        <div className="work-cell">
          <h3>
            <Icon name="history" />
            Code / rule context
          </h3>
          <p className="mono code">{record.code} · non-billable</p>
          <div className="source-meta">
            <span>Illustrative source</span>
            <strong className="mono">
              {sourceMissing
                ? record.issue === "Input permission unavailable"
                  ? "Permission not established"
                  : "Required source unavailable"
                : `DEMO-RULE v${version}`}
            </strong>
            <span>Effective date</span>
            <strong className="mono">
              {sourceMissing
                ? "Unverified in this fixture"
                : `${version === "A" ? "01 Jul" : "01 Oct"} 2026`}
            </strong>
          </div>
          <p className="help">
            {sourceMissing
              ? "Abstained source check. No replacement version is assumed."
              : "Fictional code and source. No coding validity is inferred."}
          </p>
        </div>
        <div className="work-cell reviewer">
          <h3>
            <Icon name="user" />
            Human reviewer
          </h3>
          <p className="mono">
            {record.owner} · fictional role
            <br />
            18 Oct 2026 · {record.time}
          </p>
          <Status state={record.state} />
          <div className="review-actions">
            <button className="btn" onClick={() => openSource(record)}>
              Review source <Icon name="arrow-right" />
            </button>
            <button
              className="btn secondary"
              onClick={() => onReview(record.id, "Unresolved")}
            >
              Leave unresolved
            </button>
          </div>
          <p className="help">
            Coder retains final code and submission authority.
          </p>
        </div>
      </div>
      <Provenance record={record} version={version} />
      <div className="record-foot">
        No code changed. No claim submitted.{" "}
        <span>
          {record.owner} · next action: {record.nextAction || "Inspect source"}{" "}
          · {record.nextActionAt?.replace("T", " ")} · human decisions are
          reversible.
        </span>
      </div>
    </div>
  );
}
const personas = [
  [
    "Revenue integrity",
    "Know what deserves a closer look.",
    "Establish the current review baseline, pick one specialty and test whether evidence-linked exceptions justify reviewer time.",
    "Buyer / budget owner",
  ],
  [
    "Coding compliance",
    "Inspect the source behind every exception.",
    "Agree source rights, dated rule context, abstention paths and human oversight before a retrospective replay.",
    "Buyer / oversight owner",
  ],
  [
    "RCM operations",
    "Fit the review to the workflow you already have.",
    "Map existing queues, coder handoffs and audit ownership. Connections to your systems are a discovery question.",
    "Buyer / delivery partner",
  ],
];
function PersonaBlock() {
  const [v, setV] = useState("0");
  return (
    <div className="persona-layout">
      <Tabs
        label="Buyer perspective"
        value={v}
        onChange={setV}
        items={personas.map((p, i) => ({ value: String(i), label: p[0] }))}
      />
      <div className="persona-content" key={v}>
        <Eyebrow>{personas[+v][3]}</Eyebrow>
        <h3>{personas[+v][1]}</h3>
        <p>{personas[+v][2]}</p>
        <div className="owner-link">
          <Icon name="user" />
          <span>
            Coders are the users.
            <br />
            <strong>The final decision stays with them.</strong>
          </span>
        </div>
        <Link to="/solutions" className="text-link">
          Explore the operating model <Icon name="arrow-right" />
        </Link>
      </div>
    </div>
  );
}
function Alternatives() {
  return (
    <div className="alternatives">
      {[
        [
          "Manual coding & internal audit",
          "Your baseline—not a blank slate.",
          "Which evidence searches and review queues consume time today?",
        ],
        [
          "CDI teams & external audits",
          "Established expertise and adjacent workflows.",
          "Where do documentation improvement and pre-bill review hand off?",
        ],
        [
          "Rules engines",
          "Formal checking may already solve the need.",
          "Does linking note context and uncertainty add useful information?",
        ],
        [
          "Fathom & Nym",
          "Automation and auditability are existing themes.",
          "Test distinct buying intent; do not assume audit trails alone differentiate.",
        ],
      ].map((x) => (
        <div key={x[0]}>
          <h3>{x[0]}</h3>
          <p>
            {x[1]}
            <span>{x[2]}</span>
          </p>
        </div>
      ))}
    </div>
  );
}
function Metrics() {
  return (
    <div className="metrics">
      <div className="metric-primary">
        <Eyebrow>Primary measure / not measured</Eyebrow>
        <h3>
          Coder-accepted true-positive exceptions
          <br />
          per 100 reviewed claims.
        </h3>
        <p>
          Compared with the current audit, within the same specialty, claim mix
          and agreed baseline window. Define claim and exception denominators
          before replay.
        </p>
      </div>
      <div className="metric-grid">
        {[
          [
            "Precision",
            "Adjudicated true positives / all adjudicated flagged exceptions.",
          ],
          [
            "Review cost",
            "False-positive reviewer minutes, total and per 100 claims.",
          ],
          [
            "Coder acceptance",
            "Accepted proposed exceptions / adjudicated proposed exceptions.",
          ],
          [
            "Overcoding flags",
            "Guardrail with reviewer, source and escalation owner.",
          ],
        ].map((x) => (
          <div key={x[0]}>
            <span className="mono">NOT MEASURED</span>
            <h4>{x[0]}</h4>
            <p>{x[1]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
function FAQ() {
  return (
    <div className="faqs">
      {faqs.map(([q, a]) => (
        <details key={q}>
          <summary>
            {q}
            <Icon name="plus" />
          </summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}
function CTA({ small = false }) {
  return (
    <section className={"closing " + (small ? "small" : "")} id="closing">
      <div className="container">
        <Eyebrow>Begin with a bounded question</Eyebrow>
        <h2>
          Start with
          <br />
          <em>one specialty.</em>
        </h2>
        <p>
          A shadow-audit design session for revenue-integrity,
          <br className="desktop" /> coding compliance and RCM leaders.
        </p>
        <ButtonLink to="/pilot" arrow="arrow-up-right">
          Request a scoped pilot
        </ButtonLink>
        <span className="closing-note">
          Pricing is hypothetical. No active offer.
        </span>
      </div>
    </section>
  );
}
function Home({
  records,
  version,
  setVersion,
  openSource,
  onReview,
  motion,
  caseId,
  setCaseId,
}) {
  const selected = records.find((r) => r.id === caseId);
  return (
    <>
      <div className="story-progress" aria-hidden="true" />
      <section className="hero" id="top">
        <div className="hero-sticky">
          <div className="hero-copy">
            <p className="funding-announcement">Funding announcement coming soon · VC name and amount to be announced</p>
            <h1>
              Audit the evidence
              <br />
              behind a claim
              <br />
              before a human coder
              <br />
              <em>releases it.</em>
            </h1>
            <p>A read-only audit concept. The coder keeps the decision.</p>
            <ButtonLink to="/demo">Explore the synthetic demo</ButtonLink>
          </div>
          <GlassPanels />
          <div className="hero-bottom">
            <a href="#/home/evidence">
              Follow the evidence <Icon name="arrow-right" />
            </a>
            <span>Source → Code → Rule → Human</span>
          </div>
          <div className="hero-scroll-guide mono">
            <span>SCROLL TO TRACE THE RECORD</span>
            <i aria-hidden="true" />
          </div>
        </div>
      </section>
      <Chapters />
      <Manifesto />
      <section className="route-scene" id="evidence">
        <div className="container">
          <SectionTitle
            n="01 / The fragments converge"
            title={
              <>
                A claim is only
                <br />
                part of the story.
              </>
            }
          >
            An exception can send a coder between a note, a proposed code and a
            dated rule. The proposed evidence map brings that context into one
            review.
          </SectionTitle>
          <div className="sticky-visual">
            <GlassPanels compact />
            <RouteRail />
            <div className="stage-foot">
              <span>Coder B · fictional reviewer</span>
              <a href="#/home/workbench">
                Skip to the workbench <Icon name="arrow-right" size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="section dark-reading" id="workbench">
        <div className="container">
          <SectionTitle
            n="02 / Read the route"
            title={
              <>
                Less searching.
                <br />
                More context.
              </>
            }
          >
            Today: a review queue with evidence in separate places. Proposed:
            source, code, version and reviewer together. Whether that helps is a
            question for a shadow audit.
          </SectionTitle>
          <Workbench
            record={records[1]}
            version={version}
            openSource={openSource}
            onReview={onReview}
          />
        </div>
      </section>
      <section className="section version-scene" id="rule-replay">
        <span className="rule-watermark mono" aria-hidden="true">
          2026
        </span>
        <div className="container">
          <SectionTitle
            n="03 / Same claim. Dated context."
            title={
              <>
                The rule has a date.
                <br />
                Keep it in view.
              </>
            }
          >
            A historical claim and a current rule are different contexts. The
            source version belongs beside the finding, every time.
          </SectionTitle>
          <div className="version-sticky">
            <Replay version={version} setVersion={setVersion} />
          </div>
        </div>
      </section>
      <section className="section checkpoint" id="checkpoint">
        <div className="checkpoint-horizon" aria-hidden="true">
          <i />
          <i />
        </div>
        <div className="container">
          <div className="checkpoint-title">
            <Eyebrow>04 / The human checkpoint</Eyebrow>
            <h2>Insufficient evidence.</h2>
            <p>The system pauses. The coder decides.</p>
          </div>
          <div className="checkpoint-layout">
            <div className="checkpoint-note">
              <Icon name="alert-triangle" size={36} />
              <h3>
                A missing link
                <br />
                stays missing.
              </h3>
              <p>
                When documentation conflicts or context is incomplete, the next
                step is human review—not an automatic correction.
              </p>
              <div className="incomplete-route">
                <span>Evidence</span>
                <Icon name="player-pause" />
                <span>Human decision</span>
              </div>
            </div>
            <div className="checkpoint-record">
              <Badges />
              <p className="mono">DEMO-CR-002 · Coder B · fictional role</p>
              <p className="mono checkpoint-provenance">
                DEMO-NOTE-002 · 18 Oct 2026
                <br />
                DEMO-RULE v{version} · effective{" "}
                {version === "A" ? "01 Jul" : "01 Oct"} 2026
              </p>
              <Status state={records[1].state} />
              <h3>Supporting detail: unresolved.</h3>
              <p>
                Reference A: context incomplete.
                <br />
                Reference B: conflicting detail.
              </p>
              <div className="button-row">
                <button className="btn" onClick={() => openSource(records[1])}>
                  Review source <Icon name="arrow-right" />
                </button>
                <button
                  className="btn secondary"
                  onClick={() => onReview(records[1].id, "Unresolved")}
                >
                  Leave unresolved
                </button>
              </div>
              <small>No code changed. No claim submitted.</small>
            </div>
          </div>
        </div>
      </section>
      <section className="section case-scene" id="cases">
        <div className="container">
          <SectionTitle
            n="05 / Three routes. Human decisions."
            title={
              <>
                A clean handoff.
                <br />
                An honest pause.
              </>
            }
          >
            Explore three synthetic cases. A reviewed record describes a human
            event; it does not establish validity, compliance or billability.
          </SectionTitle>
          <div
            className="case-fan"
            role="tablist"
            aria-label="Featured synthetic case"
          >
            {records.slice(0, 3).map((r, i) => (
              <button
                key={r.id}
                role="tab"
                aria-selected={caseId === r.id}
                tabIndex={caseId === r.id ? 0 : -1}
                onKeyDown={(e) => {
                  if (["ArrowRight", "ArrowLeft"].includes(e.key)) {
                    e.preventDefault();
                    const n = (i + (e.key === "ArrowRight" ? 1 : 2)) % 3;
                    setCaseId(records[n].id);
                    e.currentTarget.parentNode.children[n].focus();
                  }
                }}
                className={
                  "case-card case-" + i + (caseId === r.id ? " selected" : "")
                }
                onClick={() => setCaseId(r.id)}
              >
                <span className="mono">
                  0{i + 1} / {r.id}
                </span>
                <Icon
                  name={
                    i === 0 ? "file-text" : i === 1 ? "alert-triangle" : "ban"
                  }
                  size={30}
                />
                <h3>{r.case}</h3>
                <Status state={r.state} />
                <span className="case-owner">{r.owner} · fictional role</span>
              </button>
            ))}
          </div>
          <div className="case-detail" role="tabpanel">
            <div>
              <Eyebrow>
                {selected.id} / 18 Oct 2026 · {selected.time}
              </Eyebrow>
              <p>{selected.detail}</p>
              <span className="help">
                Coder retains final code and submission authority.
              </span>
            </div>
            <ButtonLink to={"/demo/" + selected.id} secondary>
              Open this record
            </ButtonLink>
          </div>
        </div>
      </section>
      <div className="environment-bridge" aria-hidden="true" />
      <ModuleGallery motion={motion} />
      <section className="section light-section" id="use-cases">
        <div className="container">
          <SectionTitle
            n="07 / Where it fits"
            title={
              <>
                A clearer handoff
                <br />
                for the whole team.
              </>
            }
          >
            Built around the revenue-integrity or coding compliance buyer, with
            human coders at the center of the workflow.
          </SectionTitle>
          <PersonaBlock />
        </div>
      </section>
      <section className="section light-section" id="alternatives">
        <div className="container">
          <SectionTitle
            n="08 / Understand the alternatives"
            title={
              <>
                Your workflow
                <br />
                already has a history.
              </>
            }
          >
            Manual audits, CDI teams, external reviewers, rules engines and
            coding platforms already address parts of this problem. Start by
            understanding what works.
          </SectionTitle>
          <Alternatives />
          <div className="split-link">
            <p>
              Auditability is an existing competitive theme. Differentiated
              buying intent remains unproven.
            </p>
            <Link to="/research" className="text-link">
              Read the source context <Icon name="arrow-up-right" />
            </Link>
          </div>
        </div>
      </section>
      <section className="section light-section" id="governance">
        <div className="container">
          <SectionTitle
            n="09 / Provenance & boundaries"
            title={
              <>
                See the source.
                <br />
                Know the limit.
              </>
            }
          >
            Every exception needs a source, an effective date, a scope and an
            owner. When one is missing, the interface should say so.
          </SectionTitle>
          <div className="provenance-grid">
            {[
              ["01", "Source", "Licensed rules and permitted documentation."],
              [
                "02",
                "Effective date",
                "Historical context kept separate from current edits.",
              ],
              [
                "03",
                "Scope",
                "Specialty, claim type, payer and program limits.",
              ],
              [
                "04",
                "Reviewer",
                "A named human owner and reversible disposition.",
              ],
            ].map((x) => (
              <div key={x[0]}>
                <span className="mono">{x[0]}</span>
                <h3>{x[1]}</h3>
                <p>{x[2]}</p>
              </div>
            ))}
          </div>
          <div className="limit-strip">
            <Icon name="alert-triangle" />
            <span>
              Missing context → abstain. A synthetic demo cannot establish
              clinical benefit, coding validity or compliance.
            </span>
            <Link to="/governance">
              Read the boundaries <Icon name="arrow-right" />
            </Link>
          </div>
        </div>
      </section>
      <section className="section light-section" id="evaluation">
        <div className="container">
          <SectionTitle
            n="10 / Define the test before the pilot"
            title={
              <>
                Evidence of value
                <br />
                has to be earned.
              </>
            }
          >
            Replay sampled historical claims against blinded human-audited
            outcomes and licensed edits. Measure reviewer effort alongside
            true-positive exceptions.
          </SectionTitle>
          <Metrics />
          <div className="gate-summary">
            <h3>
              A readiness gate,
              <br />
              not a progress claim.
            </h3>
            <div>
              <p>{gates.join(" · ")}.</p>
              <Link to="/evaluation" className="text-link">
                Read the evaluation protocol <Icon name="arrow-up-right" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="section light-section faq-section" id="faq">
        <div className="container narrow">
          <Eyebrow>11 / A few useful answers</Eyebrow>
          <h2>Before the next step.</h2>
          <FAQ />
        </div>
      </section>
      <div className="environment-bridge return" aria-hidden="true" />
      <CTA />
      <Footer />
    </>
  );
}
function PageIntro({ label, title, children }) {
  const [, kind, slug] = route().split("/");
  const legal = ["privacy", "terms", "accessibility"].includes(kind);
  const jump =
    kind === "pilot"
      ? ".inquiry-form"
      : kind === "research"
        ? ".source-list"
        : kind === "solutions"
          ? ".persona-layout"
          : null;
  const action =
    kind === "pilot"
      ? "Prepare an inquiry"
      : kind === "research"
        ? "Open the source notebook"
        : kind === "solutions"
          ? "Find your perspective"
          : kind === "evaluation"
            ? "Design a shadow audit"
            : kind === "about"
              ? "Start a conversation"
              : "Explore the synthetic demo";
  return (
    <section className={"page-intro " + (legal ? "legal-intro" : "")}>
      <div className="page-hero-image" aria-hidden="true" />
      <div className="page-copy">
        <Eyebrow>{label}</Eyebrow>
        <h1>{title}</h1>
        {children && <p>{children}</p>}
        {!legal && (
          <div className="page-hero-actions">
            {jump ? (
              <button
                className="btn"
                onClick={() =>
                  document.querySelector(jump)?.scrollIntoView({
                    behavior:
                      document.documentElement.dataset.motion === "full"
                        ? "smooth"
                        : "instant",
                    block: "start",
                  })
                }
              >
                {action}
                <Icon name="chevron-down" />
              </button>
            ) : (
              <ButtonLink
                to={["evaluation", "about"].includes(kind) ? "/pilot" : "/demo"}
              >
                {action}
              </ButtonLink>
            )}
            <span className="mono">
              READ-ONLY CONCEPT
              <br />
              HUMAN ACCOUNTABLE
            </span>
          </div>
        )}
      </div>
      <MedicalMotion kind={kind} slug={slug} />
      <div className="page-hero-bottom mono">
        <span>CODINGRECORD / {kind?.toUpperCase() || "PREVIEW"}</span>
        <span>FOLLOW THE EVIDENCE ↓</span>
      </div>
    </section>
  );
}
function Product({ slug }) {
  const m = modules.find((m) => m.slug === slug);
  return (
    <>
      <div className="content-page light-section">
        <div className="container">
          <PageIntro
            label={
              m
                ? `Proposed module ${m.n}`
                : "Product / proposed operating layer"
            }
            title={
              m ? (
                m.short
              ) : (
                <>
                  Every code should have
                  <br />a route back to its note.
                </>
              )
            }
          >
            {m
              ? m.body
              : "A read-only evidence-to-code map for one specialty and pre-bill edit exceptions. An accountable human remains at every handoff."}
          </PageIntro>
          {m ? (
            <>
              <div className="module-detail">
                <div>
                  <Icon name={m.icon} size={48} />
                  <h2>{m.name}</h2>
                  <span className="status neutral">{m.tag}</span>
                </div>
                <div>
                  {[
                    [
                      "Provisional feature-line name",
                      m.workingName +
                        " — internal direction only; not a cleared mark or live plan.",
                    ],
                    ["Input", m.input],
                    ["Proposed output", m.output],
                    ["Human boundary", m.boundary],
                  ].map((x) => (
                    <div className="detail-row" key={x[0]}>
                      <Eyebrow>{x[0]}</Eyebrow>
                      <p>{x[1]}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="callout">
                <h3>Before this becomes a pilot.</h3>
                <p>
                  Confirm input contracts, reviewer role, evidence provenance,
                  permission states and exception criteria with the sponsor. No
                  live integrations or licensed source ingestion exist in this
                  preview.
                </p>
                <ButtonLink to="/demo">
                  Inspect the synthetic workflow
                </ButtonLink>
              </div>
            </>
          ) : (
            <>
              <RouteRail />
              <div className="editorial-copy">
                <h2>
                  From a review queue
                  <br />
                  to a traceable decision.
                </h2>
                <p>
                  The first product is deliberately narrow: inspect a proposed
                  code, read its evidence, see the dated rule context and assign
                  a human disposition. Exceptions, uncertainty and rejected
                  recommendations belong in the same record.
                </p>
              </div>
              <div className="module-list">
                {modules.map((m) => (
                  <Link
                    to={"/product/" + m.slug}
                    className="module-row"
                    key={m.slug}
                  >
                    <span className="mono">{m.n}</span>
                    <div>
                      <span className="module-tag">{m.tag}</span>
                      <h3>{m.name}</h3>
                      <p>{m.short}</p>
                    </div>
                    <Icon name="arrow-up-right" />
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <CTA small />
      <Footer />
    </>
  );
}
function Evaluation() {
  return (
    <>
      <div className="content-page light-section">
        <div className="container">
          <PageIntro
            label="Evaluation / testable before scalable"
            title={
              <>
                Agree on the test.
                <br />
                Then test the idea.
              </>
            }
          >
            A paid shadow audit is a commitment to evaluate the workflow. It is
            not evidence of coding validity or a promise of return.
          </PageIntro>
          <Metrics />
          <div className="editorial-copy">
            <h2>
              One specialty.
              <br />A blinded replay.
            </h2>
            <div>
              <p>
                Choose the cohort, exclusions, baseline window and original
                source versions before replay. Keep initial human adjudication
                blind to the proposed exceptions. Freeze the original outputs
                and resolve disagreements independently.
              </p>
              <p>
                Review sampled unflagged claims to look for missed exceptions.
                Report unresolved and abstained cases separately, and show
                denominators, selection bias, missing documentation and
                uncertainty. Historical context and current-edit comparisons
                must not be conflated.
              </p>
            </div>
          </div>
          <div className="gates">
            <Eyebrow>
              Required before a limited governed pilot / not achieved
            </Eyebrow>
            {gates.map((g, i) => (
              <div key={g}>
                <span className="gate-empty" aria-hidden="true" />
                <span>{g}</span>
                <span className="mono">REQUIRED</span>
              </div>
            ))}
          </div>
          <div className="two-col">
            <div className="callout">
              <Eyebrow>Commercial hypothesis</Eyebrow>
              <h3>
                Scope first.
                <br />A test price second.
              </h3>
              <p>
                Hypothetical test price—not an active offer. Explore a
                per-specialty/site model plus setup, alongside a volume-based
                alternative. The sponsor must agree scope, volume, term, source
                rights, owner and review gate in writing.
              </p>
              <p>No reimbursement, clinical outcome or ROI promise.</p>
            </div>
            <div className="callout warning-callout">
              <Eyebrow>A real stop condition</Eyebrow>
              <h3>
                Stop if the
                <br />
                evidence does not hold.
              </h3>
              <p>
                Stop or reposition if rule/code licenses or documentation rights
                fail, or if false-positive review cost exceeds value in the
                shadow audit.
              </p>
              <p>
                Agree numeric precision, review-cost, coder-acceptance and
                overcoding guardrails with the sponsor. No thresholds are
                asserted here.
              </p>
            </div>
          </div>
          <div className="editorial-copy">
            <h2>
              Expansion is
              <br />a hypothesis.
            </h2>
            <p>
              Begin with one specialty or claim type. Consider additional sites,
              payer-specific denials and CDI only if rules maintenance and
              operational value survive prospective review. Contract potential
              depends on claim mix, incumbent stack and audit costs—not total US
              healthcare spend.
            </p>
          </div>
          <EvaluationCompletion />
        </div>
      </div>
      <CTA small />
      <Footer />
    </>
  );
}
function Governance() {
  return (
    <>
      <div className="content-page light-section">
        <div className="container">
          <PageIntro
            label="Governance / what this preview cannot establish"
            title={
              <>
                Accountability is
                <br />
                part of the interface.
              </>
            }
          >
            Sources, dates, reviewer ownership and uncertainty are visible by
            design. They do not establish regulatory compliance.
          </PageIntro>
          <div className="provenance-grid">
            {[
              [
                "Human authority",
                "The coder retains final code and submission authority. The preview has no release or submission action.",
              ],
              [
                "Rights & licensing",
                "Confirm code-set, rule-source and documentation rights before any real-data replay. None are presumed from this demonstration.",
              ],
              [
                "Context & variation",
                "Payer/program differences, source updates and incomplete documentation limit interpretation. Missing history can require abstention.",
              ],
              [
                "Audit responsibility",
                "A source-linked trail supports inspection. It is not a liability waiver, a clinical recommendation or evidence of billability.",
              ],
            ].map((x) => (
              <div key={x[0]}>
                <h3>{x[0]}</h3>
                <p>{x[1]}</p>
              </div>
            ))}
          </div>
          <div className="editorial-copy">
            <h2>
              What is inside
              <br />
              the boundary.
            </h2>
            <div>
              <p>
                Ten fictional records. No PHI, patient/provider identifiers,
                real CPT/ICD content, diagnosis, treatment, clinical
                recommendations or live portal connections.
              </p>
              <p>
                Source fixtures and review events are synthetic. Every manual
                local action is attributed, timestamped and reversible. Exports
                are limited to synthetic records or an inquiry draft that you
                explicitly download.
              </p>
              <p>
                Future real-data work requires signed data-access/security
                approvals, human oversight, authorized handling and applicable
                contracts. No security certification, HIPAA assertion or
                integration capability is claimed.
              </p>
            </div>
          </div>
          <div className="limit-strip">
            <Icon name="alert-triangle" />
            <p>
              False overcoding incentives, review burden and audit liability are
              evaluation risks. They must be assessed alongside precision.
            </p>
          </div>
          <div className="button-row">
            <ButtonLink to="/evaluation">Inspect the pilot gate</ButtonLink>
            <ButtonLink to="/research" secondary>
              Read sources & gaps
            </ButtonLink>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
function Research() {
  return (
    <>
      <div className="content-page light-section">
        <div className="container">
          <PageIntro
            label="Research notebook / concept 25"
            title={
              <>
                Strong rule sources.
                <br />
                Open buying questions.
              </>
            }
          >
            Formal rules and direct competitors exist. Differentiated demand for
            CodingRecord, licensed inputs and practical value still need to be
            established.
          </PageIntro>
          <div className="source-list">
            {sources.map(([n, url, d], i) => (
              <a href={url} target="_blank" rel="noreferrer" key={n}>
                <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{n}</h3>
                  <p>{d}</p>
                </div>
                <Icon name="arrow-up-right" />
              </a>
            ))}
          </div>
          <p className="help">
            Source register from the 18 October 2026 research. Official and
            vendor sources describe their own scope; they do not validate this
            concept. Recheck applicable releases and rights before any real
            test.
          </p>
          <div className="editorial-copy">
            <h2>
              Listen before
              <br />
              building the pilot.
            </h2>
            <p>
              Start with HIM/revenue-integrity associations, RCM consultants and
              coding consultancies. Offer a one-specialty shadow-audit design
              session and an audit worksheet. These are proposed research
              channels, not partners.
            </p>
          </div>
          <div className="three-col">
            {[
              [
                "Buyer / budget owner",
                "Which queue and specialty matter? What does the incumbent solve? Is the priority compliance QA or net revenue? Who owns budget? What would justify a paid shadow audit?",
              ],
              [
                "Coder / operator",
                "Walk through the process without sharing records. Where do you find note and rule context? When do you reject a flag or abstain? How much time do false positives consume?",
              ],
              [
                "Oversight owner",
                "Who grants bounded data access? Which licenses and documentation rights apply? Who adjudicates gold labels, accepts liability and owns the stop decision?",
              ],
            ].map((x) => (
              <div className="paper-card" key={x[0]}>
                <Eyebrow>Interview prompts</Eyebrow>
                <h3>{x[0]}</h3>
                <p>{x[1]}</p>
              </div>
            ))}
          </div>
          <details className="research-details">
            <summary>
              Validation sequence and parent tracking handoff{" "}
              <Icon name="plus" />
            </summary>
            <ol>
              <li>Interview buyer, coder and oversight owner separately.</li>
              <li>Document the incumbent workflow and an observed baseline.</li>
              <li>Show the synthetic example and test willingness to pay.</li>
              <li>
                Obtain bounded rights and agree a blinded retrospective replay.
              </li>
              <li>
                Agree endpoint, thresholds and stop conditions before a limited
                pilot.
              </li>
            </ol>
            <p>
              Proposed tracking fields: buyer/operator roles, sponsor, interview
              date, incumbent, baseline source, data rights, oversight owner,
              module interest, test-price response, demo objection, cohort
              status, budget owner, commitment, primary metric, stop rule, next
              action, evidence URL and screenshot verification. No Notion system
              is connected or changed.
            </p>
          </details>
          <div className="button-row">
            <a
              className="btn"
              href="/downloads/shadow-audit-worksheet.txt"
              download
            >
              Download audit worksheet <Icon name="download" />
            </a>
            <a
              className="btn secondary"
              href="/downloads/validation-handoff.txt"
              download
            >
              Full validation handoff <Icon name="download" />
            </a>
          </div>
          <ResearchCompletion />
        </div>
      </div>
      <Footer />
    </>
  );
}
function About() {
  return (
    <>
      <div className="content-page light-section">
        <div className="container">
          <PageIntro
            label="About / a research-stage concept"
            title={
              <>
                A clearer record.
                <br />A human decision.
              </>
            }
          >
            CodingRecord explores whether a read-only evidence layer can make
            pre-bill review easier to inspect and evaluate.
          </PageIntro>
          <div className="editorial-copy">
            <h2>
              Start narrow.
              <br />
              Stay accountable.
            </h2>
            <div>
              <p>
                Our proposed mission is to begin with one specialty, one
                evidence map and pre-bill exceptions. Each source, exception and
                human owner should be traceable. Expansion follows permission
                and measurable operational gain.
              </p>
              <p>
                The buyer is a revenue-integrity director or coding compliance
                lead at a health system or RCM provider. Coders are the users.
                The first validation audience is HIM/revenue-integrity
                associations and RCM consultants.
              </p>
              <p>
                This is Concept 25: Medical Coding Auditor. CodingRecord is a
                provisional brand. No real customers, revenue, demand, live
                integrations, production service or accepted pricing have been
                demonstrated.
              </p>
              <div className="company-details">
                <h3>Company details</h3>
                <address>
                  42/208C Hoang Hoa Tham<br />
                  Ward 7<br />
                  Binh Thanh District<br />
                  Ho Chi Minh City<br />
                  790762<br />
                  Vietnam
                </address>
              </div>
            </div>
          </div>
          <div className="callout">
            <h3>The next conversation is about your workflow.</h3>
            <p>
              Bring a description of one specialty and its review bottleneck. Do
              not share patient details, claim records or clinical documents.
            </p>
            <ButtonLink to="/pilot">
              Plan a shadow-audit design session
            </ButtonLink>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
function Solutions() {
  return (
    <>
      <div className="content-page light-section">
        <div className="container">
          <PageIntro
            label="Use cases / people around the record"
            title={
              <>
                Different responsibilities.
                <br />
                One traceable handoff.
              </>
            }
          >
            Choose the workflow question that fits your role. The initial wedge
            is auditor QA on existing claims, not claim submission.
          </PageIntro>
          <PersonaBlock />
          <div className="editorial-copy">
            <h2>
              Fit the incumbent.
              <br />
              Test the gap.
            </h2>
            <p>
              Document current queues, access permissions, source availability
              and review ownership before proposing a connection. Health-system
              and RCM environments differ; there are no installed integrations
              to assume.
            </p>
          </div>
          <Alternatives />
        </div>
      </div>
      <CTA small />
      <Footer />
    </>
  );
}
function Pilot() {
  const [ready, setReady] = useState(null),
    [error, setError] = useState("");
  const submit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    if (!data.consent) {
      setError("Confirm you understand this creates an unsent local draft.");
      return;
    }
    setError("");
    setReady({
      ...data,
      notice_version: "preview-2026-10-18",
      consent_timestamp: new Date().toISOString(),
      source: "codingrecord-preview",
      cta: "Prepare local inquiry draft",
      qualified_lead_status: "Not assessed",
      deletion_path: "Discard the on-page draft; delete any downloaded copy",
      campaign: Object.fromEntries(
        [...new URLSearchParams(location.search)].filter(([k]) =>
          [
            "utm_source",
            "utm_medium",
            "utm_campaign",
            "utm_content",
            "utm_term",
          ].includes(k),
        ),
      ),
      status: "Unsent local inquiry draft",
    });
  };
  return (
    <>
      <div className="content-page light-section">
        <div className="container">
          <PageIntro
            label="Contact / scoped pilot inquiry"
            title={
              <>
                One specialty.
                <br />
                One useful conversation.
              </>
            }
          >
            A shadow-audit design session for the relevant operations role.
            Start with the workflow, baseline and approvals—not patient records.
          </PageIntro>
          <div className="pilot-layout">
            <div>
              <h3>What the session would cover</h3>
              <ol className="session-list">
                <li>Your current pre-bill review queue and incumbent tools.</li>
                <li>One specialty or claim type and the evidence gap.</li>
                <li>Source rights, oversight and a blinded replay plan.</li>
                <li>Paid shadow-audit scope and agreed stop conditions.</li>
              </ol>
              <div className="callout">
                <Eyebrow>Hypothetical commercial model</Eyebrow>
                <p>
                  Per specialty/site plus setup; a volume alternative can be
                  tested. No active offer, payment collection or price
                  acceptance is implied.
                </p>
              </div>
              <p className="help">
                This preview has no inquiry backend or booking service. It
                prepares a draft on your device. Nothing is sent.
              </p>
            </div>
            <form
              className="inquiry-form"
              onSubmit={submit}
              onChange={() => ready && setReady(null)}
            >
              <Badges />
              <h3>Prepare a scoped inquiry</h3>
              <p className="help">
                Do not include patient information, clinical details, claim IDs
                or records. No uploads.
              </p>
              <div className="field">
                <label htmlFor="role">Your role</label>
                <select name="role" id="role" required defaultValue="">
                  <option value="" disabled>
                    Select a role
                  </option>
                  {[
                    "Revenue-integrity director",
                    "Coding compliance lead",
                    "RCM leader / provider",
                    "Coder / operator",
                    "RCM or coding consultant",
                    "Other operations role",
                  ].map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="organization">Organization</label>
                <input
                  id="organization"
                  name="organization"
                  autoComplete="organization"
                  required
                  maxLength="120"
                />
              </div>
              <div className="field">
                <label htmlFor="email">Work email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="region">Site / region</label>
                <input
                  id="region"
                  name="region"
                  placeholder="Region or site type only"
                  maxLength="120"
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="workflow">
                  Which single specialty or claim type would you evaluate, and
                  where does review stall?
                </label>
                <textarea
                  id="workflow"
                  name="workflow"
                  rows="4"
                  maxLength="600"
                  required
                  aria-describedby="workflow-help"
                />
                <span className="help" id="workflow-help">
                  Describe the process only. Do not include real records or
                  individual details.
                </span>
              </div>
              <label className="consent">
                <input type="checkbox" name="consent" required />
                <span>
                  I understand this creates an unsent local draft and have read
                  the <Link to="/privacy">preview privacy notice</Link>.
                </span>
              </label>
              {error && <p role="alert">{error}</p>}
              <button className="btn" type="submit">
                Prepare inquiry draft <Icon name="arrow-right" />
              </button>
              {ready && (
                <div className="draft-result" role="status">
                  <h4>Your draft is ready. Nothing was sent.</h4>
                  <p>
                    Download it for your own review. No meeting has been booked.
                  </p>
                  <button
                    type="button"
                    className="btn secondary"
                    onClick={() =>
                      download("CodingRecord-inquiry-draft.json", ready)
                    }
                  >
                    Download draft <Icon name="download" />
                  </button>
                  <button
                    type="button"
                    className="text-button"
                    onClick={(e) => {
                      e.currentTarget.closest("form").reset();
                      setReady(null);
                    }}
                  >
                    Delete draft & clear fields
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
function Legal({ type }) {
  const data = {
    privacy: [
      "Privacy notice",
      "This website preview does not send inquiry fields to a server. Fields remain in page memory until navigation or reload; a draft is saved to your device only if you explicitly download it.",
      "Sign-in is an interface preview. It does not send or retain the entered email, collect passwords, authenticate a user or create an account.",
      "The motion preference is kept in local storage. No analytics, advertising pixels or patient-data collection are configured. The hosting environment may process ordinary web requests; this local preview has no third-party form processor.",
      "To remove a draft, clear the form or reload the page and delete any file you downloaded. To reset the motion preference, use the motion control or clear this site’s local storage. No marketing subscription is created.",
      "Before a live inquiry service is enabled, the operator identity, contact/deletion channel, retention, access controls and notice must be finalized. Do not enter PHI or sensitive records.",
    ],
    terms: [
      "Terms of this preview",
      "CodingRecord is a provisional research-stage concept. The site and isolated demo illustrate proposed workflows using fictional records and code placeholders. They are not clinical guidance or an operating coding service.",
      "No output establishes a diagnosis, treatment recommendation, coding validity, billability, reimbursement entitlement or regulatory compliance. Human coders retain final authority; no claim is submitted.",
      "No commercial offer, service-level agreement, accepted pricing, customer relationship, live integration or certification is created by using this preview. Source links retain their own terms.",
      "Actual product, data and licensing terms must be approved before any real-data pilot. Do not upload records or attempt to use the fixtures for a real claim.",
    ],
    accessibility: [
      "Accessibility & motion",
      "The story uses native scrolling. The motion control disables perspective, sticky stages and environmental travel; all text, sources, controls and cases remain available. The system reduced-motion preference is respected on first load.",
      "Navigation, tabs, review controls, dialogs and forms support keyboard interaction. Focus is visible; uncertainty and status always include text. Mobile layouts use stacked panels rather than forced horizontal movement.",
      "The header offers a skip-to-content link. Direct navigation to the synthetic demo bypasses the scroll story. No critical text is typed, flashed or shown only on hover.",
      "This implementation has been checked at desktop and mobile viewports; it is not a formal accessibility certification. The contact flow is a local draft while this remains a concept preview.",
    ],
  };
  let d = data[type];
  return (
    <>
      <div className="content-page light-section">
        <div className="container narrow">
          <PageIntro
            label="Preview information / 18 October 2026"
            title={d[0]}
          />
          {d.slice(1).map((p, i) => (
            <p className="legal-paragraph" key={i}>
              {p}
            </p>
          ))}
          <ButtonLink to="/pilot">Contact / inquiry information</ButtonLink>
        </div>
      </div>
      <Footer />
    </>
  );
}
function Access() {
  return (
    <>
      <div className="content-page light-section">
        <div className="container access-page">
          <img
            src={A + "logos/register-symbol-ink.svg"}
            alt="Register symbol"
            width="90"
            height="81"
          />
          <PageIntro
            label="Preview access"
            title={
              <>
                No account.
                <br />
                Just the evidence.
              </>
            }
          >
            Production sign-in is not available. The isolated synthetic
            workspace is open for inspection, with no password, patient data or
            system connection.
          </PageIntro>
          <ButtonLink to="/demo">Enter synthetic workspace</ButtonLink>
          <Link to="/pilot" className="text-link">
            Discuss a future pilot <Icon name="arrow-up-right" />
          </Link>
          <Badges />
        </div>
      </div>
      <Footer />
    </>
  );
}
function Demo({
  records,
  version,
  setVersion,
  selectedId,
  setSelectedId,
  openSource,
  onReview,
  events,
}) {
  const [search, setSearch] = useState(""),
    [filter, setFilter] = useState("All"),
    [view, setView] = useState("Queue");
  const [reviewReason, setReviewReason] = useState("");
  useEffect(() => setReviewReason(""), [selectedId]);
  const shown = records.filter(
    (r) =>
      (filter === "All" || r.state === filter) &&
      (r.id + " " + r.case + " " + r.owner)
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  const record = records.find((r) => r.id === selectedId) || records[1];
  return (
    <>
      <div className="demo-page">
        <div className="container">
          <div className="demo-heading">
            <div>
              <Eyebrow>Isolated workspace / read-only concept</Eyebrow>
              <h1>The evidence desk.</h1>
              <p>
                Ten fictional records. Human decisions. No external actions.
              </p>
            </div>
            <button
              className="btn secondary"
              onClick={() =>
                download("CodingRecord-synthetic-records.json", {
                  disclosure: "DEMO / SYNTHETIC DATA — CONCEPT PREVIEW",
                  comparison_version: version,
                  records: records.map((r) => ({
                    ...r,
                    ruleContext: {
                      type: "Illustrative edit fixture",
                      program: "DEMO-PROGRAM",
                      setting: "Synthetic outpatient",
                      version: [
                        "Missing source context",
                        "Input permission unavailable",
                      ].includes(r.issue)
                        ? null
                        : "DEMO-RULE v" + version,
                      effectivePeriod:
                        version === "A"
                          ? "2026-07-01 / 2026-09-30"
                          : "2026-10-01 / 2026-12-31",
                      sourceReference: "Local authored fixture",
                      retrievedAt: [
                        "Missing source context",
                        "Input permission unavailable",
                      ].includes(r.issue)
                        ? null
                        : r.authoredAt,
                      licensing:
                        "Synthetic content only; no licensed rules or codes",
                    },
                  })),
                  events,
                })
              }
            >
              Export synthetic records <Icon name="download" />
            </button>
          </div>
          <Badges />
          <div className="demo-toolbar">
            <Tabs
              label="Workspace view"
              value={view}
              onChange={setView}
              items={[
                { value: "Queue", label: "Reviewer queue" },
                { value: "Report", label: "QA / trend preview" },
              ]}
            />
            <span className="mono">ALL COUNTS ARE ILLUSTRATIVE</span>
          </div>
          {view === "Queue" ? (
            <>
              <div className="queue-layout">
                <aside className="queue">
                  <div className="queue-filter">
                    <label htmlFor="record-search">
                      Find a synthetic record
                    </label>
                    <div className="search-input">
                      <Icon name="search" />
                      <input
                        id="record-search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Record or reviewer"
                      />
                    </div>
                    <label htmlFor="state-filter" className="sr-only">
                      Filter by disposition
                    </label>
                    <select
                      id="state-filter"
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                    >
                      {[
                        "All",
                        "Pending",
                        "Reviewed",
                        "Unresolved",
                        "Abstained",
                        "Rejected",
                      ].map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                    <span className="help">
                      {shown.length} of {records.length} records
                    </span>
                  </div>
                  <div className="queue-list">
                    {shown.map((r) => (
                      <button
                        className={
                          "queue-item " + (r.id === record.id ? "active" : "")
                        }
                        key={r.id}
                        onClick={() => setSelectedId(r.id)}
                        aria-current={r.id === record.id ? "true" : undefined}
                      >
                        <span className="mono">{r.id}</span>
                        <strong>{r.case}</strong>
                        <Status state={r.state} />
                        <small>
                          {r.owner} · fictional · {r.time}
                        </small>
                      </button>
                    ))}
                    {!shown.length && (
                      <div className="empty">
                        <h3>No records match.</h3>
                        <p>An empty view does not establish correctness.</p>
                        <button
                          className="text-button"
                          onClick={() => {
                            setSearch("");
                            setFilter("All");
                          }}
                        >
                          Reset filters
                        </button>
                      </div>
                    )}
                  </div>
                </aside>
                <div className="demo-record">
                  <div className="demo-record-title">
                    <h2>{record.case}</h2>
                    <span className="mono">{record.id}</span>
                  </div>
                  <Workbench
                    record={record}
                    version={version}
                    openSource={openSource}
                    onReview={onReview}
                  />
                  <div className="demo-lower">
                    <div className="panel">
                      <Eyebrow>Dated fixture</Eyebrow>
                      <Tabs
                        label="Demo rule version"
                        value={version}
                        onChange={setVersion}
                        items={[
                          { value: "A", label: "01 Jul 2026 · vA" },
                          { value: "B", label: "01 Oct 2026 · vB" },
                        ]}
                      />
                      <p>
                        {[
                          "Missing source context",
                          "Input permission unavailable",
                        ].includes(record.issue)
                          ? "Source unavailable; rule replay is abstained for this fixture."
                          : `DEMO-RULE v${version}: ${version === "A" ? "no conflict in fixture" : "rule conflict in fixture"}.`}{" "}
                        Version selection does not change the human disposition.
                      </p>
                    </div>
                    <div className="panel">
                      <Eyebrow>Manual demo disposition</Eyebrow>
                      <label className="review-reason">
                        Review reason (synthetic context only)
                        <input
                          value={reviewReason}
                          onChange={(e) => setReviewReason(e.target.value)}
                          maxLength={240}
                          placeholder="Why does this exception need this disposition?"
                        />
                      </label>
                      <div className="button-row">
                        <button
                          className="btn secondary small"
                          onClick={() =>
                            onReview(
                              record.id,
                              "Unresolved",
                              "Escalated locally to the fictional QA Lead; no message sent",
                            )
                          }
                        >
                          Escalate locally
                        </button>
                        {["Reviewed", "Rejected", "Abstained"].map((s) => (
                          <button
                            className="btn secondary small"
                            key={s}
                            disabled={
                              s === "Reviewed" &&
                              [
                                "Missing source context",
                                "Input permission unavailable",
                              ].includes(record.issue)
                            }
                            onClick={() => {
                              onReview(
                                record.id,
                                s,
                                reviewReason.trim() ||
                                  `Fictional reviewer selected ${s.toLowerCase()} after examining the fixture`,
                              );
                              setReviewReason("");
                            }}
                          >
                            {s === "Reviewed"
                              ? "Mark reviewed"
                              : s === "Rejected"
                                ? "Reject recommendation"
                                : "Abstain"}
                          </button>
                        ))}
                        <button
                          className="btn secondary small"
                          onClick={() =>
                            onReview(
                              record.id,
                              seedRecords.find((r) => r.id === record.id).state,
                            )
                          }
                        >
                          Reset to fixture
                        </button>
                      </div>
                      <p className="help">
                        Reviewed does not mean approved, valid, compliant or
                        billable. Missing source or permission blocks “Mark
                        reviewed”; restoring context requires a later fixture.
                      </p>
                    </div>
                  </div>
                  <div className="audit-trail panel">
                    <Eyebrow>
                      Source-linked audit trail / synthetic record
                    </Eyebrow>
                    {record.timeline.map((entry, i) => (
                      <div key={i}>
                        <span className="mono">{entry.at}</span>
                        <p>
                          {entry.action}
                          <br />
                          <small>
                            {entry.source} · {record.noteVersion} · {entry.rule}
                          </small>
                        </p>
                      </div>
                    ))}
                    {events
                      .filter((e) => e.id === record.id)
                      .map((e) => (
                        <div key={e.key}>
                          <span className="mono">
                            {new Date(e.at).toISOString()}
                          </span>
                          <p>
                            {e.owner} · fictional role · {e.text}
                            <br />
                            {e.reason}
                            <br />
                            <small>
                              {e.source} · {e.rule} · local demo event
                            </small>
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="report panel">
              <div className="panel-top">
                <h2>Review dispositions</h2>
                <Badges />
              </div>
              <p>
                Illustrative counts from these {records.length} visible
                synthetic records. No live telemetry, production quality or
                measured ROI.
              </p>
              <div className="report-bars">
                {[
                  "Pending",
                  "Reviewed",
                  "Unresolved",
                  "Abstained",
                  "Rejected",
                ].map((s) => {
                  const n = records.filter((r) => r.state === s).length;
                  return (
                    <div key={s}>
                      <Status state={s} />
                      <meter min="0" max={records.length} value={n}>
                        {n}
                      </meter>
                      <span className="mono">
                        {n} / {records.length}
                      </span>
                    </div>
                  );
                })}
              </div>
              <h3>Discussion prompts, not performance scores.</h3>
              <p>
                Inspect unresolved references, unavailable sources and rejected
                recommendations with the review team. Synthetic patterns cannot
                establish efficacy or employee quality.
              </p>
            </div>
          )}
          <p className="demo-disclaimer">
            Coder retains final code and submission authority. No PHI,
            diagnoses, real code content, clinical recommendations, live
            integrations or claim submission.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
export function App() {
  const [caseId, setCaseId] = useState("DEMO-CR-002");
  const [path, setPath] = useState(route),
    [records, setRecords] = useState(seedRecords),
    [version, setVersion] = useState("B"),
    [selectedId, setSelectedId] = useState("DEMO-CR-002"),
    [events, setEvents] = useState([]),
    [toast, setToast] = useState(null),
    [source, setSource] = useState(null);
  const dialogRef = useRef();
  const navigation = useRef({
    path: route(),
    positions: {},
    link: false,
    restore: null,
  });
  const [motion, setMotion] = useState(() => {
    try {
      return (
        localStorage.getItem("cr-motion") !== "off" &&
        !matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    } catch {
      return false;
    }
  });
  const [introPhase, setIntroPhase] = useState(() => route() === "/" && motion ? "playing" : "done");
  const finishIntro = useCallback(() => setIntroPhase("done"), []);
  useEffect(() => { if (path !== "/" || !motion) setIntroPhase("done"); }, [path, motion]);
  const introActive = path === "/" && motion && introPhase !== "done";
  useEffect(() => {
    const previousRestoration = history.scrollRestoration;
    history.scrollRestoration = "manual";
    const click = (event) => {
      const anchor = event.target.closest?.('a[href^="#/"]');
      if (
        !anchor ||
        event.defaultPrevented ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        event.button !== 0
      )
        return;
      const next = anchor.getAttribute("href").slice(1);
      if (next === route()) {
        event.preventDefault();
        if (next.startsWith("/home/"))
          document.getElementById(next.split("/")[2])?.scrollIntoView();
        else window.scrollTo({ top: 0, behavior: "instant" });
        return;
      }
      navigation.current.link = true;
    };
    const fn = () => {
      const nav = navigation.current;
      nav.positions[nav.path] = window.scrollY;
      nav.path = route();
      nav.restore = nav.link ? null : (nav.positions[nav.path] ?? null);
      nav.link = false;
      setPath(nav.path);
    };
    document.addEventListener("click", click);
    addEventListener("hashchange", fn);
    return () => {
      document.removeEventListener("click", click);
      removeEventListener("hashchange", fn);
      history.scrollRestoration = previousRestoration;
    };
  }, []);
  useEffect(() => {
    document.documentElement.dataset.motion = motion ? "full" : "reduced";
    try {
      localStorage.setItem("cr-motion", motion ? "on" : "off");
    } catch {}
  }, [motion]);
  useEffect(() => {
    const mq = matchMedia("(prefers-reduced-motion: reduce)"),
      fn = () => {
        if (mq.matches) setMotion(false);
      };
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  const home = path === "/" || path.startsWith("/home/");
  useCinematicMotion(path, motion);
  useScrollReveals(path, motion);
  useLayoutEffect(() => {
    // A source belongs to its record view; history navigation must dismiss it.
    setSource(null);
    setToast(null);
    dialogRef.current?.close();
    if (navigation.current.restore !== null) {
      window.scrollTo({ top: navigation.current.restore, behavior: "instant" });
      navigation.current.restore = null;
    } else if (path.startsWith("/home/"))
      document
        .getElementById(path.split("/")[2])
        ?.scrollIntoView({ behavior: motion ? "smooth" : "instant" });
    else window.scrollTo({ top: 0, behavior: "instant" });
    if (path.startsWith("/demo/")) setSelectedId(path.split("/")[2]);
    document.title = home
      ? "CodingRecord — Audit the evidence behind a claim"
      : path === "/signin"
        ? "Sign in · CodingRecord"
        : `${path.split("/")[1].replace(/^./, (s) => s.toUpperCase())} · CodingRecord`;
  }, [path]);
  useEffect(() => {
    if (source) dialogRef.current?.showModal();
    else dialogRef.current?.close();
  }, [source]);
  const review = (
    id,
    state,
    reason = "Explicit human disposition in the synthetic preview",
  ) => {
    const record = records.find((r) => r.id === id),
      key = Date.now() + Math.random(),
      at = new Date().toISOString(),
      previous = record.state;
    if (
      state === "Reviewed" &&
      ["Missing source context", "Input permission unavailable"].includes(
        record.issue,
      )
    )
      return;
    setRecords((rs) => rs.map((r) => (r.id === id ? { ...r, state } : r)));
    const event = {
      key,
      id,
      at,
      owner: record.owner,
      source: record.note,
      sourceLocation: record.snippetLocation,
      ruleEffectivePeriod:
        version === "A" ? "2026-07-01 / 2026-09-30" : "2026-10-01 / 2026-12-31",
      rule: ["Missing source context", "Input permission unavailable"].includes(
        record.issue,
      )
        ? "Not evaluated — source/permission unavailable"
        : "DEMO-RULE v" + version,
      text: `Disposition: ${state.toLowerCase()}`,
      reason,
      oldState: previous,
      newState: state,
      permission: record.permission,
      noteVersion: record.noteVersion,
    };
    setEvents((es) => [...es, event]);
    setToast({
      message: `${record.owner} recorded “${state.toLowerCase()}” in the local demo.`,
      undo: () => {
        setRecords((rs) =>
          rs.map((r) => (r.id === id ? { ...r, state: previous } : r)),
        );
        setEvents((es) => [
          ...es,
          {
            ...event,
            oldState: state,
            newState: previous,
            reason: "Explicit undo of the preceding local demo disposition",
            key: Date.now(),
            at: new Date().toISOString(),
            text: `Undo: restored ${previous.toLowerCase()}`,
          },
        ]);
      },
    });
  };
  let page;
  if (home)
    page = (
      <Home
        {...{ records, version, setVersion, motion, caseId, setCaseId }}
        openSource={setSource}
        onReview={review}
      />
    );
  else if (path.startsWith("/demo"))
    page = (
      <Demo
        {...{ records, version, setVersion, selectedId, setSelectedId, events }}
        openSource={setSource}
        onReview={review}
      />
    );
  else if (path.startsWith("/product"))
    page = <Product slug={path.split("/")[2]} />;
  else
    page = {
      "/evaluation": <Evaluation />,
      "/solutions": <Solutions />,
      "/governance": <Governance />,
      "/research": <Research />,
      "/about": <About />,
      "/pilot": <Pilot />,
      "/privacy": <Legal type="privacy" />,
      "/terms": <Legal type="terms" />,
      "/accessibility": <Legal type="accessibility" />,
      "/access": <Access />,
      "/signin": (
        <>
          <SignIn />
          <Footer />
        </>
      ),
    }[path] || (
      <div className="content-page light-section">
        <div className="container">
          <PageIntro
            label="Page not found"
            title="Let’s return to the record."
          />
          <ButtonLink to="/">Go to the beginning</ButtonLink>
        </div>
      </div>
    );
  return (
    <>
      <a
        className="skip"
        href="#main"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("main").focus();
          document.getElementById("main").scrollIntoView();
        }}
      >
        Skip to content
      </a>
      <div
        className={"environment " + (!home ? "quiet" : "")}
        aria-hidden="true"
      >
        <img src="/assets/architecture.webp" alt="" />
        <div className="environment-shade" />
        <div className="environment-paper" />
      </div>
      <AppHeader {...{ path, motion, setMotion }} introPhase={introActive ? introPhase : "done"} />
      {introActive && <IntroOverlay onPhase={setIntroPhase} onDone={finishIntro} />}
      <main id="main" inert={introActive} tabIndex="-1" data-page={path.split("/")[1] || "home"}>
        {page}
      </main>
      <dialog
        ref={dialogRef}
        className="source-dialog"
        onCancel={() => setSource(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            const r = e.currentTarget.getBoundingClientRect();
            if (
              e.clientX < r.left ||
              e.clientX > r.right ||
              e.clientY < r.top ||
              e.clientY > r.bottom
            )
              setSource(null);
          }
        }}
        aria-labelledby="source-title"
      >
        <button
          className="dialog-close"
          aria-label="Close source"
          onClick={() => setSource(null)}
        >
          <Icon name="x" />
        </button>
        {source && (
          <>
            <Badges />
            <Eyebrow>Source context / fictional record</Eyebrow>
            <h2 id="source-title">{source.note}</h2>
            <div className="source-meta">
              <span>Source recorded</span>
              <strong>18 Oct 2026 · {source.time}</strong>
              <span>Reviewer</span>
              <strong>{source.owner} · fictional role</strong>
              <span>Rule fixture</span>
              <strong>
                {[
                  "Missing source context",
                  "Input permission unavailable",
                ].includes(source.issue)
                  ? "Required source unavailable · not evaluated"
                  : `DEMO-RULE v${version} · ${version === "A" ? "01 Jul" : "01 Oct"} 2026`}
              </strong>
            </div>
            <p className="highlight">{source.excerpt}</p>
            <p>{source.detail}</p>
            <Provenance record={source} version={version} />
            <p className="help">
              No patient information, clinical description or licensed code
              content. Reading this source does not change a disposition.
            </p>
            <button className="btn" onClick={() => setSource(null)}>
              Return to the record <Icon name="arrow-left" />
            </button>
          </>
        )}
      </dialog>
      {toast && (
        <div className="toast" role="status">
          <span>
            {toast.message}
            <small>No code changed. No claim submitted.</small>
          </span>
          <button
            onClick={() => {
              toast.undo();
              setToast(null);
            }}
          >
            Undo
          </button>
          <button
            aria-label="Dismiss notification"
            onClick={() => setToast(null)}
          >
            <Icon name="x" />
          </button>
        </div>
      )}
    </>
  );
}
