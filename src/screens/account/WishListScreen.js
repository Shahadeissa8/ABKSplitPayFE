import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Platform,
  Image,
  Dimensions,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { getWishList, addToCart, deleteWishListItem } from "../../api/CartAPI"; // Import required functions
import { Header } from "../../components/Header";

const { width } = Dimensions.get("window");

const WishListScreen = () => {
  const navigation = useNavigation();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch wishlist items from the backend
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const data = await getWishList(); // Fetch wishlist from the API
        const formattedItems = data.map((item) => ({
          id: item.wishListId,
          productId: item.product.productId,
          name: item.product.name,
          price: item.product.price,
          image: item.product.pictureUrl,
          inStock: item.product.stockQuantity > 0,
        }));
        setWishlistItems(formattedItems);
      } catch (error) {
        console.error("Error fetching wishlist:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const removeFromWishlist = async (itemId) => {
    try {
      await deleteWishListItem(itemId); // Call the delete endpoint
      setWishlistItems(wishlistItems.filter((item) => item.id !== itemId)); // Update local state
      Alert.alert("Success", "Item removed from wishlist.");
    } catch (error) {
      console.error("Error removing item from wishlist:", error.message);
      Alert.alert("Error", "Failed to remove item from wishlist.");
    }
  };

  const moveToCart = async (item) => {
    try {
      await addToCart(item.productId, 1); // Add the item to the cart
      await removeFromWishlist(item.id); // Remove the item from the wishlist
      Alert.alert("Success", "Item moved to cart.");
    } catch (error) {
      console.error("Error moving item to cart:", error.message);
      Alert.alert("Error", "Failed to move item to cart.");
    }
  };

  const renderHeader = () => (
    <LinearGradient
      colors={["#26589c", "#9cb2d8"]}
      style={styles.header}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <View style={styles.headerContent}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Wishlist</Text>
        <View style={{ width: 40 }} />
      </View>
    </LinearGradient>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <LinearGradient
        colors={["#26589c", "#9cb2d8"]}
        style={styles.emptyStateIconContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Ionicons name="heart-outline" size={48} color="#fff" />
      </LinearGradient>
      <Text style={styles.emptyStateTitle}>Your Wishlist is Empty</Text>
      <Text style={styles.emptyStateText}>
        Start adding items to your wishlist to save them for later
      </Text>
      <TouchableOpacity
        style={styles.shopNowButton}
        onPress={() => navigation.navigate("Explore")}
      >
        <Text style={styles.shopNowButtonText}>Start Shopping</Text>
      </TouchableOpacity>
    </View>
  );

  const renderWishlistItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>{item.price.toFixed(2)} KD</Text>
        {!item.inStock && (
          <Text style={styles.outOfStockText}>Out of Stock</Text>
        )}
      </View>
      <View style={styles.itemActions}>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeFromWishlist(item.id)}
        >
          <Ionicons name="trash-outline" size={24} color="#ff4444" />
        </TouchableOpacity>
        {item.inStock && (
          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => moveToCart(item)}
          >
            <Ionicons name="cart-outline" size={24} color="#26589c" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#26589c" />
      <Header
        title="Installment details"
        backButtonAction={() => navigation.goBack()}/>
      {/* {renderHeader()} */}
      {loading ? (
        <ActivityIndicator size="large" color="#26589c" style={{ marginTop: 20 }} />
      ) : wishlistItems.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={wishlistItems}
          renderItem={renderWishlistItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 16 : 16,
    paddingBottom: 16,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  listContent: {
    padding: 16,
  },
  itemContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
    justifyContent: "center",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: "#26589c",
    fontWeight: "600",
  },
  outOfStockText: {
    fontSize: 12,
    color: "#ff4444",
    marginTop: 4,
  },
  itemActions: {
    justifyContent: "center",
    alignItems: "center",
  },
  removeButton: {
    padding: 8,
  },
  cartButton: {
    padding: 8,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  emptyStateIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
  },
  shopNowButton: {
    backgroundColor: "#26589c",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  shopNowButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default WishListScreen;