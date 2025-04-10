import { StyleSheet, View, FlatList, ActivityIndicator } from "react-native";
import React from "react";
// import ProductCard from "./ProductCard";
import StoresCard from "./StoresCard";

const StoresList = ({
  products,
  loading,
  onProductPress,
  refreshing,
  onRefresh,
}) => {
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#53B175" />
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => (
        <StoresCard product={item} onPress={() => onProductPress(item)} />
      )}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
};

export default StoresList;

const styles = StyleSheet.create({
  listContainer: {
    padding: 8,
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
