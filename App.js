import React, { useEffect } from 'react';
import {SafeAreaView, StatusBar, View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';

import MainStack from './src/navigations/MainStack';
import styles from './src/styles/AppStyle';
import {store} from './src/redux/store/store';
import SplashScreen from 'react-native-splash-screen';
global.base_url = "https://web.techinfomatic.com/";

const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styless.statusBar, { backgroundColor }]}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
  </View>
);

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, [])

  return (
    <View style={styles.mainContainer}>
      <MyStatusBar backgroundColor="#144581" barStyle="light-content" />
      <Provider store={store}>
        <NavigationContainer>
          <MainStack/>
        </NavigationContainer>
      </Provider>
    </View>
  );
};
const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const styless = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  appBar: {
    backgroundColor:'#79B45D',
    height: APPBAR_HEIGHT,
  },
  content: {
    flex: 1,
    backgroundColor: '#33373B',
  },
});

export default App;
