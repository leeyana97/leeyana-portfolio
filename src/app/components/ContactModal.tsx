import { useState } from 'react';
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

  const handleClose = () => {
    onClose();
    setTimeout(() => setSubmitted(false), 400);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: `1px solid ${C.border}`,
    padding: '14px 0',
    fontFamily: F.sans,
    fontSize: '17px',
    color: C.primary,
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
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
            zIndex: 300,
            backgroundColor: C.bg,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Close */}
          <button
            onClick={handleClose}
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
            {/* ── Left: Intro ──────────────────────────────────── */}
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
                  margin: '0 0 48px 0',
                  maxWidth: '360px',
                }}
              >
                Whether you have a project in mind, a role to fill, or just want to talk design, I'd love to hear from you.
              </motion.p>

              {/* Divider */}
              <motion.div
                variants={item}
                style={{ width: '40px', height: '1px', backgroundColor: C.border, margin: '0 0 48px 0' }}
              />

              {/* LinkedIn */}
              <motion.div variants={item}>
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
                    border: `1px solid ${C.border}`,
                    borderRadius: '2px',
                    padding: '14px 24px',
                    transition: 'border-color 0.2s, background-color 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = C.primary;
                    e.currentTarget.style.backgroundColor = 'rgba(235,235,229,0.05)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = C.border;
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

            {/* ── Right: Form ──────────────────────────────────── */}
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
                  <p
                    style={{
                      fontFamily: F.sans,
                      fontSize: '17px',
                      color: C.secondary,
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    Your email client should be open. Send when you're ready. I'll get back to you as soon as possible.
                  </p>
                  <button
                    onClick={handleClose}
                    style={{
                      marginTop: '16px',
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
                    Back to portfolio
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                  <motion.div variants={item} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label
                      style={{
                        fontFamily: F.sans,
                        fontSize: '13px',
                        color: C.secondary,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                      }}
                    >
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
                      onBlur={e => (e.currentTarget.style.borderBottomColor = C.border)}
                    />
                  </motion.div>

                  <motion.div variants={item} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label
                      style={{
                        fontFamily: F.sans,
                        fontSize: '13px',
                        color: C.secondary,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                      }}
                    >
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
                      onBlur={e => (e.currentTarget.style.borderBottomColor = C.border)}
                    />
                  </motion.div>

                  <motion.div variants={item} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label
                      style={{
                        fontFamily: F.sans,
                        fontSize: '13px',
                        color: C.secondary,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                      }}
                    >
                      Message
                    </label>
                    <textarea
                      required
                      rows={6}
                      placeholder="Tell me about your project, role, or just say hi..."
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      style={{
                        ...inputStyle,
                        resize: 'none',
                        borderBottom: `1px solid ${C.border}`,
                        paddingTop: '14px',
                        lineHeight: 1.6,
                      }}
                      onFocus={e => (e.currentTarget.style.borderBottomColor = C.primary)}
                      onBlur={e => (e.currentTarget.style.borderBottomColor = C.border)}
                    />
                  </motion.div>

                  <motion.div variants={item}>
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}