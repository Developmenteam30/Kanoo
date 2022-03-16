import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SplashAFScreen from '../design/screens/SplashAFScreen';
import WelcomeScreen from '../design/screens/WelcomeScreen';
import PersonalScreen from '../design/screens/PersonalScreen';
import PaymentScreen from '../design/screens/PaymentScreen';
import DetailsScreen from '../design/screens/DetailsScreen';

const Stack = createNativeStackNavigator();

const MainStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="SplashAFScreen">
      <Stack.Screen
        name="SplashAFScreen"
        component={SplashAFScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PersonalScreen"
        component={PersonalScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PaymentScreen"
        component={PaymentScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default MainStack;
