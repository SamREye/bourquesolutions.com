import type { AuditFinding, AuditRequestInput, AuditResponse } from './types';

type FetchLike = typeof fetch;

const REQUEST_HEADERS = {
  'user-agent':
    'Mozilla/5.0 (compatible; BourqueSolutionsAssessmentBot/1.0; +https://bourquesolutions.com)',
};

const EXCLUDED_SEARCH_HOSTS = new Set([
  'duckduckgo.com',
  'www.duckduckgo.com',
  'bing.com',
  'www.bing.com',
  'microsoft.com',
  'facebook.com',
  'www.facebook.com',
  'instagram.com',
  'www.instagram.com',
  'linkedin.com',
  'www.linkedin.com',
  'youtube.com',
  'www.youtube.com',
  'x.com',
  'twitter.com',
  'maps.apple.com',
  'maps.google.com',
]);

function createFinding(finding: AuditFinding): AuditFinding {
  return finding;
}

export function normalizeWebsiteUrl(value?: string) {
  if (!value?.trim()) {
    return null;
  }

  const raw = value.trim();
  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;

  try {
    const url = new URL(withProtocol);
    return url.origin;
  } catch {
    return null;
  }
}

async function fetchText(url: string, fetchImpl: FetchLike, timeoutMs = 8000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetchImpl(url, {
      headers: REQUEST_HEADERS,
      redirect: 'follow',
      signal: controller.signal,
    });

    return response;
  } finally {
    clearTimeout(timeout);
  }
}

function decodeSearchUrl(rawHref: string) {
  try {
    const url = new URL(rawHref, 'https://html.duckduckgo.com');
    const redirected = url.searchParams.get('uddg');
    return redirected ? decodeURIComponent(redirected) : url.toString();
  } catch {
    return rawHref;
  }
}

function pickLikelyWebsite(urls: string[], businessName: string) {
  const tokens = businessName
    .toLowerCase()
    .split(/[^a-z0-9]+/i)
    .filter((token) => token.length > 2);

  const candidates = urls
    .map((value) => {
      try {
        const url = new URL(value);
        const host = url.hostname.replace(/^www\./, '');

        if (EXCLUDED_SEARCH_HOSTS.has(host)) {
          return null;
        }

        let score = 0;

        for (const token of tokens) {
          if (host.includes(token)) {
            score += 2;
          }

          if (url.pathname.toLowerCase().includes(token)) {
            score += 1;
          }
        }

        if (host.endsWith('.ca')) {
          score += 1;
        }

        return { value: url.origin, score };
      } catch {
        return null;
      }
    })
    .filter((candidate): candidate is { value: string; score: number } => Boolean(candidate))
    .sort((left, right) => right.score - left.score);

  return candidates[0]?.score ? candidates[0]?.value : null;
}

export function extractCandidateUrlsFromDuckDuckGo(html: string) {
  const matches = [...html.matchAll(/href="([^"]+)"/g)];

  return matches
    .map((match) => decodeSearchUrl(match[1]))
    .filter((href) => href.startsWith('http'));
}

export function extractCandidateUrlsFromBing(html: string) {
  return [...html.matchAll(/<a[^>]+href="(https?:\/\/[^"]+)"/g)].map((match) => match[1]);
}

export async function resolveDomainFromSearch(
  input: Pick<AuditRequestInput, 'businessName' | 'city' | 'province'>,
  fetchImpl: FetchLike = fetch,
) {
  if (!input.businessName?.trim()) {
    return null;
  }

  const query = [input.businessName, input.city, input.province].filter(Boolean).join(' ');

  try {
    const ddgUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
    const ddgResponse = await fetchText(ddgUrl, fetchImpl, 6000);
    const ddgHtml = await ddgResponse.text();
    const ddgMatch = pickLikelyWebsite(extractCandidateUrlsFromDuckDuckGo(ddgHtml), input.businessName);

    if (ddgMatch) {
      return ddgMatch;
    }
  } catch {
    // Fall through to Bing.
  }

  try {
    const bingUrl = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
    const bingResponse = await fetchText(bingUrl, fetchImpl, 6000);
    const bingHtml = await bingResponse.text();
    return pickLikelyWebsite(extractCandidateUrlsFromBing(bingHtml), input.businessName);
  } catch {
    return null;
  }
}

function extractTitle(html: string) {
  return html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.replace(/\s+/g, ' ').trim() ?? '';
}

function extractMetaDescription(html: string) {
  const direct =
    html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)?.[1] ??
    html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i)?.[1];

  return direct?.trim() ?? '';
}

function extractLatestDate(html: string) {
  const candidates = new Set<string>();

  for (const match of html.matchAll(
    /\b(20\d{2}-\d{2}-\d{2}|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)[a-z]*\s+\d{1,2},\s+20\d{2})\b/gi,
  )) {
    candidates.add(match[1]);
  }

  const parsed = [...candidates]
    .map((value) => new Date(value))
    .filter((date) => !Number.isNaN(date.getTime()))
    .sort((left, right) => right.getTime() - left.getTime());

  return parsed[0];
}

function extractSocialLinks(html: string) {
  return [...html.matchAll(/href=["']([^"']+)["']/gi)]
    .map((match) => match[1])
    .filter(
      (value) =>
        value.includes('instagram.com') ||
        value.includes('facebook.com') ||
        value.includes('linkedin.com') ||
        value.includes('x.com') ||
        value.includes('twitter.com'),
    );
}

function countConversionCues(html: string) {
  const cues = [
    /<form\b/i,
    /mailto:/i,
    /tel:/i,
    />\s*(contact|book|quote|get started|call us|request)\s*</i,
  ];

  return cues.reduce((count, pattern) => count + (pattern.test(html) ? 1 : 0), 0);
}

export function filterCredibleFindings(findings: AuditFinding[]) {
  return findings.filter((finding) => finding.confidence !== 'low');
}

export function createAuditSummary(findings: AuditFinding[]) {
  return findings.map((finding) => `${finding.label}: ${finding.detail}`);
}

export async function auditWebsite(
  input: AuditRequestInput,
  fetchImpl: FetchLike = fetch,
): Promise<AuditResponse> {
  let resolvedDomain = normalizeWebsiteUrl(input.websiteUrl);
  let confidence: AuditResponse['confidence'] = resolvedDomain ? 'high' : 'low';

  if (!resolvedDomain && input.businessName?.trim()) {
    resolvedDomain = await resolveDomainFromSearch(input, fetchImpl);
    confidence = resolvedDomain ? 'medium' : 'low';
  }

  if (!resolvedDomain) {
    return {
      resolvedDomain: undefined,
      findings: [],
      summaryPromptInputs: [],
      confidence,
    };
  }

  try {
    const response = await fetchText(resolvedDomain, fetchImpl);

    if (!response.ok) {
      return {
        resolvedDomain,
        findings: [
          createFinding({
            id: 'site-unreachable',
            category: 'presence',
            label: 'Public website could not be reached',
            detail:
              'We could not load the public website reliably, which may make it harder for customers to get information or take the next step online.',
            severity: 'high',
            confidence: 'high',
          }),
        ],
        summaryPromptInputs: ['Website could not be reached reliably.'],
        confidence,
      };
    }

    const html = await response.text();
    const latestDate = extractLatestDate(html);
    const socialLinks = extractSocialLinks(html);
    const conversionCueCount = countConversionCues(html);
    const title = extractTitle(html);
    const description = extractMetaDescription(html);

    const findings: AuditFinding[] = [];

    if (!socialLinks.length) {
      findings.push(
        createFinding({
          id: 'social-presence-thin',
          category: 'engagement',
          label: 'Public engagement channels look limited',
          detail:
            'We could not find visible social or engagement links from the public website, which may limit easy follow-up paths for customers.',
          severity: 'low',
          confidence: 'medium',
        }),
      );
    }

    if (!title || !description) {
      findings.push(
        createFinding({
          id: 'core-info-thin',
          category: 'presence',
          label: 'The website gives limited context at a glance',
          detail:
            'We found limited headline or summary information on the public homepage, which can make it harder for visitors to understand the offer quickly.',
          severity: 'medium',
          confidence: 'medium',
        }),
      );
    }

    if (conversionCueCount === 0) {
      findings.push(
        createFinding({
          id: 'next-step-unclear',
          category: 'response',
          label: 'The next step for customers is not obvious',
          detail:
            'We did not find a clear booking, contact, or form-based next step on the public homepage, which can slow down response and follow-up.',
          severity: 'high',
          confidence: 'high',
        }),
      );
    }

    if (latestDate) {
      const ageInDays = Math.floor((Date.now() - latestDate.getTime()) / (1000 * 60 * 60 * 24));

      if (ageInDays > 365) {
        findings.push(
          createFinding({
            id: 'freshness-stale',
            category: 'operations',
            label: 'The public site does not show recent updates',
            detail:
              'The most recent visible date we found appears to be more than a year old, which may suggest the public workflow is not being updated consistently.',
            severity: 'low',
            confidence: 'medium',
          }),
        );
      }
    }

    const credibleFindings = filterCredibleFindings(findings).slice(0, 3);

    return {
      resolvedDomain,
      findings: credibleFindings,
      summaryPromptInputs: createAuditSummary(credibleFindings),
      confidence,
    };
  } catch {
    return {
      resolvedDomain,
      findings: [],
      summaryPromptInputs: [],
      confidence: 'low',
    };
  }
}
