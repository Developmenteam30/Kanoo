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
      "whatsapp": "+971 56 524 1254"
    },
    {
      "id": 2,
      "name": "DUBAI (RAS AL KHOR)",
      "phone": " 04-332 2332",
      "email": "kmparts.awr@kanoo.com",
      "whatsapp": "+971 54 480 8700"
    },
    {
      "id": 3,
      "name": "ABU DHABI",
      "phone": " 02-811 9034",
      "email": "kmparts.auh@kanoo.com",
      "whatsapp": "+971 50 871 9639"
    },
    {
      "id": 4,
      "name": "SHARJAH",
      "phone": " 06-542 3344",
      "email": "kmparts.shj@kanoo.com",
      "whatsapp": "+971 56 524 1248"
    },
    {
      "id": 5,
      "name": "FUJAIRAH",
      "phone": " 09-223 0919",
      "email": "kmparts.fjr@kanoo.com",
      "whatsapp": "+971 56 991 5299"
    },
    {
      "id": 6,
      "name": "RAS AL KHAIMAH",
      "phone": " 07-227 2133",
      "email": "kmparts.rak@kanoo.com",
      "whatsapp": "+971 56 683 3080"
    },
    {
      "id": 7,
      "name": "MUSSAFAH",
      "phone": " 02-553 5890",
      "email": "kmparts.mus@kanoo.com",
      "whatsapp": "+971 56 524 1242"
    },
    {
      "id": 8,
      "name": "AL AIN",
      "phone": " 03-721 2315",
      "email": "kmparts.aln@kanoo.com",
      "whatsapp": "+971 54 305 7417"
    },
  ]
  const previewCount = 1;
  const itemWidth = width / (previewCount + .7);
  const startScroll = (itemWidth * 3/4);

  const snapToOffsets = DATA.map((x, i) => {
      return ((i * (itemWidth) * previewCount) + startScroll)
  })
  const renderItem = ({ item, index }) => {
    return (
      <Card containerStyle={[{width: '45%', paddingVertical: 15, backgroundColor: '#e6ecff', paddingHorizontal: 5, marginHorizontal: '2.5%'}]}>
          <Text style={[styles.bottomtext, {padding: 0, paddingHorizontal: 0, lineHeight: 24}]}><Icon type='material-community' name={"map-marker-radius"} color={colors.warning} size={30} /></Text>  
          <Text style={[styles.bottomtext, { padding: 0, paddingHorizontal: 0, lineHeight: 24, }]}>{item.name}</Text>  
          <Text
            adjustsFontSizeToFit={true}
            numberOfLines={1}
            style={[styles.bottomtext, { padding: 0, paddingHorizontal: 0, lineHeight: 20, fontSize: 17 }]}>{item.email}</Text>

          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
            <Button
              icon={
                <Icon
                  name="phone"
                  size={15}
                  color="white"
                />
              }
              title=""
              onPress={() => {
                Linking.openURL(`tel:${item.phone}`)
              }}
              buttonStyle={{paddingHorizontal: 10, backgroundColor: 'red'}}
              containerStyle={{marginRight: 10}}
            />
            <Button
              icon={
                <Icon
                  name="whatsapp"
                  size={15}
                  type='material-community'
                  color="white"
                />
              }
              onPress={() => {
                Linking.openURL('whatsapp://send?text=hello&phone='+item.whatsapp)
              }}
              buttonStyle={{paddingHorizontal: 10, backgroundColor: colors.success}}
              title=""
            />

            {/* <TouchableOpacity style={styles.callbutton}>
              <Icon type='material-community' name={"phone"} color={colors.warning} size={24} />
              <Text style={[styles.bottomtext, { padding: 0, paddingHorizontal: 0, lineHeight: 24, width: 100 }]}>{item.phone}</Text>
            </TouchableOpacity> */}
            {/* <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Icon type='material-community' name={"whatsapp"} color={colors.success} size={24} />
              <Text style={[styles.bottomtext, { padding: 0, paddingHorizontal: 0, lineHeight: 24, fontSize: 12, width: 100  }]}>{item.whatsapp}</Text>
            </TouchableOpacity> */}
          </View>

      </Card>
    )
  }
  return (
    <SafeAreaView style={[styles.mainContainer, {backgroundColor: "white"}]}>
        <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>
              <View style={[styles.Modelscrollwidth, { paddingVertical: 0,paddingHorizontal: 0, backgroundColor: colors.light, marginTop: 0 }]} showsVerticalScrollIndicator={false}>
                    {/* <Carousel
                      data={DATA}
                      renderItem={renderItem}
                      sliderWidth={width-20}
                      itemWidth={width-20}
                      layout={'stack'}
                      loop={false}
                      useScrollView={true}

                    /> */}
                    <FlatList
                      data={DATA}
                      ListHeaderComponent={() => (
                        <View>
                          {/* <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={[styles.buttonfull, {width: 45, borderRadius: 50, marginVertical: 0, height: 45, backgroundColor: 'white', padding: 5}]} onPress={()=>props.close()}>
                              <Icon name="arrow-back" size={25} color="#000" />
                            </TouchableOpacity>
                            <Text style={[styles.header, { width: '75%', textAlign: 'center' }]}>Contact</Text>
                          </View> */}

                          {/* <Divider width={1} color={colors.primary} />   */}
                          <Image source={require('../assets/images/darklogo.png')} style={{ width: '100%', height: 50, resizeMode: 'contain', marginTop: 0 }} />
                          <Text style={[styles.bottomtext, { padding: 0, color: colors.primary, marginTop: 15, paddingHorizontal: 0, lineHeight: 24 }]}>Get In Touch With Us</Text>  
                          <Text style={[styles.bottomtext, { padding: 0, paddingHorizontal: 0, lineHeight: 24 }]}>km100.uae@kanoo.com</Text>  
                          <Text style={[styles.bottomtext, { padding: 0, paddingHorizontal: 0, lineHeight: 24 }]}>Toll-Free: 800-KM100 (56100)</Text>  
                        </View>
                      )}
                      renderItem={renderItem}
                      keyExtractor={item => item.id}
                      numColumns={2}
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
