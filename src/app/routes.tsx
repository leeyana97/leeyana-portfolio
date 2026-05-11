import { useRef } from 'react';
import { Outlet, createBrowserRouter, useLocation } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import { HomePage } from './pages/HomePage';
import { TripSyncPage } from './pages/TripSyncPage';
import { LumisPage } from './pages/LumisPage';
import { NeighbourLahPage } from './pages/NeighbourLahPage';
import { AXSPage } from './pages/AXSPage';

function PageTransitionLayout() {
  const location = useLocation();
  // First render of the layout: start at opacity 1 (no entry fade) so the
  // very first page load doesn't fade in. Subsequent navigations: AnimatePresence
  // runs exit (0.2s) then enter (0.25s) for a clean crossfade.
  // Inner mount-time animations (e.g. the hero NL watermark) use GSAP rather
  // than framer-motion `initial`/`animate`, so AnimatePresence's PresenceContext
  // doesn't suppress them.
  const firstRender = useRef(true);
  const isFirst = firstRender.current;
  firstRender.current = false;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={isFirst ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.25, ease: 'easeOut' } }}
        exit={{ opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } }}
        style={{ minHeight: '100vh' }}
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
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
