import React, {useEffect, useRef, useState} from 'react';
import {Image, Alert, SafeAreaView, Text, Modal, Platform, View, ScrollView, TouchableOpacity, Dimensions, FlatList} from 'react-native';
import { Card, AirbnbRating, Divider, Icon, Tab, Input, Button } from 'react-native-elements';
import styles from '../styles/SearchScreenStyle';
import { Images } from '../utils/Images';
import { colors } from '../utils/Variables';
import Carousel from 'react-native-snap-carousel';
import { Pagination } from 'react-native-snap-carousel';
import api from '../utils/Api';
import { connect } from "react-redux";
import { ActivityIndicator } from 'react-native';
import Bulkorder from '../component/Bulkorder';
import Toast from 'react-native-simple-toast';
const {width, height} = Dimensions.get('window');
const ProductDetailScreen = (props) => {
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;
    var _carousel = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [index, setIndex] = React.useState(0);
  const [rating, setrating] = React.useState(3);
  const [review, setreview] = React.useState('');
  const [rewloading, setrewloading] = React.useState(false);
  const [count, setcount] = React.useState(0);
  const [products, setproducts] = useState(null);
  const [selected, setselected] = useState(null);
  const [wishlist, setwishlist] = useState(0);
  const submitreview = async () => {
    if (rating && review) {
      var order = {
        'product_id': products.id,
        'rating': rating,
        'message': review
      };
      setrewloading(true);
      var cate = await api.postapi(order,"addreview");
      if (cate) {
        setreview("");
        Alert.alert(cate.message);
        apicall(products.id);
      } else if (cate && cate.message) {
        Alert.alert(cate.message);
      }
    } else {
      Alert.alert('Review can not be blank');
    }
  }
  const apicall = async (id) => {
    var cate = await api.getapi("productshow?q="+id);
    if (cate) {
      setrewloading(false);
      if (cate.product) {
        setproducts(cate.product);
        if (cate.product.media && cate.product.media.length > 0) {
          setselected(cate.product.media[0]);
        } else {
          setselected({original_url: "https://web.techinfomatic.com/assets/no-image.png"})
        }
      }
    }
    var order = {
        'product_id': id,
    };
    var cate = await api.postapi(order,"getwish");
    if (cate) {
      setwishlist(cate);
    }
  };
  const addtowishlist = async () => {
    if (props.user.email) {
      var order = {
          'product_id': products.id,
      };
      var cate = await api.postapi(order,"addwish");
      if (cate) {
        if (wishlist == 1) {
          setwishlist(0);
        } else {
          setwishlist(1);
        }
        Alert.alert(cate.message);
      } else if (cate && cate.message) {
        Alert.alert(cate.message);
      }
    } else {
        Alert.alert("Please login first to add wishlist");
    }
  }

  useEffect(() => {
    if (props.route.params.product) {
      apicall(props.route.params.product.id);
    }
    return () => { }
  }, [])
  const _renderItem = ({ item, index }) => {
        return (
          <Card style={styles.slide}>
            <Image source={{ uri: item.image }} style={styles.banner}/>
          </Card>
        );
  }
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
  const close = () => {
    setModalVisible(false);
  }

  const renderItem = ({ item, index }) => {
      return (
          <Card style={styles.catwidth}>
              <Image source={{ uri: item.image }} style={styles.imageb} />
              <TouchableOpacity onPress={()=>props.navigation.navigate('ProductDetailScreen')}>
                  <Text style={{ width: '100%', lineHeight: 24, textAlign: 'left', color: colors.dark }}>{item.name}</Text>
                  <AirbnbRating isDisabled={true} defaultRating={item.review} reviews={[]}
                      size={15}
                      selectedColor={colors.dark}
                      reviewSize={0}
                      starContainerStyle={{ padding: 0, margin: 0 }}
                      showRating={false}
                  />
                  <Text style={{ width: '100%', lineHeight: 24, textAlign: 'left', color: colors.dark, fontWeight: '600', fontSize: 14 }}>{item.discounted_price}</Text>
              </TouchableOpacity>
          </Card>
      );
  }

  return (
    <SafeAreaView style={[styles.mainContainer, { marginTop: 0 }]}>

      {products ?
        <ScrollView style={{ flex: 1, minHeight: 150, padding: 15, width: Dimensions.get('screen').width, backgroundColor: colors.light }}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <Bulkorder user={props.user}  close={close} product_id={products.id} />
            </View>
          </Modal>

          {selected && selected.original_url ? (
            <Image source={{ uri: selected.original_url }} style={{ width: '100%', height: 190, resizeMode: 'contain' }} ></Image>
          ) : null}
          
          <View style={{ flexDirection: 'row' }}>
              {products.media && selected && products.media.map((data, index) => {
                return (
                  <TouchableOpacity style={{ width: '23%', margin: '1%', height: 70 }} onPress={() => {
                    setselected(data);
                  }}>
                    <Image source={{ uri: data.original_url }} style={{ width: '100%', borderWidth: selected.original_url == data.original_url ? 1 : 0, borderColor: colors.primary, margin: '1%', height: 70, resizeMode: 'contain' }} ></Image>
                  </TouchableOpacity>
              )})}
          </View>
          <Text style={[styles.header, { width: '100%' }]}>{products.name}</Text>
          <View style={{ width: 130 }}>
              <AirbnbRating isDisabled={true} defaultRating={products.review} reviews={[]}
                  size={20}
                  reviewSize={0}
                  selectedColor={colors.warning}
                  starContainerStyle={{ padding: 0, margin: 0 }}
                  showRating={false}
              />
          </View>
          <Text style={{color: 'white'}}>{count}</Text>  
          <Text style={{ width: '100%', lineHeight: 34, textAlign: 'left', color: colors.dark, fontWeight: '600', fontSize: 16 }}>AED {products.discounted_price}</Text>
          <Text style={{ width: '100%', textAlign: 'left', color: '#7E7E7E', fontWeight: '400', fontSize: 12 }}>{products.description}</Text>
          <Divider width={0.5} color={colors.primary} />  
          <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
              {checkincart(products.id) ? (
                <View style={{ flexDirection: 'row', width: "40%" }}>
                  <TouchableOpacity style={styles.navbutton} onPress={() => {
                    var cart = props.cart;
                    var i;
                    cart.forEach((c, ind) => {
                      if (c.id == products.id) {
                        i = ind;
                      }
                    });
                    if (cart[i].selectedQty && cart[i].selectedQty > 1) {
                      cart[i].selectedQty--;
                      products.selectedQty = cart[i].selectedQty;
                    } else {
                      cart.splice(i, 1);
                      products.selectedQty = null;
                    }
                    props.updateCart(cart);
                    setcount(count + 1);
                    Toast.showWithGravity('Cart updated successfully', Toast.LONG, Toast.TOP);
                  }}><Text style={styles.darkcolor}>-</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.navbutton}><Text style={styles.darkcolor}>{getselectedqty(products.id)}</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.navbutton} onPress={() => {
                    var cart = props.cart;
                    cart.forEach((c, ind) => {
                      if (c.id == products.id && products.quantity_in_stock > cart[ind].selectedQty) {
                        cart[ind].selectedQty++;
                        products.selectedQty = cart[ind].selectedQty;
                        setproducts(products);
                        Toast.showWithGravity('Cart updated successfully', Toast.LONG, Toast.TOP);
                      } else if (c.id == products.id && products.quantity_in_stock <= cart[ind].selectedQty) {
                        Toast.showWithGravity('You can not add more then '+products.quantity_in_stock+ ' quantity', Toast.LONG, Toast.TOP);
                      }
                    });
                    props.updateCart(cart);
                    setcount(count + 1);
                  }}><Text style={styles.darkcolor}>+</Text></TouchableOpacity>
                </View>
              ) : products.quantity_in_stock > 0 ? (
                <TouchableOpacity style={[styles.buttonfull, { marginVertical: 0, padding: 8, width: '40%', marginLeft: 10 }]} onPress={() => {
                  var car = props.cart;
                  products.selectedQty = 1;
                  setproducts(products);
                  car.push(products);
                  props.updateCart(car);
                  setcount(count + 1);
                  Toast.showWithGravity('Successfully added to cart', Toast.LONG, Toast.TOP);
                }}>
                  <Text style={[styles.buttontext, { fontSize: 12 }]}>ADD TO CART</Text>
                </TouchableOpacity>
              ) : ( 
                <Text style={{width: "40%", color: colors.warning, paddingHorizontal: 10, paddingVertical: 10}}>Out of stock</Text>
              )}
              <TouchableOpacity style={[styles.buttonfull, { marginVertical: 0, padding: 8, width: '40%', marginLeft: 10 }]} onPress={() => {
                setModalVisible(!modalVisible);
              }}>
                <Text style={[styles.buttontext, { fontSize: 12 }]}>BULK ORDER</Text>
              </TouchableOpacity>

              {wishlist == 1 ? (
                <TouchableOpacity onPress={()=>{addtowishlist()}} style={{ width: '15%', alignItems: "flex-end", flexDirection: 'row', justifyContent: 'center' }}>
                  <Icon type="feather" name={"heart"} size={30} color={"red"} />
                </TouchableOpacity>
              ): (
                <TouchableOpacity onPress={()=>{addtowishlist()}} style={{ width: '15%', alignItems: "flex-end", flexDirection: 'row', justifyContent: 'center' }}>
                  <Icon type="feather" name={"heart"} size={30} color={colors.dark} />
                </TouchableOpacity>
              )}
          </View>
          <Divider width={0.5} color={colors.primary} />  
          <Tab
              value={index}
              onChange={(e) => setIndex(e)}
              indicatorStyle={{
                  backgroundColor: 'black',
                  height: 3,
              }}
              variant="primary"
          >
            <Tab.Item
                title="Details"
                titleStyle={{ fontSize: 12, color: colors.dark }}
                containerStyle={{backgroundColor: colors.light,borderBottomWidth: 0.5, borderBottomColor: colors.dark}}
            />
            <Tab.Item
                title="REVIEWS"
                titleStyle={{ fontSize: 12, color: colors.dark }}
                containerStyle={{backgroundColor: colors.light, borderBottomWidth: 0.5, borderBottomColor: colors.dark}}
            />
          </Tab>
          {index == 0 ?
            <View style={{marginBottom: 30}}>
              <Text style={{ width: '100%', lineHeight: 24, textAlign: 'left', color: colors.dark, fontWeight: '500', fontSize: 12 }}>Part No.: {products.sku}</Text>
              <Text style={{ width: '100%', lineHeight: 24, textAlign: 'left', color: colors.dark, fontWeight: '500', fontSize: 12 }}>UOM: {props.jsondata && props.jsondata['uom'] ? props.jsondata['uom'][products.color] : products.color}</Text>
              <Text style={{ width: '100%', lineHeight: 24, textAlign: 'left', color: colors.dark, fontWeight: '500', fontSize: 12 }}>Brand: {products.brand.name}</Text>
            </View>
            : 
            (
              <View style={{marginBottom: 30}}>
                {products.reviews && products.reviews.map((data, index) => {
                  return (
                    <View style={{paddingHorizontal : 10, borderBottomWidth: 0.6, marginTop: 10, borderBottomColor: colors.gray}}>
                      <View style={{ width: 130 }}>
                          <AirbnbRating isDisabled={true} defaultRating={data.rating} reviews={[]}
                              size={20}
                              reviewSize={0}
                              selectedColor={colors.warning}
                              starContainerStyle={{ padding: 0, margin: 0 }}
                              showRating={false}
                          />
                      </View>
                      <Text style={{ width: '100%', lineHeight: 34, textAlign: 'left', color: colors.dark, fontWeight: '500', fontSize: 12 }}>{data.message}</Text>
                    </View>
                  )
                })}
                {props.user.id ? 
                  <Card style={{paddingHorizontal : 10, borderBottomWidth: 0.6, marginTop: 20, borderBottomColor: colors.gray}}>
                    <Text style={{ width: '100%', lineHeight: 15, textAlign: 'left', color: colors.dark, fontWeight: '500', fontSize: 17 }}>
                      Write a review about the product</Text>
                    <View style={{ width: 130, marginBottom: 20 }}>
                        <AirbnbRating isDisabled={false} defaultRating={rating} reviews={[]}
                            size={20}
                            reviewSize={0}
                            onFinishRating={r => { setrating(r)}}
                            selectedColor={colors.warning}
                            starContainerStyle={{ padding: 0, margin: 0 }}
                            showRating={true}
                        />
                    </View>
                    <View style={{ marginBottom: 20, flexDirection: 'row' }}>
                      <Input
                          placeholder='Write review'
                          onChangeText={text => setreview(text)}
                          value={review}
                          containerStyle={[styles.inputcontainerstyle, {width: '68%'}]}
                          inputContainerStyle={styles.inputstyle}
                      />
                      <Button title={"Submit"} onPress={() => submitreview()} loading={rewloading} color={colors.success} size={"lg"} containerStyle={{marginLeft: 5, width: '30%'}} buttonStyle={{paddingVertical: 13, backgroundColor: colors.primary}}></Button>
                    </View>
                  </Card>
                  :
                    <Text style={{ width: '100%', lineHeight: 15, textAlign: 'left', color: colors.dark, fontWeight: '500', fontSize: 17 }}>
                      Login to give feedback</Text>
                }

              </View>
            )
          }

          {products && products.productsLike ?
            <View>
              <Text style={[styles.header, { width: '100%' }]}>Related Products</Text>
              <FlatList
                data={products.productsLike}
                horizontal={true}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={{width: Dimensions.get('screen').width}}
              />
            </View>
          : null}
        </ScrollView>
        : <ActivityIndicator size={"large"} color={colors.primary} />
      }
    </SafeAreaView>
  );
};
function mapStateToProps(state) {
  return {
    cart: state.cartReducer,
    user: state.userReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    updateUser: (cart) => dispatch({ type: "UPDATE_USER", user: cart }),
    updateCart: (cart) => dispatch({ type: "UPDATE_CART", cart: cart }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailScreen);
