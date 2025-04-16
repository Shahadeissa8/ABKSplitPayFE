// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import React from "react";
// import { LinearGradient } from "expo-linear-gradient";
// import { BlurView } from "expo-blur";
// import { useNavigation } from "@react-navigation/native";
// const CategoryCard = ({ name, gradient, onPress }) => {
//   return (
//     <TouchableOpacity
//       style={styles.cardContainer}
//       activeOpacity={0.8}
//       onPress={onPress}
//     >
//       <View style={styles.card}>
//         <LinearGradient colors={gradient} style={styles.gradientBackground}>
//           <BlurView intensity={20} style={styles.blurContainer} />
//           <Text style={styles.text}>{name}</Text>
//         </LinearGradient>
//       </View>
//     </TouchableOpacity>
//   );
// };
// export default CategoryCard;
// const styles = StyleSheet.create({
//   cardContainer: {
//     // width: 200,
//     marginHorizontal: 2,
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
//    statItem: {
//     alignItems: "center",
//     backgroundColor: "rgba(255,255,255,0.1)",
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//     borderRadius: 20,
//     minWidth: 100,
//   },
//   statValue: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#fff",
//     textShadowColor: "rgba(0, 0, 0, 0.2)",
//     textShadowOffset: { width: 0, height: 1 },
//     textShadowRadius: 2,
//   },
//   statLabel: {
//     fontSize: 14,
//     color: "rgba(255,255,255,0.9)",
//     marginTop: 5,
//   },
// });
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const CategoryCard = ({ name, gradient, onPress, selected }) => {
  // Set background color to grey if selected
  const backgroundColors = selected ? ["#d3d3d3", "#a9a9a9"] : gradient;

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={styles.card}>
        <LinearGradient
          colors={backgroundColors}
          style={styles.gradientBackground}
        >
          <Text style={[styles.text, selected && { color: "#333" }]}>
            {name}
          </Text>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 2,
  },
  categoriesContainer: {
    marginBottom: 24,
    width: "100%",
    flexDirection: "row",
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
  text: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
  },
});

export default CategoryCard;
