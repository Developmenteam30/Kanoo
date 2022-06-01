import React, {useEffect, useRef, useState} from 'react';
import {Image, ImageBackground, SafeAreaView, Text, KeyboardAvoidingView, Platform, View, ScrollView, TouchableOpacity, Dimensions, FlatList} from 'react-native';
import { Card, AirbnbRating, Input, Icon } from 'react-native-elements';
import styles from '../styles/SearchScreenStyle';
import { Images } from '../utils/Images';
import { colors } from '../utils/Variables';
const {width, height} = Dimensions.get('window');


const WishlistScreen = ({ navigation }) => {
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;
  var _carousel = useRef(null);
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
                <Image source={{ uri: item.image }} style={styles.imageb} />
                <View style={{width: '60%'}}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ width: '90%', lineHeight: 24, textAlign: 'left', color: colors.dark, paddingTop: 10, paddingBottom: 5 }}>{item.name}</Text>
                        <Icon name={"close"} type="antdesign" size={15} style={{paddingTop: 10}} />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ width: '30%', lineHeight: 24, textAlign: 'left', color: colors.dark, fontWeight: '600', fontSize: 15 }}>{item.price}</Text>
                        <View style={{flexDirection: 'row', width: '70%'}}>
                            <TouchableOpacity style={[styles.buttonfull, {marginVertical: 0, padding: 8}]} onPress={()=>navigation.navigate('HomeScreen')}>
                                <Text style={[styles.buttontext, {fontSize: 12}]}>ADD TO CART</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Card>
    );
}

  return (
    <SafeAreaView style={styles.mainContainer}>
      <FlatList
        data={products}
        numColumns={1}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={{width: Dimensions.get('screen').width}}
      />
    </SafeAreaView>
  );
};
export default WishlistScreen;
