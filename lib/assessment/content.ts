import type {
  CategoryKey,
  PrimaryBottleneck,
  SolutionRecommendation,
} from './types';

export const provinceOptions = [
  'Alberta',
  'British Columbia',
  'Manitoba',
  'New Brunswick',
  'Newfoundland and Labrador',
  'Northwest Territories',
  'Nova Scotia',
  'Nunavut',
  'Ontario',
  'Prince Edward Island',
  'Quebec',
  'Saskatchewan',
  'Yukon',
] as const;

export const sectorOptions = [
  'Professional services',
  'Retail',
  'Hospitality',
  'Construction',
  'Health and wellness',
  'Manufacturing',
  'Trades',
  'E-commerce',
  'Non-profit or association',
  'Other',
] as const;

export const bottleneckLabels: Record<PrimaryBottleneck, string> = {
  'customer-inquiries': 'Responding to customer inquiries',
  'follow-ups': 'Following up with leads or customers',
  admin: 'Admin / data entry / bookkeeping',
  'content-marketing': 'Creating and managing content / marketing',
};

export const categoryLabels: Record<CategoryKey, string> = {
  support: 'Support bottleneck',
  sales: 'Sales follow-up bottleneck',
  operations: 'Operations bottleneck',
  marketing: 'Marketing workflow bottleneck',
};

export const categorySolutions: Record<CategoryKey, SolutionRecommendation> = {
  support: 'AI chatbot + inbox automation',
  sales: 'CRM + automated follow-ups',
  operations: 'AI bookkeeping/process automation',
  marketing: 'AI content + scheduling system',
};

export const categoryPrescriptions: Record<CategoryKey, string> = {
  support:
    'Implement an AI-powered chatbot and inbox workflow so incoming questions are answered, routed, and qualified faster.',
  sales:
    'Implement a CRM with automated follow-ups so leads and customers are not left waiting on manual outreach.',
  operations:
    'Implement AI-assisted bookkeeping and process automation to reduce repetitive admin work and free up operating capacity.',
  marketing:
    'Implement an AI content and scheduling system so marketing activity stays consistent without relying on manual effort every time.',
};
