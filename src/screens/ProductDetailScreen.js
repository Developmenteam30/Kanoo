import React, {useEffect, useRef, useState} from 'react';
import {Image, ImageBackground, SafeAreaView, Text, KeyboardAvoidingView, Platform, View, ScrollView, TouchableOpacity, Dimensions, FlatList} from 'react-native';
import { Card, AirbnbRating, Divider, Icon, Tab } from 'react-native-elements';
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


const ProductDetailScreen = ({ navigation }) => {
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;
    var _carousel = useRef(null);
  const [index, setIndex] = React.useState(0);
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
    <SafeAreaView style={[styles.mainContainer, {marginTop: 0}]}>
      <ScrollView style={{ flex: 1, minHeight: 150, padding: 15, width: Dimensions.get('screen').width, backgroundColor: colors.light }}>
        <Image source={{ uri: products[0].image }} style={{ width: '100%', height: 190, resizeMode: 'contain' }} ></Image>
        <View style={{ flexDirection: 'row' }}>
            <Image source={{ uri: products[0].image }} style={{ width: '23%', borderWidth: 1, borderColor: colors.primary, margin: '1%', height: 70, resizeMode: 'contain' }} ></Image>
            <Image source={{ uri: products[1].image }} style={{ width: '23%', margin: '1%', height: 70, resizeMode: 'contain' }} ></Image>
            <Image source={{ uri: products[2].image }} style={{ width: '23%', margin: '1%', height: 70, resizeMode: 'contain' }} ></Image>
            <Image source={{ uri: products[3].image }} style={{ width: '23%', margin: '1%', height: 70, resizeMode: 'contain' }} ></Image>
        </View>
        <Text style={[styles.header, { width: '100%' }]}>Product Short Name</Text>
        <View style={{ width: 130 }}>
            <AirbnbRating isDisabled={true} defaultRating={4} reviews={[]}
                size={20}
                reviewSize={0}
                selectedColor={colors.warning}
                starContainerStyle={{ padding: 0, margin: 0 }}
                showRating={false}
            />
        </View>
        <Text style={{ width: '100%', lineHeight: 34, textAlign: 'left', color: colors.dark, fontWeight: '600', fontSize: 16 }}>$1,699.00</Text>
        <Text style={{ width: '100%', textAlign: 'left', color: '#7E7E7E', fontWeight: '400', fontSize: 12 }}>Combilift are revolutionizing the way companies handle and store goods. We help companies of all sizes and from every industry to maximize the capacity, safety and efficiency of their warehouse and storage facilities.</Text>
        <View style={{ flexDirection: 'row' }}>
            <Text style={{ width: '40%', lineHeight: 34, textAlign: 'left', color: colors.dark, fontWeight: '500', fontSize: 12 }}>SKU: 654613612</Text>
            <Text style={{ width: '40%', lineHeight: 34, textAlign: 'left', color: colors.dark, fontWeight: '500', fontSize: 12 }}>CATEGORY: MACHINE</Text>
        </View>
        <Divider width={0.5} color={colors.primary} />  
        <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
            <TouchableOpacity style={styles.navbutton}><Text>-</Text></TouchableOpacity>
            <TouchableOpacity style={styles.navbutton}><Text>1</Text></TouchableOpacity>
            <TouchableOpacity style={styles.navbutton}><Text>+</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.buttonfull, {marginVertical: 0, padding: 8, width: '35%', marginLeft: 10}]} onPress={()=>navigation.navigate('HomeScreen')}>
                <Text style={[styles.buttontext, {fontSize: 12}]}>ADD TO CART</Text>
            </TouchableOpacity>
            <View style={{ width: '35%', alignItems: "flex-end" }}>
                <Icon type="feather" name={"heart"} size={30} color={colors.dark} />
            </View>
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
            title="INFO"
            titleStyle={{ fontSize: 12, color: colors.dark }}
            containerStyle={{backgroundColor: colors.light, borderBottomWidth: 0.5, borderBottomColor: colors.dark}}
        />
        <Tab.Item
            title="REVIEWS"
            titleStyle={{ fontSize: 12, color: colors.dark }}
            containerStyle={{backgroundColor: colors.light, borderBottomWidth: 0.5, borderBottomColor: colors.dark}}
        />
        </Tab>
        <Text style={{ width: '100%', lineHeight: 18, textAlign: 'left', color: '#7E7E7E', fontWeight: '400', fontSize: 12, marginTop: 15 }}>Combilift are revolutionizing the way companies handle and store goods. We help companies of all sizes and from every industry to maximize the capacity, safety and efficiency of their warehouse and storage facilities. Our expertise in optimizing the potential of your warehouse or storage facility in combination with our diverse range of material handling solutions could increase your storage capacity by as much as 100%</Text>
        <Text style={[styles.header, { width: '100%' }]}>Related Products</Text>
        <FlatList
            data={products}
            horizontal={true}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            style={{width: Dimensions.get('screen').width}}
        />
        </ScrollView>
    </SafeAreaView>
  );
};
export default ProductDetailScreen;
