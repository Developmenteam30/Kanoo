import React, {useEffect, useState} from 'react';
import {Image, FlatList, SafeAreaView, Text, KeyboardAvoidingView, Platform, View, Dimensions, TouchableOpacity} from 'react-native';
import { Divider, Icon, Card } from 'react-native-elements';
import styles from '../styles/LoginScreenStyle';
import { Images } from '../utils/Images';
import { colors } from '../utils/Variables';

const MyAddressScreen = ({navigation}) => {
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
  const [address, setaddress] = useState([
    {
      id: 0,
      name: 'Address 1',
      description: 'Flat no. B 601, landmark garden society, near bishops school, near trump tower, kalyani nagar, Pune - 411006',
      count: 4,
    },
    {
      id: 1,
      name: 'Address 2',
      description: 'Flat no. B 601, landmark garden society, near bishops school, near trump tower, kalyani nagar, Pune - 411006',
      count: 4,
    },
  ]);
    const renderItem = ({ item, index }) => {
        return (
            <Card>
                <View style={[styles.cartitem]}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{width: '65%'}}>
                            <Text style={{ width: '100%', fontSize: 16, fontWeight: '600', lineHeight: 24, textAlign: 'left', color: colors.dark, paddingTop: 12 }}>{item.name}</Text>
                        </View>
                        <Icon name={"edit"} type={"feather"} size={15} color={colors.dark} style={{paddingTop: 15}}/>
                    </View>
                    <Text style={{ width: '100%', lineHeight: 24, textAlign: 'left', color: colors.dark, paddingTop: 12 }}>{item.description}</Text>
                </View>
            </Card>
        );
    }

    return (
      <SafeAreaView style={[styles.mainContainer, {backgroundColor: colors.light}]}>
        <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>
            <FlatList
                data={address}
                numColumns={1}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={{width: Dimensions.get('screen').width}}
            />
            <TouchableOpacity style={[styles.buttonfull, {width: '90%', marginLeft: '5%'}]} onPress={()=>navigation.navigate('MyAddressAddScreen')}>
                <Text style={styles.buttontext}>Add New Address</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default MyAddressScreen;
