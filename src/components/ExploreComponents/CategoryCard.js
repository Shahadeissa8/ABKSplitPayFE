// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
// } from "react-native";
// import React from "react";

// {
//   /* one cat card will be here */
// }

// const CategoryCard = () => {
//   return (
//     <View>
//       <ScrollView horizontal={true}>
//         <TouchableOpacity style={styles.card}>
//           <Image
//             source={{
//               uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOGpjLP9sAzw3vDeUmhx7CQZxJAn1wUmxLhw&s",
//             }}
//             style={{ width: 70, height: 70 }}
//           />
//           <Text style={styles.text}>Electronics</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.card}>
//           <Image
//             source={{
//               uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOGpjLP9sAzw3vDeUmhx7CQZxJAn1wUmxLhw&s",
//             }}
//             style={{ width: 70, height: 70 }}
//           />
//           <Text style={styles.text}>Electronics</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: "#fff",
//     borderRadius: 15,
//     margin: 5,
//     padding: 20,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 3,
//     flexDirection: "row",
//   },
//   text: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#333",
//     alignSelf: "center",
//     marginLeft: 10,
//   },
// });

// export default CategoryCard;
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

// const { width } = Dimensions.get("window");

// const categories = [
//   {
//     id: "1",
//     name: "Electronics",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOGpjLP9sAzw3vDeUmhx7CQZxJAn1wUmxLhw&s",
//     gradient: ["#2E3192", "#1BFFFF"],
//   },
//   {
//     id: "2",
//     name: "Fashion",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOGpjLP9sAzw3vDeUmhx7CQZxJAn1wUmxLhw&s",
//     gradient: ["#2E3192", "#1BFFFF"],
//   },
//   {
//     id: "3",
//     name: "Home",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOGpjLP9sAzw3vDeUmhx7CQZxJAn1wUmxLhw&s",
//     gradient: ["#2E3192", "#1BFFFF"],
//   },
//   {
//     id: "4",
//     name: "Sports",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOGpjLP9sAzw3vDeUmhx7CQZxJAn1wUmxLhw&s",
//     gradient: ["#2E3192", "#1BFFFF"],
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
//         <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
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
//               <Text style={styles.text}>{item.name}</Text>
//             </BlurView>
//           </LinearGradient>
//         </Animated.View>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContent}
//         snapToInterval={width * 0.8 + 20}
//         snapToAlignment="center"
//         decelerationRate="fast"
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { x: scrollX } } }],
//           { useNativeDriver: false }
//         )}
//       >
//         {categories.map((item, index) => renderCard({ item, index }))}
//       </ScrollView>

//       <View style={styles.pagination}>
//         {categories.map((_, index) => (
//           <View
//             key={index}
//             style={[
//               styles.paginationDot,
//               index === activeIndex && styles.paginationDotActive,
//             ]}
//           />
//         ))}
//       </View>
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
//     width: width * 0.8,
//     marginHorizontal: 10,
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
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     marginRight: 15,
//     borderWidth: 2,
//     borderColor: "#fff",
//   },
//   text: {
//     fontSize: 22,
//     fontWeight: "700",
//     color: "#fff",
//     flex: 1,
//   },
//   pagination: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 20,
//   },
//   paginationDot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: "rgba(46, 49, 146, 0.3)",
//     marginHorizontal: 4,
//   },
//   paginationDotActive: {
//     backgroundColor: "#2E3192",
//     width: 20,
//   },
// });

// export default CategoryCard;
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

const { width } = Dimensions.get("window");

const categories = [
  {
    id: "1",
    name: "Electronics",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOGpjLP9sAzw3vDeUmhx7CQZxJAn1wUmxLhw&s",
    gradient: ["#26589c", "#9cb2d8"], // Flipped gradient colors
  },
  {
    id: "2",
    name: "Fashion",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOGpjLP9sAzw3vDeUmhx7CQZxJAn1wUmxLhw&s",
    gradient: ["#26589c", "#9cb2d8"], // Flipped gradient colors
  },
  {
    id: "3",
    name: "Home",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOGpjLP9sAzw3vDeUmhx7CQZxJAn1wUmxLhw&s",
    gradient: ["#26589c", "#9cb2d8"], // Flipped gradient colors
  },
  {
    id: "4",
    name: "Sports",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOGpjLP9sAzw3vDeUmhx7CQZxJAn1wUmxLhw&s",
    gradient: ["#26589c", "#9cb2d8"], // Flipped gradient colors
  },
];

const CategoryCard = () => {
  const scrollX = new Animated.Value(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const renderCard = ({ item, index }) => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.9, 1, 0.9],
      extrapolate: "clamp",
    });

    return (
      <TouchableOpacity
        key={item.id}
        style={styles.cardContainer}
        activeOpacity={0.8}
      >
        <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
          <LinearGradient
            colors={item.gradient}
            style={styles.gradientBackground}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <BlurView intensity={20} style={styles.blurContainer}>
              <Image
                source={{ uri: item.image }}
                style={styles.image}
                resizeMode="cover"
              />
              <Text style={styles.text}>{item.name}</Text>
            </BlurView>
          </LinearGradient>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        snapToInterval={width * 0.8 + 20}
        snapToAlignment="center"
        decelerationRate="fast"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      >
        {categories.map((item, index) => renderCard({ item, index }))}
      </ScrollView>

      <View style={styles.pagination}>
        {categories.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === activeIndex && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  scrollContent: {
    paddingHorizontal: 10,
  },
  cardContainer: {
    width: width * 0.8,
    marginHorizontal: 10,
  },
  card: {
    borderRadius: 20,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#2E3192",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  gradientBackground: {
    padding: 2,
  },
  blurContainer: {
    backgroundColor: "rgba(46, 49, 146, 0.1)",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 18,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
    borderWidth: 2,
    borderColor: "#fff",
  },
  text: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    flex: 1,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(46, 49, 146, 0.3)",
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: "#2E3192",
    width: 20,
  },
});

export default CategoryCard;
