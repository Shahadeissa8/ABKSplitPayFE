import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ShoppingNavigation from "./ShoppingNavigation";
import InstallmentNavigation from "./InstallmentNavigation";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AuthNavigation from "./AuthNavigation";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AccountNavigation from "./AccountNavigation";
import ExploreNavigator from "./ExploreNavigator";
import ExploreScreen from "../screens/shopping/ExploreScreen";

const Tab = createBottomTabNavigator();
const MainBottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        // headerShown: false,
        headerShadowVisible: false,
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          //   tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="compass-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Shop"
        component={ShoppingNavigation}
        options={{
          //   tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="storefront-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Installment"
        component={InstallmentNavigation}
        options={{
          //   tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cash-outline" size={24} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Account"
        component={AccountNavigation}
        options={{
          //   tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Auth"
        component={AuthNavigation}
        options={{
          //   tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="person" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainBottomNavigation;

const styles = StyleSheet.create({});
