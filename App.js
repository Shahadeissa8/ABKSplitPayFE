import React, { useState, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AuthNavigation from "./src/navigation/AuthNavigation";
import MainBottomNavigation from "./src/navigation/MainBottomNavigation";
import { getToken } from "./src/api/storage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "./src/context/CartContext";

const Stack = createStackNavigator();
const queryClient = new QueryClient();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = await getToken();
        setIsAuthenticated(!!token);
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#26589c" />
        {/* <StatusBar barStyle="light-content" backgroundColor="#26589c" /> */}
      </View>
    );
  }

  return (
    <CartProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false, 
    backgroundColor: "#f8f9fa",}}>
            {/* {isAuthenticated ? ( */}
              <Stack.Screen
                name="MainBottomNavigation"
                children={() => (
                  <MainBottomNavigation
                    setIsAuthenticated={setIsAuthenticated}
                  />
                )}
              />
            {/* )  */}
            {/* : (
              <Stack.Screen
                name="AuthNavigation"
                children={() => (
                  <AuthNavigation setIsAuthenticated={setIsAuthenticated} />
                )}
              />
            )} */}
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fffff",
  },
});
