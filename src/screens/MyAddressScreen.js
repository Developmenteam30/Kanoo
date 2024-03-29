import React, {useEffect, useState} from 'react';
import {Image, FlatList, SafeAreaView, Text, KeyboardAvoidingView, Platform, View, Dimensions, TouchableOpacity} from 'react-native';
import { Divider, Icon, Card } from 'react-native-elements';
import styles from '../styles/LoginScreenStyle';
import { Images } from '../utils/Images';
import { colors } from '../utils/Variables';
import api from "../utils/Api";
import { connect } from "react-redux";
import { useIsFocused } from '@react-navigation/native';

const MyAddressScreen = (props) => {
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
  const isFocused = useIsFocused();
  const [address, setaddress] = useState([]);
  const [method, setmethod] = useState('address');
  const apicall = async () => {
    var cate = await api.getapi("getaddress");
    if (cate && cate.status == '1') {
      // console.log('cate: ', cate);
      setaddress(cate.data);
    } else {
      // console.log(cate);
    }
  };
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

  useEffect(() => {
    apicall();
    if (props.route.params && props.route.params.method) {
      setmethod(props.route.params.method);
    }
    
    return ()=>{}
  }, [props, isFocused])

  const renderItem = ({ item, index }) => {
        return (
          <TouchableOpacity onPress={() => {
            console.log(method);
              if (method == 'checkout') {
                props.navigation.replace('Ordersummery', {address: item});
              } else {
                props.navigation.navigate('MyAddressAddScreen', {address: item})
              }
            }}>
            <Card>
                <View style={[styles.cartitem]}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{width: '65%'}}>
                            <Text style={{ width: '100%', fontSize: 16, fontWeight: '600', lineHeight: 24, textAlign: 'left', color: colors.dark, paddingTop: 12 }}>{getname(item.company_name)}</Text>
                        </View>
                        {method == 'address' && (
                          <Icon name={"edit"} type={"feather"} size={15} color={colors.dark} style={{paddingTop: 15}}/>
                        )}
                    </View>
                    <Text style={{ width: '100%', lineHeight: 24, textAlign: 'left', color: colors.dark, paddingTop: 12 }}>Company: {getcname(item.company_name)}</Text>
                    <Text style={{ width: '100%', lineHeight: 24, textAlign: 'left', color: colors.dark, paddingTop: 12 }}>{item.apartment+' '+item.city+' '+item.street+' '+item.city+' '+item.state+' '+item.country+' '+item.zip_code}</Text>
                </View>
            </Card>
          </TouchableOpacity>
        );
    }

    return (
      <SafeAreaView style={[styles.mainContainer, {backgroundColor: colors.light}]}>
        <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>
            <FlatList
                data={address}
                numColumns={1}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={{width: Dimensions.get('screen').width}}
            />
            <TouchableOpacity style={[styles.buttonfull, {width: '90%', marginLeft: '5%'}]} onPress={()=>props.navigation.navigate('MyAddressAddScreen')}>
                <Text style={styles.buttontext}>Add New Address</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default MyAddressScreen;
