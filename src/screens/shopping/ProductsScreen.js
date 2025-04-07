import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React, { useState, useCallback } from "react";
import ProductList from "../../components/ProductsComponents/ProductList";

const ProductsScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Organic Bananas",
      description: "Fresh organic bananas from Ecuador - 7pcs",
      price: 4.99,
      image:
        "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      name: "Red Apple",
      description: "Sweet and crispy red apples - 1kg",
      price: 2.99,
      image:
        "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      name: "Fresh Strawberries",
      description: "Sweet and juicy strawberries - 500g",
      price: 5.99,
      image:
        "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      name: "Avocado",
      description: "Ripe and ready to eat - 2pcs",
      price: 3.99,
      image:
        "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 5,
      name: "Organic Carrots",
      description: "Fresh organic carrots - 500g",
      price: 1.99,
      image:
        "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 6,
      name: "Bell Peppers",
      description: "Mixed color bell peppers - 3pcs",
      price: 3.49,
      image:
        "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 7,
      name: "Fresh Tomatoes",
      description: "Vine-ripened tomatoes - 500g",
      price: 2.49,
      image:
        "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 8,
      name: "Organic Spinach",
      description: "Fresh organic baby spinach - 200g",
      price: 3.29,
      image:
        "https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
  ]);

  const handleProductPress = useCallback(
    (product) => {
      navigation.navigate("ProductDetails", { product });
    },
    [navigation],
  );

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Fresh Products</Text>
        <Text style={styles.subtitle}>Find fresh and healthy products</Text>
      </View>
      <ProductList
        products={products}
        loading={loading}
        onProductPress={handleProductPress}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </SafeAreaView>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E2E2",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#181725",
    fontFamily: "Lato",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#7C7C7C",
    fontFamily: "Lato",
  },
});
