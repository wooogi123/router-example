import { Navigation } from './navigation.tsx';

import type { ReactNode } from 'react';

interface LayoutProps {
  children?: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Navigation />
      {children}
    </div>
  );
};
