import React, {useEffect} from 'react';
import {Image, ImageBackground, SafeAreaView, Text, KeyboardAvoidingView, Platform, View, ScrollView, TouchableOpacity} from 'react-native';
import { Divider, Input } from 'react-native-elements';
import styles from '../styles/LoginScreenStyle';
import { Images } from '../utils/Images';
import { colors } from '../utils/Variables';

const RegisterScreen = ({navigation}) => {
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
  return (
    <SafeAreaView style={[styles.mainContainer, {backgroundColor: colors.white}]}>
        <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>
            <ScrollView style={styles.scrollwidth} showsVerticalScrollIndicator={false}>
                <Text style={styles.header}>Register</Text>
                <Divider width={1} color={colors.primary} />  
                <View style={styles.form}>
                    <Text style={styles.label}>First name</Text>
                    <Input
                        placeholder='enter first Name'
                        containerStyle={styles.inputcontainerstyle}
                        inputContainerStyle={styles.inputstyle}
                    />
                    <Text style={styles.label}>Last name</Text>
                    <Input
                        placeholder='enter last name'
                        containerStyle={styles.inputcontainerstyle}
                        inputContainerStyle={styles.inputstyle}
                    />
                    <Text style={styles.label}>Phone</Text>
                    <Input
                        placeholder='enter phone'
                        containerStyle={styles.inputcontainerstyle}
                        inputContainerStyle={styles.inputstyle}
                    />
                    <Text style={styles.label}>Email</Text>
                    <Input
                        placeholder='enter email'
                        containerStyle={styles.inputcontainerstyle}
                        inputContainerStyle={styles.inputstyle}
                    />
                    <Text style={styles.label}>Password</Text>
                    <Input
                        placeholder='enter password'
                        containerStyle={styles.inputcontainerstyle}
                        inputContainerStyle={styles.inputstyle}
                        rightIcon={{ type: 'antdesign', name: 'eyeo' }}
                    />
                    <Text style={styles.label}>Confirm Password</Text>
                    <Input
                        placeholder='enter password'
                        containerStyle={styles.inputcontainerstyle}
                        inputContainerStyle={styles.inputstyle}
                        rightIcon={{ type: 'antdesign', name: 'eyeo' }}
                    />
                    <Text style={styles.rightalign} onPress={()=>navigation.navigate('ForgetScreen')}>Forgot Password ?</Text>
                    <TouchableOpacity style={styles.buttonfull} onPress={()=>navigation.navigate('HomeScreen')}>
                        <Text style={styles.buttontext}>Log In</Text>
                    </TouchableOpacity>
                    <Text style={styles.bottomtext} onPress={()=>navigation.navigate('LoginScreen')}>Already have an account?  <Text style={{color: colors.warning}}>Login</Text></Text>  
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default RegisterScreen;
