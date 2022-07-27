import React, {useEffect, useState} from 'react';
import {Image, ImageBackground, SafeAreaView, Text, KeyboardAvoidingView, Platform, View, ScrollView, TouchableOpacity, Alert, ActivityIndicator} from 'react-native';
import { BottomSheet, Divider, Input, ListItem } from 'react-native-elements';
import styles from '../styles/LoginScreenStyle';
import { Images } from '../utils/Images';
import { colors } from '../utils/Variables';
import api from "../utils/Api";
import { connect } from "react-redux";
const customData = require('../utils/country.json');

const MyAddressAddScreen = (props) => {
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : -100
    const [loading, setloading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isVisibleE, setIsVisibleE] = useState(false);
    const [countrylist, setcountrylist] = useState([]);
    const [emirateslist, setemirateslist] = useState([]);
    const [id, setid] = useState(null);
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
            state : state ? state : "",
            country : country,
            zip_code : zip_code,
        }
        if (id) {
            data.id = id;
        }
        setloading(true);
        var cate = await api.postapi(data, "addaddress");
        if (cate && cate.status == '1') {
            setloading(false);
            Alert.alert(cate.msg);
            props.navigation.goBack();
        } else {
            setloading(false);
            Alert.alert('Something went wrong try later');
        }
    };
    const setdatafile = (e) => {
        setcountry(e.country);
        var d = [];
        e.states.forEach(e => {
            d.push({
                title: e,
                onPress: () => { setstate(e); setIsVisibleE(false);},
            });
        })
        setemirateslist(d);
        setIsVisible(false);
    }
    useEffect(() => {
        if (props.route.params && props.route.params.address) {
            var address = props.route.params.address;
            var n = address.company_name.split(" ");
            setfirstname(n.length > 0 ? n[0] : "");
            setlastname(n.length > 1 ? n[1] : "");
            setapartment(address.apartment);
            setstreet(address.street);
            setcity(address.city);
            setstate(address.state);
            setcountry(address.country);
            setzip_code(address.zip_code);
            setid(address.id);
        }
        var d = [];
        customData.countries.forEach(e => {
            d.push({
                title: e.country,
                onPress: () => setdatafile(e),
            });
        })
        setcountrylist(d);
        return ()=>{}
    }, [])

    return (
        <SafeAreaView style={[styles.mainContainer, { backgroundColor: colors.light }]}>
            <BottomSheet
                isVisible={isVisible}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}
                >
                {countrylist.map((l, i) => (
                    <ListItem key={i} containerStyle={l.containerStyle} onPress={l.onPress}>
                    <ListItem.Content>
                        <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
                    </ListItem.Content>
                    </ListItem>
                ))}
            </BottomSheet>
            <BottomSheet
                isVisible={isVisibleE}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}
                >
                {emirateslist.map((l, i) => (
                    <ListItem key={i} containerStyle={l.containerStyle} onPress={l.onPress}>
                    <ListItem.Content>
                        <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
                    </ListItem.Content>
                    </ListItem>
                ))}
            </BottomSheet>
            <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>
              <ScrollView style={[styles.Modelscrollwidth, {padding: 15, backgroundColor: colors.light}]} showsVerticalScrollIndicator={false}>
                    <View style={styles.form}>
                        <Text style={styles.label}>First name</Text>
                        <Input
                            placeholder='Enter First Name'
                            containerStyle={styles.inputcontainerstyle}
                            inputContainerStyle={styles.inputstyle}
                            onChangeText={text => setfirstname(text)}
                            value={firstname}
                        />
                        <Text style={styles.label}>Last name</Text>
                        <Input
                            placeholder='Enter Last name'
                            containerStyle={styles.inputcontainerstyle}
                            inputContainerStyle={styles.inputstyle}
                            onChangeText={text => setlastname(text)}
                            value={lastname}
                        />
                        <Text style={styles.label}>Apartment</Text>
                        <Input
                            placeholder='Enter Apartment'
                            containerStyle={styles.inputcontainerstyle}
                            inputContainerStyle={styles.inputstyle}
                            onChangeText={text => setapartment(text)}
                            value={apartment}
                        />
                        <Text style={styles.label}>Street</Text>
                        <Input
                            placeholder='Enter Address'
                            containerStyle={styles.inputcontainerstyle}
                            inputContainerStyle={styles.inputstyle}
                            onChangeText={text => setstreet(text)}
                            value={street}
                        />
                        <Text style={styles.label}>Town / City</Text>
                        <Input
                            placeholder='Enter City'
                            containerStyle={styles.inputcontainerstyle}
                            inputContainerStyle={styles.inputstyle}
                            onChangeText={text => setcity(text)}
                            value={city}
                        />
                        <Text style={styles.label}>Country</Text>
                        <TouchableOpacity
                            onPress={() => setIsVisible(true)}
                        >
                        <Input
                            placeholder='Enter Country'
                            disabled={true}
                            containerStyle={styles.inputcontainerstyle}
                            inputContainerStyle={styles.inputstyle}
                            onChangeText={text => setcountry(text)}
                            value={country}
                        />
                        </TouchableOpacity>
                        {emirateslist.length > 0 ?
                        <TouchableOpacity
                            onPress={() => setIsVisibleE(true)}
                        >
                        <Text style={styles.label}>Emirate</Text>
                        <Input
                            placeholder='Enter Emirate'
                            disabled={true}
                            containerStyle={styles.inputcontainerstyle}
                            inputContainerStyle={styles.inputstyle}
                            onChangeText={text => setstate(text)}
                            value={state}
                        />
                        </TouchableOpacity>
                        : null}
                        <Text style={styles.label}>Postalcode / ZIP</Text>
                        <Input
                            placeholder='Enter Postalcode'
                            containerStyle={styles.inputcontainerstyle}
                            inputContainerStyle={styles.inputstyle}
                            onChangeText={text => setzip_code(text)}
                            value={zip_code}
                        />
                        {loading ? 
                        <TouchableOpacity style={styles.buttonfull} onPress={() => addaddress()}>
                           <ActivityIndicator size={"large"} color={colors.light} />
                        </TouchableOpacity>
                            :
                        <TouchableOpacity style={styles.buttonfull} onPress={() => addaddress()}>
                           <Text style={styles.buttontext}>Save</Text>
                        </TouchableOpacity>
                        }
                    </View>
                </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default MyAddressAddScreen;
