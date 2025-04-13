// // import {
// //   StyleSheet,
// //   Text,
// //   View,
// //   Image,
// //   ScrollView,
// //   TouchableOpacity,
// // } from "react-native";
// // import React from "react";
// // import { LinearGradient } from "expo-linear-gradient";
// // import { useNavigation } from "@react-navigation/native";

// // const ProductCard = (onPress) => {
// //   const navigation = useNavigation();
// //   return (
// //     <ScrollView style={styles.scrollContainer}>
// //       <View style={styles.productContainer}>
// //         {/* First product */}
// //         <TouchableOpacity
// //           style={styles.container}
// //           onPress={() => {
// //             navigation.navigate("RestaurantsScreen", {
// //               productId,
// //             });
// //           }}
// //         >
// //           <LinearGradient
// //             colors={["#26589c", "#9cb2d8"]}
// //             style={styles.gradientBackground}
// //           >
// //             <View style={styles.imageContainer}>
// //               <Image
// //                 source={{
// //                   uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOGpjLP9sAzw3vDeUmhx7CQZxJAn1wUmxLhw&s",
// //                 }}
// //                 style={styles.image}
// //               />
// //             </View>
// //             <View style={styles.infoContainer}>
// //               <Text style={styles.name}>Iphone</Text>
// //               <Text style={styles.price}>price: 410KD</Text>
// //             </View>
// //           </LinearGradient>
// //         </TouchableOpacity>
// //         {/* Second product */}
// //         <TouchableOpacity style={styles.container}>
// //           <LinearGradient
// //             colors={["#26589c", "#9cb2d8"]}
// //             style={styles.gradientBackground}
// //           >
// //             <View style={styles.imageContainer}>
// //               <Image
// //                 source={{
// //                   uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOGpjLP9sAzw3vDeUmhx7CQZxJAn1wUmxLhw&s",
// //                 }}
// //                 style={styles.image}
// //               />
// //             </View>
// //             <View style={styles.infoContainer}>
// //               <Text style={styles.name}>Iphone</Text>
// //               <Text style={styles.price}>price: 333 KD</Text>
// //             </View>
// //           </LinearGradient>
// //         </TouchableOpacity>
// //         {/* Third product */}
// //         <TouchableOpacity style={styles.container}>
// //           <LinearGradient
// //             colors={["#26589c", "#9cb2d8"]}
// //             style={styles.gradientBackground}
// //           >
// //             <View style={styles.imageContainer}>
// //               <Image
// //                 source={{
// //                   uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOGpjLP9sAzw3vDeUmhx7CQZxJAn1wUmxLhw&s",
// //                 }}
// //                 style={styles.image}
// //               />
// //             </View>
// //             <View style={styles.infoContainer}>
// //               <Text style={styles.name}>Iphone</Text>
// //               <Text style={styles.price}>price: 333 KD</Text>
// //             </View>
// //           </LinearGradient>
// //         </TouchableOpacity>
// //         {/* Fourth product */}
// //         <TouchableOpacity style={styles.container}>
// //           <LinearGradient
// //             colors={["#26589c", "#9cb2d8"]}
// //             style={styles.gradientBackground}
// //           >
// //             <View style={styles.imageContainer}>
// //               <Image
// //                 source={{
// //                   uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOGpjLP9sAzw3vDeUmhx7CQZxJAn1wUmxLhw&s",
// //                 }}
// //                 style={styles.image}
// //               />
// //             </View>
// //             <View style={styles.infoContainer}>
// //               <Text style={styles.name}>Iphone</Text>
// //               <Text style={styles.price}>price: 333 KD</Text>
// //             </View>
// //           </LinearGradient>
// //         </TouchableOpacity>{" "}
// //         {/* fifth product */}
// //         <TouchableOpacity style={styles.container}>
// //           <LinearGradient
// //             colors={["#26589c", "#9cb2d8"]}
// //             style={styles.gradientBackground}
// //           >
// //             <View style={styles.imageContainer}>
// //               <Image
// //                 source={{
// //                   uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOGpjLP9sAzw3vDeUmhx7CQZxJAn1wUmxLhw&s",
// //                 }}
// //                 style={styles.image}
// //               />
// //             </View>
// //             <View style={styles.infoContainer}>
// //               <Text style={styles.name}>Iphone</Text>
// //               <Text style={styles.price}>price: 333 KD</Text>
// //             </View>
// //           </LinearGradient>
// //         </TouchableOpacity>
// //       </View>
// //     </ScrollView>
// //   );
// // };

// // export default ProductCard;

// // const styles = StyleSheet.create({
// //   scrollContainer: {
// //     flex: 1,
// //     padding: 10,
// //   },
// //   productContainer: {
// //     flexDirection: "row", // Items will align horizontally
// //     flexWrap: "wrap", // Wrap the items to the next line when the row is full
// //     justifyContent: "space-between", // Space out the items
// //   },
// //   container: {
// //     backgroundColor: "#FFFFFF",
// //     borderRadius: 18,
// //     overflow: "hidden",
// //     shadowColor: "#000",
// //     shadowOffset: {
// //       width: 0,
// //       height: 2,
// //     },
// //     shadowOpacity: 0.25,
// //     shadowRadius: 3.84,
// //     elevation: 5,
// //     width: "48%", // Each item will take up 48% of the width, two items per row
// //     height: 230, // Fixed height for consistency
// //     marginBottom: 15, // Add space between rows
// //   },
// //   gradientBackground: {
// //     flex: 1,
// //     borderRadius: 18,
// //   },
// //   imageContainer: {
// //     height: 150,
// //     width: "100%",
// //     backgroundColor: "#F2F3F2",
// //   },
// //   image: {
// //     width: "100%",
// //     height: "100%",
// //   },
// //   infoContainer: {
// //     padding: 12,
// //   },
// //   name: {
// //     alignSelf: "center",
// //     fontFamily: "Lato",
// //     fontSize: 25,
// //     fontWeight: "600",
// //     color: "#fff",
// //     marginBottom: 4,
// //   },
// //   price: {
// //     alignSelf: "center",
// //     fontFamily: "Lato",
// //     fontSize: 15,
// //     fontWeight: "700",
// //     color: "#fff",
// //   },
// // });
// // import {
// //   View,
// //   Text,
// //   Image,
// //   StyleSheet,
// //   ScrollView,
// //   TouchableOpacity,
// //   Dimensions,
// //   Animated,
// // } from "react-native";
// // import React, { useEffect, useState } from "react";
// // import { LinearGradient } from "expo-linear-gradient";
// // import { BlurView } from "expo-blur";
// // import { getProductCategories } from "../../api/ProductCategoryAPI";

// // const { width } = Dimensions.get("window");

// // const categories = [
// //   {
// //     id: "1",
// //     name: "Electronics",
// //     image:
// //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOGpjLP9sAzw3vDeUmhx7CQZxJAn1wUmxLhw&s",
// //     gradient: ["#26589c", "#9cb2d8"], // Flipped gradient colors
// //   },
// //   {
// //     id: "2",
// //     name: "Fashion",
// //     image:
// //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOGpjLP9sAzw3vDeUmhx7CQZxJAn1wUmxLhw&s",
// //     gradient: ["#26589c", "#9cb2d8"], // Flipped gradient colors
// //   },
// //   {
// //     id: "3",
// //     name: "Home",
// //     image:
// //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOGpjLP9sAzw3vDeUmhx7CQZxJAn1wUmxLhw&s",
// //     gradient: ["#26589c", "#9cb2d8"], // Flipped gradient colors
// //   },
// //   {
// //     id: "4",
// //     name: "Sports",
// //     image:
// //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOGpjLP9sAzw3vDeUmhx7CQZxJAn1wUmxLhw&s",
// //     gradient: ["#26589c", "#9cb2d8"], // Flipped gradient colors
// //   },
// // ];

// // const CategoryCard = () => {
// //   const scrollX = new Animated.Value(0);
// //   const [activeIndex, setActiveIndex] = useState(0);

// //   const renderCard = ({ item, index }) => {
// //     const inputRange = [
// //       (index - 1) * width,
// //       index * width,
// //       (index + 1) * width,
// //     ];

// //     const scale = scrollX.interpolate({
// //       inputRange,
// //       outputRange: [0.9, 1, 0.9],
// //       extrapolate: "clamp",
// //     });

// //     return (
// //       <TouchableOpacity
// //         key={item.id}
// //         style={styles.cardContainer}
// //         activeOpacity={0.8}
// //       >
// //         <View style={[styles.card, { transform: [{ scale: 1 }] }]}>
// //           <LinearGradient
// //             colors={item.gradient}
// //             style={styles.gradientBackground}
// //             start={{ x: 0, y: 0 }}
// //             end={{ x: 1, y: 1 }}
// //           >
// //             <BlurView intensity={20} style={styles.blurContainer}>
// //               <Image
// //                 source={{ uri: item.image }}
// //                 style={styles.image}
// //                 resizeMode="cover"
// //               />
// //             </BlurView>
// //             <Text style={styles.text}>{item.name}</Text>
// //           </LinearGradient>
// //         </View>
// //       </TouchableOpacity>
// //     );
// //   };

// //   const handleScroll = Animated.event(
// //     [{ nativeEvent: { contentOffset: { x: scrollX } } }],
// //     {
// //       useNativeDriver: false,
// //       listener: (event) => {
// //         const slideSize = width * 0.8 + 20;
// //         const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
// //         setActiveIndex(index);
// //       },
// //     }
// //   );

// //   return (
// //     <View style={styles.container}>
// //       <ScrollView
// //         horizontal
// //         showsHorizontalScrollIndicator={false}
// //         contentContainerStyle={styles.scrollContent}
// //         snapToInterval={width * 0.8 + 20}
// //         snapToAlignment="center"
// //         decelerationRate="fast"
// //         onScroll={handleScroll}
// //         scrollEventThrottle={16} // Keep this from the uncommented code
// //       >
// //         {categories.map((item, index) => renderCard({ item, index }))}
// //       </ScrollView>

// //       {/* <View style={styles.pagination}>
// //         {categories.map((_, index) => (
// //           <View
// //             key={index}
// //             style={[
// //               styles.paginationDot,
// //               index === activeIndex && styles.paginationDotActive, // Keep this behavior from uncommented code
// //             ]}
// //           />
// //         ))}
// //       </View> */}
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     marginVertical: 20,
// //   },
// //   scrollContent: {
// //     paddingHorizontal: 10,
// //   },
// //   cardContainer: {
// //     width: "auto",
// //     height: "auto",
// //     marginHorizontal: 5,
// //   },
// //   card: {
// //     borderRadius: 20,
// //     overflow: "hidden",
// //     elevation: 5,
// //     shadowColor: "#2E3192",
// //     shadowOffset: {
// //       width: 0,
// //       height: 4,
// //     },
// //     shadowOpacity: 0.2,
// //     shadowRadius: 8,
// //   },
// //   gradientBackground: {
// //     padding: 2,
// //   },
// //   blurContainer: {
// //     backgroundColor: "rgba(46, 49, 146, 0.1)",
// //     padding: 20,
// //     flexDirection: "row",
// //     alignItems: "center",
// //     borderRadius: 18,
// //   },
// //   image: {
// //     width: 100,
// //     height: 100,
// //     borderRadius: 10,
// //     // marginRight: 15,
// //     borderWidth: 2,
// //     borderColor: "#fff",
// //     marginBottom: -20,
// //     alignSelf: "flex-start",
// //   },
// //   text: {
// //     margin: 10,
// //     fontSize: 22,
// //     fontWeight: "700",
// //     color: "#fff",
// //     // alignItems: "center",
// //     alignSelf: "center",
// //   },
// //   // pagination: {
// //   //   flexDirection: "row",
// //   //   justifyContent: "center",
// //   //   alignItems: "center",
// //   //   marginTop: 20,
// //   // },
// //   // paginationDot: {
// //   //   width: 8,
// //   //   height: 8,
// //   //   borderRadius: 4,
// //   //   backgroundColor: "rgba(38, 88, 156, 0.2)",
// //   //   marginHorizontal: 4,
// //   // },
// //   // paginationDotActive: {
// //   //   backgroundColor: "#26589c",
// //   //   width: 24,
// //   // },
// // });

// // export default CategoryCard;
// import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
// import React from "react";
// import { LinearGradient } from "expo-linear-gradient";
// import { BlurView } from "expo-blur";

// const CategoryCard = ({ name, image, gradient }) => {
//   return (
//     <TouchableOpacity style={styles.cardContainer} activeOpacity={0.8}>
//       <View style={styles.card}>
//         <LinearGradient colors={gradient} style={styles.gradientBackground}>
//           <BlurView intensity={20} style={styles.blurContainer}>
//             {/* <Image
//               source={{ uri: image }}
//               style={styles.image}
//               resizeMode="cover"
//             /> */}
//           </BlurView>
//           <Text style={styles.text}>{name}</Text>
//         </LinearGradient>
//       </View>
//     </TouchableOpacity>
//   );
// };

// export default CategoryCard;
// const styles = StyleSheet.create({
//   cardContainer: {
//     width: 200,
//     marginHorizontal: 5,
//     marhginleft: 9,
//   },
//   card: {
//     borderRadius: 20,
//     overflow: "hidden",
//     elevation: 5,
//     shadowColor: "#2E3192",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 8,
//   },
//   gradientBackground: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//     borderRadius: 20,
//   },
//   blurContainer: {
//     backgroundColor: "rgba(46, 49, 146, 0.1)",
//     borderRadius: 18,
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   image: {
//     width: 100,
//     height: 100,
//     borderRadius: 10,
//     marginBottom: -20,
//     borderWidth: 2,
//     borderColor: "#fff",
//   },
//   text: {
//     // marginTop: 10,
//     fontSize: 18,
//     fontWeight: "700",
//     color: "#fff",
//     textAlign: "center",
//   },
// });
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
