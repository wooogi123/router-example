import { createBrowserHistory } from '@router-example/history';
import { createRouter } from '@router-example/vue';

import Index from './Index.vue';
import Home from './Home.vue';
import About from './About.vue';

import type { Route } from '@router-example/vue';

const routes: Route[] = [
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

const history = createBrowserHistory();

export const router = createRouter({
  routes,
  history,
});
