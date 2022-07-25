import React, {useEffect, useRef, useState} from 'react';
import {Image, ImageBackground, SafeAreaView, Text, KeyboardAvoidingView, Platform, View, ScrollView, TouchableOpacity, Dimensions, FlatList} from 'react-native';
import { Card, AirbnbRating, Input } from 'react-native-elements';
import styles from '../styles/SearchScreenStyle';
import { Images } from '../utils/Images';
import { colors } from '../utils/Variables';
import api from '../utils/Api';
import { connect } from "react-redux";
const {width, height} = Dimensions.get('window');


const CartScreen = (props) => {
  const [count, setcount] = React.useState(0);
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;
  var _carousel = useRef(null);
  const [products, setProducts] = useState([]);
    useEffect(() => {
        return ()=>{}
    }, [])
    const usercheck = async () => {
        var user = await api.getdata('@user');
        var token = await api.getdata('@token');
        if (!token || !user) {
            props.navigation.navigate('LoginScreen');
        } else {
          props.navigation.navigate('MyAddressScreen', { method: 'checkout' });
        }
    }

  const renderItem = ({ item, index }) => {
    return (
        <Card>
            <View style={[styles.cartitem]}>
                <Image source={{ uri: item.image }} style={styles.imageb} />
                <View>
                    <Text style={{ width: '100%', lineHeight: 24, textAlign: 'left', color: colors.dark, paddingTop: 12 }}>{item.name}</Text>
                    <Text style={{ width: '100%', lineHeight: 16, textAlign: 'left', color: colors.dark, paddingTop: 2 }}>Part No.: {item.sku}</Text>
                    <Text style={{ width: '100%', lineHeight: 16, textAlign: 'left', color: colors.dark, paddingTop: 2 }}>Category: {item.brand.name}, UOM: {props.jsondata && props.jsondata['uom'] ? props.jsondata['uom'][item.color] : item.color}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ width: '40%', lineHeight: 24, textAlign: 'left', color: colors.dark, fontWeight: '600', fontSize: 15 }}>AED {item.discounted_price}</Text>
                        <View style={{flexDirection: 'row'}}>
                          <TouchableOpacity style={styles.navbutton}
                            onPress={() => {
                              var cart = props.cart;
                              if(cart[index].selectedQty && cart[index].selectedQty > 1){
                                cart[index].selectedQty--;
                              }else{
                                cart.splice(index, 1);
                              }
                              props.updateCart(cart);
                              setcount(count+1);
                            }}
                          ><Text style={styles.darkcolor}>-</Text></TouchableOpacity>
                                      <TouchableOpacity style={styles.navbutton}><Text style={styles.darkcolor}>{item.selectedQty}</Text></TouchableOpacity>
                          <TouchableOpacity style={styles.navbutton}
                            onPress={() => {
                              var cart = props.cart;
                              cart[index].selectedQty++;
                              props.updateCart(cart);
                              setcount(count+1);
                          }}><Text style={styles.darkcolor}>+</Text></TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Card>
    );
}

  return (
    <SafeAreaView style={styles.mainContainer}>
      {props.cart.length == 0 ? 
        <Card>
          <Text style={{fontSize: 15, padding: 20, color: colors.dark}}>Your cart is empty!</Text>
        </Card> : null
      }
      <FlatList
        data={props.cart}
        numColumns={1}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListFooterComponent={() => {
            return (
                <View style={{ padding: 20 }}>
                  {props.cart.length > 0 ? (
                    <TouchableOpacity style={styles.buttonfull} onPress={() => usercheck()}>
                      <Text style={styles.buttontext}>Checkout</Text>
                    </TouchableOpacity>
                  ) : null}
                </View>
            )
        }}
        style={{width: Dimensions.get('screen').width}}
      />
    </SafeAreaView>
  );
};
function mapStateToProps(state) {
  return {
    cart: state.cartReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    updateCart: (cart) => dispatch({ type: "UPDATE_CART", cart: cart }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
