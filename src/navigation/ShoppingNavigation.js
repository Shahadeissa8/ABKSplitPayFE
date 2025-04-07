import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ProductsScreen from "../screens/shopping/ProductsScreen";
import ProductDetailsScreen from "../screens/shopping/ProductDetailsScreen";
import ShopScreen from "../screens/shopping/ShopScreen";
import ShopDetailsScreen from "../screens/shopping/ShopDetailsScreen";
import { SafeAreaView } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator();
const ShoppingNavigation = () => {
  return (
    // <SafeAreaView style={{ flex: 1 }}>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ShopScreen" component={ShopScreen} />
      <Stack.Screen name="ProductsScreen" component={ProductsScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
      <Stack.Screen name="ShopDetailsScreen" component={ShopDetailsScreen} />
    </Stack.Navigator>
    // </SafeAreaView>
  );
};

export default ShoppingNavigation;

const styles = StyleSheet.create({});
