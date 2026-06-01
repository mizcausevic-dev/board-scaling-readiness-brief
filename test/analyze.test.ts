import { describe, expect, it } from "vitest";
import { analyze } from "../src/analyze.js";
import { sampleBoardScalingReadinessBrief } from "../src/data/sampleVerticalBrief.js";

describe("analyze", () => {
  it("returns the expected item count", () => {
    const report = analyze(sampleBoardScalingReadinessBrief, { now: "2026-06-01T00:00:00Z" });
    expect(report.items).toBe(sampleBoardScalingReadinessBrief.length);
  });

  it("computes positive readiness metrics", () => {
    const report = analyze(sampleBoardScalingReadinessBrief, { now: "2026-06-01T00:00:00Z" });
    expect(report.averageExpansionReadinessScore).toBeGreaterThan(0);
    expect(report.averageAccelerationConfidenceScore).toBeGreaterThan(0);
  });

  it("counts acceleration-ready and escalation lanes", () => {
    const report = analyze(sampleBoardScalingReadinessBrief, { now: "2026-06-01T00:00:00Z" });
    expect(report.accelerationReadyLanes).toBeGreaterThan(0);
    expect(report.escalationLanes).toBeGreaterThanOrEqual(0);
  });

  it("emits findings", () => {
    const report = analyze(sampleBoardScalingReadinessBrief, { now: "2026-06-01T00:00:00Z" });
    expect(report.findingsList.length).toBeGreaterThan(0);
  });

  it("rolls up addressable expansion value", () => {
    const report = analyze(sampleBoardScalingReadinessBrief, { now: "2026-06-01T00:00:00Z" });
    expect(report.addressableExpansionValueMillions).toBeGreaterThan(0);
  });
});
