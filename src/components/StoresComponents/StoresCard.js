import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient
import { useNavigation } from "@react-navigation/native";

const StoresCard = ({ name, gradient, logo, id }) => {
  const navigation = useNavigation();
  return (
    // Apply the cardContainer style here for the shadow effect
    <TouchableOpacity
      style={styles.cardContainer} // Changed from inline style to styles.cardContainer
      activeOpacity={0.8}
      onPress={() => navigation.navigate("StoreDetailsScreen", { StoreId: id })}
    >
      {/* LinearGradient remains inside for the background */}
      <LinearGradient colors={gradient} style={styles.gradientBackground}>
        {/* Image container */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: logo }}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        {/* Info container */}
        <View style={styles.infoContainer}>
          <Text style={styles.text}>{name}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default StoresCard;

const styles = StyleSheet.create({
  // Style for the main TouchableOpacity container, including shadow
  cardContainer: {
    backgroundColor: "#FFFFFF", // Needed for shadow visibility on iOS
    borderRadius: 18, // Keep the rounded rectangle shape
    marginBottom: 15, // Spacing below the card
    flex: 1,
    margin: 8, // Spacing around the card
    maxWidth: "100%", // Max width for grid layout

    // --- Shadow Properties ---
    // iOS Shadow
    shadowColor: "#000", // Shadow color
    shadowOffset: {
      width: 0, // Horizontal offset
      height: 4, // Vertical offset (positive value puts shadow below)
    },
    shadowOpacity: 0.3, // Opacity of the shadow
    shadowRadius: 4.65, // Blur radius of the shadow
    // Android Shadow
    elevation: 8, // Elevation for Android shadow effect
    // Important: Do NOT use overflow: 'hidden' here if you want the shadow to be visible
  },
  // Style for the gradient background inside the card
  gradientBackground: {
    flex: 1, // Ensure the gradient takes up the entire container
    borderRadius: 18, // Match the container's border radius
    // marginTop: 10, // Removed marginTop, adjust if needed
    overflow: "hidden", // Clip the inner content (image, text) to the rounded corners
  },
  // Style for the container holding the image
  imageContainer: {
    height: 150,
    width: "100%",
    backgroundColor: "#ffff", // White background for the image area
    alignItems: "center", // Center the logo horizontally
    justifyContent: "center", // Center the logo vertically
  },
  // Style for the store logo image
  logo: {
    width: "80%", // Adjust width as needed
    height: "80%", // Adjust height as needed
    // Removed borderRadius from logo to let imageContainer handle background/shape if needed
  },
  // Style for the container holding the store name text
  infoContainer: {
    padding: 12, // Padding around the text
  },
  // Style for the store name text
  text: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#333", // Added a default text color for better visibility
  },
});
