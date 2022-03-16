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
const PersonalScreen = ({navigation}) => {
  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [loader, setloader] = useState(false);

  const valid = async () => {
    if (name && email) {
      setloader(true);
      fetch('http://13.233.35.149:3300/adduser', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: name, email: email}),
      })
        .then(response => response.json())
        .then(json => {
          setloader(false);
          console.log(json.data.insertedId);
          global.insertedId = json.data.insertedId;
          navigation.navigate('DetailsScreen');
        })
        .catch(error => {
          setloader(false);
          alert('Network issue try later.');
        });
    } else {
      setloader(false);
      alert('Please enter your detials first');
    }
  };
  return (
    <SafeAreaView style={styles.mainContainerLeft}>
      <View style={[styles.innercontent, {paddingTop: 15}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/Vector.png')}
            style={styles.backStyle}
          />
        </TouchableOpacity>
        <Text style={styles.heading}>Personal Information</Text>
        <Text style={styles.inputSpan}>Name</Text>
        <View style={styles.searchSection}>
          <Icon
            style={styles.baseIcon}
            type="ionicons"
            name="person"
            size={20}
            color="#fff"
          />
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor={'white'}
            onChangeText={setname}
            value={name}
            underlineColorAndroid="transparent"
          />
        </View>
        <Text style={styles.inputSpan}>Email Address</Text>
        <View style={styles.searchSection}>
          <Icon style={styles.baseIcon} name="email" size={20} color="#fff" />
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor={'white'}
            onChangeText={setemail}
            value={email}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={{flexDirection: 'row', marginTop: 50}}>
          <TouchableOpacity
            style={{width: '100%'}}
            onPress={() => {
              valid();
            }}>
            <LinearGradient
              style={[styles.button, {width: '100%'}]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#229A71', '#33D69E']}>
              <Text style={styles.buttontext}>Next</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default PersonalScreen;
