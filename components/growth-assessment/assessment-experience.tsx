'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  bottleneckLabels,
  provinceOptions,
  sectorOptions,
} from '../../lib/assessment/content';
import { getAssessmentResult } from '../../lib/assessment/engine';
import type {
  AdoptionReadinessLevel,
  AssessmentContact,
  AssessmentInput,
  AuditResponse,
  CurrentHandlingLevel,
  FrequencyLevel,
  MissedOpportunityLevel,
  PrimaryBottleneck,
  ResponsivenessLevel,
  ScalabilityLevel,
  TimePressureLevel,
  UrgencyLevel,
} from '../../lib/assessment/types';

type WizardStep =
  | 'context'
  | 'bottleneck'
  | 'frequency'
  | 'current-handling'
  | 'responsiveness'
  | 'missed-opportunity'
  | 'scalability'
  | 'time-pressure'
  | 'adoption-readiness'
  | 'urgency'
  | 'result';

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error';

interface AssessmentDraft {
  sector: string;
  location: {
    province: string;
    city: string;
  };
  primaryBottleneck?: PrimaryBottleneck;
  frequency?: FrequencyLevel;
  currentHandling?: CurrentHandlingLevel;
  responsiveness?: ResponsivenessLevel;
  missedOpportunity?: MissedOpportunityLevel;
  scalability?: ScalabilityLevel;
  timePressure?: TimePressureLevel;
  adoptionReadiness?: AdoptionReadinessLevel;
  urgency?: UrgencyLevel;
  websiteUrl: string;
  businessName: string;
  auditFindings: AssessmentInput['auditFindings'];
}

const stepOrder: WizardStep[] = [
  'context',
  'bottleneck',
  'frequency',
  'current-handling',
  'responsiveness',
  'missed-opportunity',
  'scalability',
  'time-pressure',
  'adoption-readiness',
  'urgency',
];

const initialDraft: AssessmentDraft = {
  sector: '',
  location: {
    province: '',
    city: '',
  },
  websiteUrl: '',
  businessName: '',
  auditFindings: [],
};

const initialContact: AssessmentContact = {
  name: '',
  email: '',
  phone: '',
  details: '',
};

function buildAssessmentInput(draft: AssessmentDraft): AssessmentInput | null {
  if (
    !draft.sector ||
    !draft.location.province ||
    !draft.location.city ||
    !draft.primaryBottleneck ||
    !draft.frequency ||
    !draft.currentHandling ||
    !draft.responsiveness ||
    !draft.missedOpportunity ||
    !draft.scalability ||
    !draft.timePressure ||
    !draft.adoptionReadiness ||
    !draft.urgency
  ) {
    return null;
  }

  return {
    sector: draft.sector,
    location: draft.location,
    primaryBottleneck: draft.primaryBottleneck,
    frequency: draft.frequency,
    currentHandling: draft.currentHandling,
    responsiveness: draft.responsiveness,
    missedOpportunity: draft.missedOpportunity,
    scalability: draft.scalability,
    timePressure: draft.timePressure,
    adoptionReadiness: draft.adoptionReadiness,
    urgency: draft.urgency,
    websiteUrl: draft.websiteUrl.trim() || undefined,
    businessName: draft.businessName.trim() || undefined,
    auditFindings: draft.auditFindings,
  };
}

function getStepProgress(step: WizardStep) {
  if (step === 'result') {
    return { current: stepOrder.length, total: stepOrder.length };
  }

  return {
    current: stepOrder.indexOf(step) + 1,
    total: stepOrder.length,
  };
}

function StepButton({
  onClick,
  title,
  description,
}: {
  onClick: () => void;
  title: string;
  description?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-[26px] border border-white/70 bg-white/85 px-5 py-4 text-left transition hover:border-brass/60 hover:bg-white"
    >
      <div className="font-display text-xl text-ink">{title}</div>
      {description ? <p className="mt-2 text-sm leading-6 text-slate">{description}</p> : null}
    </button>
  );
}

export function AssessmentExperience() {
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState<WizardStep>('context');
  const [draft, setDraft] = useState<AssessmentDraft>(initialDraft);
  const [auditState, setAuditState] = useState<{
    status: 'idle' | 'loading' | 'success' | 'error';
    data?: AuditResponse;
    message?: string;
  }>({ status: 'idle' });
  const [contact, setContact] = useState<AssessmentContact>(initialContact);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');
  const [submissionError, setSubmissionError] = useState('');

  const assessmentInput = buildAssessmentInput(draft);
  const result = assessmentInput ? getAssessmentResult(assessmentInput) : null;
  const progress = getStepProgress(currentStep);

  async function startAssessment() {
    setStarted(true);
    setCurrentStep('context');

    if (!draft.websiteUrl.trim() && !draft.businessName.trim()) {
      setAuditState({ status: 'idle' });
      return;
    }

    setAuditState({ status: 'loading' });

    try {
      const response = await fetch('/api/assessment/audit', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          websiteUrl: draft.websiteUrl.trim() || undefined,
          businessName: draft.businessName.trim() || undefined,
          province: draft.location.province || undefined,
          city: draft.location.city || undefined,
          sector: draft.sector || undefined,
        }),
      });

      const payload = (await response.json()) as AuditResponse | { error?: string };

      if (!response.ok || !('findings' in payload)) {
        setAuditState({
          status: 'error',
          message: 'We could not review the public business presence right now. The assessment still works normally.',
        });
        return;
      }

      setDraft((current) => ({
        ...current,
        auditFindings: payload.findings,
      }));
      setAuditState({ status: 'success', data: payload });
    } catch {
      setAuditState({
        status: 'error',
        message: 'We could not review the public business presence right now. The assessment still works normally.',
      });
    }
  }

  function updateDraft<K extends keyof AssessmentDraft>(key: K, value: AssessmentDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function chooseAndAdvance<K extends keyof AssessmentDraft>(key: K, value: AssessmentDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
    goForward();
  }

  function canContinue() {
    return Boolean(draft.sector && draft.location.province && draft.location.city.trim());
  }

  function goBack() {
    switch (currentStep) {
      case 'context':
        setStarted(false);
        break;
      case 'bottleneck':
        setCurrentStep('context');
        break;
      case 'frequency':
        setCurrentStep('bottleneck');
        break;
      case 'current-handling':
        setCurrentStep('frequency');
        break;
      case 'responsiveness':
        setCurrentStep('current-handling');
        break;
      case 'missed-opportunity':
        setCurrentStep('responsiveness');
        break;
      case 'scalability':
        setCurrentStep('missed-opportunity');
        break;
      case 'time-pressure':
        setCurrentStep('scalability');
        break;
      case 'adoption-readiness':
        setCurrentStep('time-pressure');
        break;
      case 'urgency':
        setCurrentStep('adoption-readiness');
        break;
      case 'result':
        setCurrentStep('urgency');
        break;
    }
  }

  function goForward() {
    switch (currentStep) {
      case 'context':
        setCurrentStep('bottleneck');
        break;
      case 'bottleneck':
        setCurrentStep('frequency');
        break;
      case 'frequency':
        setCurrentStep('current-handling');
        break;
      case 'current-handling':
        setCurrentStep('responsiveness');
        break;
      case 'responsiveness':
        setCurrentStep('missed-opportunity');
        break;
      case 'missed-opportunity':
        setCurrentStep('scalability');
        break;
      case 'scalability':
        setCurrentStep('time-pressure');
        break;
      case 'time-pressure':
        setCurrentStep('adoption-readiness');
        break;
      case 'adoption-readiness':
        setCurrentStep('urgency');
        break;
      case 'urgency':
        setCurrentStep('result');
        break;
      case 'result':
        break;
    }
  }

  async function submitLead(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!assessmentInput || !result) {
      return;
    }

    setSubmissionState('submitting');
    setSubmissionError('');

    try {
      const response = await fetch('/api/assessment/submit', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          ...assessmentInput,
          recommendedCategory: result.category,
          recommendedSolution: result.solution,
          severityBand: result.severityBand,
          contact,
        }),
      });

      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        setSubmissionState('error');
        setSubmissionError(payload.error ?? 'We could not save your request right now.');
        return;
      }

      setSubmissionState('success');
    } catch {
      setSubmissionState('error');
      setSubmissionError('We could not save your request right now.');
    }
  }

  function renderQuestionCard() {
    if (currentStep === 'context') {
      return (
        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brass">Step 1</p>
            <h2 className="mt-2 font-display text-4xl text-ink">Tell us where you operate.</h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate">
              This helps shape the recommendation and the funding guidance.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-ink">Sector</span>
              <select
                value={draft.sector}
                onChange={(event) => updateDraft('sector', event.target.value)}
                className="w-full rounded-2xl border border-[#d7d8dc] bg-white px-4 py-3 text-base text-ink outline-none transition focus:border-brass"
              >
                <option value="">Select a sector</option>
                {sectorOptions.map((sector) => (
                  <option key={sector} value={sector}>
                    {sector}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-ink">Province</span>
              <select
                value={draft.location.province}
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    location: { ...current.location, province: event.target.value },
                  }))
                }
                className="w-full rounded-2xl border border-[#d7d8dc] bg-white px-4 py-3 text-base text-ink outline-none transition focus:border-brass"
              >
                <option value="">Select a province</option>
                {provinceOptions.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-ink">City or town</span>
            <input
              value={draft.location.city}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  location: { ...current.location, city: event.target.value },
                }))
              }
              placeholder="Fredericton"
              className="w-full rounded-2xl border border-[#d7d8dc] bg-white px-4 py-3 text-base text-ink outline-none transition focus:border-brass"
            />
          </label>
        </div>
      );
    }

    if (currentStep === 'bottleneck') {
      return (
        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brass">Step 2</p>
            <h2 className="mt-2 font-display text-4xl text-ink">
              What is taking up the most time or limiting your business right now?
            </h2>
          </div>

          <div className="grid gap-4">
            {(
              [
                ['customer-inquiries', 'Support bottleneck'],
                ['follow-ups', 'Sales bottleneck'],
                ['admin', 'Operations bottleneck'],
                ['content-marketing', 'Marketing bottleneck'],
              ] as Array<[PrimaryBottleneck, string]>
            ).map(([value, description]) => (
              <StepButton
                key={value}
                onClick={() => chooseAndAdvance('primaryBottleneck', value)}
                title={bottleneckLabels[value]}
                description={description}
              />
            ))}
          </div>
        </div>
      );
    }

    if (currentStep === 'frequency') {
      return (
        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brass">Step 3</p>
            <h2 className="mt-2 font-display text-4xl text-ink">How often does this occur?</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {(
              [
                ['few-times-week', 'A few times a week'],
                ['daily', 'Daily'],
                ['many-times-day', 'Many times per day'],
              ] as Array<[FrequencyLevel, string]>
            ).map(([value, label]) => (
              <StepButton key={value} onClick={() => chooseAndAdvance('frequency', value)} title={label} />
            ))}
          </div>
        </div>
      );
    }

    if (currentStep === 'current-handling') {
      return (
        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brass">Step 4</p>
            <h2 className="mt-2 font-display text-4xl text-ink">How is this currently handled?</h2>
          </div>

          <div className="grid gap-4">
            {(
              [
                ['fully-manual', 'Fully manual'],
                ['some-tools', 'Some tools, but still manual work'],
                ['mostly-automated', 'Mostly automated'],
              ] as Array<[CurrentHandlingLevel, string]>
            ).map(([value, label]) => (
              <StepButton key={value} onClick={() => chooseAndAdvance('currentHandling', value)} title={label} />
            ))}
          </div>
        </div>
      );
    }

    if (currentStep === 'responsiveness') {
      return (
        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brass">Step 5</p>
            <h2 className="mt-2 font-display text-4xl text-ink">
              Do you feel you’re able to respond or act as quickly as you should?
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {(
              [
                ['yes', 'Yes'],
                ['sometimes-delayed', 'Sometimes delayed'],
                ['often-delayed', 'Often delayed or missed'],
              ] as Array<[ResponsivenessLevel, string]>
            ).map(([value, label]) => (
              <StepButton key={value} onClick={() => chooseAndAdvance('responsiveness', value)} title={label} />
            ))}
          </div>
        </div>
      );
    }

    if (currentStep === 'missed-opportunity') {
      return (
        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brass">Step 6</p>
            <h2 className="mt-2 font-display text-4xl text-ink">
              Is this causing missed opportunities or lost revenue?
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {(
              [
                ['no', 'No'],
                ['somewhat', 'Somewhat'],
                ['definitely', 'Definitely'],
              ] as Array<[MissedOpportunityLevel, string]>
            ).map(([value, label]) => (
              <StepButton key={value} onClick={() => chooseAndAdvance('missedOpportunity', value)} title={label} />
            ))}
          </div>
        </div>
      );
    }

    if (currentStep === 'scalability') {
      return (
        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brass">Step 7</p>
            <h2 className="mt-2 font-display text-4xl text-ink">
              If demand increased, could you handle it without adding staff?
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {(
              [
                ['yes', 'Yes'],
                ['maybe', 'Maybe'],
                ['no', 'No'],
              ] as Array<[ScalabilityLevel, string]>
            ).map(([value, label]) => (
              <StepButton key={value} onClick={() => chooseAndAdvance('scalability', value)} title={label} />
            ))}
          </div>
        </div>
      );
    }

    if (currentStep === 'time-pressure') {
      return (
        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brass">Step 8</p>
            <h2 className="mt-2 font-display text-4xl text-ink">
              Is this putting pressure on your time or limiting your ability to grow?
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {(
              [
                ['yes', 'Yes'],
                ['somewhat', 'Somewhat'],
                ['no', 'No'],
              ] as Array<[TimePressureLevel, string]>
            ).map(([value, label]) => (
              <StepButton key={value} onClick={() => chooseAndAdvance('timePressure', value)} title={label} />
            ))}
          </div>
        </div>
      );
    }

    if (currentStep === 'adoption-readiness') {
      return (
        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brass">Step 9</p>
            <h2 className="mt-2 font-display text-4xl text-ink">
              Would you consider automating parts of this if it saved significant time?
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {(
              [
                ['yes', 'Yes'],
                ['maybe', 'Maybe'],
                ['no', 'No'],
              ] as Array<[AdoptionReadinessLevel, string]>
            ).map(([value, label]) => (
              <StepButton key={value} onClick={() => chooseAndAdvance('adoptionReadiness', value)} title={label} />
            ))}
          </div>
        </div>
      );
    }

    if (currentStep === 'urgency') {
      return (
        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brass">Step 10</p>
            <h2 className="mt-2 font-display text-4xl text-ink">
              How soon would you act on improving this?
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {(
              [
                ['now', 'Now'],
                ['soon', 'Soon'],
                ['exploring', 'Exploring'],
              ] as Array<[UrgencyLevel, string]>
            ).map(([value, label]) => (
              <StepButton key={value} onClick={() => chooseAndAdvance('urgency', value)} title={label} />
            ))}
          </div>
        </div>
      );
    }

    if (!result || !assessmentInput) {
      return null;
    }

    return (
      <div className="space-y-8">
        <div className="rounded-[34px] border border-brass/30 bg-[#f4eee2] px-6 py-6 shadow-panel">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brass">Diagnosis</p>
          <h2 className="mt-3 font-display text-4xl text-ink">{result.severityLabel}</h2>
          <p className="mt-4 text-lg leading-8 text-slate">{result.diagnosis}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="rounded-[34px] border border-white/70 bg-white/92 px-6 py-6 shadow-panel">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brass">Likely impact</p>
            <ul className="mt-4 space-y-3 pl-5 text-base leading-7 text-slate">
              {result.impactBullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>

            <div className="mt-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brass">
                Highest-leverage improvement
              </p>
              <h3 className="mt-3 font-display text-3xl text-ink">{result.solution}</h3>
              <p className="mt-4 text-base leading-7 text-slate">{result.prescription}</p>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-[24px] border border-[#e8dfcf] bg-[#faf7f0] px-5 py-4">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brass">Typical scope</p>
                <p className="mt-2 text-lg text-ink">{result.scopeBand}</p>
              </div>
              <div className="rounded-[24px] border border-[#e8dfcf] bg-[#faf7f0] px-5 py-4">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brass">Funding fit</p>
                <p className="mt-2 text-lg text-ink">{result.reimbursementText}</p>
              </div>
            </div>

            {result.enrichmentNote ? (
              <div className="mt-6 rounded-[24px] border border-[#e8dfcf] bg-[#faf7f0] px-5 py-4">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brass">What we noticed</p>
                <p className="mt-2 text-base leading-7 text-slate">{result.enrichmentNote}</p>
              </div>
            ) : null}
          </section>

          <aside className="rounded-[34px] border border-[#e8dfcf] bg-[#fffaf3] px-6 py-6 shadow-panel">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brass">Funding position</p>
            <h3 className="mt-3 font-display text-3xl text-ink">{result.funding.title}</h3>
            <p className="mt-4 text-base leading-7 text-slate">{result.funding.detail}</p>
            {result.funding.sourceUrl ? (
              <a
                href={result.funding.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex text-sm font-semibold text-[#21456e] underline underline-offset-4"
              >
                Review the official program details
              </a>
            ) : null}
          </aside>
        </div>

        <section className="rounded-[34px] border border-[#d5d6db] bg-white/92 px-6 py-6 shadow-panel">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brass">Next step</p>
              <h3 className="mt-2 font-display text-3xl text-ink">Turn this into a funded AI plan.</h3>
              <p className="mt-3 max-w-2xl text-base leading-7 text-slate">
                Send your result and we will follow up with a practical AI implementation path for your business.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setShowLeadForm((current) => !current)}
                className="rounded-full bg-[#0d2745] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#16365e]"
              >
                Get Your Funded AI Plan
              </button>
              <a
                href="mailto:andre@bourquesolutions.com"
                className="rounded-full border border-[#c9b28a] px-6 py-3 text-center text-sm font-semibold text-ink transition hover:border-brass hover:bg-[#fbf5e8]"
              >
                Book a call
              </a>
            </div>
          </div>

          {showLeadForm ? (
            <form onSubmit={submitLead} className="mt-8 grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-ink">Name</span>
                <input
                  required
                  value={contact.name}
                  onChange={(event) => setContact((current) => ({ ...current, name: event.target.value }))}
                  className="w-full rounded-2xl border border-[#d7d8dc] bg-white px-4 py-3 text-base text-ink outline-none transition focus:border-brass"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-ink">Email</span>
                <input
                  required
                  type="email"
                  value={contact.email}
                  onChange={(event) => setContact((current) => ({ ...current, email: event.target.value }))}
                  className="w-full rounded-2xl border border-[#d7d8dc] bg-white px-4 py-3 text-base text-ink outline-none transition focus:border-brass"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-ink">Phone (optional)</span>
                <input
                  value={contact.phone}
                  onChange={(event) => setContact((current) => ({ ...current, phone: event.target.value }))}
                  className="w-full rounded-2xl border border-[#d7d8dc] bg-white px-4 py-3 text-base text-ink outline-none transition focus:border-brass"
                />
              </label>

              <label className="block md:col-span-2">
                <span className="mb-2 block text-sm font-semibold text-ink">
                  Anything we should know before following up?
                </span>
                <textarea
                  rows={4}
                  value={contact.details}
                  onChange={(event) => setContact((current) => ({ ...current, details: event.target.value }))}
                  className="w-full rounded-2xl border border-[#d7d8dc] bg-white px-4 py-3 text-base text-ink outline-none transition focus:border-brass"
                  placeholder="Current tools, timelines, or what you want fixed first."
                />
              </label>

              <div className="md:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  disabled={submissionState === 'submitting'}
                  className="rounded-full bg-[#0d2745] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#16365e] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submissionState === 'submitting' ? 'Saving your AI plan request...' : 'Send my result'}
                </button>
                {submissionState === 'success' ? (
                  <p className="text-sm text-[#1f5a39]">
                    Your assessment has been saved. We can now use this as the starting point for follow-up.
                  </p>
                ) : null}
                {submissionState === 'error' ? (
                  <p className="text-sm text-[#b42318]">{submissionError}</p>
                ) : null}
              </div>
            </form>
          ) : null}
        </section>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#f6f0e7_0%,#eef3f8_45%,#f7f5ef_100%)] font-body text-ink">
      <div className="bg-assessment-radial">
        <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
          <header className="flex flex-col gap-4 rounded-[30px] border border-white/60 bg-white/40 px-5 py-4 backdrop-blur md:flex-row md:items-start md:justify-between">
            <div className="flex flex-col">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brass">Bourque Solutions</p>
              <h1 className="mt-1 font-display text-2xl leading-none">Growth Assessment</h1>
            </div>
            <div className="flex flex-wrap gap-2 text-sm font-semibold text-slate">
              <Link
                href="/"
                className="inline-flex min-h-10 items-center rounded-full border border-white/70 px-4 py-2 leading-none hover:bg-white/80"
              >
                Back to home
              </Link>
              <a
                href="mailto:andre@bourquesolutions.com"
                className="inline-flex min-h-10 items-center rounded-full border border-white/70 px-4 py-2 leading-none hover:bg-white/80"
              >
                Contact us
              </a>
            </div>
          </header>

          {!started ? (
            <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-[40px] border border-[#efe5d4] bg-[#0d2745] px-6 py-8 text-white shadow-panel sm:px-8 sm:py-10">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#e5c17a]">
                  AI adoption diagnostic
                </p>
                <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[0.96] sm:text-6xl">
                  Growth Assessment
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-white/82">
                  Find where your business is losing time and missing opportunities and how AI can fix it, often
                  with funding support.
                </p>

                <div className="mt-10 grid gap-4 md:grid-cols-3">
                  {[
                    'Find the biggest operational bottleneck quickly',
                    'Get one AI system recommendation',
                    'See whether funding can reduce implementation risk',
                  ].map((point) => (
                    <div key={point} className="rounded-[24px] border border-white/10 bg-white/8 px-4 py-4">
                      <p className="text-sm leading-6 text-white/84">{point}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[40px] border border-white/75 bg-white/92 px-6 py-8 shadow-panel sm:px-8">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brass">Optional light enrichment</p>
                <h2 className="mt-3 font-display text-3xl text-ink">
                  Add your website or business name.
                </h2>
                <p className="mt-4 text-base leading-7 text-slate">
                  If you share a website or business name, we will look for public context in the background. It will
                  only be used to personalize the final recommendation when helpful.
                </p>

                <div className="mt-8 space-y-4">
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-ink">Website URL</span>
                    <input
                      value={draft.websiteUrl}
                      onChange={(event) => updateDraft('websiteUrl', event.target.value)}
                      placeholder="https://yourbusiness.ca"
                      className="w-full rounded-2xl border border-[#d7d8dc] bg-white px-4 py-3 text-base text-ink outline-none transition focus:border-brass"
                    />
                  </label>

                  <div className="text-center text-sm font-semibold uppercase tracking-[0.16em] text-[#8b919a]">
                    or
                  </div>

                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-ink">Business name</span>
                    <input
                      value={draft.businessName}
                      onChange={(event) => updateDraft('businessName', event.target.value)}
                      placeholder="Your Business Name"
                      className="w-full rounded-2xl border border-[#d7d8dc] bg-white px-4 py-3 text-base text-ink outline-none transition focus:border-brass"
                    />
                  </label>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    void startAssessment();
                  }}
                  className="mt-8 w-full rounded-full bg-[#0d2745] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#16365e]"
                >
                  Start Assessment
                </button>
              </div>
            </section>
          ) : (
            <section className="mt-8 grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
              <aside className="rounded-[34px] border border-white/80 bg-white/88 px-6 py-6 shadow-panel">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brass">
                  {currentStep === 'result' ? 'Recommendation ready' : `Step ${progress.current} of ${progress.total}`}
                </p>
                <h1 className="mt-3 font-display text-3xl text-ink">Growth Assessment</h1>
                <p className="mt-4 text-base leading-7 text-slate">
                  Short, practical, and focused on recovering time, improving responsiveness, and scaling without extra hiring.
                </p>

                <div className="mt-6 h-2 overflow-hidden rounded-full bg-[#ece6da]">
                  <div
                    className="h-full rounded-full bg-[#b98a2f] transition-all duration-300"
                    style={{ width: `${(progress.current / progress.total) * 100}%` }}
                  />
                </div>

                <div className="mt-6 space-y-4 rounded-[28px] border border-[#ebe3d6] bg-[#faf7f2] px-5 py-5">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brass">Background review</p>
                    <p className="mt-2 text-base leading-7 text-slate">
                      {auditState.status === 'idle'
                        ? 'No public review was requested.'
                        : auditState.status === 'loading'
                          ? 'Reviewing public business context in the background.'
                          : auditState.status === 'error'
                            ? auditState.message
                            : auditState.data?.findings.length
                              ? `${auditState.data.findings.length} public note${auditState.data.findings.length > 1 ? 's' : ''} may help personalize the final recommendation.`
                              : 'No strong public context surfaced, so the recommendation will rely on your answers only.'}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brass">Momentum</p>
                    <p className="mt-2 text-base leading-7 text-slate">
                      The assessment stays linear and quick even when no public context is available.
                    </p>
                  </div>
                </div>

                {result ? (
                  <div className="mt-6 rounded-[28px] border border-[#d8ccb4] bg-[#fff7e7] px-5 py-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brass">Current read</p>
                    <p className="mt-2 font-display text-2xl text-ink">{result.solution}</p>
                    <p className="mt-3 text-base leading-7 text-slate">{result.diagnosis}</p>
                  </div>
                ) : null}
              </aside>

              <div className="rounded-[34px] border border-white/80 bg-white/90 px-6 py-6 shadow-panel sm:px-8 sm:py-8">
                {renderQuestionCard()}

                {currentStep === 'context' ? (
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="button"
                      onClick={goBack}
                      className="rounded-full border border-[#d8d9dd] px-5 py-3 text-sm font-semibold text-ink transition hover:border-brass hover:bg-[#fbf5e8]"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={goForward}
                      disabled={!canContinue()}
                      className="rounded-full bg-[#0d2745] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#16365e] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Continue
                    </button>
                  </div>
                ) : currentStep !== 'result' ? (
                  <div className="mt-8 flex justify-start">
                    <button
                      type="button"
                      onClick={goBack}
                      className="rounded-full border border-[#d8d9dd] px-5 py-3 text-sm font-semibold text-ink transition hover:border-brass hover:bg-[#fbf5e8]"
                    >
                      Back
                    </button>
                  </div>
                ) : (
                  <div className="mt-8 flex justify-start">
                    <button
                      type="button"
                      onClick={goBack}
                      className="rounded-full border border-[#d8d9dd] px-5 py-3 text-sm font-semibold text-ink transition hover:border-brass hover:bg-[#fbf5e8]"
                    >
                      Back to answers
                    </button>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
