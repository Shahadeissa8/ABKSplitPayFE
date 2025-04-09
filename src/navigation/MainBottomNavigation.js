import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ExploreScreen from "../screens/shopping/ExploreScreen";
import ShoppingNavigation from "./ShoppingNavigation";
import InstallmentNavigation from "./InstallmentNavigation";
import AccountNavigation from "./AccountNavigation";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();

const MainBottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="compass-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Shop"
        component={ShoppingNavigation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="storefront-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Installment"
        component={InstallmentNavigation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cash-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountNavigation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainBottomNavigation;