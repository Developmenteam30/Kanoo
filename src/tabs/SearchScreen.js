import React, {useEffect, useRef, useState} from 'react';
import {Image, ImageBackground, SafeAreaView, Text, KeyboardAvoidingView, Platform, View, ScrollView, TouchableOpacity, Dimensions, FlatList} from 'react-native';
import { Card, AirbnbRating, Input } from 'react-native-elements';
import styles from '../styles/SearchScreenStyle';
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


const SearchScreen = ({ navigation }) => {
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
    {
      id: 1,
      name: 'Product Store Name',
      price: '$101.0-$102.5',
      rating: 4,
      image: 'https://web.techinfomatic.com/kanoo/demo3/php/assets/kanoo/Images/Bobcat/Alternator.jpg'
    },
    {
      id: 2,
      name: 'Product Store Name',
      price: '$101.0-$102.5',
      rating: 4,
      image: 'https://web.techinfomatic.com/kanoo/demo3/php/assets/kanoo/Images/Perkins/A010164A.jpg'
    },
    {
      id: 3,
      name: 'Product Store Name',
      price: '$101.0-$102.5',
      rating: 4,
      image: 'https://web.techinfomatic.com/kanoo/demo3/php/assets/kanoo/Images/Perkins/A010388B.jpg'
    },
    {
      id: 4,
      name: 'Product Store Name',
      price: '$101.0-$102.5',
      rating: 4,
      image: 'https://web.techinfomatic.com/kanoo/demo3/php/assets/kanoo/Images/Perkins/A001211B.jpg'
    },
    {
      id: 5,
      name: 'Product Store Name',
      price: '$101.0-$102.5',
      rating: 4,
      image: 'https://web.techinfomatic.com/kanoo/demo3/php/assets/kanoo/Images/Perkins/A001211B.jpg'
    },
    {
      id: 6,
      name: 'Product Store Name',
      price: '$101.0-$102.5',
      rating: 4,
      image: 'https://web.techinfomatic.com/kanoo/demo3/php/assets/kanoo/Images/Perkins/A001211B.jpg'
    },
    {
      id: 7,
      name: 'Product Store Name',
      price: '$101.0-$102.5',
      rating: 4,
      image: 'https://web.techinfomatic.com/kanoo/demo3/php/assets/kanoo/Images/Perkins/A001211B.jpg'
    },
    {
      id: 8,
      name: 'Product Store Name',
      price: '$101.0-$102.5',
      rating: 4,
      image: 'https://web.techinfomatic.com/kanoo/demo3/php/assets/kanoo/Images/Perkins/A001211B.jpg'
    },
    {
      id: 9,
      name: 'Product Store Name',
      price: '$101.0-$102.5',
      rating: 4,
      image: 'https://web.techinfomatic.com/kanoo/demo3/php/assets/kanoo/Images/Perkins/A001211B.jpg'
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
  const renderItem = ({ item, index }) => {
      return (
          <Card style={styles.catwidth}>
              <Image source={{ uri: item.image }} style={styles.imageb} />
              <TouchableOpacity onPress={()=>navigation.navigate('ProductDetailScreen')}>
                  <Text style={{ width: '100%', lineHeight: 24, textAlign: 'left', color: colors.dark }}>{item.name}</Text>
                  <AirbnbRating isDisabled={true} defaultRating={4} reviews={[]}
                      size={15}
                      selectedColor={colors.dark}
                      reviewSize={0}
                      starContainerStyle={{ padding: 0, margin: 0 }}
                      showRating={false}
                  />
                  <Text style={{ width: '100%', lineHeight: 24, textAlign: 'left', color: colors.dark, fontWeight: '600', fontSize: 14 }}>{item.price}</Text>
              </TouchableOpacity>
          </Card>
      );
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={{flex:1, minHeight: 150}}>
        <Carousel
          ref={(c) => { _carousel = c; }}
          data={category}
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
export default SearchScreen;
