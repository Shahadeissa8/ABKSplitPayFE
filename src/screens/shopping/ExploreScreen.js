import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  StatusBar,
  Modal,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CategoryList from "../../components/ExploreComponents/CategoryList";
import InstructionsCard from "../../components/ExploreComponents/InstructionsCard";
import DealsList from "../../components/ExploreComponents/DealsList";
import ProductList from "../../components/ExploreComponents/ProductList";
import { Ionicons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import { useCart } from "../../context/CartContext";
import { Header, actionIcons } from "../../components/Header";
import { addToWishList } from "../../api/CartAPI";

const { width, height } = Dimensions.get("window");

const ExploreScreen = () => {
  const navigation = useNavigation();
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { addToCart, cartItems } = useCart();
  const [modalContent, setModalContent] = useState({
    visible: false,
    title: "",
    message: "",
    icon: "checkmark-circle",
    iconColor: "#4CAF50",
    type: "action", // "action" or "product"
  });
  const [isLoading, setIsLoading] = useState(false);

  const getCartItemCount = useCallback(() => {
    return cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
  }, [cartItems]);

  const handleAddToWishlist = async (productId) => {
    setIsLoading(true);
    try {
      await addToWishList({ productId });
      setModalContent({
        visible: true,
        title: "Success",
        message: "Product added to wishlist successfully",
        icon: "heart",
        iconColor: "#4CAF50",
        type: "action",
      });
    } catch (error) {
      console.error("Wishlist error:", error);
      setModalContent({
        visible: true,
        title: "Error",
        message: "Failed to add product to wishlist",
        icon: "alert-circle-outline",
        iconColor: "#FF4444",
        type: "action",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleProductPress = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setModalContent({
      visible: true,
      title: product.name,
      message: product.description,
      icon: null,
      iconColor: null,
      type: "product",
      price: product.price,
    });
  };

  const handleAddToCart = (productId) => {
    setIsLoading(true);
    try {
      addToCart(productId, quantity);
      setModalContent({
        visible: true,
        title: "Success",
        message: `Added ${quantity} item(s) to cart successfully`,
        icon: "checkmark-circle",
        iconColor: "#4CAF50",
        type: "action",
      });
    } catch (error) {
      console.error("Cart error:", error);
      setModalContent({
        visible: true,
        title: "Error",
        message: "Failed to add item to cart",
        icon: "alert-circle-outline",
        iconColor: "#FF4444",
        type: "action",
      });
    } finally {
      setModalVisible(false); // Ensure the product modal closes
      setIsLoading(false);
    }
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const data = [
    { key: "instructions", component: <InstructionsCard /> },
    { key: "deals", component: <DealsList /> },
    {
      key: "search",
      component: (
        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            size={24}
            color="#26589c"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <Ionicons name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>
      ),
    },
    {
      key: "categories",
      component: <CategoryList onSelectCategory={setSelectedCategoryId} />,
    },
    {
      key: "products",
      component: (
        <ProductList
          selectedCategoryId={selectedCategoryId}
          onProductPress={handleProductPress}
          searchQuery={searchQuery}
        />
      ),
    },
  ];

  const renderItem = useCallback(({ item }) => (
    <View style={styles.section}>{item.component}</View>
  ), [selectedCategoryId, searchQuery]); // Dependencies for re-rendering

  const closeModal = () => {
    setModalContent((prev) => ({ ...prev, visible: false }));
    if (modalContent.type === "product") {
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Header
        title="Explore"
        action={() => navigation.navigate("MyCartScreen")}
        actionIconName={actionIcons.cart}
        cartItemCount={getCartItemCount()}
        renderAction={() => (
          <TouchableOpacity
            onPress={() => navigation.navigate("MyCartScreen")}
            style={styles.cartIconContainer}
          >
            <Ionicons name="cart-outline" size={24} color="#fff" />
            {getCartItemCount() > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{getCartItemCount()}</Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        initialNumToRender={2}
        maxToRenderPerBatch={2}
        windowSize={5}
      />
      <Modal
        visible={modalContent.visible}
        transparent
        animationType={modalContent.type === "product" ? "slide" : "fade"}
        onRequestClose={closeModal}
      >
        {modalContent.type === "product" ? (
          <View style={modalStyles.overlay}>
            <View style={modalStyles.content}>
              <TouchableOpacity
                style={modalStyles.closeButton}
                onPress={closeModal}
              >
                <Ionicons name="close" size={24} color="#26589c" />
              </TouchableOpacity>
              <View style={modalStyles.imageContainer}>
                <Image
                  source={{ uri: selectedProduct?.pictureUrl }}
                  style={modalStyles.image}
                  resizeMode="contain"
                  onError={(e) => console.log("Image load error:", e)}
                />
              </View>
              <Text style={modalStyles.title}>{selectedProduct?.name}</Text>
              <Text style={modalStyles.description}>
                {selectedProduct?.description}
              </Text>
              <Text style={modalStyles.price}>
                Price: {selectedProduct?.price} KD
              </Text>
              <View style={modalStyles.quantityContainer}>
                <TouchableOpacity
                  style={modalStyles.quantityButton}
                  onPress={decreaseQuantity}
                >
                  <Text style={modalStyles.quantityButtonText}>−</Text>
                </TouchableOpacity>
                <Text style={modalStyles.quantityText}>{quantity}</Text>
                <TouchableOpacity
                  style={modalStyles.quantityButton}
                  onPress={increaseQuantity}
                >
                  <Text style={modalStyles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
              <View style={modalStyles.ButtonContainer}>
                <TouchableOpacity
                  onPress={() => handleAddToCart(selectedProduct.productId)}
                  style={modalStyles.addToCartContainer}
                  disabled={isLoading}
                >
                  <View style={modalStyles.addToCartButton}>
                    {isLoading ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={modalStyles.addToCartText}>
                        <Feather name="shopping-cart" size={20} color="#fff" />{" "}
                        Add to cart
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleAddToWishlist(selectedProduct.productId)}
                  style={modalStyles.wishlistContainer}
                  disabled={isLoading}
                >
                  <View style={modalStyles.wishlistButton}>
                    {isLoading ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Feather name="heart" size={24} color="#fff" />
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.actionModalOverlay}>
            <View style={styles.actionModalContent}>
              {modalContent.icon && (
                <Ionicons
                  name={modalContent.icon}
                  size={48}
                  color={modalContent.iconColor}
                  style={styles.actionModalIcon}
                />
              )}
              <Text style={styles.actionModalTitle}>{modalContent.title}</Text>
              <Text style={styles.actionModalMessage}>{modalContent.message}</Text>
              <TouchableOpacity
                style={styles.actionModalButton}
                onPress={closeModal}
              >
                <Text style={styles.actionModalButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#26589c",
    paddingBottom: 20,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        paddingTop: 50,
      },
    }),
  },
  cartIconContainer: {
    position: "relative",
  },
  cartBadge: {
    position: "absolute",
    top: -5,
    right: -10,
    backgroundColor: "#ff4444",
    borderRadius: 12,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fff",
  },
  cartBadgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  contentContainer: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingBottom: 60,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    marginHorizontal: 15,
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    color: "#333",
    paddingVertical: 10,
  },
  clearButton: {
    padding: 5,
    marginLeft: 10,
  },
  section: {
    marginBottom: 15,
  },
  actionModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  actionModalContent: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  actionModalIcon: {
    marginBottom: 15,
  },
  actionModalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  actionModalMessage: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  actionModalButton: {
    backgroundColor: "#26589c",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
  },
  actionModalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  content: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: height * 0.55,
    alignItems: "center",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 15,
    right: 15,
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 20,
  },
  imageContainer: {
    width: 300,
    height: 200,
    marginTop: 30,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#26589c",
    marginTop: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginTop: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
    color: "#26589c",
    textAlign: "center",
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 0,
  },
  quantityButton: {
    backgroundColor: "#26589c",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 10,
  },
  quantityButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
  quantityText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#333",
    minWidth: 30,
    textAlign: "center",
  },
  ButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    position: "absolute",
    bottom: 40,
    width: width * 0.8,
  },
  addToCartContainer: {
    flex: 1,
  },
  addToCartButton: {
    backgroundColor: "#26589c",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#26589c",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  wishlistContainer: {
    width: 52,
  },
  wishlistButton: {
    backgroundColor: "#26589c",
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#26589c",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  addToCartText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    letterSpacing: 0.3,
  },
});

export default ExploreScreen;