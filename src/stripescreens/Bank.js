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

const Bank = props => {
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
          <Text style={styles.cont}>Your Reference code is: 1245</Text>
          <Text style={styles.contss}>Receipient: America LLC</Text>
          <Text style={styles.contss}>
            Recipient Address: 13213 Darwin Lane, Austin TX 78729
          </Text>
          <Text style={styles.contss}>Bank Name: JPMorgan Chase Bank</Text>
          <Text style={styles.contss}>
            Bank Address: 383 Madison Ave, New York, NY 10017
          </Text>
          <Text style={styles.contss}>SWIFT: CHASUS33</Text>
          <Text style={styles.contss}>
            US/Domestic routing number: 021000021
          </Text>
          <Text style={styles.contss}>Account number: 3917966070</Text>
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
                Home
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Bank;
