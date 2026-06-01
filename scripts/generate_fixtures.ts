import { toExport } from "../src/analyze.js";
import { sampleBoardScalingReadinessBrief } from "../src/data/sampleVerticalBrief.js";
import { writeFileSync } from "node:fs";

const clean = sampleBoardScalingReadinessBrief.map((item) => ({
  ...item,
  relatedSurfaces: [...item.relatedSurfaces].sort(),
  requiredEvidence: [...item.requiredEvidence].sort(),
  companyTags: [...item.companyTags].sort()
}));

writeFileSync("fixtures/board-scaling-readiness-brief.json", JSON.stringify(toExport(sampleBoardScalingReadinessBrief), null, 2));

writeFileSync("fixtures/board-scaling-readiness-brief-clean.json", JSON.stringify(toExport(clean), null, 2));
