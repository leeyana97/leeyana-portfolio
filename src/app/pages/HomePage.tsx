import leeyanaPhoto from '../../imports/Leeyana_profile_photo.jpg';
// Hero portrait served from Cloudinary at 1200px wide (the photo
// renders at most ~700px wide on a large desktop hero; at 2× retina
// that's 1400px, so 1200px is the right ceiling). f_auto serves
// WebP/AVIF to modern browsers — much smaller than the source JPG.
const leeyanaHeroPhoto = 'https://res.cloudinary.com/dvunn40le/image/upload/w_1200,q_auto,f_auto/Leeyana_hero_photo_v2_tcrmyh.jpg';
import { useRouteTransition } from '../routeTransition';
import { Navigation } from '../components/Navigation';
import { motion } from 'motion/react';
import {
  FadeUp,
  FadeIn,
  AnimatedLine,
  staggerContainer,
  fadeUpItem,
  cardVariants,
  imgScaleVariants,
  overlayVariants,
  overlayCTAVariants,
  ease,
} from '../components/Animate';
import tripsyncScreenImg from '../../imports/Tripsync_home_app-1.png';
// Homepage card hero images served from Cloudinary.
//   - DESKTOP variants use w_2400 — cards render up to ~1200px wide on
//     wide desktops, so at 2× retina that's 2400px. 2400 keeps the
//     thumbnails crisp on high-DPI displays.
//   - MOBILE variants use w_1600 — viewport is <768px, so even at 3× DPR
//     (the highest realistic mobile DPR) max display width is ~1440px.
//     1600 is plenty there and keeps mobile data plans happy.
//   - q_auto picks optimal quality/size per file.
//   - f_auto serves WebP/AVIF (5–10× smaller than raw PNG) where supported.
const tripsyncHeroImg = 'https://res.cloudinary.com/dvunn40le/image/upload/w_2400,q_auto,f_auto/Tripsync_hero_image_bdn64x.png';
const lumisPhoneImg = 'https://res.cloudinary.com/dvunn40le/image/upload/w_2400,q_auto,f_auto/Lumis_portfolio_homepage_cfmpbm.png';
const lumisPhoneMobileImg = 'https://res.cloudinary.com/dvunn40le/image/upload/w_1600,q_auto,f_auto/lumis_skincare_hero_phone_zcs0ud.png';
const neighbourlahImg = 'https://res.cloudinary.com/dvunn40le/image/upload/w_2400,q_auto,f_auto/Neighbourlah_hero_image_mgoujg.png';
const neighbourlahMobileImg = 'https://res.cloudinary.com/dvunn40le/image/upload/w_1600,q_auto,f_auto/neighbourlah_hero_phone_rbgfib.png';
const axsHeroImg = 'https://res.cloudinary.com/dvunn40le/image/upload/w_2400,q_auto,f_auto/AXS_hero_image_sxdxgw.png';
import axsHeroMobileImg from '../../imports/AXS_hero_image_phone.webp';

import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function SplitWords({ text }: { text: string }) {
  const words = text.split(/\s+/);
  return (
    <>
      {words.map((word, i) => (
        <span
          key={i}
          data-word
          style={{ display: 'inline-block', willChange: 'transform, opacity' }}
        >
          {word}
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </>
  );
}

// ─── Scramble helper (shared by HeroSection + ContactSection) ──────────────
// Characters cycle through random glyphs and resolve left → right, like a
// retro decode effect. Caller can pass a startDelay to stagger multiple lines.
// Sets el.dataset.scrambling = 'true' for the duration so hover handlers can
// skip a re-trigger while one is already running.
const SCRAMBLE_GLYPHS = '!<>-_\\/[]{}—=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const SCRAMBLE_TICK = 30;
const SCRAMBLE_DURATION = 1200;
const scrambleActive = new WeakMap<HTMLElement, number>();

function runScramble(el: HTMLElement, text: string, startDelay = 0): () => void {
  // Cancel any in-flight run on this element before starting fresh.
  const prev = scrambleActive.get(el);
  if (prev !== undefined) window.clearInterval(prev);

  let elapsed = 0;
  const render = (revealed: number) => {
    let out = '';
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (ch === ' ') { out += ' '; continue; }
      out += i < revealed ? ch : SCRAMBLE_GLYPHS[(Math.random() * SCRAMBLE_GLYPHS.length) | 0];
    }
    el.textContent = out;
  };
  render(0);
  el.dataset.scrambling = 'true';
  const id = window.setInterval(() => {
    elapsed += SCRAMBLE_TICK;
    if (elapsed >= startDelay + SCRAMBLE_DURATION) {
      el.textContent = text;
      el.dataset.scrambling = '';
      scrambleActive.delete(el);
      clearInterval(id);
      return;
    }
    const progress = Math.max(0, (elapsed - startDelay) / SCRAMBLE_DURATION);
    render(Math.floor(progress * text.length));
  }, SCRAMBLE_TICK);
  scrambleActive.set(el, id);
  return () => {
    clearInterval(id);
    scrambleActive.delete(el);
    el.dataset.scrambling = '';
    el.textContent = text;
  };
}

// ─── Shared tokens ──────────────────────────────────────────────────────────
const C = {
  bg: '#0D0D0D',
  primary: '#EBEBE5',
  secondary: '#888884',
  border: '#2A2A2A',
  cardBg: '#161616',
};

const F = {
  editorial: "'Playfair Display', Georgia, serif",
  sans: "'DM Sans', sans-serif",
};

// ─── Section label component ────────────────────────────────────────────────
function SectionLabel({ text }: { text: string }) {
  return (
    <motion.div
      style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '60px' }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease }}
    >
      <span
        style={{
          fontFamily: F.sans,
          fontSize: '13px',
          color: C.secondary,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}
      >
        {text}
      </span>
      <AnimatedLine />
    </motion.div>
  );
}

// ─── Tag pill component ──────────────────────────────────────────────────────
function TagPill({ label }: { label: string }) {
  return (
    <span
      style={{
        fontFamily: F.sans,
        fontSize: '13px',
        color: C.secondary,
        border: `1px solid ${C.border}`,
        borderRadius: '20px',
        padding: '8px 14px',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  );
}

// ─── Hero Section ───────────────────────────────────────────────────────────
function HeroSection() {
  const headlineRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);

  // Mount-time animation for the bottom meta row. Uses GSAP (not
  // framer-motion) so it plays correctly under AnimatePresence — AP
  // suppresses initial animations on descendant motion components via
  // PresenceContext, but plain DOM + GSAP is unaffected.
  useLayoutEffect(() => {
    const bottom = bottomRowRef.current;

    const ctx = gsap.context(() => {
      if (bottom) {
        gsap.fromTo(
          bottom,
          { opacity: 0 },
          { opacity: 1, duration: 1, delay: 0.9, ease: 'power2.out' }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const headline = headlineRef.current;
    const meta = metaRef.current;
    if (!headline || !meta) return;

    // Scramble/decode each heading line on mount; Line 1 over ~1.2s; line 2
    // starts 0.3s later. Each line also re-scrambles on hover (see below).
    const els = Array.from(headline.querySelectorAll<HTMLElement>('.scramble-text'));
    gsap.set(meta, { opacity: 0, y: 20 });

    const cleanups = els.map((el, i) =>
      runScramble(el, el.dataset.text ?? el.textContent ?? '', i * 300)
    );

    // Fade the meta in once the last line finishes.
    const lastDelay = (els.length - 1) * 300;
    const metaTimer = window.setTimeout(() => {
      gsap.to(meta, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });
    }, lastDelay + SCRAMBLE_DURATION + 80);

    // Hover re-runs the scramble on whichever line is hovered. Guarded so
    // wiggling over an already-animating line doesn't restart it.
    const handleHover = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      if (el.dataset.scrambling === 'true') return;
      runScramble(el, el.dataset.text ?? el.textContent ?? '', 0);
    };
    els.forEach((el) => {
      el.style.cursor = 'pointer';
      el.addEventListener('mouseenter', handleHover);
    });

    return () => {
      cleanups.forEach((fn) => fn());
      clearTimeout(metaTimer);
      els.forEach((el) => el.removeEventListener('mouseenter', handleHover));
    };
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        backgroundColor: C.bg,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: '80px',
        paddingRight: '80px',
        paddingTop: '10px',
        paddingBottom: '80px',
        position: 'relative',
        overflow: 'hidden',
      }}
      className="hero-glow max-md:!px-6 max-md:!pt-16 max-md:!pb-16 max-lg:!px-10"
    >
      {/* ── Hero photo — right half on desktop, full-bleed on mobile ── */}
      <div
        aria-hidden="true"
        className="hero-photo-wrap"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '55%',
          height: '100%',
          zIndex: 1,
          overflow: 'hidden',
          /* mask-image makes the photo itself fade to transparent on the left so
             the background + glow show through naturally — no painted-dark overlay
             that creates a colour mismatch seam. */
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 18%, rgba(0,0,0,0.5) 32%, rgba(0,0,0,0.82) 48%, black 65%)',
          maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 18%, rgba(0,0,0,0.5) 32%, rgba(0,0,0,0.82) 48%, black 65%)',
        }}
      >
        <img
          src={leeyanaHeroPhoto}
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: '40% 20%',
            filter: 'contrast(1.12) brightness(0.88) saturate(0.85)',
            display: 'block',
          }}
        />
        {/* Right-edge fade — fades photo into background on the right side */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to left, #0D0D0D 0%, rgba(13,13,13,0.4) 15%, transparent 40%)',
            pointerEvents: 'none',
          }}
        />
        {/* Bottom-to-top fade — mobile only, keeps text readable over full-bleed photo */}
        <div
          className="hero-photo-fade-bottom"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(13,13,13,0.98) 0%, rgba(13,13,13,0.7) 45%, rgba(13,13,13,0.25) 100%)',
            pointerEvents: 'none',
            display: 'none',
          }}
        />
      </div>

      {/* Main content */}
      <div style={{ position: 'relative', zIndex: 2, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {/* Headline group — each line rises up from behind a clip edge */}
        <div ref={headlineRef}>
          <h1
            style={{
              fontFamily: F.editorial,
              fontSize: 'clamp(48px, 8vw, 120px)',
              color: C.primary,
              margin: 0,
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
              fontWeight: 400,
            }}
          >
            Leeyana
          </h1>

          <div style={{ marginTop: 'clamp(20px, 2vw, 32px)' }}>
            <p
              style={{
                fontFamily: '"Luxurious Script", cursive',
                fontStyle: 'italic',
                fontSize: 'clamp(32px, 6vw, 64px)',
                color: C.primary,
                margin: 0,
                lineHeight: 1.15,
                letterSpacing: '-0.01em',
                fontWeight: 400,
              }}
            >
              <span className="scramble-text" data-text="Designing with empathy," aria-label="Designing with empathy," />
            </p>
            <p
              style={{
                fontFamily: F.editorial,
                fontStyle: 'normal',
                fontSize: 'clamp(28px, 4vw, 56px)',
                color: C.primary,
                margin: 0,
                lineHeight: 1.15,
                letterSpacing: '-0.01em',
                fontWeight: 400,
              }}
            >
              <span className="scramble-text" data-text="building with purpose." aria-label="building with purpose." />
            </p>
          </div>
        </div>

        {/* Metadata */}
        <div ref={metaRef} style={{ marginTop: 'clamp(32px, 4vw, 56px)', willChange: 'transform, opacity' }}>
          <p
            style={{
              fontFamily: F.sans,
              fontSize: 'clamp(13px, 1.2vw, 14px)',
              color: C.secondary,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            UI/UX Designer
          </p>
        </div>
      </div>

      {/* Soft gradient at the bottom so the NL monogram fades out instead of hard-clipping.
          Hidden on mobile — the monogram is repositioned to fit within the hero there. */}
      <div
        aria-hidden="true"
        className="nl-hero-gradient"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '40%',
          background: `linear-gradient(to bottom, transparent, ${C.bg})`,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Bottom row */}
      <div
        ref={bottomRowRef}
        style={{
          position: 'absolute',
          bottom: '48px',
          left: '80px',
          right: '80px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
        className="max-md:!left-6 max-md:!right-6 max-lg:!left-10 max-lg:!right-10"
      >

      </div>
    </section>
  );
}

// ─── About Section ──────────────────────────────────────────────────────────
function AboutSection() {
  const skills = ['UIUX Design', 'Affinity mapping', 'Prototyping','User Research', 'Usability Testing','Figma','Claude AI', 'Healthcare Background'];
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        content,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        backgroundColor: C.bg,
        paddingTop: '120px',
        paddingBottom: '120px',
      }}
      className="max-md:!py-20 max-lg:!py-16"
    >
      <div
        ref={contentRef}
        style={{ maxWidth: '1400px', margin: '0 auto', paddingLeft: '80px', paddingRight: '80px', willChange: 'transform, opacity' }}
        className="max-md:!px-6 max-lg:!px-10"
      >
        <SectionLabel text="About" />

        {/* Two-column layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '45% 55%',
            gap: '80px',
            alignItems: 'center',
          }}
          className="max-md:!grid-cols-1 max-md:!gap-10 max-lg:!grid-cols-1 max-lg:!gap-12"
        >
          {/* Left: Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.1, ease }}
            className="about-photo-wrap"
            style={{ position: 'relative', overflow: 'hidden', aspectRatio: '3/4' }}
          >
            <img
              src={leeyanaPhoto}
              alt="Leeyana, UI/UX Designer"
              loading="lazy"
              decoding="async"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
                display: 'block',
              }}
            />
          </motion.div>

          {/* Right: Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            <motion.h2
              variants={fadeUpItem}
              style={{
                fontFamily: F.editorial,
                fontSize: 'clamp(32px, 3.5vw, 42px)',
                color: C.primary,
                margin: '0 0 32px 0',
                lineHeight: 1.2,
                letterSpacing: '-0.01em',
                fontWeight: 400,
              }}
            >
              From bedside to interface.
            </motion.h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {[
                "I started my career as a nurse, learning early that the gap between what people need and what they're given is almost always a design problem.",
                "In the public healthcare sector, I then spent years turning dense healthcare information into something people could actually understand and act on, through websites, outreach materials, and training programmes for SG Healthcare Corps volunteers.",
                "Now I design digital products. The through-line is the same: understand people deeply, then build something that works for them.",
              ].map((para, i) => (
                <motion.p
                  key={i}
                  variants={fadeUpItem}
                  style={{
                    fontFamily: F.sans,
                    fontSize: '17px',
                    color: C.primary,
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {para}
                </motion.p>
              ))}
            </div>

            {/* Skill tags */}
            <motion.div
              variants={fadeUpItem}
              style={{
                marginTop: '32px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
              }}
            >
              {skills.map(skill => (
                <TagPill key={skill} label={skill} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Projects Section ────────────────────────────────────────────────────────
const projects = [
  {
    id: 'PRODUCT DESIGN',
    slug: '/axs',
    name: 'AXS · Vault',
    description: 'Smart billing: split, track, and manage payments together, designed for individuals and couples.',
    tags: ['iOS App', 'Fintech', 'Feature Design', 'Collaboration'],
    image: axsHeroImg,
    imageMobile: axsHeroMobileImg,
    imageHeight: 520,
    alt: 'AXS Vault',
    // When a project has a brand logo, the ProjectCard h3 renders the
    // logo image in place of the brand-name prefix, with `nameSuffix`
    // taking over the rest of the title. `name` is still used as the
    // fallback / accessible name.
    nameLogoSrc: 'https://res.cloudinary.com/dvunn40le/image/upload/q_auto,f_auto/AXS_logo_jrvfwm.jpg',
    nameLogoAlt: 'AXS',
    nameSuffix: '· Vault',
  },
  {
    id: 'PRODUCT DESIGN',
    slug: '/tripsync',
    name: 'TripSync',
    description: 'A group travel companion app that makes planning together feel effortless.',
    tags: [],
    image: tripsyncHeroImg,
    imageHeight: 620,
    alt: 'TripSync hero photo showing phones on a desk with travel objects',
    phoneFrame: false,
    handMockupImg: tripsyncHeroImg,
    screenImg: tripsyncScreenImg,
  },
  {
    id: 'PRODUCT DESIGN',
    slug: '/neighbourlah',
    name: 'NeighbourLah',
    description: 'A digital space that helps neighbours connect, share, and look out for each other.',
    tags: [],
    image: neighbourlahImg,
    imageMobile: neighbourlahMobileImg,
    imageHeight: 520,
    alt: 'NeighbourLah hero photo',
  },
  {
    id: 'PRODUCT DESIGN',
    slug: '/lumis',
    name: 'Lumis Skincare',
    description: 'A calm, considered shopping experience designed around how people actually discover and buy skincare.',
    tags: [],
    image: lumisPhoneImg,
    imageMobile: lumisPhoneMobileImg,
    imageHeight: 620,
    alt: 'Lumis Skincare homepage mockup',
  },
];

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const { startTransition } = useRouteTransition();
  const go = () => startTransition(project.slug);
  return (
    <article
      data-cursor="view"
      className={`project-card project-card--${project.slug.replace('/', '')}`}
      onClick={go}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && go()}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        borderRadius: '12px',
        overflow: 'hidden',
        cursor: 'pointer',
        backgroundColor: '#161616',
      }}
    >
      {project.image ? (
        <picture>
          {/* Mobile-specific source (currently only used by Lumis — portrait
              composition reads better in the tall mobile card aspect). */}
          {'imageMobile' in project && project.imageMobile && (
            <source media="(max-width: 768px)" srcSet={project.imageMobile} />
          )}
          <img
            src={project.image}
            alt={project.alt}
            className="project-card-image"
            loading="lazy"
            decoding="async"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </picture>
      ) : (
        <div
          className="project-card-image"
          style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #1a1a1a 0%, #262626 100%)',
          }}
        />
      )}

      {/* Bottom 35% gradient overlay for text readability */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: '35%',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.75) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Text overlay inside the card */}
      <div
        style={{
          position: 'absolute',
          left: '40px',
          right: '40px',
          bottom: '36px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: '32px',
          pointerEvents: 'none',
        }}
        className="max-md:!left-6 max-md:!right-6 max-md:!bottom-6 max-md:!flex-col max-md:!items-start max-md:!gap-3"
      >
        <div>
          <p
            style={{
              fontFamily: F.sans,
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: '#EBEBE5',
              opacity: 0.7,
              margin: 0,
            }}
          >
            {project.id}
          </p>
          <h3
            style={{
              fontFamily: F.editorial,
              fontSize: 'clamp(28px, 3vw, 32px)',
              color: '#EBEBE5',
              margin: '8px 0 0 0',
              letterSpacing: '-0.01em',
              lineHeight: 1.15,
              fontWeight: 400,
              // inline-flex puts an optional brand logo inline with the
              // rest of the title; align-items: center keeps the logo's
              // vertical midline on the same axis as the text x-height.
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.15em',
              flexWrap: 'wrap',
            }}
            className="max-md:!text-[24px]"
          >
            {('nameLogoSrc' in project && project.nameLogoSrc) ? (
              <>
                <img
                  src={project.nameLogoSrc}
                  alt={('nameLogoAlt' in project && project.nameLogoAlt) || ''}
                  // height: 0.85em ties the logo size to the h3's
                  // clamp() font-size — scales naturally on mobile/desktop.
                  style={{ height: '0.85em', width: 'auto', display: 'block' }}
                />
                <span>{('nameSuffix' in project && project.nameSuffix) || ''}</span>
              </>
            ) : (
              project.name
            )}
          </h3>
        </div>
        <p
          style={{
            fontFamily: F.sans,
            fontSize: '15px',
            color: '#EBEBE5',
            opacity: 0.7,
            margin: 0,
            maxWidth: '420px',
            lineHeight: 1.5,
            textAlign: 'right',
          }}
          className="max-md:!text-[13px] max-md:!text-left max-md:!max-w-full"
        >
          {project.description}
        </p>
      </div>
    </article>
  );
}

function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cards = cardRefs.current;
    if (cards.length === 0) return;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    // Mobile: nav is 72 px + 5 vh clearance (matches the CSS top override).
    // Desktop: cards stick at 105 px (nav height).
    const stickyOffset = isMobile
      ? Math.round(72 + window.innerHeight * 0.05)
      : 105;

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        if (!card) return;
        gsap.set(card, {
          transformOrigin: 'center center',
          transformPerspective: 1200,
          rotateX: 0,
          scale: 1,
        });

        // Last card has no next card to push it back — it never tilts
        if (i === cards.length - 1) return;

        const nextCard = cards[i + 1];
        if (!nextCard) return;
        const nextSection = nextCard.parentElement;
        if (!nextSection) return;

        gsap.to(card, {
          rotateX: 12,
          scale: 0.95,
          ease: 'none',
          scrollTrigger: {
            trigger: nextSection,
            start: 'top bottom',
            end: `top top+=${stickyOffset}`,
            scrub: true,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      style={{ backgroundColor: C.bg, paddingTop: '120px' }}
      className="max-md:!pt-16"
    >
      <div
        style={{ maxWidth: '1400px', margin: '0 auto', paddingLeft: '80px', paddingRight: '80px' }}
        className="max-md:!px-6"
      >
        <SectionLabel text="Selected Work" />
      </div>

      <div className="project-cards-feed">
        {projects.map((project, i) => (
          <div
            key={project.slug}
            className="project-card-sticky"
            style={{
              position: 'sticky',
              top: '105px',
              height: '100vh',
              zIndex: i + 1,
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              paddingLeft: '80px',
              paddingRight: '80px',
              backgroundColor: C.bg,
              perspective: '1200px',
            }}
          >
            <div
              ref={el => { cardRefs.current[i] = el; }}
              className="project-card-inner"
              style={{
                width: '100%',
                maxWidth: '1240px',
                height: 'calc(100vh - 105px)',
                willChange: 'transform',
              }}
            >
              <ProjectCard project={project} />
            </div>
          </div>
        ))}
        {/* Spacer so the last card has sticky time before the section unsticks */}
        <div className="project-cards-spacer" style={{ height: '100vh' }} aria-hidden="true" />
      </div>
    </section>
  );
}

// ─── Contact Section ─────────────────────────────────────────────────────────
function ContactSection() {
  // Scramble the "Let's make / something / good." heading the first time it
  // scrolls into view, then re-scramble on hover. Triggered by motion.h2's
  // own onViewportEnter so it stays in lockstep with the fadeUp animation.
  const headingRef = useRef<HTMLHeadingElement>(null);
  const initialScrambleRan = useRef(false);

  const runInitialScramble = () => {
    if (initialScrambleRan.current || !headingRef.current) return;
    initialScrambleRan.current = true;
    const els = Array.from(
      headingRef.current.querySelectorAll<HTMLElement>('.scramble-text')
    );
    els.forEach((el, i) =>
      runScramble(el, el.dataset.text ?? el.textContent ?? '', i * 300)
    );
  };

  // Hover re-runs the scramble on whichever line is hovered. Guarded so
  // wiggling over an already-animating line doesn't restart it.
  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;
    const els = Array.from(heading.querySelectorAll<HTMLElement>('.scramble-text'));
    const handleHover = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      if (el.dataset.scrambling === 'true') return;
      runScramble(el, el.dataset.text ?? el.textContent ?? '', 0);
    };
    els.forEach((el) => {
      el.style.cursor = 'pointer';
      el.addEventListener('mouseenter', handleHover);
    });
    return () => {
      els.forEach((el) => el.removeEventListener('mouseenter', handleHover));
    };
  }, []);

  const btnStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    fontFamily: F.sans,
    fontSize: '15px',
    color: C.primary,
    textDecoration: 'none',
    border: `1px solid #2A2A2A`,
    borderRadius: '2px',
    padding: '14px 24px',
    transition: 'border-color 0.2s, background-color 0.2s',
    whiteSpace: 'nowrap' as const,
  };

  const onEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.borderColor = C.primary;
    e.currentTarget.style.backgroundColor = 'rgba(235,235,229,0.05)';
  };
  const onLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.borderColor = '#2A2A2A';
    e.currentTarget.style.backgroundColor = 'transparent';
  };

  return (
    <section
      id="contact"
      style={{ backgroundColor: C.bg }}
    >
      {/* Top border line */}
      <div style={{ height: '1px', backgroundColor: '#1A1A1A', marginLeft: '80px', marginRight: '80px' }} className="max-md:!mx-6 max-lg:!mx-10" />

      {/* Two-column layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '45% 55%',
        }}
        className="max-md:!grid-cols-1 max-lg:!grid-cols-1"
      >
        {/* ── Left: Intro ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          onViewportEnter={runInitialScramble}
          style={{
            padding: '100px 60px 100px 80px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            borderRight: `1px solid #1A1A1A`,
          }}
          className="max-md:!px-6 max-md:!pt-16 max-md:!pb-10 max-md:!border-r-0 max-md:!border-b max-md:!border-[#1A1A1A] max-lg:!px-10 max-lg:!pt-16 max-lg:!pb-10 max-lg:!border-r-0 max-lg:!border-b max-lg:!border-[#1A1A1A]"
        >
          <motion.p
            variants={fadeUpItem}
            style={{
              fontFamily: F.sans,
              fontSize: '13px',
              color: C.secondary,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              margin: '0 0 24px 0',
            }}
          >
            Contact
          </motion.p>

          <motion.h2
            ref={headingRef}
            variants={fadeUpItem}
            style={{
              fontFamily: F.editorial,
              fontSize: 'clamp(40px, 4.5vw, 72px)',
              color: C.primary,
              margin: '0 0 24px 0',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              fontWeight: 400,
            }}
          >
            <span className="scramble-text" data-text="Let's make" aria-label="Let's make">Let's make</span>
            <br />
            <span className="scramble-text" data-text="something" aria-label="something" style={{ fontStyle: 'italic' }}>something</span>
            <br />
            <span className="scramble-text" data-text="good." aria-label="good.">good.</span>
          </motion.h2>

          <motion.p
            variants={fadeUpItem}
            style={{
              fontFamily: F.sans,
              fontSize: '17px',
              color: C.secondary,
              lineHeight: 1.7,
              margin: 0,
              maxWidth: '360px',
            }}
          >
            Whether you're hiring, collaborating, or just want to talk design, I'd love to connect.
          </motion.p>
        </motion.div>

        {/* ── Right: Contact links ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          style={{
            padding: '100px 80px 100px 60px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
          className="max-md:!px-6 max-md:!pt-10 max-md:!pb-16 max-lg:!px-10 max-lg:!pt-10 max-lg:!pb-16"
        >
          <motion.div
            variants={fadeUpItem}
            style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}
            className="max-md:!flex-col max-md:!items-start"
          >
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/nur-leeyana-bte-roslee"
              target="_blank"
              rel="noopener noreferrer"
              style={btnStyle}
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              Let's Connect
            </a>

            {/* Email */}
            <a
              href="mailto:nurleeyana2209@gmail.com"
              style={btnStyle}
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              Send an Email
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer
        style={{
          paddingBottom: '48px',
          textAlign: 'center',
          borderTop: `1px solid #1A1A1A`,
          paddingTop: '32px',
          marginLeft: '80px',
          marginRight: '80px',
        }}
        className="max-md:!mx-6 max-lg:!mx-10"
      >
        <p style={{ fontFamily: F.sans, fontSize: '13px', color: C.secondary, margin: 0 }}>
          © Leeyana. Designed in Figma. Built with Claude.
        </p>
      </footer>
    </section>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────────
export function HomePage() {
  return (
    <div style={{ backgroundColor: C.bg, minHeight: '100vh' }}>
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}