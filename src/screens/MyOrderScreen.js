import React, {useEffect, useState} from 'react';
import {Image, FlatList, SafeAreaView, Text, KeyboardAvoidingView, Platform, View, Dimensions, TouchableOpacity} from 'react-native';
import { Divider, Input, Card } from 'react-native-elements';
import styles from '../styles/LoginScreenStyle';
import { Images } from '../utils/Images';
import { colors } from '../utils/Variables';

const MyOrderScreen = ({navigation}) => {
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
  const [products, setProducts] = useState([
    {
      id: 0,
      name: 'Product Store Name',
      price: '$101.0',
      count: 4,
      image: 'https://web.techinfomatic.com/kanoo/demo3/php/assets/kanoo/Images/Perkins/A001211B.jpg'
    },
    {
      id: 1,
      name: 'Product Store Name',
      price: '$101.0',
      count: 4,
      image: 'https://web.techinfomatic.com/kanoo/demo3/php/assets/kanoo/Images/Bobcat/Alternator.jpg'
    },
    {
      id: 2,
      name: 'Product Store Name',
      price: '$101.0',
      count: 4,
      image: 'https://web.techinfomatic.com/kanoo/demo3/php/assets/kanoo/Images/Perkins/A010164A.jpg'
    },
  ]);
    const renderItem = ({ item, index }) => {
        return (
            <Card>
                <View style={[styles.cartitem]}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{width: '65%'}}>
                            <Text style={{ width: '100%', lineHeight: 24, textAlign: 'left', color: colors.dark, paddingTop: 12 }}>{item.name}</Text>
                            <Text style={{ width: '100%', lineHeight: 24, textAlign: 'left', color: colors.dark, paddingTop: 12 }}>Total Amount</Text>
                            <Text style={{ width: '100%', lineHeight: 24, textAlign: 'left', color: colors.dark, fontWeight: '600', fontSize: 15 }}>{item.price}</Text>
                        </View>
                        <View style={{width: '35%'}}>
                            <Text style={{ width: '100%', lineHeight: 24, textAlign: 'right', color: colors.dark, paddingTop: 12 }}>09-10-2021</Text>
                            <Text style={{ width: '100%', lineHeight: 20, textAlign: 'right', color: colors.success, paddingTop: 12 }}>Delivered</Text>
                            <Text style={{ width: '100%', lineHeight: 24, textAlign: 'center', color: colors.dark, paddingVertical: 5, marginTop: 7, borderColor: colors.dark, borderRadius: 20, borderWidth: 0.6 }}>View details</Text>
                        </View>
                    </View>
                </View>
            </Card>
        );
    }

    return (
      <SafeAreaView style={[styles.mainContainer, {backgroundColor: colors.light}]}>
        <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>
            <FlatList
                data={products}
                numColumns={1}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={{width: Dimensions.get('screen').width}}
            />
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default MyOrderScreen;
