import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Navigation } from '../components/Navigation';
import { CaseStudySidebar, type SidebarItem } from '../components/CaseStudySidebar';
import { FadeUp, StaggerCards, AnimatedQuote, AnimatedLine, staggerContainer, fadeUpItem, ease } from '../components/Animate';
import tripsyncImg from '../../imports/Tripsync_home_app.png';
import tripsyncActivityFoodImg from '../../imports/tripsync-Activity-and-Food-Overview-new.png';
import tripsyncOptOutImg from '../../imports/tripsync-opt-out-new.png';
import tripsyncProfileQuizImg from '../../imports/profile-preference-quiz-new-v2.png';
import tripsyncProfileOldImg from '../../imports/tripsync-profile-old.png';
import tripsyncPrefQuizOldImg from '../../imports/tripsync-pref-quiz-old.png';
import tripsyncPrefQuizNewImg from '../../imports/tripsync-pref-quiz-new.png';
import tripsyncPrefAccomOldImg from '../../imports/tripsync-pref-accom-old.png';
import tripsyncAccomPrefNewImg from '../../imports/tripsync-accom-pref-new.png';
import tripsyncActivityShortlistNewImg from '../../imports/tripsync-activity-shortlist-new-v2.png';
import tripsyncActivityShortlistOldImg from '../../imports/tripsync-activity-shortlist-old.png';
import tripsyncObjectionOldImg from '../../imports/tripsync-objection-old.png';
import tripsyncObjectionNewImg from '../../imports/tripsync-objection-new.png';
import finalItineraryVideo from '../../imports/final-itinerary-final-screen.mp4';
import objectionFinalVideo from '../../imports/Objection-final-screen.mp4';
import tripsyncPhone1 from '../../imports/tripsync-phone-1.png';
import tripsyncPhone2 from '../../imports/tripsync-phone-2.png';
import tripsyncPhone3 from '../../imports/tripsync-phone-3-v2.png';
import tripsyncPhone4 from '../../imports/tripsync-phone-4-v3.png';
import affinityMapP1 from '../../imports/affinity_map_p1.jpeg';
import affinityMapP2 from '../../imports/affinity_map_p2.jpeg';

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
function ScreenMockup({ label, opacity = 1, src = tripsyncImg, videoSrc, maxWidth = 260 }: { label?: string; opacity?: number; src?: string; videoSrc?: string; maxWidth?: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => { entry.isIntersecting ? video.play() : video.pause(); },
      { threshold: 0.3 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [videoSrc]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Label + image share an image-width column so the label sits
          directly on top of the image rather than off at the cell edge. */}
      <div style={{ width: '100%', maxWidth: `${maxWidth}px` }}>
        {label && (
          <span style={{ display: 'block', textAlign: 'center', fontFamily: F.sans, fontSize: '13px', color: C.secondary, marginBottom: '10px' }}>{label}</span>
        )}
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
          {/* Right side: power button */}
          <div
            style={{
              position: 'absolute',
              right: '-2px',
              top: '24%',
              width: '3px',
              height: '17%',
              background: 'linear-gradient(180deg, #55565A 0%, #3A3B3F 50%, #25262A 100%)',
              borderRadius: '1px 2px 2px 1px',
              zIndex: 0,
            }}
          />
          {/* Left side: action/ringer switch */}
          <div
            style={{
              position: 'absolute',
              left: '-2px',
              top: '14%',
              width: '3px',
              height: '6%',
              background: 'linear-gradient(180deg, #55565A 0%, #3A3B3F 50%, #25262A 100%)',
              borderRadius: '2px 1px 1px 2px',
              zIndex: 0,
            }}
          />
          {/* Left side: volume up */}
          <div
            style={{
              position: 'absolute',
              left: '-2px',
              top: '23%',
              width: '3px',
              height: '9%',
              background: 'linear-gradient(180deg, #55565A 0%, #3A3B3F 50%, #25262A 100%)',
              borderRadius: '2px 1px 1px 2px',
              zIndex: 0,
            }}
          />
          {/* Left side: volume down */}
          <div
            style={{
              position: 'absolute',
              left: '-2px',
              top: '34%',
              width: '3px',
              height: '9%',
              background: 'linear-gradient(180deg, #55565A 0%, #3A3B3F 50%, #25262A 100%)',
              borderRadius: '2px 1px 1px 2px',
              zIndex: 0,
            }}
          />
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '9 / 19.5',
              overflow: 'hidden',
              borderRadius: '36px',
              backgroundColor: '#000',
              zIndex: 1,
            }}
          >
            {/* Dynamic island */}
            <div
              style={{
                position: 'absolute',
                top: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '32%',
                height: '20px',
                backgroundColor: '#000',
                borderRadius: '14px',
                zIndex: 3,
              }}
            />
            {videoSrc ? (
              <video
                ref={videoRef}
                src={videoSrc}
                loop
                muted
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
              />
            ) : (
              <img
                src={src}
                alt={label || 'TripSync screen'}
                loading="lazy"
                decoding="async"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
              />
            )}
          </div>
        </div>
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
        <motion.div variants={fadeUpItem}>
          <StatsStrip />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── 2. Stats Strip (inline, sits under hero meta) ──────────────────────────
function StatsStrip() {
  const stats = [
    { number: '2 Weeks', label: 'Duration' },
    { number: '5', label: 'Users Tested' },
    { number: '9', label: 'Tasks Tested' },
    { number: '3 of 4', label: 'Screens Iterated' },
  ];
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        flexWrap: 'wrap',
        rowGap: '20px',
        marginTop: '40px',
        paddingTop: '28px',
        borderTop: `1px solid ${C.cardBorder}`,
      }}
    >
      {stats.map((s, i) => (
        <div
          key={s.label}
          style={{
            paddingLeft: i > 0 ? '32px' : 0,
            paddingRight: '32px',
            borderLeft: i > 0 ? `1px solid ${C.cardBorder}` : 'none',
          }}
          className="max-md:!pl-0 max-md:!pr-6 max-md:!border-l-0"
        >
          <p
            style={{
              fontFamily: F.editorial,
              fontSize: 'clamp(28px, 3vw, 38px)',
              color: C.primary,
              margin: '0 0 6px 0',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              fontWeight: 400,
              whiteSpace: 'nowrap',
            }}
          >
            {s.number}
          </p>
          <p
            style={{
              fontFamily: F.sans,
              fontSize: '11px',
              color: '#8A8A82',
              margin: 0,
              lineHeight: 1.4,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
            }}
          >
            {s.label}
          </p>
        </div>
      ))}
    </div>
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
        Group trip planners managing travel for 3 or more people struggle to accommodate diverse preferences without requiring full consensus. Planning is scattered across multiple apps, there's no structured way to collect input, decisions drag on for days, and opting out of activities feels socially uncomfortable.
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

// ─── 4. What I Found (research + affinity mapping photos) ───────────────────
function ResearchFindings() {
  const findings = [
    { title: 'Chaotic Group Coordination', desc: 'Groups coordinate across WhatsApp, calls, and spreadsheets with no clear picture of where decisions stand.' },
    { title: 'App Fragmentation', desc: 'The average planning process involved 3–5 different tools, creating friction and lost information.' },
    { title: 'Flexibility Over Rigidity', desc: 'Users wanted soft preferences without feeling locked into hard commitments early on.' },
    { title: 'AI & Social Already in the Mix', desc: 'TikTok and Instagram drive discovery; ChatGPT helps with itineraries but everything still gets pieced together manually.' },
    { title: 'Unified Platform Demand', desc: 'The strongest signal — users wanted one place for preferences, itinerary, communication, and bookings.' },
  ];
  // Per-note colour + rotation. Five dark tints (brown, teal, purple, red,
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
      <SectionLabel text="What I Found" />

      {/* Affinity-map process photos — side by side, smaller */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', width: '100%', maxWidth: '900px' }}
          className="max-md:!grid-cols-1 max-md:!gap-4"
        >
          <img
            src={affinityMapP1}
            alt="Leeyana placing sticky notes on a whiteboard while affinity mapping user interview insights"
            loading="lazy"
            decoding="async"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: '6px', aspectRatio: '4 / 3' }}
          />
          <img
            src={affinityMapP2}
            alt="Whiteboard with all sticky notes grouped into research themes after affinity mapping"
            loading="lazy"
            decoding="async"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: '6px', aspectRatio: '4 / 3' }}
          />
        </div>
        <p style={{ fontFamily: F.sans, fontSize: '13px', color: '#5A5A54', fontStyle: 'italic', margin: '16px 0 0 0', textAlign: 'center', lineHeight: 1.5 }}>
          Synthesising user interview insights through affinity mapping.
        </p>
      </div>

      <StaggerCards style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px', marginTop: '64px' }} className="max-md:!grid-cols-1 max-lg:!grid-cols-2">
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
        'Every member privately inputs preferences before the group sees results. This eliminates groupthink and ensures dietary needs and budget constraints aren’t buried in group chats.',
      ],
      imageFirst: false,
    },
    {
      number: '02',
      name: 'Activity Rating & Shortlist',
      bullets: [
        'Members privately rate activities, aggregated so the planner sees colour-coded consensus (High, Mixed, Low) at a glance. The planner shortlists based on data, not whoever replies fastest.',
      ],
      imageFirst: true,
    },
    {
      number: '03',
      name: 'Opt-Out Feature',
      bullets: [
        'Members flag solo time during planning, not after. This was the most socially uncomfortable part of group travel — building opt-out into planning makes it visible without confrontation.',
      ],
      imageFirst: false,
    },
    {
      number: '04',
      name: 'Objection Handling',
      bullets: [
        'Members raise objections in-app with suggested alternatives. This came from research where interviewees didn’t want to be the person to derail plans in the group chat.',
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
            <ScreenMockup src={tripsyncOptOutImg} />
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
            <ScreenMockup src={tripsyncActivityFoodImg} />
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
  const inlineStats = [
    { number: '5', label: 'Participants' },
    { number: '9', label: 'Tasks' },
    { number: '2–4', label: 'Difficulty Rating (out of 7)' },
  ];
  const insights = [
    'Task completion was unanimous — the core journey held together from start to finish.',
    'The preference quiz was described as "surprisingly fun," turning a potential chore into something closer to a game.',
    'The overlap dashboard gave participants an immediate sense of momentum and shared direction.',
    "The opt-out feature needed clearer labelling — two participants weren't sure if it removed them from the whole trip or just one activity.",
  ];
  return (
    <section style={{ backgroundColor: C.bg, padding: '80px', paddingTop: '80px', paddingBottom: '80px' }} className="max-md:!px-6 max-md:!py-16 max-lg:!px-10 max-lg:!py-14">
      <SectionLabel text="Usability Testing" />
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          rowGap: '20px',
          marginBottom: '48px',
          paddingBottom: '28px',
          borderBottom: `1px solid ${C.cardBorder}`,
        }}
      >
        {inlineStats.map((s, i) => (
          <div
            key={s.label}
            style={{
              paddingLeft: i > 0 ? '32px' : 0,
              paddingRight: '32px',
              borderLeft: i > 0 ? `1px solid ${C.cardBorder}` : 'none',
            }}
            className="max-md:!pl-0 max-md:!pr-6 max-md:!border-l-0"
          >
            <p style={{ fontFamily: F.editorial, fontSize: 'clamp(28px, 3vw, 38px)', color: C.primary, margin: '0 0 6px 0', lineHeight: 1, letterSpacing: '-0.02em', fontWeight: 400, whiteSpace: 'nowrap' }}>{s.number}</p>
            <p style={{ fontFamily: F.sans, fontSize: '11px', color: '#8A8A82', margin: 0, lineHeight: 1.4, letterSpacing: '0.14em', textTransform: 'uppercase' }}>{s.label}</p>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', maxWidth: '820px' }}>
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
  const issues: { label: string; problem: string; solution: string; beforeImg?: string; afterImg?: string }[] = [
    {
      label: 'Group Profile Builder',
      problem: "Users questioned why planners filled in details for members who hadn't joined.",
      solution: 'Each member now fills in their own profile upon joining.',
      beforeImg: tripsyncProfileOldImg,
      afterImg: tripsyncProfileQuizImg,
    },
    {
      label: 'Activity Preferences',
      problem: 'Drag handles misled every participant into attempting to drag.',
      solution: 'Replaced with tap-to-rank — tap to assign priority, tap again to remove.',
      beforeImg: tripsyncPrefQuizOldImg,
      afterImg: tripsyncPrefQuizNewImg,
    },
    {
      label: 'Accommodation Preference',
      problem: 'No visual distinction between single-select and multi-select.',
      solution: 'Standardised to radio buttons and checkboxes.',
      beforeImg: tripsyncPrefAccomOldImg,
      afterImg: tripsyncAccomPrefNewImg,
    },
    {
      label: 'Planner Shortlisting',
      problem: 'Users expected tap-to-include, not tap-to-exclude.',
      solution: 'Flipped the model to match their mental model.',
      beforeImg: tripsyncActivityShortlistOldImg,
      afterImg: tripsyncActivityShortlistNewImg,
    },
    {
      label: 'Objection View',
      problem: 'Two equal buttons caused hesitation.',
      solution: 'Reduced to one primary action — decision paralysis resolved.',
      beforeImg: tripsyncObjectionOldImg,
      afterImg: tripsyncObjectionNewImg,
    },
  ];
  const tagStyle: React.CSSProperties = {
    fontFamily: F.sans,
    fontSize: '11px',
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
    color: '#8A8A82',
    margin: '0 0 16px 0',
    display: 'block',
  };
  const sideText: React.CSSProperties = {
    fontFamily: F.sans,
    fontSize: '15px',
    color: C.primary,
    lineHeight: 1.6,
    margin: '20px 0 0 0',
    maxWidth: '320px',
  };
  return (
    <section style={{ backgroundColor: C.statsBg, padding: '80px', paddingTop: '80px', paddingBottom: '80px' }} className="max-md:!px-6 max-md:!py-16 max-lg:!px-10 max-lg:!py-14">
      <SectionLabel text="Top Issues & Iterations" />
      <h2 className="cs-section-header">
        What Changed & Why
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
        {issues.map((issue, i) => (
          <div
            key={issue.label}
            style={i > 0 ? { borderTop: `1px solid ${C.cardBorder}`, paddingTop: '80px' } : undefined}
          >
            <p className="cs-category-label" style={{ marginBottom: '32px' }}>{issue.label}</p>
            <div
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}
              className="max-md:!grid-cols-1 max-md:!gap-10"
            >
              {/* Before */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={tagStyle}>Before</span>
                <ScreenMockup src={issue.beforeImg} />
                <p style={sideText}>{issue.problem}</p>
              </div>
              {/* After */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={tagStyle}>After</span>
                <ScreenMockup src={issue.afterImg} />
                <p style={sideText}>{issue.solution}</p>
              </div>
            </div>
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
      image: tripsyncProfileQuizImg,
      video: 'https://res.cloudinary.com/dvunn40le/video/upload/preference-quiz-final-screen_ywzqzz.mp4',
      highlights: [
        { heading: '3-Section Guided Flow', text: 'Collects preferences privately to avoid groupthink.' },
        { heading: 'Data-Driven Planning', text: 'Results feed directly into the overlap dashboard for data-driven planning.' },
      ],
      imageFirst: false,
    },
    {
      name: 'Overlap Dashboard',
      image: tripsyncActivityShortlistNewImg,
      video: 'https://res.cloudinary.com/dvunn40le/video/upload/Overlap-dashboard-final-screen_xjsodu.mp4',
      highlights: [
        { heading: 'Group Interest Ranking', text: 'Activities ranked by group interest percentage, colour-coded as High, Mixed, or Low.' },
        { heading: 'Planner Override', text: 'Planner can override any rating before confirming the shortlist.' },
      ],
      imageFirst: true,
    },
    {
      name: 'Objection Handling',
      image: tripsyncObjectionNewImg,
      video: 'https://res.cloudinary.com/dvunn40le/video/upload/Objection-final-screen_x8hdta.mp4',
      highlights: [
        { heading: 'In-App Conflict Resolution', text: 'Members raise objections in-app; planner sees flagged items with suggested alternatives.' },
        { heading: 'Live Group Sync', text: 'Updated itinerary is instantly visible to the whole group — no manual re-sharing.' },
      ],
      imageFirst: false,
    },
    {
      name: 'Final Itinerary',
      image: tripsyncOptOutImg,
      video: 'https://res.cloudinary.com/dvunn40le/video/upload/final-itinerary-final-screen_pzykkv.mp4',
      highlights: [
        { heading: 'Day-by-Day View', text: 'Day-by-day view with time, location, duration, and opt-out indicators per activity.' },
        { heading: 'Smart Import Bookings', text: 'Planners can paste booking links to auto-fill flight and accommodation details.' },
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
            style={{ display: 'grid', gridTemplateColumns: screen.imageFirst ? '1.85fr 1fr' : '1fr 1.85fr', gap: '64px', alignItems: 'center' }}
            className="max-md:!grid-cols-1 max-md:!gap-10 max-lg:!grid-cols-1 max-lg:!gap-10"
          >
            {screen.imageFirst ? (
              <>
                <div className="max-md:!order-2">
                  <ScreenMockup src={screen.image} videoSrc={screen.video} maxWidth={420} />
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
                  <ScreenMockup src={screen.image} videoSrc={screen.video} maxWidth={420} />
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
    'Core concept validated by all 5 participants.',
    '3 of 4 key screens iterated based on direct usability feedback.',
    'Opt-out feature highlighted as the most valuable for reducing social friction.',
  ];
  return (
    <section style={{ backgroundColor: C.bg, padding: '80px', paddingTop: '100px', paddingBottom: '100px', textAlign: 'center' }} className="max-md:!px-6 max-md:!py-20 max-lg:!px-10">
      <AnimatedQuote style={{ fontFamily: F.editorial, fontStyle: 'italic', fontSize: 'clamp(24px, 3.5vw, 40px)', color: C.primary, margin: '0 auto 32px auto', lineHeight: 1.35, maxWidth: '900px', letterSpacing: '-0.01em', fontWeight: 400, paddingTop: '4px', paddingBottom: '4px' }}>
        "Without this, you would usually be on WhatsApp doing a back and forth... at least now this gives you a very clear overview of what your itinerary can look like."
      </AnimatedQuote>
      <p style={{ fontFamily: F.sans, fontSize: '13px', color: C.secondary, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 auto 72px auto' }}>
         Usability Test Participant
      </p>
      <ul style={{ listStyle: 'none', padding: 0, margin: '0 auto', maxWidth: '760px', display: 'flex', flexDirection: 'column', gap: '14px', textAlign: 'left' }}>
        {outcomes.map((o, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', fontFamily: F.sans, fontSize: '17px', color: C.primary, lineHeight: 1.6 }}>
            <span style={{ fontFamily: F.editorial, color: '#52B788', minWidth: '28px', fontSize: '18px' }}>{String(i + 1).padStart(2, '0')}</span>
            <span>{o}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

// ─── 10. Reflections ─────────────────────────────────────────────────────────
function Reflections() {
  const cards = [
    { number: '01', title: 'Edge Cases', body: 'Group travel has enormous variety — trip size, duration, and social dynamics all need further iteration.' },
    { number: '02', title: 'Multi-Role Design', body: 'Syncing planner and joiner flows was the core challenge; future iterations will explore deeper role-specific features.' },
    { number: '03', title: 'Iterative Testing', body: 'Continued testing with larger, more diverse groups will surface real-world edge cases for v2.' },
  ];
  return (
    <section style={{ backgroundColor: C.statsBg, padding: '80px', paddingTop: '80px', paddingBottom: '80px' }} className="max-md:!px-6 max-md:!py-16 max-lg:!px-10 max-lg:!py-14">
      <SectionLabel text="Reflections & Next Steps" />
      <StaggerCards style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }} className="max-md:!grid-cols-1 max-lg:!grid-cols-1">
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
        href="https://iso-pond-75627619.figma.site/splash"
        target="_blank"
        rel="noopener noreferrer"
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
const sidebarItems: SidebarItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'problem', label: 'Problem' },
  { id: 'research', label: 'What I Found' },
  { id: 'design-decisions', label: 'Design Decisions' },
  { id: 'usability-testing', label: 'Usability Testing' },
  { id: 'iterations', label: 'Issues & Changes' },
  { id: 'final-screens', label: 'Final Screens' },
  { id: 'impact', label: 'Impact' },
  { id: 'reflections', label: 'Reflections' },
];

export function TripSyncPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div style={{ backgroundColor: C.bg, minHeight: '100vh', '--accent-color': '#4CAF50' } as React.CSSProperties}>
      <Navigation showBack />
      <div className="cs-layout">
        <CaseStudySidebar items={sidebarItems} />
        <div className="cs-content">
          <div id="overview"><CaseStudyHero /></div>
          <FadeUp id="problem"><ProblemStatement /></FadeUp>
          <FadeUp id="research"><ResearchFindings /></FadeUp>
          {/* Visual Design System hidden */}
          <FadeUp id="design-decisions"><DesignDecisions /></FadeUp>
          <FadeUp id="usability-testing"><UsabilityTesting /></FadeUp>
          <FadeUp id="iterations"><Iterations /></FadeUp>
          <FadeUp id="final-screens"><FinalScreens /></FadeUp>
          <FadeUp id="impact"><Impact /></FadeUp>
          <FadeUp id="reflections"><Reflections /></FadeUp>
          <FadeUp><PrototypeCTA /></FadeUp>
          <FadeUp><NextProject /></FadeUp>
        </div>
      </div>
    </div>
  );
}