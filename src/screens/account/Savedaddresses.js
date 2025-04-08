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
  Platform,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const ADDRESSES_STORAGE_KEY = "@saved_addresses";

const Savedaddresses = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState([]);
  const [defaultAddressId, setDefaultAddressId] = useState(null);

  useEffect(() => {
    loadSavedAddresses();
  }, [route.params?.refresh]); // Reload when refresh parameter changes

  const loadSavedAddresses = async () => {
    try {
      const savedAddressesJson = await AsyncStorage.getItem(
        ADDRESSES_STORAGE_KEY
      );
      if (savedAddressesJson) {
        const savedAddresses = JSON.parse(savedAddressesJson);
        setAddresses(savedAddresses);
        // Set default address
        const defaultAddress = savedAddresses.find((addr) => addr.isDefault);
        if (defaultAddress) {
          setDefaultAddressId(defaultAddress.id);
        }
      }
    } catch (error) {
      console.error("Error loading addresses:", error);
    }
  };

  const saveAddresses = async (updatedAddresses) => {
    try {
      await AsyncStorage.setItem(
        ADDRESSES_STORAGE_KEY,
        JSON.stringify(updatedAddresses)
      );
    } catch (error) {
      console.error("Error saving addresses:", error);
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
          onPress: () => {
            const updatedAddresses = addresses.map((addr) => ({
              ...addr,
              isDefault: addr.id === address.id,
            }));
            setAddresses(updatedAddresses);
            setDefaultAddressId(address.id);
            saveAddresses(updatedAddresses);
          },
        },
      ]
    );
  };

  const handleDeleteAddress = (address) => {
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
          onPress: () => {
            const updatedAddresses = addresses.filter(
              (addr) => addr.id !== address.id
            );
            setAddresses(updatedAddresses);
            if (
              address.id === defaultAddressId &&
              updatedAddresses.length > 0
            ) {
              const newDefault = updatedAddresses[0];
              newDefault.isDefault = true;
              setDefaultAddressId(newDefault.id);
            }
            saveAddresses(updatedAddresses);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#26589c" />

      <LinearGradient
        colors={["#26589c", "#9cb2d8"]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Saved Addresses</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("Addlocation")}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </LinearGradient>

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
                  <Text style={styles.addressTitle}>{address.title}</Text>
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
                {address.details}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 16 : 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#26589c",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
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
    elevation: 3,
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
