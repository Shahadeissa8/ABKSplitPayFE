// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   ScrollView,
//   TouchableOpacity,
// } from "react-native";
// import React from "react";
// import { LinearGradient } from "expo-linear-gradient";

// const ProductCard = () => {
//   return (
//     <ScrollView style={styles.scrollContainer} >
//       <TouchableOpacity style={styles.container}>
//         <LinearGradient
//           colors={["#26589c", "#9cb2d8"]} // Add your gradient colors here
//           style={styles.gradientBackground} // Add a new style for the gradient background
//         >
//           <View style={styles.imageContainer}>
//             <Image
//               source={{
//                 uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOGpjLP9sAzw3vDeUmhx7CQZxJAn1wUmxLhw&s",
//               }}
//               style={styles.image}
//             />
//           </View>
//           <View style={styles.infoContainer}>
//             <Text style={styles.name}>Iphone</Text>
//             <Text style={styles.price}>price: 410KD</Text>
//           </View>
//         </LinearGradient>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.container}>
//         <LinearGradient
//           colors={["#26589c", "#9cb2d8"]} // Add your gradient colors here
//           style={styles.gradientBackground} // Add a new style for the gradient background
//         >
//           <View style={styles.imageContainer}>
//             <Image
//               source={{
//                 uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOGpjLP9sAzw3vDeUmhx7CQZxJAn1wUmxLhw&s",
//               }}
//               style={styles.image}
//             />
//           </View>
//           <View style={styles.infoContainer}>
//             <Text style={styles.name}>Iphone</Text>
//             <Text style={styles.price}>price: 333 KD</Text>
//           </View>
//         </LinearGradient>
//       </TouchableOpacity>{" "}
//       <TouchableOpacity style={styles.container}>
//         <LinearGradient
//           colors={["#26589c", "#9cb2d8"]} // Add your gradient colors here
//           style={styles.gradientBackground} // Add a new style for the gradient background
//         >
//           <View style={styles.imageContainer}>
//             <Image
//               source={{
//                 uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOGpjLP9sAzw3vDeUmhx7CQZxJAn1wUmxLhw&s",
//               }}
//               style={styles.image}
//             />
//           </View>
//           <View style={styles.infoContainer}>
//             <Text style={styles.name}>Iphone</Text>
//             <Text style={styles.price}>price: 333 KD</Text>
//           </View>
//         </LinearGradient>
//       </TouchableOpacity>
//     </ScrollView>
//     // </View>
//   );
// };

// export default ProductCard;

// const styles = StyleSheet.create({
//   viewContainer: { marginTop: -70 },
//   container: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 18,
//     overflow: "hidden",
//     marginBottom: 15,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//     marginHorizontal: 8,
//     width: 170, // Set the width here instead of maxWidth for more control
//     height: 230, // You can set a fixed height to avoid overflowing
//   },
//   dealsText: {
//     // alignSelf: "stretch",
//     marginTop: 40,
//     marginLeft: 20,
//     fontSize: 30,
//     fontWeight: "bold",
//     // marginBottom: 10,
//   },
//   Text: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   scrollContainer: {
//     flexDirection: "row", // Ensures horizontal scrolling
//     padding: 10, // Optional: Add some padding around the scrollview for spacing
//   },
//   gradientBackground: {
//     flex: 1, // Ensure the gradient takes up the entire container
//     borderRadius: 18, // Make sure the gradient has rounded corners
//   },
//   imageContainer: {
//     height: 150,
//     width: "100%",
//     backgroundColor: "#F2F3F2",
//   },
//   image: {
//     width: "100%",
//     height: "100%",
//   },
//   infoContainer: {
//     padding: 12,
//   },
//   name: {
//     alignSelf: "center",
//     fontFamily: "Lato",
//     fontSize: 25,
//     fontWeight: "600",
//     color: "#fff", // Change text color to white for better contrast against gradient
//     marginBottom: 4,
//   },
//   price: {
//     alignSelf: "center",
//     fontFamily: "Lato",
//     fontSize: 15,
//     fontWeight: "700",
//     color: "#fff", // Change text color to white for better contrast against gradient
//   },
// });
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

const ProductCard = () => {
  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.productContainer}>
        {/* First product */}
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
