import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import SliderVideo from './components/SliderVideo';

const App = () => {
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <SafeAreaView style={styles.container}>
        <SliderVideo />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
