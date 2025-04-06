// import { StyleSheet, Text, View } from "react-native";
// import React from "react";

// const Addlocation = () => {
//   return (
//     <View>
//       <Text>Addlocation</Text>
//     </View>
//   );
// };

// export default Addlocation;

// const styles = StyleSheet.create({});
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Platform,
  Modal,
  ScrollView,
  Dimensions,
  Alert,
  Animated,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");
const ADDRESSES_STORAGE_KEY = "@saved_addresses";

const Addlocation = ({ route }) => {
  const navigation = useNavigation();
  const [zone, setZone] = useState("");
  const [area, setArea] = useState("");
  const [isZoneModalVisible, setIsZoneModalVisible] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);

  const zones = ["Salmiya", "Kuwait City", "Hawally", "Farwaniya", "Jahra"];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const saveAddress = async (newAddress) => {
    try {
      setIsSaving(true);
      // Get existing addresses
      const existingAddressesJson = await AsyncStorage.getItem(
        ADDRESSES_STORAGE_KEY
      );
      const existingAddresses = existingAddressesJson
        ? JSON.parse(existingAddressesJson)
        : [];

      // Add new address
      const updatedAddresses = [...existingAddresses, newAddress];

      // Save back to storage
      await AsyncStorage.setItem(
        ADDRESSES_STORAGE_KEY,
        JSON.stringify(updatedAddresses)
      );

      // Navigate back with the new address
      navigation.navigate("Savedaddresses", {
        newAddress,
        addresses: updatedAddresses,
      });
    } catch (error) {
      Alert.alert("Error", "Failed to save address. Please try again.", [
        { text: "OK", style: "default" },
      ]);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = async () => {
    if (!zone || !area) {
      Alert.alert(
        "Missing Information",
        "Please select your zone and enter your area details.",
        [{ text: "OK", style: "default" }]
      );
      return;
    }

    const newAddress = {
      id: Date.now().toString(),
      title: `Address ${Math.floor(Math.random() * 1000) + 1}`,
      location: zone,
      details: area,
      createdAt: new Date().toISOString(),
    };

    await saveAddress(newAddress);
  };

  const renderZoneItem = (item) => (
    <TouchableOpacity
      key={item}
      style={styles.zoneItem}
      onPress={() => {
        setZone(item);
        setIsZoneModalVisible(false);
      }}
    >
      <LinearGradient
        colors={["rgba(46, 49, 146, 0.05)", "rgba(27, 255, 255, 0.05)"]}
        style={styles.zoneItemGradient}
      >
        <Text style={styles.zoneItemText}>{item}</Text>
        <Ionicons name="chevron-forward" size={20} color="#2E3192" />
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2E3192" />

      <LinearGradient colors={["#2E3192", "#1BFFFF"]} style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Location</Text>
        <View style={styles.placeholder} />
      </LinearGradient>

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.imageContainer}>
          <LinearGradient
            colors={["rgba(46, 49, 146, 0.1)", "rgba(27, 255, 255, 0.1)"]}
            style={styles.gradientOverlay}
          >
            <Animated.View
              style={[
                styles.locationIcon,
                { transform: [{ scale: fadeAnim }] },
              ]}
            >
              <Ionicons name="location" size={48} color="#2E3192" />
            </Animated.View>
          </LinearGradient>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.locationTitle}>Select Your Address Location</Text>
          <Text style={styles.locationSubtitle}>
            Switch on your location to stay in tune with what's happening in
            your area
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Your Zone</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setIsZoneModalVisible(true)}
            >
              <Text
                style={[styles.dropdownText, !zone && styles.placeholderText]}
              >
                {zone || "Select zone"}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#2E3192" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Your Area</Text>
            <View style={styles.dropdown}>
              <TextInput
                style={styles.areaInput}
                placeholder="Type your area"
                value={area}
                onChangeText={setArea}
                placeholderTextColor="#999"
              />
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.submitButton,
              isSaving && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={isSaving}
          >
            <LinearGradient
              colors={["#2E3192", "#1BFFFF"]}
              style={styles.gradientButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.submitButtonText}>
                {isSaving ? "Saving..." : "Submit Location"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <Modal
          visible={isZoneModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setIsZoneModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <LinearGradient
                colors={["#2E3192", "#1BFFFF"]}
                style={styles.modalHeader}
              >
                <Text style={styles.modalTitle}>Select Your Zone</Text>
                <TouchableOpacity
                  onPress={() => setIsZoneModalVisible(false)}
                  style={styles.closeButton}
                >
                  <Ionicons name="close" size={24} color="#fff" />
                </TouchableOpacity>
              </LinearGradient>
              <ScrollView style={styles.zoneList}>
                {zones.map(renderZoneItem)}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </Animated.View>
    </SafeAreaView>
  );
};

export default Addlocation;

const styles = StyleSheet.create({
  // ... existing styles ...
  submitButtonDisabled: {
    opacity: 0.7,
  },
});
