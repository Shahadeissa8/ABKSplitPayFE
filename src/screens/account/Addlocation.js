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

    const { fullName, addressLine1, city, state, postalCode, country, isDefault } = addressDetails;
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

      // Call the createAddress API
      await createAddress({
        fullName,
        addressLine1,
        addressLine2: addressDetails.addressLine2 || "", // Optional field
        city,
        state,
        postalCode,
        country,
        isDefault,
      });

      Alert.alert("Success", "Address saved successfully", [
        {
          text: "OK",
          onPress: () => {
            navigation.navigate("Savedaddresses", { refresh: Date.now() }); // Pass refresh parameter
          },
        },

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

    <LinearGradient
      colors={["#26589c", "#9cb2d8"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <StatusBar barStyle="light-content" translucent={true} />
      <SafeAreaView style={styles.innerContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}
        >
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Add Location</Text>
            <View style={styles.placeholder} />
          </View>

          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            <Animated.View
              style={[
                styles.content,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
                },
              ]}
            >
              <View style={styles.imageContainer}>
                <LinearGradient
                  colors={["rgba(38, 88, 156, 0.1)", "rgba(156, 178, 216, 0.1)"]}
                  style={styles.gradientOverlay}
                >
                  <Animated.View
                    style={[
                      styles.locationIcon,
                      { transform: [{ scale: fadeAnim }] },
                    ]}
                  >
                    <Ionicons name="location" size={48} color="#26589c" />
                  </Animated.View>
                </LinearGradient>
              </View>

              <View style={styles.formContainer}>
                <Text style={styles.formTitle}>Address Details</Text>
                <Text style={styles.formSubtitle}>
                  Please fill in your address information
                </Text>

                {renderInputField("Full Name", "Enter full name", "fullName")}
                {renderInputField(
                  "Address Line 1",
                  "Enter address line 1",
                  "addressLine1"
                )}
                {renderInputField(
                  "Address Line 2",
                  "Enter address line 2 (optional)",
                  "addressLine2",
                  false
                )}
                {renderInputField("City", "Enter city", "city")}
                {renderInputField("State", "Enter state", "state")}
                {renderInputField(
                  "Postal Code",
                  "Enter postal code",
                  "postalCode"
                )}
                {renderInputField("Country", "Enter country", "country")}

                {/* Checkbox for isDefault */}
                <TouchableOpacity
                  style={styles.checkboxContainer}
                  onPress={toggleIsDefault}
                >
                  <Ionicons
                    name={
                      addressDetails.isDefault
                        ? "checkbox-outline"
                        : "square-outline"
                    }
                    size={24}
                    color="#26589c"
                    style={styles.checkboxIcon}
                  />
                  <Text style={styles.checkboxLabel}>Set as Default Address</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>

            <View style={styles.bottomContainer}>
              <TouchableOpacity
                style={[
                  styles.submitButton,
                  isSaving && styles.submitButtonDisabled,
                ]}
                onPress={handleSubmit}
                disabled={isSaving}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={["#26589c", "#9cb2d8"]}
                  style={styles.gradientButton}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Ionicons
                    name={isSaving ? "sync" : "save-outline"}
                    size={24}
                    color="#fff"
                    style={styles.buttonIcon}
                  />
                  <Text style={styles.submitButtonText}>
                    {isSaving ? "Saving..." : "Save Address"}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  innerContainer: {
    flex: 1,
  },
  keyboardAvoidingView: {
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
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
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
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,

    backgroundColor: "#f8f9fa", // Grayish background to match Savedaddresses

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

  gradientOverlay: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: width * 0.15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#26589c",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,

  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,

    borderRadius: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,

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

    borderColor: "rgba(38, 88, 156, 0.2)",
    shadowColor: "#26589c",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  input: {

    fontSize: 16,
    color: "#333",
  },

  checkboxIcon: {
    marginRight: 8,
  },
  checkboxLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#26589c",
  },
  bottomContainer: {
    paddingHorizontal: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  saveButton: {
    margin: 16,
    borderRadius: 12,
    overflow: "hidden",

    shadowColor: "#26589c",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,

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
