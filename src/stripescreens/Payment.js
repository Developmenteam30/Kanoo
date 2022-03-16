import React, {useState} from 'react';
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
  ActivityIndicator,
} from 'react-native';
import styles from '../styles/PaymentStyle';
import stripe from 'react-native-stripe-payments';

const Payment = props => {
  const [loader, setloader] = useState(false);
  const [card, setcard] = useState();
  const [expMonth, setexpMonth] = useState();
  const [expYear, setexpYear] = useState();
  const [cvc, setcvc] = useState();

  const valid = async () => {
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
            props.navigation.navigate('Success');
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
  };
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
            <View style={styles.detail1}>
              <View>
                <Text style={styles.text_money}>$ {global.amount}</Text>
              </View>
              <Text style={[styles.text_footer, {top: 0}]}>Credit Card</Text>
              <View style={styles.detail}>
                <TextInput
                  placeholder="Place Holder"
                  style={styles.textinput}
                  onChangeText={setcard}
                  value={card}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.seperate}>
                <View style={{width: '48%'}}>
                  <Text style={styles.text_footer}>Exp. Month</Text>
                  <TextInput
                    placeholder="MM"
                    style={styles.textsep}
                    onChangeText={setexpMonth}
                    value={expMonth}
                    keyboardType="numeric"
                  />
                </View>
                <View style={{width: '48%', marginLeft: 15}}>
                  <Text style={styles.text_footer}>Exp. Year</Text>
                  <TextInput
                    placeholder="YY"
                    style={styles.textsep}
                    onChangeText={setexpYear}
                    value={expYear}
                    keyboardType="numeric"
                  />
                </View>
              </View>
              <Text style={[styles.text_footer, {top: 0}]}>CVC</Text>
              <View style={styles.detail}>
                <TextInput
                  placeholder="Place Holder"
                  style={styles.textinput}
                  onChangeText={setcvc}
                  value={cvc}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.pay}>
                {loader ? (
                  <ActivityIndicator size="large" color="#00ff00" />
                ) : (
                  <TouchableOpacity
                    onPress={() => valid()}
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
                      Pay
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </View>
  );
};

export default Payment;
