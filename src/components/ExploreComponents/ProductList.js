// import React from "react";
// import { View, ScrollView, StyleSheet } from "react-native";
// import ProductCard from "../../components/ExploreComponents/ProductCard";
// import { useQuery } from "@tanstack/react-query";
// import { getProduct } from "../../api/ProductAPI"; // Adjust to your API location

// const ProductList = ({ selectedCategoryId, onPress }) => {
//   const { data: products, isLoading } = useQuery({
//     queryKey: ["products"],
//     queryFn: getProduct,
//   });

//   if (isLoading) return null;

//   const filteredProducts = selectedCategoryId
//     ? products.filter(
//         (product) => product.productCategoryId === selectedCategoryId
//       )
//     : products;

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {filteredProducts.map((product) => (
//         <ProductCard
//           key={product.productId}
//           productId={product.productId}
//           name={product.name}
//           price={product.price}
//           image={product.pictureUrl}
//           onPress={() => onPress(product.productId)} // Pass up to navigate
//         />
//       ))}
//     </ScrollView>
//   );
// };

// export default ProductList;

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//     padding: 10,
//   },
// });
import React from "react";
import { View, ScrollView, StyleSheet, Modal } from "react-native";
import ProductCard from "../../components/ExploreComponents/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../../api/ProductAPI"; // Adjust to your API location

const ProductList = ({ selectedCategoryId, onProductPress }) => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProduct,
  });

  if (isLoading) return null;

  const filteredProducts = selectedCategoryId
    ? products.filter(
        (product) => product.productCategoryId === selectedCategoryId
      )
    : products;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {filteredProducts.map((product) => (
        <ProductCard
          key={product.productId}
          productId={product.productId}
          name={product.name}
          price={product.price}
          image={product.pictureUrl}
          // 🟢 Updated this line:
          onPress={() => onProductPress(product)} // Pass full product object
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
