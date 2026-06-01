import type { BoardScalingReadinessReport } from "./types.js";

export function toSummary(report: BoardScalingReadinessReport) {
  return [
    `Readiness lanes: ${report.items}`,
    `Average expansion readiness: ${report.averageExpansionReadinessScore}`,
    `Average execution drag: ${report.averageExecutionDragScore}`,
    `Average owner confidence: ${report.averageOwnerConfidenceScore}`,
    `Average acceleration confidence: ${report.averageAccelerationConfidenceScore}`,
    `Average urgency: ${report.averageUrgencyScore}`,
    `Acceleration-ready lanes: ${report.accelerationReadyLanes}`,
    `Escalation lanes: ${report.escalationLanes}`,
    `Addressable expansion value ($M): ${report.addressableExpansionValueMillions}`,
    `High findings: ${report.findingsList.filter((item) => item.severity === "high").length}`
  ].join("\n");
}
