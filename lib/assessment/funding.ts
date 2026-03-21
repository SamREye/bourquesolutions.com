import type { FundingMessage } from './types';

const CBDC_SOURCE_URL =
  'https://www.cbdc.ca/en/programs/cybersecure-new-brunswick';

export function normalizeProvinceName(province?: string) {
  return (province ?? '').trim().toLowerCase();
}

export function isNewBrunswick(province?: string) {
  const normalized = normalizeProvinceName(province);
  return normalized === 'new brunswick' || normalized === 'nb';
}

export function getFundingMessage(province?: string): FundingMessage {
  if (isNewBrunswick(province)) {
    return {
      eligible: true,
      title: 'Possible fit for CBDC CyberSecure NB funding',
      detail:
        'For eligible New Brunswick businesses, AI implementation projects such as chatbots, workflow automation, analytics, and operational AI tools may qualify for reimbursement of up to $3,000 through the CBDC CyberSecure NB program.',
      sourceUrl: CBDC_SOURCE_URL,
    };
  }

  return {
    eligible: false,
    title: 'Ask about regional funding options',
    detail:
      'Similar support may be available through regional digital adoption or AI adoption programs, which can reduce implementation risk.',
    sourceUrl: CBDC_SOURCE_URL,
  };
}
