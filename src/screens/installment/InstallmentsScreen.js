import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Platform,
  Dimensions,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const InstallmentsScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("all");

  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };

  const installments = [
    {
      id: 1,
      orderNumber: "#ORD-2024-001",
      productName: "iPhone 15 Pro",
      storeName: "X-Site",
      remaining: "500",
      totalAmount: "1000",
      progress: 50,
      date: "Due Date: 12/03/2024",
      icon: "phone-portrait",
      status: "Processing",
    },
    {
      id: 2,
      orderNumber: "#ORD-2024-002",
      productName: "MacBook Air M2",
      storeName: "JetIr",
      remaining: "500",
      totalAmount: "1000",
      progress: 30,
      date: "Due Date: 15/03/2024",
      icon: "laptop-outline",
      status: "Processing",
    },
    {
      id: 3,
      orderNumber: "#ORD-2024-003",
      productName: "Samsung S24 Ultra",
      storeName: "Al-fuhood",
      remaining: "500",
      totalAmount: "1000",
      progress: 70,
      date: "Due Date: 20/03/2024",
      icon: "phone-portrait",
      status: "Processing",
    },
  ];

  const filteredInstallments = installments.filter((item) => {
    if (activeTab === "all") return true;
    if (activeTab === "active") return item.status === "Processing";
    if (activeTab === "completed") return item.status === "Paid";
    return true;
  });

  const ProgressBar = ({ progress }) => {
    return (
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarBackground}>
          <LinearGradient
            colors={["#26589c", "#9cb2d8"]}
            style={[styles.progressBar, { width: `${progress}%` }]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        </View>
        <Text style={styles.progressText}>{progress}% Paid</Text>
      </View>
    );
  };

  const StatusBadge = ({ status }) => {
    return (
      <View
        style={[
          styles.statusBadge,
          status === "Processing" ? styles.processingBadge : styles.paidBadge,
        ]}
      >
        <Text style={styles.statusText}>{status}</Text>
      </View>
    );
  };

  const renderInstallmentCard = (item) => (
    <TouchableOpacity
      key={item.id}
      style={styles.card}
      onPress={() => navigation.navigate("SingleInstallmentScreen", { item })}
    >
      <View style={styles.cardHeader}>
        <View style={styles.productIcon}>
          <Ionicons name={item.icon} size={24} color="#fff" />
        </View>
        <View style={styles.cardTitleContainer}>
          <Text style={styles.cardTitle}>{item.productName}</Text>
          <Text style={styles.cardSubtitle}>{item.storeName}</Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor:
                item.status === "Processing" ? "#26589c" : "#4CAF50",
            },
          ]}
        >
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressText}>Payment Progress</Text>
          <Text style={styles.progressPercentage}>{item.progress}%</Text>
        </View>
        <View style={styles.progressBarContainer}>
          <LinearGradient
            colors={["#4CAF50", "#8BC34A"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.progressBar, { width: `${item.progress}%` }]}
          />
        </View>
      </View>

      <View style={styles.cardFooter}>
        <View style={styles.amountContainer}>
          <Text style={styles.amountLabel}>Remaining Amount</Text>
          <Text style={styles.amountValue}>{item.remaining} KD</Text>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.dateLabel}>Due Date</Text>
          <Text style={styles.dateValue}>{item.date}</Text>
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
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 15,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginHorizontal: 8,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  activeTab: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tabText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 16,
    fontWeight: "600",
  },
  activeTabText: {
    color: "#26589c",
  },
  headerStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
  },
  statItem: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 20,
    minWidth: 100,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  statLabel: {
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
    marginBottom: 20,
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
  processingBadge: {
    backgroundColor: "rgba(38, 88, 156, 0.1)",
  },
  paidBadge: {
    backgroundColor: "rgba(76, 175, 80, 0.1)",
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