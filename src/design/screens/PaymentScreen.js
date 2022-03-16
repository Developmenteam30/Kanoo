import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
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
import stripe from 'react-native-stripe-payments';

const {width, height} = Dimensions.get('window');
const PaymentScreen = props => {
  const [loader, setloader] = useState(false);
  const [card, setcard] = useState();
  const [expMonth, setexpMonth] = useState();
  const [expYear, setexpYear] = useState();
  const [cvc, setcvc] = useState();

  const valid = async () => {
    if (card && expMonth && expYear && cvc) {
      setloader(true);
      stripe.setOptions({
        publishingKey:
          'pk_test_51IVEgYEPejRluWxLZTE44JGekNDtvmcS236uxdaqri1KEL8lBvzFhALv0WZP6hqmhjEdoWU42FkTL4AtrmhW2XTz00NtjDSgfi',
      });
      var cardDetails = {
        number: card.toString(),
        expMonth: parseInt(expMonth),
        expYear: parseInt(expYear),
        cvc: cvc.toString(),
      };
      const isCardValid = stripe.isCardValid(cardDetails);
      if (isCardValid) {
        cardDetails.amount = global.amount;
        fetch('http://13.233.35.149:3300/', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cardDetails),
        })
          .then(response => response.json())
          .then(json => {
            if (json.data.captured) {
              setloader(false);
              global.transactionId = json.data.id;
              alert('Successfully paid.');
              props.navigation.navigate('WelcomeScreen');
            } else {
              setloader(false);
              alert('Payment not captured due to technical error.');
            }
          })
          .catch(error => {
            setloader(false);
            alert('Payment not captured due to technical error.');
          });
      } else {
        setloader(false);
        alert('Please enter correct card details');
      }
    } else {
      setloader(false);
      alert('Please enter card details');
    }
  };
  return (
    <SafeAreaView style={styles.mainContainerLeft}>
      <View style={[styles.innercontent, {paddingTop: 15}]}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Image
            source={require('../assets/Vector.png')}
            style={styles.backStyle}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            source={require('../assets/amountcard.png')}
            style={styles.mainimageStyle}
          />
        </TouchableOpacity>

        <Text style={styles.inputSpan}>Credit Card Number</Text>
        <View style={styles.searchSections}>
          <TextInput
            style={styles.input}
            placeholder="Credit Card Number"
            placeholderTextColor={'white'}
            onChangeText={setcard}
            value={card}
            underlineColorAndroid="transparent"
            keyboardType="numeric"
          />
        </View>

        <Text style={styles.inputSpan}>Card Expiry Date</Text>
        <View style={{flexDirection: 'row'}}>
          <View
            style={[styles.searchSections, {width: '49%', marginRight: '2%'}]}>
            <TextInput
              style={styles.input}
              placeholder="MM"
              placeholderTextColor={'white'}
              onChangeText={setexpMonth}
              value={expMonth}
              underlineColorAndroid="transparent"
              keyboardType="numeric"
            />
          </View>
          <View style={[styles.searchSections, {width: '49%'}]}>
            <TextInput
              style={styles.input}
              placeholder="YYYY"
              placeholderTextColor={'white'}
              onChangeText={setexpYear}
              value={expYear}
              underlineColorAndroid="transparent"
              keyboardType="numeric"
            />
          </View>
        </View>

        <Text style={styles.inputSpan}>CVV Number</Text>
        <View style={styles.searchSections}>
          <TextInput
            style={styles.input}
            placeholder="CVV"
            placeholderTextColor={'white'}
            onChangeText={setcvc}
            value={cvc}
            underlineColorAndroid="transparent"
            keyboardType="numeric"
          />
        </View>
        <View style={{flexDirection: 'row', marginTop: 50}}>
          {loader ? (
            <View
              style={{
                width: '100%',
                alignSelf: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size="large" color="#00ff00" />
            </View>
          ) : (
            <TouchableOpacity style={{width: '100%'}} onPress={() => valid()}>
              <LinearGradient
                style={[styles.button, {width: '100%'}]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#229A71', '#33D69E']}>
                <Text style={styles.buttontext}>Pay</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};
export default PaymentScreen;
