import React, {useEffect, useState} from 'react';
import {Image, ImageBackground, SafeAreaView, Text, KeyboardAvoidingView, Platform, View, ScrollView, TouchableOpacity, Alert} from 'react-native';
import { Divider, Input } from 'react-native-elements';
import styles from '../styles/LoginScreenStyle';
import { Images } from '../utils/Images';
import { colors } from '../utils/Variables';
import api from "../utils/Api";
import { connect } from "react-redux";

const LoginScreen = (props) => {
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    useEffect(() => {
        usercheck();
        return ()=>{}
    }, [])
    const usercheck = async () => {
        var user = await api.getdata('@user');
        var token = await api.getdata('@token');
        if (token && user) {
            props.updateUser(user);
            global.auth = token;
            props.navigation.replace('HomeScreen');
        }
    }
    const login = async () => {
        if (email && password) {
            var user = {
                'email': email,
                'password': password
            }
            var cate = await api.postapi(user, "login");
            if (cate && cate.user) {
                props.updateUser(cate.user);
                global.auth = cate.token;
                await api.storedata(cate.user, '@user');
                await api.storedata(cate.token, '@token');
                props.navigation.replace('HomeScreen');
            } else if (cate && cate.error_message) {
                Alert.alert(cate.error_message);
            } else {
                Alert.alert('Something went wrong! Try later.');
            }
        }
    }
  return (
    <SafeAreaView style={styles.mainContainer}>
        <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>
            <Image source={Images.fulllogo} style={styles.logoStyle} />
            <ImageBackground
                source={Images.background}
                style={styles.windowheight}  
            >
                <ScrollView>
                      
                    <Text style={styles.header}>Login</Text>
                    <Divider width={1} color={colors.primary} />  
                    <View style={styles.form}>
                        <Text style={styles.label}>Email</Text>
                        <Input
                            placeholder='Enter Email'
                            onChangeText={text => setEmail(text)}
                            value={email}
                            containerStyle={styles.inputcontainerstyle}
                            inputContainerStyle={styles.inputstyle}
                        />
                        <Text style={styles.label}>Password</Text>
                        <Input
                            placeholder='Enter Password'
                            onChangeText={text => setPassword(text)}
                            value={password}
                            secureTextEntry={true}
                            containerStyle={styles.inputcontainerstyle}
                            inputContainerStyle={styles.inputstyle}
                            rightIcon={{ type: 'antdesign', name: 'eyeo' }}
                        />
                        <Text style={styles.rightalign} onPress={()=>props.navigation.navigate('ForgetScreen')}>Forgot Password ?</Text>
                        <TouchableOpacity style={styles.buttonfull} onPress={()=>login()}>
                           <Text style={styles.buttontext}>Log In</Text>
                        </TouchableOpacity>
                        <Text style={styles.bottomtext} onPress={()=>props.navigation.navigate('RegisterScreen')}>Don’t have an account? <Text style={{color: colors.warning}}>Register</Text></Text>  
                    </View>
                </ScrollView>
            </ImageBackground>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
