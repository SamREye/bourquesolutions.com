import Image from 'next/image';
import Link from 'next/link';

const serviceCards = [
  {
    title: 'AI Adoption Advisory',
    description:
      'Practical guidance to help businesses choose and implement AI tools that improve workflow, organization, and day-to-day efficiency.',
  },
  {
    title: 'Procurement & Defense Supply Consulting',
    description:
      'Support navigating procurement processes, supply opportunities, and defense-related contract pathways with clarity and structure.',
  },
  {
    title: 'Export & Logistics Consulting',
    description:
      'Advisory for international shipping, export coordination, and supply-chain planning so growth opportunities stay manageable.',
  },
];

const practicalExamples = [
  {
    title: 'AI Assistants for Customer Support',
    description:
      'Help answer common customer questions faster, improve response times, and keep support more consistent across busy periods.',
  },
  {
    title: 'Automated Email Marketing',
    description:
      'Support regular outreach, follow-up campaigns, and customer updates without relying on manual email preparation every time.',
  },
  {
    title: 'Data Analytics for Decision Making',
    description:
      'Turn business data into clearer reporting and insights that help owners make more informed operational and growth decisions.',
  },
  {
    title: 'Social Media Management',
    description:
      'Assist with planning, drafting, and organizing content so marketing activity stays active and more manageable week to week.',
  },
  {
    title: 'Predictive Analytics for Inventory Management',
    description:
      'Support better stock planning by identifying patterns in demand and helping reduce over-ordering or unexpected shortages.',
  },
  {
    title: 'Automated Bookkeeping and Accounting',
    description:
      'Reduce repetitive administrative work by helping organize records, track routine entries, and improve day-to-day financial visibility.',
  },
  {
    title: 'HR and Recruitment Assistance',
    description:
      'Help screen applications, organize hiring workflows, and simplify repetitive recruiting tasks so teams can focus on the right conversations.',
  },
  {
    title: 'Personalized Customer Recommendations',
    description:
      'Use customer behavior and purchase patterns to support more relevant offers, follow-up, and service recommendations.',
  },
];

export default function Home() {
  return (
    <main className="site-shell">
      <div className="site-chrome" />

      <header className="topbar">
        <Link href="/" className="brand-block" aria-label="Bourque Solutions home">
          <Image
            src="/bsol-logo.png"
            alt="Bourque Solutions logo"
            width={88}
            height={88}
            className="brand-logo"
            priority
          />
          <h1 className="brand-heading">
            <Image
              src="/bsol-wordmark.svg"
              alt="Bourque Solutions"
              width={1000}
              height={240}
              className="brand-wordmark"
              priority
            />
          </h1>
        </Link>

        <nav className="nav">
          <a href="#services">Services</a>
          <a href="#about">Who We Are</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">Practical AI and business advisory</p>
          <h2>
            Practical AI and business advisory for growing companies.
          </h2>
          <p className="lead">
            AI is evolving quickly, and for many local businesses it feels like too much, too fast. Bourque
            Solutions translates that complexity into straightforward next steps, helping owners apply useful
            tools that improve efficiency, organization, and decision-making without adding confusion.
          </p>

          <div className="tag-row" aria-label="Core focus areas">
            <span>AI adoption guidance</span>
            <span>Procurement advisory</span>
            <span>Defense supply contracts</span>
            <span>Export and logistics consulting</span>
            <span>CyberSecure grant-aligned support</span>
          </div>
        </div>

        <aside className="hero-side">
          <div className="insight-card">
            <p className="eyebrow">How we help</p>
            <ul>
              <li>Clarify where AI fits in the business</li>
              <li>Prioritize practical tools over hype</li>
              <li>Support implementation in manageable stages</li>
              <li>Connect local businesses to larger opportunities</li>
            </ul>
          </div>
        </aside>
      </section>

      <section className="section-grid">
        <article className="content-card emphasis-card">
          <p className="eyebrow">A simple place to begin</p>
          <h3>Technology should make the business easier to run.</h3>
          <p>
            Early AI adoption does not need to mean major disruption. Bourque Solutions focuses on realistic
            applications such as scheduling, workflow automation, document handling, and operational support
            so businesses can start with what is useful now and expand over time.
          </p>
        </article>

        <article className="content-card opportunity-card">
          <p className="eyebrow">Opportunities</p>
          <h3>Built for growth beyond the day-to-day.</h3>
          <p>
            Alongside AI adoption, Bourque Solutions helps businesses prepare for procurement, supply, export,
            and logistics opportunities with a practical lens on process and readiness.
          </p>
        </article>
      </section>

      <section className="section" id="services">
        <div className="section-heading">
          <p className="eyebrow">Services</p>
          <h3>Focused advisory for businesses that want clear direction.</h3>
        </div>

        <div className="cards three-up">
          {serviceCards.map((service) => (
            <article key={service.title} className="content-card service-card">
              <h4>{service.title}</h4>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section about-section" id="about">
        <div className="section-heading">
          <p className="eyebrow">Who We Are</p>
          <h3>A real advisor behind the work.</h3>
        </div>

        <div className="about-grid">
          <div className="portrait-placeholder">
            <Image
              src="/andre-bourque.jpg"
              alt="André Bourque"
              width={271}
              height={271}
              className="portrait-photo"
              priority
            />
          </div>

          <article className="content-card bio-card" id="contact">
            <h4>André Bourque</h4>
            <p>
              Bourque Solutions is positioned as a practical guide for businesses that want to modernize
              operations, understand emerging tools, and pursue new commercial opportunities without getting
              lost in technical language.
            </p>
            <p>
              The focus is trust, clarity, and business value: identifying solutions that make operations more
              efficient while helping companies navigate procurement, supply, export, and related growth paths.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="network-banner">
          <div>
            <p className="eyebrow">AI Adoption Center</p>
            <h3>Bourque Solutions is positioned as a regional partner in the AI Adoption Center network.</h3>
          </div>
          <p>
            That relationship gives businesses a clear local point of contact while also connecting them to a
            broader network of advanced solutions and global collaboration when needed.
          </p>
        </div>
      </section>

      <section className="section future-section">
        <div className="section-heading">
          <p className="eyebrow">Practical Examples</p>
          <h3>Common ways businesses can put AI to work.</h3>
        </div>

        <div className="cards examples-grid">
          {practicalExamples.map((example) => (
            <article key={example.title} className="content-card placeholder-card">
              <h4>{example.title}</h4>
              <p>{example.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
