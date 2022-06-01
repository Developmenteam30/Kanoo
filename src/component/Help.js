import React, {useEffect} from 'react';
import {Image, ImageBackground, SafeAreaView, Text, KeyboardAvoidingView, Platform, View, ScrollView, TouchableOpacity} from 'react-native';
import { Divider, Icon, Input } from 'react-native-elements';
import styles from '../styles/LoginScreenStyle';
import { Images } from '../utils/Images';
import { colors } from '../utils/Variables';

const Helps = (props) => {
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
  return (
    <SafeAreaView style={[styles.mainContainer, {backgroundColor: "rgba(0,0,0,0.5)"}]}>
        <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>
              <ScrollView style={[styles.Modelscrollwidth, {padding: 15, backgroundColor: colors.light, marginTop: 250}]} showsVerticalScrollIndicator={false}>
                    <Text style={[styles.header, {width: '100%', textAlign: 'center'}]}>Help</Text>
                    <Divider width={1} color={colors.primary} />  
                    <Image source={require('../assets/images/darklogo.png')} style={{width: '100%', height: 50, resizeMode: 'contain', marginTop: 20}} />
                    <View style={styles.form}>
                        <Text style={[styles.bottomtext, {padding: 10, paddingHorizontal: 50, lineHeight: 24}]}>Contact Kanoo</Text>  
                        <Text style={[styles.bottomtext, { padding: 10, paddingHorizontal: 50, lineHeight: 24 }]}>999-855-2525</Text>
                        <Text style={[styles.bottomtext, { padding: 10, paddingHorizontal: 50, lineHeight: 24 }]}>Kanoo@gmail.com</Text>
                        <TouchableOpacity style={styles.buttonfull} onPress={()=>props.close()}>
                           <Text style={styles.buttontext}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default Helps;
