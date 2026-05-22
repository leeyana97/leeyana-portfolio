import { createContext, useContext } from 'react';

export interface RouteTransition {
  /**
   * Show the full-screen route-transition loader, then navigate to `path`.
   * Falls back to an immediate navigate if no provider is mounted.
   */
  startTransition: (path: string) => void;
}

export const RouteTransitionContext = createContext<RouteTransition>({
  startTransition: () => {},
});

export const useRouteTransition = () => useContext(RouteTransitionContext);
