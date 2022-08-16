import React, {useEffect, useState} from 'react';
import {Image, FlatList, SafeAreaView, Text, KeyboardAvoidingView, Platform, View, Dimensions, TouchableOpacity} from 'react-native';
import { Divider, Input, Card } from 'react-native-elements';
import styles from '../styles/LoginScreenStyle';
import { Images } from '../utils/Images';
import { colors } from '../utils/Variables';
import api from "../utils/Api";
import { connect } from "react-redux";

const MyOrderScreen = (props) => {
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
  const [products, setProducts] = useState();
  const apicall = async () => {
    var cate = await api.getapi("getorders");
    if (cate && cate.order) {
      setProducts(cate.order);
    } else {
      console.log(cate);
    }
  };

  useEffect(() => {
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
                        <View style={{width: '55%'}}>
                            <Text style={{ width: '100%', fontWeight: 'bold', fontSize: 17, lineHeight: 24, textAlign: 'left', color: colors.dark, paddingTop: 12 }}>Order Id: {item.id}</Text>
                            <Text style={{ width: '100%', lineHeight: 24, textAlign: 'left', color: colors.dark, paddingTop: 12 }}>Total Amount</Text>
                            <Text style={{ width: '100%', lineHeight: 24, textAlign: 'left', color: colors.dark, fontWeight: '600', fontSize: 15 }}>AED {item.total_price}</Text>
                        </View>
                        <View style={{width: '45%'}}>
                            <Text style={{ width: '100%', lineHeight: 18, textAlign: 'right', color: colors.dark, paddingTop: 12 }}>{api.settimeformat(item.created_at)}</Text>
                            <Text style={{ width: '100%', lineHeight: 16, textAlign: 'right', color: colors.success, paddingTop: 12 }}>{item.status}</Text>
                            <Text style={{ width: '100%', lineHeight: 24, textAlign: 'center', color: colors.dark, paddingVertical: 5, marginTop: 7, borderColor: colors.dark, borderRadius: 20, borderWidth: 0.6 }}>View details</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(MyOrderScreen);
