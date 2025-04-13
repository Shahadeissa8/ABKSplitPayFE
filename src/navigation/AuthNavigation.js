import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen2 from "../screens/SplashScreen2";
import OnBoardingScreen from "../screens/auth/OnBoardingScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";

const Stack = createStackNavigator();

const AuthNavigation = ({ setIsAuthenticated }) => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen2">
      <Stack.Screen
        name="SplashScreen2"
        component={SplashScreen2}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OnBoardingScreen"
        component={OnBoardingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginScreen"
        options={{ headerShown: false }}
      >
        {props => <LoginScreen {...props} setIsAuthenticated={setIsAuthenticated} />}
      </Stack.Screen>
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigation;