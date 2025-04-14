import { View, Text } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";

const ProductDetailsScreen = () => {
  const route = useRoute();
  const { productId } = route.params; // Get the productId passed from ExploreScreen

  return (
    <View>
      <Text>Product ID: {productId}</Text>
      {/* Fetch and display product details using productId */}
    </View>
  );
};

export default ProductDetailsScreen;
