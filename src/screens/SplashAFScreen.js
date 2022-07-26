import React, {useEffect} from 'react';
import {Image, SafeAreaView, Text} from 'react-native';
import styles from '../styles/SplashScreenStyle';
import { Images } from '../utils/Images';

const SplashAFScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('HomeScreen');
    }, 2000);
  }, []);
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Image source={Images.logo} style={styles.logoStyle} />
      <Image source={Images.logotext} style={styles.logotextStyle} />
    </SafeAreaView>
  );
};
export default SplashAFScreen;
