import React, {useEffect} from 'react';
import {Image, FlatList, SafeAreaView, Text, KeyboardAvoidingView, Platform, View, ScrollView, TouchableOpacity} from 'react-native';
import { Card, Divider, Icon, Input } from 'react-native-elements';
import styles from '../styles/LoginScreenStyle';
import { Images } from '../utils/Images';
import { colors } from '../utils/Variables';

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
  const renderItem = ({item, index}) => {
    return (
      <Card containerStyle={[{width: 200}]}>
          <Text style={[styles.bottomtext, {padding: 0, paddingHorizontal: 0, lineHeight: 24}]}><Icon type='material-community' name={"map-marker-radius"} color={colors.warning} size={24} /></Text>  
          <Text style={[styles.bottomtext, { padding: 0, paddingHorizontal: 0, lineHeight: 24 }]}>{item.name}</Text>  
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Icon type='material-community' name={"phone"} color={colors.warning} size={24} />
            <Text style={[styles.bottomtext, { padding: 0, paddingHorizontal: 0, lineHeight: 24, width: 100 }]}>{item.phone}</Text>
          </View>
          <Text style={[styles.bottomtext, { padding: 0, paddingHorizontal: 0, lineHeight: 24, fontSize: 12 }]}>{item.email}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Icon type='material-community' name={"whatsapp"} color={colors.success} size={24} />
            <Text style={[styles.bottomtext, { padding: 0, paddingHorizontal: 0, lineHeight: 24, fontSize: 12, width: 100  }]}>{item.whatsapp}</Text>
          </View>
      </Card>
    )
  }
  return (
    <SafeAreaView style={[styles.mainContainer, {backgroundColor: "rgba(0,0,0,0.5)"}]}>
        <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>
              <ScrollView style={[styles.Modelscrollwidth, {padding: 15, backgroundColor: colors.light, marginTop: 200}]} showsVerticalScrollIndicator={false}>
                    <Text style={[styles.header, {width: '100%', textAlign: 'center'}]}>Help</Text>
                    <Divider width={1} color={colors.primary} />  
                    <Image source={require('../assets/images/darklogo.png')} style={{ width: '100%', height: 50, resizeMode: 'contain', marginTop: 20 }} />
                    <Text style={[styles.bottomtext, { padding: 0, color: colors.primary, marginTop: 15, paddingHorizontal: 0, lineHeight: 24 }]}>Get In Touch With Us</Text>  
                    <Text style={[styles.bottomtext, { padding: 0, paddingHorizontal: 0, lineHeight: 24 }]}>km100.uae@kanoo.com</Text>  
                    <Text style={[styles.bottomtext, { padding: 0, paddingHorizontal: 0, lineHeight: 24 }]}>Toll-Free: 800-KM100 (56100)</Text>  
                    <FlatList
                      data={DATA}
                      renderItem={renderItem}
                      keyExtractor={item => item.id}
                      horizontal={true}
                    />
                    <TouchableOpacity style={styles.buttonfull} onPress={()=>props.close()}>
                        <Text style={styles.buttontext}>Close</Text>
                    </TouchableOpacity>
                </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default Helps;
