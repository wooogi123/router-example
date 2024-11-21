import { Index } from './index.tsx';
import { Home } from './home.tsx';
import { About } from './about.tsx';

import type { Route } from '@router-example/react';

export const routes: Route[] = [
  {
    path: '/',
    Component: Index,
  },
  {
    path: '/home',
    Component: Home,
  },
  {
    path: '/about',
    Component: About,
  },
];
