import Image from 'next/image';
import Link from 'next/link';

const advisorySteps = [
  {
    title: 'Find the real bottleneck first',
    description:
      'Start with the repetitive admin, missed follow-up, and reporting gaps that are slowing the business down before buying more software.',
  },
  {
    title: 'Choose tools that fit the team',
    description:
      'Focus on practical systems for communication, workflow, sales support, and operations instead of broad AI experimentation.',
  },
  {
    title: 'Roll out in manageable stages',
    description:
      'Make one useful change at a time so owners can see value quickly without disrupting how the business already runs.',
  },
];

const proofPoints = [
  'Founder-led advisory with direct guidance from Andre Bourque',
  'Clear next-step recommendations instead of open-ended technical scope',
  'Growth Assessment available for businesses that need a practical starting point',
];

const opportunityAreas = [
  {
    title: 'Procurement readiness',
    description:
      'Prepare internal process, documentation, and business positioning for public and private-sector opportunities.',
  },
  {
    title: 'Defense supply pathways',
    description:
      'Get practical guidance on navigating defense-related supply and contract opportunities with more structure.',
  },
  {
    title: 'Export and logistics planning',
    description:
      'Strengthen shipping, coordination, and supply-chain planning as growth moves beyond the local market.',
  },
];

export default function Home() {
  return (
    <main className="site-shell">
      <div className="site-chrome" />

      <header className="topbar">
        <div className="container topbar-inner">
          <Link href="/" className="brand-block" aria-label="Bourque Solutions home">
            <Image
              src="/bsol-logo.png"
              alt="Bourque Solutions logo"
              width={88}
              height={88}
              className="brand-logo"
              priority
            />
            <span className="brand-heading">
              <Image
                src="/bsol-wordmark.svg"
                alt="Bourque Solutions"
                width={1000}
                height={240}
                className="brand-wordmark"
                priority
              />
            </span>
          </Link>

          <nav className="nav" aria-label="Primary">
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            <Link href="/growth-assessment" className="nav-cta">
              Growth Assessment
            </Link>
          </nav>
        </div>
      </header>

      <section className="hero-panel" id="about">
        <div className="container hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">Practical AI guidance for growing businesses</p>
            <h1>Clear next steps for owners who want AI to be useful.</h1>
            <p className="hero-intro">
              Bourque Solutions helps local businesses turn AI from background noise into better follow-up,
              smoother operations, and more confident day-to-day decisions.
            </p>

            <div className="hero-actions">
              <a href="mailto:andre@bourquesolutions.com" className="primary-button">
                Book a Call
              </a>
              <Link href="/growth-assessment" className="secondary-button">
                Start Growth Assessment
              </Link>
            </div>

            <ul className="hero-points" aria-label="What Bourque Solutions offers">
              <li>Operational clarity before tool selection</li>
              <li>Founder-led advisory, not generic implementation churn</li>
              <li>Practical rollout built for small and growing teams</li>
            </ul>
          </div>

          <div className="hero-portrait">
            <div className="portrait-frame">
              <Image
                src="/andre-bourque.jpg"
                alt="Andre Bourque"
                width={540}
                height={720}
                className="portrait-photo"
                priority
              />
            </div>

            <div className="portrait-caption">
              <p className="eyebrow">Founder-led advisory</p>
              <p>
                Andre Bourque works directly with owners to simplify new tools, sharpen priorities, and
                build a more workable plan for growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-support" id="services">
        <div className="container support-grid">
          <div className="support-intro">
            <p className="eyebrow">How We Help</p>
            <h2>Start with the pressure points that keep stealing time.</h2>
            <p>
              The work begins by identifying where the business is getting stuck, then narrowing the next
              move to something the team can actually adopt and use.
            </p>
            <Link href="/growth-assessment" className="text-link">
              Explore the assessment
            </Link>
          </div>

          <div className="support-list">
            {advisorySteps.map((step, index) => (
              <article key={step.title} className="support-item">
                <span className="support-index">0{index + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-proof">
        <div className="container proof-grid">
          <article className="proof-copy">
            <p className="eyebrow">Why businesses call</p>
            <h2>Advice first. Better systems second.</h2>
            <p>
              Bourque Solutions is built for owners who want a clear recommendation, a sensible sequence,
              and a practical view of where AI can improve the business right now.
            </p>
          </article>

          <div className="proof-stack">
            <div className="proof-list">
              {proofPoints.map((point) => (
                <p key={point}>{point}</p>
              ))}
            </div>

            <article className="network-note">
              <p className="eyebrow">AI Adoption Center</p>
              <h3>Connected to a wider AI Adoption Center network when more advanced support is needed.</h3>
              <p>
                Businesses get a clear local point of contact first, with access to a broader network of
                expertise when the scope calls for it.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section-opportunities">
        <div className="container opportunities-grid">
          <div className="opportunities-copy">
            <p className="eyebrow">Additional Growth Support</p>
            <h2>When growth expands beyond internal operations.</h2>
            <p>
              Procurement, defense supply, export, and logistics support remain part of the offer, but as
              the next layer after operational clarity and stronger internal systems.
            </p>
          </div>

          <div className="opportunities-list">
            {opportunityAreas.map((area) => (
              <article key={area.title} className="opportunity-item">
                <h3>{area.title}</h3>
                <p>{area.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-cta" id="contact">
        <div className="container cta-panel">
          <div className="cta-copy">
            <p className="eyebrow">Next Step</p>
            <h2>Book a working session and leave with a clearer direction.</h2>
            <p>
              Start with a call to discuss where AI, process changes, or growth planning can create the most
              value first.
            </p>
          </div>

          <div className="cta-actions">
            <a href="mailto:andre@bourquesolutions.com" className="primary-button">
              Book a Call
            </a>
            <Link href="/growth-assessment" className="secondary-button secondary-button-dark">
              Start Growth Assessment
            </Link>
            <p className="cta-note">andre@bourquesolutions.com</p>
          </div>
        </div>
      </section>
    </main>
  );
}
