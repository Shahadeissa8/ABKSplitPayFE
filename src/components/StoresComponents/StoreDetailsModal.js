import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
  Dimensions,
  Platform,
} from "react-native";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const StoreDetailsModal = ({ isVisible, storeDetails, onClose }) => {
  const openWebsite = async (url) => {
    if (!url || typeof url !== "string") {
      Alert.alert("Error", "Invalid website URL");
      return;
    }

    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Error", "Cannot open this website URL");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to open website");
    }
  };

  if (!storeDetails) return null;

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      style={styles.modal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.5}
    >
      <View style={styles.modalContent}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Ionicons name="close" size={24} color="#26589c" />
        </TouchableOpacity>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: storeDetails.logoUrl }}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.storeName}>{storeDetails.name}</Text>
        <Text style={styles.description}>{storeDetails.description}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => openWebsite(storeDetails.websiteUrl)}
        >
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>Visit Website</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default StoreDetailsModal;

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: height * 0.55,
    alignItems: "center",
    position: "relative", 
  },
  closeButton: {
    position: "absolute",
    top: 15,
    right: 15,
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 20,
  },
  imageContainer: {
    width: 300,
    height: 200,
    marginTop: 30,
    marginBottom: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  storeName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#26589c",
    marginTop: 15,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    position: "absolute",
    bottom: 40, // Position at bottom of modal
    borderRadius: 12,
    overflow: "hidden",
    width: width * 0.8, // Increased width
    ...Platform.select({
      ios: {
        shadowColor: "#26589c",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  buttonContent: {
    backgroundColor: "#26589c",
    paddingVertical: 16, 
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18, 
    fontWeight: "600",
  },
});