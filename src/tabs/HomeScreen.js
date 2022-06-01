import React, {useEffect, useRef, useState} from 'react';
import {Image, ImageBackground, SafeAreaView, Text, KeyboardAvoidingView, Platform, View, ScrollView, TouchableOpacity, Dimensions, FlatList} from 'react-native';
import { Card, Divider, Input } from 'react-native-elements';
import styles from '../styles/HomeScreenStyle';
import { Images } from '../utils/Images';
import { colors } from '../utils/Variables';
import Carousel from 'react-native-snap-carousel';
import { Pagination } from 'react-native-snap-carousel';
const {width, height} = Dimensions.get('window');

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
          <Text style={{width: '100%', textAlign: 'center', color: colors.dark}}>{item.name}</Text>
        </Card>
      );
  }

const HomeScreen = ({ navigation }) => {
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;
  var _carousel = useRef(null);
  const [slider, setslider] = useState([
    {
      id: 0,
      name: 'GOLDEN GRID.',
      description: 'KANOO MACHINERY THE GCC REGION.',
      image: 'https://web.techinfomatic.com/kanoo/demo3/php/assets/kanoo/Images/EN_Bobcat_Aftermarket_endyear_NL_1200x508.jpg'
    },
  ]);
  const [category, setCategory] = useState([
    {
      id: 0,
      name: 'Perkins',
      image: 'https://web.techinfomatic.com/kanoo/demo3/php/assets/images/demoes/demo26/products/6.png'
    },
    {
      id: 1,
      name: 'Hyster',
      image: 'https://web.techinfomatic.com/kanoo/demo3/php/assets/images/demoes/demo26/products/3.png'
    },
    {
      id: 2,
      name: 'Bobcat',
      image: 'https://web.techinfomatic.com/kanoo/demo3/php/assets/images/demoes/demo26/products/1.png'
    },
    {
      id: 3,
      name: 'Grove',
      image: 'https://web.techinfomatic.com/kanoo/demo3/php/assets/images/demoes/demo26/products/2.png'
    },
    {
      id: 4,
      name: 'Massey Fergusson',
      image: 'https://web.techinfomatic.com/kanoo/demo3/php/assets/images/demoes/demo26/products/5.png'
    },
    {
      id: 5,
      name: 'Tennant',
      image: 'https://web.techinfomatic.com/kanoo/demo3/php/assets/images/demoes/demo26/products/8.png'
    },
    {
      id: 6,
      name: 'Lincoln',
      image: 'https://web.techinfomatic.com/kanoo/demo3/php/assets/images/demoes/demo26/products/4.png'
    },
    {
      id: 7,
      name: 'Sullair',
      image: 'https://web.techinfomatic.com/kanoo/demo3/php/assets/images/demoes/demo26/products/7.png'
    },
  ])
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={{flex:1, minHeight: 250}}>
        <Carousel
          ref={(c) => { _carousel = c; }}
          data={slider}
          renderItem={_renderItem}
          sliderWidth={width}
          itemWidth={width}
        />
        <View style={{padding: 15}}>
          <Text style={styles.headertext}>Our Brands</Text>
        </View>
      </View>
      <FlatList
        data={category}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={{width: Dimensions.get('screen').width}}
      />
    </SafeAreaView>
  );
};
export default HomeScreen;
