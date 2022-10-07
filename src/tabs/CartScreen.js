import React, {useEffect, useRef, useState} from 'react';
import {Image, TextInput, SafeAreaView, Text, KeyboardAvoidingView, Platform, View, ScrollView, TouchableOpacity, Dimensions, FlatList, Alert} from 'react-native';
import { Card, AirbnbRating, Input } from 'react-native-elements';
import styles from '../styles/SearchScreenStyle';
import { Images } from '../utils/Images';
import { colors } from '../utils/Variables';
import api from '../utils/Api';
import { connect } from "react-redux";
import Toast from 'react-native-simple-toast';
const {width, height} = Dimensions.get('window');


const CartScreen = (props) => {
  const [count, setcount] = React.useState(1);
  const [qty, setqty] = React.useState([]);
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;
  var _carousel = useRef(null);
  const [products, setProducts] = useState([]);
    useEffect(() => {
      var q = [];
      props.cart.forEach(e => {
        q.push(e.selectedQty.toString());
      })
      setqty(q);
      return () => { }
    }, [])
    const usercheck = async () => {
        if (!props.user.email) {
            props.navigation.navigate('LoginScreen');
        } else {
          props.navigation.navigate('MyAddressScreen', { method: 'checkout' });
        }
    }
  const setselectedqty = (text, i) => {
    var cs = props.cart;
    var q = qty;
    if (text && text <= cs[i].quantity_in_stock) {
      q[i] = text.toString();
      cs[i].selectedQty = text;
      props.updateCart(cs);
      setcount(count+1);
    } else if (text) {
      q[i] = cs[i].quantity_in_stock.toString();
      setcount(count+1);
      Toast.showWithGravity('Can not add more then '+cs[i].quantity_in_stock, Toast.LONG, Toast.TOP);
    } else {
      q[i] = '';
    }
    setqty(q);
    setcount(count+1);
  }
  const renderItem = ({ item, index }) => {
    return (
        <Card>
            <View style={[styles.cartitem]}>
                <Image source={{ uri: item.image != "" ? item.image  : "https://web.techinfomatic.com/assets/no-image.png" }} style={styles.imageb} />
                <View>
                    <Text style={{ width: '100%', lineHeight: 24, textAlign: 'left', color: colors.dark, paddingTop: 12 }}>{item.name}</Text>
                    <Text style={{ width: '100%', lineHeight: 16, textAlign: 'left', color: colors.dark, paddingTop: 2 }}>Part No.: {item.sku}</Text>
                    <Text style={{ width: '100%', lineHeight: 16, textAlign: 'left', color: colors.dark, paddingTop: 2 }}>Brand: {item.brand.name}, UOM: {props.jsondata && props.jsondata['uom'] ? props.jsondata['uom'][item.color] : item.color}</Text>
                    <Text style={{ width: '100%', lineHeight: 24, textAlign: 'left', color: colors.dark, fontWeight: '600', fontSize: 15 }}>AED {item.discounted_price}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{flexDirection: 'row'}}>
                          <TouchableOpacity style={styles.navbutton}
                            onPress={() => {
                              var cart = props.cart;
                              var q = qty;
                              if(cart[index].selectedQty && cart[index].selectedQty > 1){
                                cart[index].selectedQty--;
                                q[index] = cart[index].selectedQty.toString();
                              }else{
                                cart.splice(index, 1);
                                q.splice(index, 1);
                              }
                              props.updateCart(cart);
                              setqty(q);
                              setcount(count+1);
                            }}
                          ><Text style={styles.darkcolor}>-</Text></TouchableOpacity>
                          <TouchableOpacity style={[styles.navbutton, {padding: 0}]}>
                            <TextInput
                              placeholder='Qty'
                              style={[styles.inputcontainerstyles, { color: 'black' }]}
                              placeholderTextColor={'gray'}
                              inputContainerStyle={styles.inputstyles}
                              value={qty[index]}
                              keyboardType="numeric"
                              onChangeText={text=> setselectedqty(text, index)}
                            />
                            {/* <Text style={styles.darkcolor}>{item.selectedQty}</Text> */}
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.navbutton}
                            onPress={() => {
                              var cart = props.cart;
                              var q = qty;
                              if (item.quantity_in_stock > cart[index].selectedQty) {
                                cart[index].selectedQty++;
                                q[index] = cart[index].selectedQty.toString();
                                setqty(q)
                                props.updateCart(cart);
                              } else {
                                Toast.showWithGravity('Can not add more then '+cart[i].quantity_in_stock, Toast.LONG, Toast.TOP);
                              }
                              setcount(count+1);
                          }}><Text style={styles.darkcolor}>+</Text></TouchableOpacity>
                        </View>
                      </View>
                    <Text style={[styles.darkcolor, {width: '100%', textAlign: 'left'}]}>Selected Quantity: {item.selectedQty}</Text>
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
    user: state.userReducer,
    cart: state.cartReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    updateUser: (cart) => dispatch({ type: "UPDATE_USER", user: cart }),
    updateCart: (cart) => dispatch({ type: "UPDATE_CART", cart: cart }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
