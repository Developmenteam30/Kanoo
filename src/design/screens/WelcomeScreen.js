import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../styles/SplashScreenStyle';

const {width, height} = Dimensions.get('window');
const WelcomeScreen = props => {
  const [amount, setamount] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      //navigation.navigate('Home');
    }, 3000);
  }, []);
  return (
    <SafeAreaView style={styles.mainContainerLeft}>
      <View style={[styles.innercontent, {paddingTop: width / 3}]}>
        <Text style={styles.heading}>Welcome to</Text>
        <Text style={styles.logofonts}>America Foundation</Text>
        <Text style={styles.inputSpan}>Enter Amount</Text>
        <View style={styles.searchSection}>
          <Image
            style={{
              width: '15%',
              resizeMode: 'contain',
            }}
            source={require('../assets/dollar.png')}
          />
          <TextInput
            style={styles.input}
            placeholder="0.00"
            placeholderTextColor={'white'}
            onChangeText={setamount}
            value={amount}
            keyboardType="numeric"
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={{flexDirection: 'row', marginTop: 50}}>
          <TouchableOpacity
            style={[
              styles.button,
              {width: '49%', marginRight: '2%', backgroundColor: '#27211E'},
            ]}
            onPress={() => {
              if (amount > 0) {
                global.amount = amount;
                props.navigation.navigate('PaymentScreen');
              } else {
                alert('Please enter correct amount.');
              }
            }}>
            <Text style={styles.buttontext}>Stripe</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{width: '49%'}}
            onPress={() => {
              if (amount > 0) {
                global.amount = amount;
                props.navigation.navigate('PersonalScreen');
              } else {
                alert('Please enter correct amount.');
              }
            }}>
            <LinearGradient
              style={[styles.button, {width: '100%'}]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#229A71', '#33D69E']}>
              <Text style={styles.buttontext}>Bank</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default WelcomeScreen;
