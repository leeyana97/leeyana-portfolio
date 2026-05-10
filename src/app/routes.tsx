import { createBrowserRouter } from 'react-router';
import { HomePage } from './pages/HomePage';
import { TripSyncPage } from './pages/TripSyncPage';
import { LumisPage } from './pages/LumisPage';
import { NeighbourLahPage } from './pages/NeighbourLahPage';
import { AXSPage } from './pages/AXSPage';

export const router = createBrowserRouter([
  { path: '/', Component: HomePage },
  { path: '/tripsync', Component: TripSyncPage },
  { path: '/lumis', Component: LumisPage },
  { path: '/neighbourlah', Component: NeighbourLahPage },
  { path: '/axs', Component: AXSPage },
]);
