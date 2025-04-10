import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
  Dimensions,
  TextInput,
  Modal,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { BlurView } from "expo-blur";

const { width, height } = Dimensions.get("window");

const banks = [
  {
    id: "1",
    name: "Al Ahli Bank of Kuwait",
    shortName: "ABK",
    color: "#F7B500",
    secondaryColor: "#003B7B",
  },
  {
    id: "2",
    name: "Kuwait Finance House",
    shortName: "KFH",
    color: "#2B8F4C",
    secondaryColor: "#1D5F33",
  },
  {
    id: "3",
    name: "National Bank of Kuwait",
    shortName: "NBK",
    color: "#003D7D",
    secondaryColor: "#E31B23",
  },
  {
    id: "4",
    name: "Gulf Bank",
    shortName: "GB",
    color: "#E31837",
    secondaryColor: "#BE0D2E",
  },
  {
    id: "5",
    name: "Burgan Bank",
    shortName: "BB",
    color: "#0066B3",
    secondaryColor: "#FF6B00",
  },
  {
    id: "6",
    name: "Boubyan Bank",
    shortName: "BOUB",
    color: "#E31B23",
    secondaryColor: "#BA0C1C",
  },
];

const PaymentMethods = () => {
  const navigation = useNavigation();
  const [selectedBank, setSelectedBank] = useState(null);
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [showBankModal, setShowBankModal] = useState(false);
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

  const handleSave = () => {
    navigation.goBack();
  };

  const renderBankOption = (bank) => (
    <TouchableOpacity
      key={bank.id}
      style={[
        styles.bankOption,
        selectedBank?.id === bank.id && {
          borderColor: bank.color,
          backgroundColor: bank.color + "08",
        },
      ]}
      onPress={() => {
        setSelectedBank(bank);
        setShowBankModal(false);
      }}
    >
      <LinearGradient
        colors={[bank.color, bank.secondaryColor]}
        style={styles.bankLogo}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={[styles.bankShortName, { color: "#fff" }]}>
          {bank.shortName}
        </Text>
      </LinearGradient>
      <View style={styles.bankInfo}>
        <Text style={styles.bankOptionName}>{bank.name}</Text>
        <Text style={[styles.bankType, { color: bank.color }]}>
          Debit/Credit Card
        </Text>
      </View>
      {selectedBank?.id === bank.id && (
        <View
          style={[styles.checkmarkContainer, { backgroundColor: bank.color }]}
        >
          <Ionicons name="checkmark" size={16} color="#fff" />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#26589c" />
      <LinearGradient
        colors={["#26589c", "#26589c"]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
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
      </LinearGradient>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.mainContent}>
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>SELECT BANK</Text>
            <TouchableOpacity
              style={[
                styles.bankSelector,
                selectedBank && { borderColor: selectedBank.color },
              ]}
              onPress={() => setShowBankModal(true)}
            >
              <View style={styles.bankSelectorContent}>
                {selectedBank ? (
                  <View style={styles.selectedBankInfo}>
                    <LinearGradient
                      colors={[selectedBank.color, selectedBank.secondaryColor]}
                      style={styles.selectedBankLogo}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      <Text style={[styles.bankShortName, { color: "#fff" }]}>
                        {selectedBank.shortName}
                      </Text>
                    </LinearGradient>
                    <Text style={styles.selectedBankName}>
                      {selectedBank.name}
                    </Text>
                  </View>
                ) : (
                  <Text style={styles.bankSelectorLabel}>Choose your bank</Text>
                )}
                <Ionicons
                  name="chevron-down"
                  size={24}
                  color={selectedBank?.color || "#26589c"}
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
                      selectedBank && { borderColor: selectedBank.color },
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
                <Text style={styles.label}>Card Holder Name</Text>
                <View
                  style={[
                    styles.inputContainer,
                    focusedInput === "cardHolder" &&
                      styles.inputContainerFocused,
                    focusedInput === "cardHolder" &&
                      selectedBank && { borderColor: selectedBank.color },
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
                    placeholder="JOHN DOE"
                    value={cardHolder}
                    onChangeText={setCardHolder}
                    autoCapitalize="characters"
                    onFocus={() => setFocusedInput("cardHolder")}
                    onBlur={() => setFocusedInput(null)}
                  />
                </View>
              </View>

              <View style={styles.row}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 12 }]}>
                  <Text style={styles.label}>Expiry Date</Text>
                  <View
                    style={[
                      styles.inputContainer,
                      focusedInput === "expiryDate" &&
                        styles.inputContainerFocused,
                      focusedInput === "expiryDate" &&
                        selectedBank && { borderColor: selectedBank.color },
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
                        selectedBank && { borderColor: selectedBank.color },
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
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.saveButton,
            { backgroundColor: selectedBank?.color || "#26589c" },
          ]}
          onPress={handleSave}
        >
          <LinearGradient
            colors={[
              selectedBank?.color || "#26589c",
              (selectedBank?.color || "#26589c") + "CC",
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
        visible={showBankModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowBankModal(false)}
      >
        <BlurView intensity={20} style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Your Bank</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowBankModal(false)}
              >
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            <ScrollView
              style={styles.bankList}
              showsVerticalScrollIndicator={false}
            >
              {banks.map(renderBankOption)}
            </ScrollView>
          </View>
        </BlurView>
      </Modal>
    </SafeAreaView>
  );
};

export default PaymentMethods;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 16 : 16,
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
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  mainContent: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 4,
      },
    }),
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
  bankSelector: {
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(38,88,156,0.1)",
    overflow: "hidden",
  },
  bankSelectorContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  selectedBankInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectedBankLogo: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  selectedBankName: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  bankSelectorLabel: {
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
  bankList: {
    padding: 16,
  },
  bankOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    marginBottom: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
  bankLogo: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  bankInfo: {
    flex: 1,
  },
  bankShortName: {
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
  },
  bankOptionName: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
    marginBottom: 4,
  },
  bankType: {
    fontSize: 13,
    fontWeight: "500",
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
  saveButton: {
    marginTop: 24,
    borderRadius: 16,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#26589c",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
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
