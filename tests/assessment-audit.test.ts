import { describe, expect, it, vi } from 'vitest';
import {
  auditWebsite,
  filterCredibleFindings,
  normalizeWebsiteUrl,
  resolveDomainFromSearch,
} from '../lib/assessment/audit';

describe('assessment audit helpers', () => {
  it('normalizes a bare domain into a valid origin', () => {
    expect(normalizeWebsiteUrl('bourquesolutions.com')).toBe('https://bourquesolutions.com');
  });

  it('falls back from DuckDuckGo to Bing for business-name lookup', async () => {
    const fetchMock = vi
      .fn()
      .mockRejectedValueOnce(new Error('ddg blocked'))
      .mockResolvedValueOnce(
        new Response(
          '<html><body><li class="b_algo"><a href="https://bourquesolutions.com/about">Bourque Solutions</a></li></body></html>',
          { status: 200 },
        ),
      );

    const result = await resolveDomainFromSearch(
      {
        businessName: 'Bourque Solutions',
        city: 'Fredericton',
        province: 'New Brunswick',
      },
      fetchMock as typeof fetch,
    );

    expect(result).toBe('https://bourquesolutions.com');
  });

  it('omits weak findings from the surfaced audit result', () => {
    const findings = filterCredibleFindings([
      {
        id: 'weak',
        category: 'engagement',
        label: 'Weak signal',
        detail: 'Low confidence finding.',
        severity: 'low',
        confidence: 'low',
      },
      {
        id: 'credible',
        category: 'response',
        label: 'Credible signal',
        detail: 'High confidence finding.',
        severity: 'medium',
        confidence: 'high',
      },
    ]);

    expect(findings).toHaveLength(1);
    expect(findings[0]?.id).toBe('credible');
  });

  it('returns low-confidence no-op output when no URL can be resolved', async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error('network'));
    const result = await auditWebsite(
      {
        businessName: 'Unknown Business',
        city: 'Moncton',
        province: 'New Brunswick',
      },
      fetchMock as typeof fetch,
    );

    expect(result.confidence).toBe('low');
    expect(result.findings).toEqual([]);
  });
});
