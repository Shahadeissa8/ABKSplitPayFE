import { StyleSheet, Text, View } from "react-native";
import React from "react";
import InstallmentScreen from "../screens/installment/InstallmentsScreen";
import SingleInstallmentScreen from "../screens/installment/SingleInstallmentScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const InstallmentNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="InstallmentScreen"
        component={InstallmentScreen}
      />
      <Stack.Screen
        name="SingleInstallmentScreen"
        component={SingleInstallmentScreen}
      />
    </Stack.Navigator>
  );
};

export default InstallmentNavigation;

const styles = StyleSheet.create({});
