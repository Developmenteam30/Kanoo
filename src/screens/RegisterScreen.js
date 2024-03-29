import React, {useEffect, useState} from 'react';
import {Image,Alert, ActivityIndicator, SafeAreaView, Text, KeyboardAvoidingView, Platform, View, ScrollView, TouchableOpacity} from 'react-native';
import { Divider, Input } from 'react-native-elements';
import styles from '../styles/LoginScreenStyle';
import { Images } from '../utils/Images';
import { colors } from '../utils/Variables';
import api from "../utils/Api";
import { connect } from "react-redux";

const RegisterScreen = (props) => {
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
    const [loader, setloader] = useState(false);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [passwordc, setPasswordc] = useState(null);
    const [name, setname] = useState(null);
    const [lname, setlname] = useState(null);
    const [phone_number, setphone_number] = useState(null);
    const register = async () => {
        if (email && password && phone_number && password == passwordc) {
            setloader(true);
            var user = {
                'email': email,
                'password': password,
                'name': name+' '+lname,
                'phone_number': phone_number
            }
            var cate = await api.postapi(user, "register");
            if (cate && cate.user) {
                props.updateUser(cate.user);
                global.auth = cate.token;
                await api.storedata(cate.user, '@user');
                await api.storedata(cate.token, '@token');
                setloader(false);
                props.navigation.navigate('HomeScreen');
            } else if (cate && cate.error_message) {
                setloader(false);
                Alert.alert(cate.error_message);
            } else if (cate && cate.message) {
                setloader(false);
                Alert.alert(cate.message);
            } else {
                setloader(false);
                Alert.alert('Something went wrong! Try later.');
            }
        } else {
            setloader(false);
            Alert.alert('Password does not match.');
        }
    }
    return (
    <SafeAreaView style={[styles.mainContainer, {backgroundColor: colors.white}]}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={keyboardVerticalOffset}>
            <ScrollView style={styles.scrollwidth} showsVerticalScrollIndicator={false}>
                <Text style={styles.header}>Register</Text>
                <Divider width={1} color={colors.primary} />  
                <View style={styles.form}>
                    <Text style={styles.label}>First name</Text>
                    <Input
                        placeholder='Enter First Name'
                        containerStyle={styles.inputcontainerstyle}
                        inputContainerStyle={styles.inputstyle}
                        onChangeText={text => setname(text)}
                        value={name}
                    />
                    <Text style={styles.label}>Last name</Text>
                    <Input
                        placeholder='Enter Last Name'
                        containerStyle={styles.inputcontainerstyle}
                        inputContainerStyle={styles.inputstyle}
                        onChangeText={text => setlname(text)}
                        value={lname}
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
                        onChangeText={text => setEmail(text)}
                        value={email}
                    />
                    <Text style={styles.label}>Password</Text>
                    <Input
                        placeholder='Enter Password'
                        containerStyle={styles.inputcontainerstyle}
                        inputContainerStyle={styles.inputstyle}
                        rightIcon={{ type: 'antdesign', name: 'eyeo' }}
                        onChangeText={text => setPassword(text)}
                        value={password}
                        secureTextEntry={true}
                    />
                    <Text style={styles.label}>Confirm Password</Text>
                    <Input
                        placeholder='Enter Password'
                        containerStyle={styles.inputcontainerstyle}
                        inputContainerStyle={styles.inputstyle}
                        rightIcon={{ type: 'antdesign', name: 'eyeo' }}
                        onChangeText={text => setPasswordc(text)}
                        value={passwordc}
                        secureTextEntry={true}
                    />
                    <Text style={styles.rightalign} onPress={() => props.navigation.navigate('ForgetScreen')}>Forgot Password ?</Text>
                    {loader ? 
                        <SafeAreaView>
                            <ActivityIndicator size={"large"} color={colors.dark} />
                        </SafeAreaView >
                            :
                        <TouchableOpacity style={styles.buttonfull} onPress={()=>register()}>
                            <Text style={styles.buttontext}>Register</Text>
                        </TouchableOpacity>
                    }
                    <Text style={styles.bottomtext} onPress={()=>props.navigation.navigate('LoginScreen')}>Already have an account?  <Text style={{color: colors.warning}}>Login</Text></Text>  
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
function mapStateToProps(state) {
  return {
    user: state.userReducer,
    jsondata: state.jsondataReducer
  };
}
function mapDispatchToProps(dispatch) {
  return {
      updateUser: (cart) => dispatch({ type: "UPDATE_USER", user: cart }),
      updateJsondata: (data) => dispatch({ type: "UPDATE_jsondata", jsondata: data }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
