import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient

const StoresCard = ({ name, gradient, onPress, logo }) => {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <LinearGradient colors={gradient} style={styles.gradientBackground}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: logo }}
            style={styles.logo}
            resizeMode="contain"
            // resizeMode="cover"
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.text}>{name}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default StoresCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flex: 1,
    margin: 8,
    maxWidth: "47%",
  },
  text: { textAlign: "center", fontSize: 20, fontWeight: "bold" },

  logo: {
    width: 250,
    height: 120,
    borderRadius: 10,
  },
  gradientBackground: {
    flex: 1, // Ensure the gradient takes up the entire container
    borderRadius: 18, // Make sure the gradient has rounded corners
    marginTop: 10,
  },
  imageContainer: {
    height: 150,
    width: "100%",
    backgroundColor: "#ffff",
    alignItems: "center",
  },
  infoContainer: {
    padding: 12,
  },
});
