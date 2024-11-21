import {
  createMemoryHistory,
  createBrowserHistory,
} from '@router-example/history';
import { createContext, useContext, useRef, useSyncExternalStore } from 'react';

import type { History, To } from '@router-example/history';
import type { ReactNode, MouseEventHandler, HTMLAttributes } from 'react';

const HistoryContext = createContext<History | null>(null);

const useHistory = () => {
  const context = useContext(HistoryContext);

  if (context === null) {
    throw new Error('useHistory must be called in Router');
  }

  return context;
};

// ---

export interface Route {
  path: string;
  Component: () => ReactNode;
}

interface RouterProps {
  routes: Route[];
}

export const MemoryRouter = ({
  routes,
  initialIndex,
  initialStack,
}: RouterProps & Parameters<typeof createMemoryHistory>[0]) => {
  const history = useRef<History | null>(null);

  if (history.current === null) {
    history.current = createMemoryHistory({
      initialIndex,
      initialStack,
    });
  }

  const currentLocation = useSyncExternalStore(
    history.current!.addListener,
    () => history.current!.location,
    () => history.current!.location,
  );

  const render = routes.find(
    (route) => route.path === currentLocation,
  )?.Component;

  return (
    <HistoryContext.Provider value={history.current}>
      {render?.() ?? null}
    </HistoryContext.Provider>
  );
};

// ---

export const BrowserRouter = ({
  routes,
  window,
}: RouterProps & Parameters<typeof createBrowserHistory>[0]) => {
  const history = useRef<History | null>(null);

  if (history.current === null) {
    history.current = createBrowserHistory({ window });
  }

  const currentLocation = useSyncExternalStore(
    history.current!.addListener,
    () => history.current!.location,
    () => history.current!.location,
  );

  const render = routes.find(
    (route) => route.path === currentLocation,
  )?.Component;

  return (
    <HistoryContext.Provider value={history.current}>
      {render?.() ?? null}
    </HistoryContext.Provider>
  );
};

// ---

interface LinkProps extends HTMLAttributes<HTMLAnchorElement> {
  to: To;
  children?: ReactNode;
}

export const Link = ({ to, children, ...rest }: LinkProps) => {
  const history = useHistory();

  const handleClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();

    history.push(to);
  };

  return (
    <a {...rest} href={to} onClick={handleClick}>
      {children}
    </a>
  );
};
