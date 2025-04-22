import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Modal,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import React, { useState } from "react";
import CategoryList from "../../components/ExploreComponents/CategoryList";
import InstructionsCard from "../../components/ExploreComponents/InstructionsCard";
import DealsList from "../../components/ExploreComponents/DealsList";
import ProductList from "../../components/ExploreComponents/ProductList";
import { useNavigation } from "@react-navigation/native";
import Feather from "@expo/vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../../context/CartContext";
import { addToWishList } from "../../api/CartAPI"; // Import the addToWishList function
import { Header, actionIcons } from "../../components/Header";

const ExploreScreen = () => {
  const navigation = useNavigation();
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useCart();

  const handleAddToWishlist = async (productId) => {
    try {
      console.log("Adding product to wishlist with productId:", productId); // Debug log
      await addToWishList({ productId }); // Call the endpoint with the productId
      Alert.alert("Success", "Product added to wishlist!");
    } catch (error) {
      console.error(
        "Error adding product to wishlist:",
        error.response?.data || error.message
      );
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to add product to wishlist."
      );
    }
  };

  const handleProductPress = (product) => {
    console.log("Pressed product:", product.name);
    setSelectedProduct(product);
    setModalVisible(true); 
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Header
        title="Explore"
        action={() => navigation.navigate("MyCartScreen")}
        actionIconName={actionIcons.cart}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.instructionsContainer}>
          <InstructionsCard />
        </View>

        <View style={styles.contentContainer}>
          <DealsList />
        </View>

        <View>
          <CategoryList onSelectCategory={setSelectedCategoryId} />
        </View>

        <View>
          <ProductList
            selectedCategoryId={selectedCategoryId}
            onProductPress={handleProductPress}
          />
        </View>
      </ScrollView>
      {selectedProduct && (
        <Modal
          visible={modalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={modalStyles.overlay}>
            <View style={modalStyles.content}>
              <Text style={modalStyles.title}>{selectedProduct.name}</Text>
              <Text style={modalStyles.description}>
                {selectedProduct.description}
              </Text>
              <Text style={modalStyles.price}>
                Price: {selectedProduct.price} KD
              </Text>
              <Image
                source={{ uri: selectedProduct.pictureUrl }}
                style={modalStyles.image}
                resizeMode="cover"
              />
              <View style={modalStyles.ButtonGradient}>
                <TouchableOpacity
                  onPress={() => {
                    addToCart(selectedProduct.productId, 1);
                    setModalVisible(false);
                  }}
                >
                  <LinearGradient
                    colors={["#26589c", "#9cb2d8"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={modalStyles.addToCartButton}
                  >
                    <Text style={modalStyles.addToCartText}>
                      <Feather name="shopping-cart" size={20} color="white" />{" "}
                      Add to cart
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleAddToWishlist(selectedProduct.productId)} // Add to wishlist
                >
                  <LinearGradient
                    colors={["#26589c", "#9cb2d8"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={modalStyles.wishlistButton}
                  >
                    <Text style={modalStyles.addToCartText}>
                      <Feather name="heart" size={24} color="white" />
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={modalStyles.closeText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  theView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 210,
    marginBottom: -10,
    marginTop: 5,
  },
  cartButton: {
    padding: 8,
  },
  cartGradient: {
    padding: 8,
    borderRadius: 20,
  },
  scrollContent: {
    flexGrow: 1,
  },
  instructionsContainer: {
    paddingHorizontal: 15,
  },
  contentContainer: {
    flex: 1,
    marginTop: 30,
  },
  header: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    flexDirection: "row",
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
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    marginBottom: -30,
    marginLeft: 5,
  },
});
const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  closeText: {
    marginTop: 20,
    color: "#26589c",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginBottom: 15,
  },
  price: {
    marginTop: 10,
    alignSelf: "center",
    fontWeight: "600",
    fontSize: 20,
    color: "#26589c",
  },
  description: {
    alignSelf: "center",
    textAlign: "center",
    marginTop: 10,
    alignItems: "center",
    fontWeight: "600",
    fontSize: 18,
  },
  ButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    gap: 8,
    borderRadius: 10,
    padding: 12,
  },
  addToCartButton: {
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 65,
    marginTop: 15,
  },
  wishlistButton: {
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginTop: 15,
  },
  addToCartText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
