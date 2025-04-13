// import { StyleSheet, Text, View } from "react-native";
// import React from "react";
// import ProductCard from "./ProductCard";

// const ProductList = (onPress) => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.Text}>Products</Text>
//       <ProductCard onPress={onPress} />
//     </View>
//   );
// };

// export default ProductList;

// const styles = StyleSheet.create({
//   container: {
//     marginTop: -45,
//   },
//   Text: {
//     marginTop: 40,
//     marginLeft: 20,
//     fontSize: 30,
//     fontWeight: "bold",
//   },
// });
import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import ProductCard from "../../components/ExploreComponents/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../../api/ProductAPI"; // Adjust to your API location

const ProductList = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProduct,
  });

  if (isLoading) return null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {products.map((product) => (
        <ProductCard
          key={product.productId}
          productId={product.productId}
          name={product.name}
          price={product.price}
          image={product.pictureUrl}
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
