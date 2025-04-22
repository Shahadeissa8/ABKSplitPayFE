import React, { useState } from "react";
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
  Alert,
  Platform,
  Dimensions,
  TextInput,
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
  const { addToCart, cartItems } = useCart();

  const handleAddToWishlist = async (productId) => {
    try {
      await addToWishList({ productId });
      Alert.alert("Success", "Product added to wishlist successfully");
    } catch (error) {
      Alert.alert("Error", "Failed to add product to wishlist");
    }
  };

  const handleProductPress = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const handleAddToCart = (productId) => {
    addToCart(productId, 1);
    setModalVisible(false);
    Alert.alert("Success", "Product added to cart successfully");
  };

  const data = [
    { key: "instructions", component: <InstructionsCard /> },
    { key: "deals", component: <DealsList /> },
    {
      key: "search",
      component: (
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={24} color="#26589c" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      ),
    },
    { key: "categories", component: <CategoryList onSelectCategory={setSelectedCategoryId} /> },
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

  const renderItem = ({ item }) => (
    <View style={styles.section}>{item.component}</View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Header
        title="Explore"
        action={() => navigation.navigate("MyCartScreen")}
        actionIconName={actionIcons.cart}
      />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      />
      {selectedProduct && (
        <Modal
          visible={modalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={modalStyles.overlay}>
            <View style={modalStyles.content}>
              <Image
                source={{ uri: selectedProduct.pictureUrl }}
                style={modalStyles.image}
                resizeMode="cover"
              />

              <View style={modalStyles.contentContainer}>
                <Text style={modalStyles.title}>{selectedProduct.name}</Text>
                <Text style={modalStyles.description}>
                  {selectedProduct.description}
                </Text>
                <Text style={modalStyles.price}>
                  Price: {selectedProduct.price} KD
                </Text>
                <View style={modalStyles.ButtonContainer}>
                  <TouchableOpacity
                    onPress={() => handleAddToCart(selectedProduct.productId)}
                    style={modalStyles.addToCartContainer}
                  >
                    <View style={modalStyles.addToCartButton}>
                      <Text style={modalStyles.addToCartText}>
                        <Feather name="shopping-cart" size={20} color="#fff" /> Add to cart
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleAddToWishlist(selectedProduct.productId)}
                    style={modalStyles.wishlistContainer}
                  >
                    <View style={modalStyles.wishlistButton}>
                      <Feather name="heart" size={24} color="#fff" />
                    </View>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={modalStyles.closeButton}
                >
                  <Text style={modalStyles.closeText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#26589c",
    paddingBottom: 20, // Adjusted padding
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginBottom : 15,
    backgroundColor: "#fff"

  },
  scrollContainer: {
    flexDirection: "row",
    padding: 10,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    marginTop: 1,
  },
  headerRight: {
    position: "absolute",
    right: 15,
  },
  cartButton: {
    marginLeft: "auto",
  },
  cartGradient: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 12,
    borderRadius: 18,
    position: "relative",
  },
  cartBadge: {
    position: "absolute",
    right: -6,
    top: -6,
    backgroundColor: "#ff4444",
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
    zIndex: 1,
  },
  cartBadgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
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
    padddingBottom : 10,
    paddingTop : 10,
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
  section: {
    marginBottom: 15,
  },
  instructionsSection: {
    backgroundColor: "rgba(38, 88, 156, 0.05)",
    marginTop: 10,
    marginHorizontal: 15,
    borderRadius: 15,
 
  },
  dealsSection: {
    borderWidth: 1,
    borderColor: "rgba(38, 88, 156, 0.1)",
    marginTop: 55,
    marginHorizontal: 15,
    borderRadius: 15,
   
  },
  categoriesSection: {
    backgroundColor: "transparent",
    marginBottom: 0,
    paddingHorizontal: 0,
    paddingVertical: 5,
  },
  productsSection: {
    paddingHorizontal: 0,
    paddingVertical: 15,
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
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: "100%",
    maxHeight: "90%",
    overflow: "hidden",
  },
  image: {
    width: "50%",
    height: "35%",
  
    marginTop: 8,
    marginRight: 8,
    marginLeft: 8,
    alignSelf: "center",
  },
  contentContainer: {
    padding: 20,

    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#26589c",
    textAlign: "center",
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    marginBottom: 15,
    lineHeight: 22,
    letterSpacing: 0.3,
  },
  price: {
    fontSize: 22,
    fontWeight: "700",
    color: "#26589c",
    textAlign: "center",
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  ButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 15,
  },
  addToCartContainer: {
    flex: 1,
  },
  addToCartButton: {
    backgroundColor: "#26589c",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  wishlistContainer: {
    width: 52,
  },
  wishlistButton: {
    backgroundColor: "#26589c",
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
  },
  addToCartText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    letterSpacing: 0.3,
  },
  closeButton: {
    paddingVertical: 12,
    marginTop: 5,
  },
  closeText: {
    color: "#26589c",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    letterSpacing: 0.3,
  },
});

export default ExploreScreen;