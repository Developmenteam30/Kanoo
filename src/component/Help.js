import React, {useEffect} from 'react';
import { Linking } from 'react-native';
import {Image, FlatList, SafeAreaView, Text, KeyboardAvoidingView, Platform, View, ScrollView, TouchableOpacity, Dimensions} from 'react-native';
import { Button, Card, Divider, Icon, Input } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import styles from '../styles/LoginScreenStyle';
import { Images } from '../utils/Images';
import { colors } from '../utils/Variables';
const { width, height } = Dimensions.get('screen');
const Helps = (props) => {
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
  const DATA = [
    {
      "id": 1,
      "name": "DUBAI (AL QUOZ)",
      "phone": " 04-237 9922",
      "email": "kmparts.dxb@kanoo.com",
      "whatsapp": "+971 56 524 1254",
      "lat": 25.142066455267994,
      "lng": 55.22851193622407,
    },
    {
      "id": 2,
      "name": "DUBAI (RAS AL KHOR)",
      "phone": " 04-332 2332",
      "email": "kmparts.awr@kanoo.com",
      "whatsapp": "+971 54 480 8700",
      "lat": 25.18514105293029,
      "lng": 55.34579058699832,
    },
    {
      "id": 3,
      "name": "ABU DHABI",
      "phone": " 02-811 9034",
      "email": "kmparts.auh@kanoo.com",
      "whatsapp": "+971 50 871 9639",
      "lat": 24.329908348529603,
      "lng": 54.465624828719186,
    },
    {
      "id": 4,
      "name": "SHARJAH",
      "phone": " 06-542 3344",
      "email": "kmparts.shj@kanoo.com",
      "whatsapp": "+971 56 524 1248",
      "lat": 25.303456678793502,
      "lng": 55.400077672791134,
    },
    {
      "id": 5,
      "name": "FUJAIRAH",
      "phone": " 09-223 0919",
      "email": "kmparts.fjr@kanoo.com",
      "whatsapp": "+971 56 991 5299",
      "lat": 25.077619023199947,
      "lng": 56.29784274842888,
    },
    {
      "id": 6,
      "name": "RAS AL KHAIMAH",
      "phone": " 07-227 2133",
      "email": "kmparts.rak@kanoo.com",
      "whatsapp": "+971 56 683 3080",
      "lat": 25.763644079918542,
      "lng": 55.964523736810875,
    },
    {
      "id": 7,
      "name": "MUSSAFAH",
      "phone": " 02-553 5890",
      "email": "kmparts.mus@kanoo.com",
      "whatsapp": "+971 56 524 1242",
      "lat": 0,
      "lng": 0,
    },
    {
      "id": 8,
      "name": "AL AIN",
      "phone": " 03-721 2315",
      "email": "kmparts.aln@kanoo.com",
      "whatsapp": "+971 54 305 7417",
      "lat": 24.178195763155838,
      "lng": 55.76471186221882,
    },
  ]
  const previewCount = 1;
  const itemWidth = width / (previewCount + .7);
  const startScroll = (itemWidth * 3/4);
  const gotonav = (item) => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${item.lat},${item.lng}`;
    const label = item.name;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });
    Linking.openURL(url);
  }
  const snapToOffsets = DATA.map((x, i) => {
      return ((i * (itemWidth) * previewCount) + startScroll)
  })
  const renderItem = ({ item, index }) => {
    return (
      <Card containerStyle={[{paddingVertical: 22,height:270,backgroundColor: '#fff', paddingHorizontal: 5, marginHorizontal: '2.5%'}]}>
        <Text style={[styles.bottomtexts, { padding: 0, textAlign:'center',bottom:10, lineHeight: 24, fontSize: 16, fontWeight: 'bold' }]}>{item.name}</Text>  
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', top: 20 }}>
          <Text style={{ color: '#000', fontSize: 14, lineHeight: 25 ,left:9}}>Email</Text>  
          <Text
              adjustsFontSizeToFit={true}
              numberOfLines={1}
              style={[styles.bottomtexts, { lineHeight: 24, fontSize: 14, right:2 }]}>{item.email}</Text>
        </View>
        
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', top:32}}>
          <Text style={{ color: '#000', fontSize: 14, lineHeight: 25, left: 9 }}>Whatsapp</Text>
          <TouchableOpacity 
            onPress={() => {
              Linking.openURL('whatsapp://send?text=hello&phone=' + item.whatsapp)
            }}
           style={{alignSelf:'flex-end',left:60, marginRight: 10}}  
          >
            <Icon
              name="whatsapp"
              size={30}
              type='material-community'
              color="green"
            />
          </TouchableOpacity>
          <Text onPress={() => {
              Linking.openURL('whatsapp://send?text=hello&phone=' + item.whatsapp)
            }} style={{ color: '#000', fontSize: 14, lineHeight: 25,textAlign:'right',right:5,top:5}}>{ item.whatsapp}</Text>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',top:40}}>
          <Text style={{ color: '#000', fontSize: 14, lineHeight: 25 ,left:10}}>Phone</Text>
          <TouchableOpacity onPress={() => {
                  Linking.openURL(`tel:${item.phone}`)
            }}
            style={{alignSelf:'flex-end',left:80}}
            >
              <Icon
                name="phone"
                size={27}
                color="red"
                borderRadius={5}
              />
          </TouchableOpacity>
          <Text onPress={() => {
                  Linking.openURL(`tel:${item.phone}`)
            }}
            style={{ color: '#000', fontSize: 14, lineHeight: 25, textAlign: "right", right: 9 }}>{item.phone}</Text>
        </View>
          <TouchableOpacity onPress={()=>gotonav(item)} style={{height:30,width:'100%',backgroundColor:'#3256a8',borderWidth:1,borderColor:'gray',marginTop: 100}}>
            <Text style={{ color: '#fff', fontSize: 14, textAlign:'center',top:4}}>DIRECTION</Text>
          </TouchableOpacity>
      </Card>
    )
  }
  return (
    <SafeAreaView style={[styles.mainContainer, {backgroundColor: "white"}]}>
        <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>
              <View style={[styles.Modelscrollwidth, { paddingVertical: 0,paddingHorizontal: 0, backgroundColor: colors.light, marginTop: 0 }]} showsVerticalScrollIndicator={false}>
                    <FlatList
                      data={DATA}
                      ListHeaderComponent={() => (
                        <View>
                          <Image source={require('../assets/images/kanoo_machinery_Logo-blue.png')} style={{ width: '100%', height: 50, resizeMode: 'contain', marginTop: 0 }} />
                          <Text style={[styles.bottomtext, { padding: 0, color: colors.primary, marginTop: 15, paddingHorizontal: 0, lineHeight: 24 }]}>Get In Touch With Us</Text>  
                          <Text style={[styles.bottomtext, { padding: 0, paddingHorizontal: 0, lineHeight: 24 }]}>km100.uae@kanoo.com</Text>  
                          <Text style={[styles.bottomtext, { padding: 0, paddingHorizontal: 0, lineHeight: 24 }]}>Toll-Free: 800-KM100 (56100)</Text>  
                        </View>
                      )}
                      renderItem={renderItem}
                      keyExtractor={item => item.id}
                      horizontal={false}
                      snapToOffsets={snapToOffsets}
                      snapToAlignment={"center"}
                    />
                </View>
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default Helps;
