import { motion } from 'motion/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Navigation } from '../components/Navigation';
import { FadeUp, AnimatedLine, staggerContainer, fadeUpItem, ease } from '../components/Animate';
import lumisImg from '../../imports/Lumis_portfolio_homepage.png';

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
      style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '48px' }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease }}
    >
      <span style={{ fontFamily: F.sans, fontSize: '13px', color: C.secondary, letterSpacing: '0.12em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{text}</span>
      <AnimatedLine />
    </motion.div>
  );
}

function ScreenMockup({ label, opacity = 1 }: { label?: string; opacity?: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {label && <span style={{ fontFamily: F.sans, fontSize: '13px', color: C.secondary }}>{label}</span>}
      <div style={{ width: '100%', overflow: 'hidden', borderRadius: '12px', opacity }}>
        <img src={lumisImg} alt={label || 'Lumis Skincare screen'} style={{ width: '100%', height: '340px', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
      </div>
    </div>
  );
}

function CaseStudyHero() {
  return (
    <section style={{ paddingTop: '160px', paddingBottom: '0', paddingLeft: '80px', paddingRight: '80px', backgroundColor: C.bg }} className="max-md:!px-6 max-md:!pt-28 max-lg:!px-10">
      <motion.div variants={staggerContainer} initial="hidden" animate="show">
        <motion.p variants={fadeUpItem} style={{ fontFamily: F.sans, fontSize: '13px', color: C.secondary, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 20px 0' }}>02 · Case Study</motion.p>
        <motion.h1 variants={fadeUpItem} style={{ fontFamily: F.editorial, fontSize: 'clamp(42px, 7vw, 96px)', color: C.primary, margin: '0 0 20px 0', lineHeight: 0.95, letterSpacing: '-0.02em', fontWeight: 400 }}>
          Lumis Skincare
        </motion.h1>
        <motion.p variants={fadeUpItem} style={{ fontFamily: F.sans, fontSize: 'clamp(17px, 2vw, 20px)', color: C.secondary, margin: '0 0 24px 0', lineHeight: 1.5 }}>
          A Calm, Considered E-Commerce Experience for Skincare Discovery
        </motion.p>
        <motion.p variants={fadeUpItem} style={{ fontFamily: F.sans, fontSize: '14px', color: C.secondary, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
          Duration: 3 Weeks&nbsp;&nbsp;·&nbsp;&nbsp;Tools: Figma, Claude AI&nbsp;&nbsp;·&nbsp;&nbsp;Platform: Web
        </motion.p>
      </motion.div>
      <div style={{ marginTop: '60px', width: '100%', maxWidth: '1280px', height: 'clamp(300px, 55vw, 640px)', overflow: 'hidden', margin: '60px auto 0' }}>
        <img src={lumisImg} alt="Lumis Skincare website" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
      </div>
    </section>
  );
}

function StatsStrip() {
  const stats = [
    { number: '3', label: 'Weeks · Duration' },
    { number: '6', label: 'Users Tested' },
    { number: '92%', label: 'Purchase Intent' },
    { number: '5', label: 'Key User Flows' },
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
    { title: 'Overwhelming Product Pages', desc: 'Skincare sites typically present product information in walls of text and ingredient lists that overwhelm rather than guide.' },
    { title: 'No Personalised Discovery', desc: 'Most e-commerce experiences treat all shoppers identically, ignoring skin type, concerns, and the discovery stage of the customer journey.' },
    { title: 'Anxiety Around Purchasing', desc: 'Skincare is a considered purchase. Shoppers second-guess decisions without clear guidance, leading to cart abandonment and buyer\'s remorse.' },
    { title: 'Disconnected Brand Experience', desc: 'Many independent skincare brands lack the visual and editorial cohesion to compete with larger players, despite having superior products.' },
  ];
  return (
    <section style={{ backgroundColor: C.problemBg, padding: '80px', paddingTop: '80px', paddingBottom: '80px' }} className="max-md:!px-6 max-md:!py-16 max-lg:!px-10 max-lg:!py-14">
      <h2 style={{ fontFamily: F.editorial, fontSize: 'clamp(32px, 3.5vw, 42px)', color: C.primary, margin: '0 0 32px 0', lineHeight: 1.2, fontWeight: 400 }}>
        The Problem.
      </h2>
      <p style={{ fontFamily: F.sans, fontSize: '17px', color: C.primary, lineHeight: 1.7, margin: '0 0 48px 0', maxWidth: '720px' }}>
        Buying skincare online is fraught. Products are expensive, effects are personal, and most e-commerce experiences prioritise conversion over confidence. Lumis Skincare needed a digital presence that felt as considered as its products, guiding people through discovery with editorial calm rather than retail urgency.
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
    { title: 'Ritual Over Transaction', desc: 'Skincare buyers think about their routine holistically. They\'re not buying a product; they\'re buying into a practice. The site needed to reflect and support that mindset.' },
    { title: 'Ingredient Literacy Varies Widely', desc: 'Some shoppers know exactly what they want; others are overwhelmed by niacinamide percentages. The experience needed to serve both without patronising either.' },
    { title: 'Trust Through Transparency', desc: 'Shoppers repeatedly cited clear ingredient information, honest "this works if" framing, and real before/after results as the key trust signals.' },
    { title: 'Discovery is Social', desc: 'Most participants found new products through recommendations from friends, content creators, or editorial sources. The site needed to feel like a trusted recommendation, not a shop.' },
    { title: 'Simplicity Signals Quality', desc: 'Across every participant interview, cleaner interfaces were perceived as higher quality. Visual noise created doubt; editorial calm created confidence.' },
  ];
  return (
    <section style={{ backgroundColor: C.bg, padding: '80px', paddingTop: '80px', paddingBottom: '80px' }} className="max-md:!px-6 max-md:!py-16 max-lg:!px-10 max-lg:!py-14">
      <SectionLabel text="Research Findings" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }} className="max-md:!grid-cols-1 max-lg:!grid-cols-2">
        {findings.map((f, i) => (
          <div key={f.title} style={{ border: `1px solid ${C.cardBorder}`, padding: '24px' }}>
            <p style={{ fontFamily: F.sans, fontSize: '13px', color: C.secondary, margin: '0 0 14px 0', letterSpacing: '0.08em' }}>0{i + 1}</p>
            <h3 style={{ fontFamily: F.editorial, fontSize: '18px', color: C.primary, margin: '0 0 14px 0', lineHeight: 1.3, fontWeight: 400 }}>{f.title}</h3>
            <p style={{ fontFamily: F.sans, fontSize: '15px', color: C.secondary, margin: 0, lineHeight: 1.6 }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function DesignDecisions() {
  const features = [
    {
      number: '01', name: 'Editorial Homepage',
      bullets: [
        'Full-bleed hero imagery with minimal typography creates immediate brand atmosphere without competing for attention.',
        'Product categories are introduced through lifestyle imagery rather than thumbnail grids, setting a discovery mindset from the first scroll.',
        'The homepage functions as a magazine spread, informing and inspiring before it asks for anything.',
      ],
      imageFirst: false,
    },
    {
      number: '02', name: 'Skin Concern Navigation',
      bullets: [
        'A secondary navigation layer organised by skin concern (hydration, clarity, texture, sensitivity) sits alongside traditional category browsing.',
        'Shoppers who know their concern but not the product category can navigate directly to relevance.',
        'Concern-based pages include editorial context: why this matters, what to look for, before product listings.',
      ],
      imageFirst: true,
    },
    {
      number: '03', name: 'Product Detail Calm',
      bullets: [
        'Product pages prioritise breathing room over information density. Key details surface progressively: hero image, then purpose, then ingredients, then reviews.',
        'A "This works best if..." section honestly articulates who the product is and isn\'t for.',
        'Related products are surfaced as "What pairs well" rather than "You may also like", reinforcing the ritual framing.',
      ],
      imageFirst: false,
    },
    {
      number: '04', name: 'Routine Builder',
      bullets: [
        'A guided tool helps users build a morning and evening routine from the Lumis range.',
        'Each step in the routine shows which products can fill that role, with simple compatibility notes.',
        'The completed routine can be saved, shared, and added to cart in a single action.',
      ],
      imageFirst: true,
    },
  ];
  return (
    <section style={{ backgroundColor: C.bg, padding: '80px', paddingTop: '80px', paddingBottom: '80px' }} className="max-md:!px-6 max-md:!py-16 max-lg:!px-10 max-lg:!py-14">
      <SectionLabel text="Design Decisions" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
        {features.map((feat) => (
          <div key={feat.number} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }} className="max-md:!grid-cols-1 max-md:!gap-10 max-lg:!grid-cols-1 max-lg:!gap-10">
            {feat.imageFirst ? (
              <>
                <div className="max-md:!order-2"><ScreenMockup /></div>
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
                <div><ScreenMockup /></div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function UsabilityTesting() {
  const stats = [
    { number: '92%', label: 'Purchase Intent' },
    { number: '6', label: 'Participants' },
    { number: '8', label: 'Tasks Tested' },
    { number: '1.8', label: 'Avg. Difficulty (out of 7)' },
  ];
  const insights = [
    'Purchase intent was strikingly high: 92% of participants said they\'d buy from Lumis after the testing session, with several noting the site made them feel confident rather than pressured.',
    'The concern-based navigation was the most appreciated addition. Participants who didn\'t know where to start found it gave them a clear, non-intimidating entry point into the product range.',
    'The "This works best if..." section on product pages generated consistently positive responses. Honest framing around who a product is for, and isn\'t for, built rather than undermined trust.',
    'Cart flow needed work. Three participants hesitated at checkout because the shipping cost appeared late in the journey. Surfacing this information earlier was an immediate iteration.',
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
      label: 'Checkout Transparency',
      problem: 'Shipping cost appeared only at the final checkout step, causing hesitation and drop-off. Participants felt ambushed by a cost they should have seen earlier.',
      solution: 'Introduced a persistent "estimated delivery & cost" indicator in the cart sidebar and at the top of the checkout flow, making the total cost visible from the moment items are added.',
    },
    {
      label: 'Product Image Gallery',
      problem: 'The product image gallery showed only the product in isolation. Participants wanted to see the texture, the packaging at scale, and ideally the product in use.',
      solution: 'Expanded the gallery to include close-up texture shots, scale reference images, and at least one in-context lifestyle image per product.',
    },
    {
      label: 'Ingredient List Readability',
      problem: 'The full ingredient list was shown in a small-font block with no hierarchy. Shoppers who cared about ingredients found it unusable; those who didn\'t found it intimidating.',
      solution: 'Restructured ingredient display into three tiers: key actives (highlighted), supporting ingredients, and base. Each tier has a brief explanation of its role.',
    },
    {
      label: 'Routine Builder Entry Point',
      problem: 'The Routine Builder was buried two levels deep in the navigation. Most participants didn\'t know it existed until they were told during testing.',
      solution: 'Surfaced the Routine Builder as a primary homepage section and added a contextual entry point ("Build it into your routine") on every product page.',
    },
  ];
  return (
    <section style={{ backgroundColor: C.bg, padding: '80px', paddingTop: '80px', paddingBottom: '80px' }} className="max-md:!px-6 max-md:!py-16 max-lg:!px-10 max-lg:!py-14">
      <SectionLabel text="Top Issues & Iterations" />
      <h2 style={{ fontFamily: F.editorial, fontSize: 'clamp(32px, 3.5vw, 42px)', color: C.primary, margin: '0 0 64px 0', lineHeight: 1.2, fontWeight: 400 }}>What Changed & Why</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
        {issues.map((issue) => (
          <div key={issue.label}>
            <p style={{ fontFamily: F.sans, fontSize: '13px', color: C.secondary, letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 16px 0' }}>{issue.label}</p>
            <p style={{ fontFamily: F.sans, fontSize: '17px', color: C.secondary, lineHeight: 1.7, margin: '0 0 40px 0', maxWidth: '680px' }}>{issue.problem}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '40px' }} className="max-md:!grid-cols-1 max-md:!gap-8 max-lg:!grid-cols-1 max-lg:!gap-8">
              <ScreenMockup label="Before" opacity={0.45} />
              <ScreenMockup label="After" opacity={1} />
            </div>
            <p style={{ fontFamily: F.sans, fontSize: '17px', color: C.primary, lineHeight: 1.7, margin: 0, maxWidth: '680px' }}>{issue.solution}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Impact() {
  const outcomes = [
    { title: 'Editorial Trust Established', desc: 'The calm, considered visual approach translated directly into user confidence. Participants described the brand as "premium" and "trustworthy" without prompting.' },
    { title: '4 of 5 Key Flows Iterated', desc: 'Testing surfaced actionable friction in checkout, product detail, ingredient display, and the Routine Builder entry point. Each was directly addressed in the revised design.' },
    { title: 'Brand Story Landed', desc: 'All 6 participants could articulate what Lumis stood for after their session, not because it was stated explicitly, but because the design showed it at every touchpoint.' },
  ];
  return (
    <section style={{ backgroundColor: C.bg, padding: '80px', paddingTop: '100px', paddingBottom: '100px', textAlign: 'center' }} className="max-md:!px-6 max-md:!py-20 max-lg:!px-10">
      <blockquote style={{ fontFamily: F.editorial, fontStyle: 'italic', fontSize: 'clamp(24px, 3.5vw, 40px)', color: C.primary, margin: '0 auto 48px auto', lineHeight: 1.35, maxWidth: '900px', letterSpacing: '-0.01em', fontWeight: 400, borderLeft: 'none', padding: 0 }}>
        "It feels like someone actually thought about how I shop, not how they wanted me to shop."
      </blockquote>
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
    { number: '01', title: 'Content Strategy Matters', body: 'The editorial framing required actual content decisions, not just layout. A design system without a content strategy for how products are described would have undermined the whole concept.' },
    { number: '02', title: 'Mobile Commerce First', body: 'Research confirmed that the majority of skincare browsing happens on mobile. The desktop design needed to be built with a genuinely mobile-first mindset, not adapted after the fact.' },
    { number: '03', title: 'Photography as UX', body: 'The quality and consistency of product photography had as much impact on user confidence as any interface decision. Visual assets are a core part of the UX, not an afterthought.' },
    { number: '04', title: 'Personalisation Ceiling', body: "The Routine Builder was the most loved feature, but it also exposed the ceiling of a static personalisation approach. A more dynamic recommendation engine would better serve shoppers with evolving routines." },
  ];
  return (
    <section style={{ backgroundColor: C.statsBg, padding: '80px', paddingTop: '80px', paddingBottom: '80px' }} className="max-md:!px-6 max-md:!py-16 max-lg:!px-10 max-lg:!py-14">
      <SectionLabel text="Reflections & Next Steps" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="max-md:!grid-cols-1">
        {cards.map((card) => (
          <div key={card.number} style={{ border: `1px solid ${C.cardBorder}`, padding: '24px' }}>
            <p style={{ fontFamily: F.sans, fontSize: '13px', color: C.secondary, margin: '0 0 16px 0', letterSpacing: '0.08em' }}>{card.number}</p>
            <h3 style={{ fontFamily: F.editorial, fontSize: '22px', color: C.primary, margin: '0 0 14px 0', lineHeight: 1.3, fontWeight: 400 }}>{card.title}</h3>
            <p style={{ fontFamily: F.sans, fontSize: '15px', color: C.secondary, margin: 0, lineHeight: 1.6 }}>{card.body}</p>
          </div>
        ))}
      </div>
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

export function LumisPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div style={{ backgroundColor: C.bg, minHeight: '100vh' }}>
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