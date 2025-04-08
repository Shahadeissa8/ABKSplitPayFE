import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ProductDetailsScreen from "../screens/shopping/ProductDetailsScreen";
import ExploreScreen from "../screens/shopping/ExploreScreen";
import ShopDetailsScreen from "../screens/shopping/ShopDetailsScreen";
import ShopLinkScreen from "../screens/shopping/ShopLinkScreen";

const Stack = createNativeStackNavigator();
const ShoppingNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ExploreScreen" component={ExploreScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
    </Stack.Navigator>
  );
};

export default ShoppingNavigation;

const styles = StyleSheet.create({});
