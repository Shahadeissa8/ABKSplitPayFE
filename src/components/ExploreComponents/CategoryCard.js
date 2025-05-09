import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const CategoryCard = ({ name, selected, onPress }) => {
  const backgroundColor = selected ? "#26589c": "#f5f5f5" ;
  const textColor = selected ? "#fff" : "#333";

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
    marginHorizontal: 5,
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
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
  },
});

export default CategoryCard;