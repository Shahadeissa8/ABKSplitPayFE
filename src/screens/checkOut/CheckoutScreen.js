// import React, { useEffect, useState } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   SafeAreaView,
//   TouchableOpacity,
//   ScrollView,
//   Platform,
//   Alert,
//   Modal,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
// import { useCart } from "../../context/CartContext";
// import { LinearGradient } from "expo-linear-gradient";
// import { getPaymentPlan } from "../../api/PaymentPlanAPI";

// const colors = {
//   primary: "#2E3192",
//   secondary: "#26589c",
//   background: "#FFFFFF",
//   backgroundLight: "#F5F5F5",
//   textPrimary: "#333333",
//   textSecondary: "#666666",
//   border: "#EEEEEE",
//   white: "#FFFFFF",
//   gradientColors: ["#26589c", "#9cb2d8"],
// };

// const CheckoutScreen = () => {
//   const navigation = useNavigation();
//   const { cartItems } = useCart();
//   const [selectedAddress, setSelectedAddress] = useState({
//     street: "123 Main Street",
//     apartment: "Apartment 4B",
//     city: "New York, NY 10001",
//     isDefault: true,
//   });
//   const [selectedCard, setSelectedCard] = useState({
//     number: "**** **** **** 1234",
//     expiry: "12/24",
//     isDefault: true,
//   });

//   const calculateTotal = () => {
//     return cartItems
//       .reduce(
//         (total, item) => total + parseFloat(item.price) * item.quantity,
//         0
//       )
//       .toFixed(2);
//   };

//   const handleChangeAddress = () => {
//     navigation.navigate("SavedAddresses", { onSelect: setSelectedAddress });
//   };

//   const handleChangePayment = () => {
//     navigation.navigate("SavedCards", { onSelect: setSelectedCard });
//   };

//   // const handleConfirmOrder = () => {
//   //   Alert.alert(
//   //     "Order Confirmed! 🎉",
//   //     "Thank you for your purchase. Your order has been successfully placed.",
//   //     [
//   //       {
//   //         text: "Continue Shopping",
//   //         onPress: () => navigation.navigate("ExploreScreen"),
//   //       },
//   //     ]
//   //   );
//   // };

//   const handleConfirmOrder = async () => {
//     if (!selectedPaymentPlan) {
//       Alert.alert("Please select a payment plan.");
//       return;
//     }

//     try {
//       const orderData = {
//         paymentPlanId: selectedPaymentPlan.paymentPlanId,
//         shippingAddressId: 1, // Replace with actual selectedAddress.id if available
//         currency: "KWD",
//         notes: "Order from mobile app",
//         shippingMethod: "standard", // You can customize this
//       };

//       const response = await createOrder(orderData);

//       Alert.alert(
//         "Order Confirmed 🎉",
//         "Your order has been placed successfully.",
//         [
//           {
//             text: "Continue Shopping",
//             onPress: () => navigation.navigate("ExploreScreen"),
//           },
//         ]
//       );
//     } catch (error) {
//       console.error("Order creation failed:", error);
//       Alert.alert(
//         "Error",
//         "There was a problem placing your order. Please try again."
//       );
//     }
//   };

//   const [paymentPlans, setPaymentPlans] = useState([]);
//   const [selectedPaymentPlan, setSelectedPaymentPlan] = useState(null);
//   const [showPaymentPlanModal, setShowPaymentPlanModal] = useState(false);
//   useEffect(() => {
//     // const fetchPlans = async () => {
//     //   try {
//     //     const response = await getPaymentPlan();
//     //     const data = await response.json();
//     //     setPaymentPlans(data);
//     //   } catch (err) {
//     //     console.error("Error fetching payment plans:", err);
//     //     Alert.alert("Error", "Could not load payment plans.");
//     //   }
//     // };
//     const fetchPaymentPlans = async () => {
//       try {
//         const response = await getPaymentPlan();
//         console.log("Fetched payment plans:", response); // Log this
//         setPaymentPlans(response);
//       } catch (error) {
//         console.error("Failed to fetch payment plans", error);
//         Alert.alert("Error", "Couldn't load payment plans");
//       }
//     };

//     fetchPlans();
//   }, []);

//   return (
//     <SafeAreaView style={styles.container}>
//       <LinearGradient
//         colors={colors.gradientColors}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//         style={styles.header}
//       >
//         <TouchableOpacity
//           style={styles.backButton}
//           onPress={() => navigation.goBack()}
//         >
//           <Ionicons name="arrow-back" size={24} color={colors.white} />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Checkout</Text>
//       </LinearGradient>

//       <ScrollView
//         style={styles.content}
//         showsVerticalScrollIndicator={false}
//         bounces={true}
//         contentContainerStyle={styles.scrollContent}
//       >
//         <View style={styles.section}>
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>Shipping Address</Text>
//             {selectedAddress.isDefault && (
//               <View style={styles.defaultBadge}>
//                 <Text style={styles.defaultText}>Default</Text>
//               </View>
//             )}
//           </View>
//           <View style={styles.card}>
//             <Text style={styles.cardText}>{selectedAddress.street}</Text>
//             <Text style={styles.cardText}>{selectedAddress.apartment}</Text>
//             <Text style={styles.cardText}>{selectedAddress.city}</Text>
//             <TouchableOpacity
//               style={styles.changeButton}
//               onPress={handleChangeAddress}
//             >
//               <Text style={styles.changeButtonText}>Change Address</Text>
//               <Ionicons
//                 name="chevron-forward"
//                 size={20}
//                 color={colors.primary}
//               />
//             </TouchableOpacity>
//           </View>
//         </View>

//         <View style={styles.section}>
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>Payment Method</Text>
//             {selectedCard.isDefault && (
//               <View style={styles.defaultBadge}>
//                 <Text style={styles.defaultText}>Default</Text>
//               </View>
//             )}
//           </View>
//           <View style={styles.card}>
//             <View style={styles.cardInfo}>
//               <Ionicons
//                 name="card-outline"
//                 size={24}
//                 color={colors.primary}
//                 style={styles.cardIcon}
//               />
//               <View>
//                 <Text style={styles.cardText}>{selectedCard.number}</Text>
//                 <Text style={styles.cardText}>
//                   Expires {selectedCard.expiry}
//                 </Text>
//               </View>
//             </View>
//             <TouchableOpacity
//               style={styles.changeButton}
//               onPress={handleChangePayment}
//             >
//               <Text style={styles.changeButtonText}>Change Card</Text>
//               <Ionicons
//                 name="chevron-forward"
//                 size={20}
//                 color={colors.primary}
//               />
//             </TouchableOpacity>
//           </View>
//         </View>
//         <TouchableOpacity
//           onPress={() => setShowPaymentPlanModal(true)}
//           style={styles.card}
//         >
//           <Text style={styles.sectionTitle}>Payment Plan</Text>
//           <Text style={styles.cardText}>
//             {selectedPaymentPlan ? selectedPaymentPlan.name : "Select Plan"}
//           </Text>
//         </TouchableOpacity>
//         <Modal
//           visible={showPaymentPlanModal}
//           transparent
//           animationType="slide"
//           onRequestClose={() => setShowPaymentPlanModal(false)}
//         >
//           <View style={styles.modalOverlay}>
//             <View style={styles.modalContent}>
//               <Text style={styles.modalTitle}>Choose a Payment Plan</Text>
//               <ScrollView>
//                 {paymentPlans.map((plan) => (
//                   <TouchableOpacity
//                     key={plan.paymentPlanId}
//                     style={styles.planOption}
//                     onPress={() => {
//                       setSelectedPaymentPlan(plan);
//                       setShowPaymentPlanModal(false);
//                     }}
//                   >
//                     <Text style={styles.planText}>
//                       {plan.name} ({plan.numberOfInstallments} installments)
//                     </Text>
//                   </TouchableOpacity>
//                 ))}
//               </ScrollView>
//             </View>
//           </View>
//         </Modal>

//         <View style={[styles.section, { marginBottom: 10 }]}>
//           <Text style={styles.sectionTitle}>Order Summary</Text>
//           <View style={styles.card}>
//             <View style={styles.summaryRow}>
//               <Text style={styles.summaryText}>Subtotal</Text>
//               <Text style={styles.summaryValue}>{calculateTotal()} KD</Text>
//             </View>
//             <View style={styles.summaryRow}>
//               <Text style={styles.summaryText}>Shipping</Text>
//               <Text style={[styles.summaryValue, { color: "#4CAF50" }]}>
//                 Free
//               </Text>
//             </View>
//             <View style={[styles.summaryRow, styles.totalRow]}>
//               <Text style={styles.totalText}>Total</Text>
//               <Text style={styles.totalValue}>{calculateTotal()} KD</Text>
//             </View>
//           </View>
//         </View>
//       </ScrollView>

//       <View style={styles.footer}>
//         <TouchableOpacity
//           style={styles.confirmButton}
//           onPress={handleConfirmOrder}
//         >
//           <LinearGradient
//             colors={colors.gradientColors}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 0 }}
//             style={styles.confirmGradient}
//           >
//             <Text style={styles.confirmButtonText}>Confirm Order</Text>
//           </LinearGradient>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalContent: {
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     padding: 20,
//     width: "80%",
//     maxHeight: "70%",
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 15,
//     textAlign: "center",
//   },
//   planOption: {
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   planText: {
//     fontSize: 16,
//     color: "#333",
//   },
//   container: {
//     flex: 1,
//     backgroundColor: colors.backgroundLight,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingTop: Platform.OS === "ios" ? 50 : 20,
//     paddingHorizontal: 20,
//     paddingBottom: 25,
//     borderBottomLeftRadius: 25,
//     borderBottomRightRadius: 25,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 5,
//     },
//     shadowOpacity: 0.15,
//     shadowRadius: 8,
//     elevation: 8,
//   },
//   backButton: {
//     padding: 10,
//     marginRight: 12,
//     backgroundColor: "rgba(255,255,255,0.2)",
//     borderRadius: 12,
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontWeight: "700",
//     color: colors.white,
//     letterSpacing: 0.5,
//   },
//   content: {
//     flex: 1,
//     marginBottom: 80,
//   },
//   scrollContent: {
//     padding: 20,
//     paddingBottom: 100,
//   },
//   section: {
//     marginBottom: 25,
//   },
//   sectionHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 12,
//     paddingHorizontal: 5,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: colors.textPrimary,
//     letterSpacing: 0.3,
//   },
//   card: {
//     backgroundColor: colors.white,
//     borderRadius: 18,
//     padding: 20,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 3,
//     },
//     shadowOpacity: 0.12,
//     shadowRadius: 10,
//     elevation: 5,
//   },
//   cardText: {
//     fontSize: 16,
//     color: colors.textSecondary,
//     marginBottom: 8,
//     letterSpacing: 0.2,
//   },
//   defaultBadge: {
//     backgroundColor: "rgba(46, 49, 146, 0.08)",
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderRadius: 8,
//     marginLeft: 12,
//   },
//   defaultText: {
//     fontSize: 13,
//     color: colors.primary,
//     fontWeight: "600",
//     letterSpacing: 0.2,
//   },
//   cardInfo: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 15,
//     backgroundColor: "rgba(46, 49, 146, 0.03)",
//     padding: 12,
//     borderRadius: 12,
//   },
//   cardIcon: {
//     marginRight: 15,
//     opacity: 0.9,
//   },
//   changeButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingTop: 15,
//     borderTopWidth: 1,
//     borderTopColor: colors.border,
//     marginTop: 12,
//   },
//   changeButtonText: {
//     color: colors.primary,
//     fontSize: 15,
//     fontWeight: "600",
//     letterSpacing: 0.2,
//   },
//   summaryRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 15,
//   },
//   summaryText: {
//     fontSize: 16,
//     color: colors.textSecondary,
//     letterSpacing: 0.2,
//   },
//   summaryValue: {
//     fontSize: 16,
//     color: colors.textPrimary,
//     fontWeight: "600",
//     letterSpacing: 0.2,
//   },
//   totalRow: {
//     borderTopWidth: 1,
//     borderTopColor: colors.border,
//     marginTop: 15,
//     paddingTop: 15,
//     marginBottom: 0,
//   },
//   totalText: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: colors.textPrimary,
//     letterSpacing: 0.3,
//   },
//   totalValue: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: colors.primary,
//     letterSpacing: 0.3,
//   },
//   footer: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: colors.white,
//     paddingHorizontal: 20,
//     paddingTop: 15,
//     paddingBottom: Platform.OS === "ios" ? 30 : 20,
//     borderTopWidth: 1,
//     borderTopColor: "rgba(0,0,0,0.06)",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: -3,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 10,
//     zIndex: 999,
//   },
//   confirmButton: {
//     width: "100%",
//     borderRadius: 15,
//     overflow: "hidden",
//     marginBottom: 65,
//     shadowColor: colors.primary,
//     shadowOffset: {
//       width: 0,
//       height: 3,
//     },
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//     elevation: 5,
//   },
//   confirmGradient: {
//     width: "100%",
//     paddingVertical: 16,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   confirmButtonText: {
//     color: colors.white,
//     fontSize: 18,
//     fontWeight: "700",
//     letterSpacing: 0.5,
//   },
// });

// export default CheckoutScreen;
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "../../context/CartContext";
import { LinearGradient } from "expo-linear-gradient";
import { getPaymentPlan } from "../../api/PaymentPlanAPI";

const colors = {
  primary: "#2E3192",
  secondary: "#26589c",
  background: "#FFFFFF",
  backgroundLight: "#F5F5F5",
  textPrimary: "#333333",
  textSecondary: "#666666",
  border: "#EEEEEE",
  white: "#FFFFFF",
  gradientColors: ["#26589c", "#9cb2d8"],
};

const CheckoutScreen = () => {
  const navigation = useNavigation();
  const { cartItems } = useCart();
  const [selectedAddress, setSelectedAddress] = useState({
    street: "123 Main Street",
    apartment: "Apartment 4B",
    city: "New York, NY 10001",
    isDefault: true,
  });
  const [selectedCard, setSelectedCard] = useState({
    number: "**** **** **** 1234",
    expiry: "12/24",
    isDefault: true,
  });

  const calculateTotal = () => {
    return cartItems
      .reduce(
        (total, item) => total + parseFloat(item.price) * item.quantity,
        0
      )
      .toFixed(2);
  };

  const handleChangeAddress = () => {
    navigation.navigate("SavedAddresses", { onSelect: setSelectedAddress });
  };

  const handleChangePayment = () => {
    navigation.navigate("SavedCards", { onSelect: setSelectedCard });
  };

  // const handleConfirmOrder = () => {
  //   Alert.alert(
  //     "Order Confirmed! 🎉",
  //     "Thank you for your purchase. Your order has been successfully placed.",
  //     [
  //       {
  //         text: "Continue Shopping",
  //         onPress: () => navigation.navigate("ExploreScreen"),
  //       },
  //     ]
  //   );
  // };

  const handleConfirmOrder = async () => {
    if (!selectedPaymentPlan) {
      Alert.alert("Please select a payment plan.");
      return;
    }

    try {
      const orderData = {
        paymentPlanId: selectedPaymentPlan.paymentPlanId,
        shippingAddressId: 1, // Replace with actual selectedAddress.id if available
        currency: "KWD",
        notes: "Order from mobile app",
        shippingMethod: "standard", // You can customize this
      };

      const response = await createOrder(orderData);

      Alert.alert(
        "Order Confirmed 🎉",
        "Your order has been placed successfully.",
        [
          {
            text: "Continue Shopping",
            onPress: () => navigation.navigate("ExploreScreen"),
          },
        ]
      );
    } catch (error) {
      console.error("Order creation failed:", error);
      Alert.alert(
        "Error",
        "There was a problem placing your order. Please try again."
      );
    }
  };

  const [paymentPlans, setPaymentPlans] = useState([]);
  const [selectedPaymentPlan, setSelectedPaymentPlan] = useState(null);
  const [showPaymentPlanModal, setShowPaymentPlanModal] = useState(false);
  useEffect(() => {
    const fetchPaymentPlans = async () => {
      try {
        const response = await getPaymentPlans();
        console.log("Fetched payment plans:", response); // ✅ Good for debugging
        setPaymentPlans(response);
      } catch (error) {
        console.error("Failed to fetch payment plans", error);
        Alert.alert("Error", "Couldn't load payment plans");
      }
    };

    fetchPaymentPlans(); // ✅ Correct call
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={colors.gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        bounces={true}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Shipping Address</Text>
            {selectedAddress.isDefault && (
              <View style={styles.defaultBadge}>
                <Text style={styles.defaultText}>Default</Text>
              </View>
            )}
          </View>
          <View style={styles.card}>
            <Text style={styles.cardText}>{selectedAddress.street}</Text>
            <Text style={styles.cardText}>{selectedAddress.apartment}</Text>
            <Text style={styles.cardText}>{selectedAddress.city}</Text>
            <TouchableOpacity
              style={styles.changeButton}
              onPress={handleChangeAddress}
            >
              <Text style={styles.changeButtonText}>Change Address</Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Payment Method</Text>
            {selectedCard.isDefault && (
              <View style={styles.defaultBadge}>
                <Text style={styles.defaultText}>Default</Text>
              </View>
            )}
          </View>
          <View style={styles.card}>
            <View style={styles.cardInfo}>
              <Ionicons
                name="card-outline"
                size={24}
                color={colors.primary}
                style={styles.cardIcon}
              />
              <View>
                <Text style={styles.cardText}>{selectedCard.number}</Text>
                <Text style={styles.cardText}>
                  Expires {selectedCard.expiry}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.changeButton}
              onPress={handleChangePayment}
            >
              <Text style={styles.changeButtonText}>Change Card</Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => setShowPaymentPlanModal(true)}
          style={styles.card}
        >
          <Text style={styles.sectionTitle}>Payment Plan</Text>
          <Text style={styles.cardText}>
            {selectedPaymentPlan ? selectedPaymentPlan.name : "Select Plan"}
          </Text>
        </TouchableOpacity>
        <Modal
          visible={showPaymentPlanModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowPaymentPlanModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Choose a Payment Plan</Text>
              <ScrollView>
                {paymentPlans.map((plan) => (
                  <TouchableOpacity
                    key={plan.paymentPlanId}
                    style={styles.planOption}
                    onPress={() => {
                      setSelectedPaymentPlan(plan);
                      setShowPaymentPlanModal(false);
                    }}
                  >
                    <Text style={styles.planText}>
                      {plan.name} ({plan.numberOfInstallments} installments)
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>

        <View style={[styles.section, { marginBottom: 10 }]}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.card}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Subtotal</Text>
              <Text style={styles.summaryValue}>{calculateTotal()} KD</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Shipping</Text>
              <Text style={[styles.summaryValue, { color: "#4CAF50" }]}>
                Free
              </Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={styles.totalValue}>{calculateTotal()} KD</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirmOrder}
        >
          <LinearGradient
            colors={colors.gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.confirmGradient}
          >
            <Text style={styles.confirmButtonText}>Confirm Order</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: "80%",
    maxHeight: "70%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  planOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  planText: {
    fontSize: 16,
    color: "#333",
  },
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 50 : 20,
    paddingHorizontal: 20,
    paddingBottom: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  backButton: {
    padding: 10,
    marginRight: 12,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.white,
    letterSpacing: 0.5,
  },
  content: {
    flex: 1,
    marginBottom: 80,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingHorizontal: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.textPrimary,
    letterSpacing: 0.3,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 5,
  },
  cardText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  defaultBadge: {
    backgroundColor: "rgba(46, 49, 146, 0.08)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginLeft: 12,
  },
  defaultText: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  cardInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "rgba(46, 49, 146, 0.03)",
    padding: 12,
    borderRadius: 12,
  },
  cardIcon: {
    marginRight: 15,
    opacity: 0.9,
  },
  changeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: 12,
  },
  changeButtonText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  summaryText: {
    fontSize: 16,
    color: colors.textSecondary,
    letterSpacing: 0.2,
  },
  summaryValue: {
    fontSize: 16,
    color: colors.textPrimary,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: 15,
    paddingTop: 15,
    marginBottom: 0,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary,
    letterSpacing: 0.3,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.primary,
    letterSpacing: 0.3,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: Platform.OS === "ios" ? 30 : 20,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.06)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
    zIndex: 999,
  },
  confirmButton: {
    width: "100%",
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 65,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  confirmGradient: {
    width: "100%",
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  confirmButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});

export default CheckoutScreen;
