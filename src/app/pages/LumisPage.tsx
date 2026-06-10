import { motion, useInView } from 'motion/react';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Navigation } from '../components/Navigation';
import { CaseStudySidebar, type SidebarItem } from '../components/CaseStudySidebar';
import { FadeUp, StaggerCards, AnimatedLine, scrambleInto, staggerContainer, fadeUpItem, ease } from '../components/Animate';
import { useImagesLoaded } from '../components/useImagesLoaded';
// Lumis homepage screenshot served from Cloudinary (shared with the
// homepage project card). w_2400 keeps it crisp on retina; q_auto and
// f_auto compress + format-negotiate per browser.
const lumisImg = 'https://res.cloudinary.com/dvunn40le/image/upload/w_2400,q_auto,f_auto/Lumis_portfolio_homepage_cfmpbm.png';
import lumisIpadImg from '../../imports/Lumis_ipad.webp';
import lumisLaptopImg from '../../imports/Lumis_laptop.webp';

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

// Lumis is a website project, so mockups render inside a browser-window
// frame (chrome bar + address pill) rather than a phone shell. The content
// area is a fixed 16:10 box so all mockups — image or video — share the
// same laptop-screen dimensions. `videoSrc` opt-in plays a muted, looping
// MP4/WebM in-place; we gate play/pause on viewport visibility so off-screen
// videos don't burn CPU. `src` is still used as the poster frame so the
// frame size is fixed before the first video frame decodes.
function WebsiteMockup({ label, opacity = 1, src = lumisImg, videoSrc, videoBottomTrim = 0, imageBottomTrim = 0 }: { label?: string; opacity?: number; src?: string; videoSrc?: string; videoBottomTrim?: number; imageBottomTrim?: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => { entry.isIntersecting ? video.play().catch(() => {}) : video.pause(); },
      { threshold: 0.3 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [videoSrc]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
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
            {videoSrc ? (
              <video
                ref={videoRef}
                src={videoSrc}
                poster={src}
                loop
                muted
                playsInline
                preload="none"
                // `videoBottomTrim` overscales the video vertically; the
                // parent's overflow:hidden then clips that overshoot off
                // the bottom (object-position keeps the top of the video
                // anchored). The 16:10 laptop frame around it is unchanged.
                style={{ width: '100%', height: `${100 + videoBottomTrim * 100}%`, objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
              />
            ) : (
              // `imageBottomTrim` overscales the image vertically; the
              // parent's overflow:hidden then clips that overshoot off the
              // bottom (object-position keeps the top anchored). Same
              // technique used for videos so the laptop frame stays the
              // same dimensions either way.
              <img src={src} alt={label || 'Lumis Skincare website'} loading="lazy" decoding="async" style={{ width: '100%', height: `${100 + imageBottomTrim * 100}%`, objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 1. Case Study Hero ─────────────────────────────────────────────────────
function CaseStudyHero() {
  // The site's <AnimatePresence> in PageTransitionLayout suppresses inner
  // framer-motion mount animations. Use plain CSS keyframes for the hero
  // slide-in — those fire on mount unconditionally.
  //
  // On mobile we keep the same iPad + MacBook layered showcase, just
  // reordered to appear AFTER the text block so the project name reads
  // first without any scroll.
  //
  // The slide-in CSS keyframes are gated on `imagesReady`.
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
        @media (max-width: 767.98px) {
          .lumis-device--laptop { left: 33% !important; }
          .lumis-device--ipad   { left: -5% !important; }
        }
      `}</style>
      {/* ─── Layered iPad + MacBook showcase ─── */}
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
            left: '27%',
            width: '72.6%',
            zIndex: 1,
            height: 'auto',
            display: 'block',
            pointerEvents: 'none',
          }}
        />
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

// ─── 2. Stats Strip (inline, sits under hero meta) ──────────────────────────
function StatsStrip() {
  const stats = [
    { number: '2 Weeks', label: 'Duration' },
    { number: '10', label: 'Users Interviewed' },
    { number: '5', label: 'Users Tested' },
    { number: '10', label: 'Tasks Tested' },
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

// ─── 3. The Challenge (framing paragraph) ──────────────────────────────────
function Challenge() {
  return (
    <section style={{ backgroundColor: C.problemBg, padding: '80px', paddingTop: '80px', paddingBottom: '80px' }} className="max-md:!px-6 max-md:!py-16 max-lg:!px-10 max-lg:!py-14">
      <h2 className="cs-section-header">
        The Challenge.
      </h2>
      <p style={{ fontFamily: F.sans, fontSize: '17px', color: C.primary, lineHeight: 1.7, margin: '0 0 24px 0', maxWidth: '720px' }}>
        In skincare, the hard part isn't finding products. It's knowing which ones suit your skin, without burning your budget on trial and error or trusting strangers online whose skin is nothing like yours.
      </p>
      <p style={{ fontFamily: F.sans, fontSize: '17px', color: C.primary, lineHeight: 1.7, margin: 0, maxWidth: '720px' }}>
        Lumis takes the guesswork out of skincare shopping. It matches products to a user's actual skin profile, checks compatibility with what they already use, and lets them sample new products at a fraction of the price before committing to a full purchase.
      </p>
    </section>
  );
}

// ─── 5. Problem Statement (synthesised POV, after research) ────────────────
function ProblemStatement() {
  const painPoints = [
    { title: 'No reliable skin matching', desc: 'No way to match products to multiple overlapping skin concerns in one place.' },
    { title: 'No compatibility checking', desc: 'No tools to check whether a new product works with an existing routine.' },
    { title: 'No low-risk trialling', desc: 'No option to sample or trial before committing to a full purchase.' },
    { title: 'Reliance on external sources', desc: 'Users depend on friends, social media, and costly trial and error instead of the shopping experience itself.' },
  ];
  return (
    <section style={{ backgroundColor: C.statsBg, padding: '80px', paddingTop: '80px', paddingBottom: '80px', '--cs-section-bg': C.statsBg } as React.CSSProperties} className="max-md:!px-6 max-md:!py-16 max-lg:!px-10 max-lg:!py-14">
      <SectionLabel text="Problem Statement" />
      <p style={{ fontFamily: F.editorial, fontStyle: 'italic', fontSize: 'clamp(24px, 3vw, 36px)', color: C.primary, lineHeight: 1.35, letterSpacing: '-0.01em', fontWeight: 400, margin: '0 0 56px 0' }}>
        Users need a way to confidently identify and commit to skincare products suited to their specific skin profile, because the current online shopping experience offers no reliable way to match products to multiple overlapping concerns, check compatibility with their existing routine, or trial before committing, forcing them to rely on friends, social media, and costly trial and error instead.
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

// (Solution Statement has been inlined as the lead-in paragraph at the
// top of DesignDecisions — see below — so the bet sits immediately
// above the features that embody it.)

// ─── 4. What I Found (Research findings — sticky notes) ─────────────────────
function ResearchFindings() {
  const findings = [
    { title: 'Trust and discovery are people-driven, not platform-driven', desc: 'Users trust friends and organic social content over brand claims. Reviews feel untrustworthy when they appear incentivised or disconnected from real skin experience.' },
    { title: 'Suitability is determined by trial and error at personal cost', desc: "There's no reliable way to predict whether a product will work before buying. Compatibility is figured out on skin, often at the cost of wasted money and reactions." },
    { title: 'Online shopping lacks the guidance needed to commit confidently', desc: 'Users are overwhelmed by options, confused by pricing inconsistencies, and let down by incomplete product pages. Without meaningful platform guidance, they default to friends and social media to decide.' },
    { title: "Price filters, but doesn't decide", desc: "Budget shapes every purchase but doesn't drive decisions alone. Users spend more on validated products; a lower price lowers the risk, a higher price raises the stakes." },
    { title: 'Skin knowledge is self-taught and uneven', desc: 'Users vary widely in how well they understand their own skin. This gap directly affects how confidently they shop and how exposed they are to bad purchases.' },
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
      {/* Research intro — sets the participant context and the count
          so the reader knows the shape of what's coming. Quietly
          previews the Problem Statement that follows. */}
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
        From conversations with people juggling multiple skin concerns, five frustrations kept showing up. Each one explained, in its own way, why product discovery so often misses.
      </p>
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

// ─── 5. Design Decisions ────────────────────────────────────────────────────
function DesignDecisions() {
  const features = [
    {
      number: '01',
      name: 'Skin Profile Quiz',
      body: 'Every user privately completes a skin profile quiz before seeing recommendations. Collecting skin type, concerns, and a bare-skin photo eliminates guesswork and ensures the site matches products to the individual, not a generic profile.',
    },
    {
      number: '02',
      name: 'Personalised Recommendations',
      body: "Quiz results surface a ranked, match-percentage product list tailored to the user's specific skin type and concerns. Users can retake the quiz or refine results at any time.",
    },
    {
      number: '03',
      name: 'Trial Before Commitment',
      body: 'Every recommended product can be sampled at a fraction of the full price before committing to a full purchase. This directly addresses the core barrier: the financial and skin risk of buying blind.',
    },
    {
      number: '04',
      name: 'Ingredient Comparison Tool',
      body: 'Users can compare any two products side by side, including products they already own from outside the Lumis catalogue. Ingredient compatibility is surfaced clearly, removing the need to research externally.',
    },
    {
      number: '05',
      name: 'Rewards Programme',
      body: 'Beyond the core purchase flow, the design includes a loyalty system built to reinforce the ritual mindset and encourage long-term retention. Members progress through four tiers: Seed, Bloom, Glow, and Radiance, earning points on every purchase and unlocking exclusive rewards as they go.',
    },
  ];
  return (
    <section style={{ backgroundColor: C.problemBg, padding: '80px', paddingTop: '80px', paddingBottom: '80px' }} className="max-md:!px-6 max-md:!py-16 max-lg:!px-10 max-lg:!py-14">
      <SectionLabel text="Design Decisions" />
      {/* Solution statement — the strategic bet that frames the features
          below. Lives here (rather than as its own section) so the reader
          sees the bet immediately above the features that embody it. */}
      <p style={{ fontFamily: F.editorial, fontStyle: 'italic', fontSize: 'clamp(24px, 3vw, 36px)', color: C.primary, lineHeight: 1.35, letterSpacing: '-0.01em', fontWeight: 400, margin: '0 0 64px 0' }}>
        From this synthesis emerged Lumis, a personalised skin-matching and product discovery system that surfaces compatible recommendations across multiple skin concerns and enables low-risk trialling before full purchase commitment.
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr',
          gap: '80px',
          alignItems: 'center',
        }}
        className="max-md:!grid-cols-1 max-md:!gap-12 max-lg:!grid-cols-1 max-lg:!gap-12"
      >
        {/* Overlapping browser-frame mockups (Lumis is a web product) */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            minHeight: '460px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          className="max-md:!min-h-[340px]"
        >
          <div
            style={{
              position: 'absolute',
              left: '0%',
              top: '4%',
              width: '78%',
              transform: 'rotate(-3deg)',
              zIndex: 1,
              opacity: 0.85,
            }}
          >
            <WebsiteMockup src="https://res.cloudinary.com/dvunn40le/image/upload/w_1600,q_auto,f_auto/lumis_final_rewards_nedo9x.png" imageBottomTrim={0.15} />
          </div>
          <div
            style={{
              position: 'absolute',
              right: '0%',
              bottom: '4%',
              width: '78%',
              transform: 'rotate(2.5deg)',
              zIndex: 2,
            }}
          >
            <WebsiteMockup src="https://res.cloudinary.com/dvunn40le/image/upload/w_1600,q_auto,f_auto/lumis_final_compare_uahxhl.png" />
          </div>
        </div>

        {/* 2x2 grid of decision cards */}
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
                border: `1px solid ${C.cardBorder}`,
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <p style={{ fontFamily: F.sans, fontSize: '13px', color: '#C4A265', margin: '0 0 14px 0', letterSpacing: '0.08em' }}>{feat.number}</p>
              <h3 style={{ fontFamily: F.editorial, fontSize: '20px', color: C.primary, margin: '0 0 14px 0', lineHeight: 1.3, fontWeight: 400 }}>{feat.name}</h3>
              <p style={{ fontFamily: F.sans, fontSize: '14px', color: C.secondary, lineHeight: 1.6, margin: 0 }}>{feat.body}</p>
            </div>
          ))}
        </StaggerCards>
      </div>
    </section>
  );
}

// ─── 6. Usability Testing (TripSync prose style) ────────────────────────────
function UsabilityTesting() {
  const inlineStats = [
    { number: '5', label: 'Participants' },
    { number: '10', label: 'Tasks' },
    { number: '100%', label: 'Success Rate (Key Tasks)' },
  ];
  const insights = [
    'Task completion across all 4 key tasks was unanimous. The core journey held together from discovering products to trialling and comparing them.',
    'The skin profile quiz was the most positively received feature. Participants responded well to the interactive bare-skin photo upload and concern selection mapped to a face diagram.',
    'The ingredient comparison tool generated strong interest. Participants found the side-by-side layout intuitive once they located the correct input. Discoverability of the external product input was a recurring point of friction.',
    'Friction was consistently about labelling, feedback, and discoverability rather than flow. Users knew what they wanted to do; they just needed clearer signposting to do it.',
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

// ─── 7. Top Issues & Iterations (side-by-side Before/After) ─────────────────
function Iterations() {
  const issues: { label: string; problem: string; solution: string; beforeImg?: string; afterImg?: string; beforeVideo?: string; afterVideo?: string; beforeTrim?: number; afterTrim?: number }[] = [
    {
      label: 'Skin Profile Quiz',
      problem: 'Users wanted to select multiple skin types but the quiz only allowed one, introducing inaccuracy into their recommendations.',
      solution: 'Remove "Sensitive" from skin type since sensitivity is already captured under "Redness & Sensitivity" in skin concerns. Skin type now focuses on oil production: Dry, Oily, Combination, or Normal.',
      beforeImg: 'https://res.cloudinary.com/dvunn40le/image/upload/w_1600,q_auto,f_auto/Task_1_old_lumis_ti6fs3.png',
      afterImg: 'https://res.cloudinary.com/dvunn40le/image/upload/w_1600,q_auto,f_auto/Task_1_new_lumis_yyqtf8.png',
    },
    {
      label: 'Trial Sample Feedback',
      problem: "Users didn't notice the cart counter updating when a sample was added, expecting a visible motion animation like other e-commerce sites.",
      solution: 'Add a press animation on click and briefly change the button state to "✓ Sample Added!" before reverting.',
      beforeVideo: 'https://res.cloudinary.com/dvunn40le/video/upload/w_1600,q_auto,f_auto/Task_2_old_lumis_d7bauh.mp4',
      beforeTrim: 0.08,
      afterVideo: 'https://res.cloudinary.com/dvunn40le/video/upload/w_1600,q_auto,f_auto/Task_2_new_lumis_hibi82.mp4',
      afterTrim: 0.08,
    },
    {
      label: 'Review Filter Discoverability',
      problem: "Users couldn't find their way to a specific product page to access written reviews and the skin type filter, expecting a path that didn't require navigating there first.",
      solution: 'Add a "Read reviews →" link under each product in the "Loved by the Community" section, linking directly to that product\'s reviews tab.',
      beforeVideo: 'https://res.cloudinary.com/dvunn40le/video/upload/w_1600,q_auto,f_auto/Task_3_old_lumis_ss213q.mp4',
      afterVideo: 'https://res.cloudinary.com/dvunn40le/video/upload/w_1600,q_auto,f_auto/Task_3_new_lumis_kabq34.mp4',
    },
    {
      label: 'Ingredient Compare Input',
      problem: 'Users typed their external product into the global search bar instead of the "Your own" input inside the Compare tool, which wasn\'t distinct enough to find.',
      solution: 'Update the placeholder to "Search for Lumis Skincare product to compare..." and apply a dashed border, plus (+) icon, and "Not sold on Lumis." label to the external input. Show a one-time tooltip on first visit.',
      beforeImg: 'https://res.cloudinary.com/dvunn40le/image/upload/w_1600,q_auto,f_auto/Task_4_old_lumis_ti9u8e.png',
      afterImg: 'https://res.cloudinary.com/dvunn40le/image/upload/w_1600,q_auto,f_auto/Task_4_new_lumis_b8lj8r.png',
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
    maxWidth: '420px',
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
                <WebsiteMockup src={issue.beforeImg} videoSrc={issue.beforeVideo} videoBottomTrim={issue.beforeTrim} />
                <p style={sideText}>{issue.problem}</p>
              </div>
              {/* After */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={tagStyle}>After</span>
                <WebsiteMockup src={issue.afterImg} videoSrc={issue.afterVideo} videoBottomTrim={issue.afterTrim} />
                <p style={sideText}>{issue.solution}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── 8. Impact (pull quote + outcome statements) ────────────────────────────
function Impact() {
  const outcomes = [
    'All 4 key tasks achieved 100% success rate, validating the core journey from discovery to commitment.',
    'Friction was categorised into three clear types: labelling mismatches, insufficient interface feedback, and discoverability gaps. Each was directly addressed in the iterated designs.',
    'The skin profile quiz and ingredient comparison tool were the most positively received features, confirming that personalisation and transparency are the right design bets for this product.',
  ];
  // Drive both quote+bar animations from a single observer on the wrapper.
  // Tracking the bar directly fails because its initial scaleY: 0 collapses
  // its bounding box to 0px, which IntersectionObserver doesn't see as
  // "in view". Watching the stable-sized wrapper avoids that race.
  const quotesRef = useRef<HTMLDivElement>(null);
  const quote1Ref = useRef<HTMLQuoteElement>(null);
  const quote2Ref = useRef<HTMLQuoteElement>(null);
  const quotesInView = useInView(quotesRef, { once: true, margin: '-100px' });

  // Capture each quote's final text on mount so the scramble has a stable
  // settle target. The actual scramble fires after the bar's 0.4s draw-in,
  // mirroring AnimatedQuote's beat. The second quote starts ~0.15s after
  // the first so they don't scramble in perfect lock-step.
  useEffect(() => {
    if (!quotesInView) return;
    const e1 = quote1Ref.current;
    const e2 = quote2Ref.current;
    if (!e1 || !e2) return;
    const text1 = e1.textContent ?? '';
    const text2 = e2.textContent ?? '';
    // Hide until scramble starts so we don't briefly show the final text.
    e1.style.visibility = 'hidden';
    e2.style.visibility = 'hidden';
    const t1 = window.setTimeout(() => {
      if (!e1) return;
      e1.style.visibility = 'visible';
      cancel1 = scrambleInto(e1, text1);
    }, 400);
    const t2 = window.setTimeout(() => {
      if (!e2) return;
      e2.style.visibility = 'visible';
      cancel2 = scrambleInto(e2, text2);
    }, 550);
    let cancel1: (() => void) | undefined;
    let cancel2: (() => void) | undefined;
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      cancel1?.();
      cancel2?.();
    };
  }, [quotesInView]);
  return (
    <section style={{ backgroundColor: C.bg, padding: '80px', paddingTop: '100px', paddingBottom: '100px', textAlign: 'center' }} className="max-md:!px-6 max-md:!py-20 max-lg:!px-10">
      {/* Two participant quotes sharing one continuous accent bar.
          AnimatedQuote draws its bar per blockquote, so for the "one bar
          covers both" treatment we render the bar manually on a wrapper
          and put plain motion blockquotes inside. The bar scaleY animates
          in (mirrors AnimatedQuote's beat), then each quote fades in. */}
      <div ref={quotesRef} style={{ position: 'relative', paddingLeft: '24px', maxWidth: '900px', margin: '0 auto 32px auto', textAlign: 'left' }}>
        <motion.div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 0,
            top: '4px',
            bottom: '4px',
            width: '3px',
            backgroundColor: 'var(--accent-color, #2E9461)',
            transformOrigin: 'top center',
            willChange: 'transform',
          }}
          initial={{ scaleY: 0 }}
          animate={quotesInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
        <blockquote
          ref={quote1Ref}
          style={{ fontFamily: F.editorial, fontStyle: 'italic', fontSize: 'clamp(24px, 3.5vw, 40px)', color: C.primary, margin: '0 0 16px 0', lineHeight: 1.35, letterSpacing: '-0.01em', fontWeight: 400 }}
        >
          "I love the aesthetic of the website."
        </blockquote>
        <blockquote
          ref={quote2Ref}
          style={{ fontFamily: F.editorial, fontStyle: 'italic', fontSize: 'clamp(24px, 3.5vw, 40px)', color: C.primary, margin: 0, lineHeight: 1.35, letterSpacing: '-0.01em', fontWeight: 400 }}
        >
          "This is a cool website. Did you create it?"
        </blockquote>
      </div>
      <p style={{ fontFamily: F.sans, fontSize: '13px', color: C.secondary, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 auto 72px auto' }}>
         Usability Test Participants
      </p>
      <ul style={{ listStyle: 'none', padding: 0, margin: '0 auto', maxWidth: '760px', display: 'flex', flexDirection: 'column', gap: '14px', textAlign: 'left' }}>
        {outcomes.map((o, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', fontFamily: F.sans, fontSize: '17px', color: C.primary, lineHeight: 1.6 }}>
            <span style={{ fontFamily: F.editorial, color: '#C4A265', minWidth: '28px', fontSize: '18px' }}>{String(i + 1).padStart(2, '0')}</span>
            <span>{o}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

// ─── 10. Prototype CTA ──────────────────────────────────────────────────────
function PrototypeCTA() {
  return (
    <section style={{ backgroundColor: C.problemBg, padding: '80px', textAlign: 'left' }} className="max-md:!px-6 max-md:!py-16 max-lg:!px-10 max-lg:!py-14">
      <h2 style={{ fontFamily: F.editorial, fontSize: 'clamp(32px, 4.5vw, 52px)', color: C.primary, margin: '0 0 20px 0', lineHeight: 1.1, letterSpacing: '-0.02em', fontWeight: 400 }}>
        Experience Lumis Skincare.
      </h2>
      <p style={{ fontFamily: F.sans, fontSize: '17px', color: C.secondary, margin: '0 0 32px 0', lineHeight: 1.7, maxWidth: '580px' }}>
        Explore the full interactive prototype: skin profile quiz, personalised recommendations, ingredient comparison, and trial sampling in action.
      </p>
      <a
        href="https://parse-handle-22255637.figma.site"
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

// ─── 11. Next Project Navigation ────────────────────────────────────────────
function NextProject() {
  const navigate = useNavigate();
  return (
    <section
      style={{ backgroundColor: C.bg, padding: '80px', borderTop: `1px solid #1A1A1A`, display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'column', cursor: 'pointer' }}
      className="max-md:!px-6 max-md:!items-start max-lg:!px-10"
      onClick={() => navigate('/axs')}
    >
      <p style={{ fontFamily: F.sans, fontSize: '13px', color: C.secondary, letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 12px 0' }}>
        Back to First Project
      </p>
      <p
        style={{ fontFamily: F.editorial, fontSize: 'clamp(28px, 3.5vw, 42px)', color: C.primary, margin: 0, letterSpacing: '-0.01em', lineHeight: 1.1, fontWeight: 400 }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
      >
        AXS · Vault
      </p>
    </section>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────
const sidebarItems: SidebarItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'challenge', label: 'Challenge' },
  { id: 'research', label: 'Research' },
  { id: 'problem', label: 'Problem Statement' },
  { id: 'design-decisions', label: 'Design Decisions' },
  { id: 'usability-testing', label: 'Usability Testing' },
  { id: 'iterations', label: 'Issues & Changes' },
  { id: 'impact', label: 'Impact' },
];

export function LumisPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div style={{ backgroundColor: C.bg, minHeight: '100vh', '--accent-color': '#C4A265' } as React.CSSProperties}>
      <Navigation showBack />
      <div className="cs-layout">
        <CaseStudySidebar items={sidebarItems} />
        <div className="cs-content">
          <div id="overview"><CaseStudyHero /></div>
          <FadeUp id="challenge"><Challenge /></FadeUp>
          <FadeUp id="research"><ResearchFindings /></FadeUp>
          <FadeUp id="problem"><ProblemStatement /></FadeUp>
          <FadeUp id="design-decisions"><DesignDecisions /></FadeUp>
          <FadeUp id="usability-testing"><UsabilityTesting /></FadeUp>
          <FadeUp id="iterations"><Iterations /></FadeUp>
          <FadeUp id="impact"><Impact /></FadeUp>
          <FadeUp><PrototypeCTA /></FadeUp>
          <FadeUp><NextProject /></FadeUp>
        </div>
      </div>
    </div>
  );
}
