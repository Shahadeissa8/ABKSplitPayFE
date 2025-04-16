import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ExploreScreen from "../screens/shopping/ExploreScreen";
import MyCartScreen from "../screens/checkOut/MyCartScreen";
import CheckoutScreen from "../screens/checkOut/CheckoutScreen";


const Stack = createNativeStackNavigator();

const ExploreNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="ExploreScreen"
    >
      <Stack.Screen name="ExploreScreen" component={ExploreScreen} />
      <Stack.Screen name="MyCartScreen" component={MyCartScreen} />
      <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
    </Stack.Navigator>
  );
};

export default ExploreNavigation;

const styles = StyleSheet.create({});
