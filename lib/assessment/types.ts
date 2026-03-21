export type Province =
  | 'Alberta'
  | 'British Columbia'
  | 'Manitoba'
  | 'New Brunswick'
  | 'Newfoundland and Labrador'
  | 'Northwest Territories'
  | 'Nova Scotia'
  | 'Nunavut'
  | 'Ontario'
  | 'Prince Edward Island'
  | 'Quebec'
  | 'Saskatchewan'
  | 'Yukon';

export type PrimaryBottleneck =
  | 'customer-inquiries'
  | 'follow-ups'
  | 'admin'
  | 'content-marketing';
export type CategoryKey = 'support' | 'sales' | 'operations' | 'marketing';
export type FrequencyLevel = 'few-times-week' | 'daily' | 'many-times-day';
export type CurrentHandlingLevel = 'fully-manual' | 'some-tools' | 'mostly-automated';
export type ResponsivenessLevel = 'yes' | 'sometimes-delayed' | 'often-delayed';
export type MissedOpportunityLevel = 'no' | 'somewhat' | 'definitely';
export type ScalabilityLevel = 'yes' | 'maybe' | 'no';
export type TimePressureLevel = 'yes' | 'somewhat' | 'no';
export type AdoptionReadinessLevel = 'yes' | 'maybe' | 'no';
export type UrgencyLevel = 'now' | 'soon' | 'exploring';
export type SeverityBand = 'urgent-system-upgrade' | 'efficiency-improvement' | 'optimization';
export type SolutionRecommendation =
  | 'AI chatbot + inbox automation'
  | 'CRM + automated follow-ups'
  | 'AI bookkeeping/process automation'
  | 'AI content + scheduling system';

export type AuditFindingCategory = 'presence' | 'engagement' | 'response' | 'operations';
export type AuditConfidence = 'high' | 'medium' | 'low';

export interface LocationInput {
  province: string;
  city: string;
}

export interface AuditFinding {
  id: string;
  category: AuditFindingCategory;
  label: string;
  detail: string;
  severity: 'low' | 'medium' | 'high';
  confidence: AuditConfidence;
}

export interface AssessmentInput {
  sector: string;
  location: LocationInput;
  primaryBottleneck: PrimaryBottleneck;
  frequency: FrequencyLevel;
  currentHandling: CurrentHandlingLevel;
  responsiveness: ResponsivenessLevel;
  missedOpportunity: MissedOpportunityLevel;
  scalability: ScalabilityLevel;
  timePressure: TimePressureLevel;
  adoptionReadiness: AdoptionReadinessLevel;
  urgency: UrgencyLevel;
  websiteUrl?: string;
  businessName?: string;
  auditFindings: AuditFinding[];
}

export interface FundingMessage {
  eligible: boolean;
  title: string;
  detail: string;
  sourceUrl?: string;
}

export interface AssessmentResult {
  category: CategoryKey;
  categoryLabel: string;
  severityBand: SeverityBand;
  severityLabel: string;
  solution: SolutionRecommendation;
  diagnosis: string;
  prescription: string;
  impactBullets: string[];
  score: number;
  funding: FundingMessage;
  scopeBand: string;
  reimbursementText: string;
  enrichmentNote?: string;
}

export interface AssessmentContact {
  name: string;
  email: string;
  phone?: string;
  details?: string;
}

export interface AssessmentSubmission extends AssessmentInput {
  contact: AssessmentContact;
  recommendedCategory: CategoryKey;
  recommendedSolution: SolutionRecommendation;
  severityBand: SeverityBand;
  createdAt?: string;
}

export interface AuditRequestInput {
  websiteUrl?: string;
  businessName?: string;
  province?: string;
  city?: string;
  sector?: string;
}

export interface AuditResponse {
  resolvedDomain?: string;
  findings: AuditFinding[];
  summaryPromptInputs: string[];
  confidence: AuditConfidence;
}
