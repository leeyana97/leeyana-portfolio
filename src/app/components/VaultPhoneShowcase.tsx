import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import './VaultPhoneShowcase.css';

// Dense, layered phone showcase rebuilt in code so every phone screen renders at
// the SAME size (one shared transform per card — no perspective fan that would
// shrink far phones). Three staggered diagonal bands fill the dark cinematic
// strip; the field runs past the right edge so it stays filled.
const phoneScreens = [
  'https://res.cloudinary.com/dvunn40le/image/upload/Screenshot_2026-05-20_at_11.37.40_AM_rdm0zh.png',
  'https://res.cloudinary.com/dvunn40le/image/upload/Screenshot_2026-06-17_at_3.46.37_PM_pl0jii.png',
  'https://res.cloudinary.com/dvunn40le/image/upload/Screenshot_2026-06-17_at_3.46.51_PM_o3jl0w.png',
  'https://res.cloudinary.com/dvunn40le/image/upload/Screenshot_2026-06-17_at_3.47.09_PM_djpm0m.png',
  'https://res.cloudinary.com/dvunn40le/image/upload/Screenshot_2026-06-17_at_3.48.21_PM_zchbrc.png',
  'https://res.cloudinary.com/dvunn40le/image/upload/Screenshot_2026-06-17_at_3.50.31_PM_k198g5.png',
  'https://res.cloudinary.com/dvunn40le/image/upload/Screenshot_2026-06-17_at_3.50.45_PM_pfihjm.png',
  'https://res.cloudinary.com/dvunn40le/image/upload/Screenshot_2026-06-17_at_3.50.53_PM_m99qjq.png',
];

type PhonePlacement = { screenIndex: number; x: number; y: number; row: number };

// Exactly TWO rows, with spacing wider than a card's footprint so phones never
// overlap — not side-to-side, and not row-to-row (a clear dark gap sits between
// the rows). Uniform spacing, uniform card size, like the reference.
const STEP = 198; // horizontal distance between cards in a row (tight — phones sit close)
const COLS = 11; // enough columns to overflow the widest content area
const BANDS = [
  { y: -100, offset: 0 }, // top row, cropped at the top
  { y: 274, offset: STEP / 2 }, // bottom row, cropped at the bottom — small gap between rows
];

const phoneLayout: PhonePlacement[] = BANDS.flatMap((band, r) =>
  Array.from({ length: COLS }, (_, i) => ({
    screenIndex: (i * 3 + r * 2) % phoneScreens.length, // scatter the screens
    x: -100 + band.offset + i * STEP,
    y: band.y,
    row: r, // 0 = top row (floats down), 1 = bottom row (floats up)
  })),
);

export function VaultPhoneShowcase() {
  // Trigger all cards together when the strip scrolls into view — a per-card
  // whileInView would skip the cards positioned past the right edge.
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div className="vault-phone-showcase">
      <div className="vault-phone-collage" ref={ref}>
        {phoneLayout.map((phone, index) => (
          <motion.div
            key={index}
            className="vault-phone-card"
            // rotate is handed to motion so it composes with the animated y and
            // stays a crisp 2D transform (no perspective blur).
            style={{ left: `${phone.x}px`, top: `${phone.y}px`, rotate: 12 }}
            initial={{ y: phone.row === 0 ? -170 : 170, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : undefined}
            transition={{ duration: 0.9, delay: 0.035 * (index % COLS), ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="vp-btn vp-btn-action" aria-hidden="true" />
            <span className="vp-btn vp-btn-volup" aria-hidden="true" />
            <span className="vp-btn vp-btn-voldown" aria-hidden="true" />
            <span className="vp-btn vp-btn-power" aria-hidden="true" />
            <img
              src={phoneScreens[phone.screenIndex]}
              alt=""
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
