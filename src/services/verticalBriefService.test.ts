import { describe, expect, it } from "vitest";
import { accelerationLanes, executionDrag, payload, readinessBrief, riskMap, summary, verification } from "./verticalBriefService.js";

describe("board scaling readiness service", () => {
  it("returns the summary", () => {
    expect(summary().items).toBeGreaterThan(0);
  });

  it("returns the readiness brief", () => {
    expect(readinessBrief()[0]?.audience).toBeTruthy();
  });

  it("returns the execution drag view", () => {
    expect(executionDrag()[0]?.executionDragScore).toBeGreaterThan(0);
  });

  it("returns the acceleration lanes view", () => {
    expect(accelerationLanes()[0]?.addressableExpansionValueMillions).toBeGreaterThan(0);
  });

  it("returns the risk map", () => {
    expect(riskMap().length).toBeGreaterThan(0);
  });

  it("returns verification notes", () => {
    expect(verification()[0]).toContain("Synthetic");
  });

  it("keeps the headline in the payload sample", () => {
    expect(payload().sample[0]?.headline).toBeTruthy();
  });
});
