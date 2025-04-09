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

const DealsCard = () => {
  return (
    <ScrollView style={styles.scrollContainer} horizontal={true}>
      {/* <TouchableOpacity style={styles.card}>*/}
      <TouchableOpacity style={styles.container}>
        <LinearGradient
          colors={["#26589c", "#9cb2d8"]} // Add your gradient colors here
          style={styles.gradientBackground} // Add a new style for the gradient background
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
      <TouchableOpacity style={styles.container}>
        <LinearGradient
          colors={["#26589c", "#9cb2d8"]} // Add your gradient colors here
          style={styles.gradientBackground} // Add a new style for the gradient background
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
      <TouchableOpacity style={styles.container}>
        <LinearGradient
          colors={["#26589c", "#9cb2d8"]} // Add your gradient colors here
          style={styles.gradientBackground} // Add a new style for the gradient background
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
    </ScrollView>
    // </View>
  );
};

export default DealsCard;

const styles = StyleSheet.create({
  viewContainer: { marginTop: -70 },
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
    marginHorizontal: 8,
    width: 100, // Set the width here instead of maxWidth for more control
    height: 160, // You can set a fixed height to avoid overflowing
  },
  dealsText: {
    // alignSelf: "stretch",
    marginTop: 40,
    marginLeft: 20,
    fontSize: 10,
    fontWeight: "bold",
    // marginBottom: 10,
  },
  Text: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  scrollContainer: {
    flexDirection: "row", // Ensures horizontal scrolling
    padding: 10, // Optional: Add some padding around the scrollview for spacing
  },
  gradientBackground: {
    flex: 1, // Ensure the gradient takes up the entire container
    borderRadius: 18, // Make sure the gradient has rounded corners
  },
  imageContainer: {
    height: 100,
    width: "100%",
    backgroundColor: "#F2F3F2",
    alignSelf: "center",
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
    color: "#fff", // Change text color to white for better contrast against gradient
    marginBottom: 4,
  },
  price: {
    alignSelf: "center",
    fontFamily: "Lato",
    fontSize: 13,
    fontWeight: "700",
    color: "#fff", // Change text color to white for better contrast against gradient
  },
});
