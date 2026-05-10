import { motion } from 'motion/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Navigation } from '../components/Navigation';
import { FadeUp, AnimatedLine, staggerContainer, fadeUpItem, ease } from '../components/Animate';
import neighbourlahImg from '../../imports/NeighbourLah_home_app.png';

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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
      {label && <span style={{ fontFamily: F.sans, fontSize: '13px', color: C.secondary, alignSelf: 'flex-start' }}>{label}</span>}
      <div style={{ width: '100%', maxWidth: '280px', aspectRatio: '9/16', overflow: 'hidden', borderRadius: '20px', opacity }}>
        <img src={neighbourlahImg} alt={label || 'NeighbourLah screen'} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
      </div>
    </div>
  );
}

function CaseStudyHero() {
  return (
    <section style={{ paddingTop: '160px', paddingBottom: '0', paddingLeft: '80px', paddingRight: '80px', backgroundColor: C.bg }} className="max-md:!px-6 max-md:!pt-28 max-lg:!px-10">
      <motion.div variants={staggerContainer} initial="hidden" animate="show">
        <motion.p variants={fadeUpItem} style={{ fontFamily: F.sans, fontSize: '13px', color: C.secondary, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 20px 0' }}>03 · Case Study</motion.p>
        <motion.h1 variants={fadeUpItem} style={{ fontFamily: F.editorial, fontSize: 'clamp(42px, 7vw, 96px)', color: C.primary, margin: '0 0 20px 0', lineHeight: 0.95, letterSpacing: '-0.02em', fontWeight: 400 }}>
          NeighbourLah
        </motion.h1>
        <motion.p variants={fadeUpItem} style={{ fontFamily: F.sans, fontSize: 'clamp(17px, 2vw, 20px)', color: C.secondary, margin: '0 0 24px 0', lineHeight: 1.5 }}>
          A Community App That Helps Neighbours Actually Be Neighbours
        </motion.p>
        <motion.p variants={fadeUpItem} style={{ fontFamily: F.sans, fontSize: '14px', color: C.secondary, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
          Duration: 3 Weeks&nbsp;&nbsp;·&nbsp;&nbsp;Tools: Figma, Claude AI&nbsp;&nbsp;·&nbsp;&nbsp;Platform: iOS App
        </motion.p>
      </motion.div>
      <div style={{ marginTop: '60px', width: '100%', maxWidth: '1280px', height: 'clamp(300px, 55vw, 640px)', overflow: 'hidden', margin: '60px auto 0' }}>
        <img src={neighbourlahImg} alt="NeighbourLah app overview" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
      </div>
    </section>
  );
}

function StatsStrip() {
  const stats = [
    { number: '3', label: 'Weeks · Duration' },
    { number: '7', label: 'Users Interviewed' },
    { number: '4', label: 'Core Features' },
    { number: '88%', label: 'Would Use Again' },
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
    { title: 'Social Fragmentation', desc: 'High-density housing in Singapore creates proximity without community. Residents live metres apart but interact as strangers.' },
    { title: 'Information Silos', desc: 'Important neighbourhood information: maintenance notices, lost pets, community events, circulates only through those who already know each other.' },
    { title: 'Trust Barriers', desc: 'Neighbours are often willing to help each other but lack a low-friction way to offer or ask without feeling intrusive or vulnerable.' },
    { title: 'Existing App Friction', desc: 'Apps like Nextdoor require real identity verification that deters many. Others are too generic for Singapore\'s specific HDB context.' },
  ];
  return (
    <section style={{ backgroundColor: C.problemBg, padding: '80px', paddingTop: '80px', paddingBottom: '80px' }} className="max-md:!px-6 max-md:!py-16 max-lg:!px-10 max-lg:!py-14">
      <h2 style={{ fontFamily: F.editorial, fontSize: 'clamp(32px, 3.5vw, 42px)', color: C.primary, margin: '0 0 32px 0', lineHeight: 1.2, fontWeight: 400 }}>The Problem.</h2>
      <p style={{ fontFamily: F.sans, fontSize: '17px', color: C.primary, lineHeight: 1.7, margin: '0 0 48px 0', maxWidth: '720px' }}>
        Singapore's HDB estates house millions of people in close quarters, yet loneliness and social isolation are growing. Neighbours share walls but not names. Community bonds that used to form naturally, through corridors, void decks, and kopitiam conversations, are fading. NeighbourLah was designed to create the conditions for connection, without forcing it.
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
    { title: 'Willingness Is Not the Problem', desc: 'Every participant expressed genuine interest in being a better neighbour. The barrier was never motivation; it was mechanism. Nobody knew how to start.' },
    { title: 'Trust Requires Gradual Exposure', desc: 'Participants wanted to observe community activity before participating. An app that required immediate self-disclosure before showing value would fail at the first screen.' },
    { title: 'Practical Help as Entry Point', desc: 'The most comfortable form of interaction was practical and transactional: borrowing items, sharing excess food, reporting issues. Emotional community came later.' },
    { title: 'HDB Context is Specific', desc: 'Existing community apps didn\'t understand the HDB block structure. Participants wanted to interact with their floor, their block, and their estate, in that order.' },
    { title: 'Privacy Concerns Are Real', desc: 'Participants were wary of apps that shared too much personal information publicly. Anonymised or semi-anonymous initial interaction significantly reduced anxiety.' },
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
      number: '01', name: 'Community Feed',
      bullets: [
        'A hyper-local feed scoped to floor, block, and estate, switchable by the user depending on the radius of their interest.',
        'Posts are lightweight: a short text, optional image, and category tag. The design prevents the feed from becoming a social media performance.',
        'Pinned notices from the Town Council or block committee appear at the top, ensuring critical information reaches residents.',
      ],
      imageFirst: false,
    },
    {
      number: '02', name: 'Help & Borrow',
      bullets: [
        'A dedicated space for practical requests: borrowing items, offering surplus food, requesting errands help from neighbours who are available.',
        'Requests expire automatically after 48 hours, keeping the list current and preventing stale posts from cluttering the experience.',
        'Both sides rate the interaction, building a trust score that makes future requests easier to accept.',
      ],
      imageFirst: true,
    },
    {
      number: '03', name: 'Neighbourhood Notices',
      bullets: [
        'A structured notice board separate from the social feed, for maintenance schedules, estate announcements, and community reminders.',
        'Notices can be acknowledged with a simple "seen" tap, giving organisers visibility into awareness without requiring responses.',
        'Residents can subscribe to specific notice categories, only getting what\'s relevant to their level of HDB engagement.',
      ],
      imageFirst: false,
    },
    {
      number: '04', name: 'Interest Circles',
      bullets: [
        'Opt-in groups around shared interests: morning walks, elderly check-ins, plant swaps, hawker recommendations.',
        'Circles are estate-scoped, keeping groups intimate and locally relevant rather than turning into city-wide forums.',
        'Discovery is passive: the app suggests Circles based on engagement patterns without requiring a formal application or profile.',
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
    { number: '88%', label: 'Would Use Daily' },
    { number: '7', label: 'Participants' },
    { number: '10', label: 'Tasks Tested' },
    { number: '2.1', label: 'Avg. Difficulty (out of 7)' },
  ];
  const insights = [
    '88% of participants said they\'d use NeighbourLah at least once a day if it were available in their estate, a striking adoption signal for an app targeting a behaviour people claim to want but rarely do.',
    'The Help & Borrow feature resonated most strongly. Participants immediately thought of things they could offer: excess cooking, unused tools, a spare charger, and appreciated that the framing was reciprocal, not charitable.',
    'The hyper-local scoping was the most differentiated feature. Being able to see only floor-level activity first felt genuinely novel and personally relevant in a way that city-wide community apps never achieved.',
    'Privacy settings needed more prominence. Three participants felt uncomfortable with the default sharing scope and wanted to see privacy controls before they committed to posting. Surfacing this during onboarding resolved the concern.',
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
      label: 'Privacy Default Settings',
      problem: 'Default sharing scope was set to "Block" on first post. Participants felt exposed not knowing who could see their content before they posted it.',
      solution: 'Added a Privacy Setup step to the onboarding flow, letting users choose their default sharing scope before they see the feed. A persistent scope indicator now appears at the top of each post composer.',
    },
    {
      label: 'Help Request Discovery',
      problem: 'Active help requests from neighbours were scattered in the general feed with no way to filter or surface them efficiently. Participants missed requests they would have responded to.',
      solution: 'Created a dedicated Help & Borrow tab with filter controls by category (borrow, offer, errands), proximity (floor/block/estate), and urgency. Requests now have a clear visual treatment that distinguishes them from general posts.',
    },
    {
      label: 'Interest Circle Onboarding',
      problem: 'Interest Circles weren\'t surfaced until users had scrolled through the app for several minutes. Two participants never discovered them during the session.',
      solution: 'Introduced a "Join a Circle" prompt during onboarding, showing the 3 most active Circles in the user\'s estate. Circles are now prominently featured on the homepage below the feed.',
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
    { title: 'Connection Model Validated', desc: 'The hyper-local scoping approach proved that proximity alone isn\'t community, but proximity plus the right tools can be. Every participant described a specific neighbour they\'d want to connect with after the session.' },
    { title: '3 Key Flows Iterated', desc: 'Privacy setup, Help & Borrow discoverability, and Circle onboarding were all meaningfully improved based on observed behaviour during testing.' },
    { title: 'Behaviour Change Potential', desc: '88% daily use intent is a strong signal that the core concept: making neighbourly interaction low-friction, landed. The design reduces the gap between wanting to connect and actually doing it.' },
  ];
  return (
    <section style={{ backgroundColor: C.bg, padding: '80px', paddingTop: '100px', paddingBottom: '100px', textAlign: 'center' }} className="max-md:!px-6 max-md:!py-20 max-lg:!px-10">
      <blockquote style={{ fontFamily: F.editorial, fontStyle: 'italic', fontSize: 'clamp(24px, 3.5vw, 40px)', color: C.primary, margin: '0 auto 48px auto', lineHeight: 1.35, maxWidth: '900px', letterSpacing: '-0.01em', fontWeight: 400, borderLeft: 'none', padding: 0 }}>
        "I've lived in my block for six years and I don't know a single neighbour's name. This app would have changed that."
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
    { number: '01', title: 'Safety by Design', body: "Community apps carry real safety responsibilities. The design needed to make it easy to report harmful content or block users, and those mechanisms needed to be visible, not hidden." },
    { number: '02', title: 'Moderation at Scale', body: "A hyperlocal feed works when there's moderate activity. With high volume, quality control becomes critical. The design would need a clear moderation model before launch." },
    { number: '03', title: 'Elderly Inclusion', body: "Singapore's ageing population includes many residents who would most benefit from a neighbourhood connection tool but are least likely to adopt a new app. Accessibility and simplicity need deeper exploration." },
    { number: '04', title: 'Institutional Partnerships', body: "The app's full value requires buy-in from Town Councils and HDB bodies for official notices and estate data. A B2G distribution model would be more viable than pure consumer acquisition." },
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
      <h2 style={{ fontFamily: F.editorial, fontSize: 'clamp(32px, 4.5vw, 52px)', color: C.primary, margin: '0 0 20px 0', lineHeight: 1.1, letterSpacing: '-0.02em', fontWeight: 400 }}>Experience NeighbourLah.</h2>
      <p style={{ fontFamily: F.sans, fontSize: '17px', color: C.secondary, margin: '0 0 32px 0', lineHeight: 1.7, maxWidth: '580px' }}>
        Explore the full interactive prototype: community feed, help requests, and interest circles in action.
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
      onClick={() => navigate('/axs')}
    >
      <p style={{ fontFamily: F.sans, fontSize: '13px', color: C.secondary, letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 12px 0' }}>Next Project</p>
      <p style={{ fontFamily: F.editorial, fontSize: 'clamp(28px, 3.5vw, 42px)', color: C.primary, margin: 0, letterSpacing: '-0.01em', lineHeight: 1.1, fontWeight: 400 }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
        AXS · Billing Feature
      </p>
    </section>
  );
}

export function NeighbourLahPage() {
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