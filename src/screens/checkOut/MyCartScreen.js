import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// Sample product data
const sampleProducts = [
  {
    id: "1",
    name: "Product 1",
    price: "100 KD",
    image: "https://via.placeholder.com/150",
    quantity: 1,
  },
  {
    id: "2",
    name: "Product 2",
    price: "200 KD",
    image: "https://via.placeholder.com/150",
    quantity: 2,
  },
];

const MyCartScreen = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState(sampleProducts);

  const renderProductItem = ({ item }) => (
    <View style={styles.productItem}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleQuantityChange(item.id, -1)}
          >
            <Ionicons name="remove" size={20} color="#2E3192" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleQuantityChange(item.id, 1)}
          >
            <Ionicons name="add" size={20} color="#2E3192" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteProduct(item.id)}
      >
        <Ionicons name="trash-outline" size={24} color="#ff4444" />
      </TouchableOpacity>
    </View>
  );

  const handleQuantityChange = (productId, change) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, quantity: Math.max(1, product.quantity + change) }
          : product
      )
    );
  };

  const handleDeleteProduct = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  const calculateTotal = () => {
    return (
      products.reduce(
        (total, product) => total + parseInt(product.price) * product.quantity,
        0
      ) + " KD"
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#2E3192" />
        </TouchableOpacity>
        <Text style={styles.title}>Shopping Cart</Text>
      </View>

      {products.length > 0 ? (
        <>
          <FlatList
            data={products}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.productList}
          />
          <View style={styles.footer}>
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalPrice}>{calculateTotal()}</Text>
            </View>
            <TouchableOpacity style={styles.checkoutButton}>
              <Text style={styles.checkoutButtonText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <ScrollView style={styles.content}>
          <View style={styles.emptyCartContainer}>
            <Ionicons name="cart-outline" size={80} color="#2E3192" />
            <Text style={styles.emptyText}>Your Cart is Empty</Text>
            <Text style={styles.subText}>
              You haven't added any products to your cart
            </Text>
            <TouchableOpacity
              style={styles.continueButton}
              onPress={() => navigation.navigate("ExploreScreen")}
            >
              <Text style={styles.continueButtonText}>Continue Shopping</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default MyCartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2E3192",
    marginLeft: 10,
  },
  content: {
    flex: 1,
  },
  productList: {
    padding: 15,
  },
  productItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  productInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "center",
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  productPrice: {
    fontSize: 14,
    color: "#2E3192",
    marginTop: 5,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    marginHorizontal: 15,
    fontSize: 16,
    color: "#333",
  },
  deleteButton: {
    padding: 8,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  totalLabel: {
    fontSize: 16,
    color: "#666",
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2E3192",
  },
  checkoutButton: {
    backgroundColor: "#2E3192",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2E3192",
    marginTop: 20,
  },
  subText: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
    textAlign: "center",
  },
  continueButton: {
    backgroundColor: "#2E3192",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
