import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
  SafeAreaView,
  Modal,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Header } from "../../components/Header";
import { getOrderDetails, updateInstallmentStatus } from "../../api/installment";

const SingleInstallmentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item, onInstallmentUpdate } = route.params;
  const [orderDetails, setOrderDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setIsLoading(true);
        const details = await getOrderDetails(item.orderId);
        setOrderDetails(details);
      } catch (error) {
        Alert.alert("Error", error.message || "Failed to load order details.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrderDetails();
  }, [item.orderId]);

  const handleUpdateStatus = async (installmentId) => {
    try {
      setIsUpdating((prev) => ({ ...prev, [installmentId]: true }));
      await updateInstallmentStatus(installmentId);
      const updatedDetails = await getOrderDetails(item.orderId);
      setOrderDetails(updatedDetails);
      const allPaid = updatedDetails.installments.every(
        (installment) => installment.paymentStatus === "Paid"
      );
   
      onInstallmentUpdate();
      setModalVisible(true);
    } catch (error) {
      Alert.alert(
        "Error",
        error.message || "Failed to update installment status."
      );
    } finally {
      setIsUpdating((prev) => ({ ...prev, [installmentId]: false }));
    }
  };

  // Format date to a readable string
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
          <View style={styles.headerContent}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Installment Details</Text>
          </View>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!orderDetails) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <LinearGradient colors={["#26589c", "#9cb2d8"]} style={styles.header}>
          <View style={styles.headerContent}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Installment Details</Text>
          </View>
        </LinearGradient>
        <View style={styles.emptyContainer}>
          <Ionicons name="alert-circle-outline" size={64} color="#26589c" />
          <Text style={styles.emptyText}>Order Not Found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const { order, installments } = orderDetails;
  const getProductNames = (orderItems) => {
    if (!orderItems || orderItems.length === 0) return "No Products";
    return orderItems.map((item) => item.product.name).join(", ");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Header
        title="Installment details"
        backButtonAction={() => navigation.goBack()}
      />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardTitleContainer}>
              <Text style={styles.cardTitle}>
                {getProductNames(item.orderItems)}
              </Text>
              <Text style={styles.cardSubtitle}>{item.orderNumber}</Text>
            </View>
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor:
                    order.status === "Pending" ? "#26589c" : "#4CAF50",
                },
              ]}
            >
              <Text style={styles.statusText}>{order.status}</Text>
            </View>
          </View>

          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Total Amount</Text>
              <Text style={styles.detailValue}>
                {order.totalAmount} {order.currency.toUpperCase()}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Order Date</Text>
              <Text style={styles.detailValue}>
                {formatDate(order.orderDate)}
              </Text>
            </View>
          </View>

          <View style={styles.paymentHistory}>
            <Text style={styles.sectionTitle}>Installments</Text>
            {installments.map((installment) => (
              <View key={installment.installmentId} style={styles.paymentItem}>
                <View style={styles.paymentInfo}>
                  <Text style={styles.paymentDate}>
                    Installment #{installment.installmentNumber} - Due:{" "}
                    {formatDate(installment.dueDate)}
                  </Text>
                  <Text style={styles.paymentAmount}>
                    {installment.amount} {installment.currency.toUpperCase()}
                  </Text>
                  {installment.paymentStatus === "Paid" &&
                    installment.transactionId && (
                      <Text style={styles.transactionId}>
                        Transaction ID: {installment.transactionId}
                      </Text>
                    )}
                </View>
                <View style={styles.paymentStatus}>
                  <Text style={styles.paymentStatusText}>
                    {installment.paymentStatus}
                  </Text>
                  {installment.paymentStatus === "Pending" && (
                    <TouchableOpacity
                      style={styles.payButton}
                      onPress={() =>
                        handleUpdateStatus(installment.installmentId)
                      }
                      disabled={isUpdating[installment.installmentId]}
                    >
                      <Text style={styles.payButtonText}>
                        {isUpdating[installment.installmentId]
                          ? "Paying..."
                          : "Pay Now"}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons
              name="checkmark-circle"
              size={48}
              color="#4CAF50"
              style={styles.modalIcon}
            />
            <Text style={styles.modalTitle}>Payment Confirmed</Text>
            <Text style={styles.modalMessage}>{modalMessage}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
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
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  content: {
    flex: 1,
    padding: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: "#666",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#26589c",
    marginTop: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  cardTitleContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  detailLabel: {
    fontSize: 14,
    color: "#666",
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  paymentHistory: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  paymentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  paymentInfo: {
    flex: 1,
  },
  paymentDate: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  paymentAmount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  transactionId: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
    fontStyle: "italic",
  },
  paymentStatus: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  paymentStatusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
  },
  payButton: {
    backgroundColor: "#26589c",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  payButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  modalIcon: {
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#26589c",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default SingleInstallmentScreen;
