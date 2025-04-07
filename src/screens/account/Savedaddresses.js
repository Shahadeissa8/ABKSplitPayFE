import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Platform,
  ScrollView,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";

const Savedaddresses = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [defaultAddressId, setDefaultAddressId] = useState(null);
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      title: "Address 1",
      location: "Kuwait - Kuwait city",
      details: "block 2 street 3 building 4",
    },
    {
      id: 2,
      title: "Address 2",
      location: "Kuwait - Kuwait city",
      details: "block 2 street 3 building 4",
    },
  ]);

  const [newAddress, setNewAddress] = useState({
    title: "",
    location: "",
    details: "",
  });

  // Handle new address from Addlocation screen
  useEffect(() => {
    if (route.params?.newAddress) {
      setAddresses((prevAddresses) => [
        ...prevAddresses,
        route.params.newAddress,
      ]);
      // If this is the first address, set it as default
      if (addresses.length === 0) {
        setDefaultAddressId(route.params.newAddress.id);
      }
      // Clear the params to prevent duplicate additions
      navigation.setParams({ newAddress: null });
    }
  }, [route.params?.newAddress]);

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
          text: "Set as Default",
          onPress: () => {
            setDefaultAddressId(address.id);
          },
        },
      ]
    );
  };

  const handleAddAddress = () => {
    if (!newAddress.title || !newAddress.location || !newAddress.details) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    const newAddressItem = {
      id: addresses.length + 1,
      ...newAddress,
    };

    setAddresses([...addresses, newAddressItem]);
    setNewAddress({ title: "", location: "", details: "" });
    setModalVisible(false);

    // If this is the first address, set it as default
    if (addresses.length === 0) {
      setDefaultAddressId(newAddressItem.id);
    }
  };

  const handleEditAddress = () => {
    if (!newAddress.title || !newAddress.location || !newAddress.details) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    const updatedAddresses = addresses.map((addr) =>
      addr.id === selectedAddress.id ? { ...addr, ...newAddress } : addr
    );

    setAddresses(updatedAddresses);
    setNewAddress({ title: "", location: "", details: "" });
    setModalVisible(false);
    setEditMode(false);
    setSelectedAddress(null);
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
            // If deleting default address, set new default if addresses exist
            if (
              address.id === defaultAddressId &&
              updatedAddresses.length > 0
            ) {
              setDefaultAddressId(updatedAddresses[0].id);
            } else if (updatedAddresses.length === 0) {
              setDefaultAddressId(null);
            }
          },
        },
      ]
    );
  };

  const openEditModal = (address) => {
    setSelectedAddress(address);
    setNewAddress({
      title: address.title,
      location: address.location,
      details: address.details,
    });
    setEditMode(true);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setEditMode(false);
    setSelectedAddress(null);
    setNewAddress({ title: "", location: "", details: "" });
  };

  const handleAddNewAddress = () => {
    navigation.navigate("Addlocation");
  };

  const renderAddress = (address) => (
    <TouchableOpacity
      key={address.id}
      style={[
        styles.addressCard,
        defaultAddressId === address.id && styles.defaultAddressCard,
      ]}
      activeOpacity={0.7}
    >
      <View style={styles.addressLeft}>
        <LinearGradient
          colors={["rgba(46, 49, 146, 0.1)", "rgba(27, 255, 255, 0.1)"]}
          style={styles.iconContainer}
        >
          <Ionicons name="location" size={20} color="#2E3192" />
        </LinearGradient>
        <View style={styles.addressInfo}>
          <View style={styles.titleContainer}>
            <Text style={styles.addressTitle}>{address.title}</Text>
            {defaultAddressId === address.id && (
              <View style={styles.defaultBadge}>
                <Text style={styles.defaultText}>Default</Text>
              </View>
            )}
          </View>
          <Text style={styles.addressLocation}>{address.location}</Text>
          <Text style={styles.addressDetails}>{address.details}</Text>
        </View>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity
          onPress={() => handleSetDefaultAddress(address)}
          style={styles.actionButton}
        >
          <LinearGradient
            colors={[
              defaultAddressId === address.id
                ? "rgba(46, 49, 146, 0.2)"
                : "rgba(46, 49, 146, 0.1)",
              defaultAddressId === address.id
                ? "rgba(27, 255, 255, 0.2)"
                : "rgba(27, 255, 255, 0.1)",
            ]}
            style={styles.actionButtonGradient}
          >
            <Ionicons
              name={defaultAddressId === address.id ? "star" : "star-outline"}
              size={16}
              color="#2E3192"
            />
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => openEditModal(address)}
          style={[styles.actionButton, { marginLeft: 8 }]}
        >
          <LinearGradient
            colors={["rgba(46, 49, 146, 0.1)", "rgba(27, 255, 255, 0.1)"]}
            style={styles.actionButtonGradient}
          >
            <Ionicons name="pencil" size={16} color="#2E3192" />
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDeleteAddress(address)}
          style={[styles.actionButton, { marginLeft: 8 }]}
        >
          <LinearGradient
            colors={["rgba(255, 59, 48, 0.1)", "rgba(255, 59, 48, 0.2)"]}
            style={styles.actionButtonGradient}
          >
            <Ionicons name="trash" size={16} color="#FF3B30" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2E3192" />

      {/* Header */}
      <LinearGradient colors={["#2E3192", "#1BFFFF"]} style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: "#fff" }]}>
          Saved addresses
        </Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            setEditMode(false);
            setModalVisible(true);
          }}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </LinearGradient>

      {/* Address List */}
      <ScrollView style={styles.content}>
        {addresses.map(renderAddress)}
      </ScrollView>

      {/* Add/Edit Address Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editMode ? "Edit Address" : "Add New Address"}
              </Text>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#2E3192" />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Address Title"
              value={newAddress.title}
              onChangeText={(text) =>
                setNewAddress({ ...newAddress, title: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Location"
              value={newAddress.location}
              onChangeText={(text) =>
                setNewAddress({ ...newAddress, location: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Details"
              value={newAddress.details}
              onChangeText={(text) =>
                setNewAddress({ ...newAddress, details: text })
              }
            />

            <TouchableOpacity
              style={styles.addAddressButton}
              onPress={editMode ? handleEditAddress : handleAddAddress}
            >
              <LinearGradient
                colors={["#2E3192", "#1BFFFF"]}
                style={styles.gradientButton}
              >
                <Text style={styles.buttonText}>
                  {editMode ? "Save Changes" : "Add Address"}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Savedaddresses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    height: 60,
    elevation: 5,
    shadowColor: "#2E3192",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  addButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    padding: 15,
  },
  addressCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#2E3192",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.84,
  },
  defaultAddressCard: {
    borderWidth: 1,
    borderColor: "rgba(46, 49, 146, 0.2)",
  },
  addressLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  addressInfo: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
  defaultBadge: {
    backgroundColor: "rgba(46, 49, 146, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
  },
  defaultText: {
    fontSize: 12,
    color: "#2E3192",
    fontWeight: "500",
  },
  addressLocation: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  addressDetails: {
    fontSize: 14,
    color: "#999",
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    borderRadius: 16,
    overflow: "hidden",
  },
  actionButtonGradient: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2E3192",
  },
  closeButton: {
    padding: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  addAddressButton: {
    marginTop: 10,
    overflow: "hidden",
    borderRadius: 8,
  },
  gradientButton: {
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
