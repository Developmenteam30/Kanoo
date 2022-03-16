import React, {Component, useEffect} from 'react';
import {StyleSheet, Touchable, TouchableOpacity, View} from 'react-native';
import styles from '../styles/SplashScreenStyle';
import Svg, {Path} from 'react-native-svg';
import BarsStatusBarIPhoneDark from '../components/BarsStatusBarIPhoneDark';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Home');
    }, 1000);
  });

  return (
    <View style={styles.container}>
      <View style={styles.rectangleStack}>
        <View style={styles.rectangle}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <View style={styles.icon}>
              <View style={styles.background}>
                <Svg viewBox="0 0 57.94 85.61" style={styles.shapePath}>
                  <Path
                    strokeWidth={0}
                    fill="rgba(46,231,62,1)"
                    d="M57.94 28.97 C57.94 36.45 51.04 48.40 51.04 48.40 L40.44 68.26 L31.15 84.36 C31.15 84.36 29.87 85.61 28.97 85.61 C28.08 85.61 26.80 84.36 26.80 84.36 L17.50 68.26 L6.48 48.40 C6.48 48.40 0.00 36.45 0.00 28.97 C0.00 12.97 12.97 0.00 28.97 0.00 C44.97 0.00 57.94 12.97 57.94 28.97 Z M8.16 23.96 C8.16 23.96 28.47 11.92 49.67 25.40 C49.67 25.40 45.54 7.61 28.94 7.61 C12.35 7.61 8.16 23.96 8.16 23.96 Z M7.94 33.46 C7.94 33.46 9.27 47.22 24.18 49.79 C24.18 49.79 27.16 32.97 7.94 33.46 Z M31.74 34.01 C31.74 34.01 32.88 33.15 33.23 32.53 C35.99 27.60 30.96 22.57 26.02 25.32 C25.40 25.67 24.88 26.19 24.53 26.81 C21.78 31.75 31.74 34.02 31.74 34.02 Z M50.00 33.46 C30.79 32.97 33.77 49.79 33.77 49.79 C48.67 47.22 50.01 33.46 50.00 33.46 Z"></Path>
                </Svg>
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.mainLogo}>
            <View style={styles.background1}>
              <View style={styles.shape3Row}></View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
export default Splash;
