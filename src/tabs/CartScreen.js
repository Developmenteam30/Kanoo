import React, {useEffect, useRef, useState} from 'react';
import {Image, ImageBackground, SafeAreaView, Text, KeyboardAvoidingView, Platform, View, ScrollView, TouchableOpacity, Dimensions, FlatList} from 'react-native';
import { Card, AirbnbRating, Input } from 'react-native-elements';
import styles from '../styles/SearchScreenStyle';
import { Images } from '../utils/Images';
import { colors } from '../utils/Variables';
const {width, height} = Dimensions.get('window');


const CartScreen = ({ navigation }) => {
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
                <View>
                    <Text style={{ width: '100%', lineHeight: 24, textAlign: 'left', color: colors.dark, paddingTop: 12 }}>{item.name}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ width: '50%', lineHeight: 24, textAlign: 'left', color: colors.dark, fontWeight: '600', fontSize: 15 }}>{item.price}</Text>
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity style={styles.navbutton} onPress={() => { var i = products; i[index].count--; setProducts(i) }}><Text>-</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.navbutton}><Text>{item.count}</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.navbutton} onPress={() => { var i = products; i[index].count++; setProducts(i) }}><Text>+</Text></TouchableOpacity>
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
        ListFooterComponent={() => {
            return (
                <View style={{padding: 20}}>
                    <TouchableOpacity style={styles.buttonfull} onPress={()=>navigation.navigate('Wishlist')}>
                        <Text style={styles.buttontext}>Place order</Text>
                    </TouchableOpacity>
                </View>
            )
        }}
        style={{width: Dimensions.get('screen').width}}
      />
    </SafeAreaView>
  );
};
export default CartScreen;
