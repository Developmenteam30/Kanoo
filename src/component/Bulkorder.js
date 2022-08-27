import React, {useEffect, useState} from 'react';
import {Image, Alert, SafeAreaView, Text, KeyboardAvoidingView, Platform, View, ScrollView, TouchableOpacity} from 'react-native';
import { Divider, Input } from 'react-native-elements';
import { baseProps } from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlers';
import styles from '../styles/LoginScreenStyle';
import { Images } from '../utils/Images';
import { colors } from '../utils/Variables';
import { connect } from "react-redux";
import api from '../utils/Api';

const Bulkorder = (props) => {
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
    const [name, setname] = useState(null);
    const [email, setemail] = useState(null);
    const [phone_number, setphone_number] = useState(null);
    const [quantity, setquantity] = useState(null);
    const [message, setmessage] = useState(null);

    useEffect(() => {
        if (props.user) {
            setname(props.user.name);
            setemail(props.user.email);
            setphone_number(props.user.phone_number);
        }
    }, [])
    const updateuserdata = async () => {
        var user = {
            'name': name,
            'email': email,
            'phone_number': phone_number,
            'product_id': props.product_id,
            'quantity': quantity,
            'note': message
        }
        var cate = await api.postapi(user, 'storebulk');
        if (cate && cate.status && cate.status == '1') {
            Alert.alert('Order sent successfully');
            props.close();
        } else {
            console.log(cate);
            Alert.alert('Something went wrong! Try later.');
        }
    }
  return (
    <SafeAreaView style={[styles.mainContainer, {backgroundColor: "rgba(0,0,0,0.5)"}]}>
        <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>
              <ScrollView style={[styles.Modelscrollwidth, {padding: 15, backgroundColor: colors.light, marginTop: 180}]} showsVerticalScrollIndicator={false}>
                <Text style={[styles.header, {width: '100%', textAlign: 'center'}]}>Send bulk order request</Text>
                <Divider width={1} color={colors.primary} />  
                <View style={styles.form}>
                    <Text style={styles.label}>Name</Text>
                    <Input
                        placeholder='Enter Name'
                        containerStyle={styles.inputcontainerstyle}
                        inputContainerStyle={styles.inputstyle}
                        onChangeText={text => setname(text)}
                        value={name}
                    />
                    <Text style={styles.label}>Phone</Text>
                    <Input
                        placeholder='Enter Phone'
                        containerStyle={styles.inputcontainerstyle}
                        inputContainerStyle={styles.inputstyle}
                        onChangeText={text => setphone_number(text)}
                        value={phone_number}
                    />
                    <Text style={styles.label}>Email</Text>
                    <Input
                        placeholder='Enter Email'
                        containerStyle={styles.inputcontainerstyle}
                        inputContainerStyle={styles.inputstyle}
                        onChangeText={text => setemail(text)}
                        value={email}
                    />
                    <Text style={styles.label}>Quantity</Text>
                    <Input
                        placeholder='Enter Quantity'
                        containerStyle={styles.inputcontainerstyle}
                        inputContainerStyle={styles.inputstyle}
                        onChangeText={text => setquantity(text)}
                        value={quantity}
                    />
                    <Text style={styles.label}>Message</Text>
                    <Input
                        placeholder='Enter Message'
                        containerStyle={styles.inputcontainerstyle}
                        inputContainerStyle={styles.inputstyle}
                        onChangeText={text => setmessage(text)}
                        value={message}
                    />
                    <TouchableOpacity style={styles.buttonfull} onPress={()=>updateuserdata()}>
                        <Text style={styles.buttontext}>Send Request</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default Bulkorder;
