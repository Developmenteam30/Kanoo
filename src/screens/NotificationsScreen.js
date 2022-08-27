import React, {useEffect, useState} from 'react';
import {Image, FlatList, SafeAreaView, Text, KeyboardAvoidingView, Platform, View, Dimensions, TouchableOpacity} from 'react-native';
import { Divider, Input, Card } from 'react-native-elements';
import styles from '../styles/LoginScreenStyle';
import { Images } from '../utils/Images';
import { colors } from '../utils/Variables';
import api from "../utils/Api";
import { connect } from "react-redux";

const NotificationsScreen = (props) => {
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
  const [products, setProducts] = useState();
  const apicall = async () => {
    var cate = await api.getapi("getorders");
    if (cate && cate.order) {
        setProducts(cate.order);
        console.log(cate);
    } else {
      console.log(cate);
    }
  };
  const usercheck = async () => {
      if (!props.user.name) {
          props.navigation.navigate('LoginScreen');
      }
  }

  useEffect(() => {
    usercheck();
    apicall();
    return ()=>{}
  }, [])
    const renderItem = ({ item, index }) => {
      return (
        <TouchableOpacity onPress={() => {
          props.navigation.navigate('Ordersummery', {order: item})
          }}>
            <Card>
                <View style={[styles.cartitem]}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{width: '100%'}}>
                            <Text style={{ width: '100%', fontWeight: 'bold', fontSize: 17, lineHeight: 24, textAlign: 'left', color: colors.dark, paddingTop: 12 }}>Order Placed successfully</Text>
                              <Text style={{ width: '100%', lineHeight: 12, textAlign: 'left', color: colors.dark, paddingTop: 12 }}>{api.settimeformat(item.created_at)}
                                <Text style={{ width: '100%', lineHeight: 16, textAlign: 'left', color: colors.success, paddingTop: 12, marginLeft: 20 }}> {item.status}</Text>
                              </Text>
                            <Text style={{ width: '100%', lineHeight: 15, textAlign: 'left', color: colors.dark, paddingTop: 12 }}> Id: {item.id}, Total Amount: AED {item.total_price}</Text>
                        </View>
                    </View>
                </View>
            </Card>
          </TouchableOpacity>
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
function mapStateToProps(state) {
  return {
    user: state.userReducer,
    jsondata: state.jsondataReducer
  };
}
function mapDispatchToProps(dispatch) {
  return {
      updateUser: (cart) => dispatch({ type: "UPDATE_USER", user: cart }),
      updateJsondata: (data) => dispatch({ type: "UPDATE_jsondata", jsondata: data }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsScreen);
