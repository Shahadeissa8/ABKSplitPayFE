import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Modal,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { getSavedAddresses } from "../../api/profile";
import { deleteAddress } from "../../api/profile";
import { actionIcons, Header } from "../../components/Header";

const Savedaddresses = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState([]);
  const [defaultAddressId, setDefaultAddressId] = useState(null);
  const [feedbackModalVisible, setFeedbackModalVisible] = useState(false); // New state for feedback modal
  const [feedbackModalContent, setFeedbackModalContent] = useState({
    title: "",
    message: "",
    icon: "checkmark-circle",
    iconColor: "#4CAF50",
    buttons: [{ text: "OK", onPress: () => setFeedbackModalVisible(false) }],
  });

  useEffect(() => {
    loadSavedAddresses();
  }, [route.params?.refresh]);

  const loadSavedAddresses = async () => {
    try {
      const savedAddresses = await getSavedAddresses();
      setAddresses(savedAddresses);

      const defaultAddress = savedAddresses.find((addr) => addr.isDefault);
      if (defaultAddress) {
        setDefaultAddressId(defaultAddress.id);
      }
    } catch (error) {
      setFeedbackModalContent({
        title: "Error",
        message: "Failed to load addresses. Please try again.",
        icon: "alert-circle-outline",
        iconColor: "#FF4444",
        buttons: [{ text: "OK", onPress: () => setFeedbackModalVisible(false) }],
      });
      setFeedbackModalVisible(true);
    }
  };

  const handleSetDefaultAddress = (address) => {
    setFeedbackModalContent({
      title: "Set Default Address",
      message: "Do you want to set this as your default address?",
      icon: "alert-circle-outline",
      iconColor: "#26589c",
      buttons: [
        { text: "Cancel", onPress: () => setFeedbackModalVisible(false) },
        {
          text: "Set Default",
          onPress: async () => {
            try {
              const updatedAddresses = addresses.map((addr) => ({
                ...addr,
                isDefault: addr.id === address.id,
              }));
              setAddresses(updatedAddresses);
              setDefaultAddressId(address.id);
              setFeedbackModalContent({
                title: "Success",
                message: "Default address updated successfully.",
                icon: "checkmark-circle",
                iconColor: "#4CAF50",
                buttons: [{ text: "OK", onPress: () => setFeedbackModalVisible(false) }],
              });
            } catch (error) {
              setFeedbackModalContent({
                title: "Error",
                message: "Failed to set default address. Please try again.",
                icon: "alert-circle-outline",
                iconColor: "#FF4444",
                buttons: [{ text: "OK", onPress: () => setFeedbackModalVisible(false) }],
              });
            }
          },
        },
      ],
    });
    setFeedbackModalVisible(true);
  };

  const handleDeleteAddress = (address) => {
    if (!address || !address.addressId) {
      setFeedbackModalContent({
        title: "Error",
        message: "Invalid address. Please try again.",
        icon: "alert-circle-outline",
        iconColor: "#FF4444",
        buttons: [{ text: "OK", onPress: () => setFeedbackModalVisible(false) }],
      });
      setFeedbackModalVisible(true);
      return;
    }

    setFeedbackModalContent({
      title: "Delete Address",
      message: "Are you sure you want to delete this address?",
      icon: "alert-circle-outline",
      iconColor: "#26589c",
      buttons: [
        { text: "Cancel", onPress: () => setFeedbackModalVisible(false) },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteAddress(address.addressId);
              const updatedAddresses = addresses.filter(
                (addr) => addr.addressId !== address.addressId
              );
              setAddresses(updatedAddresses);
              setFeedbackModalContent({
                title: "Success",
                message: "Address deleted successfully.",
                icon: "checkmark-circle",
                iconColor: "#4CAF50",
                buttons: [{ text: "OK", onPress: () => setFeedbackModalVisible(false) }],
              });
            } catch (error) {
              setFeedbackModalContent({
                title: "Error",
                message: error.message || "Failed to delete address. Please try again.",
                icon: "alert-circle-outline",
                iconColor: "#FF4444",
                buttons: [{ text: "OK", onPress: () => setFeedbackModalVisible(false) }],
              });
            }
            setFeedbackModalVisible(true);
          },
        },
      ],
    });
    setFeedbackModalVisible(true);
  };

  const renderFeedbackModal = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={feedbackModalVisible}
      onRequestClose={() => setFeedbackModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Ionicons
            name={feedbackModalContent.icon}
            size={48}
            color={feedbackModalContent.iconColor}
            style={styles.feedbackIcon}
          />
          <Text style={styles.modalTitle}>{feedbackModalContent.title}</Text>
          <Text style={styles.modalMessage}>{feedbackModalContent.message}</Text>
          <View style={styles.feedbackButtons}>
            {feedbackModalContent.buttons.map((button, index) => (
              <TouchableOpacity
                key={index}
                style={styles.closeButton}
                onPress={button.onPress}
              >
                <Text
                  style={[
                    styles.closeButtonText,
                    button.style === "destructive" && styles.destructiveButtonText,
                  ]}
                >
                  {button.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.innerContainer}>
      <StatusBar barStyle="light-content" translucent={true} />
      <Header
        title="Saved addresses"
        backButtonAction={() => navigation.goBack()}
        action={() => navigation.navigate("Addlocation")}
        actionIconName={actionIcons.addButton}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {addresses.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="location-outline" size={64} color="#26589c" />
            <Text style={styles.emptyText}>No Saved Addresses</Text>
            <Text style={styles.emptySubtext}>
              Press + to add a new address
            </Text>
          </View>
        ) : (
          addresses.map((address) => (
            <View key={address.id} style={styles.addressCard}>
              <View style={styles.addressHeader}>
                <View style={styles.addressTitleContainer}>
                  <Ionicons name="location" size={24} color="#26589c" />
                  <Text style={styles.addressTitle}>
                    {address.fullName}'s Address
                  </Text>
                  {address.isDefault && (
                    <View style={styles.defaultBadge}>
                      <Text style={styles.defaultText}>Default</Text>
                    </View>
                  )}
                </View>
                <View style={styles.actionButtons}>
                  {!address.isDefault && (
                    <TouchableOpacity
                      onPress={() => handleSetDefaultAddress(address)}
                      style={styles.actionButton}
                    >
                      <Ionicons name="star-outline" size={20} color="#26589c" />
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    onPress={() => handleDeleteAddress(address)}
                    style={[styles.actionButton, styles.deleteButton]}
                  >
                    <Ionicons name="trash-outline" size={20} color="#ff4444" />
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={[styles.addressDetails, { textAlign: "left" }]}>
                {`${address.addressLine1}${
                  address.addressLine2 ? `, ${address.addressLine2}` : ""
                }, ${address.city}, ${address.state}, ${address.postalCode}, ${
                  address.country
                }`}
              </Text>
            </View>
          ))
        )}
      </ScrollView>

      {renderFeedbackModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innerContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#26589c",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  backButton: {
    padding: 8,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
  },
  addButton: {
    padding: 8,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 12,
  },
  content: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
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
    color: "#666",
    marginTop: 8,
  },
  addressCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  addressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  addressTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#26589c",
    marginLeft: 8,
    marginRight: 8,
  },
  defaultBadge: {
    backgroundColor: "rgba(38, 88, 156, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  defaultText: {
    fontSize: 12,
    color: "#26589c",
    fontWeight: "500",
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
    backgroundColor: "rgba(38, 88, 156, 0.1)",
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: "rgba(255, 68, 68, 0.1)",
  },
  addressDetails: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    textAlign: "left",
  },
  // New styles for feedback modal
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 20,
  },
  modalMessage: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  feedbackIcon: {
    marginBottom: 15,
  },
  feedbackButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  closeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#26589c",
    borderRadius: 10,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  destructiveButtonText: {
    color: "#ff4444",
  },
});

export default Savedaddresses;