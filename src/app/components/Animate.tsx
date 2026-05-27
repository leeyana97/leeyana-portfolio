import { motion, type Variants } from 'motion/react';
import { useRef, useLayoutEffect, type ReactNode, type CSSProperties } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Easing curves ───────────────────────────────────────────────────────────
export const ease = [0.25, 0.1, 0.25, 1] as const;
export const easeSnap = [0.16, 1, 0.3, 1] as const;

// ─── FadeUp ─────────────────────────────────────────────────────────────────
// Scroll-triggered (GSAP): fades in from below when 20% of the element is
// visible in the viewport. Plays once. Mobile uses a smaller y offset.
export function FadeUp({
  children,
  delay = 0,
  className,
  style,
  id,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const yOffset = window.innerWidth < 768 ? 10 : 15;

    const ctx = gsap.context(() => {
      gsap.set(el, { opacity: 0, y: yOffset });
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    });

    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={ref} id={id} className={className} style={{ willChange: 'transform, opacity', ...style }}>
      {children}
    </div>
  );
}

// ─── StaggerCards ────────────────────────────────────────────────────────────
// Animates direct children with a stagger when the parent <section> ancestor
// is 20% visible. Each child fades from y:15 → 0, opacity 0 → 1. Plays once.
export function StaggerCards({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const cards = Array.from(el.children) as HTMLElement[];
    if (cards.length === 0) return;
    const trigger = el.closest('section') ?? el;

    const ctx = gsap.context(() => {
      cards.forEach(c => { c.style.willChange = 'transform, opacity'; });
      gsap.set(cards, { opacity: 0, y: 15 });
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        onComplete: () => {
          // Drop will-change once the animation has played
          cards.forEach(c => { c.style.willChange = 'auto'; });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}

// ─── AnimatedQuote ───────────────────────────────────────────────────────────
// Participant quote block with a green accent left border that draws from
// height 0 → full (0.4s), then the quote text fades in (0.3s). Trigger fires
// when the block is 20% visible. Plays once.
//
// Optional `scramble` prop: when set, the text reveal is replaced with a
// glyph-scramble effect (same pattern used in the HomePage hero). The
// component still keeps the border slide-in as a leading beat — the
// scramble starts right after. Requires `children` to be a plain string
// when scramble is enabled.

// Scramble support — local mirror of the HomePage helper so AnimatedQuote
// is self-contained. setInterval ticks at SCRAMBLE_TICK ms; on each tick
// a growing prefix of the final text is "revealed" and everything past
// that point renders as a random SCRAMBLE_GLYPHS character. Spaces are
// preserved so word shape doesn't get destroyed mid-animation.
const SCRAMBLE_GLYPHS =
  '!<>-_\\/[]{}—=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const SCRAMBLE_TICK = 30;
const SCRAMBLE_DURATION = 1200;

function scrambleInto(el: HTMLElement, text: string): () => void {
  const render = (revealed: number) => {
    let out = '';
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (ch === ' ') { out += ' '; continue; }
      out += i < revealed ? ch : SCRAMBLE_GLYPHS[(Math.random() * SCRAMBLE_GLYPHS.length) | 0];
    }
    el.textContent = out;
  };
  let elapsed = 0;
  render(0);
  const id = window.setInterval(() => {
    elapsed += SCRAMBLE_TICK;
    if (elapsed >= SCRAMBLE_DURATION) {
      el.textContent = text;
      window.clearInterval(id);
      return;
    }
    const progress = elapsed / SCRAMBLE_DURATION;
    render(Math.floor(progress * text.length));
  }, SCRAMBLE_TICK);
  return () => {
    window.clearInterval(id);
    el.textContent = text;
  };
}

export function AnimatedQuote({
  children,
  className,
  style,
  scramble = false,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  scramble?: boolean;
}) {
  const ref = useRef<HTMLQuoteElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    const borderEl = borderRef.current;
    const textEl = textRef.current;
    if (!el || !borderEl || !textEl) return;

    // Capture the final text once at mount so the scramble has a target
    // to settle on. `textContent` is used instead of grabbing `children`
    // directly because children can be a string node — same effect, but
    // works whether the caller passes a plain string or a ReactNode.
    const finalText = scramble ? (textEl.textContent ?? '') : '';
    let cancelScramble: (() => void) | undefined;

    const ctx = gsap.context(() => {
      gsap.set(borderEl, { scaleY: 0, transformOrigin: 'top center' });
      if (scramble) {
        // Hide the text completely until the scramble kicks in — gives
        // the border slide-in a clean entrance with no pre-flash of
        // the final quote.
        gsap.set(textEl, { autoAlpha: 0 });
      } else {
        gsap.set(textEl, { opacity: 0 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
      tl.to(borderEl, { scaleY: 1, duration: 0.4, ease: 'power2.out' });
      if (scramble) {
        // Reveal the (still-invisible) text container instantly, then
        // start the glyph scramble so the user sees random characters
        // rapidly settling into the real quote.
        tl.set(textEl, { autoAlpha: 1 });
        tl.call(() => {
          cancelScramble = scrambleInto(textEl, finalText);
        });
      } else {
        tl.to(textEl, { opacity: 1, duration: 0.3, ease: 'power2.out' });
      }
    });

    return () => {
      cancelScramble?.();
      ctx.revert();
    };
  }, [scramble]);

  return (
    <blockquote
      ref={ref}
      className={className}
      style={{ position: 'relative', paddingLeft: '24px', ...style }}
    >
      <div
        ref={borderRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 0,
          top: '4px',
          bottom: '4px',
          width: '3px',
          backgroundColor: 'var(--accent-color, #2E9461)',
          willChange: 'transform',
          transformOrigin: 'top center',
        }}
      />
      <div ref={textRef} style={{ willChange: 'opacity' }}>
        {children}
      </div>
    </blockquote>
  );
}

// ─── BeforeAfter ─────────────────────────────────────────────────────────────
// Static side-by-side before/after comparison. Both images render at full
// opacity at the same time so they can be compared directly. The grid layout
// and responsive stacking (side-by-side on desktop, stacked on mobile) come
// from the `style`/`className` passed by the call site.
export function BeforeAfter({
  before,
  after,
  className,
  style,
}: {
  before: ReactNode;
  after: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={className} style={style}>
      <div>{before}</div>
      <div>{after}</div>
    </div>
  );
}

// ─── FadeIn ──────────────────────────────────────────────────────────────────
// Simple opacity reveal with scroll trigger
export function FadeIn({
  children,
  delay = 0,
  className,
  style,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.85, ease, delay }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// ─── Stagger variants ────────────────────────────────────────────────────────
// Use with motion.ul / motion.div as container + StaggerItem as children
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.05,
    },
  },
};

export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// ─── AnimatedLine ─────────────────────────────────────────────────────────────
// Grows from left to right — used in section labels
export function AnimatedLine({ color = '#2A2A2A' }: { color?: string }) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        flex: 1,
        height: '1px',
        backgroundColor: color,
        transformOrigin: 'left',
        willChange: 'transform',
      }}
    />
  );
}

// ─── Project card hover variants ─────────────────────────────────────────────
export const cardVariants: Variants = {
  rest: {},
  hover: {},
};

export const imgScaleVariants: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.04 },
};

export const overlayVariants: Variants = {
  rest: { opacity: 0 },
  hover: { opacity: 1, transition: { duration: 0.28 } },
};

export const overlayCTAVariants: Variants = {
  rest: { y: 18, opacity: 0 },
  hover: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.38, delay: 0.06, ease: [0.16, 1, 0.3, 1] },
  },
};
