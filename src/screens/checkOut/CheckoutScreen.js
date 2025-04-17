import React, { useState, useEffect } from "react";
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
import { useNavigation, useRoute } from "@react-navigation/native";
import { useCart } from "../../context/CartContext";
import { LinearGradient } from "expo-linear-gradient";
import { getPaymentPlans, getAllAddresses, getDefaultAddress, getAllPaymentMethods, getDefaultPaymentMethod, placeOrder } from "../../api/order";

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
  const route = useRoute();
  const { cartItems, clearCart } = useCart();
  const { total: passedTotal } = route.params || {}; // Get the total passed from MyCartScreen
  const [paymentPlans, setPaymentPlans] = useState([]);
  const [selectedPaymentPlan, setSelectedPaymentPlan] = useState(null);
  const [allAddresses, setAllAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [allPaymentMethods, setAllPaymentMethods] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentPlanModalVisible, setPaymentPlanModalVisible] = useState(false);
  const [addressModalVisible, setAddressModalVisible] = useState(false);
  const [paymentMethodModalVisible, setPaymentMethodModalVisible] = useState(false);

  // Fallback function to calculate total if passedTotal is invalid
  const calculateTotal = () => {
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return "0.00";
    }
    return cartItems
      .reduce((total, item) => {
        const price = parseFloat(item.product?.price) || 0;
        const quantity = item.quantity || 0;
        return total + price * quantity;
      }, 0)
      .toFixed(2);
  };

  // Use the passed total, or recalculate if invalid
  const displayTotal = (passedTotal && parseFloat(passedTotal) > 0) ? passedTotal : calculateTotal();

  // Fetch payment plans, addresses, and payment methods on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Fetch payment plans
        const plans = await getPaymentPlans();
        setPaymentPlans(plans);
        if (plans.length > 0) {
          setSelectedPaymentPlan(plans[0]);
        }

        // Fetch all addresses and set the default
        const addresses = await getAllAddresses();
        setAllAddresses(addresses);
        const defaultAddress = await getDefaultAddress();
        setSelectedAddress(defaultAddress);

        // Fetch all payment methods and set the default
        const paymentMethods = await getAllPaymentMethods();
        setAllPaymentMethods(paymentMethods);
        const defaultPaymentMethod = await getDefaultPaymentMethod();
        setSelectedPaymentMethod(defaultPaymentMethod);

        // Log the total amount
        console.log("Total amount in CheckoutScreen:", displayTotal, "KD");
      } catch (error) {
        Alert.alert("Error", error.message || "Failed to load checkout data.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
    setAddressModalVisible(false);
  };

  const handleSelectPaymentMethod = (method) => {
    setSelectedPaymentMethod(method);
    setPaymentMethodModalVisible(false);
  };

  const handleConfirmOrder = async () => {
    if (!selectedPaymentPlan || !selectedAddress || !selectedPaymentMethod || cartItems.length === 0) {
      Alert.alert("Error", "Please select a payment plan, shipping address, payment method, and ensure your cart is not empty.");
      return;
    }

    try {
      const orderItems = cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: parseFloat(item.product?.price) || 0,
        discount: 0,
      }));

      const orderData = {
        paymentPlanId: selectedPaymentPlan.paymentPlanId,
        shippingAddressId: selectedAddress.addressId,
        paymentMethodId: selectedPaymentMethod.paymentMethodId,
        currency: "KWD",
        notes: "Order placed via app",
        shippingMethod: "string",
        orderItems: orderItems,
      };

      await placeOrder(orderData);

      clearCart();

      Alert.alert(
        "Order Accepted! 🎉",
        "Thank you for your purchase. Your order has been successfully placed.",
        [
          {
            text: "Continue Shopping",
            onPress: () => navigation.navigate("ExploreScreen"),
          },
        ]
      );
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to place order.");
    }
  };

  const handleSelectPaymentPlan = (plan) => {
    setSelectedPaymentPlan(plan);
    setPaymentPlanModalVisible(false);
  };

  if (isLoading) {
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
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

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
            {selectedAddress?.isDefault && (
              <View style={styles.defaultBadge}>
                <Text style={styles.defaultText}>Default</Text>
              </View>
            )}
          </View>
          <View style={styles.card}>
            {selectedAddress ? (
              <>
                <Text style={styles.cardText}>{selectedAddress.addressLine1}</Text>
                <Text style={styles.cardText}>{selectedAddress.addressLine2}</Text>
                <Text style={styles.cardText}>
                  {selectedAddress.city}, {selectedAddress.state} {selectedAddress.postalCode}, {selectedAddress.country}
                </Text>
              </>
            ) : (
              <Text style={styles.cardText}>No address selected</Text>
            )}
            <TouchableOpacity
              style={styles.changeButton}
              onPress={() => setAddressModalVisible(true)}
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
            {selectedPaymentMethod?.isDefault && (
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
                {selectedPaymentMethod ? (
                  <>
                    <Text style={styles.cardText}>**** **** **** {selectedPaymentMethod.lastFourDigits}</Text>
                    <Text style={styles.cardText}>
                      {selectedPaymentMethod.cardType} - Expires {selectedPaymentMethod.expiryMonth}/{selectedPaymentMethod.expiryYear}
                    </Text>
                  </>
                ) : (
                  <Text style={styles.cardText}>No payment method selected</Text>
                )}
              </View>
            </View>
            <TouchableOpacity
              style={styles.changeButton}
              onPress={() => setPaymentMethodModalVisible(true)}
            >
              <Text style={styles.changeButtonText}>Change Payment Method</Text>
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
            <Text style={styles.sectionTitle}>Payment Plan</Text>
          </View>
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.cardInfo}
              onPress={() => setPaymentPlanModalVisible(true)}
            >
              <Ionicons
                name="calendar-outline"
                size={24}
                color={colors.primary}
                style={styles.cardIcon}
              />
              <View>
                <Text style={styles.cardText}>
                  {selectedPaymentPlan ? selectedPaymentPlan.name : "Select Payment Plan"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.section, { marginBottom: 10 }]}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.card}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Subtotal</Text>
              <Text style={styles.summaryValue}>{displayTotal} KD</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Shipping</Text>
              <Text style={[styles.summaryValue, { color: "#4CAF50" }]}>
                Free
              </Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={styles.totalValue}>{displayTotal} KD</Text>
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

      {/* Address Selection Modal */}
      <Modal
        visible={addressModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setAddressModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Address</Text>
            <ScrollView style={styles.modalScroll}>
              {allAddresses.map((address) => (
                <TouchableOpacity
                  key={address.addressId}
                  style={styles.modalOption}
                  onPress={() => handleSelectAddress(address)}
                >
                  <Text style={styles.modalOptionText}>
                    {address.addressLine1}, {address.city}, {address.country}
                  </Text>
                  {selectedAddress?.addressId === address.addressId && (
                    <Ionicons name="checkmark" size={20} color={colors.primary} />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setAddressModalVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Payment Method Selection Modal */}
      <Modal
        visible={paymentMethodModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setPaymentMethodModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Payment Method</Text>
            <ScrollView style={styles.modalScroll}>
              {allPaymentMethods.map((method) => (
                <TouchableOpacity
                  key={method.paymentMethodId}
                  style={styles.modalOption}
                  onPress={() => handleSelectPaymentMethod(method)}
                >
                  <Text style={styles.modalOptionText}>
                    {method.cardType} - **** **** **** {method.lastFourDigits}
                  </Text>
                  {selectedPaymentMethod?.paymentMethodId === method.paymentMethodId && (
                    <Ionicons name="checkmark" size={20} color={colors.primary} />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setPaymentMethodModalVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Payment Plan Selection Modal */}
      <Modal
        visible={paymentPlanModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setPaymentPlanModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Payment Plan</Text>
            <ScrollView style={styles.modalScroll}>
              {paymentPlans.map((plan) => (
                <TouchableOpacity
                  key={plan.paymentPlanId}
                  style={styles.modalOption}
                  onPress={() => handleSelectPaymentPlan(plan)}
                >
                  <Text style={styles.modalOptionText}>{plan.name}</Text>
                  {selectedPaymentPlan?.paymentPlanId === plan.paymentPlanId && (
                    <Ionicons name="checkmark" size={20} color={colors.primary} />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setPaymentPlanModalVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    width: "80%",
    maxHeight: "60%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 15,
    textAlign: "center",
  },
  modalScroll: {
    maxHeight: 200,
  },
  modalOption: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalOptionText: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  modalCloseButton: {
    marginTop: 20,
    backgroundColor: colors.primary,
    paddingVertical: 10,
    borderRadius: 15,
    alignItems: "center",
  },
  modalCloseButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: colors.textSecondary,
  },
});

export default CheckoutScreen;