import React, { useState, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigation from "./src/navigation/AuthNavigation";
import MainBottomNavigation from "./src/navigation/MainBottomNavigation";
import { getToken } from "./src/api/storage";
import { getProfile } from "./src/api/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const queryClient = new QueryClient();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = await getToken(); // Retrieve the stored token
        if (token) {
          setIsAuthenticated(true); // Stay logged in if token exists
        } else {
          setIsAuthenticated(false); // Log out if no token
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false); // Log out if error occurs
      }
      setLoading(false); // Set loading to false once the check is done
    };

    checkAuthentication(); // Call the function to check authentication status
  }, []);





  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        {isAuthenticated ? (
          <MainBottomNavigation />
        ) : (
          <AuthNavigation setIsAuthenticated={setIsAuthenticated} />
        )}
      </QueryClientProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
