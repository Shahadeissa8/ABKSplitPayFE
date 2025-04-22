import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const CategoryCard = ({ name, selected, onPress }) => {
  const backgroundColor = selected ? "#d3d3d3" : "#26589c";
  const textColor = selected ? "#333" : "#fff";

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={styles.card}>
        <View style={[styles.background, { backgroundColor }]}>
          <Text style={[styles.text, { color: textColor }]}>{name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 2,
  },
  card: {
    borderRadius: 10,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    height: 40,
    width: 160,
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
});

export default CategoryCard;