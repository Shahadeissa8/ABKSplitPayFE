import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LocationScreen from "../screens/auth/LocationScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import SplashScreen from "../screens/auth/SplashScreen";
import OnBoardingScreen from "../screens/auth/OnBoardingScreen";
import { SafeAreaView } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator();
const AuthNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Stack.Screen name="SplashScreen" component={SplashScreen} />*/}
      <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} />
      <Stack.Screen name="LocationScreen" component={LocationScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;

const styles = StyleSheet.create({});
