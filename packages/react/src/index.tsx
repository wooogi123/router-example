import { createContext, useContext, useRef, useSyncExternalStore } from 'react';

import type { History, To } from '@router-example/history';
import type { ReactNode, MouseEventHandler, HTMLAttributes } from 'react';

const HistoryContext = createContext<History | null>(null);

export const useHistory = () => {
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
  history: History;
}

export const Router = ({ routes, history: _history }: RouterProps) => {
  const history = useRef<History>(_history);

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
