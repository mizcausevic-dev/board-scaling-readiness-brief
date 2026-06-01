# Architecture

Board Scaling Readiness Brief is a static-friendly TypeScript executive-intelligence surface for showing where leadership is genuinely ready to scale, where execution drag still remains, and which owners can absorb more acceleration safely.

## Core flow

- `src/data/sampleVerticalBrief.ts` models scaling-readiness lanes across AI, identity, revenue, FinTech, biotech, procurement, and public-sector readiness.
- `src/analyze.ts` scores expansion readiness, execution drag, owner confidence, acceleration confidence, urgency, and addressable expansion value while generating readiness findings.
- `src/services/verticalBriefService.ts` exposes the readiness-brief, execution-drag, acceleration-lanes, and risk-map packets used by both the app and prerender step.
- `src/services/render.ts` turns those packets into board-readable HTML routes plus a sample export.
- `scripts/prerender.ts` produces the static site and JSON payloads for GitHub Pages.

## Output shape

Each lane is designed to answer the same executive questions:

- where is scaling genuinely ready now
- where is drag still open
- which owners are actually ready to scale
- which story can survive the next board or diligence room

## Guardrails

- synthetic data only
- read-only public surface
- no tenant credentials or private documents
- no compliance overclaim language
