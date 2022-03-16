import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import styles from '../styles/PaymentStyle';

const Personal = props => {
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
      <View style={styles.footer}>
        <ScrollView>
          <KeyboardAvoidingView
            behavior="position"
            style={{backgroundColor: 'rgba(9,24,43,1)', flex: 1}}>
            <View style={styles.detail12}>
              <View></View>
              <Text style={[styles.text_footer, {top: 0}]}>Name</Text>
              <View style={styles.detail}>
                <TextInput placeholder="Name" style={styles.textinput} />
              </View>
              <Text style={[styles.text_footer, {top: 0}]}>Email</Text>
              <View style={styles.detail}>
                <TextInput
                  placeholder="Place Holder"
                  style={styles.textinput}
                />
              </View>
              <View style={styles.pay}>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('Bank')}
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
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </View>
  );
};

export default Personal;
