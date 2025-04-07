import { View, Text } from "react-native";
import React from "react";
import CategoryCard from "./CategoryCard";
import { BlurView } from "expo-blur";
{
  /* mappping will be done here */
}

const CategoryList = () => {
  return (
    <View style={{ margin: 10 }}>
      {/* <Text>CategoryList</Text> */}
      <CategoryCard />
    </View>
  );
};

export default CategoryList;
