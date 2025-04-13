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
  const [loading, setLoading] = useState(true);
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

  // useEffect(() => {
  //   const checkAuthentication = async () => {
  //     try {
  //       const token = await getToken();
  //       if (token) {
  //         await getProfile(); // Verify the token is valid by fetching the profile
  //         setIsAuthenticated(true);
  //       }
  //     } catch (error) {
  //       console.error("Authentication check failed:", error.message);
  //       setIsAuthenticated(false); // Ensure user is logged out if token is invalid
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   checkAuthentication();
  // }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#26589c" />
        <StatusBar barStyle="light-content" backgroundColor="#26589c" />
      </View>
    );
  }

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
