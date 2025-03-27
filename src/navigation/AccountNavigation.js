import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MainAccPageScreen from "../screens/account/MainAccPageScreen";
import EditProfileScreen from "../screens/account/EditProfileScreen";
import ConfirmPasswordScreen from "../screens/account/ConfirmPasswordScreen";
import WishListScreen from "../screens/account/WishListScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const AccountNavigation = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="MainAccPageScreen" component={MainAccPageScreen} />
        <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
        <Stack.Screen
          name="ConfirmPasswordScreen"
          component={ConfirmPasswordScreen}
        />
        <Stack.Screen name="WishListScreen" component={WishListScreen} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default AccountNavigation;

const styles = StyleSheet.create({});
