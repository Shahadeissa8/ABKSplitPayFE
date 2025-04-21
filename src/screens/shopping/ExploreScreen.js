// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   SafeAreaView,
//   StatusBar,
//   Modal,
//   Image,
//   TouchableOpacity,
//   Alert,
//   Platform,
// } from "react-native";
// import React, { useState } from "react";
// import CategoryList from "../../components/ExploreComponents/CategoryList";
// import InstructionsCard from "../../components/ExploreComponents/InstructionsCard";
// import DealsList from "../../components/ExploreComponents/DealsList";
// import ProductList from "../../components/ExploreComponents/ProductList";
// import { useNavigation } from "@react-navigation/native";
// import Feather from "@expo/vector-icons/Feather";
// import { LinearGradient } from "expo-linear-gradient";
// import { Ionicons } from "@expo/vector-icons";
// import { useCart } from "../../context/CartContext";
// import { addToWishList } from "../../api/CartAPI"; // Import the addToWishList function

// const ExploreScreen = () => {
//   const navigation = useNavigation();
//   const [selectedCategoryId, setSelectedCategoryId] = useState(null);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const { addToCart } = useCart();

//   const handleAddToWishlist = async (productId) => {
//     try {
//       console.log("Adding product to wishlist with productId:", productId); // Debug log
//       await addToWishList({ productId }); // Call the endpoint with the productId
//       Alert.alert("Success", "Product added to wishlist!");
//     } catch (error) {
//       console.error(
//         "Error adding product to wishlist:",
//         error.response?.data || error.message
//       );
//       Alert.alert(
//         "Error",
//         error.response?.data?.message || "Failed to add product to wishlist."
//       );
//     }
//   };

//   const handleProductPress = (product) => {
//     console.log("Pressed product:", product.name); // Debug log
//     setSelectedProduct(product); // Set the selected product
//     setModalVisible(true); // Show the modal
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="light-content" />
//       {/* backgroundColor="#2E3192" /> */}
//       <LinearGradient colors={["#26589c", "#9cb2d8"]} style={styles.header}>
//         <View style={styles.headerContent}>
//           <Text style={styles.headerTitle}>Explore</Text>
//           <TouchableOpacity
//             style={styles.cartButton}
//             onPress={() => navigation.navigate("MyCartScreen")}
//           >
//             <View style={styles.theView}>
//               <LinearGradient
//                 colors={["rgba(255,255,255,0.2)", "rgba(255,255,255,0.1)"]}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 0 }}
//                 style={styles.cartGradient}
//               >
//                 <Ionicons name="cart-outline" size={30} color="white" />
//               </LinearGradient>
//             </View>
//           </TouchableOpacity>
//         </View>
//       </LinearGradient>
//       {/* <View style={styles.header}> */}
//       {/* <TouchableOpacity
//           style={styles.cartButton}
//           onPress={() => navigation.navigate("MyCartScreen")}

//           //cart stayle
//         >
//           <Ionicons name="cart-outline" size={30} color="#2E3192" />
//         </TouchableOpacity> */}
//       {/* </View> */}
//       <ScrollView contentContainerStyle={styles.scrollContent}>
//         <View style={styles.instructionsContainer}>
//           <InstructionsCard />
//         </View>

//         <View style={styles.contentContainer}>
//           <DealsList />
//         </View>

//         <View>
//           <CategoryList onSelectCategory={setSelectedCategoryId} />
//         </View>

//         <View>
//           <ProductList
//             selectedCategoryId={selectedCategoryId}
//             onProductPress={handleProductPress}
//           />
//         </View>
//       </ScrollView>
//       {selectedProduct && (
//         <Modal
//           visible={modalVisible}
//           transparent
//           animationType="slide"
//           onRequestClose={() => setModalVisible(false)}
//         >
//           <View style={modalStyles.overlay}>
//             <View style={modalStyles.content}>
//               <Text style={modalStyles.title}>{selectedProduct.name}</Text>
//               <Text style={modalStyles.description}>
//                 {selectedProduct.description}
//               </Text>
//               <Text style={modalStyles.price}>
//                 Price: {selectedProduct.price} KD
//               </Text>
//               <Image
//                 source={{ uri: selectedProduct.pictureUrl }}
//                 style={modalStyles.image}
//                 resizeMode="cover"
//               />
//               <View style={modalStyles.ButtonGradient}>
//                 {/* Add to Cart Button */}
//                 <TouchableOpacity
//                   onPress={() => {
//                     addToCart(selectedProduct.productId, 1); // Add to cart
//                     setModalVisible(false);
//                   }}
//                 >
//                   <LinearGradient
//                     colors={["#26589c", "#9cb2d8"]}
//                     start={{ x: 0, y: 0 }}
//                     end={{ x: 1, y: 0 }}
//                     style={modalStyles.addToCartButton}
//                   >
//                     <Text style={modalStyles.addToCartText}>
//                       <Feather name="shopping-cart" size={20} color="white" />{" "}
//                       Add to cart
//                     </Text>
//                   </LinearGradient>
//                 </TouchableOpacity>

//                 {/* Add to Wishlist Button */}
//                 <TouchableOpacity
//                   onPress={() => handleAddToWishlist(selectedProduct.productId)} // Add to wishlist
//                 >
//                   <LinearGradient
//                     colors={["#26589c", "#9cb2d8"]}
//                     start={{ x: 0, y: 0 }}
//                     end={{ x: 1, y: 0 }}
//                     style={modalStyles.wishlistButton}
//                   >
//                     <Text style={modalStyles.addToCartText}>
//                       <Feather name="heart" size={24} color="white" />
//                     </Text>
//                   </LinearGradient>
//                 </TouchableOpacity>
//               </View>
//               <TouchableOpacity onPress={() => setModalVisible(false)}>
//                 <Text style={modalStyles.closeText}>Close</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </Modal>
//       )}
//     </View>
//   );
// };

// export default ExploreScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   // header1: {
//   //   flexDirection: "row",
//   //   justifyContent: "flex-end",
//   //   alignItems: "center",
//   //   paddingHorizontal: 20,
//   //   paddingVertical: 15,
//   //   borderBottomWidth: 1,
//   //   borderBottomColor: "#eee",
//   // },
//   theView: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginLeft: 210,
//     marginBottom:-10,
//     marginTop:5
//   },
//   cartButton: {
//     padding: 8,
//   },
//   cartGradient: {
//     padding: 8,
//     borderRadius: 20,
//   },
//   scrollContent: {
//     flexGrow: 1,
//   },
//   instructionsContainer: {
//     paddingHorizontal: 15,
//   },
//   contentContainer: {
//     flex: 1,
//     marginTop: 30,
//   },
//   header: {
//     paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
//     paddingBottom: 20,
//     borderBottomLeftRadius: 30,
//     borderBottomRightRadius: 30,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.3,
//     shadowRadius: 4.65,
//     elevation: 8,
//     flexDirection: "row",
//   },
//   headerContent: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingHorizontal: 20,
//     paddingTop: 15,
//   },
//   headerTitle: {
//     fontSize: 28,
//     fontWeight: "bold",
//     color: "#fff",
//     textShadowColor: "rgba(0, 0, 0, 0.2)",
//     textShadowOffset: { width: 0, height: 1 },
//     textShadowRadius: 2,
//     marginBottom:-30,marginLeft:5
//   },
// });
// const modalStyles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent background
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   content: {
//     width: "85%",
//     backgroundColor: "#fff",
//     borderRadius: 16,
//     padding: 20,
//     elevation: 5, // Android shadow
//     shadowColor: "#000", // iOS shadow
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 10,
//     textAlign: "center",
//   },
//   closeText: {
//     marginTop: 20,
//     color: "#26589c",
//     fontSize: 16,
//     fontWeight: "600",
//     textAlign: "center",
//   },
//   image: {
//     width: "100%",
//     height: 300,
//     borderRadius: 10,
//     marginBottom: 15,
//   },
//   price: {
//     marginTop: 10,
//     alignSelf: "center",
//     fontWeight: "600",
//     fontSize: 20,
//     color: "#26589c",
//   },
//   description: {
//     alignSelf: "center",
//     textAlign: "center",
//     marginTop: 10,
//     alignItems: "center",
//     fontWeight: "600",
//     fontSize: 18,
//   },
//   ButtonGradient: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 16,
//     gap: 8,
//     borderRadius: 10,
//     padding: 12,
//   },
//   addToCartButton: {
//     borderRadius: 10,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingVertical: 14,
//     paddingHorizontal: 65,
//     marginTop: 15,
//   },
//   wishlistButton: {
//     borderRadius: 10,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingVertical: 12,
//     paddingHorizontal: 15,
//     marginTop: 15,
//   },
//   addToCartText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "600",
//     textAlign: "center",
//   },
// });

///new code
import React, { useState } from "react";
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
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CategoryList from "../../components/ExploreComponents/CategoryList";
import InstructionsCard from "../../components/ExploreComponents/InstructionsCard";
import DealsList from "../../components/ExploreComponents/DealsList";
import ProductList from "../../components/ExploreComponents/ProductList";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import { useCart } from "../../context/CartContext";
import { addToWishList } from "../../api/CartAPI";

const { width } = Dimensions.get("window");

const FONT_SIZES = {
  HEADING_LARGE: 26,
  HEADING: 22,
  SUBHEADING: 18,
  BODY_LARGE: 16,
  BODY: 15,
  CAPTION: 13,
  SMALL: 11,
};

const ExploreScreen = () => {
  const navigation = useNavigation();
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#26589c" />

      <LinearGradient
      // blue with gradient
        // colors={["#26589c", "#9cb2d8"]}
        //blue 
        colors={["#4a6fa1", "#9cb2d8"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Explore</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.cartButton}
              onPress={() => navigation.navigate("MyCartScreen")}
            >
              <LinearGradient
              //
                // colors={["rgba(255,255,255,0.2)", "rgba(255,255,255,0.1)"]}

                colors={["#4a6fa1", "#9cb2d8"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.cartGradient}
              >
                <Ionicons name="cart-outline" size={28} color="white" />
                {cartItems?.length > 0 && (
                  <View style={styles.cartBadge}>
                    <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
                  </View>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mainContent}>
          <View style={[styles.section, styles.instructionsSection]}>
            <InstructionsCard />
          </View>

          <View style={[styles.section, styles.dealsSection]}>
            <DealsList />
          </View>

          <View style={[styles.section, styles.categoriesSection]}>
            <CategoryList onSelectCategory={setSelectedCategoryId} />
          </View>

          <View style={[styles.section, styles.productsSection]}>
            <ProductList
              selectedCategoryId={selectedCategoryId}
              onProductPress={handleProductPress}
            />
          </View>
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

                <View style={modalStyles.ButtonGradient}>
                  <TouchableOpacity
                    onPress={() => {
                      addToCart(selectedProduct.productId, 1);
                      setModalVisible(false);
                    }}
                    style={modalStyles.addToCartContainer}
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
                    onPress={() =>
                      handleAddToWishlist(selectedProduct.productId)
                    }
                    style={modalStyles.wishlistContainer}
                  >
                    <LinearGradient
                      colors={["#26589c", "#9cb2d8"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={modalStyles.wishlistButton}
                    >
                      <Feather name="heart" size={24} color="white" />
                    </LinearGradient>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    paddingTop: Platform.OS === "ios" ? 10 : StatusBar.currentHeight + 10,
    paddingBottom: 25,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 0.5,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  cartButton: {
    marginLeft: "auto",
  },
  cartGradient: {
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
    fontSize: FONT_SIZES.SMALL,
    fontWeight: "700",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  mainContent: {
    padding: 15,
    gap: 20,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 15,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  instructionsSection: {
    backgroundColor: "rgba(38, 88, 156, 0.05)",
    marginTop: 10,
  },
  dealsSection: {
    borderWidth: 1,
    borderColor: "rgba(38, 88, 156, 0.1)",
    marginTop: 55,
  },
  categoriesSection: {
    backgroundColor: "transparent",
    marginTop: -10,
    marginBottom: 0,
    paddingHorizontal: 0,
    paddingVertical: 5,
    ...Platform.select({
      ios: {
        shadowColor: "transparent",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
      },
      android: {
        elevation: 0,
      },
    }),
  },
  productsSection: {
    marginTop: 5,
    paddingHorizontal: 10,
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
    width: "97%",
    height: 250,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: 8,
    marginRight: 8,
    marginLeft: 8,
  },
  contentContainer: {
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: FONT_SIZES.HEADING_LARGE,
    fontWeight: "700",
    marginBottom: 12,
    color: "#26589c",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  description: {
    fontSize: FONT_SIZES.BODY,
    color: "#666",
    textAlign: "center",
    marginBottom: 15,
    lineHeight: 22,
    letterSpacing: 0.3,
  },
  price: {
    fontSize: FONT_SIZES.HEADING,
    fontWeight: "700",
    color: "#26589c",
    textAlign: "center",
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  ButtonGradient: {
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
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  wishlistContainer: {
    width: 52,
  },
  wishlistButton: {
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
  },
  addToCartText: {
    color: "white",
    fontSize: FONT_SIZES.BODY_LARGE,
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
    fontSize: FONT_SIZES.BODY_LARGE,
    fontWeight: "600",
    textAlign: "center",
    letterSpacing: 0.3,
  },
});

export default ExploreScreen;
