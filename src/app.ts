import express from "express";
import {
  renderDocs,
  renderReadinessBrief,
  renderOverview,
  renderExecutionDrag,
  renderAccelerationLanes,
  renderVerification
} from "./services/render.js";
import {
  readinessBrief,
  accelerationLanes,
  payload,
  executionDrag,
  riskMap,
  summary,
  verification
} from "./services/verticalBriefService.js";

export function createApp() {
  const app = express();

  app.get("/", (_req, res) => res.type("html").send(renderOverview()));
  app.get("/readiness-brief", (_req, res) => res.type("html").send(renderReadinessBrief()));
  app.get("/execution-drag", (_req, res) => res.type("html").send(renderExecutionDrag()));
  app.get("/acceleration-lanes", (_req, res) => res.type("html").send(renderAccelerationLanes()));
  app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
  app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

  app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
  app.get("/api/readiness-brief", (_req, res) => res.json(readinessBrief()));
  app.get("/api/execution-drag", (_req, res) => res.json(executionDrag()));
  app.get("/api/acceleration-lanes", (_req, res) => res.json(accelerationLanes()));
  app.get("/api/risk-map", (_req, res) => res.json(riskMap()));
  app.get("/api/verification", (_req, res) => res.json(verification()));
  app.get("/api/sample", (_req, res) => res.json(payload().sample));
  app.get("/api/payload", (_req, res) => res.json(payload()));

  return app;
}

const port = Number(process.env.PORT || 4010);

if (process.env.NODE_ENV !== "test") {
  createApp().listen(port, () => {
    console.log(`board-scaling-readiness-brief listening on http://127.0.0.1:${port}`);
  });
}
