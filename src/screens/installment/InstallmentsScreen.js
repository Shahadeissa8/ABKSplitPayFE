
import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { getOrders } from "../../api/installment";

const InstallmentsScreen = () => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch orders
  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const fetchedOrders = await getOrders();
      setOrders(fetchedOrders);
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to load orders.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch orders on mount
  useEffect(() => {
    fetchOrders();
  }, []);

  // Callback to update orders after an installment is paid and refetch
  const onInstallmentUpdate = async () => {
    // Refetch orders to ensure the UI reflects the latest status
    await fetchOrders();
  };

  // Get product names from orderItems
  const getProductNames = (orderItems) => {
    if (!orderItems || orderItems.length === 0) return "No Products";
    return orderItems.map((item) => item.product.name).join(", ");
  };

  const renderOrderCard = (item) => (
    <TouchableOpacity
      key={item.orderId}
      style={styles.card}
      onPress={() =>
        navigation.navigate("SingleInstallmentScreen", { item, onInstallmentUpdate })
      }
    >
      <View style={styles.cardHeader}>
        <View style={styles.productIcon}>
          <Ionicons name="cart-outline" size={24} color="#fff" />
        </View>
        <View style={styles.cardTitleContainer}>
          <Text style={styles.cardTitle}>{getProductNames(item.orderItems)}</Text>
          <Text style={styles.cardSubtitle}>Order #{item.orderId}</Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor:
                item.status === "Pending" ? "#26589c" : "#4CAF50",
            },
          ]}
        >
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={["#26589c", "#9cb2d8"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="#26589c" />
      <SafeAreaView style={styles.innerContainer}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>My Installments</Text>
          </View>

          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === "all" && styles.activeTab]}
              onPress={() => handleTabPress("all")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "all" && styles.activeTabText,
                ]}
              >
                All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === "active" && styles.activeTab]}
              onPress={() => handleTabPress("active")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "active" && styles.activeTabText,
                ]}
              >
                Processing
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === "completed" && styles.activeTab]}
              onPress={() => handleTabPress("completed")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "completed" && styles.activeTabText,
                ]}
              >
                Paid
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.headerStats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {
                  installments.filter((item) => item.status === "Processing")
                    .length
                }
              </Text>
              <Text style={styles.statLabel}>Processing</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {installments.reduce(
                  (sum, item) => sum + parseFloat(item.remaining),
                  0
                )}{" "}
                KD
              </Text>
              <Text style={styles.statLabel}>Remaining</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {installments.filter((item) => item.status === "Paid").length}
              </Text>
              <Text style={styles.statLabel}>Paid</Text>
            </View>
          </View>
        </View>

        <ScrollView style={styles.content}>
          {filteredInstallments.map(renderInstallmentCard)}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>

  );
};

export default InstallmentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
  },
  header: {
    paddingBottom: 20,
    borderBottomLeftRadius: 30, // Keep the oval shape
    borderBottomRightRadius: 30, // Keep the oval shape
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
  emptySubtext: {
    fontSize: 14,

    color: "rgba(255,255,255,0.9)",
    marginTop: 5,
  },
  content: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f5f5f5", // Match the original container background

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
  },
  productIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#26589c",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
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

  progressContainer: {
    marginBottom: 20,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    color: "#666",
  },
  progressPercentage: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#26589c",
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderRadius: 4,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingTop: 15,
  },
  amountContainer: {
    alignItems: "flex-start",
  },
  dateContainer: {
    alignItems: "flex-end",
  },
  amountLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  amountValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1a237e",
  },
  dateLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  dateValue: {
    fontSize: 14,
    color: "#333",
  },

});