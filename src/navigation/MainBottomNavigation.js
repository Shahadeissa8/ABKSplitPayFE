import React from "react";
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
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "gray",
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
        children={() => <AccountNavigation setIsAuthenticated={setIsAuthenticated} />} // Pass setIsAuthenticated to AccountNavigation
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-outline"
              size={24}
              color={color}
              headerShown ={false}
              
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainBottomNavigation;