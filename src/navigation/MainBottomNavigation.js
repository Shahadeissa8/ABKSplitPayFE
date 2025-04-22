import React from "react";
import { Platform, StyleSheet } from "react-native"; // Import Platform and StyleSheet
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ShoppingNavigation from "./ShoppingNavigation";
import InstallmentNavigation from "./InstallmentNavigation";
import AccountNavigation from "./AccountNavigation"; // Import AccountNavigation
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import ExploreNavigation from "./ExploreNavigation";

const Tab = createBottomTabNavigator();

const MainBottomNavigation = ({ setIsAuthenticated }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#4A90E2", // Modern Blue Active Icon Color
        tabBarInactiveTintColor: "#B0BEC5", // Light Gray Inactive Icon Color
        tabBarShowLabel: true,
        tabBarStyle: {
          elevation: 8, // Increased shadow for Android

          borderRadius: 30, // Keep rounded corners
          marginHorizontal: 10, // Add horizontal margin
          marginBottom: 15, // Add bottom margin
          paddingVertical: 20, // Add vertical padding to make it taller
          position: "absolute", // Position absolutely to float above content
          bottom: 0, // Stick to the bottom
          left: 0,
          right: 0,
          alignContent: "center",
          justifyContent: "center",
          paddingTop: 15,
          ...styles.shadow, // Apply shadow styles for iOS
        },
      }}
    >
      <Tab.Screen
        name="Explore"
        component={ExploreNavigation}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="compass-outline" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Shop"
        component={ShoppingNavigation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="storefront-outline" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Installment"
        component={InstallmentNavigation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cash-outline" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        children={() => (
          <AccountNavigation setIsAuthenticated={setIsAuthenticated} />
        )}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-outline"
              size={30}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#26589c", 
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1, 
    shadowRadius: 6.84, 
  },
});

export default MainBottomNavigation;
