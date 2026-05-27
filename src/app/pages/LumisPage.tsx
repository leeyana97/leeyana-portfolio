import { motion } from 'motion/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Navigation } from '../components/Navigation';
import { PasswordGate } from '../components/PasswordGate';
import { CaseStudySidebar, type SidebarItem } from '../components/CaseStudySidebar';
import { FadeUp, StaggerCards, BeforeAfter, AnimatedLine, staggerContainer, fadeUpItem, ease } from '../components/Animate';
import { useImagesLoaded } from '../components/useImagesLoaded';
import lumisImg from '../../imports/Lumis_portfolio_homepage.png';
import lumisIpadImg from '../../imports/Lumis_ipad.webp';
import lumisLaptopImg from '../../imports/Lumis_laptop.webp';

// Hero entrance lives in CSS keyframes (see CaseStudyHero) rather than
// framer-motion, because the route-level <AnimatePresence> in routes.tsx
// suppresses inner motion mount animations.

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

// Lumis is a website project, so its before/after comparisons render inside a
// browser-window frame (chrome bar + address pill) rather than a phone shell.
function WebsiteMockup({ label, opacity = 1 }: { label?: string; opacity?: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%' }}>
        {label && <span style={{ display: 'block', textAlign: 'center', fontFamily: F.sans, fontSize: '13px', color: C.secondary, marginBottom: '10px' }}>{label}</span>}
        <div style={{ width: '100%', borderRadius: '12px', overflow: 'hidden', border: `1px solid ${C.cardBorder}`, backgroundColor: '#161616', opacity }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '11px 14px', backgroundColor: '#1E1E1E', borderBottom: `1px solid ${C.cardBorder}` }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FF5F57' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FEBC2E' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#28C840' }} />
            <div style={{ flex: 1, marginLeft: '8px', height: '18px', borderRadius: '6px', backgroundColor: '#2A2A2A' }} />
          </div>
          <div style={{ width: '100%', aspectRatio: '16 / 10', overflow: 'hidden' }}>
            <img src={lumisImg} alt={label || 'Lumis Skincare website'} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function CaseStudyHero() {
  // The site's <AnimatePresence> in PageTransitionLayout suppresses inner
  // framer-motion mount animations. Use plain CSS keyframes for the hero
  // slide-in — those fire on mount unconditionally.
  //
  // On mobile we keep the same iPad + MacBook layered showcase, just
  // reordered to appear AFTER the text block so the project name reads
  // first without any scroll. The clamp() heights already scale.
  //
  // The slide-in CSS keyframes are gated on `imagesReady` — we only
  // attach the `--ipad` / `--laptop` modifier classes (which set the
  // `animation-name`) after both images are downloaded AND decoded.
  // Until then the base `.lumis-device` class keeps them at opacity 0,
  // so the entrance plays smoothly against in-memory bitmaps.
  const imagesReady = useImagesLoaded([lumisIpadImg, lumisLaptopImg]);
  return (
    <section
      style={{ paddingTop: '120px', paddingBottom: '0', paddingLeft: '80px', paddingRight: '80px', backgroundColor: C.bg }}
      className="max-md:!px-6 max-md:!pt-24 max-lg:!px-10 max-md:!flex max-md:!flex-col"
    >
      <style>{`
        @keyframes lumisSlideInLeft {
          from { opacity: 0; transform: translate(-100vw, calc(-50% + 20px)); }
          to   { opacity: 1; transform: translate(0, -50%); }
        }
        @keyframes lumisSlideInRight {
          from { opacity: 0; transform: translate(100vw, calc(-50% + 20px)); }
          to   { opacity: 1; transform: translate(0, -50%); }
        }
        .lumis-device {
          opacity: 0;
          animation-duration: 1.2s;
          animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
          animation-delay: 0.3s;
          animation-fill-mode: forwards;
          will-change: transform, opacity;
        }
        .lumis-device--ipad   { animation-name: lumisSlideInLeft;  }
        .lumis-device--laptop { animation-name: lumisSlideInRight; }
        @media (prefers-reduced-motion: reduce) {
          .lumis-device { animation: none; opacity: 1; transform: translateY(-50%); }
        }
        /* Mobile-only: nudge both devices 5% leftward (desktop unchanged).
           Inline styles set the desktop lefts (laptop 38%, iPad 0%); these
           media-query rules use !important to override on viewports < 768px. */
        @media (max-width: 767.98px) {
          .lumis-device--laptop { left: 33% !important; }
          .lumis-device--ipad   { left: -5% !important; }
        }
      `}</style>
      {/* ─── Layered iPad + MacBook showcase — same on desktop and mobile,
          ordered after the text block on mobile. ─── */}
      <div
        className="max-md:!order-2 max-md:!h-[clamp(280px,78vw,460px)]"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          height: 'clamp(440px, 58vw, 660px)',
          overflow: 'hidden',
        }}
      >
        {/* MacBook — behind, right side, slides in from the right edge. */}
        <img
          src={lumisLaptopImg}
          alt="Lumis Skin Match page on a MacBook"
          aria-hidden="true"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className={`lumis-device ${imagesReady ? 'lumis-device--laptop' : ''}`}
          style={{
            position: 'absolute',
            top: '40%',
            left: '38%',
            width: '72.6%',
            zIndex: 1,
            height: 'auto',
            display: 'block',
            pointerEvents: 'none',
          }}
        />
        {/* iPad — front, left side, slides in from the left edge. */}
        <img
          src={lumisIpadImg}
          alt="Lumis Skincare website on an iPad"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className={`lumis-device ${imagesReady ? 'lumis-device--ipad' : ''}`}
          style={{
            position: 'absolute',
            top: '45%',
            left: '0%',
            width: '59.4%',
            zIndex: 2,
            height: 'auto',
            display: 'block',
            pointerEvents: 'none',
          }}
        />
      </div>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        style={{ marginTop: '60px' }}
        className="max-md:!order-1 max-md:!mt-0"
      >
        <motion.h1 variants={fadeUpItem} style={{ fontFamily: F.editorial, fontSize: 'clamp(42px, 7vw, 96px)', color: C.primary, margin: '0 0 20px 0', lineHeight: 0.95, letterSpacing: '-0.02em', fontWeight: 400 }}>
          Lumis Skincare
        </motion.h1>
        <motion.p variants={fadeUpItem} style={{ fontFamily: F.sans, fontSize: 'clamp(17px, 2vw, 20px)', color: C.secondary, margin: '0 0 24px 0', lineHeight: 1.5 }}>
          A Personalised Skincare E-Commerce Website for Confident Product Discovery
        </motion.p>
        <motion.p variants={fadeUpItem} style={{ fontFamily: F.sans, fontSize: '14px', color: C.secondary, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0, display: 'inline-flex', alignItems: 'center', flexWrap: 'wrap', gap: '4px' }}>
          <span>Tools: Figma, Claude AI&nbsp;&nbsp;·&nbsp;&nbsp;Platform:&nbsp;</span>
          <span style={{ fontFamily: F.sans, fontSize: '13px', color: '#C4A265', border: '1px solid #8A6F40', backgroundColor: 'rgba(196, 162, 101, 0.06)', borderRadius: '20px', padding: '4px 12px', whiteSpace: 'nowrap', letterSpacing: '0.08em' }}>Web</span>
        </motion.p>
      </motion.div>

      {/* ─── Stats strip — sibling of text/mockup so it can be ordered last on mobile. */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="max-md:!order-3"
      >
        <StatsStrip />
      </motion.div>
    </section>
  );
}

// Inline stats strip — sits under the hero meta (matches TripSync structure).
function StatsStrip() {
  // `desktopSuffix` is hidden on mobile to keep the last stat's label on a
  // single line, matching TripSync's strip height. "Success Rate (Key Tasks)"
  // wraps to 2 lines below 768px; "Success Rate" alone fits one line.
  const stats: Array<{ number: string; label: string; desktopSuffix?: string }> = [
    { number: '2 Weeks', label: 'Duration' },
    { number: '10', label: 'Users Interviewed' },
    { number: '5', label: 'Users Tested' },
    { number: '10', label: 'Tasks Tested' },
    { number: '100%', label: 'Success Rate', desktopSuffix: '(Key Tasks)' },
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
          <p style={{ fontFamily: F.sans, fontSize: '11px', color: '#8A8A82', margin: 0, lineHeight: 1.4, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
            {s.label}
            {s.desktopSuffix && <span className="max-md:!hidden"> {s.desktopSuffix}</span>}
          </p>
        </div>
      ))}
    </div>
  );
}

function ProblemStatement() {
  const painPoints = [
    { title: 'No reliable skin matching', desc: 'No way to match products to multiple overlapping skin concerns in one place.' },
    { title: 'No compatibility checking', desc: 'No tools to check whether a new product works with an existing routine.' },
    { title: 'No low-risk trialling', desc: 'No option to sample or trial before committing to a full purchase.' },
    { title: 'Reliance on external sources', desc: 'Users depend on friends, social media, and costly trial and error instead of the shopping experience itself.' },
  ];
  return (
    <section style={{ backgroundColor: C.problemBg, padding: '80px', paddingTop: '80px', paddingBottom: '80px' }} className="max-md:!px-6 max-md:!py-16 max-lg:!px-10 max-lg:!py-14">
      <h2 className="cs-section-header">
        The Problem.
      </h2>
      <p style={{ fontFamily: F.sans, fontSize: '17px', color: C.primary, lineHeight: 1.7, margin: '0 0 48px 0', maxWidth: '720px' }}>
        Users need a way to confidently identify and commit to skincare products suited to their specific skin profile, because the current online shopping experience offers no reliable way to match products to multiple overlapping concerns, check compatibility with their existing routine, or trial before committing. This forces them to rely on friends, social media, and costly trial and error instead.
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
    { title: 'Trust is people-driven, not platform-driven', desc: "Shoppers trust peer recommendations from platforms like Reddit over brand-owned content because there's no financial incentive for contributors. It's people passionately sharing honest opinions." },
    { title: 'Suitability comes through costly trial and error', desc: 'Finding the right skincare products involves a lot of trial and error, which translates to wasted money. Users lack reliable ways to assess product suitability before committing.' },
    { title: 'Online shopping lacks guidance to commit', desc: 'Skincare e-commerce sites are difficult to navigate, with products scattered across overlapping subcategories. Users struggle to figure out where specific products fall, making confident purchasing difficult.' },
    { title: 'Price filters but doesn’t decide', desc: "Budget matters, but users are willing to splurge when branding and presentation signal quality. Price alone doesn't drive the purchase decision. Perception of value does." },
    { title: 'Skin knowledge is self-taught and uneven', desc: 'Some users understand nuances like the difference between hydration and moisturisation through personal analysis, while others have gaps. Knowledge levels vary widely.' },
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

function SolutionStatement() {
  return (
    <section style={{ backgroundColor: C.bg, padding: '120px 80px', paddingTop: '120px', paddingBottom: '120px' }} className="max-md:!px-6 max-md:!py-20 max-lg:!px-10 max-lg:!py-24">
      <SectionLabel text="Solution Statement" />
      <p style={{
        fontFamily: F.editorial,
        fontSize: 'clamp(28px, 3.8vw, 48px)',
        color: C.primary,
        lineHeight: 1.3,
        letterSpacing: '-0.01em',
        fontWeight: 400,
        margin: 0,
        maxWidth: '1080px',
      }}>
        To design a skincare e-commerce website that provides a personalised skin-matching and product discovery system that surfaces compatible recommendations across multiple skin concerns and enables low-risk trialling before full purchase commitment.
      </p>
    </section>
  );
}

function InformationArchitecture() {
  const categories = [
    {
      name: 'Creams',
      products: [
        'Dr.Jart+ Cicapair Tiger Grass Cream',
        'Laneige Water Bank Blue Hyaluronic Cream',
        'COSRX Advanced Snail 92 All in One Cream',
        "Kiehl's Ultra Facial Cream",
        'Hada Labo Gokujyun Hyaluronic Acid Lotion',
      ],
    },
    {
      name: 'Serums',
      products: [
        'Innisfree Retinol Cica Moisture Recovery Serum',
        'Sulwhasoo Concentrated Ginseng Renewing Serum',
        'Beauty of Joseon Glow Serum with Propolis',
        'La Roche-Posay Hyalu B5 Serum',
        'SKII Facial Treatment Essence',
      ],
    },
    {
      name: 'Toners',
      products: [
        'Some By Mi AHA BHA PHA Miracle Toner',
        "Kiehl's Calendula Herbal Extract Toner",
        'The Ordinary Glycolic Acid 7% Toning Solution',
      ],
    },
    {
      name: 'Cleansers',
      products: [
        'CeraVe Hydrating Facial Cleanser',
        'COSRX Low pH Good Morning Gel Cleanser',
        'DHC Deep Cleansing Oil',
      ],
    },
    {
      name: 'Masks',
      products: [
        'Innisfree Jeju Volcanic Pore Clay Mask',
        'Laneige Lip Sleeping Mask EX Berry',
      ],
    },
  ];
  return (
    <section style={{ backgroundColor: C.bg, padding: '80px', paddingTop: '80px', paddingBottom: '80px' }} className="max-md:!px-6 max-md:!py-16 max-lg:!px-10 max-lg:!py-14">
      <SectionLabel text="Information Architecture" />
      <p style={{ fontFamily: F.sans, fontSize: '17px', color: C.primary, lineHeight: 1.7, margin: '0 0 64px 0', maxWidth: '720px' }}>
        10 users were asked to sort 20 products into categories, with 1 user failing to name the categories of products they had sorted. Below are the results from 9 users.
      </p>

      {/* Tree-style layout: parent label connected to 5 category cards */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0' }}>
        {/* Parent node */}
        <div style={{
          padding: '14px 28px',
          border: `1px solid ${C.cardBorder}`,
          backgroundColor: C.statsBg,
          fontFamily: F.sans,
          fontSize: '12px',
          color: C.primary,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          borderRadius: '4px',
        }}>
          Product Type
        </div>
        {/* Vertical connector down from parent */}
        <div style={{ width: '1px', height: '32px', backgroundColor: C.cardBorder }} className="max-md:!hidden" />
        {/* Horizontal spanning line above category cards */}
        <div style={{ width: '90%', maxWidth: '1200px', height: '1px', backgroundColor: C.cardBorder, marginBottom: '0' }} className="max-md:!hidden" />

        <StaggerCards
          style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', width: '100%', marginTop: '0' }}
          className="max-md:!grid-cols-1 max-md:!gap-4 max-lg:!grid-cols-2 max-lg:!gap-4"
        >
          {categories.map((cat) => (
            <div key={cat.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {/* Vertical drop from horizontal spanning line */}
              <div style={{ width: '1px', height: '32px', backgroundColor: C.cardBorder }} className="max-md:!hidden" />
              <div style={{
                width: '100%',
                border: `1px solid ${C.cardBorder}`,
                backgroundColor: C.statsBg,
                padding: '24px 20px',
                borderRadius: '4px',
              }}>
                <h3 style={{ fontFamily: F.editorial, fontSize: '22px', color: C.primary, margin: '0 0 18px 0', lineHeight: 1.2, fontWeight: 400 }}>{cat.name}</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {cat.products.map((p) => (
                    <li key={p} style={{ fontFamily: F.sans, fontSize: '13px', color: C.secondary, lineHeight: 1.5 }}>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </StaggerCards>
      </div>
    </section>
  );
}

function UsabilityTesting() {
  const stats = [
    { number: '5', label: 'Participants' },
    { number: '10', label: 'Tasks Tested' },
    { number: '100%', label: 'Success Rate (Key Tasks)' },
    { number: '4', label: 'Key Tasks Focused' },
  ];
  const insights = [
    'Testing covered the end-to-end skincare shopping experience: from identifying products tailored to skin type and concerns, to trialling, comparing, and committing to a routine across 10 tasks with 5 participants.',
    'The four key tasks that directly challenged the problem statement (the Skin Profile Quiz, Trial Sample request, Review Filtering, and Ingredient Compatibility check) each achieved a 100% completion rate.',
    'Positive sentiment clustered around the aesthetics, ingredient features, and the quiz flow. Participants described the discovery experience as calmer and more guided than typical skincare sites.',
    'The friction that surfaced was rarely task failure. It was labelling that didn’t match user expectations, feedback signals that felt too subtle to confirm an action, and discoverability gaps for features that existed but weren’t easily found. These observations drove the four targeted iterations in the following section.',
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
      label: 'Skin Profile Quiz',
      task: 'Complete the Skin Profile Quiz as a First-Time User',
      successRate: '100% (5/5)',
      problem: '2/5 users wanted to select more than one skin type (e.g. combination + sensitive) but the quiz only allowed a single selection. Both proceeded with one selection but the constraint introduced inaccuracy into their recommendations.',
      solution: 'Remove the "sensitive" button from skin type since sensitivity is already represented under "Redness and sensitivity" in the skin concern section. This means skin type is more about oil production (Dry, Oily, Combination, or Normal).',
    },
    {
      label: 'Trial Sample Feedback',
      task: 'Request a Trial Sample from Quiz Recommendations',
      successRate: '100% (5/5)',
      problem: '3/5 users did not notice that the cart icon counter updates when a sample is added, as there was no visible indication. They expected a motion animation from the product to the cart, as seen on other e-commerce sites.',
      solution: 'Add a press animation when the button is clicked and transform the button state to "✓ Sample Added!" briefly on click before reverting.',
    },
    {
      label: 'Review Filter Discoverability',
      task: 'Filter Product Reviews by Skin Type',
      successRate: '100% (5/5)',
      problem: '2/5 users had difficulty finding their way to the specific product page to access written reviews and the skin type filter. Both expected a review discovery path that didn’t require navigating to an individual product page.',
      solution: 'Under the "Loved by the Community" UGC section on the homepage, add a "Read reviews →" link, linking directly to the reviews section of that product page.',
    },
    {
      label: 'Ingredient Compare Input',
      task: 'Check Ingredient Compatibility with an Existing Product',
      successRate: '100% (5/5)',
      problem: '2/5 users typed their external toner’s name into the site’s global search bar first, rather than the dedicated "your own product" input inside the Compare tool. The input exists but is not visually distinct enough to be discovered without prompting.',
      solution: 'Update the placeholder to "Search for Lumis Skincare product to compare..." making it clear this bar is not for external products. Apply a dashed border and plus (+) icon to the external input, rename the button to "Add your own", add a label "Not sold on Lumis." below it, and show a one-time tooltip on first visit.',
    },
  ];
  return (
    <section style={{ backgroundColor: C.bg, padding: '80px', paddingTop: '80px', paddingBottom: '80px' }} className="max-md:!px-6 max-md:!py-16 max-lg:!px-10 max-lg:!py-14">
      <SectionLabel text="Top Issues Found & Changes Made" />
      <h2 className="cs-section-header">What Changed & Why</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
        {issues.map((issue) => (
          <div key={issue.label}>
            <p className="cs-category-label">{issue.label}</p>
            <p style={{ fontFamily: F.sans, fontSize: '14px', color: C.secondary, lineHeight: 1.6, margin: '0 0 8px 0', fontStyle: 'italic', maxWidth: '760px' }}>
              Task: {issue.task}
            </p>
            <p style={{ fontFamily: F.sans, fontSize: '13px', color: C.secondary, margin: '0 0 20px 0', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Success Rate: <span style={{ color: C.primary }}>{issue.successRate}</span>
            </p>
            <p className="cs-body-text" style={{ margin: '0 0 16px 0', maxWidth: '760px' }}>{issue.problem}</p>
            <p className="cs-body-text" style={{ margin: '0 0 40px 0', maxWidth: '760px' }}>{issue.solution}</p>
            <BeforeAfter
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}
              className="max-md:!grid-cols-1 max-md:!gap-8 max-lg:!grid-cols-1 max-lg:!gap-8"
              before={<WebsiteMockup label="Before" />}
              after={<WebsiteMockup label="After" />}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function Impact() {
  const outcomes = [
    { title: 'Labelling friction identified', desc: 'Words used in the interface did not always match what users expected, causing momentary confusion.' },
    { title: 'Insufficient interface feedback', desc: 'Users completed actions but the interface did not respond visibly enough to confirm success.' },
    { title: 'Discoverability issues surfaced', desc: 'Features existed on the website but users could not find them easily or did not notice them without extra effort.' },
    { title: '4 of 4 key tasks achieved 100% success', desc: 'All highlighted tasks achieved full completion while still surfacing actionable improvements for iteration.' },
  ];
  return (
    <section style={{ backgroundColor: C.bg, padding: '80px', paddingTop: '100px', paddingBottom: '100px' }} className="max-md:!px-6 max-md:!py-20 max-lg:!px-10">
      <h2 style={{ fontFamily: F.editorial, fontSize: 'clamp(32px, 4.5vw, 52px)', color: C.primary, margin: '0 0 24px 0', lineHeight: 1.1, letterSpacing: '-0.02em', fontWeight: 400, textAlign: 'center' }}>
        User Satisfaction
      </h2>
      <p style={{ fontFamily: F.sans, fontSize: 'clamp(17px, 2vw, 20px)', color: C.primary, margin: '0 auto 72px auto', lineHeight: 1.6, maxWidth: '780px', textAlign: 'center' }}>
        Overall satisfaction was high across all 5 participants. Aesthetic, ingredient features, and the quiz flow received particularly strong positive sentiment.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', maxWidth: '1080px', margin: '0 auto' }} className="max-md:!grid-cols-1">
        {outcomes.map((o) => (
          <div key={o.title} style={{ border: `1px solid ${C.cardBorder}`, padding: '28px' }}>
            <h4 style={{ fontFamily: F.editorial, fontSize: '22px', color: C.primary, margin: '0 0 14px 0', lineHeight: 1.3, fontWeight: 400 }}>{o.title}</h4>
            <p style={{ fontFamily: F.sans, fontSize: '15px', color: C.secondary, margin: 0, lineHeight: 1.6 }}>{o.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Reflections() {
  const cards = [
    { number: '01', title: 'Quiz Design Requires Careful Constraint Choices', body: 'The skin type quiz exposed how a seemingly simple single-select constraint can introduce inaccuracy. Designing personalisation tools means being especially careful about where to constrain and where to allow flexibility.' },
    { number: '02', title: 'Feedback Signals Need to Match User Expectations', body: "The trial sample finding showed that e-commerce conventions like cart animations have become user expectations. Subtle updates to counters aren't enough. The interface needs to actively confirm that an action was registered." },
    { number: '03', title: "Discoverability Can't Be Assumed", body: 'Multiple tasks revealed that features users needed were present but not found. Labels, placement, and visual hierarchy all need to be designed for first-time discovery, not just for repeat use.' },
    { number: '04', title: 'Input Differentiation is Critical', body: 'The ingredient compatibility tool showed that when multiple input fields serve different purposes, they need strong visual and textual differentiation to avoid users defaulting to the most familiar pattern.' },
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
      <h2 style={{ fontFamily: F.editorial, fontSize: 'clamp(32px, 4.5vw, 52px)', color: C.primary, margin: '0 0 20px 0', lineHeight: 1.1, letterSpacing: '-0.02em', fontWeight: 400 }}>Experience Lumis.</h2>
      <p style={{ fontFamily: F.sans, fontSize: '17px', color: C.secondary, margin: '0 0 32px 0', lineHeight: 1.7, maxWidth: '580px' }}>
        Explore the full interactive prototype, from first discovery to a completed skincare routine.
      </p>
      <a href="#" style={{ fontFamily: F.sans, fontSize: '17px', color: C.primary, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', borderBottom: `1px solid ${C.border}`, paddingBottom: '4px', transition: 'border-color 0.2s' }}
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
      onClick={() => navigate('/neighbourlah')}
    >
      <p style={{ fontFamily: F.sans, fontSize: '13px', color: C.secondary, letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 12px 0' }}>Next Project</p>
      <p style={{ fontFamily: F.editorial, fontSize: 'clamp(28px, 3.5vw, 42px)', color: C.primary, margin: 0, letterSpacing: '-0.01em', lineHeight: 1.1, fontWeight: 400 }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
        NeighbourLah
      </p>
    </section>
  );
}

const sidebarItems: SidebarItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'research', label: 'Research' },
  { id: 'problem', label: 'Problem' },
  { id: 'solution', label: 'Solution' },
  { id: 'information-architecture', label: 'Information Architecture' },
  { id: 'usability-testing', label: 'Usability Testing' },
  { id: 'iterations', label: 'Issues & Changes' },
  { id: 'impact', label: 'Impact' },
  { id: 'reflections', label: 'Reflections' },
];

export function LumisPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <PasswordGate storageKey="lumis-unlocked">
    <div style={{ backgroundColor: C.bg, minHeight: '100vh', '--accent-color': '#C4A265' } as React.CSSProperties}>
      <Navigation showBack />
      <div className="cs-layout">
        <CaseStudySidebar items={sidebarItems} />
        <div className="cs-content">
          <div id="overview"><CaseStudyHero /></div>
          <FadeUp id="research"><ResearchFindings /></FadeUp>
          <FadeUp id="problem"><ProblemStatement /></FadeUp>
          <FadeUp id="solution"><SolutionStatement /></FadeUp>
          <FadeUp id="information-architecture"><InformationArchitecture /></FadeUp>
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