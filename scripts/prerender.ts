import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import {
  renderDocs,
  renderReadinessBrief,
  renderOverview,
  renderExecutionDrag,
  renderAccelerationLanes,
  renderVerification
} from "../src/services/render.js";
import {
  readinessBrief,
  accelerationLanes,
  payload,
  executionDrag,
  riskMap,
  summary,
  verification
} from "../src/services/verticalBriefService.js";

const root = path.resolve("site");
rmSync(root, { recursive: true, force: true });
mkdirSync(root, { recursive: true });

if (existsSync("CNAME")) {
  writeFileSync(path.join(root, "CNAME"), readFileSync("CNAME", "utf8").trim() + "\n");
}

const htmlRoutes = new Map<string, [string, string]>([
  ["/", ["index.html", renderOverview()]],
  ["/readiness-brief", ["readiness-brief/index.html", renderReadinessBrief()]],
  ["/execution-drag", ["execution-drag/index.html", renderExecutionDrag()]],
  ["/acceleration-lanes", ["acceleration-lanes/index.html", renderAccelerationLanes()]],
  ["/verification", ["verification/index.html", renderVerification()]],
  ["/docs", ["docs/index.html", renderDocs()]]
]);

for (const [, [target, html]] of htmlRoutes) {
  const filePath = path.join(root, target);
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, html);
}

writeFileSync(path.join(root, "robots.txt"), "User-agent: *\nAllow: /\nSitemap: https://scale.kineticgain.com/sitemap.xml\n");
writeFileSync(
  path.join(root, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://scale.kineticgain.com/</loc></url><url><loc>https://scale.kineticgain.com/readiness-brief/</loc></url><url><loc>https://scale.kineticgain.com/execution-drag/</loc></url><url><loc>https://scale.kineticgain.com/acceleration-lanes/</loc></url><url><loc>https://scale.kineticgain.com/verification/</loc></url><url><loc>https://scale.kineticgain.com/docs/</loc></url></urlset>`
);

const api = {
  "api/dashboard/summary.json": summary(),
  "api/readiness-brief.json": readinessBrief(),
  "api/execution-drag.json": executionDrag(),
  "api/acceleration-lanes.json": accelerationLanes(),
  "api/risk-map.json": riskMap(),
  "api/verification.json": verification(),
  "api/sample.json": payload().sample,
  "api/payload.json": payload()
};

for (const [target, data] of Object.entries(api)) {
  const filePath = path.join(root, target);
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, JSON.stringify(data, null, 2));
}
