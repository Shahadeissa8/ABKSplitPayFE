

import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const DealCard = ({ name, price, image, onPress }) => (
  <TouchableOpacity
    style={styles.container}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <View style={styles.imageContainer}>
      <Image source={image} style={styles.image} resizeMode="contain" />
    </View>
    {/* <LinearGradient
      colors={["#26589c", "#9cb2d8"]}
      style={styles.gradientBackground}
    >
      
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>Price: {price} KD</Text>
      </View>
    </LinearGradient> */}
  </TouchableOpacity>
);

const DealsCard = () => {
  const deals = [
    {
      id: "1",
      name: "iPhone 13",
      price: "410",
      image: require("../../../assets/deal1.png"),
    },
    {
      id: "2",
      name: "iPhone 14",
      price: "520",
      image: require("../../../assets/deal2fix.jpg"),
    },
    {
      id: "3",
      name: "iPhone 15",
      price: "650",
      image: require("../../../assets/deal3.png"),
    },
  ];

  return (
    <ScrollView
      style={styles.scrollContainer}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    >
      {deals.map((deal) => (
        <DealCard
          key={deal.id}
          name={deal.name}
          price={deal.price}
          image={deal.image}
          // onPress={() => console.log("Deal pressed:", deal.name)}
        />
      ))}
    </ScrollView>
  );
};

export default DealsCard;

const styles = StyleSheet.create({
  scrollContainer: {
    flexDirection: "row",
    padding: 10,
  },
  container: {
    width: 170,
    marginHorizontal: 8,
    marginVertical: 8,
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    elevation: 5,
  },
  gradientBackground: {
    paddingBottom: 10,
    borderRadius: 15,
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    overflow: "hidden",
    borderRadius: 15,
  },
  image: {
    width: "100%",
    height: 150,
  },
  infoContainer: {
    marginTop: 10,
    alignItems: "center",
    paddingHorizontal: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: "#f0f0f0",
  },
});
