import { it, expect } from 'vitest';

import { createMemoryHistory } from './index.ts';

it('initial properties', () => {
  const history = createMemoryHistory();

  expect(history.stack.length).toBe(1);
  expect(history.location).toBe('/');
});

it('initial properties with create options', () => {
  let history = createMemoryHistory({
    initialStack: ['/home', '/about'],
  });

  expect(history.stack.length).toBe(2);
  expect(history.location).toBe('/about');

  history = createMemoryHistory({
    initialStack: ['/home', '/about'],
    initialIndex: 0,
  });

  expect(history.location).toBe('/home');
});

it('push to new location', () => {
  const history = createMemoryHistory();
  history.push('/home');

  expect(history.stack.length).toBe(2);
  expect(history.location).toBe('/home');
});

it('replace to new location', () => {
  const history = createMemoryHistory({
    initialStack: ['/', '/about', '/home'],
    initialIndex: 2,
  });

  history.replace('/main');

  expect(history.stack.length).toBe(3);
  expect(history.location).toBe('/main');
});

it('go backward', () => {
  const history = createMemoryHistory({
    initialStack: ['/', '/about', '/home'],
    initialIndex: 2,
  });

  expect(history.location).toBe('/home');
  history.go(-1);
  expect(history.location).toBe('/about');
});

it('go backward with delta', () => {
  const history = createMemoryHistory({
    initialStack: ['/', '/about', '/home'],
    initialIndex: 2,
  });

  expect(history.location).toBe('/home');
  history.go(-2);
  expect(history.location).toBe('/');
});

it('go forward', () => {
  const history = createMemoryHistory({
    initialStack: ['/', '/about', '/home'],
    initialIndex: 0,
  });

  expect(history.location).toBe('/');
  history.go(1);
  expect(history.location).toBe('/about');
});

it('go forward with delta', () => {
  const history = createMemoryHistory({
    initialStack: ['/', '/about', '/home'],
    initialIndex: 0,
  });

  expect(history.location).toBe('/');
  history.go(2);
  expect(history.location).toBe('/home');
});

it('call listener after changes', async () => {
  const history = createMemoryHistory();

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
