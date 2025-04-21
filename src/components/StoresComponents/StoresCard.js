import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient"; 
import { useNavigation } from "@react-navigation/native";

const StoresCard = ({ name, gradient, logo, id }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      activeOpacity={0.8}
      onPress={() => navigation.navigate("StoreDetailsScreen", { StoreId: id })}
    >
      <LinearGradient colors={gradient} style={styles.gradientBackground}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: logo }}
            style={styles.logo}
            resizeMode="contain"
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
  cardContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    marginBottom: 15,
    flex: 1,
    margin: 8,
    maxWidth: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  gradientBackground: {
    flex: 1,
    borderRadius: 18,
    overflow: "hidden",
  },
  imageContainer: {
    height: 150,
    width: "100%",
    backgroundColor: "#ffff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: "80%",
    height: "80%",
  },
  infoContainer: {
    padding: 12,
  },
  text: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
});
