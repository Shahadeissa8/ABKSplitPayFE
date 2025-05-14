import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Modal,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { getPaymentMethods, deletePaymentMethod } from "../../api/profile";
import { actionIcons, Header } from "../../components/Header";
import { Dimensions } from "react-native";
import { BlurView } from "expo-blur";


const cardTypeColors = {
  Visa: { color: "#1A1F71", secondaryColor: "#F7B500" },
  Mastercard: { color: "#CC0000", secondaryColor: "#FF9900" },
};

const Payment = ({ navigation, route }) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [feedbackModalVisible, setFeedbackModalVisible] = useState(false); // New state for feedback modal
  const [feedbackModalContent, setFeedbackModalContent] = useState({
    title: "",
    message: "",
    icon: "checkmark-circle",
    iconColor: "#4CAF50",
    buttons: [{ text: "OK", onPress: () => setFeedbackModalVisible(false) }],
  });

  useEffect(() => {
    loadPaymentMethods();
  }, [route.params?.refresh]);
  const loadPaymentMethods = async () => {
    try {
      const paymentMethods = await getPaymentMethods();
      setCards(paymentMethods);
    } catch (error) {
      setFeedbackModalContent({
        title: "Error",
        message: "Failed to load payment methods. Please try again.",
        icon: "alert-circle-outline",
        iconColor: "#FF4444",
        buttons: [{ text: "OK", onPress: () => setFeedbackModalVisible(false) }],
      });
      setFeedbackModalVisible(true);
    }
  };

  const handleDeleteCard = async (cardId) => {
    setFeedbackModalContent({
      title: "Delete Card",
      message: "Are you sure you want to delete this card?",
      icon: "alert-circle-outline",
      iconColor: "#26589c",
      buttons: [
        { text: "Cancel", onPress: () => setFeedbackModalVisible(false) },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deletePaymentMethod(cardId);
              const updatedCards = cards.filter(
                (card) => card.paymentMethodId !== cardId
              );
              setCards(updatedCards);
              if (selectedCard?.paymentMethodId === cardId) {
                setSelectedCard(null);
              }
              setFeedbackModalContent({
                title: "Success",
                message: "Card deleted successfully",
                icon: "checkmark-circle",
                iconColor: "#4CAF50",
                buttons: [{ text: "OK", onPress: () => setFeedbackModalVisible(false) }],
              });
            } catch (error) {
              setFeedbackModalContent({
                title: "Error",
                message: "Failed to delete card. Please try again.",
                icon: "alert-circle-outline",
                iconColor: "#FF4444",
                buttons: [{ text: "OK", onPress: () => setFeedbackModalVisible(false) }],
            });
            }
            setFeedbackModalVisible(true);
          },
        },
      ],
    });
    setFeedbackModalVisible(true);
  };

  const renderCard = (card) => {
    const colors = cardTypeColors[card.cardType] || {
      color: "#26589c",
      secondaryColor: "#9cb2d8",
    };

    const cardTypeImages = {
      Visa: require("../../../assets/Visa.png"),
      Mastercard: require("../../../assets/Mastercard-logo.png"),
    };

    return (
      <TouchableOpacity
        key={card.paymentMethodId}
        style={styles.cardContainer}
      >
        <LinearGradient
          colors={[colors.color, colors.secondaryColor]}
          style={styles.cardGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.cardActions}>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={(e) => {
                e.stopPropagation();
                handleDeleteCard(card.paymentMethodId);
              }}
            >
              <Ionicons name="trash-outline" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.cardHeader}>
            <Text style={styles.cardHolder}>{card.token}</Text>
            <Image
              source={cardTypeImages[card.cardType]}
              style={styles.cardTypeImage}
              resizeMode="contain"
            />
          </View>
          <View style={styles.cardNumber}>
            <Text style={styles.cardNumberText}>
              •••• •••• •••• {card.lastFourDigits}
            </Text>
          </View>
          <View style={styles.cardFooter}>
            <Text style={styles.expiryLabel}>Expires</Text>
            <Text style={styles.expiryDate}>
              {card.expiryMonth}/{card.expiryYear.toString().slice(-2)}
            </Text>
          </View>

          {card.isDefault && (
            <View style={styles.defaultBadge}>
              <Text style={styles.defaultBadgeText}>Default</Text>
            </View>
          )}

          {selectedCard?.paymentMethodId === card.paymentMethodId && (
            <View style={styles.selectedCheckmark}>
              <Ionicons name="checkmark-circle" size={24} color="#fff" />
            </View>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const renderFeedbackModal = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={feedbackModalVisible}
      onRequestClose={() => setFeedbackModalVisible(false)}
    >
      <BlurView intensity={20} style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{feedbackModalContent.title}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setFeedbackModalVisible(false)}
            >
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>
          <View style={styles.feedbackContent}>
            <Ionicons
              name={feedbackModalContent.icon}
              size={48}
              color={feedbackModalContent.iconColor}
              style={styles.feedbackIcon}
            />
            <Text style={styles.modalMessage}>{feedbackModalContent.message}</Text>
            <View style={styles.feedbackButtons}>
              {feedbackModalContent.buttons.map((button, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.feedbackButton,
                    button.style === "destructive" && { backgroundColor: "#FF4444" },
                  ]}
                  onPress={button.onPress}
                >
                  <Text
                    style={[
                      styles.feedbackButtonText,
                      button.style === "destructive" && { color: "#fff" },
                    ]}
                  >
                    {button.text}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </BlurView>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent={true} />

      <Header
        title="Payment methods"
        backButtonAction={() => navigation.goBack()}
        action={() => navigation.navigate("Payment")}
        actionIconName={actionIcons.addButton}
      />

      <View style={styles.content}>
        {cards.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="card-outline" size={64} color="#26589c" />
            <Text style={styles.emptyText}>No Saved Cards</Text>
            <Text style={styles.emptySubtext}>
              Press + to add a new payment method
            </Text>
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.cardsContainer}
          >
            {cards.map(renderCard)}
          </ScrollView>
        )}
      </View>

      {renderFeedbackModal()}
    </View>
  );
};

export default Payment;

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
    padding: 16,
    backgroundColor: "#fff",
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
  cardsContainer: {
    gap: 16,
    paddingBottom: 16,
  },
  cardContainer: {
    height: 180,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  cardGradient: {
    flex: 1,
    padding: 20,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },
  cardHolder: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  cardType: {
    fontSize: 16,
    color: "#fff",
    opacity: 0.9,
  },
  cardNumber: {
    marginBottom: 20,
  },
  cardNumberText: {
    fontSize: 22,
    letterSpacing: 2,
    color: "#fff",
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
  },
  expiryLabel: {
    fontSize: 12,
    color: "#fff",
    opacity: 0.8,
    marginRight: 8,
  },
  expiryDate: {
    fontSize: 16,
    color: "#fff",
  },
  selectedCheckmark: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  cardActions: {
    position: "absolute",
    bottom: 10,
    right: 10,
    flexDirection: "row",
    gap: 8,
    zIndex: 1,
  },
  defaultBadge: {
    position: "absolute",
    bottom: 10,
    left: "60%",
    transform: [{ translateX: -50 }],
    backgroundColor: "#4CAF50",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  defaultBadgeText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
  },
  cardTypeImage: {
    width: 50,
    height: 30,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 24,
    width: Dimensions.get("window").width * 0.9,
    maxHeight: Dimensions.get("window").height * 0.7,
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
  feedbackContent: {
    padding: 20,
    alignItems: "center",
  },
  feedbackIcon: {
    marginBottom: 15,
  },
  modalMessage: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  feedbackButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  feedbackButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#26589c",
    borderRadius: 10,
  },
  feedbackButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});