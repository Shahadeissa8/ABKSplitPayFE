import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import ShopScreen from "../screens/shopping/ShopScreen";
import { SafeAreaView } from "react-native-safe-area-context";


const Stack = createNativeStackNavigator();
const ShoppingNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      
      <Stack.Screen name="ShopScreen" component={ShopScreen} />
     
    </Stack.Navigator>
  );
};

export default ShoppingNavigation;

const styles = StyleSheet.create({});
