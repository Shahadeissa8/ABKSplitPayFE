import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const ProductCard = ({ productId, name, price, image }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("RestaurantsScreen", { productId })}
    >
      <LinearGradient
        colors={["#26589c", "#9cb2d8"]}
        style={styles.gradientBackground}
      >
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
    overflow: "hidden",
    elevation: 4,
  },
  gradientBackground: {
    padding: 10,
    borderRadius: 15,
  },
  imageContainer: {
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
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
