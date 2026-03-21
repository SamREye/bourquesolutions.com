import { z } from 'zod';

const auditFindingSchema = z.object({
  id: z.string(),
  category: z.enum(['presence', 'engagement', 'response', 'operations']),
  label: z.string(),
  detail: z.string(),
  severity: z.enum(['low', 'medium', 'high']),
  confidence: z.enum(['high', 'medium', 'low']),
});

export const auditRequestSchema = z.object({
  websiteUrl: z.string().trim().optional(),
  businessName: z.string().trim().optional(),
  province: z.string().trim().optional(),
  city: z.string().trim().optional(),
  sector: z.string().trim().optional(),
});

export const assessmentInputSchema = z.object({
  sector: z.string().min(1),
  location: z.object({
    province: z.string().min(1),
    city: z.string().min(1),
  }),
  primaryBottleneck: z.enum(['customer-inquiries', 'follow-ups', 'admin', 'content-marketing']),
  frequency: z.enum(['few-times-week', 'daily', 'many-times-day']),
  currentHandling: z.enum(['fully-manual', 'some-tools', 'mostly-automated']),
  responsiveness: z.enum(['yes', 'sometimes-delayed', 'often-delayed']),
  missedOpportunity: z.enum(['no', 'somewhat', 'definitely']),
  scalability: z.enum(['yes', 'maybe', 'no']),
  timePressure: z.enum(['yes', 'somewhat', 'no']),
  adoptionReadiness: z.enum(['yes', 'maybe', 'no']),
  urgency: z.enum(['now', 'soon', 'exploring']),
  websiteUrl: z.string().trim().optional(),
  businessName: z.string().trim().optional(),
  auditFindings: z.array(auditFindingSchema),
});

export const assessmentSubmissionSchema = assessmentInputSchema.extend({
  recommendedCategory: z.enum(['support', 'sales', 'operations', 'marketing']),
  recommendedSolution: z.enum([
    'AI chatbot + inbox automation',
    'CRM + automated follow-ups',
    'AI bookkeeping/process automation',
    'AI content + scheduling system',
  ]),
  severityBand: z.enum(['urgent-system-upgrade', 'efficiency-improvement', 'optimization']),
  contact: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().trim().optional(),
    details: z.string().trim().optional(),
  }),
  createdAt: z.string().datetime().optional(),
});

export type AssessmentSubmissionPayload = z.infer<typeof assessmentSubmissionSchema>;
