import { useRef } from 'react';
import { Outlet, createBrowserRouter, useLocation, useNavigate } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import gsap from 'gsap';
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
    gsap.killTweensOf(overlay);
    overlay.style.display = 'flex';
    gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: 'power1.out' });
    window.setTimeout(() => {
      navigate(path);
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.35,
        delay: 0.05,
        ease: 'power1.out',
        onComplete: () => {
          overlay.style.display = 'none';
        },
      });
    }, 700);
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
        <div className="route-spinner" />
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
