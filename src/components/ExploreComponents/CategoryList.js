import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
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

  const handlePress = (categoryId) => {
    setSelectedCategoryId(categoryId);
    onSelectCategory?.(categoryId);
  };

  if (isLoading) return <ActivityIndicator size="large" color="#26589c" />;
  if (isError) return <Text>Error fetching categories</Text>;

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <CategoryCard
          name="All"
          selected={selectedCategoryId === null}
          onPress={() => handlePress(null)}
        />
        {data.map((category) => (
          <CategoryCard
            key={category.productCategoryId}
            name={category.name}
            selected={selectedCategoryId === category.productCategoryId}
            onPress={() => handlePress(category.productCategoryId)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
  },
});

export default CategoryList;