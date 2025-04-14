import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MainAccPageScreen from "../screens/account/MainAccPageScreen";
import EditProfileScreen from "../screens/account/EditProfileScreen";
import ConfirmPasswordScreen from "../screens/account/ConfirmPasswordScreen";
import WishListScreen from "../screens/account/WishListScreen";
import Savedaddresses from "../screens/account/Savedaddresses";
import { SafeAreaView } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Addlocation from "../screens/account/Addlocation";
import PaymentMethods from "../screens/account/PaymentMethods";
import Payment from "../screens/account/Payment";
import Feedback from "../screens/account/Feedback";
import HelpCenter from "../screens/account/HelpCenter";
const Stack = createNativeStackNavigator();

const AccountNavigation = ({ setIsAuthenticated }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        presentation: "card",
        gestureEnabled: true,
        gestureDirection: "horizontal",
        headerShown: false,
        header: () => null,
      }}
      initialRouteName="MainAccPageScreen"
      
    >
      <Stack.Screen
        name="MainAccPageScreen"
        children={() => <MainAccPageScreen setIsAuthenticated={setIsAuthenticated} />} // Pass setIsAuthenticated to MainAccPageScreen
        options={{
          animationEnabled: true,
          headerShown: false,
          header: () => null,
        }}
      />

      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{
          animationEnabled: true,
        }}
      />

      <Stack.Screen
        name="ConfirmPasswordScreen"
        component={ConfirmPasswordScreen}
        options={{
          animationEnabled: true,
        }}
      />

      <Stack.Screen
        name="Savedaddresses"
        component={Savedaddresses}
        options={{
          animationEnabled: true,
        }}
      />
      <Stack.Screen name="PaymentMethods" component={Payment} />

      <Stack.Screen name="Payment" component={PaymentMethods} />
      <Stack.Screen
        name="WishListScreen"
        component={WishListScreen}
        options={{
          animationEnabled: true,
        }}
      />
      <Stack.Screen
        name="Feedback"
        component={Feedback}
        options={{
          animationEnabled: true,
        }}
      />
      <Stack.Screen
        name="HelpCenter"
        component={HelpCenter}
        options={{
          animationEnabled: true,
        }}
      />

      <Stack.Screen
        name="Addlocation"
        component={Addlocation}
        options={{
          animationEnabled: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default AccountNavigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});