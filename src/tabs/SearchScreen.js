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
              <Image source={{ uri: item.image != '' ? item.image : "https://web.techinfomatic.com/assets/no-image.png" }} style={styles.imageb} />
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
