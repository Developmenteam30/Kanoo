import React, {useEffect} from 'react';
import {Image, ImageBackground, SafeAreaView, Text, KeyboardAvoidingView, Platform, View, ScrollView, TouchableOpacity} from 'react-native';
import { Divider, Input } from 'react-native-elements';
import styles from '../styles/LoginScreenStyle';
import { Images } from '../utils/Images';
import { colors } from '../utils/Variables';

const MyAddressAddScreen = ({navigation}) => {
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
  return (
      <SafeAreaView style={[styles.mainContainer, {backgroundColor: colors.light}]}>
        <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>
              <ScrollView style={[styles.Modelscrollwidth, {padding: 15, backgroundColor: colors.light}]} showsVerticalScrollIndicator={false}>
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
                        <Text style={styles.label}>Street Address</Text>
                        <Input
                            placeholder='enter Address'
                            containerStyle={styles.inputcontainerstyle}
                            inputContainerStyle={styles.inputstyle}
                        />
                        <Text style={styles.label}>Town / City</Text>
                        <Input
                            placeholder='enter city'
                            containerStyle={styles.inputcontainerstyle}
                            inputContainerStyle={styles.inputstyle}
                        />
                        <Text style={styles.label}>State / Country</Text>
                        <Input
                            placeholder='enter state'
                            containerStyle={styles.inputcontainerstyle}
                            inputContainerStyle={styles.inputstyle}
                        />
                        <Text style={styles.label}>Postalcode / ZIP</Text>
                        <Input
                            placeholder='enter postalcode'
                            containerStyle={styles.inputcontainerstyle}
                            inputContainerStyle={styles.inputstyle}
                        />

                        <TouchableOpacity style={styles.buttonfull} onPress={() => navigation.navigate('Profile')}>
                           <Text style={styles.buttontext}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default MyAddressAddScreen;
