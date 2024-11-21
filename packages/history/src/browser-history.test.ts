/**
 * @vitest-environment happy-dom
 */

import { Window } from 'happy-dom';
import { it, expect, beforeEach } from 'vitest';

import { createBrowserHistory } from './index.ts';

let window: Window;

beforeEach(() => {
  window = new Window({
    url: 'https://example.com',
  });
  window.history.replaceState({}, '', '/');
});

it('initial properties', () => {
  const history = createBrowserHistory({
    window,
  });

  expect(history.stack.length).toBe(1);
  expect(history.location).toBe('/');
});

it('initial properties without index endpoint', () => {
  window.history.replaceState({}, '', '/about');
  const history = createBrowserHistory({
    window,
  });

  expect(history.stack.length).toBe(1);
  expect(history.location).toBe('/about');
});

it('push to new location', () => {
  const history = createBrowserHistory({
    window,
  });
  history.push('/home');

  expect(history.stack.length).toBe(2);
  expect(history.location).toBe('/home');
});

it('replace to new location', () => {
  const history = createBrowserHistory({
    window,
  });
  history.push('/about');
  history.push('/home');

  history.replace('/main');
  expect(history.stack.length).toBe(3);
  expect(history.location).toBe('/main');
});

it('go backward', () => {
  const history = createBrowserHistory({
    window,
  });
  history.push('/about');
  history.push('/home');

  expect(history.location).toBe('/home');
  history.go(-1);
  expect(history.location).toBe('/about');
});

it('go backward with delta', () => {
  const history = createBrowserHistory({
    window,
  });
  history.push('/about');
  history.push('/home');

  expect(history.location).toBe('/home');
  history.go(-2);
  expect(history.location).toBe('/');
});

it('go forward', () => {
  const history = createBrowserHistory({
    window,
  });
  history.push('/about');
  history.go(-1);

  expect(history.location).toBe('/');
  history.go(1);
  expect(history.location).toBe('/about');
});

it('go forward with delta', () => {
  const history = createBrowserHistory({
    window,
  });
  history.push('/about');
  history.push('/home');
  history.go(-2);

  expect(history.location).toBe('/');
  history.go(2);
  expect(history.location).toBe('/home');
});

it('call listener after changes', async () => {
  const history = createBrowserHistory({
    window,
  });

  const promise = new Promise((resolve) => {
    const unsub = history.addListener((event) => {
      resolve(event);
      unsub();
    });
  });

  history.push('/home');

  const changeEvent = await promise;
  expect(changeEvent).toStrictEqual({
    action: 'push',
    location: '/home',
    delta: 1,
  });
});
