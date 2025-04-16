import React from "react";
import { Platform, StyleSheet } from 'react-native'; // Import Platform and StyleSheet
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
        tabBarActiveTintColor: "red", // Active icon color
        tabBarInactiveTintColor: "gray", // Inactive icon color
        tabBarShowLabel: true, // Set to false if you DON'T want labels like in the image
        tabBarStyle: {
          elevation: 5, // Shadow for Android
          backgroundColor: '#ffffff', // Background color of the tab bar (change as needed)
          borderRadius: 30, // Rounded corners (adjust as needed)
          margin: 12,
          ...styles.shadow, // Apply shadow styles for iOS
        },
      }}
    >
      <Tab.Screen
        name="Explore"
        component={ExploreNavigation}
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
        // Use component prop directly if AccountNavigation doesn't need setIsAuthenticated
        // component={AccountNavigation}
        // If it needs props, use children like you did:
        children={() => <AccountNavigation setIsAuthenticated={setIsAuthenticated} />}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-outline"
              size={24}
              color={color}
            />
          ),
          // Note: headerShown is usually set in screenOptions, not here
        }}
      />
    </Tab.Navigator>
  );
};

// Styles for the shadow effect (especially for iOS)
const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#3C66B5', // Shadow color (adjust as needed)
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    // elevation: 5 // Already set inline for Android
  }
});

export default MainBottomNavigation;