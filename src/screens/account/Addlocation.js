import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { createAddress } from "../../api/profile";
import * as Location from "expo-location";
import MapView from "react-native-maps";

const AddLocation = () => {
  const navigation = useNavigation();
  const [addressDetails, setAddressDetails] = useState({
    fullName: "",
    addressLine1: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    latitude: null,
    longitude: null,
  });
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    try {
      setIsLoadingLocation(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Please allow location access to use this feature");
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setLocation(location);
      updateLocationDetails(
        location.coords.latitude,
        location.coords.longitude
      );
    } catch (error) {
      setErrorMsg("Unable to get your location. Please try again.");
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const updateLocationDetails = async (latitude, longitude) => {
    try {
      const [address] = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      if (address) {
        setAddressDetails((prev) => ({
          ...prev,
          addressLine1: address.street || "",
          city: address.city || "",
          state: address.region || "",
          postalCode: address.postalCode || "",
          country: address.country || "",
          latitude,
          longitude,
        }));
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "Could not fetch address details. Please enter manually."
      );
    }
  };

  const handleMapPress = async (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    updateLocationDetails(latitude, longitude);
  };

  const handleSubmit = async () => {
    if (
      !addressDetails.fullName ||
      !addressDetails.addressLine1 ||
      !addressDetails.city
    ) {
      Alert.alert(
        "Missing Information",
        "Please fill in at least: Full Name, Address, and City",
        [{ text: "OK" }]
      );
      return;
    }

    if (!addressDetails.latitude || !addressDetails.longitude) {
      Alert.alert("Location Required", "Please select a location on the map", [
        { text: "OK" },
      ]);
      return;
    }

    try {
      setIsSaving(true);
      await createAddress(addressDetails);
      Alert.alert("Success!", "Your address has been saved successfully", [
        { text: "Done", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert("Error", "Could not save the address. Please try again.", [
        { text: "OK" },
      ]);
    } finally {
      setIsSaving(false);
    }
  };

  const renderInput = (label, key, placeholder, isRequired = true) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>
        {label} {isRequired && <Text style={styles.required}>*</Text>}
      </Text>
      <TextInput
        style={[styles.input, addressDetails[key] ? styles.inputFilled : null]}
        value={addressDetails[key]}
        onChangeText={(text) =>
          setAddressDetails((prev) => ({ ...prev, [key]: text }))
        }
        placeholder={placeholder}
        placeholderTextColor="#999"
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#26589c", "#9cb2d8"]} style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Address</Text>
        <View style={styles.placeholder} />
      </LinearGradient>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.content} bounces={false}>
          <View style={styles.mapContainer}>
            {isLoadingLocation ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#26589c" />
                <Text style={styles.loadingText}>Getting your location...</Text>
              </View>
            ) : errorMsg ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{errorMsg}</Text>
                <TouchableOpacity
                  style={styles.retryButton}
                  onPress={getLocation}
                >
                  <Text style={styles.retryText}>Try Again</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <MapView
                  style={styles.map}
                  initialRegion={{
                    latitude: location?.coords.latitude || 24.7136,
                    longitude: location?.coords.longitude || 46.6753,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                  onPress={handleMapPress}
                  region={
                    addressDetails.latitude
                      ? {
                          latitude: addressDetails.latitude,
                          longitude: addressDetails.longitude,
                          latitudeDelta: 0.0922,
                          longitudeDelta: 0.0421,
                        }
                      : undefined
                  }
                />
                <View
                  style={[
                    styles.marker,
                    {
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      marginLeft: -10,
                      marginTop: -10,
                    },
                  ]}
                />
                <View style={styles.mapOverlay}>
                  <Text style={styles.mapText}>
                    Tap anywhere on the map to select your location
                  </Text>
                </View>
              </>
            )}
          </View>

          <View style={styles.form}>
            {renderInput("Full Name", "fullName", "Enter your full name")}
            {renderInput("Address", "addressLine1", "Enter street address")}
            {renderInput("City", "city", "Enter city name")}
            {renderInput(
              "State/Region",
              "state",
              "Enter state or region",
              false
            )}
            {renderInput(
              "Postal Code",
              "postalCode",
              "Enter postal code",
              false
            )}
            {renderInput("Country", "country", "Enter country name", false)}
          </View>
        </ScrollView>

        <TouchableOpacity
          style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}
          onPress={handleSubmit}
          disabled={isSaving}
        >
          <LinearGradient
            colors={["#26589c", "#9cb2d8"]}
            style={styles.gradientButton}
          >
            <Text style={styles.buttonText}>
              {isSaving ? "Saving..." : "Save Address"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
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
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  mapContainer: {
    height: 220,
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 20,
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    marginTop: 10,
    color: "#666",
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  retryButton: {
    marginTop: 12,
    padding: 10,
    backgroundColor: "#26589c",
    borderRadius: 8,
  },
  retryText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  map: {
    flex: 1,
  },
  mapOverlay: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  mapText: {
    fontSize: 14,
    color: "#26589c",
    fontWeight: "500",
    textAlign: "center",
  },
  marker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#26589c",
    borderWidth: 3,
    borderColor: "#fff",
  },
  errorText: {
    color: "#e74c3c",
    textAlign: "center",
    fontSize: 16,
    marginBottom: 10,
  },
  form: {
    gap: 16,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  inputContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  required: {
    color: "#e74c3c",
  },
  input: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
    color: "#333",
  },
  inputFilled: {
    backgroundColor: "#fff",
    borderColor: "#26589c",
  },
  saveButton: {
    margin: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  gradientButton: {
    padding: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  saveButtonDisabled: {
    opacity: 0.7,
  },
});

export default AddLocation;
