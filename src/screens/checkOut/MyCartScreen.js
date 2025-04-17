import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "../../context/CartContext";

const colors = {
  primary: "#2E3192",
  secondary: "#26589c",
  background: "#FFFFFF",
  backgroundLight: "#F5F5F5",
  textPrimary: "#333333",
  textSecondary: "#666666",
  border: "#EEEEEE",
  white: "#FFFFFF",
  error: "#FF4444",
  gradientPrimary: ["#26589c", "#9cb2d8"],
};

const MyCartScreen = () => {
  const navigation = useNavigation();
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const calculateTotal = () => {
    // Ensure cartItems is an array and each item has the correct structure
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return "0.00";
    }
    return cartItems
      .reduce((total, item) => {
        const price = parseFloat(item.product?.price) || 0; // Ensure price is a number
        const quantity = item.quantity || 0; // Ensure quantity is a number
        return total + price * quantity;
      }, 0)
      .toFixed(2);
  };


  const handleCheckout = () => {
    const total = calculateTotal();
    console.log("Total calculated in MyCartScreen:", total, "KD"); // Debug log
    navigation.navigate("CheckoutScreen", { total }); // Pass the total to CheckoutScreen
  };

  const renderProductItem = ({ item }) => (
    <View style={styles.productItem}>
      <Image
        source={{ uri: item.product?.pictureUrl }}
        style={styles.productImage}
        resizeMode="cover"
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.product?.name || "Unknown Product"}</Text>
        <Text style={styles.productPrice}>{item.product?.price || "0.00"} KD</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.productId, -1)}
          >
            <Ionicons name="remove" size={20} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity || 0}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.productId, 1)}
          >
            <Ionicons name="add" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => removeFromCart(item.productId)}
      >
        <Ionicons name="trash-outline" size={24} color={colors.error} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Shopping Cart</Text>
      </View>
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.cartItemId.toString()}
            contentContainerStyle={styles.productList}
          />
          <View style={styles.footer}>
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalPrice}>{calculateTotal()} KD</Text>
            </View>
            <TouchableOpacity
              style={[styles.checkoutButton, { backgroundColor: colors.primary }]}
              onPress={handleCheckout}
            >
              <Text style={styles.checkoutButtonText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.emptyCartContainer}>
          <Ionicons name="cart-outline" size={80} color="#2E3192" />
          <Text style={styles.emptyText}>Your Cart is Empty</Text>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => navigation.navigate("ExploreScreen")}
          >
            <Text style={styles.continueButtonText}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary,
    marginLeft: 10,
  },
  productList: {
    padding: 15,
  },
  productItem: {
    flexDirection: "row",
    backgroundColor: colors.background,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
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
    color: colors.textPrimary,
  },
  productPrice: {
    fontSize: 14,
    color: colors.primary,
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
    backgroundColor: colors.backgroundLight,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    marginHorizontal: 15,
    fontSize: 16,
    color: colors.textPrimary,
  },
  deleteButton: {
    padding: 8,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  totalLabel: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
  },
  checkoutButton: {
    borderRadius: 8,
    marginBottom: 45,
    paddingVertical: 15,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: colors.white,
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
    color: colors.primary,
    marginTop: 20,
  },
  continueButton: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignItems: "center",
  },
  continueButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});




export default MyCartScreen;

