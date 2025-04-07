import { StyleSheet, Text, View, SafeAreaView, Platform } from "react-native";
import React, { useState, useCallback } from "react";
import ProductList from "../../components/ProductsComponents/ProductList";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";

const ShopScreen = ({ navigation }) => {
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
      name: "Avocado",
      description: "Ripe and ready to eat - 2pcs",
      price: 3.99,
      image:
        "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
  ]);

  const handleProductPress = useCallback(
    (product) => {
      navigation.navigate("ProductDetails", { product });
    },
    [navigation]
  );

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2E3192" />
      <LinearGradient
        colors={["rgba(46, 49, 146, 0.1)", "rgba(27, 126, 255, 0.1)"]}
        style={styles.background}
      >
        {/* <View style={styles.header}> */}
        {/* <Text>Shop</Text>
      <Text style={styles.subtitle}>Find your daily needs</Text> */}
        <ProductList
          products={products}
          loading={loading}
          onProductPress={handleProductPress}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
        {/* </View> */}'
      </LinearGradient>
      '
    </View>
  );
};

export default ShopScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "red",
  },
  // header: {
  //   padding: 20,
  //   // backgroundColor: "",
  //   borderBottomWidth: 1,
  //   borderBottomColor: "#E2E2E2",
  // },
  title: {
    fontSize: 24,
    alignSelf: "center",
    fontWeight: "600",
    color: "#181725",
    fontFamily: "Lato",
    // marginBottom: 4,
    // marginTop:-30
  },
  subtitle: {
    alignSelf: "center",
    fontSize: 16,
    color: "#7C7C7C",
    fontFamily: "Lato",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    flexGrow: 1,
  },
  background: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  instructionsContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  contentContainer: {
    flex: 1,
    marginTop: 30,
  },
  dealsContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
});
