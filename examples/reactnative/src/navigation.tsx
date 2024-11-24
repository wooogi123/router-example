import { useHistory } from '@router-example/react';
import { StyleSheet, Button, View } from 'react-native';

export const Navigation = () => {
  const history = useHistory();

  return (
    <View style={styles.box}>
      <Button onPress={() => history.push('/')} title={'Index'} />
      <Button onPress={() => history.push('/about')} title={'About'} />
      <Button onPress={() => history.push('/home')} title={'Home'} />
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
  },
});
