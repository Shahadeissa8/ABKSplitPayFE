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
