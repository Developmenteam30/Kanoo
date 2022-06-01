import React, {useEffect} from 'react';
import {Image, ImageBackground, SafeAreaView, Text, KeyboardAvoidingView, Platform, View, ScrollView, TouchableOpacity} from 'react-native';
import { Divider, Icon, Input } from 'react-native-elements';
import styles from '../styles/LoginScreenStyle';
import { Images } from '../utils/Images';
import { colors } from '../utils/Variables';

const VerifyScreen = ({navigation}) => {
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
                        <Text style={[styles.bottomtext, {padding: 20, paddingHorizontal: 50, lineHeight: 24}]}>Please enter the 4-digit code sent to  <Text style={{color: colors.warning}}>999-855-2525</Text></Text>  
                        <Text style={[styles.bottomtext, { padding: 20, paddingHorizontal: 50, lineHeight: 24 }]}>Enter OTP</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Input
                                placeholder=''
                                containerStyle={[styles.inputcontainerstyle, {width: '15%', paddingHorizontal: '1%'}]}
                                inputContainerStyle={styles.inputstyle}
                            />
                            <Input
                                placeholder=''
                                containerStyle={[styles.inputcontainerstyle, {width: '15%', paddingHorizontal: '1%'}]}
                                inputContainerStyle={styles.inputstyle}
                            />
                            <Input
                                placeholder=''
                                containerStyle={[styles.inputcontainerstyle, {width: '15%', paddingHorizontal: '1%'}]}
                                inputContainerStyle={styles.inputstyle}
                            />
                            <Input
                                placeholder=''
                                containerStyle={[styles.inputcontainerstyle, {width: '15%', paddingHorizontal: '1%'}]}
                                inputContainerStyle={styles.inputstyle}
                            />
                            <Input
                                placeholder=''
                                containerStyle={[styles.inputcontainerstyle, {width: '15%', paddingHorizontal: '1%'}]}
                                inputContainerStyle={styles.inputstyle}
                            />
                            <Input
                                placeholder=''
                                containerStyle={[styles.inputcontainerstyle, {width: '15%', paddingHorizontal: '1%'}]}
                                inputContainerStyle={styles.inputstyle}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Icon type='antdesign' name="clockcircle" color={colors.primary} size={16} />
                            <Text style={{color: colors.primary, fontSize: 16, paddingLeft: 10}}>00:59</Text>
                        </View>
                        <Text style={[styles.bottomtext, {padding: 20, paddingHorizontal: 50, lineHeight: 24}]}>Resend Code</Text>  
                        <TouchableOpacity style={styles.buttonfull} onPress={()=>navigation.navigate('ChangePasswordScreen')}>
                           <Text style={styles.buttontext}>Verify</Text>
                        </TouchableOpacity>
                        <Text style={styles.bottomtext} onPress={()=>navigation.navigate('RegisterScreen')}>Don’t have an account? <Text style={{color: colors.warning}}>Register</Text></Text>  
                    </View>
                </ScrollView>
            </ImageBackground>
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default VerifyScreen;
