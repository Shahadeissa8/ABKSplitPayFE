import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { getSavedAddresses } from "../../api/profile";
import { deleteAddress } from "../../api/profile";

const Savedaddresses = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState([]);
  const [defaultAddressId, setDefaultAddressId] = useState(null);

  useEffect(() => {
    loadSavedAddresses();
  }, [route.params?.refresh]);

  const loadSavedAddresses = async () => {
    try {
      const savedAddresses = await getSavedAddresses();
      setAddresses(savedAddresses);
      // Set default address
      const defaultAddress = savedAddresses.find((addr) => addr.isDefault);
      if (defaultAddress) {
        setDefaultAddressId(defaultAddress.id);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to load addresses. Please try again.", [
        { text: "OK" },
      ]);
    }
  };

  const handleSetDefaultAddress = (address) => {
    Alert.alert(
      "Set Default Address",
      "Do you want to set this as your default address?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Set Default",
          onPress: async () => {
            try {
              // TODO: Make API call to update the default address
              // For example: await updateDefaultAddress(address.id);
              const updatedAddresses = addresses.map((addr) => ({
                ...addr,
                isDefault: addr.id === address.id,
              }));
              setAddresses(updatedAddresses);
              setDefaultAddressId(address.id);
            } catch (error) {
              Alert.alert(
                "Error",
                "Failed to set default address. Please try again.",
                [{ text: "OK" }]
              );
            }
          },
        },
      ]
    );
  };

  const handleDeleteAddress = (address) => {
    if (!address || !address.addressId) {
      console.error("Invalid address object:", address); // Log if address or addressId is missing
      Alert.alert("Error", "Invalid address. Please try again.");
      return;
    }

    Alert.alert(
      "Delete Address",
      "Are you sure you want to delete this address?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              console.log("Deleting address with ID:", address.addressId); // Log the addressId
              await deleteAddress(address.addressId); // Call the deleteAddress API with addressId

              // Remove the address from the local state
              const updatedAddresses = addresses.filter(
                (addr) => addr.addressId !== address.addressId
              );
              setAddresses(updatedAddresses);

              Alert.alert("Success", "Address deleted successfully.", [
                { text: "OK" },
              ]);
            } catch (error) {
              console.error("Error deleting address:", error.message);
              Alert.alert(
                "Error",
                error.message || "Failed to delete address. Please try again.",
                [{ text: "OK" }]
              );
            }
          },
        },
      ]
    );
  };

  return (
    <LinearGradient
      colors={["#26589c", "#9cb2d8"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <StatusBar barStyle="light-content" translucent={true} />
      <SafeAreaView style={styles.innerContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Saved Addresses</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate("Addlocation")} // Navigate to AddAddress screen
          >
            <Ionicons name="add" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

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
                        <Ionicons
                          name="star-outline"
                          size={20}
                          color="#26589c"
                        />
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity
                      onPress={() => handleDeleteAddress(address)}
                      style={[styles.actionButton, styles.deleteButton]}
                    >
                      <Ionicons
                        name="trash-outline"
                        size={20}
                        color="#ff4444"
                      />
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
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    backgroundColor: "#f8f9fa", // Keep the grayish background
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
    textAlign: "right",
  },
});

export default Savedaddresses;