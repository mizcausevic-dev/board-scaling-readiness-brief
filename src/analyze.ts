import type {
  BoardScalingReadinessExport,
  BoardScalingReadinessItem,
  BoardScalingReadinessReport,
  Finding
} from "./types.js";

function average(items: BoardScalingReadinessItem[], pick: (item: BoardScalingReadinessItem) => number) {
  return Math.round(items.reduce((sum, item) => sum + pick(item), 0) / items.length);
}

function evaluate(item: BoardScalingReadinessItem): Finding[] {
  const findings: Finding[] = [];

  if (item.action === "ACCELERATE" && item.expansionReadinessScore >= 74 && item.executionDragScore <= 38 && item.accelerationConfidenceScore >= 78) {
    findings.push({
      code: "scale-ready",
      severity: "info",
      track: item.track,
      audience: item.audience,
      message: "This lane is ready for board-safe acceleration in the next planning cycle."
    });
  }

  if (item.executionDragScore >= 68) {
    findings.push({
      code: "drag-pocket",
      severity: item.executionDragScore >= 80 ? "high" : "medium",
      track: item.track,
      audience: item.audience,
      message: "Execution drag is still high enough that this lane will slow every new scaling motion."
    });
  }

  if (item.ownerConfidenceScore <= 64) {
    findings.push({
      code: "owner-readiness-gap",
      severity: item.ownerConfidenceScore <= 54 ? "high" : "medium",
      track: item.track,
      audience: item.audience,
      message: "Ownership confidence is still too weak to accelerate this lane safely."
    });
  }

  if (item.accelerationConfidenceScore < 70) {
    findings.push({
      code: "reinvestment-gap",
      severity: item.accelerationConfidenceScore < 60 ? "high" : "medium",
      track: item.track,
      audience: item.audience,
      message: "Leadership still lacks enough confidence to accelerate this lane without more proof."
    });
  }

  if (item.action === "ESCALATE") {
    findings.push({
      code: "escalation-needed",
      severity: "high",
      track: item.track,
      audience: item.audience,
      message: "This lane should be escalated before another acceleration claim reaches the board."
    });
  }

  return findings;
}

export function analyze(items: BoardScalingReadinessItem[], options: { now?: string } = {}): BoardScalingReadinessReport {
  const generatedAt = options.now ?? new Date().toISOString();
  const findingsList = items.flatMap((item) => evaluate(item));
  const accelerationReadyLanes = items.filter((item) => item.action === "ACCELERATE").length;
  const escalationLanes = items.filter((item) => item.action === "ESCALATE").length;
  const addressableExpansionValueMillions = Math.round(items.reduce((sum, item) => sum + item.addressableExpansionValueMillions, 0));

  return {
    generatedAt,
    items: items.length,
    averageExpansionReadinessScore: average(items, (item) => item.expansionReadinessScore),
    averageExecutionDragScore: average(items, (item) => item.executionDragScore),
    averageOwnerConfidenceScore: average(items, (item) => item.ownerConfidenceScore),
    averageAccelerationConfidenceScore: average(items, (item) => item.accelerationConfidenceScore),
    averageUrgencyScore: average(items, (item) => item.urgencyScore),
    accelerationReadyLanes,
    escalationLanes,
    addressableExpansionValueMillions,
    findingsList,
    ok: findingsList.filter((item) => item.severity === "high").length <= items.length
  };
}

export function toExport(items: BoardScalingReadinessItem[], now?: string): BoardScalingReadinessExport {
  return {
    generatedAt: now ?? new Date().toISOString(),
    items
  };
}
