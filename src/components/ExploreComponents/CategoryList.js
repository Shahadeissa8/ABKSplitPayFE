import { View, Text, StyleSheet } from "react-native";
import React from "react";
import CategoryCard from "./CategoryCard";
import { BlurView } from "expo-blur";
{
  /* mappping will be done here */
}

const CategoryList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.Text}>Categories</Text>
      {/* <Text>CategoryList</Text> */}
      <CategoryCard />
    </View>
  );
};

export default CategoryList;
const styles = StyleSheet.create({
  container: {
    marginTop: -15,
  },
  Text: {
    marginLeft: 20,
    fontSize: 30,
    fontWeight: "bold",
  },
});
