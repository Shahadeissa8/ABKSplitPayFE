import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ProductDetailsScreen from "../screens/shopping/ProductDetailsScreen";
import ExploreScreen from "../screens/shopping/ExploreScreen";
import StoreDetailsScreen from "../screens/shopping/StoreDetailsScreen";
import ShopLinkScreen from "../screens/shopping/ShopLinkScreen";
import ProductList from "../components/ExploreComponents/ProductList";

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
      <Stack.Screen name="ProductList" component={ProductList} />
    </Stack.Navigator>
  );
};

export default ShoppingNavigation;

const styles = StyleSheet.create({});
