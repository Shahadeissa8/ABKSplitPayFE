import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
  TextInput,
  Modal,
  Animated,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { createPaymentMethod } from "../../api/profile";
import { Header } from "../../components/Header";
const { width, height } = Dimensions.get("window");

const cardTypes = [
  {
    id: "1",
    name: "Visa",
    color: "#1A1F71",
    secondaryColor: "#F7B500",
  },
  {
    id: "2",
    name: "Mastercard",
    color: "#CC0000",
    secondaryColor: "#FF9900",
  },
];

const PaymentMethods = () => {
  const navigation = useNavigation();
  const [selectedCardType, setSelectedCardType] = useState(null);
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isDefault, setIsDefault] = useState(false);
  const [showCardTypeModal, setShowCardTypeModal] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  const formatCardNumber = (text) => {
    const cleaned = text.replace(/\s/g, "");
    const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || "";
    return formatted.slice(0, 19);
  };

  const formatExpiryDate = (text) => {
    const cleaned = text.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const validateInputs = () => {
    const cleanedCardNumber = cardNumber.replace(/\s/g, "");
    if (cleanedCardNumber.length !== 16) {
      Alert.alert("Invalid Card Number", "Card number must be 16 digits.");
      return false;
    }
    if (!cardHolder.trim()) {
      Alert.alert("Missing Information", "Please enter the cardholder name.");
      return false;
    }
    if (!selectedCardType) {
      Alert.alert("Missing Information", "Please select a card type.");
      return false;
    }
    const [month, year] = expiryDate.split("/");
    if (!month || !year || month > 12 || month < 1) {
      Alert.alert(
        "Invalid Expiry Date",
        "Please enter a valid expiry date (MM/YY)."
      );
      return false;
    }
    if (cvv.length !== 3) {
      Alert.alert("Invalid CVV", "CVV must be 3 digits.");
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateInputs()) return;

    const cleanedCardNumber = cardNumber.replace(/\s/g, "");
    const [month, year] = expiryDate.split("/");
    const lastFourDigits = cleanedCardNumber.slice(-4);
    const expiryMonth = parseInt(month, 10);
    const expiryYear = parseInt(`20${year}`, 10);

    const paymentMethodData = {
      token: cardHolder, // Cardholder name
      lastFourDigits: lastFourDigits,
      cardType: selectedCardType.name,
      expiryMonth: expiryMonth,
      expiryYear: expiryYear,
      isDefault: isDefault,
    };

    try {
      await createPaymentMethod(paymentMethodData);
      Alert.alert("Success", "Payment method added successfully", [
        {
          text: "OK",
          onPress: () =>
            navigation.navigate("PaymentMethods", { refresh: Date.now() }),
        },
      ]);
    } catch (error) {
      Alert.alert("Error", "Failed to add payment method. Please try again.", [
        { text: "OK" },
      ]);
    }
  };

  const renderCardTypeOption = (cardType) => (
    <TouchableOpacity
      key={cardType.id}
      style={[
        styles.cardTypeOption,
        selectedCardType?.id === cardType.id && {
          borderColor: cardType.color,
          backgroundColor: cardType.color + "08",
        },
      ]}
      onPress={() => {
        setSelectedCardType(cardType);
        setShowCardTypeModal(false);
      }}
    >
      <LinearGradient
        colors={[cardType.color, cardType.secondaryColor]}
        style={styles.cardTypeLogo}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={[styles.cardTypeShortName, { color: "#fff" }]}>
          {cardType.name}
        </Text>
      </LinearGradient>
      <View style={styles.cardTypeInfo}>
        <Text style={styles.cardTypeOptionName}>{cardType.name}</Text>
      </View>
      {selectedCardType?.id === cardType.id && (
        <View
          style={[
            styles.checkmarkContainer,
            { backgroundColor: cardType.color },
          ]}
        >
          <Ionicons name="checkmark" size={16} color="#fff" />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    // <LinearGradient
    //   colors={["#26589c", "#26589c"]}
    //   style={styles.container}
    //   start={{ x: 0, y: 0 }}
    //   end={{ x: 1, y: 0 }}
    // >
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent={true} />
      <Header
        title="Add payment method"
        backButtonAction={() => navigation.goBack()}
      />
      <View style={styles.innerContainer}>
        {/* <View style={styles.header}>
          <View style={styles.headerContent}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Add Payment Method</Text>
            <View style={{ width: 40 }} />
          </View>
        </View> */}

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.mainContent}>
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>CHOOSE CARD TYPE</Text>
              <TouchableOpacity
                style={[
                  styles.cardTypeSelector,
                  selectedCardType && { borderColor: selectedCardType.color },
                ]}
                onPress={() => setShowCardTypeModal(true)}
              >
                <View style={styles.cardTypeSelectorContent}>
                  {selectedCardType ? (
                    <View style={styles.selectedCardTypeInfo}>
                      <LinearGradient
                        colors={[
                          selectedCardType.color,
                          selectedCardType.secondaryColor,
                        ]}
                        style={styles.selectedCardTypeLogo}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                      >
                        <Text
                          style={[styles.cardTypeShortName, { color: "#fff" }]}
                        >
                          {selectedCardType.name}
                        </Text>
                      </LinearGradient>
                      <Text style={styles.selectedCardTypeName}>
                        {selectedCardType.name}
                      </Text>
                    </View>
                  ) : (
                    <Text style={styles.cardTypeSelectorLabel}>
                      Choose card type
                    </Text>
                  )}
                  <Ionicons
                    name="chevron-down"
                    size={24}
                    color={selectedCardType?.color || "#26589c"}
                  />
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionLabel}>CARD DETAILS</Text>
              <View style={styles.cardForm}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Card Number</Text>
                  <View
                    style={[
                      styles.inputContainer,
                      focusedInput === "cardNumber" &&
                        styles.inputContainerFocused,
                      focusedInput === "cardNumber" &&
                        selectedCardType && {
                          borderColor: selectedCardType.color,
                        },
                    ]}
                  >
                    <Ionicons
                      name="card-outline"
                      size={20}
                      color="#666"
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChangeText={(text) =>
                        setCardNumber(formatCardNumber(text))
                      }
                      keyboardType="numeric"
                      maxLength={19}
                      onFocus={() => setFocusedInput("cardNumber")}
                      onBlur={() => setFocusedInput(null)}
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Cardholder Name</Text>
                  <View
                    style={[
                      styles.inputContainer,
                      focusedInput === "cardHolder" &&
                        styles.inputContainerFocused,
                      focusedInput === "cardHolder" &&
                        selectedCardType && {
                          borderColor: selectedCardType.color,
                        },
                    ]}
                  >
                    <Ionicons
                      name="person-outline"
                      size={20}
                      color="#666"
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Name"
                      value={cardHolder}
                      onChangeText={setCardHolder}
                      autoCapitalize="characters"
                      onFocus={() => setFocusedInput("cardHolder")}
                      onBlur={() => setFocusedInput(null)}
                    />
                  </View>
                </View>

                <View style={styles.row}>
                  <View
                    style={[styles.inputGroup, { flex: 1, marginRight: 12 }]}
                  >
                    <Text style={styles.label}>Expiry Date</Text>
                    <View
                      style={[
                        styles.inputContainer,
                        focusedInput === "expiryDate" &&
                          styles.inputContainerFocused,
                        focusedInput === "expiryDate" &&
                          selectedCardType && {
                            borderColor: selectedCardType.color,
                          },
                      ]}
                    >
                      <Ionicons
                        name="calendar-outline"
                        size={20}
                        color="#666"
                        style={styles.inputIcon}
                      />
                      <TextInput
                        style={styles.input}
                        placeholder="MM/YY"
                        value={expiryDate}
                        onChangeText={(text) =>
                          setExpiryDate(formatExpiryDate(text))
                        }
                        keyboardType="numeric"
                        maxLength={5}
                        onFocus={() => setFocusedInput("expiryDate")}
                        onBlur={() => setFocusedInput(null)}
                      />
                    </View>
                  </View>
                  <View style={[styles.inputGroup, { flex: 1 }]}>
                    <Text style={styles.label}>CVV</Text>
                    <View
                      style={[
                        styles.inputContainer,
                        focusedInput === "cvv" && styles.inputContainerFocused,
                        focusedInput === "cvv" &&
                          selectedCardType && {
                            borderColor: selectedCardType.color,
                          },
                      ]}
                    >
                      <Ionicons
                        name="lock-closed-outline"
                        size={20}
                        color="#666"
                        style={styles.inputIcon}
                      />
                      <TextInput
                        style={styles.input}
                        placeholder="123"
                        value={cvv}
                        onChangeText={setCvv}
                        keyboardType="numeric"
                        maxLength={3}
                        secureTextEntry
                        onFocus={() => setFocusedInput("cvv")}
                        onBlur={() => setFocusedInput(null)}
                      />
                    </View>
                  </View>
                </View>

                {/* Checkbox for isDefault */}
                <TouchableOpacity
                  style={styles.checkboxContainer}
                  onPress={() => setIsDefault(!isDefault)}
                >
                  <Ionicons
                    name={isDefault ? "checkbox-outline" : "square-outline"}
                    size={24}
                    color="#26589c"
                    style={styles.checkboxIcon}
                  />
                  <Text style={styles.checkboxLabel}>
                    Set as Default Payment Method
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.saveButton,
              { backgroundColor: selectedCardType?.color || "#26589c" },
            ]}
            onPress={handleSave}
          >
            <LinearGradient
              colors={[
                selectedCardType?.color || "#26589c",
                (selectedCardType?.color || "#26589c") + "CC",
              ]}
              style={styles.saveButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.saveButtonText}>Save Card</Text>
              <View style={styles.saveButtonIcon}>
                <Ionicons name="arrow-forward" size={20} color="#fff" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>

        <Modal
          visible={showCardTypeModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowCardTypeModal(false)}
        >
          <BlurView intensity={20} style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Card Type</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setShowCardTypeModal(false)}
                >
                  <Ionicons name="close" size={24} color="#666" />
                </TouchableOpacity>
              </View>
              <ScrollView
                style={styles.cardTypeList}
                showsVerticalScrollIndicator={false}
              >
                {cardTypes.map(renderCardTypeOption)}
              </ScrollView>
            </View>
          </BlurView>
        </Modal>
      </View>
    </View>
    //  </LinearGradient>
  );
};

export default PaymentMethods;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
  },
  header: {
    paddingBottom: 16,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  content: {
    flex: 1,
    backgroundColor: "#f8f9fa", // Preserve the grayish background
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  mainContent: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#666",
    marginBottom: 12,
    letterSpacing: 1,
  },
  cardTypeSelector: {
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(38,88,156,0.1)",
    overflow: "hidden",
  },
  cardTypeSelectorContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  selectedCardTypeInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectedCardTypeLogo: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedCardTypeName: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  cardTypeSelectorLabel: {
    fontSize: 16,
    color: "#666",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 24,
    width: width * 0.9,
    maxHeight: height * 0.7,
    overflow: "hidden",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#26589c",
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.05)",
    justifyContent: "center",
    alignItems: "center",
  },
  cardTypeList: {
    padding: 16,
  },
  cardTypeOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    marginBottom: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
  cardTypeLogo: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTypeInfo: {
    flex: 1,
  },
  cardTypeShortName: {
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
  },
  cardTypeOptionName: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
    marginBottom: 4,
  },
  checkmarkContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },
  cardForm: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 13,
    color: "#666",
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(38,88,156,0.1)",
    borderRadius: 12,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  inputContainerFocused: {
    borderWidth: 2,
    borderColor: "#26589c",
  },
  inputIcon: {
    padding: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#26589c",
    paddingVertical: 12,
    paddingRight: 12,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  checkboxIcon: {
    marginRight: 8,
  },
  checkboxLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#26589c",
  },
  saveButton: {
    marginTop: 24,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#26589c",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  saveButtonGradient: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  saveButtonIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
});
