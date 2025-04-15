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
} from "react-native";
import React, { useState } from "react";
import CategoryList from "../../components/ExploreComponents/CategoryList";
import InstructionsCard from "../../components/ExploreComponents/InstructionsCard";
import DealsList from "../../components/ExploreComponents/DealsList";
import ProductList from "../../components/ExploreComponents/ProductList";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const ExploreScreen = () => {
  const navigation = useNavigation();
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); // 👈 Step 1
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductPress = (product) => {
    console.log("Pressed product:", product.name); // 👀 Debug log
    setSelectedProduct(product); // product object from backend
    setModalVisible(true);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2E3192" />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => 
            navigation.navigate("MyCartScreen")
          }
        >
          <Ionicons name="cart-outline" size={24} color="#2E3192" />
        </TouchableOpacity>
      </View>
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
              {/* <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate("ProductDetailsScreen", {
                    productId: selectedProduct.productId,
                  });
                }}
              >
                <Text style={{ color: "blue", marginTop: 20 }}>
                  View Details
                </Text>
              </TouchableOpacity> */}
              <Image
                source={{ uri: selectedProduct.pictureUrl }}
                style={modalStyles.image}
                resizeMode="cover"
              />
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={modalStyles.closeText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  cartButton: {
    padding: 8,
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
});
const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent background
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    elevation: 5, // Android shadow
    shadowColor: "#000", // iOS shadow
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
});
