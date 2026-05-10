import { motion, type Variants } from 'motion/react';
import { type ReactNode, type CSSProperties } from 'react';

// ─── Easing curves ───────────────────────────────────────────────────────────
export const ease = [0.25, 0.1, 0.25, 1] as const;
export const easeSnap = [0.16, 1, 0.3, 1] as const;

// ─── FadeUp ─────────────────────────────────────────────────────────────────
// Scroll-triggered: fades in from below when entering viewport
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, ease, delay }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
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
