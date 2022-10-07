import React, {useEffect, useRef, useState} from 'react';
import {Image, ImageBackground, SafeAreaView, Text, KeyboardAvoidingView, Platform, View, ScrollView, TouchableOpacity, Dimensions, FlatList, ActivityIndicator} from 'react-native';
import { Card, AirbnbRating, Input, Button, BottomSheet, ListItem, Icon } from 'react-native-elements';
import styles from '../styles/SearchScreenStyle';
import { Images } from '../utils/Images';
import { colors } from '../utils/Variables';
import Carousel from 'react-native-snap-carousel';
import { Pagination } from 'react-native-snap-carousel';
import api from "../utils/Api";
import { connect } from "react-redux";
import Toast from 'react-native-simple-toast';
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
  const [isVisible, setIsVisible] = useState(false);
  const list = [
    {
      title: 'Cancel',
      containerStyle: { backgroundColor: 'red' },
      titleStyle: { color: 'white' },
      onPress: () => setIsVisible(false),
    },
  ];
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
  const setselectedqty = (id, qty) => {
    var cs = props.cart;
    var i = 0;
    props.cart.forEach((c) => {
      if (c.id == id) {
        cs[i].selectedQty = qty;
      }
      i++;
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
          <View style={styles.slide}>
            <Image source={{ uri: item.image }} style={styles.banner}/>
          </View>
        );
  }
  const renderItem = ({ item, index, separators }) => {
    return (
      <View style={styles.catwidth}
        onShowUnderlay={separators.highlight}
        onHideUnderlay={separators.unhighlight}>
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
                <View style={{ flexDirection: 'row', width: "100%", justifyContent: 'center' }}>
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
                    Toast.showWithGravity('Cart updated successfully', Toast.LONG, Toast.TOP);
                  }}><Text style={styles.darkcolor}>-</Text></TouchableOpacity>
                  <TouchableOpacity style={[styles.navbutton, {padding: 8}]}>
                    <Text style={styles.darkcolor}>{getselectedqty(item.id)}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.navbutton} onPress={() => {
                    var cart = props.cart;
                    cart.forEach((c, ind) => {
                      if (c.id == item.id && item.quantity_in_stock > cart[ind].selectedQty) {
                        cart[ind].selectedQty++;
                        item.selectedQty = cart[ind].selectedQty;
                        Toast.showWithGravity('Cart updated successfully', Toast.LONG, Toast.TOP);
                      } else if (c.id == item.id && item.quantity_in_stock <= cart[ind].selectedQty) {
                        Toast.showWithGravity('You can not add more then '+item.quantity_in_stock+ ' quantity', Toast.LONG, Toast.TOP);
                      }
                    });
                    props.updateCart(cart);
                    setcount(count + 1);
                  }}><Text style={styles.darkcolor}>+</Text></TouchableOpacity>
                </View>
              ) : item.quantity_in_stock > 0 ? (
                <TouchableOpacity style={[styles.buttonfull, { marginVertical: 0, padding: 8, width: '100%', marginLeft: 0 }]} onPress={() => {
                  var car = props.cart;
                  item.selectedQty = 1;
                  car.push(item);
                  props.updateCart(car);
                  setcount(count + 1);
                  Toast.showWithGravity('Successfully added to cart', Toast.LONG, Toast.TOP);
                }}>
                  <Text style={[styles.buttontext, { fontSize: 12 }]}>ADD TO CART</Text>
                </TouchableOpacity>
              ) : ( 
                <Text style={{width: "90%", color: colors.warning, paddingHorizontal: 10, paddingVertical: 10}}>Out of stock</Text>
              )}
            
            </View>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <BottomSheet isVisible={isVisible}>
        {props.category.map((l, i) => (
          <ListItem key={i} containerStyle={l.containerStyle} onPress={() => {
              setcategory(i);
              apicall("", i);
              setIsVisible(false)
           }}>
            <ListItem.Content>
              <ListItem.Title style={l.titleStyle}>{l.name}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
        {list.map((l, i) => (
          <ListItem key={i} containerStyle={l.containerStyle} onPress={l.onPress}>
            <ListItem.Content>
              <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
      {loader ?
        <SafeAreaView style={styles.mainContainer}>
          <ActivityIndicator size={"large"} color={colors.dark} />
        </SafeAreaView >
        :
        <View style={{height: height-100, marginTop: Platform.OS == 'ios' ? 17 : 0 }}>
          <TouchableOpacity style={{ flex: 1, height: 110, marginBottom: 0 }}
                          onPress={()=>{setIsVisible(true)}}
            >
            <Image source={{uri: props.category[category].image}} style={{height: 110, width: width, resizeMode: 'contain'}}></Image>
            {/* <Carousel
              ref={_carousel}
              data={props.category}
              renderItem={_renderItem}
              currentIndex={ category}
              sliderWidth={width}
              itemWidth={width}
              onSnapToItem={(index) => {
                console.log(index);
                setcategory(index);
                apicall(search, index);
                setActiveIndex(index);
              }}
            /> */}
          </TouchableOpacity>

          <View style={{ paddingHorizontal: 0, width: width, flexDirection: 'row' }}>
            <View style={{width: '100%'}}>
              <Input
                  placeholder='Search'
                  containerStyle={styles.inputcontainerstyle}
                  inputContainerStyle={styles.inputstyle}
                  value={search}
                  onChangeText={text=> apicall(text)}
                  leftIcon={{ type: 'feather', name: 'search' }}
              />
            </View>
            <View style={{width: '0%'}}>
              <Button
                icon={
                  <Icon
                    name="chevron-down"
                    type="entypo"
                    size={15}
                    color="blue"
                  />
                }
                iconRight
                title={props.category[category].name}
                type="outline"
                buttonStyle={{height: 50}}
                onPress={()=>{setIsVisible(true)}}
              />
            </View>
          </View>
          {products.length == 0 ? 
            <Text style={{ width: width, color: colors.dark, fontSize: 15, padding: 12, textAlign: 'center', height: height-270 }}>
              No product found!
            </Text>
            :
            <FlatList
              data={products}
              numColumns={2}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              style={{width: width,height: height-400}}
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
