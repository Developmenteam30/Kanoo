import React, {useEffect, useRef, useState} from 'react';
import {Image, ImageBackground, SafeAreaView, Text, KeyboardAvoidingView, Platform, View, ScrollView, TouchableOpacity, Dimensions, FlatList} from 'react-native';
import { Card, Divider, Input } from 'react-native-elements';
import styles from '../styles/HomeScreenStyle';
import { Images } from '../utils/Images';
import { colors } from '../utils/Variables';
import Carousel from 'react-native-snap-carousel';
import { Pagination } from 'react-native-snap-carousel';
import api from "../utils/Api";
import { connect } from "react-redux";

const { width, height } = Dimensions.get('window');


const HomeScreen = (props) => {
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;
  var _carousel = useRef(null);
  const apicall = async () => {
    var cate = await api.getapi("brands");
    if (cate && cate.data) {
      props.updateCaregory(cate.data);
      props.updateJsondata(cate.jsondata);
    }
  };
  const _renderItem = ({ item, index }) => {
      return (
        <Card style={styles.slide} containerStyle={{ padding: 5 }}>
          <TouchableOpacity onPress={()=>props.navigation.navigate('HomeScreen', {screen: 'Search'})}>
            <Image source={{ uri: global.base_url + item.image_1 }} style={styles.banner} />
          </TouchableOpacity>
        </Card>
      );
  }
  const renderItem = ({ item, index }) => {
    return (
        <TouchableOpacity onPress={()=>props.navigation.navigate('HomeScreen', {screen: 'Search', params: {category: item, categoryIndex: index}})}>
          <Card containerStyle={styles.catwidth}>
            <Image source={{ uri: item.image }} style={styles.imageb} />
            {/* <Text style={{width: '100%', textAlign: 'center', color: colors.dark}}>{item.name}</Text> */}
          </Card>
        </TouchableOpacity>
      );
  }

  useEffect(() => {
    apicall();
    return ()=>{}
  }, [])
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={{ flex: 1, minHeight: 245 }}>
        {props.jsondata && props.jsondata.home_slider && props.jsondata.home_slider.images ?
          <Carousel
            ref={(c) => { _carousel = c; }}
            data={[props.jsondata.home_slider.images]}
            renderItem={_renderItem}
            sliderWidth={width}
            itemWidth={width}
          />
          : null
        }
        <View style={{padding: 15}}>
          <Text style={styles.headertext}>Our Brands</Text>
        </View>
      </View>
      <FlatList
        data={props.category}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={{width: Dimensions.get('screen').width}}
      />
    </SafeAreaView>
  );
};
function mapStateToProps(state) {
  return {
    user: state.userReducer,
    category: state.categoryReducer,
    jsondata: state.jsondataReducer
  };
}
function mapDispatchToProps(dispatch) {
  return {
      updateUser: (cart) => dispatch({ type: "UPDATE_USER", user: cart }),
      updateCaregory: (data) => dispatch({ type: "UPDATE_CATEGORY", category: data }),
      updateJsondata: (data) => dispatch({ type: "UPDATE_jsondata", jsondata: data }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
