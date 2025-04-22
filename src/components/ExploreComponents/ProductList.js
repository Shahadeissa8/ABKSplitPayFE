import React from "react";
import { StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import ProductCard from "../../components/ExploreComponents/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../../api/ProductAPI";

const ProductList = ({ selectedCategoryId, onProductPress, searchQuery }) => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProduct,
  });

  if (isLoading) return <ActivityIndicator size="large" color="#26589c" />;

  let filteredProducts = products || [];
  if (selectedCategoryId) {
    filteredProducts = filteredProducts.filter(
      (product) => product.productCategoryId === selectedCategoryId
    );
  }
  if (searchQuery) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {filteredProducts.map((product) => (
        <ProductCard
          key={product.productId}
          productId={product.productId}
          name={product.name}
          price={product.price}
          image={product.pictureUrl}
          onPress={() => onProductPress(product)}
        />
      ))}
    </ScrollView>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10, 
  },
});