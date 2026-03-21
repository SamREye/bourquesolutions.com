import { describe, expect, it } from 'vitest';
import { assessmentSubmissionSchema } from '../lib/assessment/schema';

describe('assessment submission schema', () => {
  it('accepts a valid AI-adoption submission payload', () => {
    const parsed = assessmentSubmissionSchema.parse({
      sector: 'Professional services',
      location: { province: 'New Brunswick', city: 'Fredericton' },
      primaryBottleneck: 'customer-inquiries',
      frequency: 'daily',
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
      recommendedCategory: 'support',
      recommendedSolution: 'AI chatbot + inbox automation',
      severityBand: 'urgent-system-upgrade',
      contact: {
        name: 'Andre Bourque',
        email: 'andre@example.com',
      },
    });

    expect(parsed.contact.email).toBe('andre@example.com');
  });

  it('rejects legacy payload fields before Mongo persistence', () => {
    const parsed = assessmentSubmissionSchema.safeParse({
      sector: 'Professional services',
      location: { province: 'New Brunswick', city: 'Fredericton' },
      objective: 'revenue',
      performanceLevel: 'no',
      breakdownAnswer: 'no',
      impact: 'major',
      opportunity: 'definitely',
      strain: 'yes',
      urgency: 'now',
      auditFindings: [],
      recommendedScenario: 'visibility',
      recommendedSolution: 'SEO/content engine',
      contact: {
        name: 'Andre Bourque',
        email: 'andre@example.com',
      },
    });

    expect(parsed.success).toBe(false);
  });
});
