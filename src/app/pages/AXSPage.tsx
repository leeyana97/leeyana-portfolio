import { motion, useInView } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { Navigation } from '../components/Navigation';
import { PasswordGate } from '../components/PasswordGate';
import { CaseStudySidebar, type SidebarItem } from '../components/CaseStudySidebar';
import { FadeUp, StaggerCards, AnimatedQuote, AnimatedLine, staggerContainer, fadeUpItem, ease } from '../components/Animate';
import axsHero1 from '../../imports/AXS_hero_casestudy_1.webp';
import axsHero2 from '../../imports/AXS_hero_casestudy_2.webp';
import axsHero3 from '../../imports/AXS_hero_casestudy_3.webp';
import marcusJourneyMap from '../../imports/AXS_marcus_journey_map.png';
import hanaJourneyMap from '../../imports/AXS_hana_journey_map.png';
import firdausJourneyMap from '../../imports/AXS_firdaus_journey_map.png';

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

// ─── Animated 3-phone carousel hero ─────────────────────────────────────────
// The source images already include a phone-frame bezel, so we render them
// directly without wrapping in another mockup.
//
// One continuous timeline driven by a single `progress` value (0 → 1):
//   0.0  – 0.6  Pure carousel orbit (rotation eased over this range)
//   0.6  – 0.9  Orbital position blends smoothly into the final hero layout
//   0.9  – 1.0  Layout is locked at its final state
// Each phone's transform every frame is the linear interpolation of its
// orbital values and its final values, weighted by a smoothstepped blend
// factor. There is no discrete phase switch — the orbit just gradually
// dissolves into the layout, so there is no seam to feel.
function AXSHeroCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, amount: 0.25 });
  const [progress, setProgress] = useState(0);
  const [dims, setDims] = useState({ phoneWidth: 220, orbitRadius: 220, settleOffset: 210 });
  const [reducedMotion, setReducedMotion] = useState(false);
  // Guard so the timeline starts exactly once.
  const startedRef = useRef(false);

  // Track viewport for responsive sizing
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 480) {
        setDims({ phoneWidth: 204, orbitRadius: 140, settleOffset: 114 });
      } else if (w < 768) {
        setDims({ phoneWidth: 265, orbitRadius: 218, settleOffset: 168 });
      } else if (w < 1100) {
        setDims({ phoneWidth: 312, orbitRadius: 296, settleOffset: 216 });
      } else {
        setDims({ phoneWidth: 360, orbitRadius: 374, settleOffset: 252 });
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Respect prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Single RAF timeline 0 → 1 over ~3 seconds.
  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;
    if (reducedMotion) {
      setProgress(1);
      return;
    }
    const DURATION = 3000; // ms — full timeline incl. blend + hold
    const startTs = performance.now();
    let rafId = 0;
    const tick = () => {
      const elapsed = performance.now() - startTs;
      const p = Math.min(elapsed / DURATION, 1);
      setProgress(p);
      if (p < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inView, reducedMotion]);

  // Final layout slots. Center phone is the focal point; sides are tilted.
  // Index order matches the orbit's natural endpoints under the rotation
  // math below, so the blend has minimal distance to cover per phone.
  //   i = 0  starts at orbit angle 240°  →  ends at  -120° + 360° = 240°… see below
  //   The spin's total rotation is 2 full turns (720°), so each phone ends
  //   exactly where it started on the orbit. We pre-position the starts so
  //   that those endpoints are at the LEFT / CENTER / RIGHT of the screen.
  const screens = [axsHero2, axsHero1, axsHero3]; // left, center, right
  const finalConfigs = [
    { x: -dims.settleOffset, y: 10,  rotate: -6, scale: 1, z: 5  }, // i=0 LEFT
    { x:  0,                 y: -10, rotate:  0, scale: 1, z: 20 }, // i=1 CENTER
    { x:  dims.settleOffset, y: 10,  rotate:  6, scale: 1, z: 5  }, // i=2 RIGHT
  ];

  // The source PNGs include the phone-frame bezel. Approximate aspect ratio
  // for that framed image is ~1 : 2 (slightly taller than a bare 9:19.5 screen).
  // containerHeight is tight to the phone so there's no empty space between
  // the phones and the title below — matches TripSync's hero spacing.
  const phoneHeight = Math.round(dims.phoneWidth * 2.05);
  const containerHeight = phoneHeight;

  // ─── Timeline-derived values (recomputed each frame from `progress`) ────
  const SPIN_END = 0.6;
  const BLEND_END = 0.9;
  const TOTAL_TURNS = 2; // multiple of full turns → phone i=1 ends back at its start angle (front-centre)

  // Rotation easing: starts slow, accelerates, decelerates into the blend zone.
  // We map progress 0..SPIN_END to 0..1 and ease that.
  const rotationT = Math.min(progress / SPIN_END, 1);
  const rotationEased = rotationT < 0.5
    ? 8 * rotationT * rotationT * rotationT * rotationT
    : 1 - Math.pow(-2 * rotationT + 2, 4) / 2;

  // Blend factor: 0 during spin, smoothsteps 0→1 between SPIN_END and BLEND_END.
  let blendRaw = 0;
  if (progress >= BLEND_END) blendRaw = 1;
  else if (progress > SPIN_END) blendRaw = (progress - SPIN_END) / (BLEND_END - SPIN_END);
  const blend = blendRaw * blendRaw * (3 - 2 * blendRaw); // smoothstep

  const showShadow = progress >= 0.95; // CSS transition handles the fade-in

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: C.bg,
      }}
      aria-label="AXS Vault — three screen mockups previewing the feature"
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: `${containerHeight}px`,
          maxWidth: '1100px',
        }}
      >
        {screens.map((src, i) => {
          const final = finalConfigs[i];

          // ─── Orbital position (front-centre convention) ─────────────────
          // baseAngle is pre-shifted so that with TOTAL_TURNS full rotations,
          // phone i=1 lands at angle 0° (which we map to centre-front),
          // phone i=0 lands at -120° (left-front-ish), phone i=2 at +120°
          // (right-front-ish). The 120° offsets keep all three evenly spaced.
          const baseAngle = (i - 1) * (2 * Math.PI / 3); // -120°, 0°, +120°
          const angle = baseAngle + rotationEased * TOTAL_TURNS * 2 * Math.PI;

          // Front-centre convention: angle 0° = closest to viewer.
          //   x_screen = sin(angle) * radius  (sin(0) = 0 → centre on screen)
          //   depth    = cos(angle) mapped to 0..1 (cos(0) = 1 → max scale)
          //   y_screen = cos(angle) * ellipseY (front of carousel sits lower)
          const xOrbit = Math.sin(angle) * dims.orbitRadius;
          const yOrbit = Math.cos(angle) * 18;
          const depth = (Math.cos(angle) + 1) / 2; // 0 (back) → 1 (front)
          const scaleOrbit = 0.78 + depth * 0.32;
          const opacityOrbit = 0.55 + depth * 0.45;
          const zOrbit = Math.round(depth * 100);

          // ─── Blend orbital → final layout ───────────────────────────────
          const x = xOrbit * (1 - blend) + final.x * blend;
          const y = yOrbit * (1 - blend) + final.y * blend;
          const scale = scaleOrbit * (1 - blend) + final.scale * blend;
          const opacity = opacityOrbit * (1 - blend) + 1 * blend;
          const rotation = final.rotate * blend; // tilt eases in with the blend
          // Lock z to final once the blend dominates (per spec, > 0.5).
          const z = blend > 0.5 ? final.z : zOrbit;

          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                marginLeft: -dims.phoneWidth / 2,
                marginTop: -phoneHeight / 2,
                transform: `translate3d(${x}px, ${y}px, 0) rotate(${rotation}deg) scale(${scale})`,
                opacity,
                zIndex: z,
                willChange: 'transform, opacity',
              }}
            >
              <img
                src={src}
                alt=""
                loading="eager"
                decoding="async"
                draggable={false}
                style={{
                  width: `${dims.phoneWidth}px`,
                  height: 'auto',
                  display: 'block',
                  userSelect: 'none',
                  // Drop-shadow only after the layout has fully settled. CSS
                  // transition handles the fade-in — paint cost is bounded.
                  filter: showShadow ? 'drop-shadow(0 20px 40px rgba(0,0,0,0.6))' : 'none',
                  transition: 'filter 0.5s ease-out',
                }}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

function CaseStudyHero() {
  return (
    <section style={{ paddingTop: '120px', paddingBottom: '80px', paddingLeft: '80px', paddingRight: '80px', backgroundColor: C.bg }} className="max-md:!px-6 max-md:!pt-24 max-md:!pb-16 max-lg:!px-10">
      <AXSHeroCarousel />
      <motion.div variants={staggerContainer} initial="hidden" animate="show" style={{ marginTop: '0' }}>
        <motion.h1 variants={fadeUpItem} style={{ fontFamily: F.editorial, fontSize: 'clamp(42px, 7vw, 96px)', color: C.primary, margin: '0 0 20px 0', lineHeight: 0.95, letterSpacing: '-0.02em', fontWeight: 400 }}>
          AXS · Vault
        </motion.h1>
        <motion.p variants={fadeUpItem} style={{ fontFamily: F.sans, fontSize: 'clamp(17px, 2vw, 20px)', color: C.secondary, margin: '0 0 24px 0', lineHeight: 1.5 }}>
          Designing a Unified Bill Management Feature for First Jobbers and Young Couples
        </motion.p>
        <motion.p variants={fadeUpItem} style={{ fontFamily: F.sans, fontSize: '14px', color: C.secondary, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0, display: 'inline-flex', alignItems: 'center', flexWrap: 'wrap', gap: '4px' }}>
          <span>Tools: Claude AI&nbsp;&nbsp;·&nbsp;&nbsp;Platform:&nbsp;</span>
          <span style={{ fontFamily: F.sans, fontSize: '13px', color: '#4296CE', border: '1px solid #275A7C', backgroundColor: 'rgba(66, 150, 206, 0.06)', borderRadius: '20px', padding: '4px 12px', whiteSpace: 'nowrap', letterSpacing: '0.08em' }}>iOS App</span>
          <span>&nbsp;&nbsp;·&nbsp;&nbsp;Collaboration</span>
        </motion.p>
        <motion.div variants={fadeUpItem}>
          <StatsStrip />
        </motion.div>
      </motion.div>
    </section>
  );
}

// Inline stats strip — sits under the hero meta (matches TripSync structure).
function StatsStrip() {
  const stats = [
    { number: '3 Weeks', label: 'Duration' },
    { number: '15', label: 'Users Interviewed' },
    { number: '5', label: 'Users Tested' },
    { number: '6', label: 'Tasks Tested' },
    { number: '3', label: 'User Personas' },
  ];
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        flexWrap: 'wrap',
        rowGap: '20px',
        marginTop: '40px',
        marginBottom: '40px',
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
          <p style={{ fontFamily: F.editorial, fontSize: 'clamp(28px, 3vw, 38px)', color: C.primary, margin: '0 0 6px 0', lineHeight: 1, letterSpacing: '-0.02em', fontWeight: 400, whiteSpace: 'nowrap' }}>{s.number}</p>
          <p style={{ fontFamily: F.sans, fontSize: '11px', color: '#8A8A82', margin: 0, lineHeight: 1.4, letterSpacing: '0.14em', textTransform: 'uppercase' }}>{s.label}</p>
        </div>
      ))}
    </div>
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
  // Findings grouped by persona — labels match the personas used in the
  // Solution Statements section below.
  const groups = [
    {
      label: 'First Jobber',
      findings: [
        { title: 'Perception Problem', desc: 'AXS is associated with physical kiosks and an older generation — not with the apps young users pay bills through today.' },
        { title: 'Notifications as Safety Net', desc: 'Users relied on reminders to know when bills are due. Whichever app reminds them tends to be the app they pay through.' },
        { title: 'Habit Formation', desc: "First jobbers don't stick around long enough to discover features. The first session has to feel effortless and useful, or they're gone." },
      ],
    },
    {
      label: 'Young Couple',
      findings: [
        { title: 'Hidden Visibility Mismatch', desc: "Couples manage bills informally. They don't want a joint account app — they want both partners to see what's been paid without changing who pays what." },
        { title: 'Failed Silent Payments', desc: "When one partner can't see what the other has paid, bills get paid twice or missed — creating awkward catch-ups and admin to chase refunds." },
      ],
    },
  ];
  // Per-note colour + rotation: dark tints + matching tape colour and a slight
  // rotation. Indexed globally so each of the 5 notes keeps a distinct hue.
  const noteStyles = [
    { from: '#2A2520', to: '#1E1B17', tape: 'rgba(190, 150, 100, 0.5)', rot: '-1.5deg' },
    { from: '#1C2A28', to: '#141E1C', tape: 'rgba(90, 185, 170, 0.5)',  rot: '0.8deg'  },
    { from: '#251F2E', to: '#1A1622', tape: 'rgba(160, 120, 200, 0.5)', rot: '-0.6deg' },
    { from: '#2C1E1E', to: '#1F1515', tape: 'rgba(200, 95, 95, 0.5)',   rot: '1.2deg'  },
    { from: '#1C2230', to: '#141923', tape: 'rgba(95, 135, 205, 0.5)',  rot: '-1.0deg' },
  ];
  let globalIdx = 0;
  return (
    <section style={{ backgroundColor: C.bg, padding: '80px', paddingTop: '80px', paddingBottom: '80px' }} className="max-md:!px-6 max-md:!py-16 max-lg:!px-10 max-lg:!py-14">
      <SectionLabel text="Research Findings" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '56px' }}>
        {groups.map((group) => (
          <div key={group.label}>
            <p className="cs-category-label" style={{ marginBottom: '24px' }}>{group.label}</p>
            <StaggerCards
              style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}
              className="max-md:!grid-cols-1 max-lg:!grid-cols-2"
            >
              {group.findings.map((f) => {
                const i = globalIdx++;
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
                      <p className="sticky-note__num">{String(i + 1).padStart(2, '0')}</p>
                      <h3 className="sticky-note__title">{f.title}</h3>
                      <p className="sticky-note__body">{f.desc}</p>
                    </div>
                  </div>
                );
              })}
            </StaggerCards>
          </div>
        ))}
      </div>
    </section>
  );
}

// User Journey Maps — three vertical full-width maps, one per persona.
// Each image opens in a new tab when clicked so the user can zoom into the
// fine text on the journey map without needing a custom lightbox.
function UserJourneyMaps() {
  const personas = [
    {
      label: 'Marcus — The Transitioner',
      caption: '26 · Investment Analyst — First jobber inheriting household bills from his parents.',
      image: marcusJourneyMap,
      alt: "Marcus's journey map — first jobber inheriting household bills",
    },
    {
      label: 'Hana — The Delegator',
      caption: '28 · Customer Service Executive — Partner who wants to stay informed about household bills without taking over the workload.',
      image: hanaJourneyMap,
      alt: "Hana's journey map — partner who wants to stay informed without taking over",
    },
    {
      label: 'Firdaus — The Household CFO',
      caption: '30 · Engineer — The person who tracks and pays all shared bills across multiple apps and spreadsheets.',
      image: firdausJourneyMap,
      alt: "Firdaus's journey map — tracker of all shared bills across apps and spreadsheets",
    },
  ];
  return (
    <section style={{ backgroundColor: C.bg, padding: '80px', paddingTop: '80px', paddingBottom: '80px' }} className="max-md:!px-6 max-md:!py-16 max-lg:!px-10 max-lg:!py-14">
      <SectionLabel text="User Journey Maps" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '72px' }}>
        {personas.map((p) => (
          <div key={p.label}>
            <h3 style={{ fontFamily: F.sans, fontSize: '18px', fontWeight: 600, color: C.primary, margin: '0 0 6px 0', lineHeight: 1.3 }}>{p.label}</h3>
            <p style={{ fontFamily: F.sans, fontSize: '14px', color: C.secondary, margin: '0 0 20px 0', lineHeight: 1.5 }}>{p.caption}</p>
            <a
              href={p.image}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${p.label}'s journey map in a new tab to view at full size`}
              style={{ display: 'block', cursor: 'zoom-in', borderRadius: '6px', overflow: 'hidden' }}
            >
              <img
                src={p.image}
                alt={p.alt}
                loading="lazy"
                decoding="async"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </a>
          </div>
        ))}
      </div>
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

// Warm desaturated-gold accent for the Usability Testing visual flourishes.
// Sits next to AXS's primary blue accent without competing with it.
const USABILITY_WARM = '#A89476';
const USABILITY_WARM_TRACK = '#2A2520';

// Animated counter — counts from 0 to `to` when scrolled into view (once).
function CountUp({ to, durationMs = 1200, formatter }: { to: number; durationMs?: number; formatter: (v: number) => string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = () => {
      const elapsed = performance.now() - start;
      const t = Math.min(elapsed / durationMs, 1);
      // easeOutCubic for a slightly springy count-up feel.
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(to * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, durationMs]);
  return <span ref={ref}>{formatter(value)}</span>;
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

      {/* ─── Round 1: Design Feedback Workshop ──────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease }}
        style={{ marginBottom: '96px' }}
      >
        <p style={{ fontFamily: F.sans, fontSize: '11px', color: C.secondary, margin: '0 0 14px 0', letterSpacing: '0.18em', textTransform: 'uppercase' }}>Internal Review</p>
        <h3 style={{ fontFamily: F.editorial, fontSize: 'clamp(24px, 2.6vw, 32px)', color: C.primary, margin: '0 0 18px 0', lineHeight: 1.25, fontWeight: 400, fontStyle: 'italic' }}>Round 1 — Design Feedback Workshop</h3>
        <p style={{ fontFamily: F.sans, fontSize: '15px', color: C.secondary, lineHeight: 1.7, margin: '0 0 36px 0', maxWidth: '720px' }}>
          Before testing with the public, the team ran a design feedback workshop with AXS staff across 5 tasks. Ease of Use ratings used a 1–5 scale (1 = Very Easy, 5 = Very Difficult).
        </p>
        {/* Staggered task cards — each fades up with a 100ms delay between cards.
            Subtle desaturated-gold left border + horizontal rating bar visualise
            each score on the 1–5 scale. */}
        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '14px' }}
          className="max-md:!grid-cols-2 max-lg:!grid-cols-3"
        >
          {workshopRows.map((r, i) => {
            const ratingNum = parseFloat(r.rating);
            const fillPct = Math.min(Math.max((ratingNum / 5) * 100, 0), 100);
            return (
              <motion.div
                key={r.task}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, ease, delay: i * 0.1 }}
                style={{
                  borderLeft: `2px solid ${USABILITY_WARM}`,
                  backgroundColor: '#141414',
                  padding: '22px 22px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <p style={{ fontFamily: F.sans, fontSize: '11px', color: C.secondary, margin: 0, letterSpacing: '0.14em', textTransform: 'uppercase' }}>{r.task}</p>
                <p style={{ fontFamily: F.sans, fontSize: '14px', color: C.primary, margin: 0, lineHeight: 1.4, flex: 1 }}>{r.desc}</p>
                <p style={{ fontFamily: F.editorial, fontSize: 'clamp(40px, 4vw, 52px)', color: C.primary, margin: '6px 0 0 0', lineHeight: 1, letterSpacing: '-0.02em', fontWeight: 400 }}>{r.rating}</p>
                {/* Rating-on-scale indicator: thin filled bar against a dark track. */}
                <div
                  style={{ height: '3px', borderRadius: '2px', backgroundColor: USABILITY_WARM_TRACK, overflow: 'hidden', marginTop: '2px' }}
                  aria-hidden="true"
                >
                  <motion.div
                    initial={{ width: '0%' }}
                    whileInView={{ width: `${fillPct}%` }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 + 0.2 }}
                    style={{ height: '100%', backgroundColor: USABILITY_WARM }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* ─── Top Issue From Each Task ────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease }}
        style={{ marginBottom: '96px' }}
      >
        <p style={{ fontFamily: F.sans, fontSize: '12px', color: C.secondary, margin: '0 0 24px 0', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Top issue from each task</p>
        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}
          className="max-md:!grid-cols-1"
        >
          {workshopIssues.map((issue, i) => (
            <motion.div
              key={issue.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease, delay: i * 0.08 }}
              whileHover={{ backgroundColor: '#1E1E1E' }}
              style={{
                position: 'relative',
                backgroundColor: '#141414',
                padding: '32px 32px 28px',
                overflow: 'hidden',
                transition: 'background-color 0.3s ease',
              }}
            >
              {/* Large low-opacity numeral sitting behind the content. */}
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '24px',
                  fontFamily: F.editorial,
                  fontSize: '40px',
                  color: C.primary,
                  opacity: 0.18,
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  pointerEvents: 'none',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div style={{ position: 'relative', paddingTop: '48px' }}>
                <h4 style={{ fontFamily: F.sans, fontSize: '17px', color: C.primary, margin: '0 0 10px 0', fontWeight: 600, lineHeight: 1.3 }}>{issue.title}</h4>
                <p style={{ fontFamily: F.sans, fontSize: '14px', color: '#8A8A82', margin: 0, lineHeight: 1.6 }}>{issue.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ─── Divider between Round 1 (internal) and Round 2 (public) ─────── */}
      <div
        aria-hidden="true"
        style={{ height: '1px', backgroundColor: C.cardBorder, margin: '24px 0 96px 0' }}
      />

      {/* ─── Round 2: Usability Testing (with Public) ────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease }}
        style={{ marginBottom: '64px' }}
      >
        <p style={{ fontFamily: F.sans, fontSize: '11px', color: C.secondary, margin: '0 0 14px 0', letterSpacing: '0.18em', textTransform: 'uppercase' }}>Public Testing</p>
        <h3 style={{ fontFamily: F.editorial, fontSize: 'clamp(24px, 2.6vw, 32px)', color: C.primary, margin: '0 0 18px 0', lineHeight: 1.25, fontWeight: 400, fontStyle: 'italic' }}>Round 2 — Usability Testing</h3>
        <p style={{ fontFamily: F.sans, fontSize: '15px', color: C.secondary, lineHeight: 1.7, margin: '0 0 40px 0', maxWidth: '720px' }}>
          Following the internal workshop, the team conducted usability testing with 5 members of the public — 2 first jobbers and 3 young couples — using their own devices.
        </p>

        {/* Test Plan — describes the public usability test setup. */}
        <h3 style={{ fontFamily: F.editorial, fontSize: 'clamp(22px, 2.4vw, 30px)', color: C.primary, margin: '0 0 24px 0', lineHeight: 1.25, fontWeight: 400 }}>Test Plan</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }} className="max-md:!grid-cols-1">
          {planRows.map((r) => (
            <div key={r.label} style={{ border: `1px solid ${C.cardBorder}`, padding: '24px' }}>
              <p style={{ fontFamily: F.sans, fontSize: '12px', color: C.secondary, margin: '0 0 10px 0', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{r.label}</p>
              <p style={{ fontFamily: F.sans, fontSize: '15px', color: C.primary, margin: 0, lineHeight: 1.6 }}>{r.value}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ─── Usability Test Results — hero moment ─────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease }}
        style={{ textAlign: 'center', paddingTop: '24px' }}
      >
        <p style={{ fontFamily: F.sans, fontSize: '11px', color: C.secondary, margin: '0 0 24px 0', letterSpacing: '0.16em', textTransform: 'uppercase' }}>Overall Ease of Use Rating</p>
        <div
          style={{
            fontFamily: F.editorial,
            fontSize: 'clamp(64px, 9vw, 96px)',
            lineHeight: 1,
            letterSpacing: '-0.03em',
            fontWeight: 400,
            margin: '0 0 28px 0',
            color: '#EBEBE5',
          }}
        >
          <CountUp to={3} formatter={(v) => v.toFixed(1).replace('.0', '')} />
          <span style={{ color: '#5A5A54' }}>/5</span>
        </div>
        {/* Inline supporting stats — small text beneath the hero number. */}
        <p style={{ fontFamily: F.sans, fontSize: '12px', color: C.secondary, margin: '0 0 36px 0', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          {resultStats.filter((s) => s.label !== 'Overall Ease of Use').map((s) => `${s.number} ${s.label}`).join('  ·  ')}
        </p>
        <p style={{ fontFamily: F.sans, fontSize: '16px', color: C.primary, lineHeight: 1.7, margin: '0 auto', maxWidth: '640px' }}>
          Users navigated quickly through Tasks 2 and 3 but penalised the overall rating because Tasks 5 and 6 broke the flow for them. One user brought the rating up to 4/5 because of the steep learning curve on first use and the confusion about navigating to a separate Pay Bills section to actually make payment.
        </p>
      </motion.div>
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
  { id: 'journey-maps', label: 'Journey Maps' },
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
          <FadeUp id="problem"><ProblemStatement /></FadeUp>
          <FadeUp id="research"><ResearchFindings /></FadeUp>
          <FadeUp id="journey-maps"><UserJourneyMaps /></FadeUp>
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