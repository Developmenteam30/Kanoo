import React, {useEffect, useRef, useState} from 'react';
import {Image, ImageBackground, SafeAreaView, Text, KeyboardAvoidingView, Platform, View, ScrollView, TouchableOpacity, Dimensions, FlatList, ActivityIndicator} from 'react-native';
import { Card, AirbnbRating, Input } from 'react-native-elements';
import styles from '../styles/SearchScreenStyle';
import { Images } from '../utils/Images';
import { colors } from '../utils/Variables';
import Carousel from 'react-native-snap-carousel';
import { Pagination } from 'react-native-snap-carousel';
import api from "../utils/Api";
import { connect } from "react-redux";
const {width, height} = Dimensions.get('window');



const SearchScreen = (props) => {
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;
  const _carousel = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [search, setsearch] = useState("");
  const [category, setcategory] = useState(0);
  const [products, setproducts] = useState();
  const [loader, setloader] = useState(true);
  const [count, setcount] = React.useState(0);
  const apicall = async (text = "", cat = category) => {
    setsearch(text);
    var cate = await api.getapi("featureproducts?brand_id="+props.category[cat].id+"&q="+text);
    if (cate) {
      setproducts(cate);
      setloader(false);
      setTimeout(() => { 
        if (_carousel && _carousel.current) {
          _carousel.current.snapToItem(cat);
        }
      }, 500);
    }
  };
  useEffect(() => {
    if (props.route.params && props.route.params.categoryIndex) {
      var cat = props.route.params.categoryIndex;
      setcategory(cat);
      apicall("", cat);
    } else {
      apicall("", 0);
    }
    return ()=>{}
  }, [])

  const getselectedqty = (id) => {
    var i = 1;
    props.cart.forEach((c) => {
      if (c.id == id) {
        i = c.selectedQty;
      }
    });
    return i;
  }
  const checkincart = (id) => {
    var i = 0;
    props.cart.forEach((c) => {
      if (c.id == id) {
        i = 1;
      }
    });
    return i == 0 ? false : true;
  };

  const _renderItem = ({ item, index }) => {
        return (
          <Card style={styles.slide}>
            <Image source={{ uri: item.image }} style={styles.banner}/>
          </Card>
        );
  }
  const renderItem = ({ item, index }) => {
    return (
      <Card containerStyle={styles.catwidth}>
        <TouchableOpacity onPress={() => props.navigation.navigate('ProductDetailScreen', {product: item})}>
            <Image source={{ uri: item.image != '' ? item.image : "https://web.techinfomatic.com/assets/no-image.png" }} style={styles.imageb} />
            <View>
            <Text style={{ width: '100%', lineHeight: 16, textAlign: 'left', color: colors.dark, fontWeight: '400', fontSize: 10 }}>Part Number: {item.sku}</Text>
              <Text style={{ width: '100%', lineHeight: 24, textAlign: 'left', color: colors.dark }}>{item.name}</Text>
              <Text style={{ width: '100%', lineHeight: 16, textAlign: 'left', color: colors.dark, fontWeight: '400', fontSize: 10 }}>{props.jsondata && props.jsondata['uom'] ? props.jsondata['uom'][item.color] : item.color}</Text>
            <Text style={{ width: '100%', lineHeight: 24, textAlign: 'left', color: colors.dark, fontWeight: '600', fontSize: 14 }}>AED {item.discounted_price} </Text>
              <AirbnbRating isDisabled={true} defaultRating={item.review} reviews={[]}
                  size={15}
                  selectedColor={colors.dark}
                  reviewSize={0}
                  starContainerStyle={{ padding: 0, margin: 0 }}
                  showRating={false}
              />

              {checkincart(item.id) ? (
                <View style={{ flexDirection: 'row', width: "50%" }}>
                  <TouchableOpacity style={styles.navbutton} onPress={() => {
                    var cart = props.cart;
                    var i;
                    cart.forEach((c, ind) => {
                      if (c.id == item.id) {
                        i = ind;
                      }
                    });
                    if (cart[i].selectedQty && cart[i].selectedQty > 1) {
                      cart[i].selectedQty--;
                      item.selectedQty = cart[i].selectedQty;
                    } else {
                      cart.splice(i, 1);
                      item.selectedQty = null;
                    }
                    props.updateCart(cart);
                    setcount(count + 1);
                  }}><Text style={styles.darkcolor}>-</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.navbutton}><Text style={styles.darkcolor}>{getselectedqty(item.id)}</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.navbutton} onPress={() => {
                    var cart = props.cart;
                    cart.forEach((c, ind) => {
                      if (c.id == item.id && item.quantity_in_stock > cart[ind].selectedQty) {
                        cart[ind].selectedQty++;
                        item.selectedQty = cart[ind].selectedQty;
                      }
                    });
                    props.updateCart(cart);
                    setcount(count + 1);
                  }}><Text style={styles.darkcolor}>+</Text></TouchableOpacity>
                </View>
              ) : item.quantity_in_stock > 0 ? (
                <TouchableOpacity style={[styles.buttonfull, { marginVertical: 0, padding: 8, width: '90%', marginLeft: 0 }]} onPress={() => {
                  var car = props.cart;
                  item.selectedQty = 1;
                  car.push(item);
                  props.updateCart(car);
                  setcount(count + 1);
                }}>
                  <Text style={[styles.buttontext, { fontSize: 12 }]}>ADD TO CART</Text>
                </TouchableOpacity>
              ) : ( 
                <Text style={{width: "90%", color: colors.warning, paddingHorizontal: 10, paddingVertical: 10}}>Out of stock</Text>
              )}
            
            </View>
        </TouchableOpacity>
      </Card>
    );
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={{flex:1, height: 140, marginBottom: 10}}>
        <Carousel
          ref={_carousel}
          data={props.category}
          renderItem={_renderItem}
          currentIndex={ category}
          sliderWidth={width}
          itemWidth={width}
          onSnapToItem={(index) => { console.log(index);  setActiveIndex(index)}}
        />
      </View>
      {loader ?
        <SafeAreaView style={styles.mainContainer}>
          <ActivityIndicator size={"large"} color={colors.dark} />
        </SafeAreaView >
        :
        <View style={{height: height-280}}>
          <View style={{paddingHorizontal: 15, width: width}}>
              <Input
                  placeholder='Search'
                  containerStyle={styles.inputcontainerstyle}
                  inputContainerStyle={styles.inputstyle}
                  value={search}
                  onChangeText={text=> apicall(text)}
                  leftIcon={{ type: 'feather', name: 'search' }}
              />
          </View>
          {products.length == 0 ? 
            <Text style={{ width: width, color: colors.dark, fontSize: 15, padding: 12, textAlign: 'center' }}>
              No product found!
            </Text>
            :
            <FlatList
              data={products}
              numColumns={2}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              style={{width: width,height: height-450}}
            />
          }
        </View>
      }
    </SafeAreaView >
  );
};
function mapStateToProps(state) {
  return {
    user: state.userReducer,
    cart: state.cartReducer,
    category: state.categoryReducer,
    jsondata: state.jsondataReducer
  };
}
function mapDispatchToProps(dispatch) {
  return {
      updateCart: (cart) => dispatch({ type: "UPDATE_CART", cart: cart }),
      updateUser: (cart) => dispatch({ type: "UPDATE_USER", user: cart }),
      updateCaregory: (data) => dispatch({ type: "UPDATE_CATEGORY", category: data }),
      updateJsondata: (data) => dispatch({ type: "UPDATE_jsondata", jsondata: data }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
