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
// import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
// import React from "react";
// import ProductCard from "./ProductCard";
// import { useQuery } from "@tanstack/react-query";
// import { getProduct } from "../../api/ProductAPI";
// import { ScrollView } from "react-native-gesture-handler";

// const ProductList = (onPress) => {
//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["product"],
//     queryFn: getProduct, // Fetch categories from the API
//     refetchOnMount: "always",
//   });

//   if (isLoading) {
//     return <ActivityIndicator size="large" color="#0000ff" />;
//   }

//   if (isError) {
//     return <Text>Error fetching categories</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//         {data.map((product) => (
//           <ProductCard
//             key={product.productId} // Use the productId as the key
//             name={product.name}
//             productId={product.productId}
//             image={product.pictureUrl}
//             // gradient={["#26589c", "#9cb2d8"]} // You can customize this if needed
//           />
//         ))}
//       </ScrollView>
//       <Text style={styles.Text}>Products</Text>
//       {/* <ProductCard onPress={onPress} /> */}
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
