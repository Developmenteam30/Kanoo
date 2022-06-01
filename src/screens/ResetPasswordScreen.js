import React, {useEffect} from 'react';
import {Image, ImageBackground, SafeAreaView, Text, KeyboardAvoidingView, Platform, View, ScrollView, TouchableOpacity} from 'react-native';
import { Divider, Input } from 'react-native-elements';
import styles from '../styles/LoginScreenStyle';
import { Images } from '../utils/Images';
import { colors } from '../utils/Variables';

const ResetPasswordScreen = ({navigation}) => {
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
  return (
      <SafeAreaView style={[styles.mainContainer, {backgroundColor: colors.light}]}>
        <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>
            <ImageBackground
                source={Images.background}
                style={styles.windowheight}  
            >
                <ScrollView>
                      
                    <Text style={styles.header}>Enter New Password</Text>
                    <Divider width={1} color={colors.primary} />  
                    <View style={styles.form}>
                        <Text style={styles.label}>New Password</Text>
                        <Input
                            placeholder='enter Password'
                            containerStyle={styles.inputcontainerstyle}
                            inputContainerStyle={styles.inputstyle}
                        />
                        <Text style={styles.label}>Re-enter Password</Text>
                        <Input
                            placeholder='enter password'
                            containerStyle={styles.inputcontainerstyle}
                            inputContainerStyle={styles.inputstyle}
                            rightIcon={{ type: 'antdesign', name: 'eyeo' }}
                        />
                        <TouchableOpacity style={styles.buttonfull} onPress={()=>navigation.navigate('Profile')}>
                           <Text style={styles.buttontext}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </ImageBackground>
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default ResetPasswordScreen;
