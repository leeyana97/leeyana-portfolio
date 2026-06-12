import { motion, useInView } from 'motion/react';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { Navigation } from '../components/Navigation';
import { PasswordGate } from '../components/PasswordGate';
import { CaseStudySidebar, type SidebarItem } from '../components/CaseStudySidebar';
import { FadeUp, StaggerCards, AnimatedQuote, AnimatedLine, staggerContainer, fadeUpItem, ease } from '../components/Animate';
import { useImagesLoaded } from '../components/useImagesLoaded';
import { MobileCarouselWrap } from '../components/MobileCarouselWrap';
import neighbourlahImg from '../../imports/NeighbourLah_home_app.png';

// Hero phone images served from Cloudinary. w_900 gives ~2x retina
// sharpness for the ~360px max-width display on desktop while keeping
// the wire size small. The layered stacked→fanned animation below uses
// these directly; mobile only shows the centre phone.
const nlbHeroLeft   = 'https://res.cloudinary.com/dvunn40le/image/upload/w_900,q_auto,f_auto/neighbourlah_1_hero_szdsgt.png';
const nlbHeroCentre = 'https://res.cloudinary.com/dvunn40le/image/upload/w_900,q_auto,f_auto/neighbourlah_3_hero.png_hxh98d.png';
const nlbHeroRight  = 'https://res.cloudinary.com/dvunn40le/image/upload/w_900,q_auto,f_auto/neighbourlah_2_hero_uhtk2z.png';

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
      className="cs-section-label-wrap"
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

// Phone frame ported from TripSync's ScreenMockup so both case studies
// share the same iPhone shell: brushed-metal gradient bezel, dynamic
// island, side power/volume/ringer detail buttons, inset highlights,
// and an outer drop shadow. `src` is optional — call sites pass it for
// real screen images; when omitted the imported hero PNG renders as a
// placeholder for blocks where the final asset hasn't been wired in yet.
function ScreenMockup({ label, opacity = 1, src, videoSrc, maxWidth = 260 }: { label?: string; opacity?: number; src?: string; videoSrc?: string; maxWidth?: number }) {
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
                src={videoSrc}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
              />
            ) : (
              <img
                src={src ?? neighbourlahImg}
                alt={label || 'NeighbourLah screen'}
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

function CaseStudyHero() {
  // Gate the stacked→fanned entrance on all three phone images being
  // downloaded AND decoded so the animation runs against in-memory
  // bitmaps. Without this the slide-out would fire mid-stream and
  // produce visible pop-in.
  const imagesReady = useImagesLoaded([nlbHeroLeft, nlbHeroCentre, nlbHeroRight]);

  // Shared timing for the fan-out. 300ms hold (stacked) → 700ms ease-in-out
  // outward slide. All three phones share the same delay/duration so they
  // fan apart simultaneously rather than stagger.
  const FAN_DELAY = 0.3;
  const FAN_DURATION = 0.7;
  const FAN_EASE: [number, number, number, number] = [0.4, 0, 0.2, 1]; // cubic-bezier ease-in-out

  // Single set of geometry values used on both viewports — mobile
  // mirrors desktop exactly. The wrapper goes edge-to-edge on mobile
  // (see classes below); any side-phone overflow past the viewport
  // is clipped by the wrapper's overflow:hidden, identical to how
  // desktop renders when the wrapper itself is narrower than 1280px.
  const sideOffsetPct = 55;
  const centreScale   = 1;
  const sideScale     = 0.9;
  const initialScale  = 0.85;

  return (
    <section
      style={{ paddingTop: '120px', paddingBottom: '0', paddingLeft: '80px', paddingRight: '80px', backgroundColor: C.bg }}
      className="max-md:!px-6 max-md:!pt-24 max-lg:!px-10 max-md:!flex max-md:!flex-col"
    >
      {/* ─── 3-phone hero (stacked → fanned) ────────────────────────────
          All three phones start centred and stacked (same transform
          origin) at `initialScale` with opacity 0. After FAN_DELAY they
          fan outward over FAN_DURATION to their final positions:
            - Left phone:   x = -50% - sideOffsetPct%, scale sideScale
            - Centre phone: x = -50%,                  scale centreScale
            - Right phone:  x = -50% + sideOffsetPct%, scale sideScale
          Z-order ensures the centre phone overlays the side phones.
          Mobile uses smaller offset + smaller scales so all three fit
          inside a ~375px viewport without clipping or hiding. */}
      <div
        // On mobile the wrapper goes edge-to-edge of the viewport so the
        // side phones have ~48px more horizontal room to fan out without
        // clipping (the section's px-6 padding is countered by w-screen
        // + a negative left margin that pulls the wrapper back to the
        // viewport's left edge). Desktop margins are unchanged.
        className="max-md:!order-2 max-md:!mt-6 max-md:!h-[clamp(280px,78vw,460px)] max-md:!w-screen max-md:!-ml-6 max-md:!max-w-none"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          height: 'clamp(300px, 55vw, 640px)',
          // The phones are positioned absolutely against this container;
          // overflow:hidden clips anything that would otherwise stretch
          // the page during the brief stacked → fanned transition.
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Left phone */}
        <motion.img
          src={nlbHeroLeft}
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          initial={{ x: '-50%', y: '-50%', scale: initialScale, opacity: 0 }}
          animate={imagesReady
            ? { x: `calc(-50% - ${sideOffsetPct}%)`, y: '-50%', scale: sideScale, opacity: 1 }
            : { x: '-50%', y: '-50%', scale: initialScale, opacity: 0 }}
          transition={{ duration: FAN_DURATION, delay: FAN_DELAY, ease: FAN_EASE }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            height: '92%',
            width: 'auto',
            zIndex: 1,
            display: 'block',
            pointerEvents: 'none',
            // The source PNGs have a solid #000 background around each
            // phone shape. `mix-blend-mode: lighten` keeps the lighter
            // of the image vs the page bg per-channel — pure black
            // (0,0,0) becomes the page colour #0D0D0D, effectively
            // hiding the rectangular border, while the phone bezel
            // and screen content (all brighter than #0D0D0D) render
            // unchanged.
            mixBlendMode: 'lighten',
            // motion.* sets `x`/`y`/`scale` via the transform property;
            // `translate(-50%, -50%)` baseline is achieved through `x`/`y`
            // values above so the animation interpolates a single transform.
          }}
        />

        {/* Centre phone — always rendered (desktop + mobile) */}
        <motion.img
          src={nlbHeroCentre}
          alt="NeighbourLah app overview"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          initial={{ x: '-50%', y: '-50%', scale: initialScale, opacity: 0 }}
          animate={imagesReady
            ? { x: '-50%', y: '-50%', scale: centreScale, opacity: 1 }
            : { x: '-50%', y: '-50%', scale: initialScale, opacity: 0 }}
          transition={{ duration: FAN_DURATION, delay: FAN_DELAY, ease: FAN_EASE }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            height: '100%',
            width: 'auto',
            zIndex: 3,
            display: 'block',
            pointerEvents: 'none',
            mixBlendMode: 'lighten',
          }}
        />

        {/* Right phone */}
        <motion.img
          src={nlbHeroRight}
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          initial={{ x: '-50%', y: '-50%', scale: initialScale, opacity: 0 }}
          animate={imagesReady
            ? { x: `calc(-50% + ${sideOffsetPct}%)`, y: '-50%', scale: sideScale, opacity: 1 }
            : { x: '-50%', y: '-50%', scale: initialScale, opacity: 0 }}
          transition={{ duration: FAN_DURATION, delay: FAN_DELAY, ease: FAN_EASE }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            height: '92%',
            width: 'auto',
            zIndex: 2,
            display: 'block',
            pointerEvents: 'none',
            mixBlendMode: 'lighten',
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
          NeighbourLah
        </motion.h1>
        <motion.p variants={fadeUpItem} style={{ fontFamily: F.sans, fontSize: 'clamp(17px, 2vw, 20px)', color: C.secondary, margin: '0 0 24px 0', lineHeight: 1.5 }}>
          A Community App That Helps Neighbours Actually Be Neighbours
        </motion.p>
        <motion.p variants={fadeUpItem} style={{ fontFamily: F.sans, fontSize: '14px', color: C.secondary, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0, display: 'inline-flex', alignItems: 'center', flexWrap: 'wrap', gap: '4px' }}>
          <span>Tools: Claude AI&nbsp;&nbsp;·&nbsp;&nbsp;Platform:&nbsp;</span>
          <span style={{ fontFamily: F.sans, fontSize: '13px', color: '#E8632B', border: '1px solid #A03F12', backgroundColor: 'rgba(232, 99, 43, 0.06)', borderRadius: '20px', padding: '4px 12px', whiteSpace: 'nowrap', letterSpacing: '0.08em' }}>iOS App</span>
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
  const stats = [
    { number: '2 Weeks', label: 'Duration' },
    { number: '10', label: 'Users Interviewed' },
    { number: '5', label: 'Users Tested' },
    { number: '5', label: 'Tasks Tested' },
    { number: '5', label: 'Core Features' },
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

// ─── The Challenge (framing paragraph that sets up the research) ───────────
function Challenge() {
  return (
    <section style={{ backgroundColor: C.problemBg, padding: '80px', paddingTop: '80px', paddingBottom: '80px' }} className="max-md:!px-6 max-md:!py-16 max-lg:!px-10 max-lg:!py-14">
      <h2 className="cs-section-header">The Challenge.</h2>
      <p style={{ fontFamily: F.sans, fontSize: '17px', color: C.primary, lineHeight: 1.7, margin: '0 0 24px 0', maxWidth: '720px' }}>
        In high-density estates, you can live metres from your neighbour for years without ever knowing their name. The kampung spirit is still there, but the everyday infrastructure that used to support it isn't, leaving goodwill with nowhere to land.
      </p>
      <p style={{ fontFamily: F.sans, fontSize: '17px', color: C.primary, lineHeight: 1.7, margin: 0, maxWidth: '720px' }}>
        NeighbourLah rebuilds that infrastructure for today's HDB estates. The app surfaces relevant events nearby, connects neighbours over shared interests, and provides a trusted channel for everyday exchanges of help, items, and services.
      </p>
      {/* Skip-ahead button for confident readers who want to see the
          working artefact before reading the design narrative. Pill-
          shaped, filled with the case study's accent (picked up via
          var(--accent-color) set on the page root), dark text for
          contrast. The full editorial PrototypeCTA still sits at the
          end of the case study; this is the early fast-track. */}
      <div style={{ marginTop: '40px' }}>
        <a
          href="https://precious-basbousa-9fdab7.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: F.sans,
            fontSize: '14px',
            fontWeight: 600,
            letterSpacing: '0.04em',
            color: C.bg,
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: 'var(--accent-color)',
            padding: '12px 24px',
            borderRadius: '999px',
            transition: 'opacity 0.2s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          Try the prototype
          <svg aria-hidden="true" width="11" height="11" viewBox="0 0 11 11" fill="none" style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '2px' }}><path d="M1.5 9.5L9.5 1.5M9.5 1.5H3.5M9.5 1.5V7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </a>
      </div>
    </section>
  );
}

// ─── Problem Statement (3 synthesised POVs, one per opportunity area) ──────
// ─── Competitive Analysis ──────────────────────────────────────────────────
// Sits between Research Findings and Problem Statement. Maps the three
// unmet needs from research against the closest competing apps so the
// gap that NeighbourLah is built into is visually obvious before the
// problem is stated. Cells render as Partial (amber) or No (muted red)
// — no app covers all three, which is the point.
function CompetitiveAnalysis() {
  // Each app is rendered as its own editorial verdict card rather than
  // as a row in a table — three cards lined up like magazine reviews.
  // `icon` is the real app icon (Cloudinary, mixed aspect ratios → use
  // object-fit: cover in the renderer). `url` is a research receipt,
  // surfaced only as a small Sources line at the bottom of the section;
  // replace the `#` placeholders with the real links when confirmed.
  type Coverage = {
    dim: string;
    state: 'partial' | 'no';
    note: string;
  };
  type App = {
    name: string;
    icon: string;
    url: string;
    coverage: Coverage[];
  };
  const apps: App[] = [
    {
      name: "PA's Community",
      icon: 'https://res.cloudinary.com/dvunn40le/image/upload/PA_community_app_fuhznl.png',
      url: '#',
      coverage: [
        { dim: 'Discover Relevant Events',        state: 'partial', note: 'No interest filter or search bar; events scattered across confusing tabs.' },
        { dim: 'Connect by Interest',             state: 'no',      note: 'No way to connect neighbours by interest.' },
        { dim: 'Exchange Help, Items & Services', state: 'no',      note: 'No marketplace or requests feature.' },
      ],
    },
    {
      name: 'GoodHood',
      icon: 'https://res.cloudinary.com/dvunn40le/image/upload/Goodhood_app_zibrh8.webp',
      url: '#',
      coverage: [
        { dim: 'Discover Relevant Events',        state: 'no',      note: 'Events buried in an unfiltered feed of random posts.' },
        { dim: 'Connect by Interest',             state: 'no',      note: 'No way to connect neighbours by interest.' },
        { dim: 'Exchange Help, Items & Services', state: 'partial', note: 'Listings and requests exist, but requests lack filtering and go stale.' },
      ],
    },
    {
      name: 'Olio',
      icon: 'https://res.cloudinary.com/dvunn40le/image/upload/Olio_app_dkx37g.jpg',
      url: '#',
      coverage: [
        { dim: 'Discover Relevant Events',        state: 'no',      note: 'No events feature.' },
        { dim: 'Connect by Interest',             state: 'no',      note: 'Forum is topic-based, not people-based.' },
        { dim: 'Exchange Help, Items & Services', state: 'partial', note: 'Item sharing only; no services, not neighbourhood-scoped.' },
      ],
    },
  ];

  // Status palette. Partial → warm amber (a workaround exists), No →
  // muted red (no coverage). The dot is the colour signal; no full-cell
  // tint, which keeps the cards reading as editorial rather than as a
  // patchwork data grid.
  const STATUS = {
    partial: { color: '#D4A04A', label: 'Partial', filled: true },
    no:      { color: '#C26B6B', label: 'No',      filled: false },
  } as const;

  return (
    <section
      style={{ backgroundColor: C.problemBg, padding: '80px', paddingTop: '80px', paddingBottom: '80px', '--cs-section-bg': C.problemBg } as React.CSSProperties}
      className="max-md:!px-6 max-md:!py-16 max-lg:!px-10 max-lg:!py-14"
    >
      <SectionLabel text="Competitive Analysis" />
      <p
        style={{
          fontFamily: F.editorial,
          fontStyle: 'italic',
          fontSize: 'clamp(20px, 2.2vw, 26px)',
          color: C.primary,
          lineHeight: 1.45,
          letterSpacing: '-0.01em',
          fontWeight: 400,
          margin: '0 0 48px 0',
        }}
      >
        No existing app addressed all three unmet needs we identified from research.
      </p>

      {/* Three verdict cards in a 9-row × 3-column subgrid. The outer
          grid declares 9 explicit row tracks (header, header-divider,
          coverage 1, divider 1, coverage 2, divider 2, coverage 3,
          divider 3, footer). Each card uses `grid-template-rows:
          subgrid` and spans all 9 rows, so every conceptual row in
          every card resolves to the same height — the tallest content
          across the three cards. Result: dividers line up exactly.
          Trade-off: short content rows get whitespace below to fill
          the matched height. On tablet/mobile each card stands alone
          (1 column), so the alignment behaviour is moot but the
          layout still renders correctly. */}
      <MobileCarouselWrap count={apps.length}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'auto auto auto auto auto auto auto auto auto',
          gap: '24px',
        }}
        className="competitive-grid mobile-card-carousel max-lg:!grid-cols-1"
      >
        {apps.map((app) => (
          <div
            key={app.name}
            className="competitive-card"
            style={{
              backgroundColor: '#1A1A1A',
              border: `1px solid ${C.cardBorder}`,
              borderRadius: '12px',
              padding: '32px',
              display: 'grid',
              gridTemplateRows: 'subgrid',
              gridRow: '1 / -1',
              rowGap: 0,
            }}
          >
            {/* Row 1 — Card header: 40×40 icon + app name. Icon sits
                in a rounded clip with a hair border so disparate source
                aspect ratios (PNG, WEBP, JPG) all read as the same
                size; `object-fit: cover` crops non-square sources. */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', paddingBottom: '24px' }}>
              <img
                src={app.icon}
                alt={`${app.name} icon`}
                width={40}
                height={40}
                loading="lazy"
                style={{
                  width: '40px',
                  height: '40px',
                  flexShrink: 0,
                  borderRadius: '10px',
                  border: `1px solid ${C.cardBorder}`,
                  objectFit: 'cover',
                  display: 'block',
                  backgroundColor: '#2A2A2A',
                }}
              />
              <h3
                style={{
                  fontFamily: F.editorial,
                  fontSize: '22px',
                  color: C.primary,
                  lineHeight: 1.25,
                  margin: 0,
                  fontWeight: 500,
                }}
              >
                {app.name}
              </h3>
            </div>

            {/* Row 2 — Header divider */}
            <div style={{ height: '1px', backgroundColor: C.border, alignSelf: 'end' }} />

            {/* Rows 3-8 — Three coverage rows interleaved with three
                dividers. Each coverage row content is a separate grid
                item and so is each divider. Subgrid syncs the heights
                across cards. */}
            {app.coverage.map((c) => {
              const status = STATUS[c.state];
              return (
                <Fragment key={c.dim}>
                  <div style={{ paddingTop: '24px', paddingBottom: '24px' }}>
                    {/* Verdict line — dimension label on the left as
                        the heading; status pill (dot + label) flush
                        right. `space-between` pushes them to opposite
                        edges; `flexShrink: 0` on the pill keeps the
                        verdict at fixed width even when the dimension
                        wraps. */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '16px',
                        marginBottom: c.note ? '12px' : 0,
                      }}
                    >
                      <p
                        style={{
                          fontFamily: F.sans,
                          fontSize: '12px',
                          letterSpacing: '0.18em',
                          textTransform: 'uppercase',
                          color: '#E8632B',
                          margin: 0,
                          fontWeight: 600,
                          lineHeight: 1.35,
                        }}
                      >
                        {c.dim}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                        {/* Status dot: filled for Partial, hollow for No */}
                        <span
                          aria-hidden="true"
                          style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: status.filled ? status.color : 'transparent',
                            border: `1.5px solid ${status.color}`,
                            display: 'inline-block',
                            flexShrink: 0,
                          }}
                        />
                        <span
                          style={{
                            fontFamily: F.sans,
                            fontSize: '13px',
                            fontWeight: 600,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: status.color,
                          }}
                        >
                          {status.label}
                        </span>
                      </div>
                    </div>
                    {c.note && (
                      <p
                        style={{
                          fontFamily: F.sans,
                          fontSize: '13px',
                          color: C.secondary,
                          lineHeight: 1.55,
                          margin: 0,
                        }}
                      >
                        {c.note}
                      </p>
                    )}
                  </div>
                  {/* Divider after this coverage row. `alignSelf: end`
                      pins it to the bottom of the subgrid track so it
                      sits at the same vertical position across all
                      three cards, even when the row above is short. */}
                  <div style={{ height: '1px', backgroundColor: C.border, alignSelf: 'end' }} />
                </Fragment>
              );
            })}

            {/* Row 9 — Summary footer. None of the apps fully cover any
                need, so all three cards read "0 of 3" and the thesis
                (no overlap) lands hard. */}
            <div style={{ paddingTop: '20px' }}>
              <span
                style={{
                  fontFamily: F.sans,
                  fontSize: '12px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#C26B6B',
                  fontWeight: 600,
                }}
              >
                0 of 3 fully addressed
              </span>
            </div>
          </div>
        ))}
      </div>
      </MobileCarouselWrap>

      {/* Sources footnote — receipts for the analysis. Quiet underline,
          no arrow, no "Visit site" affordance. Reviewers who want to
          verify can click; everyone else skims past. */}
      <p
        style={{
          fontFamily: F.sans,
          fontSize: '12px',
          color: C.secondary,
          margin: '40px 0 0 0',
          letterSpacing: '0.04em',
          lineHeight: 1.6,
        }}
      >
        Apps reviewed:{' '}
        {apps.map((app, i) => (
          <span key={app.name}>
            <a
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: C.secondary, textDecoration: 'underline', textUnderlineOffset: '3px' }}
            >
              {app.name}
            </a>
            {i < apps.length - 1 && ' · '}
          </span>
        ))}
      </p>
    </section>
  );
}

function ProblemStatement() {
  const statements = [
    {
      number: '01',
      tag: 'Discovering Relevant Events',
      text: 'Users need a way to discover and join community events with neighbours from their estate because existing platforms show events that appear too broad to feel personally relevant, so despite genuine interest, they rarely commit to attending.',
    },
    {
      number: '02',
      tag: 'Connecting Over Shared Interests',
      text: 'Users need a way to find and connect with neighbours who share their interests because without knowing who lives nearby with things in common, potential connections never form even when both sides would be open to them.',
    },
    {
      number: '03',
      tag: 'Exchanging Help, Items and Services',
      text: 'Users need a trusted way to exchange items, services and requests with verified neighbours in their estate because without an established channel among people they already live near, mutual willingness on both sides rarely translates into actual help.',
    },
  ];
  return (
    <section style={{ backgroundColor: C.statsBg, padding: '80px', paddingTop: '80px', paddingBottom: '80px', '--cs-section-bg': C.statsBg } as React.CSSProperties} className="max-md:!px-6 max-md:!py-16 max-lg:!px-10 max-lg:!py-14">
      <SectionLabel text="Problem Statement" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
        {statements.map((s) => (
          <div key={s.number}>
            <p style={{ fontFamily: F.sans, fontSize: '13px', color: '#E8632B', margin: '0 0 8px 0', letterSpacing: '0.12em' }}>
              {s.number} — {s.tag}
            </p>
            <p style={{ fontFamily: F.editorial, fontStyle: 'italic', fontSize: 'clamp(22px, 2.6vw, 30px)', color: C.primary, lineHeight: 1.4, letterSpacing: '-0.01em', fontWeight: 400, margin: 0 }}>
              {s.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Solution Statement (3 paired responses with a shared intro line) ──────
function SolutionStatement() {
  // Three action pillars that follow the opener. Headlines are single
  // crisp nouns so they read as the load-bearing parts of the platform
  // rather than a numbered list (which Problem Statement above already
  // owns). Bodies stay in DM Sans — the switch from Playfair italic
  // (used in the opener) to clean sans-serif signals the move from
  // "thesis" to "build."
  const pillars = [
    { name: 'Surface Events',     body: 'Filtered by interest and demographic, so they feel personally relevant to each resident.' },
    { name: 'Connect Neighbours', body: 'Through shared interests, giving first conversations a natural starting point.' },
    { name: 'Open Exchange',      body: 'A trusted channel for items, services, and requests between verified neighbours.' },
  ];
  return (
    <section style={{ backgroundColor: C.problemBg, padding: '80px', paddingTop: '80px', paddingBottom: '80px', '--cs-section-bg': C.problemBg } as React.CSSProperties} className="max-md:!px-6 max-md:!py-16 max-lg:!px-10 max-lg:!py-14">
      <SectionLabel text="Solution Statement" />
      {/* Storyline opener — a single declarative thesis sentence that
          mirrors TripSync's "Bridging this gap…" and Lumis's "From
          this synthesis emerged…" patterns. Playfair Display in
          upright regular weight (no italic) keeps the editorial
          gravitas without the cursive feel, and the typographic shift
          from upright serif → DM Sans bold in the pillars below
          signals the move from thesis to architecture. */}
      <p
        style={{
          fontFamily: F.editorial,
          fontSize: 'clamp(24px, 3vw, 36px)',
          color: C.primary,
          lineHeight: 1.35,
          letterSpacing: '-0.01em',
          fontWeight: 400,
          margin: '0 0 64px 0',
        }}
      >
        From these three unmet needs emerged NeighbourLah, a neighbourhood platform that makes events feel personally relevant, turns shared interests into real connections, and creates a trusted exchange for everyday help.
      </p>

      {/* Three action pillars in a horizontal grid. The shape — three
          short cards across — visually rhymes with the Competitive
          Analysis verdict cards two sections back, giving the case
          study a recurring "trio" motif (three problems → three
          competitor failures → three solution pillars). Sans-serif
          body and a short orange accent rule above each pillar break
          the typographic rhythm from the italic editorial Problem
          Statement so the two sections stop looking like the same
          template. */}
      <div
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}
        className="max-md:!grid-cols-1 max-lg:!grid-cols-1"
      >
        {pillars.map((p) => (
          <div
            key={p.name}
            style={{
              // Soft pill card with subtle grey lift over the section
              // background. Matches the lift shade (#1A1A1A) used by
              // the Competitive Analysis verdict cards earlier in the
              // case study so both card patterns share the same grey
              // hierarchy instead of introducing a tinted colour.
              backgroundColor: '#1A1A1A',
              borderRadius: '16px',
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <h3
              style={{
                fontFamily: F.sans,
                fontSize: 'clamp(20px, 2.2vw, 26px)',
                color: C.primary,
                lineHeight: 1.25,
                letterSpacing: '-0.01em',
                fontWeight: 600,
                margin: 0,
              }}
            >
              {p.name}
            </h3>
            <p
              style={{
                fontFamily: F.sans,
                fontSize: '15px',
                color: C.secondary,
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {p.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ResearchFindings() {
  const findings = [
    { title: 'Residents feel uncertain whether events are suitable for them or socially comfortable to attend.', desc: '' },
    { title: 'Information about community events is fragmented and easily missed.', desc: '' },
    { title: 'Shared interests help develop a natural entry point for connection.', desc: '' },
    { title: 'Neighbourly help defaults to small, low-risk acts. Bigger asks need trust that has to be built first.', desc: '' },
    { title: 'The kampung spirit is universally desired but has no modern infrastructure to support it.', desc: '' },
  ];
  // Per-note colour + rotation: six dark tints (brown, teal, purple, red,
  // blue, green), each with a matching tape colour and a slight rotation.
  const noteStyles = [
    { from: '#2A2520', to: '#1E1B17', tape: 'rgba(190, 150, 100, 0.5)', rot: '-1.5deg' },
    { from: '#1C2A28', to: '#141E1C', tape: 'rgba(90, 185, 170, 0.5)',  rot: '0.8deg'  },
    { from: '#251F2E', to: '#1A1622', tape: 'rgba(160, 120, 200, 0.5)', rot: '-0.6deg' },
    { from: '#2C1E1E', to: '#1F1515', tape: 'rgba(200, 95, 95, 0.5)',   rot: '1.2deg'  },
    { from: '#1C2230', to: '#141923', tape: 'rgba(95, 135, 205, 0.5)',  rot: '-1.0deg' },
    { from: '#1F2A1F', to: '#161E16', tape: 'rgba(120, 195, 120, 0.5)', rot: '0.6deg'  },
  ];
  return (
    <section style={{ backgroundColor: C.bg, padding: '80px', paddingTop: '80px', paddingBottom: '80px' }} className="max-md:!px-6 max-md:!py-16 max-lg:!px-10 max-lg:!py-14">
      <SectionLabel text="Research Findings" />
      {/* Research intro — sets the participant context and the count
          so the reader knows the shape of what's coming. The trailing
          clause quietly previews the Problem Statement that follows. */}
      <p
        style={{
          fontFamily: F.editorial,
          fontSize: 'clamp(18px, 2vw, 24px)',
          color: C.primary,
          lineHeight: 1.55,
          letterSpacing: '-0.01em',
          fontWeight: 400,
          margin: '0 0 48px 0',
        }}
      >
        From conversations with HDB residents about how they engage with their neighbours (or don't), five patterns kept surfacing. Each one was a gap NeighbourLah would need to close.
      </p>
      {/* 5 sticky notes laid out in a single row of 5 on desktop,
          mirroring Lumis Research Findings. Collapses to 2 columns on
          tablet and 1 column on mobile. */}
      <MobileCarouselWrap count={findings.length}>
        <StaggerCards style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px' }} className="mobile-card-carousel max-lg:!grid-cols-2">
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
                  {f.desc && <p className="sticky-note__body">{f.desc}</p>}
                </div>
              </div>
            );
          })}
        </StaggerCards>
      </MobileCarouselWrap>
    </section>
  );
}

function DesignDecisions() {
  // Layout mirrors TripSync's Design Decisions block: two overlapping
  // phone mockups on the left (slightly rotated for depth) and a 2-col
  // grid of compact decision cards on the right. With 5 features the
  // grid forms two full rows of 2 plus a 5th card alone in row 3,
  // matching the same pattern used in the Lumis case study.
  const features: Array<{ number: string; name: string; body: string }> = [
    {
      number: '01',
      name: 'Attend Events',
      body: 'Estate-scoped events show who else is attending so residents can RSVP with confidence.',
    },
    {
      number: '02',
      name: 'Join Interest Groups',
      body: 'Interest-based groups scoped to the estate keep membership small and locally relevant.',
    },
    {
      number: '03',
      name: 'Connect with Neighbours',
      body: 'A shared interest profile lets residents reach out to neighbours they recognise but have never spoken to.',
    },
    {
      number: '04',
      name: 'Help and Share',
      body: 'Free exchanges between verified estate residents stay low-stakes because both sides already share a neighbourhood.',
    },
    {
      number: '05',
      name: 'Marketplace',
      body: 'Listings scoped to the estate keep transactions inside a familiar community and handoffs convenient.',
    },
  ];
  return (
    <section style={{ backgroundColor: C.bg, padding: '80px', paddingTop: '80px', paddingBottom: '80px' }} className="max-md:!px-6 max-md:!py-16 max-lg:!px-10 max-lg:!py-14">
      <SectionLabel text="Design Decisions" />
      <div
        style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '80px', alignItems: 'center' }}
        className="max-md:!grid-cols-1 max-md:!gap-12 max-lg:!grid-cols-1 max-lg:!gap-12"
      >
        {/* Overlapping mobile screens — slight rotation gives the pair
            a sense of depth without relying on a drop shadow. Until the
            final decision-screen assets are ready both ScreenMockups
            fall back to the imported NeighbourLah hero PNG. */}
        <div
          style={{ position: 'relative', width: '100%', minHeight: '560px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          className="max-md:!min-h-[460px]"
        >
          <div style={{ position: 'absolute', left: '8%', top: '6%', width: '58%', transform: 'rotate(-4deg)', zIndex: 1, opacity: 0.85 }}>
            <ScreenMockup src="https://res.cloudinary.com/dvunn40le/image/upload/neighbourlahneighbourscreen_rhxayw.png" />
          </div>
          <div style={{ position: 'absolute', right: '8%', bottom: '4%', width: '58%', transform: 'rotate(3deg)', zIndex: 2 }}>
            <ScreenMockup src="https://res.cloudinary.com/dvunn40le/image/upload/neighbourlahhomescreen_yyvrld.png" />
          </div>
        </div>

        {/* 2-column grid of decision boxes. 5 features = two full rows
            + a 5th card alone in row 3 column 1. */}
        <MobileCarouselWrap count={features.length} autoPlay>
          <StaggerCards
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}
            className="mobile-card-carousel max-lg:!grid-cols-2"
          >
            {features.map((feat) => (
              <div
                key={feat.number}
                style={{ border: `1px solid ${C.cardBorder}`, padding: '24px', display: 'flex', flexDirection: 'column' }}
              >
                <p style={{ fontFamily: F.sans, fontSize: '13px', color: '#E8632B', margin: '0 0 14px 0', letterSpacing: '0.08em' }}>{feat.number}</p>
                <h3 style={{ fontFamily: F.editorial, fontSize: '20px', color: C.primary, margin: '0 0 14px 0', lineHeight: 1.3, fontWeight: 400 }}>{feat.name}</h3>
                <p style={{ fontFamily: F.sans, fontSize: '14px', color: C.secondary, lineHeight: 1.6, margin: 0 }}>{feat.body}</p>
              </div>
            ))}
          </StaggerCards>
        </MobileCarouselWrap>
      </div>
    </section>
  );
}

// Animated counter — counts from 0 to `to` when scrolled into view (once).
// Mirrors AXS's CountUp so all case studies share the same animation
// vocabulary for hero stats.
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
    { label: 'Participants',   value: '5 HDB residents keen to be closer to their neighbourhood' },
    { label: 'Environment',    value: "Online testing using participant's own devices" },
    { label: 'Data Collected', value: 'Success rate, Ease of Use rating (1 = very easy, 7 = very difficult), observation, post-test questionnaires' },
  ];
  // Two concrete, observation-level insights about specific feature
  // interactions. The high-altitude takeaways (trust as accumulated
  // signal, interest as the right on-ramp) have moved into Impact
  // where they become evidence for strategic claims, not findings to
  // restate.
  const insights = [
    'The Market was the most intuitive feature, matching the patterns users already knew from Carousell.',
    "Events and Groups confused 3 of 5 participants because both surfaced interest-based content without a clear distinction between a one-off and an ongoing commitment.",
  ];
  return (
    <section style={{ backgroundColor: C.statsBg, padding: '80px', paddingTop: '80px', paddingBottom: '80px' }} className="max-md:!px-6 max-md:!py-16 max-lg:!px-10 max-lg:!py-14">
      <SectionLabel text="Usability Testing" />

      {/* Subheader — names who was tested and ties recruitment back to
          the target group from research. */}
      <p style={{ fontFamily: F.sans, fontSize: '15px', color: C.secondary, lineHeight: 1.7, margin: '0 0 40px 0' }}>
        Usability testing was conducted with 5 HDB residents who are keen to be closer to their neighbourhood.
      </p>

      {/* Test Plan — 3-card grid mirroring AXS so the case studies
          share the same testing-setup vocabulary. */}
      <h3 style={{ fontFamily: F.editorial, fontSize: 'clamp(22px, 2.4vw, 30px)', color: C.primary, margin: '0 0 24px 0', lineHeight: 1.25, fontWeight: 400 }}>Test Plan</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '64px' }} className="max-md:!grid-cols-1">
        {planRows.map((r) => (
          <div key={r.label} style={{ border: `1px solid ${C.cardBorder}`, padding: '24px' }}>
            <p style={{ fontFamily: F.sans, fontSize: '12px', color: C.secondary, margin: '0 0 10px 0', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{r.label}</p>
            <p style={{ fontFamily: F.sans, fontSize: '15px', color: C.primary, margin: 0, lineHeight: 1.6 }}>{r.value}</p>
          </div>
        ))}
      </div>

      {/* Hero difficulty rating — animated CountUp from 0 to 1.9 (the
          midpoint of the 1–2.75 range observed across tasks). Range and
          scale appear below the hero number so the reader keeps the
          full context. Treatment mirrors AXS's "3 / 5" hero moment. */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease }}
        style={{ textAlign: 'center', paddingTop: '24px', marginBottom: '64px' }}
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
          <CountUp to={1.8} formatter={(v) => v.toFixed(1)} />
          <span style={{ color: '#5A5A54' }}>/7</span>
        </div>
        <p style={{ fontFamily: F.sans, fontSize: '12px', color: C.secondary, margin: '0 auto', letterSpacing: '0.12em', textTransform: 'uppercase', maxWidth: '640px' }}>
          5 tasks tested
        </p>
      </motion.div>

      {/* Insights — qualitative takeaways from the testing. */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {insights.map((insight, i) => (
          <p key={i} style={{ fontFamily: F.sans, fontSize: '17px', color: C.primary, lineHeight: 1.7, margin: 0 }}>
            {insight}
          </p>
        ))}
      </div>
    </section>
  );
}

function Iterations() {
  const [openIdx, setOpenIdx] = useState(0);
  // `videoBefore` / `videoAfter` are optional fields per issue. When
  // present, the ScreenMockup renders a looping muted video instead of
  // the default placeholder image. Matches the AXS Iterations video
  // pattern so both case studies use the same vocabulary.
  type Issue = {
    label: string;
    problem: string;
    solution: string;
    imgBefore?: string;
    imgAfter?: string;
    videoBefore?: string;
    videoAfter?: string;
  };
  const issues: Issue[] = [
    {
      label: 'Events not prominent on home page',
      problem: 'My Events was buried on the home page so users explored other tabs first.',
      solution: 'Moved My Events to the top of the home page with a Find More Events link.',
      // Source video is recorded at 886×1734 (~9:17.6), wider than the
      // phone frame's 9:19.5 aspect, so plain `object-fit: cover` was
      // cropping the words at the sides. The `c_pad,ar_18:39,b_auto`
      // Cloudinary transform pads the video server-side to 9:19.5 with
      // an auto-detected background colour (matches the app's
      // background), so the delivered file fits the phone frame
      // exactly without cropping or visible bars.
      videoBefore: 'https://res.cloudinary.com/dvunn40le/video/upload/c_pad,ar_18:39,b_auto/Task_1_before_oo6ryc.mp4',
      videoAfter: 'https://res.cloudinary.com/dvunn40le/video/upload/task_1_afternew_otqgqg.mp4',
    },
    {
      label: 'Groups and Events felt overlapping',
      problem: "Users couldn't distinguish between a one-off event and an ongoing group as both felt interest-based.",
      solution: 'Surfaced a one-time tooltip on first visit to guide users on exploring the app. Also added a header description on the Events and Groups tabs in Explore to orient users when they land there.',
      imgBefore: 'https://res.cloudinary.com/dvunn40le/image/upload/task2p3_before_mba3fp.png',
      videoAfter: 'https://res.cloudinary.com/dvunn40le/video/upload/task_2_afternew_dhh9gb.mp4',
    },
    {
      label: 'Searching for neighbours by name returned empty',
      problem: 'Users searched for a neighbour by name in Messages, but the search only looks through existing conversations. With no prior chat history, results came up empty and users had to find their way to the Neighbours tab in Explore on their own.',
      solution: 'Added a Find Neighbours button below the search bar in Messages to redirect users to the Neighbours tab in Explore.',
      videoBefore: 'https://res.cloudinary.com/dvunn40le/video/upload/task3_before_ccy03c.mp4',
      videoAfter: 'https://res.cloudinary.com/dvunn40le/video/upload/task3_after_enu7bq.mp4',
    },
    {
      label: 'Say Hello CTA felt ambiguous',
      problem: 'Users hesitated to tap Say Hello as it sounded like it would auto-send a message.',
      solution: 'Replaced with a Chat label so users knew they would be taken to a compose screen. Also added a Chat button within the neighbour profile.',
      imgBefore: 'https://res.cloudinary.com/dvunn40le/image/upload/task3p2_before_iiuuhn.png',
      videoAfter: 'https://res.cloudinary.com/dvunn40le/video/upload/task_3p2_afternew_fsvlyp.mp4',
    },
    {
      label: 'Market and Requests felt too similar',
      problem: 'Users went to Market when they needed to post a request as the distinction between the two was not clear.',
      solution: "Added short subtitles to each tab — Market: Buy, sell or offer services. Requests: Ask neighbours for help. Also added a fallback prompt in Market for users who still landed in the wrong place: Can't find what you need? Post a request.",
      videoBefore: 'https://res.cloudinary.com/dvunn40le/video/upload/task5_before_zzpmpt.mp4',
      videoAfter: 'https://res.cloudinary.com/dvunn40le/video/upload/task5_after_uxr5tm.mp4',
    },
  ];
  // Shared inline styles for the per-mockup tag (BEFORE / AFTER) and
  // the description that sits beneath each mockup. Matches TripSync's
  // Iterations vocabulary so the two case studies' iteration sections
  // read as one design language.
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
    <section style={{ backgroundColor: C.bg, padding: '80px', paddingTop: '80px', paddingBottom: '80px' }} className="max-md:!px-6 max-md:!py-16 max-lg:!px-10 max-lg:!py-14">
      <SectionLabel text="Top Issues & Iterations" />
      <h2 className="cs-section-header">What Changed & Why</h2>

      {/* ── Mobile accordion ── */}
      <div className="md:!hidden" style={{ display: 'flex', flexDirection: 'column', marginBottom: '48px' }}>
        {issues.map((issue, i) => (
          <div key={issue.label} style={{ borderTop: `1px solid ${C.cardBorder}` }}>
            <button
              onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
              style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: '12px' }}
            >
              <span style={{ fontFamily: F.sans, fontSize: '15px', fontWeight: 600, color: C.primary, lineHeight: 1.3 }}>{issue.label}</span>
              <span style={{ color: C.secondary, fontSize: '20px', flexShrink: 0, lineHeight: 1 }}>{openIdx === i ? '−' : '+'}</span>
            </button>
            {openIdx === i && (
              <div style={{ paddingBottom: '32px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={tagStyle}>Before</span>
                  <ScreenMockup src={issue.imgBefore} videoSrc={issue.videoBefore} />
                  <p style={{ ...sideText, maxWidth: '100%' }}>{issue.problem}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={tagStyle}>After</span>
                  <ScreenMockup src={issue.imgAfter} videoSrc={issue.videoAfter} />
                  <p style={{ ...sideText, maxWidth: '100%' }}>{issue.solution}</p>
                </div>
              </div>
            )}
          </div>
        ))}
        <div style={{ borderTop: `1px solid ${C.cardBorder}` }} />
      </div>

      {/* ── Desktop stacked layout ── */}
      <div className="max-md:!hidden" style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
        {issues.map((issue, i) => (
          <div
            key={issue.label}
            style={i > 0 ? { borderTop: `1px solid ${C.cardBorder}`, paddingTop: '80px' } : undefined}
          >
            <p className="cs-category-label" style={{ marginBottom: '32px' }}>{issue.label}</p>
            <div
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}
              className="max-lg:!grid-cols-1 max-lg:!gap-10"
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={tagStyle}>Before</span>
                <ScreenMockup src={issue.imgBefore} videoSrc={issue.videoBefore} />
                <p style={sideText}>{issue.problem}</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={tagStyle}>After</span>
                <ScreenMockup src={issue.imgAfter} videoSrc={issue.videoAfter} />
                <p style={sideText}>{issue.solution}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Final Screens — modelled 1:1 on the TripSync Final Screens block.
// Each screen renders a 65/35 (image:text) grid with the image side
// alternating left/right per row. ScreenMockup is called WITHOUT a
// `src` for now, so it shows the generic NeighbourLah hero PNG as a
// placeholder; the `placeholderFor` field on each screen records the
// final image's intended subject so the right asset can be wired in
// later. Mobile collapses each row to a single column with the text
// stacking above the placeholder (max-md:!order-1 / max-md:!order-2).
function FinalScreens() {
  const [activeTab, setActiveTab] = useState(0);
  const screens: Array<{
    name: string;
    placeholderFor: string;
    highlights: Array<{ heading: string; text: string }>;
    imageFirst: boolean;
    videoSrc?: string;
  }> = [
    {
      name: 'Attend Events',
      placeholderFor: 'Attend Events',
      videoSrc: 'https://res.cloudinary.com/dvunn40le/video/upload/finalscreen1_pki3we.mp4',
      highlights: [
        { heading: 'Estate-Scoped Discovery', text: 'Browse events within your block or estate, filtered by date and interest category so relevant events surface.' },
        { heading: "Who's Going", text: 'A breakdown of attendees by household type and language spoken helps residents gauge whether an event feels like the right fit before committing.' },
      ],
      imageFirst: false,
    },
    {
      name: 'Join Interest Groups',
      placeholderFor: 'Join Interest Groups',
      videoSrc: 'https://res.cloudinary.com/dvunn40le/video/upload/finalscreen2_zhruna.mp4',
      highlights: [
        { heading: 'Interest-Based Circles', text: 'Find and join groups of neighbours who share your interests, from morning runs to cooking and gardening.' },
        { heading: 'Estate-Scoped Membership', text: 'Having something in common gives both sides a natural reason to connect without it feeling like a cold approach.' },
      ],
      imageFirst: true,
    },
    {
      name: 'Connect with Neighbours',
      placeholderFor: 'Connect with Neighbours',
      videoSrc: 'https://res.cloudinary.com/dvunn40le/video/upload/finalscreen3_gqnz5m.mp4',
      highlights: [
        { heading: 'Discover by Interest', text: 'Browse neighbours who share your interests and start a conversation directly in the app.' },
        { heading: 'In-App Messaging', text: 'Conversations happen in-app so neither side has to share personal contact details to get started.' },
      ],
      imageFirst: false,
    },
    {
      name: 'Help and Share',
      placeholderFor: 'Help and Share',
      videoSrc: 'https://res.cloudinary.com/dvunn40le/video/upload/finalscreen4_rl5w3n.mp4',
      highlights: [
        { heading: 'Request and Offer', text: 'Post requests for help or items to borrow, or offer things you no longer need to neighbours nearby.' },
        { heading: 'Verified Residents Only', text: 'All exchanges happen between verified estate residents, reducing the friction and anxiety of asking a stranger for help.' },
      ],
      imageFirst: true,
    },
    {
      name: 'Marketplace',
      placeholderFor: 'Marketplace',
      videoSrc: 'https://res.cloudinary.com/dvunn40le/video/upload/finalscreen5_vlfvqi.mp4',
      highlights: [
        { heading: 'Buy, Sell and Offer Services', text: 'List items for sale, give things away for free or offer local services like tutoring or dog walking to neighbours.' },
        { heading: 'Proximity-Based Listings', text: 'All listings are scoped to your neighbourhood so handoffs stay convenient and the marketplace stays community-focused.' },
      ],
      imageFirst: false,
    },
  ];
  const active = screens[activeTab];
  return (
    <section style={{ backgroundColor: C.problemBg, padding: '80px', paddingTop: '80px', paddingBottom: '80px' }} className="max-md:!px-6 max-md:!py-16 max-lg:!px-10 max-lg:!py-14">
      <SectionLabel text="Final Screens" />

      {/* ── Mobile tab layout ── */}
      <div className="md:!hidden">
        <div className="scrollbar-hide" style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', marginBottom: '32px' }}>
          {screens.map((screen, i) => (
            <button
              key={screen.name}
              onClick={() => setActiveTab(i)}
              style={{
                flexShrink: 0,
                padding: '8px 16px',
                borderRadius: '999px',
                border: `1px solid ${i === activeTab ? 'var(--accent-color)' : C.cardBorder}`,
                backgroundColor: i === activeTab ? 'color-mix(in srgb, var(--accent-color) 15%, transparent)' : 'transparent',
                color: i === activeTab ? 'var(--accent-color)' : C.secondary,
                fontFamily: F.sans,
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {screen.name}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px' }}>
          <ScreenMockup label={active.placeholderFor} maxWidth={294} videoSrc={active.videoSrc} />
          <div style={{ width: '100%' }}>
            <h3 style={{ fontFamily: F.editorial, fontSize: '26px', color: C.primary, margin: '0 0 20px 0', lineHeight: 1.2, fontWeight: 400 }}>{active.name}</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {active.highlights.map((h, hi) => (
                <li key={hi} style={{ fontFamily: F.sans, fontSize: '16px', lineHeight: 1.7, paddingLeft: '20px', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: C.secondary }}>·</span>
                  <span style={{ display: 'block', color: C.primary, fontWeight: 600, marginBottom: '2px' }}>{h.heading}</span>
                  <span style={{ display: 'block', color: C.secondary }}>{h.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Desktop stacked layout ── */}
      <div className="max-md:!hidden" style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
        {screens.map((screen) => (
          <div
            key={screen.name}
            style={{ display: 'grid', gridTemplateColumns: screen.imageFirst ? '1.85fr 1fr' : '1fr 1.85fr', gap: '64px', alignItems: 'center' }}
            className="max-lg:!grid-cols-1 max-lg:!gap-10"
          >
            {screen.imageFirst ? (
              <>
                <div><ScreenMockup label={screen.placeholderFor} maxWidth={294} videoSrc={screen.videoSrc} /></div>
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
                <div><ScreenMockup label={screen.placeholderFor} maxWidth={294} videoSrc={screen.videoSrc} /></div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function Impact() {
  // Three strategic-altitude outcomes. Each carries a fact from the
  // testing data (5/5 reaching out, the government-backed trust boost,
  // the Market vs Events/Groups contrast) but escalates the
  // interpretation: what does this mean for the product, the design
  // language, the next steps. Usability Testing above keeps the
  // concrete behavioural observations, so the reader climbs altitude
  // rather than re-reading the same beats.
  const outcomes = [
    { title: 'Interest-based connection is the right entry point.', desc: 'All 5 participants reached out more readily when a shared interest gave them a starting point. This confirmed the core thesis that connection in dense estates needs a softer on-ramp than direct introduction.' },
    { title: 'Trust signals carried more weight than expected.', desc: 'Comfort with the app rose sharply when users learned it was government-backed, while a small detail like a block number on a neighbour profile raised concern. Trust is not a single moment to design for, it is an accumulating signal that needs to be earned across the app.' },
    { title: 'Familiarity drove adoption faster than novelty.', desc: 'The Market succeeded because it leaned on patterns users already knew from Carousell. Events and Groups failed because they introduced an unfamiliar IA model. For everyday community features, mirroring what users already know beats inventing new structure.' },
  ];
  return (
    <section style={{ backgroundColor: C.bg, padding: '80px', paddingTop: '100px', paddingBottom: '100px', textAlign: 'center' }} className="max-md:!px-6 max-md:!py-20 max-lg:!px-10">
      <AnimatedQuote scramble style={{ fontFamily: F.editorial, fontStyle: 'italic', fontSize: 'clamp(24px, 3.5vw, 40px)', color: C.primary, margin: '0 auto 48px auto', lineHeight: 1.35, maxWidth: '900px', letterSpacing: '-0.01em', fontWeight: 400, paddingTop: '4px', paddingBottom: '4px' }}>
        "I'll be, frankly speaking, feeling a bit awkward... unless there's a common interest."
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

function PrototypeCTA() {
  return (
    <section style={{ backgroundColor: C.problemBg, padding: '80px', textAlign: 'left' }} className="max-md:!px-6 max-md:!py-16 max-lg:!px-10 max-lg:!py-14">
      <h2 style={{ fontFamily: F.editorial, fontSize: 'clamp(32px, 4.5vw, 52px)', color: C.primary, margin: '0 0 20px 0', lineHeight: 1.1, letterSpacing: '-0.02em', fontWeight: 400 }}>Experience NeighbourLah.</h2>
      <p style={{ fontFamily: F.sans, fontSize: '17px', color: C.secondary, margin: '0 0 32px 0', lineHeight: 1.7, maxWidth: '580px' }}>
        Explore the full interactive prototype: community feed, help requests, and interest circles in action.
      </p>
      <a
        href="https://precious-basbousa-9fdab7.netlify.app/"
        target="_blank"
        rel="noopener noreferrer"
        style={{ fontFamily: F.sans, fontSize: '17px', color: C.primary, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', borderBottom: `1px solid ${C.border}`, paddingBottom: '4px' }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = C.primary)}
        onMouseLeave={e => (e.currentTarget.style.borderColor = C.border)}
      >
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
      onClick={() => navigate('/lumis')}
    >
      <p style={{ fontFamily: F.sans, fontSize: '13px', color: C.secondary, letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 12px 0' }}>Next Project</p>
      <p style={{ fontFamily: F.editorial, fontSize: 'clamp(28px, 3.5vw, 42px)', color: C.primary, margin: 0, letterSpacing: '-0.01em', lineHeight: 1.1, fontWeight: 400 }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
        Lumis Skincare
      </p>
    </section>
  );
}

const sidebarItems: SidebarItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'challenge', label: 'Challenge' },
  { id: 'research', label: 'Research' },
  { id: 'competitive-analysis', label: 'Competitive Analysis' },
  { id: 'problem', label: 'Problem Statement' },
  { id: 'solution', label: 'Solution Statement' },
  { id: 'design-decisions', label: 'Design Decisions' },
  { id: 'usability-testing', label: 'Usability Testing' },
  { id: 'iterations', label: 'Issues & Changes' },
  { id: 'final-screens', label: 'Final Screens' },
  { id: 'impact', label: 'Impact' },
];

export function NeighbourLahPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div style={{ backgroundColor: C.bg, minHeight: '100vh', '--accent-color': '#E8632B' } as React.CSSProperties}>
      <Navigation showBack />
      <div className="cs-layout">
        <CaseStudySidebar items={sidebarItems} />
        <div className="cs-content">
          <div id="overview"><CaseStudyHero /></div>
          <FadeUp id="challenge"><Challenge /></FadeUp>
          <FadeUp id="research"><ResearchFindings /></FadeUp>
          <FadeUp id="competitive-analysis"><CompetitiveAnalysis /></FadeUp>
          <FadeUp id="problem"><ProblemStatement /></FadeUp>
          <FadeUp id="solution"><SolutionStatement /></FadeUp>
          <FadeUp id="design-decisions"><DesignDecisions /></FadeUp>
          <FadeUp id="usability-testing"><UsabilityTesting /></FadeUp>
          <FadeUp id="iterations"><Iterations /></FadeUp>
          <FadeUp id="final-screens"><FinalScreens /></FadeUp>
          <FadeUp id="impact"><Impact /></FadeUp>
          <FadeUp><PrototypeCTA /></FadeUp>
          <FadeUp><NextProject /></FadeUp>
        </div>
      </div>
    </div>
  );
}