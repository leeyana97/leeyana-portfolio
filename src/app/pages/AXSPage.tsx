import { motion } from 'motion/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Navigation } from '../components/Navigation';
import { PasswordGate } from '../components/PasswordGate';
import { CaseStudySidebar, type SidebarItem } from '../components/CaseStudySidebar';
import { FadeUp, StaggerCards, AnimatedQuote, AnimatedLine, staggerContainer, fadeUpItem, ease } from '../components/Animate';

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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: '260px' }}>
        {label && <span style={{ display: 'block', textAlign: 'center', fontFamily: F.sans, fontSize: '13px', color: C.secondary, marginBottom: '10px' }}>{label}</span>}
        <div
          style={{
            position: 'relative',
            width: '100%',
            padding: '11px',
            background: 'linear-gradient(135deg, #45464A 0%, #2E2F33 50%, #1E1F22 100%)',
            borderRadius: '46px',
            boxShadow:
              'inset 0 0 0 1.5px rgba(255,255,255,0.08), inset 0 0 0 3.5px #0a0a0a, 0 12px 32px rgba(0,0,0,0.5)',
            opacity,
          }}
        >
          <div style={{ position: 'absolute', right: '-2px', top: '24%', width: '3px', height: '17%', background: 'linear-gradient(180deg, #55565A 0%, #3A3B3F 50%, #25262A 100%)', borderRadius: '1px 2px 2px 1px', zIndex: 0 }} />
          <div style={{ position: 'absolute', left: '-2px', top: '14%', width: '3px', height: '6%', background: 'linear-gradient(180deg, #55565A 0%, #3A3B3F 50%, #25262A 100%)', borderRadius: '2px 1px 1px 2px', zIndex: 0 }} />
          <div style={{ position: 'absolute', left: '-2px', top: '23%', width: '3px', height: '9%', background: 'linear-gradient(180deg, #55565A 0%, #3A3B3F 50%, #25262A 100%)', borderRadius: '2px 1px 1px 2px', zIndex: 0 }} />
          <div style={{ position: 'absolute', left: '-2px', top: '34%', width: '3px', height: '9%', background: 'linear-gradient(180deg, #55565A 0%, #3A3B3F 50%, #25262A 100%)', borderRadius: '2px 1px 1px 2px', zIndex: 0 }} />
          <div style={{ position: 'relative', width: '100%', aspectRatio: '9 / 19.5', backgroundColor: '#161616', border: `1px solid ${C.cardBorder}`, borderRadius: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', zIndex: 1 }}>
            <div style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', width: '32%', height: '20px', backgroundColor: '#000', borderRadius: '14px', zIndex: 3 }} />
            <p style={{ fontFamily: F.editorial, fontSize: '15px', color: C.secondary, textAlign: 'center', padding: '20px', lineHeight: 1.4, margin: 0 }}>
              {text || 'AXS · Vault Feature'}
            </p>
          </div>
        </div>
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
          AXS · Vault Feature
        </span>
      </motion.div>
      <motion.div variants={staggerContainer} initial="hidden" animate="show" style={{ marginTop: '60px' }}>
        <motion.h1 variants={fadeUpItem} style={{ fontFamily: F.editorial, fontSize: 'clamp(42px, 7vw, 96px)', color: C.primary, margin: '0 0 20px 0', lineHeight: 0.95, letterSpacing: '-0.02em', fontWeight: 400 }}>
          AXS · Vault
        </motion.h1>
        <motion.p variants={fadeUpItem} style={{ fontFamily: F.sans, fontSize: 'clamp(17px, 2vw, 20px)', color: C.secondary, margin: '0 0 24px 0', lineHeight: 1.5 }}>
          Designing a Unified Bill Management Feature for First Jobbers and Young Couples
        </motion.p>
        <motion.p variants={fadeUpItem} style={{ fontFamily: F.sans, fontSize: '14px', color: C.secondary, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
          Duration: 2 Weeks&nbsp;&nbsp;·&nbsp;&nbsp;Tools: Figma, Claude AI&nbsp;&nbsp;·&nbsp;&nbsp;Platform: iOS App&nbsp;&nbsp;·&nbsp;&nbsp;Feature Addition&nbsp;&nbsp;·&nbsp;&nbsp;Collaboration
        </motion.p>
      </motion.div>
    </section>
  );
}

function StatsStrip() {
  const stats = [
    { number: '2', label: 'Weeks · Duration' },
    { number: '5', label: 'Users Tested' },
    { number: '6', label: 'Tasks Tested' },
    { number: '3', label: 'User Personas' },
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
    { title: 'No Structured Bill Handover', desc: 'First jobbers inherit bills from parents through verbal handoffs and password-sharing, with no structured way to take over accounts.' },
    { title: 'Hidden Visibility Mismatch', desc: "Couples don't want a joint account app, but they need both partners to see what's been paid — leading to double payments and awkward catch-ups." },
    { title: 'Manual Tracking Across Apps', desc: 'The household bill handler tracks everything across spreadsheets, calendar reminders, and 4–6 separate biller apps every month.' },
    { title: 'Failures Discovered Too Late', desc: 'Missed payments, GIRO failures, and duplicate payments are only discovered after the fact through SMS alerts or casual conversation.' },
  ];
  return (
    <section style={{ backgroundColor: C.problemBg, padding: '80px', paddingTop: '80px', paddingBottom: '80px' }} className="max-md:!px-6 max-md:!py-16 max-lg:!px-10 max-lg:!py-14">
      <h2 className="cs-section-header">The Problem.</h2>
      <p style={{ fontFamily: F.sans, fontSize: '17px', color: C.primary, lineHeight: 1.7, margin: '0 0 48px 0', maxWidth: '720px' }}>
        First jobbers and young couples in Singapore manage household bills through fragmented, informal systems — verbal handoffs, spreadsheets, scattered biller apps, and memory. AXS already handles bill payments, but offers no way to see what's been paid across a household, inherit bills from parents, or share visibility with a partner without changing who pays what.
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
    { title: 'Perception Problem', desc: 'AXS is associated with physical kiosks and an older generation — not with the apps young users pay bills through today.' },
    { title: 'Notifications as Safety Net', desc: 'Users relied on reminders to know when bills are due. Whichever app reminds them tends to be the app they pay through.' },
    { title: 'Habit Formation', desc: "First jobbers don't stick around long enough to discover features. The first session has to feel effortless and useful, or they're gone." },
    { title: 'Hidden Visibility Mismatch', desc: "Couples manage bills informally. They don't want a joint account app — they want both partners to see what's been paid without changing who pays what." },
    { title: 'Failed Silent Payments', desc: "When one partner can't see what the other has paid, bills get paid twice or missed — creating awkward catch-ups and admin to chase refunds." },
  ];
  // Per-note colour + rotation: five dark tints (brown, teal, purple, red,
  // blue), each with a matching tape colour and a slight rotation.
  const noteStyles = [
    { from: '#2A2520', to: '#1E1B17', tape: 'rgba(190, 150, 100, 0.5)', rot: '-1.5deg' },
    { from: '#1C2A28', to: '#141E1C', tape: 'rgba(90, 185, 170, 0.5)',  rot: '0.8deg'  },
    { from: '#251F2E', to: '#1A1622', tape: 'rgba(160, 120, 200, 0.5)', rot: '-0.6deg' },
    { from: '#2C1E1E', to: '#1F1515', tape: 'rgba(200, 95, 95, 0.5)',   rot: '1.2deg'  },
    { from: '#1C2230', to: '#141923', tape: 'rgba(95, 135, 205, 0.5)',  rot: '-1.0deg' },
  ];
  return (
    <section style={{ backgroundColor: C.bg, padding: '80px', paddingTop: '80px', paddingBottom: '80px' }} className="max-md:!px-6 max-md:!py-16 max-lg:!px-10 max-lg:!py-14">
      <SectionLabel text="Research Findings" />
      <StaggerCards style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px' }} className="max-md:!grid-cols-1 max-lg:!grid-cols-2">
        {findings.map((f, i) => {
          const s = noteStyles[i % noteStyles.length];
          return (
            <div key={f.title}>
              <div
                className="sticky-note"
                style={{
                  '--note-from': s.from,
                  '--note-to': s.to,
                  '--note-tape': s.tape,
                  '--note-rot': s.rot,
                } as React.CSSProperties}
              >
                <p className="sticky-note__num">0{i + 1}</p>
                <h3 className="sticky-note__title">{f.title}</h3>
                <p className="sticky-note__body">{f.desc}</p>
              </div>
            </div>
          );
        })}
      </StaggerCards>
    </section>
  );
}

function DesignDecisions() {
  const statements = [
    {
      number: '01',
      persona: 'For the First Jobber',
      personaTag: 'The Transitioner',
      body: 'First jobbers inheriting household bills get every biller set up, tracked, and paid on time by combining snap-and-inherit capture, a unified bill dashboard, and a frictionless first-session onboarding.',
    },
    {
      number: '02',
      persona: 'For the Delegator',
      personaTag: 'The Delegator',
      body: 'The delegator of the household can stay informed about household bills without taking over the workload through an opt-in shared visibility layer and pre-payment duplicate checks that show when a bill was paid and by whom.',
    },
    {
      number: '03',
      persona: 'For the Household CFO',
      personaTag: 'The Household CFO',
      body: 'The household CFO can stop tracking across spreadsheets and biller apps by setting up each bill once and seeing what’s paid and pending in one dashboard.',
    },
  ];
  return (
    <section style={{ backgroundColor: C.bg, padding: '80px', paddingTop: '80px', paddingBottom: '80px' }} className="max-md:!px-6 max-md:!py-16 max-lg:!px-10 max-lg:!py-14">
      <SectionLabel text="Solution Statements" />
      <p style={{ fontFamily: F.sans, fontSize: '17px', color: C.primary, lineHeight: 1.7, margin: '0 0 56px 0', maxWidth: '720px' }}>
        Vault is anchored around three user personas. Each statement names the persona it serves and the specific Vault behaviour that addresses their need.
      </p>
      <StaggerCards style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {statements.map((s) => (
          <div
            key={s.number}
            style={{
              border: `1px solid ${C.cardBorder}`,
              padding: '40px',
              display: 'grid',
              gridTemplateColumns: '120px 1fr',
              gap: '40px',
              alignItems: 'start',
            }}
            className="max-md:!grid-cols-1 max-md:!gap-6 max-md:!p-7"
          >
            <div>
              <p style={{ fontFamily: F.sans, fontSize: '13px', color: C.secondary, margin: '0 0 12px 0', letterSpacing: '0.08em' }}>{s.number}</p>
              <p style={{ fontFamily: F.sans, fontSize: '12px', color: C.secondary, margin: 0, letterSpacing: '0.1em', textTransform: 'uppercase', lineHeight: 1.4 }}>{s.personaTag}</p>
            </div>
            <div>
              <h3 style={{ fontFamily: F.editorial, fontSize: 'clamp(22px, 2.4vw, 30px)', color: C.primary, margin: '0 0 16px 0', lineHeight: 1.25, fontWeight: 400 }}>{s.persona}</h3>
              <p style={{ fontFamily: F.sans, fontSize: '17px', color: C.primary, lineHeight: 1.7, margin: 0 }}>{s.body}</p>
            </div>
          </div>
        ))}
      </StaggerCards>
    </section>
  );
}

function UsabilityTesting() {
  const planRows = [
    { label: 'Participants', value: '5 (2 first jobbers, 3 young couples)' },
    { label: 'Environment', value: "Online testing on participant's own device" },
    { label: 'Data Collected', value: 'Success rate, Ease of Use rating (1 = very easy, 5 = very difficult), post-test questions, observation' },
  ];
  const workshopRows = [
    { task: 'Task 1', desc: 'First-time use', rating: '2.8' },
    { task: 'Task 2', desc: 'Add personal bill', rating: '2.7' },
    { task: 'Task 3', desc: 'Add household bills', rating: '2.4' },
    { task: 'Task 4', desc: 'Share with family', rating: '2.1' },
    { task: 'Task 5', desc: 'Pay via Vault', rating: '1.9' },
  ];
  const workshopIssues = [
    { title: 'Folder-first is unintuitive', desc: 'Users expected to see existing bills first, then file them — not build empty folders.' },
    { title: 'Mental model: file, don’t create', desc: 'Users expected to have a document or bill first and drag it to a folder. Camera function also felt hidden.' },
    { title: 'Multi-select is missing', desc: 'Adding bills one-by-one is tedious. Users want checkbox/multi-select and bulk-add from My Favourites.' },
    { title: 'Sharing needs more channels', desc: 'Email-only feels limiting. Users want shareable links, multiple invitees at once, and at-a-glance view of who a folder is shared with.' },
    { title: 'Payment doesn’t belong here', desc: 'Vault reads as storage. Existing users default to My Favourites for payment.' },
  ];
  const resultStats = [
    { number: '6', label: 'Tasks Tested' },
    { number: '5', label: 'Participants' },
    { number: '3 / 5', label: 'Overall Ease of Use' },
  ];
  return (
    <section style={{ backgroundColor: C.statsBg, padding: '80px', paddingTop: '80px', paddingBottom: '80px' }} className="max-md:!px-6 max-md:!py-16 max-lg:!px-10 max-lg:!py-14">
      <SectionLabel text="Usability Testing" />

      {/* Test Plan */}
      <h3 style={{ fontFamily: F.editorial, fontSize: 'clamp(22px, 2.4vw, 30px)', color: C.primary, margin: '0 0 24px 0', lineHeight: 1.25, fontWeight: 400 }}>Test Plan</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '64px' }} className="max-md:!grid-cols-1">
        {planRows.map((r) => (
          <div key={r.label} style={{ border: `1px solid ${C.cardBorder}`, padding: '24px' }}>
            <p style={{ fontFamily: F.sans, fontSize: '12px', color: C.secondary, margin: '0 0 10px 0', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{r.label}</p>
            <p style={{ fontFamily: F.sans, fontSize: '15px', color: C.primary, margin: 0, lineHeight: 1.6 }}>{r.value}</p>
          </div>
        ))}
      </div>

      {/* Design Feedback Workshop */}
      <h3 style={{ fontFamily: F.editorial, fontSize: 'clamp(22px, 2.4vw, 30px)', color: C.primary, margin: '0 0 16px 0', lineHeight: 1.25, fontWeight: 400 }}>Design Feedback Workshop Results</h3>
      <p style={{ fontFamily: F.sans, fontSize: '15px', color: C.secondary, lineHeight: 1.7, margin: '0 0 28px 0', maxWidth: '720px' }}>
        Before the formal usability test, the team ran a design feedback workshop with 5 tasks. Ease of Use ratings used a 1–5 scale (1 = Very Easy, 5 = Very Difficult).
      </p>
      <div style={{ border: `1px solid ${C.cardBorder}`, marginBottom: '32px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: F.sans, fontSize: '15px', color: C.primary, minWidth: '480px' }}>
          <thead>
            <tr style={{ backgroundColor: '#1A1A1A' }}>
              <th style={{ textAlign: 'left', padding: '16px 20px', fontWeight: 500, color: C.secondary, letterSpacing: '0.06em', textTransform: 'uppercase', fontSize: '12px', borderBottom: `1px solid ${C.cardBorder}` }}>Task</th>
              <th style={{ textAlign: 'left', padding: '16px 20px', fontWeight: 500, color: C.secondary, letterSpacing: '0.06em', textTransform: 'uppercase', fontSize: '12px', borderBottom: `1px solid ${C.cardBorder}` }}>Description</th>
              <th style={{ textAlign: 'right', padding: '16px 20px', fontWeight: 500, color: C.secondary, letterSpacing: '0.06em', textTransform: 'uppercase', fontSize: '12px', borderBottom: `1px solid ${C.cardBorder}` }}>Rating</th>
            </tr>
          </thead>
          <tbody>
            {workshopRows.map((r, idx) => (
              <tr key={r.task} style={{ borderBottom: idx < workshopRows.length - 1 ? `1px solid ${C.cardBorder}` : 'none' }}>
                <td style={{ padding: '16px 20px', color: C.primary }}>{r.task}</td>
                <td style={{ padding: '16px 20px', color: C.primary }}>{r.desc}</td>
                <td style={{ padding: '16px 20px', textAlign: 'right', fontFamily: F.editorial, fontSize: '18px', color: C.primary }}>{r.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ fontFamily: F.sans, fontSize: '14px', color: C.secondary, margin: '0 0 20px 0', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Top issue from each task</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '64px' }} className="max-md:!grid-cols-1">
        {workshopIssues.map((issue, i) => (
          <div key={issue.title} style={{ border: `1px solid ${C.cardBorder}`, padding: '20px' }}>
            <p style={{ fontFamily: F.sans, fontSize: '12px', color: C.secondary, margin: '0 0 10px 0', letterSpacing: '0.08em' }}>0{i + 1}</p>
            <p style={{ fontFamily: F.sans, fontSize: '15px', color: C.primary, margin: '0 0 8px 0', fontWeight: 500 }}>{issue.title}</p>
            <p style={{ fontFamily: F.sans, fontSize: '14px', color: C.secondary, margin: 0, lineHeight: 1.6 }}>{issue.desc}</p>
          </div>
        ))}
      </div>

      {/* Usability Test Results */}
      <h3 style={{ fontFamily: F.editorial, fontSize: 'clamp(22px, 2.4vw, 30px)', color: C.primary, margin: '0 0 24px 0', lineHeight: 1.25, fontWeight: 400 }}>Usability Test Results</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px', marginBottom: '40px' }} className="max-md:!grid-cols-1 max-md:!gap-8">
        {resultStats.map((s) => (
          <div key={s.label}>
            <p style={{ fontFamily: F.editorial, fontSize: 'clamp(42px, 5vw, 64px)', color: C.primary, margin: '0 0 8px 0', lineHeight: 1, letterSpacing: '-0.02em', fontWeight: 400 }}>{s.number}</p>
            <p style={{ fontFamily: F.sans, fontSize: '14px', color: C.secondary, margin: 0, lineHeight: 1.4 }}>{s.label}</p>
          </div>
        ))}
      </div>
      <p style={{ fontFamily: F.sans, fontSize: '17px', color: C.primary, lineHeight: 1.7, margin: 0, maxWidth: '800px' }}>
        Users navigated quickly through Tasks 2 and 3 but penalised the overall rating because Tasks 5 and 6 broke the flow for them. One user brought the rating up to 4/5 because of the steep learning curve on first use and the confusion about navigating to a separate Pay Bills section to actually make payment.
      </p>
    </section>
  );
}

function Iterations() {
  const issues = [
    {
      label: 'Vault Onboarding Discoverability',
      task: "Task 1 — You've just opened the app. Show me what's new that you'd want to explore.",
      successRate: '2/5 (40%)',
      problem: 'Multiple users skipped past the Vault onboarding pop-up because it looked like an advertisement, which meant they didn’t recognise Vault as the new feature.',
      solution: 'Added a red "New" tag to the Vault tab in the bottom navigation so the feature stands out at first glance, even if users dismiss the introductory pop-up. The tag is dismissed automatically after the user’s first interaction with Vault.',
    },
    {
      label: 'Due Date Visibility',
      task: 'Task 4 — Your bills are all in Vault. Show me how you’d find out what’s due.',
      successRate: '1/5 (20%)',
      problem: 'The calendar icon’s purpose isn’t clear. Users found due dates via bill-card status indicators but rarely noticed the calendar at the top of Vault.',
      solution: 'Replaced the plain calendar icon with a calendar-plus-clock to better signal "upcoming due dates." Surfaced the next upcoming due bill on the My Vault home page with a "View all" button. Added a sync icon inside the calendar to connect with Google, iPhone, and other external calendars.',
    },
    {
      label: 'Single Bill Sharing',
      task: 'Task 5 — Your son just started his first job and can take over his Singtel bill. Show me how you’d hand it over to him in Vault.',
      successRate: '2/5 (40%)',
      problem: 'There is no way to share a single bill directly. Users have to create a new folder, move the bill in, then share the folder. This felt unintuitive and over-engineered for a one-bill share.',
      solution: 'Allowed users to share individual bills directly rather than requiring them to create a folder first. Folder sharing remains available for grouping multiple bills.',
    },
    {
      label: 'Payment Flow After Handover',
      task: 'Task 6 — You’re now the son — your parent has just sent you a Singtel bill through Vault. Show me how you’d take it over and pay it.',
      successRate: '1/5 (20%)',
      problem: 'The handover experience breaks down at the point of payment. Once a shared bill is accepted, users have no clear in-Vault action to complete it, and must navigate away to Pay Bills and rebuild the transaction manually.',
      solution: 'Added a grey helper note inside each bill detail page: "To make repayment, refer to the details above and go to Pay Bills or My Favourites." This bridges users to the existing payment flow without reworking the payment architecture.',
    },
  ];
  return (
    <section style={{ backgroundColor: C.bg, padding: '80px', paddingTop: '80px', paddingBottom: '80px' }} className="max-md:!px-6 max-md:!py-16 max-lg:!px-10 max-lg:!py-14">
      <SectionLabel text="Top Issues & Iterations" />
      <h2 className="cs-section-header">What Changed & Why</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
        {issues.map((issue, i) => {
          const mockLeft = i % 2 === 1;
          return (
            <div
              key={issue.label}
              style={i > 0 ? { borderTop: `1px solid ${C.cardBorder}`, paddingTop: '80px' } : undefined}
            >
              <div
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'start' }}
                className="max-md:!grid-cols-1 max-md:!gap-10 max-lg:!grid-cols-1 max-lg:!gap-10"
              >
                <div className={mockLeft ? 'lg:order-2' : undefined}>
                  <p className="cs-category-label">{issue.label}</p>
                  <p style={{ fontFamily: F.sans, fontSize: '14px', color: C.secondary, lineHeight: 1.6, margin: '0 0 8px 0', fontStyle: 'italic' }}>{issue.task}</p>
                  <p style={{ fontFamily: F.sans, fontSize: '13px', color: C.secondary, margin: '0 0 20px 0', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    Success rate: <span style={{ color: C.primary }}>{issue.successRate}</span>
                  </p>
                  <p className="cs-body-text" style={{ margin: '0 0 16px 0' }}>{issue.problem}</p>
                  <p className="cs-body-text" style={{ margin: 0 }}>{issue.solution}</p>
                </div>
                <div
                  className={mockLeft ? 'lg:order-1' : undefined}
                  style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignItems: 'start' }}
                >
                  <ScreenPlaceholder label="Before" text="Before" />
                  <ScreenPlaceholder label="After" text="After" />
                </div>
              </div>
            </div>
          );
        })}
        <div style={{ borderTop: `1px solid ${C.cardBorder}`, paddingTop: '60px' }}>
          <p className="cs-category-label">Other Iteration — History Repositioned</p>
          <p className="cs-body-text" style={{ margin: 0, maxWidth: '780px' }}>
            Based on the understanding that History is a key, high-usage feature, repositioned it onto the home page alongside My Favourites, Pay Bills, Pay Fines, Top Up, and eServices for seamless transaction verification immediately after payment.
          </p>
        </div>
      </div>
    </section>
  );
}

function Impact() {
  const outcomes = [
    { title: 'Vault Perception Gap Identified', desc: 'Users see Vault as storage, not payment — closing the loop between viewing and paying would unlock AXS’s full value.' },
    { title: '4 Key Flows Iterated', desc: 'Onboarding, due date visibility, bill sharing, and post-handover payment all received targeted improvements based on test data.' },
    { title: 'Brand Repositioning Opportunity', desc: 'Many young users don’t realise AXS removes the need to log into each biller’s app — surfacing this through onboarding could reshape how the next generation sees the brand.' },
  ];
  return (
    <section style={{ backgroundColor: C.bg, padding: '80px', paddingTop: '100px', paddingBottom: '100px', textAlign: 'center' }} className="max-md:!px-6 max-md:!py-20 max-lg:!px-10">
      <AnimatedQuote style={{ fontFamily: F.editorial, fontStyle: 'italic', fontSize: 'clamp(24px, 3.5vw, 40px)', color: C.primary, margin: '0 auto 48px auto', lineHeight: 1.35, maxWidth: '900px', letterSpacing: '-0.01em', fontWeight: 400, paddingTop: '4px', paddingBottom: '4px' }}>
        "I want to share it with him for that particular bill itself, but it doesn’t seem to have any share button just for one single item over here… I wouldn’t know how to do it."
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
    { number: '01', title: 'Storage vs. Payment', body: "Vault is currently structured as a storage feature, but users perceive AXS as a payment platform. Closing the loop between viewing a bill in Vault and paying it through AXS would align the feature with the user's actual goal — and unlock the full value of what AXS already does well." },
    { number: '02', title: "Surfacing AXS's Advantage", body: "Many young users don't realise AXS removes the need to log into each biller's app — surfacing this advantage through onboarding or marketing could reshape how the next generation sees the brand." },
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
      <h2 style={{ fontFamily: F.editorial, fontSize: 'clamp(32px, 4.5vw, 52px)', color: C.primary, margin: '0 0 20px 0', lineHeight: 1.1, letterSpacing: '-0.02em', fontWeight: 400 }}>Experience the Vault Feature.</h2>
      <p style={{ fontFamily: F.sans, fontSize: '17px', color: C.secondary, margin: '0 0 32px 0', lineHeight: 1.7, maxWidth: '580px' }}>
        Explore the full interactive prototype: snap-and-inherit bill capture, the unified Vault dashboard, opt-in shared visibility, and the handover flow in action.
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

const sidebarItems: SidebarItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'problem', label: 'Problem' },
  { id: 'research', label: 'Research' },
  { id: 'design-decisions', label: 'Solution Statements' },
  { id: 'usability-testing', label: 'Usability Testing' },
  { id: 'iterations', label: 'Issues & Changes' },
  { id: 'impact', label: 'Impact' },
  { id: 'reflections', label: 'Reflections' },
];

export function AXSPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <PasswordGate storageKey="axs-unlocked">
    <div style={{ backgroundColor: C.bg, minHeight: '100vh', '--accent-color': '#4296CE' } as React.CSSProperties}>
      <Navigation showBack />
      <div className="cs-layout">
        <CaseStudySidebar items={sidebarItems} />
        <div className="cs-content">
          <div id="overview"><CaseStudyHero /></div>
          <FadeUp><StatsStrip /></FadeUp>
          <FadeUp id="problem"><ProblemStatement /></FadeUp>
          <FadeUp id="research"><ResearchFindings /></FadeUp>
          <FadeUp id="design-decisions"><DesignDecisions /></FadeUp>
          <FadeUp id="usability-testing"><UsabilityTesting /></FadeUp>
          <FadeUp id="iterations"><Iterations /></FadeUp>
          <FadeUp id="impact"><Impact /></FadeUp>
          <FadeUp id="reflections"><Reflections /></FadeUp>
          <FadeUp><PrototypeCTA /></FadeUp>
          <FadeUp><NextProject /></FadeUp>
        </div>
      </div>
    </div>
    </PasswordGate>
  );
}