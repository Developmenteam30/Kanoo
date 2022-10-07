import React, {useEffect, useState} from 'react';
import {Image, Alert, SafeAreaView, Text, KeyboardAvoidingView, Platform, View, ScrollView, TouchableOpacity} from 'react-native';
import { Divider, Input } from 'react-native-elements';
import { baseProps } from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlers';
import styles from '../styles/LoginScreenStyle';
import { Images } from '../utils/Images';
import { colors } from '../utils/Variables';
import { connect } from "react-redux";
import api from '../utils/Api';

const Editprofile = (props) => {
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
    const [name, setname] = useState(null);
    const [email, setemail] = useState(null);
    const [phone_number, setphone_number] = useState(null);

    useEffect(() => {
        if (props.user) {
            setname(props.user.name);
            setemail(props.user.email);
            setphone_number(props.user.phone_number);
        }
    }, [])
    const updateuserdata = async () => {
        console.log(global.auth);
        var user = {
            'name': name,
            'email': email,
            'phone_number': phone_number
        }
        var cate = await api.postapi(user, 'updateuser');
        if (cate && cate.status && cate.status == '1') {
            var u = props.user;
            u.name = name;
            u.email = email;
            u.phone_number = phone_number;
            Alert.alert('Details updated successfully');
            props.updatedata(u);
        } else {
            console.log(cate);
            Alert.alert('Something went wrong! Try later.');
        }
    }
  return (
    <SafeAreaView style={[styles.mainContainer, {backgroundColor: "rgba(0,0,0,0.5)"}]}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={keyboardVerticalOffset}>
              <ScrollView style={[styles.Modelscrollwidth, {padding: 15, backgroundColor: colors.light, marginTop: 180}]} showsVerticalScrollIndicator={false}>
                <Text style={[styles.header, {width: '100%', textAlign: 'center'}]}>Edit Details</Text>
                <Divider width={1} color={colors.primary} />  
                <View style={styles.form}>
                    <Text style={styles.label}>Full name</Text>
                    <Input
                        placeholder='Enter Full Name'
                        containerStyle={styles.inputcontainerstyle}
                        inputContainerStyle={styles.inputstyle}
                        onChangeText={text => setname(text)}
                        value={name}
                    />
                    <Text style={styles.label}>Phone</Text>
                    <Input
                        placeholder='Enter Phone'
                        containerStyle={styles.inputcontainerstyle}
                        inputContainerStyle={styles.inputstyle}
                        onChangeText={text => setphone_number(text)}
                        value={phone_number}
                    />
                    <Text style={styles.label}>Email</Text>
                    <Input
                        placeholder='Enter Email'
                        containerStyle={styles.inputcontainerstyle}
                        inputContainerStyle={styles.inputstyle}
                        onChangeText={text => setemail(text)}
                        value={email}
                    />
                    <TouchableOpacity style={styles.buttonfull} onPress={()=>updateuserdata()}>
                        <Text style={styles.buttontext}>Save</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default Editprofile;
