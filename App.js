import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigation from "./src/navigation/AuthNavigation";
import MainBottomNavigation from "./src/navigation/MainBottomNavigation";
import { getToken } from "./src/api/storage";
import { getProfile } from "./src/api/auth";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = await getToken();
        if (token) {
          await getProfile(); // Verify the token is valid by fetching the profile
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Authentication check failed:", error.message);
        setIsAuthenticated(false); // Ensure user is logged out if token is invalid
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, []);

 

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <MainBottomNavigation />
      ) : (
        <AuthNavigation setIsAuthenticated={setIsAuthenticated} />
      )}
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