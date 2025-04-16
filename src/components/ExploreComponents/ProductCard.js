import {
  StyleSheet,
  Text,
  View,
  Modal,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
const ProductCard = ({ name, price, image, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={onPress} 
    >
      <LinearGradient
        colors={["#26589c", "#9cb2d8"]}
        style={styles.gradientBackground}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: image  }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.price}>Price: {price} KD</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    width: "48%",
    marginVertical: 8,
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
  },
  gradientBackground: {
    paddingBottom: 10,
    borderRadius: 15,
  },
  image: {
    width: "100%",
    height: 150,
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
