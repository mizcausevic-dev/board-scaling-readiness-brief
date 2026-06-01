import { analyze } from "../analyze.js";
import { sampleBoardScalingReadinessBrief } from "../data/sampleVerticalBrief.js";

const report = analyze(sampleBoardScalingReadinessBrief, { now: "2026-06-01T00:00:00Z" });

export function summary() {
  const highFindings = report.findingsList.filter((item) => item.severity === "high").length;
  return {
    items: report.items,
    averageExpansionReadinessScore: report.averageExpansionReadinessScore,
    averageExecutionDragScore: report.averageExecutionDragScore,
    averageOwnerConfidenceScore: report.averageOwnerConfidenceScore,
    averageAccelerationConfidenceScore: report.averageAccelerationConfidenceScore,
    averageUrgencyScore: report.averageUrgencyScore,
    accelerationReadyLanes: report.accelerationReadyLanes,
    escalationLanes: report.escalationLanes,
    addressableExpansionValueMillions: report.addressableExpansionValueMillions,
    highFindings,
    recommendation:
      "Accelerate procurement and AI rollout, hold revenue until throughput firms up, fortify identity and biotech readiness, and escalate FinTech drag before another board scaling ask."
  };
}

export function readinessBrief() {
  return sampleBoardScalingReadinessBrief.map((item) => ({
    owner: item.owner,
    audience: item.audience,
    action: item.action,
    readinessTheme: item.readinessTheme,
    expansionReadinessScore: item.expansionReadinessScore,
    nextMove: item.nextMove
  }));
}

export function executionDrag() {
  return sampleBoardScalingReadinessBrief.map((item) => ({
    owner: item.owner,
    audience: item.audience,
    executionDragScore: item.executionDragScore,
    ownerConfidenceScore: item.ownerConfidenceScore,
    accelerationConfidenceScore: item.accelerationConfidenceScore,
    requiredEvidence: item.requiredEvidence
  }));
}

export function accelerationLanes() {
  return sampleBoardScalingReadinessBrief.map((item) => ({
    owner: item.owner,
    audience: item.audience,
    action: item.action,
    addressableExpansionValueMillions: item.addressableExpansionValueMillions,
    expansionReadinessScore: item.expansionReadinessScore,
    companyTags: item.companyTags
  }));
}

export function riskMap() {
  const order = { high: 0, medium: 1, low: 2, info: 3 } as const;
  return [...report.findingsList].sort((a, b) => order[a.severity] - order[b.severity] || a.code.localeCompare(b.code));
}

export function verification() {
  return [
    "Synthetic scaling-readiness data only - no live board packets, budgets, or actual expansion approvals are included.",
    "Readiness, drag, owner confidence, acceleration confidence, urgency, and addressable expansion value metrics are modeled from the sample executive-intelligence estate in this repo.",
    "This surface is read-only and shows how Kinetic Gain can package board-readable scaling readiness into one decision layer.",
    "Company tags and track labels are synthetic design aids rather than audited market or financial signals.",
    "Every route and packet is reproducible from the included sample export."
  ];
}

export function payload() {
  return {
    generatedAt: report.generatedAt,
    summary: summary(),
    readinessBrief: readinessBrief(),
    executionDrag: executionDrag(),
    accelerationLanes: accelerationLanes(),
    riskMap: riskMap(),
    verification: verification(),
    sample: sampleBoardScalingReadinessBrief
  };
}
