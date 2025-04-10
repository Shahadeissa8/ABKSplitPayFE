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
import { useNavigation } from "@react-navigation/native";

const ProductCard = (onPress) => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.productContainer}>
        {/* First product */}
        <TouchableOpacity
          style={styles.container}
          onPress={() => {
            navigation.navigate("RestaurantsScreen", {
              productId,
            });
          }}
        >
          <LinearGradient
            colors={["#26589c", "#9cb2d8"]}
            style={styles.gradientBackground}
          >
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOGpjLP9sAzw3vDeUmhx7CQZxJAn1wUmxLhw&s",
                }}
                style={styles.image}
              />
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.name}>Iphone</Text>
              <Text style={styles.price}>price: 410KD</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
        {/* Second product */}
        <TouchableOpacity style={styles.container}>
          <LinearGradient
            colors={["#26589c", "#9cb2d8"]}
            style={styles.gradientBackground}
          >
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOGpjLP9sAzw3vDeUmhx7CQZxJAn1wUmxLhw&s",
                }}
                style={styles.image}
              />
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.name}>Iphone</Text>
              <Text style={styles.price}>price: 333 KD</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
        {/* Third product */}
        <TouchableOpacity style={styles.container}>
          <LinearGradient
            colors={["#26589c", "#9cb2d8"]}
            style={styles.gradientBackground}
          >
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOGpjLP9sAzw3vDeUmhx7CQZxJAn1wUmxLhw&s",
                }}
                style={styles.image}
              />
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.name}>Iphone</Text>
              <Text style={styles.price}>price: 333 KD</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
        {/* Fourth product */}
        <TouchableOpacity style={styles.container}>
          <LinearGradient
            colors={["#26589c", "#9cb2d8"]}
            style={styles.gradientBackground}
          >
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOGpjLP9sAzw3vDeUmhx7CQZxJAn1wUmxLhw&s",
                }}
                style={styles.image}
              />
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.name}>Iphone</Text>
              <Text style={styles.price}>price: 333 KD</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>{" "}
        {/* fifth product */}
        <TouchableOpacity style={styles.container}>
          <LinearGradient
            colors={["#26589c", "#9cb2d8"]}
            style={styles.gradientBackground}
          >
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOGpjLP9sAzw3vDeUmhx7CQZxJAn1wUmxLhw&s",
                }}
                style={styles.image}
              />
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.name}>Iphone</Text>
              <Text style={styles.price}>price: 333 KD</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    padding: 10,
  },
  productContainer: {
    flexDirection: "row", // Items will align horizontally
    flexWrap: "wrap", // Wrap the items to the next line when the row is full
    justifyContent: "space-between", // Space out the items
  },
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "48%", // Each item will take up 48% of the width, two items per row
    height: 230, // Fixed height for consistency
    marginBottom: 15, // Add space between rows
  },
  gradientBackground: {
    flex: 1,
    borderRadius: 18,
  },
  imageContainer: {
    height: 150,
    width: "100%",
    backgroundColor: "#F2F3F2",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  infoContainer: {
    padding: 12,
  },
  name: {
    alignSelf: "center",
    fontFamily: "Lato",
    fontSize: 25,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 4,
  },
  price: {
    alignSelf: "center",
    fontFamily: "Lato",
    fontSize: 15,
    fontWeight: "700",
    color: "#fff",
  },
});
