import React, {useEffect} from 'react';
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
const DetailsScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      //navigation.navigate('Home');
    }, 3000);
  }, []);
  return (
    <SafeAreaView style={styles.mainContainerLeft}>
      <View style={[styles.innercontent, {paddingTop: 15}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/Vector.png')}
            style={styles.backStyle}
          />
        </TouchableOpacity>
        <Text style={styles.heading}>Your Reference Code</Text>
        <Text style={styles.logofonts}>{global.insertedId}</Text>

        <Text style={styles.headingtext}>Receipient</Text>
        <Text style={styles.detailsfonts}>America LLC</Text>

        <Text style={styles.headingtext}>Recipient Address</Text>
        <Text style={styles.detailsfonts}>
          13213 Darwin Lane, Austin TX 78729
        </Text>

        <Text style={styles.headingtext}>Bank Name</Text>
        <Text style={styles.detailsfonts}>JPMorgan Chase Bank</Text>

        <Text style={styles.headingtext}>Bank Address</Text>
        <Text style={styles.detailsfonts}>
          383 Madison Ave, New York, NY 10017
        </Text>

        <Text style={styles.headingtext}>SWIFT</Text>
        <Text style={styles.detailsfonts}>CHASUS33</Text>

        <Text style={styles.headingtext}>US/Domestic Routing Number</Text>
        <Text style={styles.detailsfonts}>21000021</Text>

        <Text style={styles.headingtext}>Account Number</Text>
        <Text style={styles.detailsfonts}>3917966070</Text>

        <View style={{flexDirection: 'row', marginTop: 50}}>
          <TouchableOpacity
            style={{width: '100%'}}
            onPress={() => {
              navigation.navigate('WelcomeScreen');
            }}>
            <LinearGradient
              style={[styles.button, {width: '100%'}]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#229A71', '#33D69E']}>
              <Text style={styles.buttontext}>Home</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default DetailsScreen;
