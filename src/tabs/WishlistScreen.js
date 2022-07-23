import React, {useEffect, useRef, useState} from 'react';
import {Image, Alert, SafeAreaView, Text, KeyboardAvoidingView, Platform, View, ScrollView, TouchableOpacity, Dimensions, FlatList} from 'react-native';
import { Card, AirbnbRating, Input, Icon } from 'react-native-elements';
import styles from '../styles/SearchScreenStyle';
import { Images } from '../utils/Images';
import { colors } from '../utils/Variables';
const {width, height} = Dimensions.get('window');
import api from '../utils/Api';
import { connect } from "react-redux";


const WishlistScreen = ({ navigation }) => {
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;
  var _carousel = useRef(null);
  const [products, setProducts] = useState();
  const addtowishlist = async () => {
    var cate = await api.getapi("wishlist");
    if (cate && cate.data) {
      setProducts(cate.data)
    }
  }

  useEffect(() => {
    addtowishlist()
  }, [])
  const renderItem = ({ item, index }) => {
    return (
        <Card>
            <View style={[styles.cartitem]}>
                <TouchableOpacity onPress={() => {
                  navigation.navigate('ProductDetailScreen', {product: item.product})
                }}>
                  <Image source={{ uri: item.image }} style={styles.imageb} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  navigation.navigate('ProductDetailScreen', {product: item.product})
                }} style={{width: '60%'}}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ width: '90%', lineHeight: 24, textAlign: 'left', color: colors.dark, paddingTop: 10, paddingBottom: 5 }}>{item.product.name}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ width: '30%', lineHeight: 24, textAlign: 'left', color: colors.dark, fontWeight: '600', fontSize: 15 }}>{item.product.price}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={async () => {
                  var order = {
                      'product_id': item.product.id,
                  };
                  var cate = await api.postapi(order,"addwish");
                  if (cate) {
                    addtowishlist();
                      Alert.alert(cate.message);
                  } else if (cate && cate.message) {
                      Alert.alert(cate.message);
                  }

                }}>
                  <Icon name={"delete"} type="antdesign" color={"red"} size={25} style={{paddingTop: 20}} />
                </TouchableOpacity>
            </View>
        </Card>
    );
}

  return (
    <SafeAreaView style={styles.mainContainer}>
      {products && products.length == 0 ? (
        <Card>
          <Text style={{fontSize: 15, padding: 20, color: colors.dark}}>Your don't have wishlist</Text>
        </Card>
      ): (
        <FlatList
          data={products}
          numColumns={1}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          style={{width: Dimensions.get('screen').width}}
        />
      )}
    </SafeAreaView>
  );
};
export default WishlistScreen;
