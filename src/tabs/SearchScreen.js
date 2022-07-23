import React, {useEffect, useRef, useState} from 'react';
import {Image, ImageBackground, SafeAreaView, Text, KeyboardAvoidingView, Platform, View, ScrollView, TouchableOpacity, Dimensions, FlatList} from 'react-native';
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
  var _carousel = useRef(null);
  const [products, setproducts] = useState([
    {
      id: 0,
      name: 'Product Store Name',
      price: '$101.0-$102.5',
      rating: 4,
      image: 'https://web.techinfomatic.com/kanoo/demo3/php/assets/kanoo/Images/Perkins/A001211B.jpg'
    },
    
  ]);
  const apicall = async () => {
    var cate = await api.getapi("featureproducts");
    if (cate) {
      setproducts(cate);
    }
  };
  useEffect(() => {
    apicall();
    return ()=>{}
  }, [])
  const _renderItem = ({ item, index }) => {
        return (
          <Card style={styles.slide}>
            <Image source={{ uri: item.image }} style={styles.banner}/>
          </Card>
        );
  }
  const renderItem = ({ item, index }) => {
      return (
          <Card style={styles.catwidth}>
              <Image source={{ uri: item.image }} style={styles.imageb} />
              <TouchableOpacity onPress={() => props.navigation.navigate('ProductDetailScreen', {product: item})}>
                <Text style={{ width: '100%', lineHeight: 24, textAlign: 'left', color: colors.dark }}>{item.name}</Text>
                <Text style={{ width: '100%', lineHeight: 24, textAlign: 'left', color: colors.dark, fontWeight: '400', fontSize: 10 }}>{props.jsondata && props.jsondata['uom'] ? props.jsondata['uom'][item.color] : item.color}</Text>
                <Text style={{ width: '100%', lineHeight: 24, textAlign: 'left', color: colors.dark, fontWeight: '600', fontSize: 14 }}>AED {item.discounted_price}</Text>
                <AirbnbRating isDisabled={true} defaultRating={item.review} reviews={[]}
                    size={15}
                    selectedColor={colors.dark}
                    reviewSize={0}
                    starContainerStyle={{ padding: 0, margin: 0 }}
                    showRating={false}
                />
              </TouchableOpacity>
          </Card>
      );
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={{flex:1, minHeight: 150}}>
        <Carousel
          ref={(c) => { _carousel = c; }}
          data={props.category}
          renderItem={_renderItem}
          sliderWidth={width}
          itemWidth={width}
        />
      </View>
      <FlatList
        data={products}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={() => {
            return (
            <View style={{paddingHorizontal: 15}}>
                <Input
                    placeholder='Search'
                    containerStyle={styles.inputcontainerstyle}
                    inputContainerStyle={styles.inputstyle}
                    leftIcon={{ type: 'feather', name: 'search' }}
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
