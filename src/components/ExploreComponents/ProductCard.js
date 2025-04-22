import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";

const ProductCard = ({ name, price, image, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={styles.background}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: image }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.price}>Price: {price} KD</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    width: "48%",
    marginVertical: 8,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  background: {
    backgroundColor: "#26589c",
    paddingBottom: 10,
    borderRadius: 15,
  },
  imageContainer: {
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 190,

    resizeMode: "contain",
  },
  infoContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  price: {
    fontSize: 14,
    color: "#f0f0f0",
  },
});