import React, {useEffect, useState} from 'react';
import {Image, FlatList, SafeAreaView, Text, KeyboardAvoidingView, Platform, View, Dimensions, TouchableOpacity, Alert, ActivityIndicator} from 'react-native';
import { Divider, Input, Card, Chip } from 'react-native-elements';
import styles from '../styles/LoginScreenStyle';
import { Images } from '../utils/Images';
import { colors } from '../utils/Variables';
import api from "../utils/Api";
import { connect } from "react-redux";
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-simple-toast';

const Ordersummery = (props) => {
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
    const [products, setProducts] = useState();
    const [address, setaddress] = useState(null);
    const [subtotal, setsubtotal] = useState(0);
    const [total, settotal] = useState(0);
    const [tax, settax] = useState(0);
    const [qty, setqty] = useState(0);
    const [order, setorder] = useState(null);
    const [submitload, setsubmitload] = useState(false);
    const placeorder = async () => {
        setsubmitload(true);
        var order = {
            'items': JSON.stringify(products),
            'address': JSON.stringify(address),
            'total': subtotal,
            'order_note': '',
            'qty': qty,
        };
        var cate = await api.postapi(order,"placeorder");
        if (cate && cate.success) {
            props.updateCart([]);
            props.navigation.replace('Success');
            setsubmitload(false);
        } else if (cate && cate.message) {
            console.log(cate.message);
            Alert.alert(cate.message);
            setsubmitload(false);
        }
    };
    const cancelorder = async () => {
          Alert.alert(
            "Cancel Order",
            "Are you sure!",
            [
            {
                text: "Cancel Now",
                onPress: async () => {
                    var orders = {
                        'id': order.id,
                        'status': 'Canceled',
                    };
                    var cate = await api.postapi(orders,"updateorder");
                    if (cate && cate.success) {
                        var o = order;
                        o.status = 'Canceled';
                        setorder(o);
                        Toast.showWithGravity(cate.message, Toast.LONG, Toast.TOP);
                        props.navigation.goBack();
                    } else if (cate && cate.message) {
                        Toast.showWithGravity(cate.message+'Something went wrong! Please try again later', Toast.LONG, Toast.TOP);
                    }
                },
                style: "cancel",
            },
            {
                text: "Dismiss",
                onPress: () => { },
                style: "cancel",
            },
            ],
            {
                cancelable: true,
                onDismiss: () => { }
            }
        );
    }
    useEffect(() => {
        if (props.route.params && props.route.params.address) {
            setaddress(props.route.params.address);
            setProducts(props.cart);
            var total = 0;
            var q = 0;
            props.cart.forEach(e => {
                total += e.selectedQty * e.discounted_price;
                q += e.selectedQty;
            });
            var tax = total * props.jsondata['tax'] / 100
            setsubtotal(total.toFixed(2));
            settax(tax.toFixed(2));
            setqty(q);
            settotal((total + tax).toFixed(2));
        }
        if (props.route.params && props.route.params.order) {
            setorder(props.route.params.order);
            // console.log(props.route.params.order);
            setsubtotal(parseFloat(props.route.params.order.sub_total_price).toFixed(2));
            settax(parseFloat(props.route.params.order.tax).toFixed(2));
            setqty(parseFloat(props.route.params.order.total_quantity).toFixed(2));
            settotal(parseFloat(props.route.params.order.total_price).toFixed(2));
        }
        
        return ()=>{}
    }, [])
    const renderItems = ({ item, index }) => {
        return (
            <Card>
                <View style={[styles.cartitems]}>
                    <View style={{ flexDirection: 'row', width: '20%', borderRightWidth : 0.3, borderRightColor: 'gray', padding:5 }}>
                        <Text style={{ width: '100%', lineHeight: 84, textAlign: 'center', color: colors.dark, fontWeight: '600', fontSize: 15 }}>{index+1}</Text>
                    </View>
                    <View style={{width: '45%', borderRightWidth: 0.3, borderRightColor: 'gray', padding:5}}>
                        <Text style={{ width: '100%', lineHeight: 24, textAlign: 'left', color: colors.dark, paddingTop: 2 }}>{item.product.name}</Text>
                        <Text style={{ width: '100%', lineHeight: 16, textAlign: 'left', color: colors.dark, paddingTop: 2 }}>Part No.: {item.product.sku}</Text>
                        <Text style={{ width: '100%', lineHeight: 16, textAlign: 'left', color: colors.dark, paddingTop: 2 }}>Brand: {item.product.brand.name}</Text>
                        <Text style={{ width: '100%', lineHeight: 16, textAlign: 'left', color: colors.dark, paddingTop: 2 }}>UOM: {props.jsondata && props.jsondata['uom'] ? props.jsondata['uom'][item.product.color] : item.product.color}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', width: '20%', borderRightWidth: 0.3, borderRightColor: 'gray', padding:5 }}>
                        <Text style={{ width: '100%', lineHeight: 84, textAlign: 'right', color: colors.dark, fontWeight: '600', fontSize: 15 }}>{item.quantity}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', width: '20%', padding:5 }}>
                        <Text style={{ width: '100%', lineHeight: 84, textAlign: 'right', color: colors.dark, fontWeight: '600', fontSize: 15 }}>{item.price}</Text>
                    </View>
                </View>
            </Card>
        );
    }
    const renderItem = ({ item, index }) => {
        return (
            <Card>
                <View style={[styles.cartitems]}>
                    <Image source={{ uri: item.image != "" ? item.image : "https://web.techinfomatic.com/assets/no-image.png" }} style={[styles.imagebs, {borderRightWidth : 0.3, borderRightColor: 'gray', padding:5}]} />
                    <View style={{width: '45%', borderRightWidth : 0.3, borderRightColor: 'gray', padding:5}}>
                        <Text style={{ width: '100%', lineHeight: 24, textAlign: 'left', color: colors.dark, paddingTop: 2 }}>{item.name}</Text>
                        <Text style={{ width: '100%', lineHeight: 16, textAlign: 'left', color: colors.dark, paddingTop: 2 }}>Part No.: {item.sku}</Text>
                        <Text style={{ width: '100%', lineHeight: 16, textAlign: 'left', color: colors.dark, paddingTop: 2 }}>Brand: {item.brand.name}</Text>
                        <Text style={{ width: '100%', lineHeight: 16, textAlign: 'left', color: colors.dark, paddingTop: 2 }}>UOM: {props.jsondata && props.jsondata['uom'] ? props.jsondata['uom'][item.color] : item.color}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', width: '20%', borderRightWidth : 0.3, borderRightColor: 'gray', padding:5 }}>
                        <Text style={{ width: '100%', lineHeight: 84, textAlign: 'right', color: colors.dark, fontWeight: '600', fontSize: 12 }}>{item.selectedQty + 'x' + item.discounted_price}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', width: '20%', padding:5 }}>
                        <Text style={{ width: '100%', lineHeight: 84, textAlign: 'right', color: colors.dark, fontWeight: '600', fontSize: 15 }}>{item.selectedQty*item.discounted_price}</Text>
                    </View>
                </View>
            </Card>
        );
    }
  const getname = (name) => {
    var s = name.split("*");
    var n = s[0].split(" ");
    return (n.length > 0 ? n[0] : "") + ' '+(n.length > 1 ? n[1] : "");
  }
  const getcname = (name) => {
    var s = name.split("*");
    return (s.length > 1 ? s[1] : "");
  }
  const getcaddname = (name) => {
    var s = name.split("*");
    return (s.length > 2 ? s[2] : "");
  }

    const headercon = () => {return (
        <Card containerStyle={{backgroundColor: colors.white}}>
            <View style={[styles.cartitems]}>
                <View style={{width: '20%', borderRightWidth : 0.3, borderRightColor: 'gray', padding:5}}>
                    <Text adjustsFontSizeToFit={true} numberOfLines={1} style={{ width: '100%', lineHeight: 24, textAlign: 'left', color: colors.dark, paddingTop: 2, fontWeight: '600' }}>Item #</Text>
                </View>
                <View style={{width: '45%', borderRightWidth : 0.3, borderRightColor: 'gray', padding:5}}>
                    <Text adjustsFontSizeToFit={true} numberOfLines={1} style={{ width: '100%', lineHeight: 24, textAlign: 'left', color: colors.dark, fontWeight: '600', paddingTop: 2 }}>Description</Text>
                </View>
                <View style={{ flexDirection: 'row', width: '20%', borderRightWidth : 0.3, borderRightColor: 'gray', padding:5 }}>
                    <Text adjustsFontSizeToFit={true} numberOfLines={1} style={{ width: '100%', lineHeight: 24, textAlign: 'right', color: colors.dark, fontWeight: '600', fontSize: 12 }}>Quantity</Text>
                </View>
                <View style={{ flexDirection: 'row', width: '20%', padding:5 }}>
                    <Text adjustsFontSizeToFit={true} numberOfLines={1} style={{width: '100%', lineHeight: 24, textAlign: 'right', color: colors.dark, fontWeight: '600', fontSize: 12 }}>Total</Text>
                </View>
            </View>
        </Card>
    )
    }
    const footerco = () => {
        return (
            <Card>
                <View style={styles.cartitems}>
                    <Text style={styles.headertext}>Subtotal</Text>
                    <Text style={styles.headervalue}>AED {subtotal}</Text>
                </View>
                <View style={styles.cartitems}>
                    <Text style={styles.headertext}>Tax</Text>
                    <Text style={styles.headervalue}>AED {tax}</Text>
                </View>
                <View style={styles.cartitems}>
                    <Text style={styles.headertext}>Total</Text>
                    <Text style={styles.headervalue}>AED {total}</Text>
                </View>

                {order ? (
                    <View>
                        {order.status == 'Pending' && (
                            <TouchableOpacity style={[styles.buttonfull, { width: '100%', marginLeft: '0%' }]} onPress={() => cancelorder()}>
                                <Text style={styles.buttontext}>Cancel Order</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                ) :
                    submitload ? (
                        <TouchableOpacity style={[styles.buttonfull, { width: '100%', marginLeft: '0%', backgroundColor: 'white' }]}>
                            <ActivityIndicator size={'large'} color={'black'} />
                        </TouchableOpacity>
                    ) : (
                    <TouchableOpacity style={[styles.buttonfull, { width: '100%', marginLeft: '0%' }]} onPress={() => placeorder()}>
                        <Text style={styles.buttontext}>Place Order</Text>
                    </TouchableOpacity>
                )}
            </Card>
        )
    }
    return (
        <SafeAreaView style={[styles.mainContainer, {backgroundColor: colors.light}]}>
            <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>
                {address ?
                    <Card>
                        <View style={[styles.cartitem]}>
                            <Text style={{fontSize: 20, fontWeight: 'bold', color: colors.dark}}>Delivery address: </Text>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{width: '65%'}}>
                                    <Text style={{ width: '100%', fontSize: 15, fontWeight: '600', lineHeight: 18, textAlign: 'left', color: colors.dark, paddingTop: 12 }}>{getname(address.company_name)}</Text>
                                </View>
                            </View>
                            <Text style={{ width: '100%', lineHeight: 15, textAlign: 'left', color: colors.dark, paddingTop: 12 }}>Company: {getcname(address.company_name)}</Text>
                            <Text style={{ width: '100%', lineHeight: 20, textAlign: 'left', color: colors.dark, paddingTop: 0 }}>{address.apartment+' '+address.city+' '+address.street+' '+address.city+' '+address.state+' '+address.country+' '+address.zip_code}</Text>
                        </View>
                    </Card>
                    : null 
                }
                {order ?
                    <Card>
                        <View style={[styles.cartitem]}>
                            <View style={styles.cartitems}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.dark, width: '60%' }}>Order Details:
                                </Text>
                                <View style={{width: '40%'}}>
                                    <Chip
                                    ViewComponent={LinearGradient} // Don't forget this!
                                    linearGradientProps={{
                                        colors: ['red', 'green'],
                                        start: { x: 0, y: 0.5 },
                                        end: { x: 1, y: 0.5 },
                                    }}
                                    title={order.status}
                                    />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{width: '65%'}}>
                                    <Text style={{ width: '100%', fontSize: 15, fontWeight: '600', lineHeight: 18, textAlign: 'left', color: colors.dark, paddingTop: 12 }}>Order date: {api.formatDate(order.created_at)}</Text>
                                </View>
                            </View>
                            <Text style={{ width: '100%', textTransform: 'capitalize', lineHeight: 20, textAlign: 'left', color: colors.dark, paddingTop: 12 }}>Payment Method: {order.payment_method}</Text>
                            <Text style={{ width: '100%', textTransform: 'capitalize', lineHeight: 20, textAlign: 'left', color: colors.dark, paddingTop: 12 }}>Order Status: {order.status}</Text>
                        </View>
                    </Card>
                    : null 
                }
                <Text style={{ textAlign: 'left', fontSize: 17, fontWeight: 'bold', color: colors.dark, paddingTop: 12, paddingHorizontal: 12 }}>Currency: AED </Text>


                {order ? (
                    <FlatList
                        ListHeaderComponent={headercon}
                        data={order.order_items}
                        numColumns={1}
                        renderItem={renderItems} 
                        keyExtractor={item => item.id}
                        style={{ width: Dimensions.get('screen').width }}
                        ListFooterComponent={footerco}
                    />
                ) : (
                    <FlatList
                        ListHeaderComponent={headercon}
                        data={products}
                        numColumns={1}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        style={{width: Dimensions.get('screen').width}}
                        ListFooterComponent={footerco}
                    />
                )}

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};
function mapStateToProps(state) {
  return {
    cart: state.cartReducer,
    user: state.userReducer,
    jsondata: state.jsondataReducer
  };
}
function mapDispatchToProps(dispatch) {
  return {
    updateCart: (cart) => dispatch({ type: "UPDATE_CART", cart: cart }),
    updateUser: (cart) => dispatch({ type: "UPDATE_USER", user: cart }),
    updateJsondata: (data) => dispatch({ type: "UPDATE_jsondata", jsondata: data }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Ordersummery);
