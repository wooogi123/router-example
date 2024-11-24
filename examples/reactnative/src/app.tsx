import { createMemoryHistory } from '@router-example/history';
import { Router } from '@router-example/react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';

import { About } from './about.tsx';
import { Home } from './home.tsx';
import { Index } from './index.tsx';

import type { Route } from '@router-example/react';

export const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={'auto'} />
      <Router routes={routes} history={history} />
    </SafeAreaView>
  );
};

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

const history = createMemoryHistory();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
});
