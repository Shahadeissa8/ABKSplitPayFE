import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image, Platform } from "react-native";

const StoresCard = ({ name, logo, id, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View style={styles.content}>
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
      </View>
    </TouchableOpacity>
  );
};

export default StoresCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  imageContainer: {
    width: 80,
    height: 80,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  logo: {
    width: "90%",
    height: "90%",
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
});