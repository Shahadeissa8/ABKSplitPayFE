// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Dimensions,
//   Animated,
// } from "react-native";
// import React, { useEffect, useState } from "react";
// import { LinearGradient } from "expo-linear-gradient";
// import { BlurView } from "expo-blur";
// import { getProductCategories } from "../../api/ProductCategoryAPI";

// const { width } = Dimensions.get("window");

// const categories = [
//   {
//     id: "1",
//     name: "Electronics",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOGpjLP9sAzw3vDeUmhx7CQZxJAn1wUmxLhw&s",
//     gradient: ["#26589c", "#9cb2d8"], // Flipped gradient colors
//   },
//   {
//     id: "2",
//     name: "Fashion",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOGpjLP9sAzw3vDeUmhx7CQZxJAn1wUmxLhw&s",
//     gradient: ["#26589c", "#9cb2d8"], // Flipped gradient colors
//   },
//   {
//     id: "3",
//     name: "Home",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOGpjLP9sAzw3vDeUmhx7CQZxJAn1wUmxLhw&s",
//     gradient: ["#26589c", "#9cb2d8"], // Flipped gradient colors
//   },
//   {
//     id: "4",
//     name: "Sports",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOGpjLP9sAzw3vDeUmhx7CQZxJAn1wUmxLhw&s",
//     gradient: ["#26589c", "#9cb2d8"], // Flipped gradient colors
//   },
// ];

// const CategoryCard = () => {
//   const scrollX = new Animated.Value(0);
//   const [activeIndex, setActiveIndex] = useState(0);

//   const renderCard = ({ item, index }) => {
//     const inputRange = [
//       (index - 1) * width,
//       index * width,
//       (index + 1) * width,
//     ];

//     const scale = scrollX.interpolate({
//       inputRange,
//       outputRange: [0.9, 1, 0.9],
//       extrapolate: "clamp",
//     });

//     return (
//       <TouchableOpacity
//         key={item.id}
//         style={styles.cardContainer}
//         activeOpacity={0.8}
//       >
//         <View style={[styles.card, { transform: [{ scale: 1 }] }]}>
//           <LinearGradient
//             colors={item.gradient}
//             style={styles.gradientBackground}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 1 }}
//           >
//             <BlurView intensity={20} style={styles.blurContainer}>
//               <Image
//                 source={{ uri: item.image }}
//                 style={styles.image}
//                 resizeMode="cover"
//               />
//             </BlurView>
//             <Text style={styles.text}>{item.name}</Text>
//           </LinearGradient>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   const handleScroll = Animated.event(
//     [{ nativeEvent: { contentOffset: { x: scrollX } } }],
//     {
//       useNativeDriver: false,
//       listener: (event) => {
//         const slideSize = width * 0.8 + 20;
//         const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
//         setActiveIndex(index);
//       },
//     }
//   );

//   return (
//     <View style={styles.container}>
//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContent}
//         snapToInterval={width * 0.8 + 20}
//         snapToAlignment="center"
//         decelerationRate="fast"
//         onScroll={handleScroll}
//         scrollEventThrottle={16} // Keep this from the uncommented code
//       >
//         {categories.map((item, index) => renderCard({ item, index }))}
//       </ScrollView>

//       {/* <View style={styles.pagination}>
//         {categories.map((_, index) => (
//           <View
//             key={index}
//             style={[
//               styles.paginationDot,
//               index === activeIndex && styles.paginationDotActive, // Keep this behavior from uncommented code
//             ]}
//           />
//         ))}
//       </View> */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginVertical: 20,
//   },
//   scrollContent: {
//     paddingHorizontal: 10,
//   },
//   cardContainer: {
//     width: "auto",
//     height: "auto",
//     marginHorizontal: 5,
//   },
//   card: {
//     borderRadius: 20,
//     overflow: "hidden",
//     elevation: 5,
//     shadowColor: "#2E3192",
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.2,
//     shadowRadius: 8,
//   },
//   gradientBackground: {
//     padding: 2,
//   },
//   blurContainer: {
//     backgroundColor: "rgba(46, 49, 146, 0.1)",
//     padding: 20,
//     flexDirection: "row",
//     alignItems: "center",
//     borderRadius: 18,
//   },
//   image: {
//     width: 100,
//     height: 100,
//     borderRadius: 10,
//     // marginRight: 15,
//     borderWidth: 2,
//     borderColor: "#fff",
//     marginBottom: -20,
//     alignSelf: "flex-start",
//   },
//   text: {
//     margin: 10,
//     fontSize: 22,
//     fontWeight: "700",
//     color: "#fff",
//     // alignItems: "center",
//     alignSelf: "center",
//   },
//   // pagination: {
//   //   flexDirection: "row",
//   //   justifyContent: "center",
//   //   alignItems: "center",
//   //   marginTop: 20,
//   // },
//   // paginationDot: {
//   //   width: 8,
//   //   height: 8,
//   //   borderRadius: 4,
//   //   backgroundColor: "rgba(38, 88, 156, 0.2)",
//   //   marginHorizontal: 4,
//   // },
//   // paginationDotActive: {
//   //   backgroundColor: "#26589c",
//   //   width: 24,
//   // },
// });

// export default CategoryCard;
// import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
// import React from "react";
// import { LinearGradient } from "expo-linear-gradient";
// import { BlurView } from "expo-blur";

// const CategoryCard = ({ name, image, gradient }) => {
//   return (
//     <TouchableOpacity style={styles.cardContainer} activeOpacity={0.8} onPress={() =>
//       navigation.navigate("ProductList", { productCategoryId: 1 })
//     }>
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
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { useNavigation } from "@react-navigation/native";
const CategoryCard = ({ name, gradient, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      activeOpacity={0.8}
      onPress={onPress} // 👈 Easy update
    >
      <View style={styles.card}>
        <LinearGradient colors={gradient} style={styles.gradientBackground}>
          <BlurView intensity={20} style={styles.blurContainer} />
          <Text style={styles.text}>{name}</Text>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
};

// const CategoryCard = ({ name, image, gradient, productCategoryId }) => {
//   const navigation = useNavigation();

//   return (
// <TouchableOpacity
//   style={styles.cardContainer}
//   activeOpacity={0.8}
//   onPress={
//     () => navigation.navigate("ProductList", { productCategoryId }) // ✅ Make sure this isn't undefined
//   }
// >
//   <View style={styles.card}>
//     <LinearGradient colors={gradient} style={styles.gradientBackground}>
//       <BlurView intensity={20} style={styles.blurContainer}>
//         {/* If you want to show image, uncomment below */}
//         {/* <Image
//           source={{ uri: image }}
//           style={styles.image}
//           resizeMode="cover"
//         /> */}
//       </BlurView>
//       <Text style={styles.text}>{name}</Text>
//     </LinearGradient>
//   </View>
// </TouchableOpacity>
//   );
// };

export default CategoryCard;
const styles = StyleSheet.create({
  cardContainer: {
    width: 200,
    marginHorizontal: 5,
    marhginleft: 9,
  },
  card: {
    borderRadius: 20,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#2E3192",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  gradientBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 20,
  },
  blurContainer: {
    backgroundColor: "rgba(46, 49, 146, 0.1)",
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: -20,
    borderWidth: 2,
    borderColor: "#fff",
  },
  text: {
    // marginTop: 10,
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
  },
});
