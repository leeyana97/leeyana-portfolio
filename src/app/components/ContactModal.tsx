import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

const C = {
  bg: '#0D0D0D',
  primary: '#EBEBE5',
  secondary: '#888884',
  border: '#2A2A2A',
};

const F = {
  editorial: "'Playfair Display', Georgia, serif",
  sans: "'DM Sans', sans-serif",
};

const ease = [0.25, 0.1, 0.25, 1] as const;

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1] } },
};

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const btnStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    fontFamily: F.sans,
    fontSize: '15px',
    color: C.primary,
    textDecoration: 'none',
    border: `1px solid ${C.border}`,
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
    e.currentTarget.style.borderColor = C.border;
    e.currentTarget.style.backgroundColor = 'transparent';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.45, ease }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10001,
            backgroundColor: C.bg,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close contact"
            style={{
              position: 'fixed',
              top: '28px',
              right: '80px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: C.secondary,
              padding: '4px',
              minWidth: '44px',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'color 0.2s',
              zIndex: 10,
            }}
            className="max-md:!right-6"
            onMouseEnter={e => (e.currentTarget.style.color = C.primary)}
            onMouseLeave={e => (e.currentTarget.style.color = C.secondary)}
          >
            <X size={22} />
          </button>

          {/* Main layout */}
          <div
            style={{
              flex: 1,
              display: 'grid',
              gridTemplateColumns: '45% 55%',
              minHeight: '100vh',
            }}
            className="max-md:!grid-cols-1"
          >
            {/* ── Left: Intro ── */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              style={{
                padding: '120px 60px 80px 80px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                borderRight: `1px solid ${C.border}`,
              }}
              className="max-md:!px-6 max-md:!pt-28 max-md:!pb-10 max-md:!border-r-0 max-md:!border-b max-md:!border-[#2A2A2A]"
            >
              <motion.p
                variants={item}
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
                variants={item}
                style={{
                  fontFamily: F.editorial,
                  fontSize: 'clamp(40px, 5vw, 72px)',
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
                variants={item}
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
              variants={stagger}
              initial="hidden"
              animate="show"
              style={{
                padding: '120px 80px 80px 60px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
              className="max-md:!px-6 max-md:!pt-10 max-md:!pb-20"
            >
              <motion.div
                variants={item}
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
