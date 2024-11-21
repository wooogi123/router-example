import { BrowserRouter } from '@router-example/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { routes } from './routes.tsx';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter routes={routes} window={window} />
  </StrictMode>,
);
