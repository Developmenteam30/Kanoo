import React, {useEffect, useState} from 'react';
import {Image, ImageBackground, SafeAreaView, Text, KeyboardAvoidingView, Platform, View, ScrollView, TouchableOpacity, Alert} from 'react-native';
import { Divider, Input } from 'react-native-elements';
import styles from '../styles/LoginScreenStyle';
import { Images } from '../utils/Images';
import { colors } from '../utils/Variables';
import api from "../utils/Api";
import { connect } from "react-redux";

const MyAddressAddScreen = (props) => {
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : -100
    const [firstname, setfirstname] = useState(null);
    const [lastname, setlastname] = useState(null);
    const [apartment, setapartment] = useState(null);
    const [street, setstreet] = useState(null);
    const [city, setcity] = useState(null);
    const [state, setstate] = useState(null);
    const [country, setcountry] = useState(null);
    const [zip_code, setzip_code] = useState(null);
    const addaddress = async () => {
        var data = {
            first_name : firstname,
            last_name: lastname,
            company_name: firstname+' '+lastname,
            apartment : apartment,
            street : street,
            city : city,
            state : state,
            country : country,
            zip_code : zip_code,
        }
        var cate = await api.postapi(data, "addaddress");
        if (cate && cate.status == '1') {
            Alert.alert('Added successfully.');
            props.navigation.goBack();
        } else {
        console.log(cate);
        }
    };

  useEffect(() => {
    return ()=>{}
  }, [])

    return (
      <SafeAreaView style={[styles.mainContainer, {backgroundColor: colors.light}]}>
        <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>
              <ScrollView style={[styles.Modelscrollwidth, {padding: 15, backgroundColor: colors.light}]} showsVerticalScrollIndicator={false}>
                    <View style={styles.form}>
                        <Text style={styles.label}>First name</Text>
                        <Input
                            placeholder='enter first Name'
                            containerStyle={styles.inputcontainerstyle}
                            inputContainerStyle={styles.inputstyle}
                            onChangeText={text => setfirstname(text)}
                            value={firstname}
                        />
                        <Text style={styles.label}>Last name</Text>
                        <Input
                            placeholder='enter last name'
                            containerStyle={styles.inputcontainerstyle}
                            inputContainerStyle={styles.inputstyle}
                            onChangeText={text => setlastname(text)}
                            value={lastname}
                        />
                        <Text style={styles.label}>Apartment</Text>
                        <Input
                            placeholder='enter apartment'
                            containerStyle={styles.inputcontainerstyle}
                            inputContainerStyle={styles.inputstyle}
                            onChangeText={text => setapartment(text)}
                            value={apartment}
                        />
                        <Text style={styles.label}>Street</Text>
                        <Input
                            placeholder='enter address'
                            containerStyle={styles.inputcontainerstyle}
                            inputContainerStyle={styles.inputstyle}
                            onChangeText={text => setstreet(text)}
                            value={street}
                        />
                        <Text style={styles.label}>Town / City</Text>
                        <Input
                            placeholder='enter city'
                            containerStyle={styles.inputcontainerstyle}
                            inputContainerStyle={styles.inputstyle}
                            onChangeText={text => setcity(text)}
                            value={city}
                        />
                        <Text style={styles.label}>Emirate</Text>
                        <Input
                            placeholder='enter emirate'
                            containerStyle={styles.inputcontainerstyle}
                            inputContainerStyle={styles.inputstyle}
                            onChangeText={text => setstate(text)}
                            value={state}
                        />
                        <Text style={styles.label}>Country</Text>
                        <Input
                            placeholder='enter state'
                            containerStyle={styles.inputcontainerstyle}
                            inputContainerStyle={styles.inputstyle}
                            onChangeText={text => setcountry(text)}
                            value={country}
                        />
                        <Text style={styles.label}>Postalcode / ZIP</Text>
                        <Input
                            placeholder='enter postalcode'
                            containerStyle={styles.inputcontainerstyle}
                            inputContainerStyle={styles.inputstyle}
                            onChangeText={text => setzip_code(text)}
                            value={zip_code}
                        />

                        <TouchableOpacity style={styles.buttonfull} onPress={() => addaddress()}>
                           <Text style={styles.buttontext}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default MyAddressAddScreen;
