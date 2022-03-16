import React, {Component, useState} from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import styles from '../styles/HomeScreenStyle';
import Svg, {Path} from 'react-native-svg';
import {ScrollView} from 'react-native-gesture-handler';

function HomeScreen(props) {
  const [amount, setamount] = useState(0);

  return (
    <View style={styles.container}>
      <ScrollView>
        <KeyboardAvoidingView
          behavior="position"
          style={{backgroundColor: 'white', flex: 1}}>
          <View style={styles.mapAll2}>
            <View style={styles.ellipseStack}>
              <Text style={styles.welcometext}>
                Welcome to{' '}
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 40,
                    color: 'blue',
                  }}>
                  America Foundation
                </Text>
              </Text>
            </View>
            <View style={styles.rectangleStack}>
              <View style={styles.detail}>
                <TextInput
                  placeholder="Amount"
                  style={styles.textinput}
                  onChangeText={setamount}
                  value={amount}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.group}>
                <TouchableOpacity
                  style={styles.rectangle}
                  onPress={() => {
                    if (amount > 0) {
                      global.amount = amount;
                      props.navigation.navigate('Payment');
                    } else {
                      alert('Please enter correct amount.');
                    }
                  }}>
                  <Text style={styles.conduiteLibre}>Stripe</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.rectangle2}
                  onPress={() => props.navigation.navigate('Personal')}>
                  <Text style={styles.itineraires}>Bank</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}
export default HomeScreen;
