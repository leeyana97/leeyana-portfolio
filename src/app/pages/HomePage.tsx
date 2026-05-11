import leeyanaPhoto from '../../imports/Leeyana_profile_photo.jpg';
import nlMonogram from '../../imports/image.png';
import { useNavigate } from 'react-router';
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
import tripsyncImg from '../../imports/Tripsync_home_app.png';
import tripsyncScreenImg from '../../imports/Tripsync_home_app-1.png';
import tripsyncHandImg from '../../imports/Gemini_Generated_Image_kpqnx2kpqnx2kpqn.png';
import tripsyncHandImg2 from '../../imports/ChatGPT_Image_Apr_29,_2026,_09_07_27_PM.png';
import tripsyncHeroImg from '../../imports/Tripsync_hero_image.png';
import lumisImg from '../../imports/Lumis_portfolio_homepage.png';
import neighbourlahImg from '../../imports/NeighbourLah_home_app.png';

import { useState, useEffect, useRef } from 'react';
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

  useEffect(() => {
    const headline = headlineRef.current;
    const meta = metaRef.current;
    if (!headline || !meta) return;

    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      if (isMobile) {
        gsap.set(headline, { opacity: 0, y: 20 });
        gsap.set(meta, { opacity: 0, y: 15 });
        gsap
          .timeline({
            scrollTrigger: {
              trigger: headline,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          })
          .to(headline, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
          .to(meta, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.2');
      } else {
        const words = headline.querySelectorAll<HTMLElement>('[data-word]');
        gsap.set(words, { opacity: 0, y: 30 });
        gsap.set(meta, { opacity: 0, y: 15 });
        gsap
          .timeline({
            scrollTrigger: {
              trigger: headline,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          })
          .to(words, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
          })
          .to(
            meta,
            { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
            '+=0.2'
          );
      }
    });

    return () => ctx.revert();
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
      className="max-md:!px-6 max-md:!pt-16 max-md:!pb-16 max-lg:!px-10"
    >
      {/* Faint NL watermark — N and L converge diagonally */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          userSelect: 'none',
          width: 'clamp(400px, 60vw, 860px)',
          height: 'clamp(280px, 42vw, 600px)',
          mixBlendMode: 'screen',
        }}
      >
        <motion.span
          initial={{ opacity: 0, x: '-60vw', y: '-50vh' }}
          animate={{ opacity: 0.18, x: '-5%', y: '-48%' }}
          transition={{ duration: 1.6, ease, delay: 0.4 }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontFamily: '"Luxurious Script", cursive',
            fontSize: 'clamp(280px, 42vw, 620px)',
            color: C.primary,
            lineHeight: 1,
            fontWeight: 400,
            letterSpacing: '-0.04em',
          }}
        >
          N
        </motion.span>
        <motion.span
          initial={{ opacity: 0, x: '50vw', y: '100vh' }}
          animate={{ opacity: 0.18, x: '13%', y: '-30%' }}
          transition={{ duration: 1.6, ease, delay: 0.4 }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontFamily: '"Luxurious Script", cursive',
            fontSize: 'clamp(240px, 36vw, 520px)',
            color: C.primary,
            lineHeight: 1.6,
            fontWeight: 400,
            letterSpacing: '-0.04em',
          }}
        >
          L
        </motion.span>
      </div>

      {/* Main content */}
      <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {/* Headline group */}
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
            <SplitWords text="Leeyana" />
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
              <SplitWords text="Designing with empathy," />
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
              <SplitWords text="building with purpose." />
            </p>
          </div>
        </div>

        {/* Metadata */}
        <div ref={metaRef} style={{ marginTop: 'clamp(32px, 4vw, 56px)' }}>
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

      {/* Bottom row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
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

      </motion.div>
    </section>
  );
}

// ─── About Section ──────────────────────────────────────────────────────────
function AboutSection() {
  const skills = ['UIUX Design', 'Affinity mapping', 'Prototyping','User Research', 'Usability Testing','Figma','Claude AI', 'Healthcare Background'];

  return (
    <section
      id="about"
      style={{
        backgroundColor: C.bg,
        paddingTop: '120px',
        paddingBottom: '120px',
      }}
      className="max-md:!py-20 max-lg:!py-16"
    >
      <div
        style={{ maxWidth: '1400px', margin: '0 auto', paddingLeft: '80px', paddingRight: '80px' }}
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
            style={{ overflow: 'hidden', aspectRatio: '3/4' }}
          >
            <img
              src={leeyanaPhoto}
              alt="Leeyana — UI/UX Designer"
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
    slug: '/tripsync',
    name: 'TripSync',
    description: 'A group travel companion app that makes planning together feel effortless.',
    tags: [],
    image: tripsyncHeroImg,
    imageHeight: 620,
    alt: 'TripSync hero photo — phones on a desk with travel objects',
    phoneFrame: false,
    handMockupImg: tripsyncHeroImg,
    screenImg: tripsyncScreenImg,
  },
  {
    id: 'PRODUCT DESIGN',
    slug: '/lumis',
    name: 'Lumis Skincare',
    description: 'A calm, considered shopping experience designed around how people actually discover and buy skincare.',
    tags: [],
    image: lumisImg,
    imageHeight: 620,
    alt: 'Lumis Skincare website on laptop mockup',
  },
  {
    id: 'PRODUCT DESIGN',
    slug: '/neighbourlah',
    name: 'NeighbourLah',
    description: 'A digital space that helps neighbours connect, share, and look out for each other.',
    tags: [],
    image: neighbourlahImg,
    imageHeight: 520,
    alt: 'NeighbourLah app screens on warm toned background',
  },
  {
    id: 'PRODUCT DESIGN',
    slug: '/axs',
    name: 'AXS · Billing Feature',
    description: 'Smart billing: split, track, and manage payments together, designed for individuals and couples.',
    tags: ['iOS App', 'Fintech', 'Feature Design', 'Collaboration'],
    image: null,
    imageHeight: 520,
    alt: 'AXS Billing Feature placeholder',
  },
];

function ProjectCard({ project, navigate }: { project: typeof projects[0]; navigate: ReturnType<typeof useNavigate> }) {
  return (
    <article
      data-cursor="view"
      className="project-card"
      onClick={() => navigate(project.slug)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && navigate(project.slug)}
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
        <img
          src={project.image}
          alt={project.alt}
          className="project-card-image"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
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
            }}
            className="max-md:!text-[24px]"
          >
            {project.name}
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
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cards = cardRefs.current;
    if (cards.length === 0) return;

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
            end: 'top top+=105',
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

      <div>
        {projects.map((project, i) => (
          <div
            key={project.slug}
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
            className="max-md:!px-4 max-md:!top-[72px]"
          >
            <div
              ref={el => { cardRefs.current[i] = el; }}
              style={{
                width: '100%',
                maxWidth: '1240px',
                height: 'calc(100vh - 105px)',
                willChange: 'transform',
              }}
              className="max-md:!h-[calc(90vh_-_65px)]"
            >
              <ProjectCard project={project} navigate={navigate} />
            </div>
          </div>
        ))}
        {/* Spacer so the last card has sticky time before the section unsticks */}
        <div style={{ height: '100vh' }} aria-hidden="true" />
      </div>
    </section>
  );
}

// ─── Contact Section ─────────────────────────────────────────────────────────
function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Enquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.open(`mailto:nurleeyana2209@gmail.com?subject=${subject}&body=${body}`, '_blank');
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: `1px solid #2A2A2A`,
    padding: '14px 0',
    fontFamily: F.sans,
    fontSize: '17px',
    color: C.primary,
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
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
            Let's make
            <br />
            <span style={{ fontStyle: 'italic' }}>something</span>
            <br />
            good.
          </motion.h2>

          <motion.p
            variants={fadeUpItem}
            style={{
              fontFamily: F.sans,
              fontSize: '17px',
              color: C.secondary,
              lineHeight: 1.7,
              margin: '0 0 48px 0',
              maxWidth: '360px',
            }}
          >
            Whether you have a project in mind, a role to fill, or just want to talk design, I'd love to hear from you.
          </motion.p>

          <motion.div variants={fadeUpItem} style={{ width: '40px', height: '1px', backgroundColor: '#2A2A2A', margin: '0 0 48px 0' }} />

          {/* LinkedIn */}
          <motion.div variants={fadeUpItem}>
            <p
              style={{
                fontFamily: F.sans,
                fontSize: '13px',
                color: C.secondary,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                margin: '0 0 16px 0',
              }}
            >
              Or connect on LinkedIn
            </p>
            <a
              href="https://www.linkedin.com/in/nur-leeyana-bte-roslee"
              target="_blank"
              rel="noopener noreferrer"
              style={{
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
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = C.primary;
                e.currentTarget.style.backgroundColor = 'rgba(235,235,229,0.05)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#2A2A2A';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              Let's Connect
            </a>
          </motion.div>
        </motion.div>

        {/* ── Right: Form ── */}
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
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              <h3
                style={{
                  fontFamily: F.editorial,
                  fontSize: 'clamp(32px, 3.5vw, 48px)',
                  color: C.primary,
                  margin: 0,
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  fontWeight: 400,
                }}
              >
                Message sent.
              </h3>
              <p style={{ fontFamily: F.sans, fontSize: '17px', color: C.secondary, lineHeight: 1.7, margin: 0 }}>
                Your email client should be open. Send when you're ready. I'll get back to you as soon as possible.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                style={{
                  marginTop: '8px',
                  fontFamily: F.sans,
                  fontSize: '15px',
                  color: C.secondary,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  textDecoration: 'underline',
                  textAlign: 'left',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = C.primary)}
                onMouseLeave={e => (e.currentTarget.style.color = C.secondary)}
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              <motion.div variants={fadeUpItem} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontFamily: F.sans, fontSize: '13px', color: C.secondary, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jane Smith"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  style={inputStyle}
                  onFocus={e => (e.currentTarget.style.borderBottomColor = C.primary)}
                  onBlur={e => (e.currentTarget.style.borderBottomColor = '#2A2A2A')}
                />
              </motion.div>

              <motion.div variants={fadeUpItem} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontFamily: F.sans, fontSize: '13px', color: C.secondary, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. jane@company.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={inputStyle}
                  onFocus={e => (e.currentTarget.style.borderBottomColor = C.primary)}
                  onBlur={e => (e.currentTarget.style.borderBottomColor = '#2A2A2A')}
                />
              </motion.div>

              <motion.div variants={fadeUpItem} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontFamily: F.sans, fontSize: '13px', color: C.secondary, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Message
                </label>
                <textarea
                  required
                  rows={6}
                  placeholder="Tell me about your project, role, or just say hi..."
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  style={{ ...inputStyle, resize: 'none', paddingTop: '14px', lineHeight: 1.6 }}
                  onFocus={e => (e.currentTarget.style.borderBottomColor = C.primary)}
                  onBlur={e => (e.currentTarget.style.borderBottomColor = '#2A2A2A')}
                />
              </motion.div>

              <motion.div variants={fadeUpItem}>
                <button
                  type="submit"
                  style={{
                    fontFamily: F.sans,
                    fontSize: '15px',
                    color: C.bg,
                    backgroundColor: C.primary,
                    border: 'none',
                    padding: '18px 40px',
                    cursor: 'pointer',
                    letterSpacing: '0.06em',
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  Send Message
                </button>
              </motion.div>
            </form>
          )}
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