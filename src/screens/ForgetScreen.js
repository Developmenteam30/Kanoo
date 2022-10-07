import React, {useEffect} from 'react';
import {Image, ImageBackground, SafeAreaView, Text, KeyboardAvoidingView, Platform, View, ScrollView, TouchableOpacity} from 'react-native';
import { Divider, Input } from 'react-native-elements';
import styles from '../styles/LoginScreenStyle';
import { Images } from '../utils/Images';
import { colors } from '../utils/Variables';

const ForgetScreen = ({navigation}) => {
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
  return (
    <SafeAreaView style={styles.mainContainer}>
        <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>
            <Image source={Images.fulllogo} style={styles.logoStyle} />
            <ImageBackground
                source={Images.background}
                style={styles.windowheight}  
            >
                <ScrollView>
                      
                    <Text style={styles.header}>Forgot Password</Text>
                    <Divider width={1} color={colors.primary} />  
                    <View style={styles.form}>
                        <Text style={styles.label}>Email</Text>
                        <Input
                            placeholder='Enter Email'
                            containerStyle={styles.inputcontainerstyle}
                            inputContainerStyle={styles.inputstyle}
                        />
                        <TouchableOpacity style={styles.buttonfull} onPress={()=>navigation.navigate('VerifyScreen')}>
                           <Text style={styles.buttontext}>Send</Text>
                        </TouchableOpacity>
                        <Text style={styles.bottomtext} onPress={()=>navigation.navigate('RegisterScreen')}>Don’t have an account? <Text style={{color: colors.warning}}>Register</Text></Text>  
                    </View>
                </ScrollView>
            </ImageBackground>
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default ForgetScreen;
