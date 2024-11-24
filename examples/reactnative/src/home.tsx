import { StyleSheet, View, Text } from 'react-native';

import { Navigation } from './navigation.tsx';

export const Home = () => {
  return (
    <View style={styles.box}>
      <Navigation />
      <Text>Home</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
});
