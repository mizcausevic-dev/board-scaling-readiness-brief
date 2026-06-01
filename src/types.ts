export type ReadinessTrack =
  | "AI_PLATFORM"
  | "IDENTITY_SECURITY"
  | "REVENUE_SYSTEMS"
  | "FINTECH"
  | "BIOTECH_DIAGNOSTICS"
  | "PROCUREMENT_TRUST"
  | "PUBLIC_SECTOR";

export type ReadinessAction = "ACCELERATE" | "FORTIFY" | "HOLD" | "ESCALATE";

export interface BoardScalingReadinessItem {
  id: string;
  owner: string;
  audience: string;
  track: ReadinessTrack;
  action: ReadinessAction;
  readinessTheme: string;
  boardQuestion: string;
  currentPosture: string;
  requiredProof: string;
  expansionReadinessScore: number;
  executionDragScore: number;
  ownerConfidenceScore: number;
  accelerationConfidenceScore: number;
  urgencyScore: number;
  addressableExpansionValueMillions: number;
  headline: string;
  narrative: string;
  nextMove: string;
  companyTags: string[];
  relatedSurfaces: string[];
  requiredEvidence: string[];
}

export interface BoardScalingReadinessExport {
  generatedAt: string;
  items: BoardScalingReadinessItem[];
}

export type FindingCode =
  | "scale-ready"
  | "drag-pocket"
  | "owner-readiness-gap"
  | "reinvestment-gap"
  | "escalation-needed";

export interface Finding {
  code: FindingCode;
  severity: "high" | "medium" | "low" | "info";
  track: ReadinessTrack;
  audience: string;
  message: string;
}

export interface BoardScalingReadinessReport {
  generatedAt: string;
  items: number;
  averageExpansionReadinessScore: number;
  averageExecutionDragScore: number;
  averageOwnerConfidenceScore: number;
  averageAccelerationConfidenceScore: number;
  averageUrgencyScore: number;
  accelerationReadyLanes: number;
  escalationLanes: number;
  addressableExpansionValueMillions: number;
  findingsList: Finding[];
  ok: boolean;
}
