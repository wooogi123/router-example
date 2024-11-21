/**
 * @vitest-environment happy-dom
 */

import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { Window } from 'happy-dom';
import { afterEach, beforeEach, expect, it } from 'vitest';

import { BrowserRouter, Link } from './index.tsx';

import type { Route } from './index.tsx';

const TestNav = () => (
  <nav>
    <Link to={'/index'} data-testid={'index-anchor'}>
      index
    </Link>
    <Link to={'/about'} data-testid={'about-anchor'}>
      about
    </Link>
    <Link to={'/home'} data-testid={'home-anchor'}>
      home
    </Link>
  </nav>
);

const testRoutes: Route[] = [
  {
    path: '/',
    Component() {
      return (
        <div>
          <TestNav />
          <span data-testid='index'>index</span>
        </div>
      );
    },
  },
  {
    path: '/about',
    Component() {
      return (
        <div>
          <TestNav />
          <span data-testid='about'>about</span>
        </div>
      );
    },
  },
  {
    path: '/home',
    Component() {
      return (
        <div>
          <TestNav />
          <span data-testid='home'>home</span>
        </div>
      );
    },
  },
];

let window: Window;

beforeEach(() => {
  window = new Window({
    url: 'https://example.com',
  });
  window.history.replaceState({}, '', '/');
});

afterEach(() => {
  cleanup();
});

it('component successfully rendered', () => {
  render(<BrowserRouter routes={testRoutes} />);

  expect(screen.getByTestId('index')).toBeTruthy();
});

it('navigation change render content', () => {
  render(<BrowserRouter routes={testRoutes} />);

  expect(screen.getByTestId('index')).toBeTruthy();

  fireEvent.click(screen.getByTestId('home-anchor'));
  expect(screen.getByTestId('home')).toBeTruthy();
});
