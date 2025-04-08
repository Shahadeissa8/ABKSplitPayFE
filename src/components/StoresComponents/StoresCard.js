// import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
// import React from "react";

// const ProductCard = ({ product, onPress }) => {
//   const defaultImage = "https://via.placeholder.com/150";

//   return (
//     <TouchableOpacity style={styles.container} onPress={onPress}>
//       <View style={styles.imageContainer}>
//         <Image
//           source={{ uri: product?.image || defaultImage }}
//           style={styles.image}
//           resizeMode="cover"
//         />
//       </View>
//       <View style={styles.infoContainer}>
//         <Text style={styles.name} numberOfLines={2}>
//           {product?.name || "Product Name"}
//         </Text>
//         <Text style={styles.description} numberOfLines={2}>
//           {product?.description || "Product Description"}
//         </Text>
//         <Text style={styles.price}>
//           ${product?.price?.toFixed(2) || "0.00"}
//         </Text>
//       </View>
//     </TouchableOpacity>
//   );
// };

// export default ProductCard;

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#FFFFFF",
//     // "#26589c", "#9cb2d8"
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
//     flex: 1,
//     margin: 8,
//     maxWidth: "47%",
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
//     fontFamily: "Lato",
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#181725",
//     marginBottom: 4,
//   },
//   description: {
//     fontFamily: "Lato",
//     fontSize: 13,
//     color: "#7C7C7C",
//     marginBottom: 8,
//   },
//   price: {
//     fontFamily: "Lato",
//     fontSize: 18,
//     fontWeight: "700",
//     color: "#181725",
//   },
// });
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient

const StoresCard = ({ product, onPress }) => {
  const defaultImage = "https://via.placeholder.com/150";

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <LinearGradient
        colors={["#26589c", "#9cb2d8"]} // Add your gradient colors here
        style={styles.gradientBackground} // Add a new style for the gradient background
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product?.image || defaultImage }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.infoContainer}>
          <Text scnumberOfLines={2}>{product?.name || "Product Name"}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {product?.description || "Product Description"}
          </Text>
          <Text style={styles.price}>
            ${product?.price?.toFixed(2) || "0.00"}
          </Text>
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
  gradientBackground: {
    flex: 1, // Ensure the gradient takes up the entire container
    borderRadius: 18, // Make sure the gradient has rounded corners
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
    fontFamily: "Lato",
    fontSize: 16,
    fontWeight: "600",
    color: "#fff", // Change text color to white for better contrast against gradient
    marginBottom: 4,
  },
  description: {
    fontFamily: "Lato",
    fontSize: 13,
    color: "#fff", // Change text color to white for better contrast against gradient
    marginBottom: 8,
  },
  price: {
    fontFamily: "Lato",
    fontSize: 18,
    fontWeight: "700",
    color: "#fff", // Change text color to white for better contrast against gradient
  },
});
