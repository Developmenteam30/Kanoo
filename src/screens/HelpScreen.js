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


const HelpScreen = (props) => {
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;
  const [modalVisible, setModalVisible] = useState(false);
  const [Help, setHelp] = useState(false);
  const [passmodalVisible, setpassModalVisible] = useState(false);
  var _carousel = useRef(null);
  return (
    <View style={[styles.mainContainer, { marginTop: 0, padding: 0, backgroundColor: colors.light }]}>
      <View style={{paddingHorizontal: 15}}>
        <Helps navigation={props.navigation} />
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(HelpScreen);
