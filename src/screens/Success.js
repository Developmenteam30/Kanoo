import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { Button, Icon } from "react-native-elements";
import { connect } from "react-redux";
import styles from "../styles/UpdateItemScreenStyle";
import { Images } from "../utils/Images";
import { colors } from "../utils/Variables";

const Success = (props) => {
  const [loader, setLoader] = useState(false);
  return (
    <SafeAreaView style={styles.mainContainer}>
        <View style={{width: '100%', backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', height: Dimensions.get('screen').height*0.7,}}>
            <View style={{
                height: 100,
                width: 250,
                marginBottom: 0,
                borderRadius: 100,
                overflow: 'hidden',
            }}
            >
                <Image 
                style={{
                    resizeMode: "contain",
                    height: 100,
                    width: 250,
                    alignSelf: "center",
                }}
                source={Images.logo}
                />
            </View>
            <Icon name="check" size={90} color={colors.white} />
            <Text style={{fontSize: 18, marginBottom: 25, marginTop: 40, fontWeight: '600', color: colors.primary, backgroundColor: colors.white, paddingHorizontal: 20, borderRadius: 20}}>Awesome!</Text>
            <Text style={{fontSize: 20, marginBottom: 10, fontWeight: '600', color: colors.white}}>Congratulations.</Text>
            <Text style={{fontSize: 18, fontWeight: '400', color: colors.white}}>Your order placed successfully !</Text>
        </View>
        <View style={{width: '100%', backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', height: Dimensions.get('screen').height*0.3,}}>
            <Button
            title={'Go To Order List'}
            onPress={()=>{
                props.navigation.replace('MyOrderScreen')
            }}
            buttonStyle={{ backgroundColor: colors.success }}
            containerStyle={{
                width: 200,
                marginVertical: 10,
                borderRadius: 20
            }}
            />
        </View>
    </SafeAreaView>
  );
};
function mapStateToProps(state) {
  return {
    user: state.userReducer,
    products: state.productReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
      updateUser: (cart) => dispatch({ type: "UPDATE_USER", user: cart }),
      updateProducts: (product) => dispatch({ type: "UPDATE_product", product: product }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Success);  