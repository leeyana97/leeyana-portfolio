import { motion } from 'motion/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Navigation } from '../components/Navigation';
import { FadeUp, StaggerCards, BeforeAfter, AnimatedQuote, AnimatedLine, staggerContainer, fadeUpItem, ease } from '../components/Animate';
import tripsyncImg from '../../imports/Tripsync_home_app.png';
import tripsyncPhone1 from '../../imports/tripsync-phone-1.png';
import tripsyncPhone2 from '../../imports/tripsync-phone-2.png';
import tripsyncPhone3 from '../../imports/tripsync-phone-3-v2.png';
import tripsyncPhone4 from '../../imports/tripsync-phone-4-v3.png';

// Hero showcase: 4 phones layered with staggered reveal. Phone 4 (right,
// held by hand) enters first; phone 1 (left) enters last.
// All phones slide horizontally from the right. Phone 4 — the largest, most
// visually dominant — uses a smaller slide distance, longer duration, and a
// faint starting opacity so it feels like it "settles" rather than pops in.
const PHONE_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
const heroPhones = [
  { id: 1, src: tripsyncPhone1, alt: 'TripSync welcome screen',     height: '90%',  left: '-4%', top: '57%', z: 1, delay: 1.5, initialOpacity: 0,    initialX: 60, duration: 1.2 },
  { id: 2, src: tripsyncPhone2, alt: 'TripSync Bangkok trip',       height: '78%',  left: '6%',  top: '38%', z: 2, delay: 1.0, initialOpacity: 0,    initialX: 60, duration: 1.2 },
  { id: 3, src: tripsyncPhone3, alt: 'TripSync Overlap Dashboard',  height: '86%',  left: '32%', top: '46%', z: 3, delay: 0.5, initialOpacity: 0,    initialX: 60, duration: 1.2 },
  { id: 4, src: tripsyncPhone4, alt: 'TripSync app overview',       height: '168%', left: '65%', top: '52%', z: 4, delay: 0,   initialOpacity: 0.15, initialX: 20, duration: 1.8 },
];

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

// ─── Shared small components ────────────────────────────────────────────────

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

function TagPill({ label }: { label: string }) {
  return (
    <span style={{ fontFamily: F.sans, fontSize: '13px', color: C.secondary, border: `1px solid ${C.cardBorder}`, borderRadius: '20px', padding: '8px 14px', whiteSpace: 'nowrap' }}>
      {label}
    </span>
  );
}

// ─── Screen Mockup placeholder ──────────────────────────────────────────────
function ScreenMockup({ label, opacity = 1 }: { label?: string; opacity?: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
      {label && (
        <span style={{ fontFamily: F.sans, fontSize: '13px', color: C.secondary, alignSelf: 'flex-start' }}>{label}</span>
      )}
      <div
        style={{
          width: '100%',
          maxWidth: '260px',
          aspectRatio: '9 / 19.5',
          overflow: 'hidden',
          borderRadius: '24px',
          opacity,
        }}
      >
        <img
          src={tripsyncImg}
          alt={label || 'TripSync screen'}
          loading="lazy"
          decoding="async"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
        />
      </div>
    </div>
  );
}

// ─── 1. Case Study Hero ─────────────────────────────────────────────────────
function CaseStudyHero() {
  return (
    <section style={{ paddingTop: '120px', paddingBottom: '0', paddingLeft: '80px', paddingRight: '80px', backgroundColor: C.bg }} className="max-md:!px-6 max-md:!pt-24 max-lg:!px-10">
      {/* Layered 4-phone showcase. Each phone slides in from the right and
          fades up, staggered right → left, triggered when the showcase
          enters the viewport. */}
      <div
        style={{
          width: '100%',
          maxWidth: '1280px',
          height: 'clamp(440px, 58vw, 660px)',
          position: 'relative',
          margin: '0 auto',
        }}
      >
        {heroPhones.map((p) => (
          <motion.img
            key={p.id}
            src={p.src}
            alt={p.alt}
            aria-hidden={p.id !== 4}
            initial={{ opacity: p.initialOpacity, x: p.initialX, y: '-50%' }}
            whileInView={{ opacity: 1, x: 0, y: '-50%' }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: p.duration, ease: PHONE_EASE, delay: p.delay }}
            style={{
              position: 'absolute',
              height: p.height,
              left: p.left,
              top: p.top,
              zIndex: p.z,
              width: 'auto',
              objectFit: 'contain',
              display: 'block',
              pointerEvents: 'none',
            }}
          />
        ))}
      </div>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        style={{ marginTop: '60px' }}
      >
        <motion.h1 variants={fadeUpItem} style={{ fontFamily: F.editorial, fontSize: 'clamp(42px, 7vw, 96px)', color: C.primary, margin: '0 0 20px 0', lineHeight: 0.95, letterSpacing: '-0.02em', fontWeight: 400 }}>
          TripSync
        </motion.h1>
        <motion.p variants={fadeUpItem} style={{ fontFamily: F.sans, fontSize: 'clamp(17px, 2vw, 20px)', color: C.secondary, margin: '0 0 24px 0', lineHeight: 1.5 }}>
          A Travel Companion App for Group Trip Planners
        </motion.p>
        <motion.p variants={fadeUpItem} style={{ fontFamily: F.sans, fontSize: '14px', color: C.secondary, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0, display: 'inline-flex', alignItems: 'center', flexWrap: 'wrap', gap: '4px' }}>
          <span>Duration: 2 Weeks&nbsp;&nbsp;·&nbsp;&nbsp;Tools: Figma, Claude AI&nbsp;&nbsp;·&nbsp;&nbsp;Platform:&nbsp;</span>
          <span style={{ fontFamily: F.sans, fontSize: '13px', color: '#4ADE80', border: '1px solid #1B7A4E', backgroundColor: 'rgba(74, 222, 128, 0.06)', borderRadius: '20px', padding: '4px 12px', whiteSpace: 'nowrap', letterSpacing: '0.08em' }}>iOS App</span>
        </motion.p>
      </motion.div>
    </section>
  );
}

// ─── 2. Stats Strip ──────────────────────────────────────────────────────────
function StatsStrip() {
  const stats = [
    { number: '2', label: 'Weeks · Duration' },
    { number: '5', label: 'Users Tested' },
    { number: '100%', label: 'Task Completion' },
    { number: '4', label: 'Core Features' },
  ];
  return (
    <section style={{ backgroundColor: C.statsBg, paddingTop: '60px', paddingBottom: '60px', paddingLeft: '80px', paddingRight: '80px' }} className="max-md:!px-6 max-lg:!px-10">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px' }} className="max-md:!grid-cols-2 max-md:!gap-8 max-lg:!grid-cols-2 max-lg:!gap-8">
        {stats.map((s) => (
          <div key={s.label}>
            <p style={{ fontFamily: F.editorial, fontSize: 'clamp(42px, 5vw, 64px)', color: C.primary, margin: '0 0 8px 0', lineHeight: 1, letterSpacing: '-0.02em', fontWeight: 400 }}>
              {s.number}
            </p>
            <p style={{ fontFamily: F.sans, fontSize: '14px', color: C.secondary, margin: 0, lineHeight: 1.4 }}>
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── 3. Problem Statement ────────────────────────────────────────────────────
function ProblemStatement() {
  const painPoints = [
    { title: 'Scattered Planning', desc: 'Groups bounce between messaging apps, spreadsheets, and booking sites with no single source of truth, creating confusion and missed decisions.' },
    { title: 'No Structured Input', desc: 'Everyone has opinions but no organised way to surface them. The loudest voice tends to win, leaving quieter members disengaged.' },
    { title: 'Slow Group Decisions', desc: 'Without a structured process for reaching consensus, trip decisions can drag on for days, or stall indefinitely.' },
    { title: 'Awkward Opt-Outs', desc: "Telling the group you can't make an activity feels socially difficult. There's no graceful way to opt out without creating tension." },
  ];
  return (
    <section style={{ backgroundColor: C.problemBg, padding: '80px', paddingTop: '80px', paddingBottom: '80px' }} className="max-md:!px-6 max-md:!py-16 max-lg:!px-10 max-lg:!py-14">
      <h2 className="cs-section-header">
        The Problem.
      </h2>
      <p style={{ fontFamily: F.sans, fontSize: '17px', color: C.primary, lineHeight: 1.7, margin: '0 0 48px 0', maxWidth: '720px' }}>
        Planning a group trip sounds exciting, until the WhatsApp thread becomes unmanageable. Preferences clash, decisions stall, and someone always ends up feeling like their voice didn't matter. Existing tools weren't designed for collective decision-making; they were built for individuals. TripSync was designed to bridge that gap: to make planning together feel as easy as planning alone.
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

// ─── 4. Research Findings ────────────────────────────────────────────────────
function ResearchFindings() {
  const findings = [
    {
      title: 'Chaotic Group Coordination',
      desc: "Participants managed trips across fragmented channels: WhatsApp, voice calls, and spreadsheets running in parallel. Nobody had a clear picture of where decisions stood or who was responsible for what.",
    },
    {
      title: 'App Fragmentation',
      desc: 'The average planning process involved switching between 3–5 different tools. Each context switch created friction and risked important information getting lost between platforms.',
    },
    {
      title: 'Flexibility Over Rigidity',
      desc: 'Users consistently wanted to express soft preferences without feeling locked in. Hard commitments early in planning created anxiety and reluctance to engage fully.',
    },
    {
      title: 'AI & Social Already in the Mix',
      desc: "TikTok & Instagram drive destination discovery; ChatGPT helps with itinerary generation but users still manually piece everything together across separate tools.",
    },
    {
      title: 'Unified Platform Demand',
      desc: 'The strongest research signal: users wanted one place that held everything: preferences, itinerary, communication, and bookings, so nothing fell through the cracks.',
    },
  ];
  return (
    <section style={{ backgroundColor: C.bg, padding: '80px', paddingTop: '80px', paddingBottom: '80px' }} className="max-md:!px-6 max-md:!py-16 max-lg:!px-10 max-lg:!py-14">
      <SectionLabel text="Research Findings" />
      <StaggerCards style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }} className="max-md:!grid-cols-1 max-lg:!grid-cols-2">
        {findings.map((f, i) => (
          <div key={f.title} style={{ border: `1px solid ${C.cardBorder}`, padding: '24px' }}>
            <p style={{ fontFamily: F.sans, fontSize: '13px', color: '#2E9461', margin: '0 0 14px 0', letterSpacing: '0.08em' }}>
              0{i + 1}
            </p>
            <h3 style={{ fontFamily: F.editorial, fontSize: '18px', color: C.primary, margin: '0 0 14px 0', lineHeight: 1.3, fontWeight: 400 }}>
              {f.title}
            </h3>
            <p style={{ fontFamily: F.sans, fontSize: '15px', color: C.secondary, margin: 0, lineHeight: 1.6 }}>
              {f.desc}
            </p>
          </div>
        ))}
      </StaggerCards>
    </section>
  );
}

// ─── 4.5 Visual Design System ───────────────────────────────────────────────
function VisualDesignSystem() {
  const swatches = [
    { name: 'Primary Green', hex: '#52B788' },
    { name: 'CTA Green', hex: '#16A34A' },
    { name: 'Purple', hex: '#A78BFA' },
    { name: 'Foreground', hex: '#1A1A1A' },
    { name: 'Muted', hex: '#6B7280' },
    { name: 'Destructive', hex: '#EF4444' },
  ];
  const jakarta = "'Plus Jakarta Sans', 'DM Sans', sans-serif";

  const annotations: Array<{
    label: string;
    side: 'left' | 'right';
    top: string;
    lineLength: number;
  }> = [
    {
      label: 'Calm blue banner for non-blocking guidance, informed by usability testing',
      side: 'left',
      top: '8%',
      lineLength: 80,
    },
    {
      label: 'card-1 elevation with 14px radius for consistency',
      side: 'right',
      top: '42%',
      lineLength: 80,
    },
    {
      label: 'Gradient CTA for primary actions, #15803D to #16A34A',
      side: 'left',
      top: '82%',
      lineLength: 80,
    },
  ];

  return (
    <section style={{ backgroundColor: C.statsBg, padding: '80px', paddingTop: '80px', paddingBottom: '20px' }} className="max-md:!px-6 max-md:!pt-16 max-md:!pb-4 max-lg:!px-10 max-lg:!pt-14 max-lg:!pb-4">
      <SectionLabel text="Visual Design" />
      <h2 className="cs-section-header">
        Visual Design System
      </h2>

      {/* Part 1 — Colour Palette */}
      <div style={{ marginBottom: '80px' }}>
        <p style={{ fontFamily: F.sans, fontSize: '13px', color: C.secondary, letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 24px 0' }}>
          Colour Palette
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '24px' }} className="max-md:!grid-cols-3 max-lg:!grid-cols-3">
          {swatches.map((s) => (
            <div key={s.name} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '12px', backgroundColor: s.hex }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontFamily: F.sans, fontSize: '13px', color: C.primary, lineHeight: 1.3 }}>{s.name}</span>
                <span style={{ fontFamily: F.sans, fontSize: '12px', color: C.secondary, letterSpacing: '0.04em' }}>{s.hex}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Part 2 — Typography Specimen */}
      <div style={{ marginBottom: '0' }}>
        <p style={{ fontFamily: F.sans, fontSize: '13px', color: C.secondary, letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 24px 0' }}>
          Typography
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', borderTop: `1px solid ${C.cardBorder}`, borderBottom: `1px solid ${C.cardBorder}`, padding: '40px 0' }} className="max-md:!grid-cols-1 max-md:!gap-10 max-lg:!grid-cols-1 max-lg:!gap-10">
          <div>
            <p style={{ fontFamily: jakarta, fontWeight: 700, fontSize: 'clamp(36px, 4.5vw, 56px)', color: C.primary, margin: '0 0 16px 0', lineHeight: 1.1, letterSpacing: '-0.01em' }}>
              Plus Jakarta Sans - Bali Getaway
            </p>
            <p style={{ fontFamily: F.sans, fontSize: '14px', color: C.secondary, margin: 0, lineHeight: 1.5 }}>
              Headings: warmth and friendliness at display sizes.
            </p>
          </div>
          <div>
            <p style={{ fontFamily: F.sans, fontWeight: 400, fontSize: 'clamp(20px, 2vw, 24px)', color: C.primary, margin: '0 0 16px 0', lineHeight: 1.5 }}>
              DM Sans. Plan, vote, and explore together.
            </p>
            <p style={{ fontFamily: F.sans, fontSize: '14px', color: C.secondary, margin: 0, lineHeight: 1.5 }}>
              Body text: clean and readable at small sizes.
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}

// ─── 5. Design Decisions ─────────────────────────────────────────────────────
function DesignDecisions() {
  const features = [
    {
      number: '01',
      name: 'Individual Preference Quiz',
      bullets: [
        'Every member privately inputs preferences before the group sees results.',
        'Removes lengthy group discussions to surface what everyone wants.',
        "Ensures no one's preference gets lost in a group chat.",
      ],
      imageFirst: false,
    },
    {
      number: '02',
      name: 'Activity Rating & Shortlist',
      bullets: [
        'Members privately rate activities before results are shared with the planner.',
        'Ratings are aggregated so the planner can see group consensus at a glance.',
        'Planner shortlists based on ratings and can override before confirming.',
      ],
      imageFirst: true,
    },
    {
      number: '03',
      name: 'Opt-Out Feature',
      bullets: [
        'Members flag solo time for specific activities during planning.',
        'Reduces awkward last-minute declines when the group is already committed.',
        'Individual preferences are visible to the whole group without confrontation.',
      ],
      imageFirst: false,
    },
    {
      number: '04',
      name: 'Objection Handling',
      bullets: [
        'Members raise objections directly in the app without group chat confrontation.',
        "Objections are flagged immediately on the planner's view.",
        'Gives the planner clear tools to resolve conflicts without requiring direct confrontation.',
        'Updated itinerary is instantly visible to the whole group once confirmed.',
      ],
      imageFirst: true,
    },
  ];
  return (
    <section style={{ backgroundColor: C.problemBg, padding: '80px', paddingTop: '80px', paddingBottom: '80px' }} className="max-md:!px-6 max-md:!py-16 max-lg:!px-10 max-lg:!py-14">
      <SectionLabel text="Design Decisions" />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr',
          gap: '80px',
          alignItems: 'center',
        }}
        className="max-md:!grid-cols-1 max-md:!gap-12 max-lg:!grid-cols-1 max-lg:!gap-12"
      >
        {/* Overlapping mobile screens */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            minHeight: '560px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          className="max-md:!min-h-[460px]"
        >
          <div
            style={{
              position: 'absolute',
              left: '8%',
              top: '6%',
              width: '58%',
              transform: 'rotate(-4deg)',
              zIndex: 1,
              opacity: 0.85,
            }}
          >
            <ScreenMockup />
          </div>
          <div
            style={{
              position: 'absolute',
              right: '8%',
              bottom: '4%',
              width: '58%',
              transform: 'rotate(3deg)',
              zIndex: 2,
            }}
          >
            <ScreenMockup />
          </div>
        </div>

        {/* 2x2 grid of decision boxes */}
        <StaggerCards
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
          }}
          className="max-md:!grid-cols-1"
        >
          {features.map((feat) => (
            <div
              key={feat.number}
              style={{
                border: `1px solid ${C.cardBorder ?? '#222222'}`,
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <p style={{ fontFamily: F.sans, fontSize: '13px', color: '#2E9461', margin: '0 0 14px 0', letterSpacing: '0.08em' }}>{feat.number}</p>
              <h3 style={{ fontFamily: F.editorial, fontSize: '20px', color: C.primary, margin: '0 0 14px 0', lineHeight: 1.3, fontWeight: 400 }}>{feat.name}</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {feat.bullets.map((b, bi) => (
                  <li key={bi} style={{ fontFamily: F.sans, fontSize: '14px', color: C.secondary, lineHeight: 1.6, paddingLeft: '16px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: C.secondary }}>•</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </StaggerCards>
      </div>
    </section>
  );
}

// ─── 6. Usability Testing ────────────────────────────────────────────────────
function UsabilityTesting() {
  const stats = [
    { number: '100%', label: 'Completion Rate' },
    { number: '5', label: 'Participants' },
    { number: '9', label: 'Tasks Tested' },
    { number: '2–4', label: 'Difficulty Rating (out of 7)' },
  ];
  const insights = [
    'Task completion was unanimous. All 5 participants completed every assigned flow without abandoning the app mid-task. The core journey held together from start to finish.',
    'The preference quiz was described as "surprisingly fun" by multiple participants. The structured input approach reduced rather than increased friction, turning a potential chore into something closer to a game.',
    'The overlap dashboard resonated strongly. Seeing shared preferences visualised gave participants an immediate sense of momentum, the feeling that the trip was already coming together.',
    'The opt-out feature needed clearer labelling. Two participants weren\'t sure whether opting out would remove them from the whole trip or just a single activity, a critical distinction that required a design revision.',
  ];
  return (
    <section style={{ backgroundColor: C.bg, padding: '80px', paddingTop: '80px', paddingBottom: '80px' }} className="max-md:!px-6 max-md:!py-16 max-lg:!px-10 max-lg:!py-14">
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
          <p key={i} style={{ fontFamily: F.sans, fontSize: '17px', color: C.primary, lineHeight: 1.7, margin: 0 }}>
            {insight}
          </p>
        ))}
      </div>
    </section>
  );
}

// ─── 7. Top Issues & Iterations ──────────────────────────────────────────────
function Iterations() {
  const issues = [
    {
      label: 'Group Profile Builder',
      problem: 'Users questioned why planners were filling in details on behalf of members who had not yet joined the trip.',
      solution: 'Removed the standalone step and integrated it into the preference quiz flow, streamlining onboarding with a clearer user journey.',
    },
    {
      label: 'Activity Preferences in Quiz',
      problem: 'Drag handles caused users to attempt dragging instead of the intended tap-to-assign interaction.',
      solution: 'Replaced with a tap-to-assign system with a clear instruction box and Tap to Remove labels, making it discoverable at a glance.',
    },
    {
      label: 'Accommodation Preference in Quiz',
      problem: 'Insufficient visual distinction between single-select and multi-select fields caused wrong interaction patterns.',
      solution: 'Standardised radio buttons for single-select and checkboxes for multi-select. The consistent and familiar input patterns eliminate interaction ambiguity.',
    },
    {
      label: 'Planner Activity Shortlisting',
      problem: 'Users expected an add-to-cart model rather than an explicit remove action.',
      solution: 'Switched to a selection model where tapping includes activities, matching user expectations intuitively.',
    },
    {
      label: 'Planner Objection View',
      problem: 'Unclear options caused users to avoid the primary action entirely.',
      solution: "Removed 'Replace and Keep Original'. 'Return to Review & Edit' is now the single primary action, reducing decision paralysis with a clearer call to action.",
    },
  ];
  return (
    <section style={{ backgroundColor: C.statsBg, padding: '80px', paddingTop: '80px', paddingBottom: '80px' }} className="max-md:!px-6 max-md:!py-16 max-lg:!px-10 max-lg:!py-14">
      <SectionLabel text="Top Issues & Iterations" />
      <h2 className="cs-section-header">
        What Changed & Why
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
        {issues.map((issue) => (
          <div key={issue.label}>
            <p className="cs-category-label">{issue.label}</p>
            <p className="cs-body-text" style={{ margin: '0 0 40px 0', maxWidth: '680px' }}>
              {issue.problem}
            </p>
            <BeforeAfter
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '40px' }}
              className="max-md:!grid-cols-1 max-md:!gap-8 max-lg:!grid-cols-1 max-lg:!gap-8"
              before={<ScreenMockup label="Before" />}
              after={<ScreenMockup label="After" />}
            />
            <p className="cs-body-text" style={{ maxWidth: '680px' }}>
              {issue.solution}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── 8. Final Screens ────────────────────────────────────────────────────────
function FinalScreens() {
  const screens = [
    {
      name: 'Preference Quiz',
      highlights: [
        { heading: '3-Section Guided Flow', text: 'Members complete the quiz across 3 sections (Your Profile, Activity Preferences, and Accommodation), each privately capturing a different dimension of personal preference.' },
        { heading: 'Private Preference Collection', text: 'Collects individual preferences independently, avoiding groupthink or peer pressure.' },
        { heading: 'Personal Input First', text: 'Enables honest personal input before any group coordination or discussion begins.' },
        { heading: 'Data-Driven Planning', text: "Quiz results across all 3 sections feed directly into the overlap dashboard to surface group consensus and guide the planner's shortlisting decisions." },
      ],
      imageFirst: false,
    },
    {
      name: 'Overlap Dashboard',
      highlights: [
        { heading: 'Group Interest Ranking', text: 'Activities are ranked by percentage of group interest, with a threshold indicator to guide strong shortlist picks.' },
        { heading: 'Consensus at a Glance', text: 'Each activity shows the percentage of members who rated it positively, colour-coded as High, Mixed, or Low.' },
        { heading: 'Data-Driven Shortlisting', text: 'Planner taps to include activities for the itinerary based on group ratings, with the highest-rated items pre-highlighted.' },
        { heading: 'Planner Override', text: 'Planner can include or exclude any activity regardless of rating before proceeding to confirm the shortlist.' },
      ],
      imageFirst: true,
    },
    {
      name: 'Objection Handling',
      highlights: [
        { heading: 'Streamlined Conflict Resolution', text: 'Group members raise objections to planned activities directly in the app without needing a group chat confrontation.' },
        { heading: 'Two-Way Communication', text: "Objections surface immediately on the planner's view, flagged on the relevant itinerary item in real time." },
        { heading: 'Smart Alternative Suggestions', text: 'Planner receives app-suggested alternatives based on group preferences, or can input a custom replacement.' },
        { heading: 'Reduced Group Friction', text: 'Once confirmed, the updated itinerary is instantly visible to the whole group with no manual re-sharing needed.' },
      ],
      imageFirst: false,
    },
    {
      name: 'Final Itinerary',
      highlights: [
        { heading: 'Day-by-Day Itinerary View', text: 'The confirmed itinerary is laid out chronologically by day, with each activity and meal showing the time, location, duration, and attending members at a glance.' },
        { heading: 'Transparent Opt-Out Indicators', text: 'Each activity card displays who has opted out, visible to the whole group — so attendance is clear and no one is caught off guard on the day.' },
        { heading: 'Live Edit Mode for Planners', text: 'Planners can enter Edit Mode to swap or remove any activity or meal directly in the itinerary. All changes are broadcast to the group instantly via an in-app notification.' },
        { heading: 'Smart Import Bookings', text: 'Once the itinerary is finalised, planners can paste a booking link or forward a confirmation email and TripSync auto-fills the details — consolidating flights, accommodation, and activity bookings in one place.' },
      ],
      imageFirst: true,
    },
  ];
  return (
    <section style={{ backgroundColor: C.problemBg, padding: '80px', paddingTop: '80px', paddingBottom: '80px' }} className="max-md:!px-6 max-md:!py-16 max-lg:!px-10 max-lg:!py-14">
      <SectionLabel text="Final Screens" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
        {screens.map((screen) => (
          <div
            key={screen.name}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}
            className="max-md:!grid-cols-1 max-md:!gap-10 max-lg:!grid-cols-1 max-lg:!gap-10"
          >
            {screen.imageFirst ? (
              <>
                <div className="max-md:!order-2">
                  <ScreenMockup />
                </div>
                <div className="max-md:!order-1">
                  <h3 style={{ fontFamily: F.editorial, fontSize: 'clamp(24px, 2.5vw, 32px)', color: C.primary, margin: '0 0 24px 0', lineHeight: 1.2, fontWeight: 400 }}>{screen.name}</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {screen.highlights.map((h, hi) => (
                      <li key={hi} style={{ fontFamily: F.sans, fontSize: '17px', lineHeight: 1.7, paddingLeft: '20px', position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0, color: C.secondary }}>·</span>
                        <span style={{ display: 'block', color: C.primary, fontWeight: 600, marginBottom: '2px' }}>{h.heading}</span>
                        <span style={{ display: 'block', color: C.secondary }}>{h.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h3 style={{ fontFamily: F.editorial, fontSize: 'clamp(24px, 2.5vw, 32px)', color: C.primary, margin: '0 0 24px 0', lineHeight: 1.2, fontWeight: 400 }}>{screen.name}</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {screen.highlights.map((h, hi) => (
                      <li key={hi} style={{ fontFamily: F.sans, fontSize: '17px', lineHeight: 1.7, paddingLeft: '20px', position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0, color: C.secondary }}>·</span>
                        <span style={{ display: 'block', color: C.primary, fontWeight: 600, marginBottom: '2px' }}>{h.heading}</span>
                        <span style={{ display: 'block', color: C.secondary }}>{h.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <ScreenMockup />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── 9. Impact ───────────────────────────────────────────────────────────────
function Impact() {
  const outcomes = [
    { title: 'Core Objective Validated', desc: 'All 5 participants confirmed the app successfully surfaces individual preferences without requiring full group consensus, directly addressing the problem statement.' },
    { title: '3 of 4 Key Screens Iterated', desc: 'Direct feedback from usability testing drove meaningful design changes to the quiz, the shortlist view, and the objection notification, each revision grounded in observed behaviour.' },
    { title: 'Concept Resonated', desc: 'The opt-out feature was specifically highlighted as valuable for making individual preferences visible to the group without requiring confrontation, addressing a real social dynamic that often creates friction in group travel planning.' },
  ];
  return (
    <section style={{ backgroundColor: C.bg, padding: '80px', paddingTop: '100px', paddingBottom: '100px', textAlign: 'center' }} className="max-md:!px-6 max-md:!py-20 max-lg:!px-10">
      <AnimatedQuote style={{ fontFamily: F.editorial, fontStyle: 'italic', fontSize: 'clamp(24px, 3.5vw, 40px)', color: C.primary, margin: '0 auto 48px auto', lineHeight: 1.35, maxWidth: '900px', letterSpacing: '-0.01em', fontWeight: 400, paddingTop: '4px', paddingBottom: '4px' }}>
        "Without this, you would usually be on WhatsApp doing a back and forth... at least now this gives you a very clear overview of what your itinerary can look like."
      </AnimatedQuote>
      <p style={{ fontFamily: F.sans, fontSize: '13px', color: C.secondary, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 auto 64px auto' }}>
         Usability Test Participant
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px', textAlign: 'left', maxWidth: '960px', margin: '0 auto' }} className="max-md:!grid-cols-1 max-lg:!grid-cols-1">
        {outcomes.map((o) => (
          <div key={o.title}>
            <h4 style={{ fontFamily: F.editorial, fontSize: '20px', color: C.primary, margin: '0 0 12px 0', lineHeight: 1.3, fontWeight: 400 }}>{o.title}</h4>
            <p style={{ fontFamily: F.sans, fontSize: '17px', color: C.secondary, margin: 0, lineHeight: 1.7 }}>{o.desc}</p>
          </div>
        ))}
      </div>
      <AnimatedQuote style={{ fontFamily: F.editorial, fontStyle: 'italic', fontSize: 'clamp(20px, 3vw, 32px)', color: C.primary, margin: '80px auto 32px auto', lineHeight: 1.35, maxWidth: '860px', letterSpacing: '-0.01em', fontWeight: 400, paddingTop: '4px', paddingBottom: '4px' }}>
        "The structured preference flow reduces the chaos of simultaneous, unstructured group input."
      </AnimatedQuote>
      <p style={{ fontFamily: F.sans, fontSize: '13px', color: C.secondary, letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>
        Usability Test Participant
      </p>
    </section>
  );
}

// ─── 10. Reflections ─────────────────────────────────────────────────────────
function Reflections() {
  const cards = [
    { number: '01', title: 'Edge Case Complexity', body: "Group travel has enormous variety: trip size, duration, and social dynamic all affect what planning looks like. Designing for edge cases like last-minute additions or partial group attendance would require significant further iteration." },
    { number: '02', title: 'Multi-Role Design', body: "Syncing two interconnected flows was the core challenge. Future iterations will explore deeper role-specific features for both planner and joiner." },
    { number: '03', title: 'Iterative Testing', body: "Usability testing validated the core flow while surfacing interaction-level improvements. Continued testing with a larger, more diverse group will uncover more real-world scenarios and edge cases to address in v2." },
    { number: '04', title: 'Preference Structure', body: "Structured preference collection proved to be the most validated feature. Expanding data inputs and personalisation will sharpen recommendation quality in v2." },
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

// ─── 11. Prototype CTA ───────────────────────────────────────────────────────
function PrototypeCTA() {
  return (
    <section style={{ backgroundColor: C.problemBg, padding: '80px', textAlign: 'left' }} className="max-md:!px-6 max-md:!py-16 max-lg:!px-10 max-lg:!py-14">
      <h2 style={{ fontFamily: F.editorial, fontSize: 'clamp(32px, 4.5vw, 52px)', color: C.primary, margin: '0 0 20px 0', lineHeight: 1.1, letterSpacing: '-0.02em', fontWeight: 400 }}>
        Experience TripSync.
      </h2>
      <p style={{ fontFamily: F.sans, fontSize: '17px', color: C.secondary, margin: '0 0 32px 0', lineHeight: 1.7, maxWidth: '580px' }}>
        Explore the full interactive prototype: preference quizzes, overlap dashboards, and group coordination in action.
      </p>
      <a
        href="#"
        style={{ fontFamily: F.sans, fontSize: '17px', color: C.primary, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', borderBottom: `1px solid ${C.border}`, paddingBottom: '4px', transition: 'border-color 0.2s' }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = C.primary)}
        onMouseLeave={e => (e.currentTarget.style.borderColor = C.border)}
      >
        Open Prototype
      </a>
    </section>
  );
}

// ─── 12. Next Project Navigation ─────────────────────────────────────────────
function NextProject() {
  const navigate = useNavigate();
  return (
    <section
      style={{ backgroundColor: C.bg, padding: '80px', borderTop: `1px solid #1A1A1A`, display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'column', cursor: 'pointer' }}
      className="max-md:!px-6 max-md:!items-start max-lg:!px-10"
      onClick={() => navigate('/lumis')}
    >
      <p style={{ fontFamily: F.sans, fontSize: '13px', color: C.secondary, letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 12px 0' }}>
        Next Project
      </p>
      <p
        style={{ fontFamily: F.editorial, fontSize: 'clamp(28px, 3.5vw, 42px)', color: C.primary, margin: 0, letterSpacing: '-0.01em', lineHeight: 1.1, fontWeight: 400 }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
      >
        Lumis Skincare
      </p>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export function TripSyncPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div style={{ backgroundColor: C.bg, minHeight: '100vh', '--accent-color': '#4CAF50' } as React.CSSProperties}>
      <Navigation showBack />
      <CaseStudyHero />
      <FadeUp><StatsStrip /></FadeUp>
      <FadeUp><ProblemStatement /></FadeUp>
      <FadeUp><ResearchFindings /></FadeUp>
      <FadeUp><VisualDesignSystem /></FadeUp>
      <FadeUp><DesignDecisions /></FadeUp>
      <FadeUp><UsabilityTesting /></FadeUp>
      <FadeUp><Iterations /></FadeUp>
      <FadeUp><FinalScreens /></FadeUp>
      <FadeUp><Impact /></FadeUp>
      <FadeUp><Reflections /></FadeUp>
      <FadeUp><PrototypeCTA /></FadeUp>
      <FadeUp><NextProject /></FadeUp>
    </div>
  );
}