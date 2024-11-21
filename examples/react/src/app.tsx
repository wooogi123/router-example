import { createBrowserHistory } from '@router-example/history';
import { Router } from '@router-example/react';

import { routes } from './routes.tsx';

const history = createBrowserHistory();

export const App = () => {
  return <Router routes={routes} history={history} />;
};
