import {
  bottleneckLabels,
  categoryLabels,
  categoryPrescriptions,
  categorySolutions,
} from './content';
import { getFundingMessage } from './funding';
import type {
  AdoptionReadinessLevel,
  AssessmentInput,
  AssessmentResult,
  CategoryKey,
  CurrentHandlingLevel,
  FrequencyLevel,
  MissedOpportunityLevel,
  PrimaryBottleneck,
  ResponsivenessLevel,
  ScalabilityLevel,
  SeverityBand,
  TimePressureLevel,
  UrgencyLevel,
} from './types';

const bottleneckToCategory: Record<PrimaryBottleneck, CategoryKey> = {
  'customer-inquiries': 'support',
  'follow-ups': 'sales',
  admin: 'operations',
  'content-marketing': 'marketing',
};

const frequencyWeights: Record<FrequencyLevel, number> = {
  'few-times-week': 1,
  daily: 3,
  'many-times-day': 5,
};

const currentHandlingWeights: Record<CurrentHandlingLevel, number> = {
  'fully-manual': 5,
  'some-tools': 3,
  'mostly-automated': 0,
};

const responsivenessWeights: Record<ResponsivenessLevel, number> = {
  yes: 0,
  'sometimes-delayed': 2,
  'often-delayed': 4,
};

const missedOpportunityWeights: Record<MissedOpportunityLevel, number> = {
  no: 0,
  somewhat: 2,
  definitely: 4,
};

const scalabilityWeights: Record<ScalabilityLevel, number> = {
  yes: 0,
  maybe: 2,
  no: 4,
};

const timePressureWeights: Record<TimePressureLevel, number> = {
  no: 0,
  somewhat: 1,
  yes: 2,
};

const urgencyWeights: Record<UrgencyLevel, number> = {
  exploring: 0,
  soon: 1,
  now: 2,
};

function getReadinessLead(adoptionReadiness: AdoptionReadinessLevel, severityBand: SeverityBand) {
  if (adoptionReadiness === 'no') {
    return severityBand === 'optimization'
      ? 'Start with a low-risk pilot that proves time savings before broader rollout.'
      : 'Start with a simple, low-risk implementation plan that reduces pressure without overcomplicating adoption.';
  }

  if (adoptionReadiness === 'maybe') {
    return 'Start with a practical phased rollout so the team can see value quickly without a heavy lift.';
  }

  return 'This is a strong fit for implementation now, with a practical rollout that saves time quickly.';
}

function getCategory(primaryBottleneck: PrimaryBottleneck) {
  return bottleneckToCategory[primaryBottleneck];
}

export function scoreAssessment(input: AssessmentInput) {
  return (
    frequencyWeights[input.frequency] +
    currentHandlingWeights[input.currentHandling] +
    responsivenessWeights[input.responsiveness] +
    missedOpportunityWeights[input.missedOpportunity] +
    scalabilityWeights[input.scalability] +
    timePressureWeights[input.timePressure] +
    urgencyWeights[input.urgency]
  );
}

export function getSeverityBand(score: number): SeverityBand {
  if (score >= 14) {
    return 'urgent-system-upgrade';
  }

  if (score >= 8) {
    return 'efficiency-improvement';
  }

  return 'optimization';
}

function getSeverityLabel(severityBand: SeverityBand) {
  switch (severityBand) {
    case 'urgent-system-upgrade':
      return 'Urgent system upgrade';
    case 'efficiency-improvement':
      return 'Efficiency improvement';
    case 'optimization':
      return 'Optimization';
  }
}

function getDiagnosis(input: AssessmentInput, category: CategoryKey) {
  const bottleneck = bottleneckLabels[input.primaryBottleneck].toLowerCase();

  switch (category) {
    case 'support':
      return `You’re spending significant time ${bottleneck.toLowerCase()}, which is limiting your ability to respond quickly and capture all opportunities.`;
    case 'sales':
      return `You’re spending significant time ${bottleneck.toLowerCase()}, which is making follow-up slower and leaving revenue opportunities exposed.`;
    case 'operations':
      return `You’re spending significant time on ${bottleneck.toLowerCase()}, which is limiting operating capacity and slowing growth.`;
    case 'marketing':
      return `You’re spending significant time ${bottleneck.toLowerCase()}, which makes consistent outreach harder to sustain.`;
  }
}

function getImpactBullets(input: AssessmentInput, category: CategoryKey) {
  const bullets = new Set<string>();

  if (input.responsiveness !== 'yes') {
    bullets.add('Delayed responses');
  }

  if (input.missedOpportunity !== 'no') {
    bullets.add('Missed opportunities');
  }

  if (input.scalability !== 'yes') {
    bullets.add('Limited ability to scale');
  }

  if (input.currentHandling === 'fully-manual' || input.timePressure !== 'no') {
    bullets.add('Too much owner or team time spent on repeat work');
  }

  if (!bullets.size) {
    switch (category) {
      case 'support':
        bullets.add('Inconsistent customer response coverage');
        break;
      case 'sales':
        bullets.add('Slower follow-up across warm leads');
        break;
      case 'operations':
        bullets.add('Manual work taking time away from growth');
        break;
      case 'marketing':
        bullets.add('Inconsistent content and outreach execution');
        break;
    }
  }

  return [...bullets].slice(0, 3);
}

function getEnrichmentNote(input: AssessmentInput) {
  const finding = input.auditFindings[0];
  return finding?.detail;
}

export function getAssessmentResult(input: AssessmentInput): AssessmentResult {
  const category = getCategory(input.primaryBottleneck);
  const score = scoreAssessment(input);
  const severityBand = getSeverityBand(score);
  const funding = getFundingMessage(input.location.province);

  return {
    category,
    categoryLabel: categoryLabels[category],
    severityBand,
    severityLabel: getSeverityLabel(severityBand),
    solution: categorySolutions[category],
    diagnosis: getDiagnosis(input, category),
    prescription: `${categoryPrescriptions[category]} ${getReadinessLead(input.adoptionReadiness, severityBand)}`,
    impactBullets: getImpactBullets(input, category),
    score,
    funding,
    scopeBand: '2-4 week implementation, typically $2,000-$5,000',
    reimbursementText: funding.eligible
      ? 'Often partially or fully reimbursed for eligible New Brunswick businesses.'
      : 'Similar support may be available depending on your region.',
    enrichmentNote: getEnrichmentNote(input),
  };
}
