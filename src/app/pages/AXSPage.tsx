import { motion } from 'motion/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Navigation } from '../components/Navigation';
import { FadeUp, StaggerCards, BeforeAfter, AnimatedQuote, AnimatedLine, staggerContainer, fadeUpItem, ease } from '../components/Animate';

const C = {
  bg: '#0D0D0D',
  primary: '#EBEBE5',
  secondary: '#888884',
  border: '#2A2A2A',
  cardBorder: '#222222',
  statsBg: '#161616',
  problemBg: '#111111',
};
const F = {
  editorial: "'Playfair Display', Georgia, serif",
  sans: "'DM Sans', sans-serif",
};

function SectionLabel({ text }: { text: string }) {
  return (
    <motion.div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        marginBottom: '48px',
        position: 'sticky',
        top: '72px',
        zIndex: 5,
        backgroundColor: 'inherit',
        paddingTop: '12px',
        paddingBottom: '12px',
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease }}
    >
      <span className="cs-section-label">{text}</span>
      <AnimatedLine color="var(--accent-color, #2A2A2A)" />
    </motion.div>
  );
}

// AXS uses placeholder screens since no mockup image was provided
function ScreenPlaceholder({ label, opacity = 1, text }: { label?: string; opacity?: number; text?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
      {label && <span style={{ fontFamily: F.sans, fontSize: '13px', color: C.secondary, alignSelf: 'flex-start' }}>{label}</span>}
      <div style={{ width: '100%', maxWidth: '280px', aspectRatio: '9/16', backgroundColor: '#161616', border: `1px solid ${C.cardBorder}`, borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity }}>
        <p style={{ fontFamily: F.editorial, fontSize: '15px', color: C.secondary, textAlign: 'center', padding: '20px', lineHeight: 1.4, margin: 0 }}>
          {text || 'AXS · Billing Feature'}
        </p>
      </div>
    </div>
  );
}

function CaseStudyHero() {
  return (
    <section style={{ paddingTop: '120px', paddingBottom: '80px', paddingLeft: '80px', paddingRight: '80px', backgroundColor: C.bg }} className="max-md:!px-6 max-md:!pt-24 max-md:!pb-16 max-lg:!px-10">
      {/* Intentional placeholder hero — no mockup provided */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease, delay: 0.55 }}
        style={{ width: '100%', height: 'clamp(300px, 55vw, 640px)', backgroundColor: '#161616', border: `1px solid ${C.cardBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <span style={{ fontFamily: F.editorial, fontSize: 'clamp(24px, 3vw, 40px)', color: C.secondary, letterSpacing: '-0.01em', textAlign: 'center', padding: '40px' }}>
          AXS · Billing Feature
        </span>
      </motion.div>
      <motion.div variants={staggerContainer} initial="hidden" animate="show" style={{ marginTop: '60px' }}>
        <motion.h1 variants={fadeUpItem} style={{ fontFamily: F.editorial, fontSize: 'clamp(42px, 7vw, 96px)', color: C.primary, margin: '0 0 20px 0', lineHeight: 0.95, letterSpacing: '-0.02em', fontWeight: 400 }}>
          AXS · Billing
        </motion.h1>
        <motion.p variants={fadeUpItem} style={{ fontFamily: F.sans, fontSize: 'clamp(17px, 2vw, 20px)', color: C.secondary, margin: '0 0 24px 0', lineHeight: 1.5 }}>
          Smart Bill Splitting and Shared Payment Management for Couples and Flatmates
        </motion.p>
        <motion.p variants={fadeUpItem} style={{ fontFamily: F.sans, fontSize: '14px', color: C.secondary, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
          Duration: 2 Weeks&nbsp;&nbsp;·&nbsp;&nbsp;Tools: Figma, Claude AI&nbsp;&nbsp;·&nbsp;&nbsp;Platform: iOS App · Feature Addition
        </motion.p>
      </motion.div>
    </section>
  );
}

function StatsStrip() {
  const stats = [
    { number: '2', label: 'Weeks · Duration' },
    { number: '5', label: 'Users Interviewed' },
    { number: '6', label: 'Core Flows' },
    { number: '4', label: 'Billing Categories' },
  ];
  return (
    <section style={{ backgroundColor: C.statsBg, paddingTop: '60px', paddingBottom: '60px', paddingLeft: '80px', paddingRight: '80px' }} className="max-md:!px-6 max-lg:!px-10">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px' }} className="max-md:!grid-cols-2 max-md:!gap-8 max-lg:!grid-cols-2 max-lg:!gap-8">
        {stats.map((s) => (
          <div key={s.label}>
            <p style={{ fontFamily: F.editorial, fontSize: 'clamp(42px, 5vw, 64px)', color: C.primary, margin: '0 0 8px 0', lineHeight: 1, letterSpacing: '-0.02em', fontWeight: 400 }}>{s.number}</p>
            <p style={{ fontFamily: F.sans, fontSize: '14px', color: C.secondary, margin: 0, lineHeight: 1.4 }}>{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProblemStatement() {
  const painPoints = [
    { title: 'Fragmented Bill Tracking', desc: 'Couples and flatmates track shared bills across messages, spreadsheets, and mental notes, with no single source of truth and frequent disputes about who owes what.' },
    { title: 'Recurring Payment Blindness', desc: 'Subscriptions and recurring utilities often go untracked until someone notices a discrepancy. The administrative burden falls unevenly and creates friction.' },
    { title: 'Awkward Money Conversations', desc: 'Asking for repayment between people who share a home carries social weight. The design needed to remove the awkwardness, not amplify it.' },
    { title: 'Lack of Visibility', desc: 'Neither party has a clear picture of shared financial commitments at a glance. This creates anxiety, distrust, and preventable disagreements.' },
  ];
  return (
    <section style={{ backgroundColor: C.problemBg, padding: '80px', paddingTop: '80px', paddingBottom: '80px' }} className="max-md:!px-6 max-md:!py-16 max-lg:!px-10 max-lg:!py-14">
      <h2 className="cs-section-header">The Problem.</h2>
      <p style={{ fontFamily: F.sans, fontSize: '17px', color: C.primary, lineHeight: 1.7, margin: '0 0 48px 0', maxWidth: '720px' }}>
        Shared finances are one of the most common sources of household friction, not because of money, but because of ambiguity. AXS already had the infrastructure to handle bill payments; this feature was designed to extend that into the shared and collaborative layer. Making it easy to split, track, and settle without it feeling like a debt collection exercise.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="max-md:!grid-cols-1">
        {painPoints.map((p) => (
          <div key={p.title} style={{ border: `1px solid ${C.cardBorder}`, padding: '24px' }}>
            <p style={{ fontFamily: F.sans, fontSize: '15px', color: C.primary, margin: '0 0 10px 0', fontWeight: 500 }}>{p.title}</p>
            <p style={{ fontFamily: F.sans, fontSize: '15px', color: C.secondary, margin: 0, lineHeight: 1.6 }}>{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ResearchFindings() {
  const findings = [
    { title: 'Financial Transparency as Trust', desc: 'For couples especially, having visibility into shared spending isn\'t about control; it\'s about fairness. The feature needed to feel like a shared dashboard, not a surveillance tool.' },
    { title: 'Splitting Complexity', desc: 'Simple 50/50 splits cover only a subset of real cases. Participants needed percentage splits, variable recurring amounts, and one-off exceptions, without it feeling like accounting software.' },
    { title: 'Reminder Anxiety', desc: 'Being reminded that you owe money creates stress. The design needed payment reminders to feel collaborative and neutral, not accusatory.' },
    { title: 'AXS Brand Trust', desc: 'Participants already trusted AXS for individual bill payment. Adding a shared layer to an existing trusted app was preferable to a new standalone tool.' },
    { title: 'Mobile-Native Expectation', desc: 'Every participant expected the feature to work entirely on mobile. Desktop was not part of their mental model for day-to-day financial management.' },
  ];
  return (
    <section style={{ backgroundColor: C.bg, padding: '80px', paddingTop: '80px', paddingBottom: '80px' }} className="max-md:!px-6 max-md:!py-16 max-lg:!px-10 max-lg:!py-14">
      <SectionLabel text="Research Findings" />
      <StaggerCards style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }} className="max-md:!grid-cols-1 max-lg:!grid-cols-2">
        {findings.map((f, i) => (
          <div key={f.title} style={{ border: `1px solid ${C.cardBorder}`, padding: '24px' }}>
            <p style={{ fontFamily: F.sans, fontSize: '13px', color: C.secondary, margin: '0 0 14px 0', letterSpacing: '0.08em' }}>0{i + 1}</p>
            <h3 style={{ fontFamily: F.editorial, fontSize: '18px', color: C.primary, margin: '0 0 14px 0', lineHeight: 1.3, fontWeight: 400 }}>{f.title}</h3>
            <p style={{ fontFamily: F.sans, fontSize: '15px', color: C.secondary, margin: 0, lineHeight: 1.6 }}>{f.desc}</p>
          </div>
        ))}
      </StaggerCards>
    </section>
  );
}

function DesignDecisions() {
  const features = [
    {
      number: '01', name: 'Shared Bills Dashboard',
      bullets: [
        'A dedicated shared tab within the AXS app surfaces all jointly tracked bills in a single view: utilities, subscriptions, and one-off expenses.',
        'Each bill shows the split, the next due date, and current settlement status without requiring the user to dig.',
        'The dashboard is designed for a quick daily glance, not deep financial management. Just 10 seconds to full visibility.',
      ],
      imageFirst: false,
    },
    {
      number: '02', name: 'Flexible Split Engine',
      bullets: [
        'Splits can be 50/50, percentage-based, fixed amount, or custom, set once per bill and remembered for recurring payments.',
        'One partner can pay the full amount upfront; the app automatically calculates and tracks the reimbursement owed.',
        'Split configurations can be updated at any time without affecting past settlement records.',
      ],
      imageFirst: true,
    },
    {
      number: '03', name: 'Settlement Flow',
      bullets: [
        'One-tap settlement through the existing AXS payment infrastructure, no need to use a separate app or transfer method.',
        'Settlement confirmations are visible to both parties simultaneously, removing ambiguity from the reimbursement process.',
        'A settlement history log provides a neutral record that both parties can reference, removing the need to search through messages.',
      ],
      imageFirst: false,
    },
    {
      number: '04', name: 'Collaborative Reminders',
      bullets: [
        'Reminders for upcoming bills are sent to both parties, framed as shared events rather than payment demands.',
        'The reminder tone is neutral and informational: "Your electricity bill is due in 3 days", not "You owe $45.20".',
        'Both partners can configure their own reminder preferences without affecting the other\'s notification settings.',
      ],
      imageFirst: true,
    },
  ];
  return (
    <section style={{ backgroundColor: C.bg, padding: '80px', paddingTop: '80px', paddingBottom: '80px' }} className="max-md:!px-6 max-md:!py-16 max-lg:!px-10 max-lg:!py-14">
      <SectionLabel text="Design Decisions" />
      <StaggerCards style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
        {features.map((feat) => (
          <div key={feat.number} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }} className="max-md:!grid-cols-1 max-md:!gap-10 max-lg:!grid-cols-1 max-lg:!gap-10">
            {feat.imageFirst ? (
              <>
                <div className="max-md:!order-2">
                  <ScreenPlaceholder text="Flexible Split Engine" />
                </div>
                <div className="max-md:!order-1">
                  <p style={{ fontFamily: F.sans, fontSize: '13px', color: C.secondary, margin: '0 0 12px 0', letterSpacing: '0.08em' }}>{feat.number}</p>
                  <h3 style={{ fontFamily: F.editorial, fontSize: 'clamp(24px, 2.5vw, 32px)', color: C.primary, margin: '0 0 24px 0', lineHeight: 1.2, fontWeight: 400 }}>{feat.name}</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {feat.bullets.map((b, bi) => (
                      <li key={bi} style={{ fontFamily: F.sans, fontSize: '17px', color: C.primary, lineHeight: 1.7, paddingLeft: '20px', position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0, color: C.secondary }}>·</span>{b}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <>
                <div>
                  <p style={{ fontFamily: F.sans, fontSize: '13px', color: C.secondary, margin: '0 0 12px 0', letterSpacing: '0.08em' }}>{feat.number}</p>
                  <h3 style={{ fontFamily: F.editorial, fontSize: 'clamp(24px, 2.5vw, 32px)', color: C.primary, margin: '0 0 24px 0', lineHeight: 1.2, fontWeight: 400 }}>{feat.name}</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {feat.bullets.map((b, bi) => (
                      <li key={bi} style={{ fontFamily: F.sans, fontSize: '17px', color: C.primary, lineHeight: 1.7, paddingLeft: '20px', position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0, color: C.secondary }}>·</span>{b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div><ScreenPlaceholder text={feat.name} /></div>
              </>
            )}
          </div>
        ))}
      </StaggerCards>
    </section>
  );
}

function UsabilityTesting() {
  const stats = [
    { number: '96%', label: 'Task Completion' },
    { number: '5', label: 'Participants' },
    { number: '8', label: 'Tasks Tested' },
    { number: '1.6', label: 'Avg. Difficulty (out of 7)' },
  ];
  const insights = [
    'The task completion rate was the highest across all four projects: 96%. The feature\'s logic closely mirrored how users already mentally modelled shared bills, so the flows required minimal explanation.',
    'The dashboard "10-second glance" concept was validated. Participants could determine the current settlement status of all shared bills within seconds of opening the tab, without needing to tap into any individual bills.',
    'The neutral reminder framing resonated strongly. Participants explicitly contrasted it with how payment requests on other platforms felt, noting that the AXS approach felt like a shared calendar reminder, not a debt call.',
    'Two participants wanted a way to add a note or context to a split, particularly for irregular expenses where the reason for the amount mattered. A note field was added to the split configuration screen in the revision.',
  ];
  return (
    <section style={{ backgroundColor: C.statsBg, padding: '80px', paddingTop: '80px', paddingBottom: '80px' }} className="max-md:!px-6 max-md:!py-16 max-lg:!px-10 max-lg:!py-14">
      <SectionLabel text="Usability Testing" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px', marginBottom: '64px' }} className="max-md:!grid-cols-2 max-md:!gap-8 max-lg:!grid-cols-2 max-lg:!gap-8">
        {stats.map((s) => (
          <div key={s.label}>
            <p style={{ fontFamily: F.editorial, fontSize: 'clamp(42px, 5vw, 64px)', color: C.primary, margin: '0 0 8px 0', lineHeight: 1, letterSpacing: '-0.02em', fontWeight: 400 }}>{s.number}</p>
            <p style={{ fontFamily: F.sans, fontSize: '14px', color: C.secondary, margin: 0, lineHeight: 1.4 }}>{s.label}</p>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '800px' }}>
        {insights.map((insight, i) => (
          <p key={i} style={{ fontFamily: F.sans, fontSize: '17px', color: C.primary, lineHeight: 1.7, margin: 0 }}>{insight}</p>
        ))}
      </div>
    </section>
  );
}

function Iterations() {
  const issues = [
    {
      label: 'Split Configuration Clarity',
      problem: 'The split options screen showed percentage, amount, and custom as equal options with no hierarchy. Participants were confused about what "custom" meant and hesitated before selecting.',
      solution: 'Restructured split options with 50/50 as the prominent default, and other options revealed progressively. Each option now includes a brief example to clarify how it works in practice.',
    },
    {
      label: 'Settlement Confirmation State',
      problem: 'After completing a settlement, the confirmation screen disappeared immediately and the bill returned to its normal state. Two participants weren\'t sure if the payment had gone through.',
      solution: 'Added a persistent "settled" badge to the bill card for 24 hours after settlement, and improved the confirmation animation to feel more definitive. A settlement notification is sent to both parties.',
    },
    {
      label: 'Expense Note Field',
      problem: 'For irregular expenses like a shared dinner or a one-off repair, participants wanted to attach context to the amount, but there was no way to add a note.',
      solution: 'Added an optional note field to all expense entries, visible to both parties on the bill detail screen. Notes are also included in settlement history for reference.',
    },
  ];
  return (
    <section style={{ backgroundColor: C.bg, padding: '80px', paddingTop: '80px', paddingBottom: '80px' }} className="max-md:!px-6 max-md:!py-16 max-lg:!px-10 max-lg:!py-14">
      <SectionLabel text="Top Issues & Iterations" />
      <h2 className="cs-section-header">What Changed & Why</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
        {issues.map((issue) => (
          <div key={issue.label}>
            <p className="cs-category-label">{issue.label}</p>
            <p className="cs-body-text" style={{ margin: '0 0 40px 0', maxWidth: '680px' }}>{issue.problem}</p>
            <BeforeAfter
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '40px' }}
              className="max-md:!grid-cols-1 max-md:!gap-8 max-lg:!grid-cols-1 max-lg:!gap-8"
              before={<ScreenPlaceholder label="Before" text="Before" />}
              after={<ScreenPlaceholder label="After" text="After" />}
            />
            <p className="cs-body-text" style={{ maxWidth: '680px' }}>{issue.solution}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Impact() {
  const outcomes = [
    { title: 'Friction Model Validated', desc: 'The core hypothesis, that shared billing creates friction because of ambiguity, not money, was confirmed by every participant. Clarity, not reminders, was the solution.' },
    { title: '3 Key Flows Iterated', desc: 'Split configuration, settlement confirmation, and expense context were all meaningfully improved based on observed testing behaviour.' },
    { title: 'Trust in Existing Infrastructure', desc: 'Building on AXS\'s existing payment trust proved to be a significant design advantage. Participants felt no hesitation about the payment step, only about the split logic, which testing resolved.' },
  ];
  return (
    <section style={{ backgroundColor: C.bg, padding: '80px', paddingTop: '100px', paddingBottom: '100px', textAlign: 'center' }} className="max-md:!px-6 max-md:!py-20 max-lg:!px-10">
      <AnimatedQuote style={{ fontFamily: F.editorial, fontStyle: 'italic', fontSize: 'clamp(24px, 3.5vw, 40px)', color: C.primary, margin: '0 auto 48px auto', lineHeight: 1.35, maxWidth: '900px', letterSpacing: '-0.01em', fontWeight: 400, paddingTop: '4px', paddingBottom: '4px' }}>
        "I can already see us using this. It would take all the awkwardness out of the conversation."
      </AnimatedQuote>
      <p style={{ fontFamily: F.sans, fontSize: '13px', color: C.secondary, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 auto 64px auto' }}>Usability Test Participant</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px', textAlign: 'left', maxWidth: '960px', margin: '0 auto' }} className="max-md:!grid-cols-1 max-lg:!grid-cols-1">
        {outcomes.map((o) => (
          <div key={o.title}>
            <h4 style={{ fontFamily: F.editorial, fontSize: '20px', color: C.primary, margin: '0 0 12px 0', lineHeight: 1.3, fontWeight: 400 }}>{o.title}</h4>
            <p style={{ fontFamily: F.sans, fontSize: '17px', color: C.secondary, margin: 0, lineHeight: 1.7 }}>{o.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Reflections() {
  const cards = [
    { number: '01', title: 'Feature vs. Product', body: "Designing a feature within an existing product required a different mindset than a greenfield app. Constraints from the existing AXS design system were both limiting and clarifying, forcing the feature to integrate, not compete." },
    { number: '02', title: 'Group Beyond Couples', body: "The design focused on two-person households, but the split logic clearly extends to flatmates, families, and larger groups. A subsequent version would need to handle multi-party splits without the interface becoming complex." },
    { number: '03', title: 'Regulatory Considerations', body: "Any feature handling payment reimbursement within a financial app carries regulatory implications. A production version would require closer collaboration with compliance teams from the earliest design stage." },
    { number: '04', title: 'Behavioural Stickiness', body: "The feature is most valuable when it becomes a habit, opening the shared tab before paying a bill rather than after. Onboarding design and early-session prompts would be critical to establishing that behaviour." },
  ];
  return (
    <section style={{ backgroundColor: C.statsBg, padding: '80px', paddingTop: '80px', paddingBottom: '80px' }} className="max-md:!px-6 max-md:!py-16 max-lg:!px-10 max-lg:!py-14">
      <SectionLabel text="Reflections & Next Steps" />
      <StaggerCards style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="max-md:!grid-cols-1">
        {cards.map((card) => (
          <div key={card.number} style={{ border: `1px solid ${C.cardBorder}`, padding: '24px' }}>
            <p style={{ fontFamily: F.sans, fontSize: '13px', color: C.secondary, margin: '0 0 16px 0', letterSpacing: '0.08em' }}>{card.number}</p>
            <h3 style={{ fontFamily: F.editorial, fontSize: '22px', color: C.primary, margin: '0 0 14px 0', lineHeight: 1.3, fontWeight: 400 }}>{card.title}</h3>
            <p style={{ fontFamily: F.sans, fontSize: '15px', color: C.secondary, margin: 0, lineHeight: 1.6 }}>{card.body}</p>
          </div>
        ))}
      </StaggerCards>
    </section>
  );
}

function PrototypeCTA() {
  return (
    <section style={{ backgroundColor: C.problemBg, padding: '80px', textAlign: 'left' }} className="max-md:!px-6 max-md:!py-16 max-lg:!px-10 max-lg:!py-14">
      <h2 style={{ fontFamily: F.editorial, fontSize: 'clamp(32px, 4.5vw, 52px)', color: C.primary, margin: '0 0 20px 0', lineHeight: 1.1, letterSpacing: '-0.02em', fontWeight: 400 }}>Experience the Billing Feature.</h2>
      <p style={{ fontFamily: F.sans, fontSize: '17px', color: C.secondary, margin: '0 0 32px 0', lineHeight: 1.7, maxWidth: '580px' }}>
        Explore the full interactive prototype: shared dashboards, flexible splits, and one-tap settlement in action.
      </p>
      <a href="#" style={{ fontFamily: F.sans, fontSize: '17px', color: C.primary, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', borderBottom: `1px solid ${C.border}`, paddingBottom: '4px' }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = C.primary)}
        onMouseLeave={e => (e.currentTarget.style.borderColor = C.border)}>
        Open Prototype
      </a>
    </section>
  );
}

function NextProject() {
  const navigate = useNavigate();
  return (
    <section
      style={{ backgroundColor: C.bg, padding: '80px', borderTop: `1px solid #1A1A1A`, display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'column', cursor: 'pointer' }}
      className="max-md:!px-6 max-md:!items-start max-lg:!px-10"
      onClick={() => navigate('/tripsync')}
    >
      <p style={{ fontFamily: F.sans, fontSize: '13px', color: C.secondary, letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 12px 0' }}>Back to First Project</p>
      <p style={{ fontFamily: F.editorial, fontSize: 'clamp(28px, 3.5vw, 42px)', color: C.primary, margin: 0, letterSpacing: '-0.01em', lineHeight: 1.1, fontWeight: 400 }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
        TripSync
      </p>
    </section>
  );
}

export function AXSPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div style={{ backgroundColor: C.bg, minHeight: '100vh', '--accent-color': '#4296CE' } as React.CSSProperties}>
      <Navigation showBack />
      <CaseStudyHero />
      <FadeUp><StatsStrip /></FadeUp>
      <FadeUp><ProblemStatement /></FadeUp>
      <FadeUp><ResearchFindings /></FadeUp>
      <FadeUp><DesignDecisions /></FadeUp>
      <FadeUp><UsabilityTesting /></FadeUp>
      <FadeUp><Iterations /></FadeUp>
      <FadeUp><Impact /></FadeUp>
      <FadeUp><Reflections /></FadeUp>
      <FadeUp><PrototypeCTA /></FadeUp>
      <FadeUp><NextProject /></FadeUp>
    </div>
  );
}