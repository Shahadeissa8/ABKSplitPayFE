import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ExploreScreen from "../screens/shopping/ExploreScreen";
import MyCartScreen from "../screens/checkOut/MyCartScreen";
import CheckoutScreen from "../screens/checkOut/CheckoutScreen";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const Stack = createNativeStackNavigator();

const ExploreNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        // headerShown: false,
        animation: "slide_from_right",
        presentation: "card",
        gestureEnabled: true,
        gestureDirection: "horizontal",
      }}
      initialRouteName="ExploreScreen"
    >
      <Stack.Screen
        name="ExploreScreen"
        component={ExploreScreen}
        options={{
          header: () => {
            // return (
            //   <LinearGradient
            //     colors={["#26589c", "#26589c"]}
            //     style={styles.header}
            //   >
            //     /
            //   </LinearGradient>
            // );
          },
        }}
      />
      <Stack.Screen name="MyCartScreen" component={MyCartScreen}     options={{
          header: () => {
            // return (
            //   <LinearGradient
            //     colors={["#26589c", "#26589c"]}
            //     style={styles.header}
            //   >
            //     /
            //   </LinearGradient>
            // );
          },
        }}/>
      <Stack.Screen name="CheckoutScreen" component={CheckoutScreen}    options={{
          header: () => {
            // return (
            //   <LinearGradient
            //     colors={["#26589c", "#26589c"]}
            //     style={styles.header}
            //   >
            //     /
            //   </LinearGradient>
            // );
          },
        }} />
    </Stack.Navigator>
  );
};

export default ExploreNavigation;

const styles = StyleSheet.create({
  header: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
