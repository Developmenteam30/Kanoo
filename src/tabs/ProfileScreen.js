import React, {useEffect, useRef, useState} from 'react';
import {Image, Modal, SafeAreaView, Text, KeyboardAvoidingView, Platform, View, ScrollView, TouchableOpacity, Dimensions, Alert} from 'react-native';
import { Card, Divider, Input, Icon, Avatar } from 'react-native-elements';
import styles from '../styles/SearchScreenStyle';
import { Images } from '../utils/Images';
import { colors } from '../utils/Variables';
import Editprofile from '../component/Editprofile';
import Changepass from '../component/Changepass';
import Helps from '../component/Help';
import api from "../utils/Api";
import { connect } from "react-redux";
import Lgoinnow from '../component/Loginnow';
const {width, height} = Dimensions.get('window');


const ProfileScreen = (props) => {
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;
  const [modalVisible, setModalVisible] = useState(false);
  const [Help, setHelp] = useState(false);
  const [passmodalVisible, setpassModalVisible] = useState(false);
  var _carousel = useRef(null);
  const close = () => {
    setModalVisible(false);
    setpassModalVisible(false);
    setHelp(false);
  }
  const closed = () => {
    close();
    props.navigation.navigate('ResetPasswordScreen');
  }
  const updatedata = async (u) => {
    props.updateUser(u);
    await api.storedata(props.user, '@user');
    close();
  }
  const usercheck = async () => {
      if (!props.user.name) {
          props.navigation.navigate('LoginScreen');
      }
  }
  const logout = async () => {
    await api.clearAll();
    props.updateUser({ user_id: null });
    props.navigation.navigate('LoginScreen');
  }
  useEffect(() => {
    usercheck();
  }, [])
  return (
    props.user.email ? 
    <View style={[styles.mainContainer, { marginTop: 0, padding: 0, backgroundColor: colors.light }]}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <Editprofile close={close} user={props.user} updatedata={updatedata} />
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={passmodalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setpassModalVisible(!passmodalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <Changepass close={closed} navigation={props.navigation} />
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={Help}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setHelp(!Help);
        }}
      >
        <View style={styles.centeredView}>
          <Helps close={close} navigation={props.navigation} />
        </View>
      </Modal>
      <View style={styles.profileheader}>
        <View style={{ flexDirection: 'row', padding: 15 }}>
          <Avatar
              size={74}
              rounded
              source={{ uri: 'https://i1.sndcdn.com/avatars-TlbXx1BArSO2iBM1-r5ax8A-t500x500.jpg' }}
              key={1}
          />
          <View style={{padding: 10, width: '62%'}}>
            <Text style={styles.username}>{props.user.name}</Text>
            <TouchableOpacity style={{ flexDirection: 'row' }}>
              <Icon name="phone" type="font-awesome" size={16} style={{padding: 4}} color={colors.white} />
              <Text style={styles.othertext}>{props.user.phone_number}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={()=>setModalVisible(!modalVisible)} style={{backgroundColor: "rgba(255,255,255,0.2)", marginVertical: 15, padding: 5, borderRadius: 5}}>
            <Icon name="edit" size={26} style={{padding: 4}} color={colors.white} />
          </TouchableOpacity>
        </View>
        <Text style={[styles.othertext, {paddingLeft: 20, paddingBottom: 15}]}>Email : {props.user.email}</Text>

      </View>
      <View style={{paddingHorizontal: 15}}>
        <TouchableOpacity key={0} style={styles.listitems} onPress={()=>props.navigation.navigate('MyOrderScreen')}>
          <Icon name={'cube-outline'} type="ionicon" style={styles.listicon} />
          <Text style={styles.listtitle}>My Orders</Text>
        </TouchableOpacity>
        <Divider width={0.3} color={colors.gray} />  
        <TouchableOpacity key={0} style={styles.listitems} onPress={()=>props.navigation.navigate('MyAddressScreen')}>
          <Icon name={'location'} type="evilicon" style={styles.listicon} />
          <Text style={styles.listtitle}>My Addresses</Text>
        </TouchableOpacity>
        <Divider width={0.6} color={colors.gray} />  
        <TouchableOpacity key={0} style={styles.listitems} onPress={()=>setpassModalVisible(!passmodalVisible)}>
          <Icon name={'lock-closed-outline'} type="ionicon" style={styles.listicon} />
          <Text style={styles.listtitle}>Change Password</Text>
        </TouchableOpacity>
        <Divider width={0.3} color={colors.gray} />  
        <TouchableOpacity key={0} style={styles.listitems} onPress={()=>setHelp(true)}>
          <Icon name={'ios-chatbox-ellipses-outline'} type="ionicon" style={styles.listicon} />
          <Text style={styles.listtitle}>Help</Text>
        </TouchableOpacity>
        <Divider width={0.4} color={colors.gray} />  
        <TouchableOpacity key={0} style={styles.listitems} onPress={logout}>
          <Icon name={'logout'} style={styles.listicon} />
          <Text style={styles.listtitle}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
    :
    <View style={[styles.mainContainer, { marginTop: 0, padding: 0, backgroundColor: colors.light }]}>
        <Lgoinnow navigation={ props.navigation} />
    </View>
  );
};
function mapStateToProps(state) {
  return {
    user: state.userReducer,
    jsondata: state.jsondataReducer
  };
}
function mapDispatchToProps(dispatch) {
  return {
      updateUser: (cart) => dispatch({ type: "UPDATE_USER", user: cart }),
      updateJsondata: (data) => dispatch({ type: "UPDATE_jsondata", jsondata: data }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
