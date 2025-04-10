import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ProductCard from "./ProductCard";

const ProductList = (onPress) => {
  return (
    <View style={styles.container}>
      <Text style={styles.Text}>Products</Text>
      <ProductCard onPress={onPress} />
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  container: {
    marginTop: -45,
  },
  Text: {
    marginTop: 40,
    marginLeft: 20,
    fontSize: 30,
    fontWeight: "bold",
  },
});
