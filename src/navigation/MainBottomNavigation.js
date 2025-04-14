import React from "react";
import { Platform, StyleSheet } from 'react-native'; // Import Platform and StyleSheet
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ExploreScreen from "../screens/shopping/ExploreScreen"; // Assuming this path is correct
import ShoppingNavigation from "./ShoppingNavigation"; // Assuming this path is correct
import InstallmentNavigation from "./InstallmentNavigation"; // Assuming this path is correct
import AccountNavigation from "./AccountNavigation"; // Assuming this path is correct
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

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
          position: 'absolute', // Make the tab bar float
          bottom: 25, // Distance from the bottom edge (adjust as needed)
          left: 20,   // Distance from the left edge (adjust as needed)
          right: 20,  // Distance from the right edge (adjust as needed)
          elevation: 5, // Shadow for Android
          backgroundColor: '#ffffff', // Background color of the tab bar (change as needed)
          borderRadius: 30, // Rounded corners (adjust as needed)
          height: 70, // Height of the tab bar (adjust as needed)
          ...styles.shadow, // Apply shadow styles for iOS
          borderTopWidth: 0, // Remove the default top border
        },
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
    shadowColor: '#7F5DF0', // Shadow color (adjust as needed)
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