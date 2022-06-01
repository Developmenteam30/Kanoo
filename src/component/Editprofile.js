import React, {useEffect} from 'react';
import {Image, ImageBackground, SafeAreaView, Text, KeyboardAvoidingView, Platform, View, ScrollView, TouchableOpacity} from 'react-native';
import { Divider, Input } from 'react-native-elements';
import { baseProps } from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlers';
import styles from '../styles/LoginScreenStyle';
import { Images } from '../utils/Images';
import { colors } from '../utils/Variables';

const Editprofile = (props) => {
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
  return (
    <SafeAreaView style={[styles.mainContainer, {backgroundColor: "rgba(0,0,0,0.5)"}]}>
        <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>
              <ScrollView style={[styles.Modelscrollwidth, {padding: 15, backgroundColor: colors.light, marginTop: 180}]} showsVerticalScrollIndicator={false}>
                <Text style={[styles.header, {width: '100%', textAlign: 'center'}]}>Edit Details</Text>
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
                    <TouchableOpacity style={styles.buttonfull} onPress={()=>props.close()}>
                        <Text style={styles.buttontext}>Save</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default Editprofile;
