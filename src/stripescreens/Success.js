import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import styles from '../styles/SuccesStyle';

const Success = props => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
          <Image
            source={require('../assets/images/back-icon.png')}
            style={styles.headerIconStyle}
          />
        </TouchableOpacity>
        <Text style={styles.headerTextStyle}></Text>
      </View>
      <ScrollView>
        <View style={styles.footer}>
          <Image
            source={require('../assets/images/success.png')}
            style={styles.footerIconStyle}
          />
          <Text style={styles.cont}>
            Transaction id is: {global.transactionId}
          </Text>
          <Text style={styles.cont}>Thank you for your payment.</Text>
          <View style={styles.pay}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Home')}
              style={[
                styles.signIn,
                {
                  borderColor: '#2EE73E',
                  backgroundColor: '#2EE73E',
                },
              ]}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: '#f2f2f2',
                    textAlign: 'center',
                    fontSize: 25,
                  },
                ]}>
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Success;
