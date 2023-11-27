import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {BuyNow, Cart, HomeScreen, ProductDetails} from '../screens';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={() => ({
        headerShown: false,
        gestureEnabled: false,
      })}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="BuyNow" component={BuyNow} />
    </Stack.Navigator>
  );
};

export default HomeStack;
