import { describe, expect, it } from 'vitest';
import { getAssessmentResult, getSeverityBand, scoreAssessment } from '../lib/assessment/engine';
import type { AssessmentInput } from '../lib/assessment/types';

function createAssessment(overrides: Partial<AssessmentInput> = {}): AssessmentInput {
  return {
    sector: 'Professional services',
    location: {
      province: 'New Brunswick',
      city: 'Fredericton',
    },
    primaryBottleneck: 'customer-inquiries',
    frequency: 'many-times-day',
    currentHandling: 'fully-manual',
    responsiveness: 'often-delayed',
    missedOpportunity: 'definitely',
    scalability: 'no',
    timePressure: 'yes',
    adoptionReadiness: 'yes',
    urgency: 'now',
    websiteUrl: 'https://bourquesolutions.com',
    businessName: 'Bourque Solutions',
    auditFindings: [],
    ...overrides,
  };
}

describe('assessment engine', () => {
  it('returns chatbot and inbox automation for support bottlenecks', () => {
    const result = getAssessmentResult(createAssessment({ primaryBottleneck: 'customer-inquiries' }));

    expect(result.category).toBe('support');
    expect(result.solution).toBe('AI chatbot + inbox automation');
  });

  it('returns CRM automation for sales follow-up bottlenecks', () => {
    const result = getAssessmentResult(createAssessment({ primaryBottleneck: 'follow-ups' }));

    expect(result.category).toBe('sales');
    expect(result.solution).toBe('CRM + automated follow-ups');
  });

  it('returns process automation for operations bottlenecks', () => {
    const result = getAssessmentResult(createAssessment({ primaryBottleneck: 'admin' }));

    expect(result.category).toBe('operations');
    expect(result.solution).toBe('AI bookkeeping/process automation');
  });

  it('returns content system recommendation for marketing bottlenecks', () => {
    const result = getAssessmentResult(createAssessment({ primaryBottleneck: 'content-marketing' }));

    expect(result.category).toBe('marketing');
    expect(result.solution).toBe('AI content + scheduling system');
  });

  it('maps high, medium, and low severity from the weighted inputs', () => {
    const highScore = scoreAssessment(createAssessment());
    const mediumScore = scoreAssessment(
      createAssessment({
        frequency: 'daily',
        currentHandling: 'some-tools',
        responsiveness: 'sometimes-delayed',
        missedOpportunity: 'no',
        scalability: 'maybe',
        timePressure: 'somewhat',
        urgency: 'soon',
      }),
    );
    const lowScore = scoreAssessment(
      createAssessment({
        frequency: 'few-times-week',
        currentHandling: 'mostly-automated',
        responsiveness: 'yes',
        missedOpportunity: 'no',
        scalability: 'yes',
        timePressure: 'no',
        urgency: 'exploring',
      }),
    );

    expect(getSeverityBand(highScore)).toBe('urgent-system-upgrade');
    expect(getSeverityBand(mediumScore)).toBe('efficiency-improvement');
    expect(getSeverityBand(lowScore)).toBe('optimization');
  });

  it('always returns a single recommendation and enrichment does not change it', () => {
    const base = createAssessment({
      primaryBottleneck: 'follow-ups',
      auditFindings: [],
    });
    const enriched = createAssessment({
      primaryBottleneck: 'follow-ups',
      auditFindings: [
        {
          id: 'next-step',
          category: 'response',
          label: 'The next step for customers is not obvious',
          detail: 'We did not find a clear contact or booking path on the homepage.',
          severity: 'high',
          confidence: 'high',
        },
      ],
    });

    expect(getAssessmentResult(base).solution).toBe('CRM + automated follow-ups');
    expect(getAssessmentResult(enriched).solution).toBe('CRM + automated follow-ups');
  });

  it('uses AI implementation funding copy for NB businesses and softer copy elsewhere', () => {
    const nbResult = getAssessmentResult(createAssessment({ location: { province: 'New Brunswick', city: 'Moncton' } }));
    const onResult = getAssessmentResult(createAssessment({ location: { province: 'Ontario', city: 'Ottawa' } }));

    expect(nbResult.funding.eligible).toBe(true);
    expect(nbResult.funding.detail).toContain('AI implementation projects');
    expect(onResult.funding.eligible).toBe(false);
    expect(onResult.funding.detail).toContain('AI adoption programs');
  });
});
