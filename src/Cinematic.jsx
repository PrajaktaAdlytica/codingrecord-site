import React, { useLayoutEffect, useRef } from "react";
import { modules } from "./data";
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
function Mark({ name = "arrow-right", size = 20 }) {
  return (
    <svg className="icon" width={size} height={size} aria-hidden="true">
      <use href={"/brand/icons/sprite.svg#" + name} />
    </svg>
  );
}

// One native-scroll render loop; all geometry is read before any style is written.
export function useCinematicMotion(path, motion) {
  useLayoutEffect(() => {
    const root = document.documentElement;
    const nodes = [
      ...document.querySelectorAll(
        ".hero,.route-scene,.manifesto,.dark-reading,.version-scene,.checkpoint,.case-scene,.modules-section,.light-section.section,.closing,.page-intro,.editorial-copy,.module-detail,.source-list,.gates,.persona-layout",
      ),
    ];
    let frame = 0;
    const update = () => {
      frame = 0;
      const h = innerHeight,
        wide = innerWidth > 1000;
      const measurements = nodes.map((el) => ({
        el,
        rect: el.getBoundingClientRect(),
      }));
      const light = document.getElementById("modules")?.getBoundingClientRect();
      const end = document.getElementById("closing")?.getBoundingClientRect();
      const deck = document.querySelector(".module-gallery");
      const track = deck?.querySelector(".module-track");
      const deckWidth = track
        ? Math.max(0, track.scrollWidth - deck.clientWidth)
        : 0;
      const home = path === "/" || path.startsWith("/home/");
      for (const { el, rect } of measurements) {
        const enter = motion ? clamp((h * 0.93 - rect.top) / (h * 0.7)) : 1;
        const progress = motion
          ? clamp(-rect.top / Math.max(1, rect.height - h))
          : 1;
        el.style.setProperty("--enter", enter.toFixed(4));
        el.style.setProperty("--travel", progress.toFixed(4));
        el.style.setProperty(
          "--flow",
          clamp((h - rect.top) / (h + rect.height)).toFixed(4),
        );
        if (el.classList.contains("route-scene"))
          el.style.setProperty(
            "--p",
            motion
              ? clamp(
                  (-rect.top + h * 0.16) / Math.max(1, rect.height - h * 0.75),
                )
              : 1,
          );
        if (el.id === "modules" && deck) {
          const p =
            motion && wide
              ? clamp((110 - rect.top) / Math.max(1, rect.height - h + 110))
              : 0;
          deck.style.setProperty("--deck-x", -p * deckWidth + "px");
          const index = Math.round(p * 4);
          deck.dataset.index = String(index);
          const output = el.querySelector("[data-module-count]");
          if (output && output.textContent !== "0" + (index + 1))
            output.textContent = "0" + (index + 1);
          deck
            .querySelectorAll(".module-slide")
            .forEach((card, i) => (card.dataset.active = String(i === index)));
        }
      }
      const day =
        home && light && end
          ? Math.min(
              clamp((h - light.top) / (h * 0.9)),
              clamp((end.top - h * 0.1) / (h * 0.8)),
            )
          : 0;
      root.style.setProperty("--daylight", day.toFixed(4));
      root.style.setProperty(
        "--camera",
        motion ? Math.min(scrollY * 0.035, 70) + "px" : "0px",
      );
      root.style.setProperty(
        "--overall",
        String(
          clamp(
            scrollY / Math.max(1, document.documentElement.scrollHeight - h),
          ),
        ),
      );
      root.dataset.scrolled = scrollY > 45 ? "true" : "false";
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    addEventListener("scroll", queue, { passive: true });
    addEventListener("resize", queue);
    const ro = new ResizeObserver(queue);
    ro.observe(document.getElementById("main"));
    update();
    return () => {
      removeEventListener("scroll", queue);
      removeEventListener("resize", queue);
      cancelAnimationFrame(frame);
      ro.disconnect();
      root.style.setProperty("--daylight", "0");
    };
  }, [path, motion]);
}

export function Manifesto() {
  const words = "Every claim has a code. Every code needs a source.".split(" ");
  return (
    <section
      className="manifesto"
      id="principle"
      aria-labelledby="principle-title"
    >
      <div className="manifesto-sticky">
        <div className="manifesto-meta mono">
          <span>THE PRINCIPLE</span>
          <span>01 / FOLLOW THE RECORD</span>
        </div>
        <h2
          id="principle-title"
          className="word-reveal"
          aria-label={words.join(" ")}
        >
          {words.map((word, i) => (
            <span key={i} aria-hidden="true" style={{ "--word": i }}>
              {word}{" "}
            </span>
          ))}
        </h2>
        <div className="manifesto-foot">
          <span className="manifesto-line" aria-hidden="true" />
          <p>
            And when the route breaks,
            <br />
            the uncertainty should stay visible.
          </p>
          <a href="#/home/workbench" className="text-link">
            Enter the workbench <Mark />
          </a>
        </div>
      </div>
    </section>
  );
}

export function ModuleIllustration({ index = 1 }) {
  return (
    <div
      className={"module-illustration illustration-" + index}
      aria-label="Illustrative synthetic workflow"
    >
      <div className="illustration-head mono">
        <span>DEMO / SYNTHETIC DATA</span>
        <Mark name={modules[index]?.icon || "file-text"} size={18} />
      </div>
      {index === 0 && (
        <div className="sample-queue">
          {[
            ["DEMO-CR-002", "Context incomplete", "Pending"],
            ["DEMO-CR-003", "Source unavailable", "Abstained"],
            ["DEMO-CR-004", "Scope clarification", "Pending"],
          ].map((r, i) => (
            <div key={r[0]} style={{ "--i": i }}>
              <span className="mono">{r[0]}</span>
              <strong>{r[1]}</strong>
              <small>
                {r[2]} <Mark name="arrow-up-right" size={14} />
              </small>
            </div>
          ))}
          <p className="mono">3 examples from the 10-record fixture</p>
        </div>
      )}
      {index === 1 && (
        <div className="sample-evidence">
          <div className="sample-note">
            <span className="mono">DEMO-NOTE-002 · 18 OCT 2026</span>
            <p>
              Reference A: <mark>context incomplete.</mark>
            </p>
            <p>Reference B: conflicting detail.</p>
          </div>
          <div className="sample-connector">
            <i />
            <Mark name="route" />
            <i />
          </div>
          <div className="sample-code">
            <span className="mono">CODE-A · FICTIONAL</span>
            <strong>Insufficient evidence</strong>
            <span>Coder B · review required</span>
          </div>
        </div>
      )}
      {index === 2 && (
        <div className="sample-versions">
          <div>
            <span className="mono">ILLUSTRATIVE vA</span>
            <strong>
              01 Jul<span>2026</span>
            </strong>
            <p>No conflict in fixture</p>
          </div>
          <Mark name="arrow-right" size={24} />
          <div>
            <span className="mono">ILLUSTRATIVE vB</span>
            <strong>
              01 Oct<span>2026</span>
            </strong>
            <p className="conflict-copy">Rule conflict in fixture</p>
          </div>
          <small>Same claim. Two different dated contexts.</small>
        </div>
      )}
      {index === 3 && (
        <div className="sample-draft">
          <span className="mono">ILLUSTRATIVE REVIEW THEMES</span>
          {[
            "Documentation context",
            "Source / version mismatch",
            "Unresolved reference",
          ].map((v, i) => (
            <div key={v}>
              <span className="mono">0{i + 1}</span>
              {v}
              <Mark name="chevron-down" size={16} />
            </div>
          ))}
          <p>
            <Mark name="file-text" /> Evidence draft <b>UNSENT</b>
          </p>
          <small>Proposed categories. No denial analysis performed.</small>
        </div>
      )}
      {index === 4 && (
        <div className="sample-report">
          <span className="mono">TEN-RECORD FIXTURE SNAPSHOT</span>
          {[
            ["Reviewed", 3],
            ["Unresolved", 0],
            ["Abstained", 2],
            ["Pending", 4],
            ["Rejected", 1],
          ].map(([s, n], i) => (
            <div key={s}>
              <span>{s}</span>
              <i style={{ "--bar": n / 4, "--i": i }} />
              <b className="mono">{n}</b>
            </div>
          ))}
          <small>Illustrative counts, not quality or performance.</small>
        </div>
      )}
      <div className="illustration-foot mono">
        CONCEPT PREVIEW <span>HUMAN REVIEW REQUIRED</span>
      </div>
    </div>
  );
}

export function ModuleGallery({ motion }) {
  const ref = useRef();
  const move = (i, behavior = "smooth") => {
    const section = ref.current;
    if (!section || innerWidth <= 1000 || !motion) return;
    const distance = section.offsetHeight - innerHeight + 110;
    const top = section.getBoundingClientRect().top + scrollY - 110;
    window.scrollTo({ top: top + (clamp(i, 0, 4) / 4) * distance, behavior });
  };
  return (
    <section
      className="modules-section module-sequence light-section"
      id="modules"
      ref={ref}
    >
      <div className="module-pin">
        <div className="module-heading">
          <div>
            <p className="eyebrow">06 / FIVE PROPOSED MODULES</p>
            <h2>
              One evidence layer.
              <br />
              <em>Five focused questions.</em>
            </h2>
          </div>
          <div className="module-paging">
            <span className="mono">
              <b data-module-count>01</b> / 05
            </span>
            <button
              aria-label="Previous module"
              onClick={() =>
                move(
                  Number(
                    ref.current.querySelector(".module-gallery").dataset
                      .index || 0,
                  ) - 1,
                )
              }
            >
              <Mark name="arrow-left" />
            </button>
            <button
              aria-label="Next module"
              onClick={() =>
                move(
                  Number(
                    ref.current.querySelector(".module-gallery").dataset
                      .index || 0,
                  ) + 1,
                )
              }
            >
              <Mark />
            </button>
            <a href="#/home/use-cases" className="mono">
              Skip gallery ↓
            </a>
          </div>
        </div>
        <div className="module-gallery" data-index="0">
          <div className="module-track">
            {modules.map((m, i) => (
              <article
                key={m.slug}
                className="module-slide"
                data-active={i === 0}
                style={{ "--index": i }}
              >
                <div className="module-slide-copy">
                  <span className="module-ordinal">{m.n}</span>
                  <p className="eyebrow">{m.tag}</p>
                  <h3>{m.name}</h3>
                  <p>{m.short}</p>
                  <a
                    href={"#/product/" + m.slug}
                    className="text-link"
                    onFocus={() => move(i, "instant")}
                  >
                    Explore this module <Mark name="arrow-up-right" />
                  </a>
                </div>
                <ModuleIllustration index={i} />
              </article>
            ))}
          </div>
        </div>
        <div className="module-caption mono">
          <span>SCROLL TO EXPLORE · EACH MODULE IS A SEPARATE TEST</span>
          <span>Proposed directions. No live integrations.</span>
        </div>
      </div>
    </section>
  );
}

export function PageArtwork({ kind, slug }) {
  const idx = Math.max(
    0,
    modules.findIndex((m) => m.slug === slug),
  );
  if (kind === "product")
    return (
      <div className="page-art page-art-module">
        <ModuleIllustration index={slug ? idx : 1} />
        <span className="art-caption mono">
          THE RECORD → THE EVIDENCE → THE HUMAN
        </span>
      </div>
    );
  if (kind === "evaluation" || kind === "pilot")
    return (
      <div className="page-art">
        <div className="protocol-sheet">
          <div className="mono">
            {kind === "pilot"
              ? "DESIGN SESSION / PROPOSED"
              : "SHADOW AUDIT / PROPOSED"}
          </div>
          <strong>
            01
            <span>
              specialty.
              <br />A bounded test.
            </span>
          </strong>
          {[
            "Define the baseline",
            "Confirm source rights",
            "Agree the review gate",
          ].map((x, i) => (
            <p key={x}>
              <span className="mono">0{i + 1}</span>
              {x}
              <span className="protocol-dot" />
            </p>
          ))}
          <div className="protocol-foot mono">
            HUMAN OVERSIGHT AT EVERY STEP
          </div>
        </div>
      </div>
    );
  if (kind === "about" || kind === "access")
    return (
      <div className="page-art register-art">
        <img
          src="/brand/logos/register-symbol-jade.svg"
          alt="The Register — CodingRecord"
        />
        <span className="mono">A ROUTE BACK TO THE RECORD.</span>
      </div>
    );
  if (kind === "research")
    return (
      <div className="page-art">
        <div className="research-folio">
          <span className="mono">RESEARCH NOTEBOOK / 25</span>
          <h3>
            Source.
            <br />
            Context.
            <br />
            <em>Question.</em>
          </h3>
          <div>
            <span>Formal rule base</span>
            <b>Established</b>
          </div>
          <div>
            <span>Differentiated demand</span>
            <b>Unproven</b>
          </div>
          <p className="mono">SOURCES ARE CONTEXT. NOT PERFORMANCE PROOF.</p>
        </div>
      </div>
    );
  if (kind === "solutions")
    return (
      <div className="page-art">
        <div className="roles-art">
          {["Revenue integrity", "Coding compliance", "Human coder"].map(
            (s, i) => (
              <div key={s} style={{ "--i": i }}>
                <Mark name="user" />
                <span>{s}</span>
                <small className="mono">
                  {["BUYER", "OVERSIGHT", "FINAL AUTHORITY"][i]}
                </small>
              </div>
            ),
          )}
        </div>
      </div>
    );
  return (
    <div className="page-art">
      <div className="boundary-art">
        <Mark name="ban" size={36} />
        <h3>
          The decision
          <br />
          stays human.
        </h3>
        <span className="mono">SOURCE · DATE · OWNER · SCOPE</span>
        <p>
          Traceable context.
          <br />
          Visible uncertainty.
        </p>
        <span className="status neutral">CONCEPT PREVIEW</span>
      </div>
    </div>
  );
}
