import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
//import ProductsScreen from "../screens/shopping/ProductsScreen";
import ProductDetailsScreen from "../screens/shopping/ProductDetailsScreen";
import ShopScreen from "../screens/shopping/ShopScreen";
import StoreDetailsScreen from "../screens/shopping/StoreDetailsScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import ShopLinkScreen from "../screens/shopping/ShopLinkScreen";

const Stack = createNativeStackNavigator();
const ShoppingNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* needs A LOT OF EDITING */}
      <Stack.Screen name="ShopScreen" component={ShopScreen} />
      <Stack.Screen name="ShopLinkScreen" component={ShopLinkScreen} />
      <Stack.Screen name="StoreDetailsScreen" component={StoreDetailsScreen} />
    </Stack.Navigator>
  );
};

export default ShoppingNavigation;

const styles = StyleSheet.create({});
