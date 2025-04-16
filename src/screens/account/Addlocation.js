import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Platform,
  ScrollView,
  Dimensions,
  Alert,
  Animated,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { createAddress } from "../../api/profile";

const { width, height } = Dimensions.get("window");

const AddLocation = () => {
  const navigation = useNavigation();
  const [addressDetails, setAddressDetails] = useState({
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    isDefault: false, // Added isDefault to state
  });
  const [isSaving, setIsSaving] = useState(false);
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);
  const scaleAnim = new Animated.Value(0.95);

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
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleSubmit = async () => {
    const { fullName, addressLine1, city, state, postalCode, country, isDefault } = addressDetails;
  
    // Validate required fields
    if (
      !fullName.trim() ||
      !addressLine1.trim() ||
      !city.trim() ||
      !state.trim() ||
      !postalCode.trim() ||
      !country.trim()
    ) {
      Alert.alert("Missing Information", "Please fill in all required address fields", [{ text: "OK" }]);
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
      Alert.alert("Error", "Failed to save address. Please try again.", [{ text: "OK" }]);
    } finally {
      setIsSaving(false);
    }
  };

  const renderInputField = (label, placeholder, key, required = true) => (
    <View style={styles.inputField}>
      <Text style={styles.inputLabel}>
        {label} {required && <Text style={styles.requiredStar}>*</Text>}
      </Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={addressDetails[key]}
          onChangeText={(text) =>
            setAddressDetails((prev) => ({ ...prev, [key]: text }))
          }
          placeholderTextColor="#999"
        />
      </View>
    </View>
  );

  const toggleIsDefault = () => {
    setAddressDetails((prev) => ({ ...prev, isDefault: !prev.isDefault }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
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
          <Text style={styles.headerTitle}>Add Location</Text>
          <View style={styles.placeholder} />
        </LinearGradient>

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
  );
};

export default AddLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    letterSpacing: 0.5,
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 20,
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
    elevation: 8,
  },
  locationIcon: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: 20,
    borderRadius: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  formContainer: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#26589c",
    textAlign: "center",
    marginBottom: 8,
  },
  formSubtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
  },
  inputField: {
    width: "100%",
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#26589c",
    marginBottom: 8,
    paddingLeft: 4,
  },
  requiredStar: {
    color: "#ff4444",
  },
  inputWrapper: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(38, 88, 156, 0.2)",
    shadowColor: "#26589c",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    fontSize: 16,
    color: "#26589c",
    padding: 12,
    textAlign: "left",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 16,
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
    elevation: 16,
  },
  submitButton: {
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#26589c",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  gradientButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
  },
  buttonIcon: {
    marginRight: 8,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 0.5,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
});