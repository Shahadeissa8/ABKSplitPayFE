import { View, Text, StyleSheet } from "react-native";
import React from "react";
import CategoryCard from "./CategoryCard";
import { BlurView } from "expo-blur";
import { useQuery } from "@tanstack/react-query";
{
  /* mappping will be done here */
}

const CategoryList = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["fetchMyRequests"],
    queryFn: () => getMyRequests(),
    refetchOnMount: "always",
  });
  const MyRequests = filteredRequests.map((request) => {
    return <CategoryCard key={request.requestId} request={request} />;
  });
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
