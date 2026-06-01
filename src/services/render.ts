import {
  accelerationLanes,
  executionDrag,
  payload,
  readinessBrief,
  riskMap,
  summary,
  verification
} from "./verticalBriefService.js";

const productTitle = "Board Scaling Readiness Brief";
const domain = "https://scale.kineticgain.com";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function shell(title: string, path: string, body: string, description: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)} · Kinetic Gain</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <style>
      :root {
        color-scheme: dark;
        --bg: #07111d;
        --panel: #0d1a2b;
        --panel-2: #102032;
        --border: rgba(103, 224, 190, 0.22);
        --text: #edf2ff;
        --muted: #9fb0cf;
        --accent: #67e0be;
        --accent-2: #7dc4ff;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: "Segoe UI", system-ui, sans-serif;
        background:
          radial-gradient(circle at top left, rgba(125, 196, 255, 0.12), transparent 30%),
          linear-gradient(180deg, #050c16 0%, var(--bg) 100%);
        color: var(--text);
      }
      a { color: var(--accent-2); text-decoration: none; }
      .wrap { max-width: 1180px; margin: 0 auto; padding: 32px 24px 64px; }
      .hero, .section {
        background: linear-gradient(180deg, rgba(14, 28, 45, 0.95), rgba(10, 19, 33, 0.98));
        border: 1px solid var(--border);
        border-radius: 28px;
        padding: 28px;
        box-shadow: 0 18px 60px rgba(2, 7, 16, 0.35);
      }
      .hero { margin-bottom: 24px; }
      .eyebrow {
        display: inline-block;
        padding: 10px 16px;
        border-radius: 999px;
        border: 1px solid var(--border);
        background: rgba(103, 224, 190, 0.08);
        color: var(--accent);
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.28em;
      }
      h1, h2 { margin: 18px 0 12px; font-family: Georgia, serif; line-height: 0.95; }
      h1 { font-size: clamp(56px, 8vw, 92px); max-width: 980px; }
      h2 { font-size: clamp(36px, 4vw, 54px); }
      .lede { color: var(--muted); font-size: 20px; line-height: 1.6; max-width: 920px; }
      .nav { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 22px; }
      .nav a {
        padding: 10px 14px;
        border: 1px solid rgba(125, 196, 255, 0.18);
        border-radius: 999px;
        color: var(--muted);
      }
      .nav a.active { color: var(--text); border-color: var(--accent); background: rgba(103, 224, 190, 0.08); }
      .metrics, .grid {
        display: grid;
        gap: 18px;
      }
      .metrics { grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); margin-top: 26px; }
      .metric, .card, .table-wrap {
        background: rgba(16, 32, 50, 0.76);
        border: 1px solid rgba(125, 196, 255, 0.12);
        border-radius: 22px;
        padding: 18px;
      }
      .metric-label, .chip {
        color: var(--accent);
        text-transform: uppercase;
        letter-spacing: 0.18em;
        font-size: 12px;
      }
      .metric-value { display: block; font-size: 40px; font-weight: 700; margin-top: 10px; }
      .metric-copy { margin-top: 10px; color: var(--muted); line-height: 1.5; }
      .section { margin-top: 24px; }
      .grid { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
      .card h3 { margin: 12px 0 10px; font-size: 30px; line-height: 1.05; }
      .card p, li { color: var(--muted); line-height: 1.6; }
      .table-wrap { overflow-x: auto; }
      table { width: 100%; border-collapse: collapse; }
      th, td { text-align: left; padding: 12px; border-bottom: 1px solid rgba(125, 196, 255, 0.12); vertical-align: top; }
      th { color: var(--accent); font-size: 12px; text-transform: uppercase; letter-spacing: 0.18em; }
      ul { padding-left: 20px; }
      pre {
        white-space: pre-wrap;
        overflow-wrap: anywhere;
        color: var(--muted);
        background: rgba(7, 17, 29, 0.75);
        border: 1px solid rgba(125, 196, 255, 0.12);
        border-radius: 18px;
        padding: 18px;
      }
      .footer {
        margin-top: 24px;
        color: var(--muted);
        font-size: 14px;
        display: flex;
        gap: 18px;
        flex-wrap: wrap;
      }
    </style>
  </head>
  <body>
    <div class="wrap">
      ${body}
      <div class="footer">
        <span>${productTitle}</span>
        <a href="${domain}">${domain.replace("https://", "")}</a>
        <a href="https://github.com/mizcausevic-dev/">GitHub</a>
        <a href="https://www.linkedin.com/in/mirzacausevic/">LinkedIn</a>
        <a href="https://kineticgain.com/">Kinetic Gain</a>
      </div>
    </div>
  </body>
</html>`;
}

function navLinks(path: string) {
  return [
    ["/", "Overview"],
    ["/readiness-brief", "Readiness brief"],
    ["/execution-drag", "Execution drag"],
    ["/acceleration-lanes", "Acceleration lanes"],
    ["/verification", "Verification"],
    ["/docs", "Docs"]
  ]
    .map(([href, label]) => {
      const active = href === path ? ' class="active"' : "";
      return `<a${active} href="${href}">${label}</a>`;
    })
    .join("");
}

export function renderOverview() {
  const executiveSummary = summary();
  const lanes = readinessBrief().slice(0, 4);
  const findings = riskMap().slice(0, 5);
  const cards = lanes
    .map(
      (item) => `<article class="card">
        <div class="chip">${escapeHtml(item.action)}</div>
        <h3>${escapeHtml(item.owner)}</h3>
        <p><strong>Audience:</strong> ${escapeHtml(item.audience)}</p>
        <p><strong>Theme:</strong> ${escapeHtml(item.readinessTheme)}</p>
        <p><strong>Readiness score:</strong> ${item.expansionReadinessScore}</p>
      </article>`
    )
    .join("");

  const risks = findings
    .map((item) => `<li><strong>${escapeHtml(item.severity.toUpperCase())}</strong> · ${escapeHtml(item.message)}</li>`)
    .join("");

  return shell(
    productTitle,
    "/",
    `<section class="hero">
      <span class="eyebrow">Scaling readiness</span>
      <h1>Which lanes are ready to scale now, where is execution drag still sitting, and what can the board accelerate safely next?</h1>
      <p class="lede">Board Scaling Readiness Brief turns AI, identity, revenue, FinTech, biotech, procurement, and public-sector complexity into one board-readable readiness packet for acceleration decisions and unresolved drag.</p>
      <div class="nav">${navLinks("/")}</div>
      <div class="metrics">
        <div class="metric"><span class="metric-label">Readiness lanes</span><span class="metric-value">${executiveSummary.items}</span><div class="metric-copy">Modeled lanes in the current scaling-readiness brief.</div></div>
        <div class="metric"><span class="metric-label">Readiness score</span><span class="metric-value">${executiveSummary.averageExpansionReadinessScore}</span><div class="metric-copy">Average expansion readiness across the current operating packet.</div></div>
        <div class="metric"><span class="metric-label">Acceleration-ready lanes</span><span class="metric-value">${executiveSummary.accelerationReadyLanes}</span><div class="metric-copy">Lanes that can accelerate without another board-safe delay cycle.</div></div>
        <div class="metric"><span class="metric-label">Expansion value</span><span class="metric-value">$${executiveSummary.addressableExpansionValueMillions}M</span><div class="metric-copy">Modeled addressable expansion value across the current packet.</div></div>
      </div>
    </section>
    <section class="section">
      <h2>Readiness brief</h2>
      <div class="grid">${cards}</div>
    </section>
    <section class="section">
      <h2>Proof findings</h2>
      <ul>${risks}</ul>
    </section>`,
    "Board-ready surface for scaling readiness, execution drag, owner confidence, and acceleration safety across the executive estate."
  );
}

export function renderReadinessBrief() {
  const rows = readinessBrief()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.owner)}</td>
        <td>${escapeHtml(item.audience)}</td>
        <td>${escapeHtml(item.action)}</td>
        <td>${escapeHtml(item.readinessTheme)}</td>
        <td>${item.expansionReadinessScore}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Readiness brief",
    "/readiness-brief",
    `<section class="hero">
      <span class="eyebrow">Readiness brief</span>
      <h1>Every scaling claim stays tied to one audience, one readiness theme, and one board-safe next move.</h1>
      <p class="lede">The readiness brief keeps acceleration posture readable instead of scattering it across disconnected operating updates.</p>
      <div class="nav">${navLinks("/readiness-brief")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Owner</th><th>Audience</th><th>Action</th><th>Theme</th><th>Readiness score</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>`,
    "Scaling-readiness view showing actions, themes, and expansion readiness scores."
  );
}

export function renderExecutionDrag() {
  const rows = executionDrag()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.owner)}</td>
        <td>${escapeHtml(item.audience)}</td>
        <td>${item.executionDragScore}</td>
        <td>${item.ownerConfidenceScore}</td>
        <td>${item.accelerationConfidenceScore}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Execution drag",
    "/execution-drag",
    `<section class="hero">
      <span class="eyebrow">Execution drag</span>
      <h1>See where drag is still heavy, owner confidence is still thin, and acceleration proof is still weak.</h1>
      <p class="lede">This view makes it obvious which readiness stories are acceleration-safe and which ones still carry too much execution drag.</p>
      <div class="nav">${navLinks("/execution-drag")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Owner</th><th>Audience</th><th>Execution drag</th><th>Owner confidence</th><th>Acceleration confidence</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>`,
    "Execution-drag view for owner confidence and acceleration proof gaps."
  );
}

export function renderAccelerationLanes() {
  const rows = accelerationLanes()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.owner)}</td>
        <td>${escapeHtml(item.audience)}</td>
        <td>${escapeHtml(item.action)}</td>
        <td>$${item.addressableExpansionValueMillions}M</td>
        <td>${item.expansionReadinessScore}</td>
        <td>${escapeHtml(item.companyTags.join(", "))}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Acceleration lanes",
    "/acceleration-lanes",
    `<section class="hero">
      <span class="eyebrow">Acceleration lanes</span>
      <h1>Acceleration motions, addressable value, and readiness strength stay connected to named owners.</h1>
      <p class="lede">The board needs to see which lanes are worth accelerating next, not just which ideas once sounded scalable.</p>
      <div class="nav">${navLinks("/acceleration-lanes")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Owner</th><th>Audience</th><th>Action</th><th>Expansion value</th><th>Readiness score</th><th>Company tags</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>`,
    "Acceleration-lane view for addressable expansion value and board-safe readiness strength."
  );
}

export function renderVerification() {
  const notes = verification().map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  return shell(
    "Verification",
    "/verification",
    `<section class="hero">
      <span class="eyebrow">Verification</span>
      <h1>How this scaling-readiness packet is modeled and what it is safe to infer from it.</h1>
      <p class="lede">This route keeps the synthetic nature, readiness boundaries, and reproducibility notes visible before anyone treats the sample as live board evidence.</p>
      <div class="nav">${navLinks("/verification")}</div>
    </section>
    <section class="section">
      <ul>${notes}</ul>
    </section>`,
    "Verification notes for the Board Scaling Readiness Brief sample and modeled outputs."
  );
}

export function renderDocs() {
  return shell(
    "Docs",
    "/docs",
    `<section class="hero">
      <span class="eyebrow">Docs</span>
      <h1>Board Scaling Readiness Brief docs</h1>
      <p class="lede">This surface packages board-readable scaling readiness into reproducible routes and JSON outputs.</p>
      <div class="nav">${navLinks("/docs")}</div>
    </section>
    <section class="section">
      <ul>
        <li><code>/readiness-brief</code> keeps readiness themes, actions, and next moves readable.</li>
        <li><code>/execution-drag</code> compares drag pressure, owner confidence, and acceleration confidence.</li>
        <li><code>/acceleration-lanes</code> shows which named owners can scale addressable expansion next.</li>
        <li><code>/api/payload</code> exposes the reproducible scaling-readiness packet.</li>
      </ul>
      <pre>${escapeHtml(JSON.stringify(payload(), null, 2))}</pre>
    </section>`,
    "Product documentation for Board Scaling Readiness Brief and its board-ready routes."
  );
}
