import { useRef, type CSSProperties } from 'react';
import { Outlet, createBrowserRouter, useLocation, useNavigate } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import gsap from 'gsap';
import nlMonogram from '../imports/NL monogram.svg';
import { RouteTransitionContext } from './routeTransition';
import { HomePage } from './pages/HomePage';
import { TripSyncPage } from './pages/TripSyncPage';
import { LumisPage } from './pages/LumisPage';
import { NeighbourLahPage } from './pages/NeighbourLahPage';
import { AXSPage } from './pages/AXSPage';

function PageTransitionLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  // First render of the layout: start at opacity 1 (no entry fade) so the
  // very first page load doesn't fade in. Subsequent navigations: AnimatePresence
  // runs exit (0.2s) then enter (0.3s) for a clean crossfade.
  // Inner mount-time animations (e.g. the hero NL watermark) use GSAP rather
  // than framer-motion `initial`/`animate`, so AnimatePresence's PresenceContext
  // doesn't suppress them.
  const firstRender = useRef(true);
  const isFirst = firstRender.current;
  firstRender.current = false;

  // Full-screen loader shown when navigating into a case study from the
  // homepage: a centred spinner holds for ~0.7s, then we navigate and fade
  // the overlay out to reveal the new page.
  const overlayRef = useRef<HTMLDivElement>(null);

  const startTransition = (path: string) => {
    const overlay = overlayRef.current;
    if (!overlay) {
      navigate(path);
      return;
    }
    const wrap = overlay.querySelector<HTMLDivElement>('.nl-reveal-wrap');
    gsap.killTweensOf(overlay);

    overlay.style.display = 'flex';
    // Reset: overlay hidden, monogram fully masked out (gradient feather sits
    // off the left edge so nothing shows yet).
    wrap?.style.setProperty('--reveal', '0px');

    // The soft gradient sweeps from x = -FEATHER to x = WIDTH + FEATHER so the
    // ~35px feathered edge clears the right side and the monogram ends fully solid.
    const WIDTH = 73;
    const FEATHER = 35;
    const sweep = { p: 0 };

    const tl = gsap.timeline();
    tl.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: 'power1.out' });
    // Handwriting-style materialise: a feathered gradient mask wipes left→right
    // so the letters fade in progressively rather than being sliced.
    tl.to(
      sweep,
      {
        p: WIDTH + FEATHER,
        duration: 1.2,
        ease: 'power2.inOut',
        onUpdate: () => wrap?.style.setProperty('--reveal', `${sweep.p}px`),
      },
      0.05
    );
    // Hold the finished monogram briefly, then navigate and fade out.
    tl.to({}, { duration: 0.2 });
    tl.add(() => navigate(path));
    tl.to(
      overlay,
      {
        opacity: 0,
        duration: 0.3,
        ease: 'power1.out',
        onComplete: () => {
          overlay.style.display = 'none';
        },
      },
      '+=0.05'
    );
  };

  return (
    <RouteTransitionContext.Provider value={{ startTransition }}>
      <div
        ref={overlayRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          display: 'none',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0D0D0D',
          opacity: 0,
          zIndex: 9999,
        }}
      >
        {/* Thin arc that orbits the monogram for the duration of the overlay.
            Absolutely centred so it doesn't disturb the flex-centred monogram;
            the dash pattern exposes ~28% of the circle and the stroke spins
            about its own centre via the .nl-orbit-arc keyframe. */}
        <svg
          className="nl-orbit"
          width="96"
          height="96"
          viewBox="0 0 96 96"
          fill="none"
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-48px',
            marginLeft: '-48px',
            opacity: 0.65,
            pointerEvents: 'none',
          }}
        >
          <circle
            className="nl-orbit-arc"
            cx="48"
            cy="48"
            r="46"
            stroke="#EBEBE5"
            strokeWidth="1.5"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray="0.28 0.72"
          />
        </svg>
        {/* The real Figma NL monogram materialises through a soft feathered
            gradient that sweeps left→right, so the letters appear to be written
            on rather than sliced by a hard edge.
            Outer wrap = animated feather mask; inner div = monogram-shaped mask.
            CSS masks compound down the tree, so the visible pixels are the
            intersection: the monogram shape, revealed progressively. */}
        <div
          className="nl-reveal-wrap"
          aria-hidden="true"
          style={
            {
              position: 'relative',
              width: '73px',
              height: '79px',
              '--reveal': '0px',
              WebkitMaskImage:
                'linear-gradient(to right, #000 calc(var(--reveal) - 35px), transparent var(--reveal))',
              maskImage:
                'linear-gradient(to right, #000 calc(var(--reveal) - 35px), transparent var(--reveal))',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
            } as CSSProperties
          }
        >
          <div
            className="nl-monogram-reveal"
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: '#EBEBE5',
              WebkitMaskImage: `url("${nlMonogram}")`,
              maskImage: `url("${nlMonogram}")`,
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
              maskPosition: 'center',
              WebkitMaskSize: 'contain',
              maskSize: 'contain',
            }}
          />
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={isFirst ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } }}
          exit={{ opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } }}
          style={{ minHeight: '100vh' }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </RouteTransitionContext.Provider>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    Component: PageTransitionLayout,
    children: [
      { index: true, Component: HomePage },
      { path: 'tripsync', Component: TripSyncPage },
      { path: 'lumis', Component: LumisPage },
      { path: 'neighbourlah', Component: NeighbourLahPage },
      { path: 'axs', Component: AXSPage },
    ],
  },
]);
