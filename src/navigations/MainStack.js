import * as React from 'react';
import { Pressable, Image, View } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SplashAFScreen from '../screens/SplashAFScreen';
import LoginScreen from '../screens/LoginScreen';
import ForgetScreen from '../screens/ForgetScreen';
import VerifyScreen from '../screens/VerifyScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../tabs/HomeScreen';
import SearchScreen from '../tabs/SearchScreen';
import CartScreen from '../tabs/CartScreen';
import WishlistScreen from '../tabs/WishlistScreen';
import ProfileScreen from '../tabs/ProfileScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import MyOrderScreen from '../screens/MyOrderScreen';
import MyAddressScreen from '../screens/MyAddressScreen';
import MyAddressAddScreen from '../screens/MyAddressAddScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import Ordersummery from '../screens/Ordersummery';
import NotificationsScreen from '../screens/NotificationsScreen';
import HelpScreen from '../screens/HelpScreen';

import { colors } from '../utils/Variables';
import { Header, Icon } from 'react-native-elements';
import { Images } from '../utils/Images';
import Success from '../screens/Success';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const MainDrawer = (props) => {
  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home';
            } else if (route.name === 'Search') {
              iconName = 'search'
            } else if (route.name === 'Cart') {
              iconName = 'shopping-cart'
            } else if (route.name === 'Wishlist') {
              iconName = 'heart'
            } else if (route.name === 'Profile') {
              iconName = 'user'
            }
            return <Icon type="feather" name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.warning,
          tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerTransparent: true, header: (props) => <GradientHeader {...props} /> }} />
      <Tab.Screen name="Search"  component={SearchScreen} options={{ unmountOnBlur: true, headerTransparent: true, header: (props) => <GradientHeader {...props} /> }} />
      <Tab.Screen name="Cart" component={CartScreen} options={{ unmountOnBlur: true, headerTransparent: true, header: (props) => <GradientHeader {...props} /> }} />
      <Tab.Screen name="Wishlist" component={WishlistScreen} options={{ unmountOnBlur: true, headerTransparent: true, header: (props) => <GradientHeader {...props} /> }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ unmountOnBlur: true, headerShown: false }} />
      
    </Tab.Navigator>
  )
};
const GradientHeader = props => {
    var pagetitle = props.route.name;
    return (
      <Header
        barStyle={'light-content'}
        statusBarProps={{ backgroundColor: colors.primary }}
        backgroundColor={colors.primary}
        leftComponent={
            (<Pressable onPress={()=>props.navigation.navigate('HomeScreen')}>
              <Image source={Images.fulllogo} style={{width: 150, height:40, padding: 10}} />
            </Pressable>)
        } 
        centerComponent={{ text: '', style: { color: '#fff', paddingTop: 5, fontWeight: '700' } }} 
        rightComponent={
          (
            <View style={{ flexDirection: 'row' }}>
              <Pressable onPress={() => props.navigation.navigate('Notifications')}>
                  <Icon name={"bell"} color='#fff' size={40} type="evilicon" style={{padding: 5}} />
              </Pressable>
            </View>
          )
        }/>
)};
const MainStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="SplashAFScreen"
      screenOptions={{
        headerBackTitleVisible: false,
        backgroundColor: colors.primary,
      }}
    >
      <Stack.Screen
        name="SplashAFScreen"
        component={SplashAFScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name='Contact'
        component={HelpScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name='LoginScreen'
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='ForgetScreen'
        component={ForgetScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='VerifyScreen'
        component={VerifyScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='ChangePasswordScreen'
        component={ChangePasswordScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='RegisterScreen'
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='HomeScreen'
        component={MainDrawer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Success'
        component={Success}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Notifications'
        component={NotificationsScreen}
      />
      
      <Stack.Screen
        name='Ordersummery'
        component={Ordersummery}
        options={{ title: 'Order Summary', headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.light
        }}
      />
      
      <Stack.Screen
        name='ResetPasswordScreen'
        component={ResetPasswordScreen}
        options={{ title: 'Change Password', headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.light
        }}
      />
      <Stack.Screen
        name='MyOrderScreen'
        component={MyOrderScreen}
        options={{ title: 'My Orders', headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.light
        }}
      />
      <Stack.Screen
        name='MyAddressScreen'
        component={MyAddressScreen}
        options={{ title: 'My Address', headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.light
        }}
      />
      <Stack.Screen
        name='MyAddressAddScreen'
        component={MyAddressAddScreen}
        options={{ title: 'Add Address', headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.light
        }}
      />
      <Stack.Screen
        name='ProductDetailScreen'
        component={ProductDetailScreen}
        options={{ title: 'Product details', headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.light
        }}
      />
      
    </Stack.Navigator>
  );
};
export default MainStack;
