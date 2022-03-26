import React, { useEffect } from 'react';
import {SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';

import MainStack from './src/navigations/MainStack';
import styles from './src/design/styles/AppStyle';
import {store} from './src/redux/store';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, [])
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Provider store={store}>
        <NavigationContainer>
          <MainStack/>
        </NavigationContainer>
      </Provider>
    </SafeAreaView>
  );
};
export default App;
