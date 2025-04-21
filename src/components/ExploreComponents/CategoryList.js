// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   ActivityIndicator,
// } from "react-native";
// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import { getProductCategories } from "../../api/ProductCategoryAPI"; // assuming the API fetch is from this file
// import CategoryCard from "../../components/ExploreComponents/CategoryCard"; // make sure the path is correct

// const CategoryList = ({ onSelectCategory }) => {
//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["productCategories"],
//     queryFn: getProductCategories, // Fetch categories from the API
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
//       <Text style={styles.text}>Categories</Text>
//       <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//         <CategoryCard
//           name="All"
//           gradient={["#999", "#ccc"]}
//           onPress={() => onSelectCategory(null)} // Reset filter
//         />
//         {data.map((category) => (
//           <CategoryCard
//             key={category.productCategoryId}
//             name={category.name}
//             gradient={["#26589c", "#9cb2d8"]}
//             onPress={() => onSelectCategory(category.productCategoryId)} // Send ID
//           />
//         ))}
//       </ScrollView>
//     </View>
//   );
// };

// export default CategoryList;

// const styles = StyleSheet.create({
//   container: {
//     marginTop: -15,
//     paddingHorizontal: 10,
//   },
//   text: {
//     fontSize: 30,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
// });
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getProductCategories } from "../../api/ProductCategoryAPI";
import CategoryCard from "../../components/ExploreComponents/CategoryCard";

const CategoryList = ({ onSelectCategory }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["productCategories"],
    queryFn: getProductCategories,
    refetchOnMount: "always",
  });

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  // Handles category press and notifies parent about the selected category
  const handlePress = (categoryId) => {
    setSelectedCategoryId(categoryId); // Update selected category
    onSelectCategory?.(categoryId); // Notify parent (for filtering or cart logic)
  };

  if (isLoading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (isError) return <Text>Error fetching categories</Text>;

  return (
    <View>
      {/* <Text style={styles.text}>Categories</Text> */}
      <View style={styles.containerScroll}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {/* "All" category - Reset category */}
          <CategoryCard
            name="All"
            gradient={["#26589c", "#9cb2d8"]} // Default gradient
            selected={selectedCategoryId === null} // "All" is selected if ID is null
            onPress={() => handlePress(null)} // Reset filter
          />

          {/* Render each category */}
          {data.map((category) => (
            <CategoryCard
              key={category.productCategoryId}
              name={category.name}
              gradient={["#26589c", "#9cb2d8"]} // Default gradient
              selected={selectedCategoryId === category.productCategoryId} // Check if this category is selected
              onPress={() => handlePress(category.productCategoryId)} // Update category
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({ 
  container: {
    marginTop: 15,
    paddingHorizontal: 10,
    marginRight: -10,
    marginLeft: -6,
  },
  containerScroll: {
    // marginTop: -3,
    // paddingHorizontal: 10,
    marginRight: -10,
    marginLeft: 0
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 20,
  },
});

export default CategoryList;
