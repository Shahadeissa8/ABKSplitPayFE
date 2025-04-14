import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getProductCategories } from "../../api/ProductCategoryAPI"; // assuming the API fetch is from this file
import CategoryCard from "../../components/ExploreComponents/CategoryCard"; // make sure the path is correct

const CategoryList = ({ onSelectCategory }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["productCategories"],
    queryFn: getProductCategories, // Fetch categories from the API
    refetchOnMount: "always",
  });

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (isError) {
    return <Text>Error fetching categories</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Categories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <CategoryCard
          name="All"
          gradient={["#999", "#ccc"]}
          onPress={() => onSelectCategory(null)} // Reset filter
        />
        {data.map((category) => (
          <CategoryCard
            key={category.productCategoryId}
            name={category.name}
            gradient={["#26589c", "#9cb2d8"]}
            onPress={() => onSelectCategory(category.productCategoryId)} // Send ID
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  container: {
    marginTop: -15,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
