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
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
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
    <div ref={ref} className={className} style={{ willChange: 'transform, opacity', ...style }}>
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
export function AnimatedQuote({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLQuoteElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    const borderEl = borderRef.current;
    const textEl = textRef.current;
    if (!el || !borderEl || !textEl) return;

    const ctx = gsap.context(() => {
      gsap.set(borderEl, { scaleY: 0, transformOrigin: 'top center' });
      gsap.set(textEl, { opacity: 0 });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
      tl.to(borderEl, { scaleY: 1, duration: 0.4, ease: 'power2.out' });
      tl.to(textEl, { opacity: 1, duration: 0.3, ease: 'power2.out' });
    });

    return () => ctx.revert();
  }, []);

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
          backgroundColor: '#2E9461',
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
// Side-by-side before/after comparison. As the user scrolls through the block,
// the "before" image fades from opacity 1 → 0.3 and the "after" image fades
// from 0 → 1 — both scrubbed to scroll progress. On mobile (<768px), the
// effect is skipped and both images render at full opacity.
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
  const ref = useRef<HTMLDivElement>(null);
  const beforeRef = useRef<HTMLDivElement>(null);
  const afterRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (window.innerWidth < 768) return; // mobile: static, both at full opacity
    const el = ref.current;
    const beforeEl = beforeRef.current;
    const afterEl = afterRef.current;
    if (!el || !beforeEl || !afterEl) return;

    const ctx = gsap.context(() => {
      gsap.set(beforeEl, { opacity: 1 });
      gsap.set(afterEl, { opacity: 0 });
      gsap.to(beforeEl, {
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: true,
        },
      });
      gsap.to(afterEl, {
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={className} style={style}>
      <div ref={beforeRef} style={{ willChange: 'opacity' }}>{before}</div>
      <div ref={afterRef} style={{ willChange: 'opacity' }}>{after}</div>
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
