import React, {useEffect} from 'react';
import {Image, SafeAreaView, Text} from 'react-native';
import styles from '../styles/SplashScreenStyle';

const SplashAFScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('WelcomeScreen');
    }, 3000);
  }, []);
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Image source={require('../assets/logo.png')} style={styles.logoStyle} />
      <Text style={styles.logofont}>America</Text>
      <Text style={styles.logofont}>Foundation</Text>
    </SafeAreaView>
  );
};
export default SplashAFScreen;
